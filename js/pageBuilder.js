var isMissionMotoFired = false;
var isCounterFired = false;
var ImageCounter = -1;
var currentUI = 0;
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
function getImageElement(counterIndex)
{
    var image = document.createElement("img");
    image.src = Images[counterIndex]["url"];
    image.style.height="inherit";
    image.style.width="100%";
    return image;
}
function InitializeImages()
{
    var elements = document.querySelectorAll(".gallery-image");
    for(var i=0 ; i < elements.length ; i++){
        ImageCounter++;
        var image = getImageElement(ImageCounter);
        $(elements[i]).append(image);
    }
}
function registerGallery(){
    InitializeImages();
    $("#prevImg").hide();
    $("#nextImg").click(()=>{
        if(document.getElementById("prevImg").style.display == "none"){
            $("#prevImg").show();
        }
        currentUI++;
        console.log(currentUI);
        if(currentUI == Images.length-1){
            $("#nextImg").hide();
        }
        var width = 80;
        var zindex = 10;
        var top = 0;
        var firstElement ;
        var elements = document.querySelectorAll(".gallery-image");
        for(var i=0 ;i < elements.length; i++){
            var element = elements[i]; 
            if(i==0){
                firstElement = element;
            }
            else{
                $(element).css({
                    "width":width+"%",
                    "z-index":zindex,
                    "top":top+"px"
                });
                width = width - 5;
                zindex = zindex - 1;
                top = top - 20;
            }
        }
        $(firstElement).remove();
        $(firstElement).css({
            "width":width+"%",
            "z-index":zindex,
            "top":top+"px"
        });
 
        if(ImageCounter != Images.length-1){
            ImageCounter++;
            var imageElement = getImageElement(ImageCounter);
            $(firstElement).html(imageElement);
        }
        $("#gallery").append(firstElement);
    });
    $("#prevImg").click(()=>{
        if(document.getElementById("nextImg").style.display == "none"){
            $("#nextImg").show();
        }
        currentUI--;
        console.log(currentUI);
        var width = 55;
        var zindex = 5 ;
        var top = -100;
        var lastElement;
        var elements = document.querySelectorAll(".gallery-image");
        for(var i=elements.length-1 ; i >= 0 ; i--){
            var element = elements[i];
            if(i == elements.length-1){
                lastElement = elements[i];
            }else{
                $(element).css({
                    "width":width+"%",
                    "z-index":zindex,
                    "top":top+"px"
                });
                width = width + 5;
                zindex = zindex + 1;
                top = top + 20;
            }
        }
        $(lastElement).remove();
        $(lastElement).css({
            "width":width+"%",
            "z-index":zindex,
            "top":top+"px"
        });
        var index = ImageCounter - 6;
        ImageCounter--;
        if(index == 0){
            $("#prevImg").hide();
        }
        var imageElement = getImageElement(index);
        $(lastElement).html(imageElement);
        $("#gallery").prepend(lastElement);
    });
}
$(document).ready(()=>{
    registerScrollEvents();
    registerOnclick();
    registerGallery();
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
    console.log(Images);
    $('#approachImg').click(function(){

    });
});