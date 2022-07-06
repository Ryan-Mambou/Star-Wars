//Slides
const imageSlider = document.querySelector('.images');
const images = Array.from(imageSlider.children);
const symbolSlider = document.querySelector('.symbols');
const symbols = Array.from(symbolSlider.children);
const textSlider = document.querySelector('.text-slider');
const texts = Array.from(textSlider.children);
const dateSlider = document.querySelector('.date-slider');
const dates = Array.from(dateSlider.children);
const progress = document.querySelectorAll('.progress');
const circles = document.querySelectorAll('.circle')
const actives = []; // Global array to know progress(lines) theat contain th active class

//Arrows
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

//Width of slide for images
const slideWidth = images[1].getBoundingClientRect().width;

//Width of slide for symbols
const symbolSlideWidth = symbols[0].getBoundingClientRect().width;

//Height of slide for Texts
const textSlideHeight = texts[0].getBoundingClientRect().height;
console.log(textSlideHeight);

//Height of slide for Dates
const dateSlideHeight = dates[0].getBoundingClientRect().height;

//Arrange slides
/**images.forEach((slide, index) => {  
    slide.style.left = slideWidth * index + 'px';
})*/

//Function to arrange slides horizontally as rows
const setSlides = (slides, slideWidth) => {
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    })
}

//Function to arrange slides vertically as columns
const setSlidesVertically = (slides, slideHeight) => {
    slides.forEach((slide, index) => {
        slide.style.top = slideHeight * index + "px";
    })
}

const enableDisableArrows = (actives) => {

    if (actives.length === 0){
        leftArrow.classList.add('fa-disabled');
    }
    if (actives.length === 2){
        rightArrow.classList.add('fa-disabled')
    }
    leftArrow.classList.remove('fa-disabled');
    rightArrow.classList.remove('fa-disabled');
}

//Calling the functions on slides to arrange them
setSlides(images, slideWidth);
setSlides(symbols, symbolSlideWidth);
setSlidesVertically(texts, textSlideHeight);
setSlidesVertically(dates, dateSlideHeight);

//Function to move slide
//The track is the slider
const moveSlideHorizontally = (track, currentSlide, targetSlide) => { 
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    //current-slide is to say current-image
        currentSlide.classList.remove('current-symbol', 'current-slide')
        targetSlide.classList.add('current-symbol', 'current-slide')
}

const moveSlideVertically = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateY(-" + targetSlide.style.top + ")";
    currentSlide.classList.remove('current-text', 'current-date');
    targetSlide.classList.add('current-text', 'current-date');
}

const stepperCircleToRight = (arr) => {
    for (i = 0; i < arr.length; i++){
        if(arr[i].classList.contains('active')){
            var index = i + 1;
        }
    }
    if (index > arr.length - 1){
        console.log("Do something!")
    }
    const next = arr[index];
    console.log(next)
    next.classList.add('active')
};

const stepperCircleToLeft = (arr) => {
    console.log(arr)
    let tab = [];
    console.log(arr)
    console.log(arr.length)
    for (i = arr.length - 1; i >= 1; i--){
        console.log(arr[i].classList.contains('active'))
        if(arr[i].classList.contains('active')){
            var index = i ;
            break;
        }
    }
    console.log(index)
    let arrayToRemove = arr[index];
    arrayToRemove.classList.remove('active')

}

const stepperProgress = (active, progressBar) => {
    //the active parameter is an array of the active classe
    switch(active.length){
        case 0: progressBar[0].classList.add('active')
        active.push(progressBar[0])
        break;
        case 1: progressBar[1].classList.add('active')
        active.push(progressBar[1])
        break;
        case 2: progressBar[2].classList.add('active')
        active.push(progressBar[2])
        break;
        case 3: progressBar[3].classList.add('active')
        active.push(progressBar[3])
    }
}

const stepperRegress = (active, progressBar) => {
    //if you add steps up to html, you should uplaod the cases of this switch statement
    switch(active.length){
        case 0: break;
        case 1: progressBar[0].classList.remove('active');
        active.pop()
        break;
        case 2: progressBar[1].classList.remove('active')
        active.pop()
    }
}


rightArrow.addEventListener('click', (e) => {
    const currentSlide = imageSlider.querySelector('.current-slide');
    const currentSymbolSlide = symbolSlider.querySelector('.current-symbol');
    const currentTextSlide = textSlider.querySelector('.current-text');
    const currentDateSlide = dateSlider.querySelector('.current-date');
   /**  let nextSlide = "";
    if (currentSlide.classList.contains('third')){
         nextSlide = imageSlider.querySelector('first')
    } */
    const nextSlide = currentSlide.nextElementSibling;
    const nextSymbolSlide = currentSymbolSlide.nextElementSibling;
    const nextTextSlide = currentTextSlide.nextElementSibling;
    const nextDateSlide = currentDateSlide.nextElementSibling;

    moveSlideHorizontally(imageSlider, currentSlide, nextSlide);
    moveSlideHorizontally(symbolSlider, currentSymbolSlide, nextSymbolSlide);
    moveSlideVertically(textSlider, currentTextSlide, nextTextSlide);
    moveSlideVertically(dateSlider, currentDateSlide, nextDateSlide);
    stepperProgress(actives, progress)
    //circles[1].classList.add('active')
    stepperCircleToRight(circles);
});

leftArrow.addEventListener('click', (e) => {
    const currentSlide = imageSlider.querySelector('.current-slide');
    const currentSymbolSlide = symbolSlider.querySelector('.current-symbol');
    const currentTextSlide = textSlider.querySelector('.current-text');
    const currentDateSlide = dateSlider.querySelector('.current-date')
    const prevSlide = currentSlide.previousElementSibling;
    const prevSymbolSlide = currentSymbolSlide.previousElementSibling;
    const prevTextSlide = currentTextSlide.previousElementSibling;
    const prevDateSlide = currentDateSlide.previousElementSibling;

    moveSlideHorizontally(imageSlider, currentSlide, prevSlide);
    moveSlideHorizontally(symbolSlider, currentSymbolSlide, prevSymbolSlide)
    moveSlideVertically(textSlider, currentTextSlide, prevTextSlide);
    moveSlideVertically(dateSlider, currentDateSlide, prevDateSlide);
    stepperRegress(actives, progress)
    stepperCircleToLeft(circles)
});;


