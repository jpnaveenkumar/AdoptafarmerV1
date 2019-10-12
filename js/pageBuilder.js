var isMissionMotoFired = false;
var isCounterFired = false;
function setCarouselHeight(){
    var hero = $("#hero").offset();
    var windowHeight = $(window).height();
    var carouselHeight = windowHeight - hero.top;
    // if(carouselHeight < 500){
    //     carouselHeight = 500;
    // }
    $("#hero").css("height",carouselHeight+"px");
    $(".carousel-img").css("height",carouselHeight+"px");
}
function setCarouselAutoplay()
{
    $('.carousel').carousel('next');
    setTimeout(setCarouselAutoplay, 10000);
}
function startMissionMotoSlider()
{
    var elements = document.getElementsByClassName("rollingText");
    console.log(elements);
    var index = 0;
     $("#bar").addClass("slider");
    var id = setInterval(()=>{
        elements[index].style.display = "block";
        elements[index].classList.add("fadeIn");
        index++;
        if(index==elements.length){
            clearInterval(id);
            $("#missionMoto").css("justify-content","center");
        }
    },500);
}
function registerScrollEvents()
{
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        var scrollBottom = scrollTop + $(window).height();
        if(scrollTop > $("#hero").offset().top){
            $("#mobileHeader").removeClass("hide");
            $("#mobileHeader").addClass("headerFadeIn");
        }
        else{
            $("#mobileHeader").removeClass("headerFadeIn");
            $("#mobileHeader").addClass("headerFadeOut hide");
        }
        console.log("scrollTop : "+scrollBottom+" mission: "+ $("#missionMoto").offset().top);
        if(!isMissionMotoFired && scrollBottom > $("#missionMoto").offset().top){
            isMissionMotoFired = true;
            startMissionMotoSlider();
        }
        if( !isCounterFired && scrollBottom > $("#parallaxCount").offset().top){
            isCounterFired = true;
            animateCount();
        }
    });
}
function animateCount()
{
    var familyCount = 0;
    var volunteersCount = 1;
    var fundsCount = 1;
    var family = setInterval(()=>{
        $("#familyCount").text(familyCount);
        familyCount+=2;
        if(familyCount > 64){
            $("#familyCount").text(64+"+");
            clearInterval(family);
        }
    },100);

    var volunteers = setInterval(()=>{
        $("#volunteersCount").text(volunteersCount);
        volunteersCount = volunteersCount + 4;
        if(volunteersCount > 100){
            $("#volunteersCount").text(100+"+");
            clearInterval(volunteers);
        }
    },100);

    var funds = setInterval(()=>{
        $("#fundsCount").text(fundsCount);
        fundsCount=fundsCount+2000;
        if(fundsCount > 100000){
            $("#fundsCount").text(100000+"+");
            clearInterval(funds);
        }
    },100);
}
function registerOnclick(){
    $("#hero").on('click',()=>{
        console.log(this);
        $(this).addClass("active");
    });
}
function cardHover(){
    $("#approachCard").hover(()=>{
        $("#approachText").removeClass("font18");
        $("#approachText").text("Visit Farmers to review their self-sustenance ideas, provide counselling and suggest suitable options. Rather than one time donation, we support the farmers until they become self-sustain.");
    },
    ()=>{
        $("#approachText").addClass("font18");
        $("#approachText").text("Our Approach");
    });

    $("#planCard").hover(()=>{
        $("#planText").removeClass("font18");
        $("#planText").text("Fund 90% for each Farmer’s self sustenance Idea and request the Farmer to contribute 10% to create responsibility.");
    },
    ()=>{
        $("#planText").addClass("font18");
        $("#planText").text("Our Plan");
    });

    $("#goalCard").hover(()=>{
        $("#goalText").removeClass("font18");
        $("#goalText").text("Develop a working model to make Poor Farmers self-sustain. Involve in Policy advocation at District or State level that supports small farmers.");
    },
    ()=>{
        $("#goalText").addClass("font18");
        $("#goalText").text("Our Goal");
    });
}
$(document).ready(()=>{
    registerScrollEvents();
    registerOnclick();
    setCarouselHeight();
    cardHover();
    $('.carousel').carousel(
        {
            dist : 0,
            padding : 0,
            fullwidth : true,
            indicators : true,
            duration : 500
        }
    );
    setCarouselAutoplay();

    $('#approachImg').click(function(){

    });
});