var EventSource = AllEvents;
var eventController = 0;
function initEvents()
{
    eventController = 0;
    var context = {
        events : EventSource
    };
    var templateScript = $("#eventsLoader").html();
    var template = Handlebars.compile(templateScript);
    var compiledHTML = template(context);
    $("#eventsHolders").html(compiledHTML);
    $("#prevEvent").css("display","none");
    $("#nextEvent").css("display","inline-block");
}
function registerEventsListener()
{
    $(".eventsBtn").click(function(){
        var id = $(this).attr("id");
        if(id == "allEvents"){
            EventSource = AllEvents;
        }
        else if(id == "upcomingEvents"){
            EventSource = UpcomingEvents;
        }
        else if(id == "pastEvents"){
            EventSource = PastEvents;
        }
        initEvents();
    });
    $('#nextEvent').click(function(){
        $("#prevEvent").css("display","inline-block");
        var elements = document.querySelectorAll(".eventCard");
        $(elements[eventController]).css("display","none");
        eventController++;
        $(elements[eventController+1]).css("display","block");
        $(elements[eventController+1]).addClass("fadeIn");
        console.log("eventController : "+eventController+" sourceLength : "+EventSource.length);
        if(eventController+2 == EventSource.length){
            $("#nextEvent").css("display","none");
        }
    });
    $("#prevEvent").click(function(){
        $("#nextEvent").css("display","inline-block");
        var elements = document.querySelectorAll(".eventCard");
        $(elements[eventController+1]).css("display","none");
        eventController--;
        $(elements[eventController]).css("display","block");
        $(elements[eventController]).addClass("fadeIn");
        if(eventController-1 < 0){
            $("#prevEvent").css("display","none");
        }
    });
}
function registerHandleBarhelpers()
{
    Handlebars.registerHelper('ifEqual',function(param1,options){
        if(param1 == 0 || param1 == 1){
            return options.fn(this);
        }
        else{
            return options.inverse(this);
        }
    });
}
$(document).ready(function(){
    registerHandleBarhelpers();
    initEvents();
    registerEventsListener();
});