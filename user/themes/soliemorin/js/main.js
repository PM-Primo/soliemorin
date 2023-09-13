
// FONCTIONNEMENT DU SLIDESHOW


let projects = document.getElementsByClassName("slideshow__project");
let currentProject = 0;
let posProject = 0;
let projectSlider = document.getElementById("slideshow__inner")

let imagePositions = Array(2).fill().map(() => Array(projects.length).fill(0));
// Dans ce tableau la ligne [0] correspond au numéro de la slide en cours et la ligne [1] au décalage de translation du slider de projet en cours

function slideRight(){
    if(currentProject < projects.length -1){
        posProject += projects[currentProject].offsetWidth;
        currentProject++;
        projectSlider.style.transform = "translateX(-"+posProject+"px)"
    }
}

function slideLeft(){
    if(currentProject > 0){
        posProject -= projects[currentProject-1].offsetWidth;
        currentProject--;
        projectSlider.style.transform = "translateX(-"+posProject+"px)"
    }

}

function slideUp(){
    let project = projects[currentProject];
    let slides = project.getElementsByClassName("slideshow__image")
    let currentSlide = imagePositions[0][currentProject];
    let imageSlider = project.getElementsByClassName("slideshow__project_inner")[0];

    if(currentSlide < slides.length-1){
        imagePositions[1][currentProject] += slides[currentSlide].offsetHeight;
        imagePositions[0][currentProject]++;
        imageSlider.style.transform = "translateY(-"+imagePositions[1][currentProject]+"px)"
    }
    else{
        imagePositions[1][currentProject] = 0;
        imagePositions[0][currentProject] = 0;
        imageSlider.style.transform = "translateY(0px)";
    }

}

function slideDown(){
    let project = projects[currentProject];
    let slides = project.getElementsByClassName("slideshow__image")
    let currentSlide = imagePositions[0][currentProject];
    let imageSlider = project.getElementsByClassName("slideshow__project_inner")[0];

    if(currentSlide > 0){
        imagePositions[1][currentProject] -= slides[currentSlide].offsetHeight;
        imagePositions[0][currentProject]--;
        imageSlider.style.transform = "translateY(-"+imagePositions[1][currentProject]+"px)"
    }
    else{
        let totalLength = 0;
        for(i = 0; i < slides.length-1; i++){
            totalLength += slides[i].offsetHeight;
        }
        imagePositions[1][currentProject] = totalLength;
        imagePositions[0][currentProject] = slides.length-1;
        
        imageSlider.style.transform = "translateY(-"+ imagePositions[1][currentProject] +"px)";
    }

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