/** MAIN nodejs file */

var     http = require('http'),
        socketio = require('socket.io'),
        express = require('express'),
        _ = require('underscore'),
        cities = require('./city.js');

//APPFOG (free nodsJS hosting) tell us which port are we running
var port = process.env.VCAP_APP_PORT || 3000;
//we need the path to the client url, to save/load the city data
global.client_url = process.env.client || 'http://localhost/becopolis/client/'

var MAX_CONNECTIONS = 500;
var MIN_DELAY = 10;//seconds between 2 actions of the same client
var SAVE_DELAY = 5;//minutes to save the city from memory to database
var DEBUG = false;


//create the server
var server = http.createServer(function(req, res) {
    //nothing yet
    }).listen(port, function() {
              console.log('Listening at: http://localhost:'+port);
    });

//we work with a single city, using these we can make rooms/instances etc
var city = cities('ecopolis');
//load the city from database
city.wake();
//save the city from time to time
var city_save = setInterval(city.sleep,1000 * 60 * SAVE_DELAY);

/** SOCKET EVENTS */
    //the method listen creates the SOCKETIO instance
var io = socketio.listen(server).on('connection', function (client) {

    //we don't use regular messaging, we are cooler and use special events
    //client.on('message', function (msg) {
    //    console.log('Message Received: ', msg);
    //    client.broadcast.emit('message', msg);
    //});

    //show the newcomer the current state of city
    client.emit('city',city.getPublic());

    //tell everybody how many are online and other statistics
    var online = io.sockets.clients().length;
    var stats = city.getStats();

    if (online > stats['max_online'])
    {
        city.setStat('max_online', online);
        stats['max_online'] = online;
    }
    var start = new Date( stats.start);
    var online_data = {
        now : online,
        max : stats['max_online'],
        actions : stats.actions,
        //tell him when we founded the city
        city_start : {day : start.getDate(), month : start.getMonth()}
    };
    io.sockets.emit('online',online_data);

    //ask for a name to tell the others about his actions
    client.on('ident',function(data){
        client._name = clean(data);
        client.broadcast.emit('joined',client._name);
    });

    //if he is already on pause, tell him
    var client_id = client.handshake.sessionID;//socketid : sessionID
    var cooldown = locked_sessions.getWaiting(client_id);
    //console.log('!!!!!! client_id' + client_id + ' CD ' + cooldown);
    if (false == DEBUG && cooldown > 0 )
    {
        client.emit('wait',cooldown);
    }

    //on player action
    client.on('action',function(data){
        //console.log('action ' + data );

        //is the client allowed to send the action ? delay
        var client_id = client.handshake.sessionID;//socketid : sessionID
        //console.log('client_id',client_id);
        var cooldown = locked_sessions.getWaiting(client_id);
        if (false == DEBUG && cooldown > 0 )
        {
            client.emit('wait',cooldown);
            return true;
        }

        //add the cooldown
        locked_sessions.add(client_id);

        //modify the city race
        city.increment(data['attr'] || false,data['direction'] || false);

        //tell the users who did what
        io.sockets.emit('other_action',{who : client._name, attr : data['attr'],direction : data['direction']});

        //send to ALL clients the new values
        io.sockets.emit('city',city.getPublic());

        //tell him he needs to wait
        false == DEBUG && client.emit('wait',MIN_DELAY);

        return true;
    });

});

/** Authorization , here will be a big connection with the website,but just for testing
 * we only use a static limit of concurrent connections.
 */
io.configure(function (){

    io.set('transports', [
        //phpFog doesnt support websockets yet :(
            //'websocket',
            // 'flashsocket',
             'xhr-polling',
             'jsonp-polling'
        ]);

    if (DEBUG == false)
    {
        //some production optimizations
        io.enable('browser client minification');  // send minified client
        //io.enable('browser client etag');          // apply etag caching logic based on version number
        io.enable('browser client gzip');          // gzip the file
        io.set('log level', 1);                    // reduce logging

    }

    io.set('authorization', function (handshakeData, accept) {

        //thanks to http://stackoverflow.com/questions/10815517/how-to-limit-the-number-of-concurrent-connections
        //limit the overall number of active connections
        var online = io.sockets.clients().filter(function(s) {return !s.disconnected;}).length;
        if (online >= MAX_CONNECTIONS)
            accept('Server is full, please return later.',false);


        //console.log('qu',handshakeData.query);
        if (typeof(handshakeData.query) != 'undefined') {

            var session_id = handshakeData.query['PHPSESSID'] || false;
            console.log('found phpsession id' + session_id);
            if (session_id)
                handshakeData.sessionID = session_id;
            else
                return accept('Missing sesssionID.', false);

            //Search for the same session id !! if found refuse the connection !
            //blocks one user per browser connection limit
            if (io.sockets.clients()
                        .filter(function(s) {return s.handshake.sessionID == session_id && s.connected})//
                        .length)
            {
                return accept('Only one connection is allowed per client.', false);
            }

            //TODO make proper authentification with server side

        } else {
            // if there isn't, turn down the connection with a message
            // and leave the function.
            return accept('No query transmitted.', false);
        }

        //default everything is ok
        accept(null, true);
    });

});


/** Actions per user limiter.
 * It is used as a simple list, for the sessions that cannot do action (delay not expired).
 * Uses the unique ID (came from php session id client side).
 * */
var locked_sessions = {
    data : {},//raw data
    clean : function(){
        var time = this.getTime();
        //remove all entries that expired
        this.data = _.omit(this.data,function(value){return value <= time});
    },
    add : function(id){
        this.data[id] = this.getTime() + MIN_DELAY;
    },
    /** Return the seconds the client needs to wait for the next action */
    getWaiting : function(id){
        //auto clean
        this.clean();
        //console.log('-------------- waiting for ' + id + ' is ' + this.data[id]);

        //check
        if (typeof(this.data[id]) != 'undefined')
            return this.data[id] - this.getTime();
        else
            return 0;
    },
    getTime : function()
    {
        return parseInt(new Date().getTime() / 1000);
    }
};



/**
 * Server side function to clean the names from ..ugly spammers.
 */
function clean(what)
{
    return what.replace(/[\W\s]+/gi, '');
}