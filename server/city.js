var request = require('request');
/** ***********************************************************************************************
 *
 *              T H E     G A M E
 *
 *  **********************************************************************************************/

/** Abstract class of a city. */
var city_abstract = function(){
    //each attribute can have a max value
    var MAX = 1000;

    //unique identifier, can be used as rooms
    var name = null;

    //statistics about the server
    var stats = {
        start : new Date(),
        max_online : 0,//max number of online users
        actions : 0//number of increments all time
    };

    //everyone is working at the big city stereotype
    //attribute : default value
    var attributes =  {
        power       : 0,
        water       : 0,
        food        : 0,
        transport   : 0,
        commerce    : 0,
        recycle     : 0
    };

    this.setName = function(new_name)
    {
        name = new_name;
    };

    this.setStat = function(what,value)
    {
        if (typeof(stats[what]) != 'undefined')
            stats[what] = value;
    };

    this.getStats = function()
    {
        return stats;
    };

    /**
     * get the percentage level, rounded to 2 decimals
     * @return {Number}
     */
    this.getLevel = function(attr)
    {
        return parseInt((attributes[attr] / MAX) * 100 * 100) / 100;
    };

    /** Modify the value of an attribute.
     *
     * @param attr Attribute
     * @param direction Positive or negative
     * @return {Boolean} Operation success
     */
    this.increment = function (attr,direction)
    {
        if (!attr || !direction || typeof(attributes[attr]) == 'undefined')
            return false;

        var inc = (parseInt(direction) > 0) ? 1 : -1;
        if ((inc < 0 &&  attributes[attr] <= 0)
            || (inc > 0 && attributes[attr] >= MAX))
            return false;

        attributes[attr] += inc;

        stats.actions++;

        return true;
    };

    /**
     * Returns a version of the city, for the clients !
     * Doesn't have the actual value, only what he needs too see.
     * @return {Object} Attributes with current number of votes in percentages
     */
    this.getPublic = function()
    {
        var result = {};

        for (var i in attributes)
        {
            result[i] = this.getLevel(i);
        }

        return result;
    };


    /**
     * Save the City data to an outside database, for now just in a text file.
     */
    this.sleep = function()
    {
        //console.log('city goes to sleep !',name);
        var data = { stats : stats, attr : attributes, name : name };
        request.post({
                         headers: {'content-type' : 'application/x-www-form-urlencoded'},
                         url:     global.client_url + 'set.php?token=alfa34',
                         body:    "data=" + JSON.stringify(data)
                     }, function(error, response, body){
            //console.log(error,response,body,global.client_url + 'save.php?token=alfa34');
        });
    };


    /**
     * Restore the city from the external database.
     */
    this.wake = function()
    {
        //console.log('wake up city and shine');
        request.get({
                 headers: {'content-type' : 'application/x-www-form-urlencoded'},
                 url:     global.client_url + 'get.php?token=alfa34'
             }, function(error, response, body){
                  // console.log(body);
                   try {
                       var data = JSON.parse(body);
                       console.log('wake up received',data);
                        //take the data from database, only what we know is good, only if exists
                        if (data['stats'])
                        {
                            for (var i in stats)
                            {
                                if (data['stats'][i])
                                    stats[i] = data['stats'][i];
                            }
                        }
                        if (data['attr'])
                        {
                            for (var i in attributes)
                            {
                                if (data['attr'][i])
                                    attributes[i] = data['attr'][i];
                            }
                        }
                    }catch (e){}
                }
        );//end get
    };//end wake
};//end class


//maybe we want ROOMS as more cities
var instances = {};

//we treat as a nodeJS module, a single city for all the players
module.exports = function(name){
    if (typeof(instances[name]) == 'undefined')
    {
        instances[name] = new city_abstract();
        instances[name].setName(name);
    };

    return instances[name];
};

