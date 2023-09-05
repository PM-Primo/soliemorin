let slideIndex = 1;
let projectIndex = 1;
let projects = document.getElementsByClassName("slideshow__project");

console.log("slide index : "+slideIndex);
showProject(projectIndex);
showSlides(slideIndex);

function showProject(n) {
    let i;

    if (n > projects.length){
        projectIndex = 1
    }
    if (n < 1){
        projectIndex = projects.length
    }

    for (i = 0; i < projects.length; i++) {
      projects[i].style.display = "none";
    }
    projects[projectIndex-1].style.display = "block";
}

function showSlides(n) {
    let i;

    let slides = projects[projectIndex-1].getElementsByClassName("slideshow__project_slide");

    if (n > slides.length){
        slideIndex = 1
    }
    if (n < 1){
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

function plusSlides(n){
    showSlides(slideIndex += n)
}

function plusProject(n){
    showProject(projectIndex += n);
    slideIndex = 1;
    showSlides(slideIndex);
}