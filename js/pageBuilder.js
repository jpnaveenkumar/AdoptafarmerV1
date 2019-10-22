var isMissionMotoFired = false;
var isCounterFired = false;
var ImageController ;
var ScreenController ;
var TabController = 'ALL';
var ImageSource = Images;
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
    image.src = ImageSource[counterIndex]["src"];
    image.style.height="inherit";
    image.style.width="100%";
    return image;
}
function InitializeImages()
{
    $("#prevImg").hide();
    ImageController = -1;
    ScreenController = 0;
    var elements = document.querySelectorAll(".gallery-image");
    for(var i=0 ; i < elements.length ; i++){
        ImageController++;
        var image = getImageElement(ImageController);
        $(elements[i]).html(image);
    }
    console.log("ScreenController : "+ ScreenController+" ImageController : "+ImageController);
}
function registerGallery(){
    InitializeImages();
    $("#gallery").on('click','.gallery-image',function(){
        console.log("clicked");
        Spotlight.show(ImageSource, {
            index: ScreenController+1,
            theme: "white",
            autohide: false,
            control: ["autofit", "zoom"]
        });
    });
    $("#nextImg").click(()=>{
        if(document.getElementById("prevImg").style.display == "none"){
            $("#prevImg").show();
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
        if(ScreenController +1 < ImageSource.length){
            ScreenController++;
        }
        if(ScreenController == ImageSource.length-1){
            $("#nextImg").hide();
        }
        if((ImageController+1) < ImageSource.length){
            ImageController++;
            var imageElement = getImageElement(ImageController);
            $(firstElement).html(imageElement);
        }
        $("#gallery").append(firstElement);
        console.log("ScreenController : "+ ScreenController+" ImageController : "+ImageController);
    });
    $("#prevImg").click(()=>{
        if(document.getElementById("nextImg").style.display == "none"){
            $("#nextImg").show();
        }
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
        if(ScreenController-1 >= 0){
            ScreenController--;
        }
        if(ScreenController + 6 -1 < ImageController){
            ImageController--;
        }
        if(ScreenController == 0){
            $("#prevImg").hide();
        }
        var imageElement = getImageElement(ScreenController);
        $(lastElement).html(imageElement);
        $("#gallery").prepend(lastElement);
        console.log("ScreenController : "+ ScreenController+" ImageController : "+ImageController);
    });
}
function registerTabListener(){
    $('.tabby').click(function(){
        $('.tabby').css("background-color",'white');
        var id = $(this).attr("id");
        $("#"+id).css("background-color",'#d6d7d6');
        if(id == "allImages"){
            TabController = 'ALL';
            ImageSource = Images;
        }
        else if(id == "oldImages"){
            TabController = 'OLD';
            ImageSource = OldImages;
        }
        else if(id == "recentImages"){
            TabController = 'RECENT';
            ImageSource = RecentImages;
        }
        InitializeImages();
    });
}
$(document).ready(()=>{
    registerScrollEvents();
    registerOnclick();
    registerGallery();
    setCarouselHeight();
    registerTabListener();
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
});