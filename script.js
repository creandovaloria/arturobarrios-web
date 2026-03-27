document.addEventListener('DOMContentLoaded', () => {

    /* ========== Navbar Scroll Effect ========== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ========== Mobile Menu Toggle ========== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Optional: Change background immediately when opening menu at the top
        if (hamburger.classList.contains('active') && window.scrollY <= 50) {
            navbar.classList.add('scrolled');
        } else if (!hamburger.classList.contains('active') && window.scrollY <= 50) {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ========== Scroll Animations (Intersection Observer) ========== */
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Initialize navbar state if page is loaded scrolled down
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

});
