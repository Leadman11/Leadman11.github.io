// Smooth scroll for navigation links
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

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible && !element.classList.contains('revealed')) {
            element.classList.add('reveal', 'active', 'revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Hero animation on page load
function initHeroAnimation() {
    // Only animate on desktop (width > 768px)
    if (window.innerWidth > 768) {
        const heroContent = document.querySelector('.hero-content');
        const heroAside = document.querySelector('.hero-aside');
        
        // Start the animation after a brief delay
        setTimeout(() => {
            heroContent.classList.add('animate-in');
            heroAside.classList.add('animate-in');
        }, 500);
    } else {
        // For mobile, trigger animation immediately
        const heroContent = document.querySelector('.hero-content');
        const heroAside = document.querySelector('.hero-aside');
        
        setTimeout(() => {
            heroContent.classList.add('animate-in');
            heroAside.classList.add('animate-in');
        }, 300);
    }
}

// Initialize hero animation on load
window.addEventListener('load', initHeroAnimation);

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImage');
const closeBtn = document.querySelector('.close');
const photoItems = document.querySelectorAll('.photo-item');

photoItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const fullSrc = img.getAttribute('data-full');
        const altText = img.getAttribute('alt');
        
        if (fullSrc) {
            lightboxImg.src = fullSrc;
            lightboxImg.alt = altText;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close lightbox
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Lazy loading enhancement for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Image is already loaded via native lazy loading
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

// Observe all images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

// Hero section scroll behavior
window.addEventListener('scroll', () => {
    // Regular scroll behavior without parallax
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

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

// Debounced scroll handler
const debouncedReveal = debounce(revealOnScroll, 100);
window.addEventListener('scroll', debouncedReveal);

// Add loading state for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already cached
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// Mobile menu toggle (if needed in future)
function isMobile() {
    return window.innerWidth <= 768;
}

// Adjust animations for mobile
if (isMobile()) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.transition = 'opacity 0.5s ease';
    });
}

// Console Easter egg
console.log('%c :) ', 'background: #111; color: #f8f8f8; font-size: 40px; font-weight: bold; padding: 10px 20px;');

// Highlight active section in navigation
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for active section highlighting
window.addEventListener('scroll', debounce(updateActiveSection, 100));
window.addEventListener('load', updateActiveSection);
