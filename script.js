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

// Music Player Functionality
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.querySelector('.progress');
const timeDisplay = document.querySelector('.time');
const tracks = document.querySelectorAll('.track');

let currentTrack = 0;
let isPlaying = false;

// Initialize with first track
function initializePlayer() {
    const firstTrack = tracks[0];
    if (firstTrack) {
        const src = firstTrack.getAttribute('data-src');
        if (src) {
            audioPlayer.src = src;
            updateActiveTrack(0);
        }
    }
}

// Update active track styling
function updateActiveTrack(index) {
    tracks.forEach((track, i) => {
        if (i === index) {
            track.classList.add('active');
        } else {
            track.classList.remove('active');
        }
    });
    currentTrack = index;
}

// Track click handler
tracks.forEach((track, index) => {
    track.addEventListener('click', () => {
        const src = track.getAttribute('data-src');
        if (src) {
            audioPlayer.src = src;
            updateActiveTrack(index);
            playAudio();
        }
    });
});

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
});

function playAudio() {
    audioPlayer.play();
    playPauseBtn.textContent = '❚❚';
    isPlaying = true;
}

function pauseAudio() {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶';
    isPlaying = false;
}

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = progressPercent + '%';
        
        // Update time display
        const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        const durationMinutes = Math.floor(audioPlayer.duration / 60);
        const durationSeconds = Math.floor(audioPlayer.duration % 60);
        
        timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    }
});

// Progress bar click to seek
document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const progressBarWidth = e.currentTarget.offsetWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    
    if (duration) {
        audioPlayer.currentTime = (clickX / progressBarWidth) * duration;
    }
});

// Auto-play next track
audioPlayer.addEventListener('ended', () => {
    if (currentTrack < tracks.length - 1) {
        const nextTrack = tracks[currentTrack + 1];
        const src = nextTrack.getAttribute('data-src');
        if (src) {
            audioPlayer.src = src;
            updateActiveTrack(currentTrack + 1);
            playAudio();
        }
    } else {
        // Loop back to first track
        initializePlayer();
        pauseAudio();
    }
});

// Initialize player on load
window.addEventListener('load', initializePlayer);

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
console.log('%c JOHN DOE ', 'background: #111; color: #f8f8f8; font-size: 40px; font-weight: bold; padding: 10px 20px;');
console.log('%c Creative Developer × Photographer × Musician ', 'background: #444; color: #bbb; font-size: 16px; padding: 5px 10px;');
console.log('Interested in the code? Check out my GitHub: https://github.com/johndoe');

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
