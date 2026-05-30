// ===========================
// Preloader Management
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    
    const removePreloader = () => {
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.pointerEvents = 'none';
                preloader.style.transition = 'opacity 0.6s ease-out';
            }, 1200);
        }
    };

    if (document.readyState === 'complete') {
        removePreloader();
    } else {
        window.addEventListener('load', removePreloader);
    }

    // ===========================
    // Smooth Scroll Setup
    // ===========================

    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }
            });
        });
    };

    setupSmoothScroll();

    // ===========================
    // Intersection Observer for Animations
    // ===========================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // ===========================
    // Header Scroll Effect
    // ===========================

    const header = document.getElementById('header');
    let lastScrollTop = 0;

    const handleHeaderScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('scroll-active');
        } else {
            header.classList.remove('scroll-active');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleHeaderScroll);

    // ===========================
    // Project Items Hover Animation
    // ===========================

    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            projectItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.opacity = '0.7';
                    otherItem.style.transform = 'scale(0.95)';
                }
            });
        });

        item.addEventListener('mouseleave', function() {
            projectItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'scale(1)';
            });
        });
    });

    // ===========================
    // Grid Item Stagger Animation
    // ===========================

    const gridItems = document.querySelectorAll('.grid__item');
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
    });

    // ===========================
    // Tech List Interactive
    // ===========================

    const techListItems = document.querySelectorAll('.tech-list li');
    
    techListItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animation = `fadeInUp 0.6s ease-out ${0.4 + index * 0.1}s forwards`;
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // ===========================
    // CTA Button Ripple Effect
    // ===========================

    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    }

    // ===========================
    // Active Link Highlighting
    // ===========================

    const updateActiveLink = () => {
        const sections = document.querySelectorAll('.section, .hero, .cta-section');
        const navLinks = document.querySelectorAll('.header__link');

        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = 'var(--text-color)';
                });

                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.style.color = 'var(--primary-color)';
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);

    // ===========================
    // Image Box Parallax Effect
    // ===========================

    const imageBoxes = document.querySelectorAll('.image-box');

    window.addEventListener('scroll', () => {
        imageBoxes.forEach(box => {
            const rect = box.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

            if (scrollPercent > 0 && scrollPercent < 1) {
                box.style.transform = `translateY(${scrollPercent * 20 - 10}px)`;
            }
        });
    });

    // ===========================
    // Footer Links Animation
    // ===========================

    const footerLinks = document.querySelectorAll('.footer-list li a');

    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // ===========================
    // Keyboard Navigation
    // ===========================

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Add any escape key functionality here
        }

        // Arrow key navigation through sections
        if (e.key === 'ArrowDown') {
            window.scrollBy({
                top: 300,
                behavior: 'smooth'
            });
        }

        if (e.key === 'ArrowUp') {
            window.scrollBy({
                top: -300,
                behavior: 'smooth'
            });
        }
    });

    // ===========================
    // Page Visibility API
    // ===========================

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = 'Come back to STAI!';
        } else {
            document.title = 'Supermarket Theft Detection AI';
        }
    });

    // ===========================
    // Performance Monitoring
    // ===========================

    const logPerformanceMetrics = () => {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const navigation = timing.navigationStart;
            const loadComplete = timing.loadEventEnd;
            const readyStart = timing.domContentLoadedEventStart;
            const readyEnd = timing.domContentLoadedEventEnd;
            const ready = readyEnd - readyStart;
            const loadTime = loadComplete - navigation;

            console.log('Performance Metrics:');
            console.log(`- DOM Ready: ${ready}ms`);
            console.log(`- Page Load: ${loadTime}ms`);
        }
    };

    window.addEventListener('load', logPerformanceMetrics);

    // ===========================
    // Initialization Complete
    // ===========================

    console.log('STAI - Supermarket Theft Detection AI Initialized');
});

// ===========================
// Utility Functions
// ===========================

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector of target element
 * @param {number} offset - Offset from top in pixels
 */
function scrollToElement(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

/**
 * Add animation class to element
 * @param {string} selector - CSS selector
 * @param {string} animationClass - Animation class name
 */
function addAnimation(selector, animationClass) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add(animationClass);
    }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce function to limit how often a function can execute
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function}
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
