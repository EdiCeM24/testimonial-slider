const slider = document.querySelector('.testimonial-slider');
const testimonials = document.querySelectorAll('.testimonial');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotsContainer = document.querySelector('.dots-container');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let autoSlideInterval;

//* event listeners
function initApp() {
    slider.addEventListener('touchStart', handleTouchStart)
    slider.addEventListener('touchEnd', handleTouchEnd);
    slider = addEventListener('mouseover', startAutoSlide);
    slider = addEventListener('mouseleave', startAutoSlide);
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
}

//* auto slide

function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 1000); // 3 sec.
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

//* touch navigation

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;

    handleTouchSwipe();
}

function handleTouchSwipe() {
    const swipeThreshold = 50;   //* swipe sensitivity;

    if (touchStartX - touchEndX > swipeThreshold) {
        nextTestimonial();  //* swipe left;
    } else if (touchEndX - touchStartX > swipeThreshold) {
        prevTestimonial();  // swipe right;
    }
}

//* dot navigation
function renderDotButtons() {
    for (let i = 0; i < testimonials.length; i++) {
        const button = document.createElement('button');
        button.classList.add('dot');
        button.classList.toggle(i === currentIndex);
        button.ariaLabel = `jum to testimonial  ${i + 1}`;
        button.addEventListener('click', showTestimonial(i));
        dotsContainer.appendChild(button);
    }
}

//* slide functions
function showTestimonial(index) {
    currentIndex = index;

    testimonials.forEach((testimonial) => {
        testimonial.style.transform = `translateX(${-index * 100}%)`;
    });

    // update active dot
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i = currentIndex);
    });
}

function nextTestimonial() {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);

}

function prevTestimonial() {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex);
}

//* initialize

document.addEventListener('DOMContentLoaded', function() {
    renderDotButtons ();
    startAutoSlide();
    initApp();
});







