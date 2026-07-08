/* =============================================
   ශ්‍රී ලංකා උරුමය - Sri Lanka Heritage
   Main JavaScript
   ============================================= */

'use strict';

// ----- DOM READY -----
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initActiveNav();
    initSmoothScroll();
    initContactForm();
    initHeroSlideshow();
});

// ----- MOBILE MENU TOGGLE -----
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-list li a');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

// ----- SCROLL ANIMATIONS (Intersection Observer) -----
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!fadeElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation to save resources
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

// ----- BACK TO TOP BUTTON -----
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Smooth scroll to top
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ----- ACTIVE NAV LINK ON SCROLL -----
function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-list li a');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', function() {
        var scrollPos = window.scrollY + 100;

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                for (var j = 0; j < navLinks.length; j++) {
                    navLinks[j].classList.remove('active');
                    if (navLinks[j].getAttribute('href') === '#' + sectionId) {
                        navLinks[j].classList.add('active');
                    }
                }
            }
        }
    });
}

// ----- SMOOTH SCROLL FOR ANCHOR LINKS -----
function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (!href || href === '#') return;

            var targetElement = document.getElementById(href.substring(1));
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// ----- CONTACT FORM (with validation & simulated submission) -----
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]');
        const email = form.querySelector('input[type="email"]');
        const subject = form.querySelector('input[placeholder="විෂය"]');
        const message = form.querySelector('textarea');

        // Basic validation
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(email.value)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate sending
        const submitBtn = form.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showFormMessage('Your message has been sent successfully! Thank you.', 'success');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 1500);
    });
}

// ----- HELPER: Valide email -----
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ----- HELPER: Show form message -----
function showFormMessage(msg, type) {
    // Remove existing message
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();

    const messageEl = document.createElement('div');
    messageEl.className = 'form-message';
    messageEl.textContent = msg;
    messageEl.style.padding = '12px 20px';
    messageEl.style.borderRadius = '10px';
    messageEl.style.marginTop = '12px';
    messageEl.style.fontWeight = '500';
    messageEl.style.animation = 'fadeInUp 0.3s ease';

    if (type === 'success') {
        messageEl.style.background = '#d4edda';
        messageEl.style.color = '#155724';
        messageEl.style.border = '1px solid #c3e6cb';
    } else {
        messageEl.style.background = '#f8d7da';
        messageEl.style.color = '#721c24';
        messageEl.style.border = '1px solid #f5c6cb';
    }

    const form = document.querySelector('.contact-form');
    if (form) form.appendChild(messageEl);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) messageEl.remove();
    }, 5000);
}

// =============================================
// HERO SLIDESHOW BACKGROUND
// =============================================
var heroSlideIndex = 1;
var heroSlideTimer = null;
var HERO_SLIDE_INTERVAL = 3000; // 3 seconds

function initHeroSlideshow() {
    var slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    // Set first slide active
    slides[0].classList.add('active');
    heroSlideIndex = 1;

    startHeroAutoPlay();
}

function showHeroSlide(n) {
    var slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    // Save the CURRENT active slide index BEFORE changing it
    var prevIndex = heroSlideIndex;

    // Set new index with wrapping
    if (n > slides.length) heroSlideIndex = 1;
    else if (n < 1) heroSlideIndex = slides.length;
    else heroSlideIndex = n;

    // Exit the previous slide (slide out to left)
    if (slides[prevIndex - 1]) {
        slides[prevIndex - 1].classList.remove('active');
        slides[prevIndex - 1].classList.add('exit');
    }

    // Enter the new slide (slide in from right)
    slides[heroSlideIndex - 1].classList.remove('exit');
    slides[heroSlideIndex - 1].classList.add('active');

    // Clean up exit class after animation completes
    if (slides[prevIndex - 1]) {
        setTimeout(function() {
            slides[prevIndex - 1].classList.remove('exit');
        }, 700);
    }
}

function startHeroAutoPlay() {
    stopHeroAutoPlay();
    heroSlideTimer = setInterval(function() {
        showHeroSlide(heroSlideIndex + 1);
    }, HERO_SLIDE_INTERVAL);
}

function stopHeroAutoPlay() {
    if (heroSlideTimer) {
        clearInterval(heroSlideTimer);
        heroSlideTimer = null;
    }
}
