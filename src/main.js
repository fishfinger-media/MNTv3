import Swiper from 'swiper';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import gsap from 'gsap';
import SplitType from 'split-type';

// Initialize Swiper
const HomeSwiper = new Swiper('[data-swiper="homepage"]', {
    modules: [Navigation, Pagination, Mousewheel], 
    wrapperClass: 'home_slider-container',
    slideClass: 'section_home-slide',
    direction: 'vertical',
    mousewheel: true,
    slidesPerView: 1,
    
    navigation: {
        nextEl: '[data-slide="next"]',
        prevEl: '[data-slide="prev"]',
    },

    on: {
        slideChangeTransitionStart: function () {
            // Trigger animations for slide change
            animateSlideContent();
        }
    }
});

// Initialize Swiper
const BuySwiper = new Swiper('.swiper.is-buy', {
    modules: [Navigation, Pagination, Mousewheel], 
    wrapperClass: 'swiper_wrapper',
    slideClass: 'swiper_slide',
    direction: 'vertical',
    mousewheel: false,
    slidesPerView: 1,
    
    navigation: {
        nextEl: '[data-slide="next"]',
        prevEl: '[data-slide="prev"]',
    },

    on: {
        slideChangeTransitionStart: function () {
            // Trigger animations for slide change
            animateSlideContent();
        }
    }
});



// Function to animate slide content
function animateSlideContent() {
    // Split text into words for animation
    const splitText = new SplitType('.swiper-slide-active [data-gsap="paragraph"] ,.swiper-slide-active [data-gsap="heading"] ', {
        types: 'words'
    });


    // Animate each word individually
    gsap.fromTo(splitText.words, 
        {opacity: 0, y: 10}, 
        {opacity: 1, y: 0, ease: 'power4.inOut', stagger: 0.03, delay: 0.1}
    );

    // Animate the grid container
    gsap.fromTo('.swiper-slide-active .button_wrapper', 
        {scale: 0.9, opacity: 0}, 
        {duration: 0.5, scale: 1, opacity: 1, ease: 'power4.inOut', delay: 0.6}
    );

    // Animate the logo track
    gsap.fromTo('.swiper-slide-active [data-gsap="item"]', 
        {y: 15, opacity: 0}, 
        {duration: 0.8, y: 0, opacity: 1.5, ease: 'power4.inOut', delay: 0.6}
    );

    // Animate the image with scaling and fading
    gsap.fromTo('.swiper-slide-active .slide_image-container', 
        {scale: 0.9, opacity: 0}, 
        {duration: 0.5, scale: 1, opacity: 1, ease: "back.out(2)", delay: 0.2}
    );
}

// Trigger the animation for the first slide on page load
window.addEventListener('load', function() {
    animateSlideContent();
});


const rotatingImage = document.querySelectorAll(".slide_image-container")

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Calculate rotation values based on cursor position
  const rotateY = ((mouseX / windowWidth) - 0.5) * 22; // Range: -20deg to 20deg
  const rotateX = ((mouseY / windowHeight) - 0.5) * -22; // Range: -20deg to 20deg, negated for natural feel

  // Apply rotation with GSAP
  gsap.to(rotatingImage, {
    duration: 0.5,
    rotateX: rotateX,
    rotateY: rotateY,
    ease: "power1.out",
  });
});