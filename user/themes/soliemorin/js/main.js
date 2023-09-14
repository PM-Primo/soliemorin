
// FONCTIONNEMENT DU SLIDESHOW


let projects = document.getElementsByClassName("slideshow__project");
let currentProject = 0;
let posProject = 0;
let projectSlider = document.getElementById("slideshow__inner")

let imagePositions = Array(projects.length).fill(0);

displayImages();
displayCaptions();

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
    for(i = 0; i < projects.length; i++){
        if(i == currentProject){
            captions[i].style.display = "block";
        }
        else{
            captions[i].style.display = "none";
        }
    }
}

function slideRight(){
    if(currentProject < projects.length -1){
        posProject += projects[currentProject].offsetWidth;
        currentProject++;
        projectSlider.style.transform = "translateX(-"+posProject+"px)"
    }
    displayCaptions();
}

function slideLeft(){
    if(currentProject > 0){
        posProject -= projects[currentProject-1].offsetWidth;
        currentProject--;
        projectSlider.style.transform = "translateX(-"+posProject+"px)"
    }
    displayCaptions();
}

function slideUp(){
    let project = projects[currentProject];
    let slides = project.getElementsByClassName("slideshow__image")
    let currentSlide = imagePositions[currentProject];

    if(currentSlide < slides.length-1){
        imagePositions[currentProject]++;
    }
    else{
        imagePositions[currentProject] = 0;
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

    console.log(imagePositions);

}