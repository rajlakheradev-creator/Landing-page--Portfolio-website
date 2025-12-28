// ===========================
// PROJECTS CAROUSEL FUNCTIONALITY
// ===========================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get carousel elements
    const carousel = document.getElementById('projects-carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    // Check if carousel exists on the page
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('li');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let slidesPerView = 1; // Will be calculated based on screen size
    
    // Calculate how many slides are visible at once
    function calculateSlidesPerView() {
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth <= 768) {
            slidesPerView = 1; // Mobile: 1 card
        } else if (viewportWidth <= 1024) {
            slidesPerView = 2; // Tablet: 2 cards
        } else {
            slidesPerView = 2; // Desktop: 2 cards (adjust to 3 if you prefer)
        }
        
        return slidesPerView;
    }
    
    // Calculate the maximum slide index
    function getMaxSlide() {
        return Math.max(0, totalSlides - slidesPerView);
    }
    
    // Generate dots based on number of slides
    function generateDots() {
        dotsContainer.innerHTML = ''; // Clear existing dots
        const maxSlide = getMaxSlide();
        
        for (let i = 0; i <= maxSlide; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-slide', i);
            
            // Add click event to dot
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.getAttribute('data-slide')));
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update active dot
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Update button states (disable at start/end)
    function updateButtons() {
        const maxSlide = getMaxSlide();
        
        // Disable prev button at start
        if (currentSlide === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }
        
        // Disable next button at end
        if (currentSlide >= maxSlide) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }
    
    // Show specific slide
    function goToSlide(slideIndex) {
        const maxSlide = getMaxSlide();
        
        // Ensure slideIndex is within bounds
        if (slideIndex < 0) slideIndex = 0;
        if (slideIndex > maxSlide) slideIndex = maxSlide;
        
        currentSlide = slideIndex;
        
        // Calculate slide width (card width + gap)
        const slideWidth = slides[0].offsetWidth;
        const gap = 30; // Match your CSS gap
        const moveAmount = -(currentSlide * (slideWidth + gap));
        
        // Apply transform
        carousel.style.transform = `translateX(${moveAmount}px)`;
        
        // Update UI
        updateButtons();
        updateDots();
    }
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        const maxSlide = getMaxSlide();
        if (currentSlide < maxSlide) {
            goToSlide(currentSlide + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const oldSlidesPerView = slidesPerView;
            calculateSlidesPerView();
            
            // If slides per view changed, regenerate dots and reset position
            if (oldSlidesPerView !== slidesPerView) {
                generateDots();
                // Adjust current slide if needed
                const maxSlide = getMaxSlide();
                if (currentSlide > maxSlide) {
                    currentSlide = maxSlide;
                }
                goToSlide(currentSlide);
            } else {
                // Just recalculate position
                goToSlide(currentSlide);
            }
        }, 250);
    });
    
    // Initialize carousel
    function initCarousel() {
        calculateSlidesPerView();
        generateDots();
        updateButtons();
        goToSlide(0); // Start at first slide
    }
    
    // Start the carousel
    initCarousel();
    
});

// ===========================
// NAVIGATION ACTIVE STATE
// ===========================

const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav ul li');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Logic to check which section is currently in view
        // "- 200" is a buffer so the highlight changes slightly before the section hits the very top
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    // Loop through nav items to add/remove the "active" class
    navLi.forEach(li => {
        // Remove 'active' class from all items first
        li.classList.remove('active');
        
        // Check if the <a> tag inside the <li> matches the current section ID
        if (li.querySelector('a').getAttribute('href').includes(current)) {
            // Add 'active' class to the matching item
            if(current !== "") {
                li.classList.add('active');
            }
        }
    });
});