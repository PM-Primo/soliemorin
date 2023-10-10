
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
let xSlider = 0;
let xPhoneSliders = Array(projects.length).fill(0)
let xDelta = 0;

//AJOUT DES DIFFERENTS EVENTLISTENERS
if(window.matchMedia("(min-width: 1080px)").matches){
    if(window.matchMedia("(pointer: coarse)").matches){
        addTouchControls();
    }
    else{
        addClickControls();
    }
    window.addEventListener("keydown", checkKeyPressed, false);
    displayImages();
    displayCaptions();    
}
else{
    if(window.matchMedia("(pointer: coarse)").matches){
        addPhoneControls();
    }
}


// Contrôles à la souris
function addClickControls(){
    for(i = currentProject-2; i < currentProject+1; i++){
        projects[i].classList.remove("current_project", "prev_project", "next_project");
        projects[i].removeAttribute('onclick');
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
    let counters = document.getElementsByClassName("caption__slides_counter");

    if(currentSlide < slides.length-1){
        imagePositions[currentProject]++;
        counters[currentProject].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
        if(currentProject == 2){
            imagePositions[(projects.length - 2)]++;
            counters[(projects.length -2)].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
        }
        else if(currentProject == 3){
            imagePositions[(projects.length - 1)]++;
        }
        if(currentProject == (projects.length - 3) ){
            imagePositions[1]++;
            counters[1].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
        }
        else if(currentProject == (projects.length - 4) ){
            imagePositions[0]++;
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

function slideDown(){ 
    let project = projects[currentProject];
    let slides = project.getElementsByClassName("slideshow__image")
    let currentSlide = imagePositions[currentProject];
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

// FONCTIONS DE DEFILEMENT - RESPONSIVE NON TACTILE

function tabletClickRight(e){

    let projectSlider = e.parentNode.previousElementSibling
    let project = projectSlider.parentNode
    let projectIndex = nodes.indexOf(project);
    let slides = project.getElementsByClassName("slideshow__image");
    let currentSlide = imagePositions[projectIndex];

    if(currentSlide<slides.length-1){        
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
        let slideOffset = slides[(currentSlide-1)].offsetLeft - ((window.innerWidth-slides[(currentSlide-1)].offsetWidth)/2)
        imagePositions[projectIndex]--;
        projectSlider.style.transform = "translateX(-"+slideOffset+"px)";

        let counter = document.getElementsByClassName("resp__caption__slides_counter")[projectIndex-2];
        counter.innerHTML = (currentSlide)+"/"+slides.length
    }
    else if(currentSlide == 1){
        imagePositions[projectIndex]=0;
        projectSlider.style.transform = "translateX(0)";
        let counter = document.getElementsByClassName("resp__caption__slides_counter")[projectIndex-2];
        counter.innerHTML = "1/"+slides.length
    }

}

// FONCTIONS DE SWIPE TACTILE - VERSION DESKTOP

function handleTouchStart(e){
    xStart = e.touches[0].clientX;
}

function handleMainTouchMove(e){
    xDelta = xStart-e.touches[0].clientX
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

    projectSlider.style.transition = "1000ms";

    // Cas où le slider est calé à gauche
    if(currentProject == 2){
        if(projects[currentProject+1].getBoundingClientRect().left < (window.innerWidth/2)){
            currentProject++;
            projects[currentProject-1].removeAttribute('onclick')
            projects[currentProject].setAttribute('onclick', 'slideUp()')
            xSlider = projects[(currentProject)].offsetLeft - ((window.innerWidth-projects[(currentProject)].offsetWidth)/2);
            projectSlider.style.transform = "translateX(-"+xSlider+"px)";
        }
        else{
            xSlider = 0;
            projectSlider.style.transform = "translateX(0px)";
        }
    }
    // Cas où le slider est calé à droite
    else if(currentProject == projects.length-3){
        if(projects[currentProject-1].getBoundingClientRect().right > (window.innerWidth/2)){
            currentProject--;
            projects[currentProject+1].removeAttribute('onclick')
            projects[currentProject].setAttribute('onclick', 'slideUp()')
        }
        xSlider = projects[(currentProject)].offsetLeft - ((window.innerWidth-projects[(currentProject)].offsetWidth)/2);
        projectSlider.style.transform = "translateX(-"+xSlider+"px)";
    }
    // Tous les autres cas
    else{
        if(projects[currentProject+1].getBoundingClientRect().left < (window.innerWidth/2)){
            currentProject++;
            projects[currentProject-1].removeAttribute('onclick')
            projects[currentProject].setAttribute('onclick', 'slideUp()')
        }
        else if(projects[currentProject-1].getBoundingClientRect().right > (window.innerWidth/2)){
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

    if(xPhoneSliders[projectIndex]==0 && xDelta<0){
        xStart = e.touches[0].clientX;
        xDelta = 0;
    }
    else{
        currentSlider.style.transform = "translateX(-"+(xPhoneSliders[projectIndex]+xDelta)+"px)";
    }
}

function handlePhoneTouchEnd(e){
    let currentSlider = e.target.parentNode;
    let project = currentSlider.parentNode
    let projectIndex = nodes.indexOf(project);
    let slides = project.getElementsByClassName("slideshow__image");
    let currentSlide = imagePositions[projectIndex];
    
    currentSlider.style.transition = "1000ms";

    if(currentSlide == 0){
        if(slides[currentSlide+1].getBoundingClientRect().left < (window.innerWidth/2)){
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
        if(slides[currentSlide-1].getBoundingClientRect().right > (window.innerWidth/2)){
            imagePositions[projectIndex]--;
            currentSlide--;
        }
        xPhoneSliders[projectIndex] = slides[(currentSlide)].offsetLeft - ((window.innerWidth-slides[(currentSlide)].offsetWidth)/2);
        currentSlider.style.transform = "translateX(-"+xPhoneSliders[projectIndex]+"px)";
    }
    else{
        if(slides[currentSlide+1].getBoundingClientRect().left < (window.innerWidth/2)){
            imagePositions[projectIndex]++;
            currentSlide++;
        }
        else if(slides[currentSlide-1].getBoundingClientRect().right > (window.innerWidth/2)){
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

// AFFICHAGE DES INFORMATIONS

function displayInfos(){
    let infoBox = document.getElementById("informations__container");
    infoBox.classList.add("informations__on");
}

function removeInfos(){
    let infoBox = document.getElementById("informations__container");
    infoBox.classList.remove("informations__on");
}
