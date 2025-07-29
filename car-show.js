// Car Show Carousel and Interactive Features

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
        
        // Pause auto-slide on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }
    
    // Form submission handling
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animations
    addScrollAnimations();
});

// Carousel Functions
function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    if (slides[index]) {
        slides[index].classList.add('active');
        currentSlideIndex = index;
    }
    
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    showSlide(index - 1); // Convert to 0-based index
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Form Handling
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    const requiredFields = ['owner-name', 'email', 'phone', 'car-year', 'car-make', 'car-model', 'category'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Year validation
    const currentYear = new Date().getFullYear();
    if (data['car-year'] < 1900 || data['car-year'] > currentYear) {
        alert('Please enter a valid car year.');
        return;
    }
    
    // Simulate form submission
    const submitButton = e.target.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert(`Thank you, ${data['owner-name']}! Your ${data['car-year']} ${data['car-make']} ${data['car-model']} has been registered for the car show. You will receive a confirmation email shortly.`);
        
        // Reset form
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 2000);
}

// Scroll Animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation styles and observe elements
    const animatedElements = document.querySelectorAll('.info-card, .stat-item, .info-box');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Keyboard Navigation for Carousel
document.addEventListener('keydown', function(e) {
    if (slides.length === 0) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            changeSlide(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            changeSlide(1);
            break;
        case ' ': // Spacebar
            e.preventDefault();
            if (autoSlideInterval) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
            break;
    }
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.carousel-container')) {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.closest('.carousel-container')) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Add hover effects to info cards
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for hero content
window.addEventListener('load', function() {
    const heroElements = document.querySelectorAll('.car-show-hero .hero-text > *, .car-show-hero .hero-flyer');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});

// Add loading states for images - removed to fix visibility issue

// Print-friendly adjustments
window.addEventListener('beforeprint', function() {
    // Show all carousel slides for printing
    slides.forEach(slide => {
        slide.style.position = 'static';
        slide.style.opacity = '1';
        slide.style.pageBreakInside = 'avoid';
    });
});

window.addEventListener('afterprint', function() {
    // Restore carousel functionality
    slides.forEach((slide, index) => {
        slide.style.position = 'absolute';
        slide.style.opacity = index === currentSlideIndex ? '1' : '0';
    });
});
