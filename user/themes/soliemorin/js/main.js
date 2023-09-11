
// FONCTIONNEMENT DU SLIDESHOW

// let slideIndex = 1;
// let projectIndex = 1;
// let projects = document.getElementsByClassName("slideshow__project");

// showProject(projectIndex);
// showSlides(slideIndex);

// function showProject(n) {
//     let i;

//     if (n > projects.length){
//         projectIndex = 1
//     }
//     if (n < 1){
//         projectIndex = projects.length
//     }

//     for (i = 0; i < projects.length; i++) {
//       projects[i].style.display = "none";
//     }
//     projects[projectIndex-1].style.display = "block";
// }

// function showSlides(n) {
//     let i;

//     let slides = projects[projectIndex-1].getElementsByClassName("slideshow__project_slide");

//     if (n > slides.length){
//         slideIndex = 1
//     }
//     if (n < 1){
//         slideIndex = slides.length
//     }

//     for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//     }
//     slides[slideIndex-1].style.display = "block";
// }

// function plusSlides(n){
//     showSlides(slideIndex += n)
// }

// function plusProject(n){
//     showProject(projectIndex += n);
//     slideIndex = 1;
//     showSlides(slideIndex);
// }

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

    if(currentSlide < slides.length-1){
        imagePositions[1][currentProject] += slides[currentSlide].offsetHeight;
        imagePositions[0][currentProject]++;
        let imageSlider = project.getElementsByClassName("slideshow__project_inner")[0];
        imageSlider.style.transform = "translateY(-"+imagePositions[1][currentProject]+"px)"
    }
    console.log(imagePositions)
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