
// FONCTIONNEMENT DU SLIDESHOW


let projects = document.getElementsByClassName("slideshow__project");
let nodes = Array.prototype.slice.call(projects);
let currentProject = 2;
let posProject = 0;
let projectSlider = document.getElementById("slideshow__inner")

let imagePositions = Array(projects.length).fill(0);

let leftLock = true;

let xStart = 0;
let xSlider = 0;
let xDelta = 0;

if(window.matchMedia("(min-width: 1080px)").matches){
    displayImages();
    displayCaptions();    
}

addClickControls();
addTouchControls();

function displayImages(){
    for(i = 0; i < projects.length; i++){
        let slides = projects[i].getElementsByClassName("slideshow__image");
        for(j=0; j < slides.length-1; j++){
            slides[j].style.display = "none";
        }
        slides[imagePositions[i]].style.display="block";
    }
}

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

// AFFICHAGE DES INFORMATIONS

function displayInfos(){
    let infoBox = document.getElementById("informations__container");
    infoBox.classList.add("informations__on");
}

function removeInfos(){
    let infoBox = document.getElementById("informations__container");
    infoBox.classList.remove("informations__on");
}

// FONCTIONS MOBILE ET TABLETTE

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

// CONTRÔLES DU SLIDESHOW A LA SOURIS

function addClickControls(){
    if(window.matchMedia("(min-width: 1080px)").matches && !window.matchMedia("(pointer: coarse)").matches){
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
}

function addTouchControls(){
    if(window.matchMedia("(min-width: 1080px)").matches && window.matchMedia("(pointer: coarse)").matches){
        projectSlider.addEventListener('touchstart', handleMainTouchStart, false);
        projectSlider.addEventListener('touchmove', handleMainTouchMove, false);
        projectSlider.addEventListener('touchend', handleMainTouchEnd, false);
        projects[2].setAttribute("onclick", "slideUp()")
    }
}

// CONTRÔLES TACTILES VERSION DESKTOP

function handleMainTouchStart(e){
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
    xSlider = projects[(currentProject)].offsetLeft - ((window.innerWidth-projects[(currentProject)].offsetWidth)/2);
    projectSlider.style.transform = "translateX(-"+xSlider+"px)";
}

// RACCOURCIS CLAVIER
window.addEventListener("keydown", checkKeyPressed, false);

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