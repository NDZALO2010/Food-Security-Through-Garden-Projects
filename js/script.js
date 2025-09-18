// Modern JavaScript for Food Security Project
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle (for responsive design)
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const navUl = document.querySelector('nav ul');

        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');

        // Insert hamburger before nav ul
        nav.querySelector('.container').insertBefore(hamburger, navUl);

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function() {
            navUl.classList.toggle('nav-open');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target)) {
                navUl.classList.remove('nav-open');
                hamburger.classList.remove('active');
            }
        });
    };

    // Initialize mobile menu if screen is small
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Add loading animation to page
    const addLoadingAnimation = () => {
        document.body.classList.add('loaded');
    };

    // Simulate loading time for demo
    setTimeout(addLoadingAnimation, 100);

    // Form validation for calculators
    const setupFormValidation = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const inputs = form.querySelectorAll('input[required]');
                let isValid = true;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.classList.add('error');
                        isValid = false;
                    } else {
                        input.classList.remove('error');
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                }
            });
        });
    };

    setupFormValidation();

    // Add scroll animations
    const addScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements to animate
        const animateElements = document.querySelectorAll('.sdg-card, .strategy-card, .fact, .case-study');
        animateElements.forEach(el => observer.observe(el));
    };

    addScrollAnimations();

    // Dark mode toggle
    const setupDarkMode = () => {
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
        toggleButton.className = 'dark-mode-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle dark mode');

        document.body.appendChild(toggleButton);

        toggleButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            toggleButton.querySelector('i').className = 'fas fa-sun';
        }
    };

    setupDarkMode();

    // Gallery lightbox functionality
    const setupGalleryLightbox = () => {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${this.src}" alt="${this.alt}">
                        <button class="lightbox-close">&times;</button>
                    </div>
                `;
                document.body.appendChild(lightbox);

                lightbox.addEventListener('click', function(e) {
                    if (e.target === this || e.target.classList.contains('lightbox-close')) {
                        this.remove();
                    }
                });
            });
        });
    };

    if (document.querySelector('.gallery-item')) {
        setupGalleryLightbox();
    }

    // Performance monitoring
    const logPerformance = () => {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            });
        }
    };

    logPerformance();

});
