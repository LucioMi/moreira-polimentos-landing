// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu functionality
const navbarToggle = document.getElementById('navbar-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
const body = document.body;

// Focusable elements for focus trap
const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

function updateFocusableElements() {
    if (mobileMenu) {
        focusableElements = Array.from(mobileMenu.querySelectorAll(focusableElementsString));
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
    }
}

function openMobileMenu() {
    if (!mobileMenu || !mobileMenuOverlay) return;
    
    // Update ARIA attributes
    navbarToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    
    // Add active classes
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    navbarToggle.classList.add('active');
    
    // Lock body scroll
    body.style.overflow = 'hidden';
    
    // Animate hamburger menu
    const spans = navbarToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (index === 1) span.style.opacity = '0';
        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
    });
    
    // Set up focus trap
    updateFocusableElements();
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
}

function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuOverlay) return;
    
    // Update ARIA attributes
    navbarToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    
    // Remove active classes
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    navbarToggle.classList.remove('active');
    
    // Unlock body scroll
    body.style.overflow = '';
    
    // Reset hamburger menu
    const spans = navbarToggle.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
    });
    
    // Return focus to toggle button
    navbarToggle.focus();
}

// Toggle menu on hamburger button click
if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('active');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

// Close menu on close button click
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

// Close menu on overlay click
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking on links
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Handle ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    
    // Focus trap
    if (mobileMenu.classList.contains('active') && e.key === 'Tab') {
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }
});

// Prevent scroll when menu is open
document.addEventListener('touchmove', (e) => {
    if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target)) {
        e.preventDefault();
    }
}, { passive: false });

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const faqAnswer = faqItem.querySelector('.faq-answer');
        const isActive = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQ items
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.setAttribute('aria-expanded', 'false');
                const otherAnswer = otherQuestion.parentElement.querySelector('.faq-answer');
                otherAnswer.classList.remove('active');
            }
        });
        
        // Toggle current FAQ item
        if (isActive) {
            question.setAttribute('aria-expanded', 'false');
            faqAnswer.classList.remove('active');
        } else {
            question.setAttribute('aria-expanded', 'true');
            faqAnswer.classList.add('active');
        }
    });
});

// Portfolio Lightbox
const portfolioItems = document.querySelectorAll('.portfolio-item');
let lightbox = null;

// Create lightbox element
function createLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Fechar">&times;</button>
            <div class="lightbox-images">
                <div class="lightbox-before">
                    <img src="" alt="" />
                    <span class="portfolio-label">Antes</span>
                </div>
                <div class="lightbox-after">
                    <img src="" alt="" />
                    <span class="portfolio-label">Depois</span>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Close lightbox events
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

function openLightbox(beforeImg, afterImg, beforeAlt, afterAlt) {
    if (!lightbox) {
        createLightbox();
    }
    
    const beforeImage = lightbox.querySelector('.lightbox-before img');
    const afterImage = lightbox.querySelector('.lightbox-after img');
    
    beforeImage.src = beforeImg;
    beforeImage.alt = beforeAlt;
    afterImage.src = afterImg;
    afterImage.alt = afterAlt;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Removido comportamento de lightbox nos cards; carrossel controla navegação.

// Portfólio Carrossel
const carousels = document.querySelectorAll('.portfolio-carousel');
carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let index = 0;

    function updateCarousel() {
        if (!track) return;
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            index = (index - 1 + slides.length) % slides.length;
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            index = (index + 1) % slides.length;
            updateCarousel();
        });
    }

    // Inicializa a posição
    updateCarousel();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(`
    .service-card,
    .portfolio-item,
    .process-step,
    .differential-item,
    .testimonial-item,
    .contact-card
`);

animatedElements.forEach(el => {
    observer.observe(el);
});

// WhatsApp floating button animation
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    // Add click tracking (optional)
    whatsappFloat.addEventListener('click', () => {
        // You can add analytics tracking here if needed
        console.log('WhatsApp button clicked');
    });
}

// Form validation and submission (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\(\)\+\-]{10,}$/;
    return re.test(phone);
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

// Replace the original scroll event listener
window.removeEventListener('scroll', () => {});
window.addEventListener('scroll', optimizedScrollHandler);

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #D4AF37;
        color: #0B0B0B;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.2s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.id = 'main-content';
    }
});

// Error handling for external resources
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Failed to load image:', e.target.src);
        // You could add a placeholder image here
        e.target.style.display = 'none';
    }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics and tracking (placeholder)
function trackEvent(category, action, label) {
    // Add your analytics tracking code here
    console.log('Event tracked:', { category, action, label });
}

// Track CTA clicks
document.querySelectorAll('.btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'click', 'WhatsApp Button');
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionName = entry.target.id || entry.target.className;
            trackEvent('Section', 'view', sectionName);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});