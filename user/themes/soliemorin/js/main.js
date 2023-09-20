
// FONCTIONNEMENT DU SLIDESHOW


let projects = document.getElementsByClassName("slideshow__project");
let currentProject = 2;
let posProject = 0;
let projectSlider = document.getElementById("slideshow__inner")

let imagePositions = Array(projects.length).fill(0);

let firstSlide = true;

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

console.log(currentProject);


function slideRight(){
    if(firstSlide == true){
        posProject = projects[3].offsetLeft - ((window.innerWidth-projects[3].offsetWidth)/2);
        projectSlider.style.transform = "translateX(-"+posProject+"px)";
        currentProject++;

        projectSlider.addEventListener("transitionend", function raz() {
            projectSlider.style.transition = "none";
            invisibleSlides = projectSlider.getElementsByClassName("slideshow__invisible_slides");
            invisibleSlides[1].classList.remove("slideshow__invisible_slides");
            invisibleSlides[0].classList.remove("slideshow__invisible_slides");
            posProject = projects[3].offsetLeft - ((window.innerWidth-projects[3].offsetWidth)/2);
            projectSlider.style.transform = "translateX(-"+posProject+"px)";
            displayCaptions();
            setTimeout(function() {
                projectSlider.style.transition = "1000ms";
            });
            projectSlider.removeEventListener("transitionend", raz);
        })
        firstSlide = false;
    }
    else if(currentProject < projects.length -3){
        posProject = projects[(currentProject+1)].offsetLeft - ((window.innerWidth-projects[(currentProject+1)].offsetWidth)/2);
        currentProject++;
        projectSlider.style.transform = "translateX(-"+posProject+"px)";
    }
    else if(currentProject == projects.length -3){
        posProject = projects[(currentProject+1)].offsetLeft - ((window.innerWidth-projects[(currentProject+1)].offsetWidth)/2);
        currentProject++;
        projectSlider.addEventListener("transitionend", function raz() {
            projectSlider.style.transition = "none";
            posProject = projects[2].offsetLeft - ((window.innerWidth-projects[2].offsetWidth)/2);
            projectSlider.style.transform = "translateX(-"+posProject+"px)";
            currentProject = 2;
            displayCaptions();
            setTimeout(function() {
                projectSlider.style.transition = "1000ms";
            });
            projectSlider.removeEventListener("transitionend", raz)
        })
        projectSlider.style.transform = "translateX(-"+posProject+"px)";
    }
    displayCaptions();
}


function slideLeft(){
        

    if(currentProject > 2){
        posProject = projects[(currentProject-1)].offsetLeft - ((window.innerWidth-projects[(currentProject-1)].offsetWidth)/2);
        currentProject--;
        projectSlider.style.transform = "translateX(-"+posProject+"px)";
    }
    else if(currentProject == 2){
        posProject = projects[(currentProject-1)].offsetLeft - ((window.innerWidth-projects[(currentProject-1)].offsetWidth)/2);
        currentProject--;
        projectSlider.addEventListener("transitionend", function raz() {
            projectSlider.style.transition = "none";
            posProject = projects[(projects.length - 3)].offsetLeft - ((window.innerWidth-projects[projects.length - 3].offsetWidth)/2);
            projectSlider.style.transform = "translateX(-"+posProject+"px)";
            currentProject = (projects.length -3);
            displayCaptions();
            setTimeout(function() {
                projectSlider.style.transition = "1000ms";
            });
            projectSlider.removeEventListener("transitionend", raz)
        })
        projectSlider.style.transform = "translateX(-"+posProject+"px)";
    }

    displayCaptions();
}

function slideUp(){
    let project = projects[currentProject];
    let slides = project.getElementsByClassName("slideshow__image");
    let currentSlide = imagePositions[currentProject];
    let counters = document.getElementsByClassName("caption__slides_counter");

    if(currentSlide < slides.length-1){
        imagePositions[currentProject]++;
        counters[currentProject].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
        if(currentProject == 0){
            imagePositions[(projects.length - 2)]++;
            counters[(projects.length -2)].innerHTML = (imagePositions[currentProject]+1)+"/"+slides.length;
        }
        else if(currentProject == 1){
            imagePositions[(projects.length - 1)]++;
        }
    }
    else{
        imagePositions[currentProject] = 0;
        counters[currentProject].innerHTML = "1/"+slides.length;
        if(currentProject == 0){
            imagePositions[(projects.length - 2)] = 0;
            counters[(projects.length -2)].innerHTML = "1/"+slides.length;
        }
        else if(currentProject == 1){
            imagePositions[(projects.length - 1)] = 0;
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