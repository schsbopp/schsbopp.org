// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section, .hero-section, .signup-section');
    
    // Function to show a specific section
    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            // Add animation
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                targetSection.style.transition = 'all 0.5s ease';
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 10);
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`a[href="#${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Handle CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('signup');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize - show home section by default
    showSection('home');
    
    // Form submission handling
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Signing Up...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for signing up! We\'ll be in touch soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showSection('home');
            }, 2000);
        });
    }
    
    // Smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                showSection(targetId);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add some interactivity to fundraiser and volunteer sections
    const interactiveElements = document.querySelectorAll('.support-section, .events-section, .media-section, .volunteer-opportunity');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Mobile menu toggle functionality (if needed in the future)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            // Add mobile menu functionality here if needed
        }
    };
    
    // Check on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    // Add loading animation
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    // External link handling
    document.querySelectorAll('a[href^="http"], a[href^="mailto:"]').forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// Utility functions
function fadeIn(element, duration = 500) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 500) {
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let opacity = Math.max(1 - (progress / duration), 0);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.altKey) {
        const keyMap = {
            '1': 'home',
            '2': 'fundraisers', 
            '3': 'volunteer',
            '4': 'calendar'
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            const targetId = keyMap[e.key];
            const targetLink = document.querySelector(`a[href="#${targetId}"]`);
            if (targetLink) {
                targetLink.click();
            }
        }
    }
});
