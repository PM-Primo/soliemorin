// VARIABLES GLOBALES

let projects = document.getElementsByClassName("slideshow__project");
let nodes = Array.prototype.slice.call(projects);
let currentProject = 2;
let posProject = 0;
let projectSlider = document.getElementById("slideshow__inner");
let imagePositions = Array(projects.length).fill(0);

// Lock du scroll infini à gauche
let leftLock = true;

// Variables de gestion des sliders en version tactile
let xStart = 0;
let yStart = 0
let xSlider = 0;
let xPhoneSliders = Array(projects.length).fill(0)
let xDelta = 0;
let xDeltaSafety = 0;
let angleChecked = false;
let angle;

// Variables pour le resize
let initWidth = window.innerWidth
var doit;


//AJOUT DES DIFFERENTS EVENTLISTENERS
if(window.matchMedia("(min-aspect-ratio: 950/715)").matches){
    if(window.matchMedia("(pointer: coarse)").matches){
        addTouchControls();
    }
    else{
        addClickControls();
    }
    lazyLoadNewProject(projects[2]);
    loadImg(projects[3].getElementsByClassName("slideshow__image")[0])
    loadImg(projects[4].getElementsByClassName("slideshow__image")[0])
    window.addEventListener("keydown", checkKeyPressed, false);
    displayImages();
    displayCaptions();    
}
else{
    lazyLoadPhoneInit();
    if(window.matchMedia("(pointer: coarse)").matches){
        addPhoneControls();
    }
}

window.onresize = function(){ 
    if (window.innerWidth !== initWidth ) {
        clearTimeout(doit);
        doit = setTimeout(location.reload(), 100);
    }
}

//Initialisation du LazyLoad

function lazyLoadNewProject(project){
    slides = project.getElementsByClassName("slideshow__image");
    let projectIndex = nodes.indexOf(project);

    loadImg(slides[0])
    loadImg(slides[slides.length-1])
    loadImg(slides[1]);
    loadImg(slides[2]);
    

    if(projectIndex === 2){
        lazyLoadNewProject(projects[projects.length -2])
    }
    if(projectIndex === 3){
        lazyLoadNewProject(projects[projects.length -1])
    }
    if(projectIndex === projects.length - 4){
        lazyLoadNewProject(projects[0])
    }
    if(projectIndex === projects.length - 3){
        lazyLoadNewProject(projects[1])
    }
}


// Contrôles à la souris
function addClickControls(){
    for(i = currentProject-2; i < currentProject+1; i++){
        if(projects[i]){
            projects[i].classList.remove("current_project", "prev_project", "next_project");
            projects[i].removeAttribute('onclick');
        }
    }

    projects[currentProject].classList.add("current_project");
    projects[currentProject-1].classList.add("prev_project");
    projects[currentProject+1].classList.add("next_project");
    projects[currentProject].setAttribute('onclick','slideUp()')
    projects[currentProject-1].setAttribute('onclick','slideLeft()')
    projects[currentProject+1].setAttribute('onclick','slideRight()')
}

// Contrôles au clavier
function checkKeyPressed(e) {
    if (e.keyCode == "37") {
        slideLeft();
    }
    if (e.keyCode == "39") {
        slideRight();
    }
    if (e.keyCode == "40") {
        slideUp();
    }
    if (e.keyCode == "38") {
        slideDown();
    }
}

// Contrôles tactiles version desktop
function addTouchControls(){
    projectSlider.addEventListener('touchstart', handleTouchStart, false);
    projectSlider.addEventListener('touchmove', handleMainTouchMove, false);
    projectSlider.addEventListener('touchend', handleMainTouchEnd, false);
    projects[2].setAttribute("onclick", "slideUp()")
    projects[projects.length-1]
    document.getElementsByClassName('slideshow__hidden_clones')[0].style.display = "none";
    document.getElementsByClassName('slideshow__hidden_clones')[1].style.display = "none";
}

// Contrôles tactiles version mobile
function addPhoneControls(){
    let overlays = document.getElementsByClassName("slideshow__overlay");
    let sliders = document.getElementsByClassName("slideshow__project_inner")
    for(i = 0; i < overlays.length; i++){
        overlays[i].style.display = "none";
    }
    for(i = 2; i < sliders.length-2; i++){
        sliders[i].addEventListener('touchstart', handleTouchStart, false);
        sliders[i].addEventListener('touchmove', handlePhoneTouchMove, false);
        sliders[i].addEventListener('touchend', handlePhoneTouchEnd, false);
    }
}


// AFFICHAGE DES SLIDES CORRESPONDANT A imagePositions

function displayImages(){
    for(i = 0; i < projects.length; i++){
        let slides = projects[i].getElementsByClassName("slideshow__image");
        for(j=0; j < slides.length-1; j++){
            slides[j].style.display = "none";
        }
        slides[imagePositions[i]].style.display="block";
    }
}

// AFFICHAGE DES LEGENDES ET DES COMPTEURS

function displayCaptions(){
    let captions = document.getElementsByClassName("caption__project");
    let counters = document.getElementsByClassName("caption__slides_counter");
    for(i = 0; i < projects.length; i++){
        if(i == currentProject){
            captions[i].style.display = "block";
            counters[i].style.display = "block";
        }
        else{
            captions[i].style.display = "none";
            counters[i].style.display = "none";
        }
    }
}

// FONCTIONS DE DEFILEMENT - VERSION DESKTOP

function slideRight(){

    if(currentProject < projects.length -3){
        posProject = projects[(currentProject+1)].offsetLeft - ((window.innerWidth-projects[(currentProject+1)].offsetWidth)/2);
        currentProject++;
        projectSlider.style.transform = "translateX(-"+posProject+"px)";
        lazyLoadNewProject(projects[currentProject]);
        loadImg(projects[currentProject+1].getElementsByClassName("slideshow__image")[0])

    }
    else if(currentProject == projects.length -3){
        posProject = projects[(currentProject+1)].offsetLeft - ((window.innerWidth-projects[(currentProject+1)].offsetWidth)/2);
        currentProject++;
        projectSlider.addEventListener("transitionend", function raz() {
            projectSlider.style.transition = "none";
            if(leftLock == true){
                invisibleSlides = projectSlider.getElementsByClassName("slideshow__invisible_slides");
                invisibleSlides[1].classList.remove("slideshow__invisible_slides");
                invisibleSlides[0].classList.remove("slideshow__invisible_slides");
                leftLock = false;
            }
            posProject = projects[2].offsetLeft - ((window.innerWidth-projects[2].offsetWidth)/2);
            projectSlider.style.transform = "translateX(-"+posProject+"px)";
            currentProject = 2;
            displayCaptions();
            addClickControls();
            setTimeout(function() {
                projectSlider.style.transition = "1000ms";
            });
            projectSlider.removeEventListener("transitionend", raz)
        })
        projectSlider.style.transform = "translateX(-"+posProject+"px)";
    }
    displayCaptions();
    addClickControls();
}


function slideLeft(){
        
    if(currentProject == 3 && leftLock == true ){
        currentProject--;
        projectSlider.style.transform = "translateX(0px)";
    }
    else if(currentProject > 3 || (currentProject == 3 && leftLock == false )){
        posProject = projects[(currentProject-1)].offsetLeft - ((window.innerWidth-projects[(currentProject-1)].offsetWidth)/2);
        currentProject--;
        projectSlider.style.transform = "translateX(-"+posProject+"px)";
    }
    else if(currentProject == 2 && leftLock == false){
        posProject = projects[(currentProject-1)].offsetLeft - ((window.innerWidth-projects[(currentProject-1)].offsetWidth)/2);
        currentProject--;
        projectSlider.addEventListener("transitionend", function raz() {
            projectSlider.style.transition = "none";
            posProject = projects[(projects.length - 3)].offsetLeft - ((window.innerWidth-projects[projects.length - 3].offsetWidth)/2);
            projectSlider.style.transform = "translateX(-"+posProject+"px)";
            currentProject = (projects.length -3);
            displayCaptions();
            addClickControls();
            setTimeout(function() {
                projectSlider.style.transition = "1000ms";
            });
            projectSlider.removeEventListener("transitionend", raz)
        })
        projectSlider.style.transform = "translateX(-"+posProject+"px)";
    }

    displayCaptions();
    addClickControls();

}

function slideUp(){    

    let project = projects[currentProject];
    let slides = project.getElementsByClassName("slideshow__image");
    let currentSlide = imagePositions[currentProject];

    if(slides[currentSlide].complete && slides[currentSlide].naturalHeight !== 0){
        let counters = document.getElementsByClassName("caption__slides_counter");

        if(currentSlide < slides.length-1){
            imagePositions[currentProject]++;
            counters[currentProject].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
            if(currentProject == 2){
                imagePositions[(projects.length - 2)]++;
                counters[(projects.length -2)].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
                if(currentSlide+2<slides.length-1){
                    loadImg(projects[projects.length-2].getElementsByClassName("slideshow__image")[currentSlide+2]);
                }
            }
            else if(currentProject == 3){
                imagePositions[(projects.length - 1)]++;
                if(currentSlide+2<slides.length-1){
                    loadImg(projects[projects.length-1].getElementsByClassName("slideshow__image")[currentSlide+2]);
                }
            }
            if(currentProject == (projects.length - 3) ){
                imagePositions[1]++;
                counters[1].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
                if(currentSlide+2<slides.length-1){
                    loadImg(projects[1].getElementsByClassName("slideshow__image")[currentSlide+2]);
                }
            }
            else if(currentProject == (projects.length - 4) ){
                imagePositions[0]++;
                if(currentSlide+2<slides.length-1){
                    loadImg(projects[0].getElementsByClassName("slideshow__image")[currentSlide+2]);
                }
            }
            if(currentSlide+2<slides.length-1){
                loadImg(slides[currentSlide+2]);
            }
        }
        else{
            imagePositions[currentProject] = 0;
            counters[currentProject].innerHTML = "1/"+slides.length;
            if(currentProject == 2){
                imagePositions[(projects.length - 2)] = 0;
                counters[(projects.length -2)].innerHTML = "1/"+slides.length;
            }
            else if(currentProject == 3){
                imagePositions[(projects.length - 1)] = 0;
            }
            if(currentProject == (projects.length - 3) ){
                imagePositions[1] = 0 ;
                counters[1].innerHTML = "1/"+slides.length;
            }
            else if(currentProject == (projects.length - 4) ){
                imagePositions[0] = 0;
            }
        }
        displayImages();
    }
    else{
        console.log("Le contenu n'a pas encore été chargé")
    }

    
}

function slideDown(){ 
    let project = projects[currentProject];
    let slides = project.getElementsByClassName("slideshow__image")
    let currentSlide = imagePositions[currentProject];

    if(slides[currentSlide].complete && slides[currentSlide].naturalHeight !== 0){

        let counters = document.getElementsByClassName("caption__slides_counter");


        if(currentSlide > 0){
            imagePositions[currentProject]--;
            counters[currentProject].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
            if(currentProject == 2){
                imagePositions[(projects.length - 2)]--;
                counters[(projects.length -2)].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
            }
            else if(currentProject == 3){
                imagePositions[(projects.length - 1)]--;
            }
            if(currentProject == (projects.length - 3) ){
                imagePositions[1]--;
                counters[1].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
            }
            else if(currentProject == (projects.length - 4) ){
                imagePositions[0]--;
            }
            loadImg(slides[currentSlide-1]);
        }
        else{
            imagePositions[currentProject] = slides.length-1;
            counters[currentProject].innerHTML = slides.length+"/"+slides.length;
            if(currentProject == 2){
                imagePositions[(projects.length - 2)] = slides.length-1;
                counters[(projects.length -2)].innerHTML = slides.length+"/"+slides.length;
            }
            else if(currentProject == 3){
                imagePositions[(projects.length - 1)] = slides.length-1;
            }
            if(currentProject == (projects.length - 3) ){
                imagePositions[1] = slides.length-1 ;
                counters[1].innerHTML = slides.length+"/"+slides.length;
            }
            else if(currentProject == (projects.length - 4) ){
                imagePositions[0] = slides.length-1;
            }    
        }
        displayImages();
    }

}

// FONCTIONS DE DEFILEMENT - RESPONSIVE NON TACTILE

function tabletClickRight(e){

    let projectSlider = e.parentNode.previousElementSibling
    let project = projectSlider.parentNode
    let projectIndex = nodes.indexOf(project);
    let slides = project.getElementsByClassName("slideshow__image");
    let currentSlide = imagePositions[projectIndex];
    
    if(currentSlide<slides.length-1){        
        if(currentSlide == 0){
            e.previousElementSibling.classList.remove("overlay__neutral")
            e.previousElementSibling.classList.add("overlay__left")
        }
        if(currentSlide == slides.length-2){
            e.classList.remove("overlay__right")
            e.classList.add("overlay__neutral")
        }
        let slideOffset = slides[(currentSlide+1)].offsetLeft - ((window.innerWidth-slides[(currentSlide+1)].offsetWidth)/2)
        imagePositions[projectIndex]++;
        projectSlider.style.transform = "translateX(-"+slideOffset+"px)";

        let counter = document.getElementsByClassName("resp__caption__slides_counter")[projectIndex-2];
        counter.innerHTML = (currentSlide+2)+"/"+slides.length
    }
}

function tabletClickLeft(e){

    let projectSlider = e.parentNode.previousElementSibling
    let project = projectSlider.parentNode
    let projectIndex = nodes.indexOf(project);
    let slides = project.getElementsByClassName("slideshow__image");
    let currentSlide = imagePositions[projectIndex];
    

    if(currentSlide > 1){
        if(currentSlide == slides.length-1){
            e.nextElementSibling.classList.remove("overlay__neutral");
            e.nextElementSibling.classList.add("overlay__right");
        }

        let slideOffset = slides[(currentSlide-1)].offsetLeft - ((window.innerWidth-slides[(currentSlide-1)].offsetWidth)/2)
        imagePositions[projectIndex]--;
        projectSlider.style.transform = "translateX(-"+slideOffset+"px)";

        let counter = document.getElementsByClassName("resp__caption__slides_counter")[projectIndex-2];
        counter.innerHTML = (currentSlide)+"/"+slides.length
    }
    else if(currentSlide == 1){
        e.classList.remove("overlay__left");
        e.classList.add("overlay__neutral");
        imagePositions[projectIndex]=0;
        projectSlider.style.transform = "translateX(0)";
        let counter = document.getElementsByClassName("resp__caption__slides_counter")[projectIndex-2];
        counter.innerHTML = "1/"+slides.length;
    }

}

// FONCTIONS DE SWIPE TACTILE - VERSION DESKTOP

function handleTouchStart(e){
    xStart = e.touches[0].clientX;
    yStart = e.touches[0].clientY;
    xDeltaSafety = 0
}

function handleMainTouchMove(e){

    e.preventDefault();

    xDelta = xStart-e.touches[0].clientX
    xDeltaSafety = xDelta
    // xDelta : + si on slide vers la gauche / - si on slide vers la droite

    projectSlider.style.transition = "none";

    if(xSlider==0 && xDelta<0){
        xStart = e.touches[0].clientX;
        xDelta = 0;
    }
    else{
        projectSlider.style.transform = "translateX(-"+(xSlider+xDelta)+"px)";
    }
}

function handleMainTouchEnd(e){

    console.log(Math.abs(xDelta))

    projectSlider.style.transition = "1000ms";

    // Cas où le slider est calé à gauche
    if(currentProject == 2){
        if((projects[currentProject+1].getBoundingClientRect().left < (window.innerWidth*0.75)) && (Math.abs(xDeltaSafety)>150)){
            currentProject++;
            projects[currentProject-1].removeAttribute('onclick')
            projects[currentProject].setAttribute('onclick', 'slideUp()')
            xSlider = projects[(currentProject)].offsetLeft - ((window.innerWidth-projects[(currentProject)].offsetWidth)/2);
            projectSlider.style.transform = "translateX(-"+xSlider+"px)";
            lazyLoadNewProject(projects[currentProject]);
        }
        else{
            xSlider = 0;
            projectSlider.style.transform = "translateX(0px)";
        }
    }
    // Cas où le slider est calé à droite
    else if(currentProject == projects.length-3){
        if((projects[currentProject-1].getBoundingClientRect().right > (window.innerWidth*0.25)) && (Math.abs(xDeltaSafety)>150)){
            currentProject--;
            projects[currentProject+1].removeAttribute('onclick')
            projects[currentProject].setAttribute('onclick', 'slideUp()')
        }
        xSlider = projects[(currentProject)].offsetLeft - ((window.innerWidth-projects[(currentProject)].offsetWidth)/2);
        projectSlider.style.transform = "translateX(-"+xSlider+"px)";
    }
    // Tous les autres cas
    else{
        if((projects[currentProject+1].getBoundingClientRect().left < (window.innerWidth*0.75) && Math.abs(xDeltaSafety)>150)){
            currentProject++;
            projects[currentProject-1].removeAttribute('onclick')
            projects[currentProject].setAttribute('onclick', 'slideUp()')
            lazyLoadNewProject(projects[currentProject])
        }
        else if((projects[currentProject-1].getBoundingClientRect().right > (window.innerWidth*0.25) && Math.abs(xDeltaSafety)>150)){
            currentProject--;
            projects[currentProject+1].removeAttribute('onclick')
            projects[currentProject].setAttribute('onclick', 'slideUp()')
        }
        if(currentProject == 2){
            xSlider = 0
        }
        else{
            xSlider = projects[(currentProject)].offsetLeft - ((window.innerWidth-projects[(currentProject)].offsetWidth)/2);
        }
        projectSlider.style.transform = "translateX(-"+xSlider+"px)";
    }

    displayCaptions();

}

// FONCTIONS DE SWIPE TACTILE - VERSION MOBILE

function handlePhoneTouchMove(e){
    currentSlider = e.target.parentNode;
    xDelta = xStart-e.touches[0].clientX

    let project = currentSlider.parentNode
    let projectIndex = nodes.indexOf(project);

    // xDelta : + si on slide vers la gauche / - si on slide vers la droite

    currentSlider.style.transition = "none";

    if (!angleChecked){
        angle = checkAngle(xStart, yStart, e.touches[0].clientX, e.touches[0].clientY)
    }

    if(angleChecked){
        if(angle == "swipe"){

            e.preventDefault();

            if(xPhoneSliders[projectIndex]==0 && xDelta<0){
                xStart = e.touches[0].clientX;
                xDelta = 0;
            }
            else{
                currentSlider.style.transform = "translateX(-"+(xPhoneSliders[projectIndex]+xDelta)+"px)";
            }
        }
    }

}

function handlePhoneTouchEnd(e){
    let currentSlider = e.target.parentNode;
    let project = currentSlider.parentNode
    let projectIndex = nodes.indexOf(project);
    let slides = project.getElementsByClassName("slideshow__image");
    let currentSlide = imagePositions[projectIndex];

    angleChecked = false

    currentSlider.style.transition = "1000ms";

    if(currentSlide == 0){
        if(slides[currentSlide+1].getBoundingClientRect().left < (window.innerWidth*0.75)){
            imagePositions[projectIndex]++;
            currentSlide++;
            xPhoneSliders[projectIndex] = slides[(currentSlide)].offsetLeft - ((window.innerWidth-slides[(currentSlide)].offsetWidth)/2);
            currentSlider.style.transform = "translateX(-"+xPhoneSliders[projectIndex]+"px)";

        }
        else{
            xPhoneSliders[projectIndex] = 0;
            currentSlider.style.transform = "translateX(0px)";
        }
    }
    else if(currentSlide == slides.length-1){
        if(slides[currentSlide-1].getBoundingClientRect().right > (window.innerWidth*0.25)){
            imagePositions[projectIndex]--;
            currentSlide--;
        }
        xPhoneSliders[projectIndex] = slides[(currentSlide)].offsetLeft - ((window.innerWidth-slides[(currentSlide)].offsetWidth)/2);
        currentSlider.style.transform = "translateX(-"+xPhoneSliders[projectIndex]+"px)";
    }
    else{
        if(slides[currentSlide+1].getBoundingClientRect().left < (window.innerWidth*0.75)){
            imagePositions[projectIndex]++;
            currentSlide++;
        }
        else if(slides[currentSlide-1].getBoundingClientRect().right > (window.innerWidth*0.25)){
            imagePositions[projectIndex]--;
            currentSlide--;
        }
        if(currentSlide == 0){
            xPhoneSliders[projectIndex] = 0;
        }
        else{
            xPhoneSliders[projectIndex] = slides[(currentSlide)].offsetLeft - ((window.innerWidth-slides[(currentSlide)].offsetWidth)/2);
        }
        currentSlider.style.transform = "translateX(-"+xPhoneSliders[projectIndex]+"px)";
    }

    let counter = document.getElementsByClassName("resp__caption__slides_counter")[projectIndex-2];
    counter.innerHTML = (currentSlide+1)+"/"+slides.length;
}

// CALCUL DE L'ANGLE DE DEPLACEMENT TACTILE
function checkAngle(x1, y1, x2, y2){
    let deltaX = Math.abs(x2-x1);
    let deltaY = Math.abs(y2-y1);

    angleChecked = true;

    if(deltaY>deltaX){
        return "scroll";
    }
    else{
        return "swipe";
    }
}

// AFFICHAGE DES INFORMATIONS

function displayInfos(){
    if(window.matchMedia("(max-width:500px)").matches){
        iconHoverAdd("i");
    }
    iconHoverRemove("x");
    let infoBox = document.getElementById("informations__container");
    infoBox.classList.add("informations__on");
    document.body.classList.add("body__noscroll");
}

function removeInfos(){
    if(window.matchMedia("(max-width:500px)").matches){
        iconHoverRemove("i");
    }
    iconHoverAdd("x");
    let infoBox = document.getElementById("informations__container");
    infoBox.classList.remove("informations__on");
    document.body.classList.remove("body__noscroll");
}

function iconHoverAdd(icon){
    let mainIcon = document.getElementById(icon+"_icon");
    let hoveredIcon = document.getElementById(icon+"_icon_hovered");
    mainIcon.classList.add("hidden")
    hoveredIcon.classList.add("displayed")
}

function iconHoverRemove(icon){
    let mainIcon = document.getElementById(icon+"_icon");
    let hoveredIcon = document.getElementById(icon+"_icon_hovered");
    hoveredIcon.classList.remove("displayed")
    mainIcon.classList.remove("hidden")
}

//RELOAD

function reload(){
    location.reload();
}

// LAZYLOAD

function loadImg(image){
    if(image.classList.contains("unloaded")){
        image.src = image.dataset.src;
        image.classList.remove("unloaded");
    }
}

function lazyLoadPhoneInit(){
    images = document.getElementsByClassName("unloaded");
    for(i = 0; i < images.length - 1; i+1){
        images[i].setAttribute('loading','lazy');
        loadImg(images[i])
    }
}
