
// FONCTIONNEMENT DU SLIDESHOW


let projects = document.getElementsByClassName("slideshow__project");
let currentProject = 2;
let posProject = 0;
let projectSlider = document.getElementById("slideshow__inner")

let imagePositions = Array(projects.length).fill(0);

let leftLock = true;

displayImages();
displayCaptions();
addClickControls();

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

    if(currentSlide > 0){
        imagePositions[currentProject]--;
    }
    else{
        imagePositions[currentProject] = slides.length-1;        
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

// CONTRÔLES DU SLIDESHOW A LA SOURIS

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

    console.log(currentProject)

}