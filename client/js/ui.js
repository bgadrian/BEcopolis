
var name = null;//my entered name, not so secure right
var dom_q = null;//jQuery selector for the question

//JS don't know the months, he is stupid sometimes
var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

//when the dom is ready, we start the fun
$(document).ready(function(){
    $('#q_overlay').hide();
    var login = $('#login');

    login
        .show()
    /** When the login is submit */
        .submit(function(e){
                    e.preventDefault();
                    var err = $('.red', login);

                    if ($('#email').val())
                    {
                        err.html('');
                        return false;
                    }

                    window.name = $('#name').val().trim();
                    if (window.name.length <= 3)
                    {
                        $('#name').val('');
                        err.html('Name must be at least 3 characters long.');
                        return false;
                    }

                    err.html('');
                    connect_server();
                    login.hide();
                    $('#wrapper').show();
                });

    dom_q = $('#q');
});



//draw the city
function redrawHuman()
{
    var dom = $('#city');
    var head = $('thead tr',dom);
    var body = $('tbody tr',dom);
    head.html('');
    body.html('');

    for (var attr in city)
    {
        var per = city[attr].toString();
        if (per.indexOf('.') != -1)
        {
            per = per.replace('.','.<sub>') + '%</sub>';
        }
        else
        {
            per = per + '%';
        }
        var green_width = parseInt(city[attr]);
        head.append('<th><p>' + per + '</p>'+attr+'</th>');
        body.append('<td class="attr attr_'+attr+'"><div style="width:'+green_width+'%"></div></td>');
    }
}


//function that I use for versatile log messages
function uiAddMessage(who,text)
{
    var dom_messages = $('#messages');
    $('<div><span>'+who+'</span>'+text+'</div>')
        .prependTo(dom_messages)
        .show(100)
        .position({
                          //offset:rdm(0,100) + '% ' + rdm(0,100) + '%',
                          //at : 'top left',
                          at : 'left+' + rdm(0,100) + '% top+' + rdm(0,100) + '%',
                          //my : 'top left',
                          of: dom_messages,
                          collision : 'fit',
                          within : dom_messages
                      })
        .delay(10000 + (dom_messages.children().length * 200))//we must add time of lots of messages are on
        .hide(300)
        .queue(function(){
                   $(this).stop(true,true).remove();
               });
}
//imagine 1000 incoming messages ...this will stop the spam on client side
var throttled_message = _.throttle(uiAddMessage, 1000);


/** random inclusive 2 integer positive numbers */
function rdm(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}