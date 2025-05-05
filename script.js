// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Ensure loading screen disappears after 3 seconds maximum
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Fallback to ensure loading screen is removed
    setTimeout(() => {
        if (loadingScreen.style.display !== 'none') {
            loadingScreen.style.display = 'none';
        }
    }, 3000);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let followerX = mouseX;
let followerY = mouseY;
let isMoving = false;
let lastMoveTime = Date.now();

// Check if device is mobile
const isMobile = () => {
    return window.innerWidth <= 768;
};

// Initialize cursor
const initCursor = () => {
    if (!isMobile()) {
        // Set initial cursor position
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;
            lastMoveTime = Date.now();
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Enhanced cursor effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill, .timeline-item');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
                cursorFollower.style.borderColor = 'var(--primary-color)';
                cursorFollower.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.borderColor = 'var(--primary-color)';
                cursorFollower.style.backgroundColor = 'transparent';
            });
        });

        // Text hover effect
        const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
        textElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('text-hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('text-hover');
            });
        });
    } else {
        // Hide cursor on mobile
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
};

// Initialize cursor on load
document.addEventListener('DOMContentLoaded', initCursor);

// Re-initialize cursor on window resize
window.addEventListener('resize', initCursor);

// Typing Animation with enhanced effects
const typingText = document.querySelector('.typing-text');
const words = ['Developer', 'Designer', 'Student', 'Creator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Initialize typing animation
type();

// Enhanced Smooth Scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav-menu').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Modern Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Initialize timeline items
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease-out';
    
    const listItems = item.querySelectorAll('li');
    listItems.forEach(li => {
        li.style.opacity = '0';
        li.style.transform = 'translateX(-10px)';
        li.style.transition = 'all 0.3s ease';
    });
    
    timelineObserver.observe(item);
});

// Enhanced Skill Bar Animation
const skills = document.querySelectorAll('.skill');
const animateSkills = () => {
    skills.forEach((skill, index) => {
        setTimeout(() => {
            const level = skill.getAttribute('data-level');
            const skillLevel = skill.querySelector('.skill-level');
            skillLevel.style.width = level;
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0)';
        }, index * 200);
    });
};

// Intersection Observer for Skills
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-container .skill').forEach(skill => {
    skillsObserver.observe(skill);
});

// Enhanced Scroll Reveal Animation
const revealElements = document.querySelectorAll('.project-card, .skill, .timeline-item');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize scroll reveal with staggered animation
revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Navigation and Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const nav = document.querySelector('.nav-menu');
let lastScroll = 0;

// Function to close menu
const closeMenu = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    nav.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
};

// Function to open menu
const openMenu = () => {
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    nav.classList.add('menu-open');
    document.body.classList.add('menu-open');
};

// Function to toggle menu
const toggleMenu = () => {
    if (hamburger.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
};

// Hamburger Menu Toggle
hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// Close menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// Active Navigation on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Navbar Background and Animation on Scroll
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Background and shadow
    if (currentScroll > 50) {
        nav.style.background = 'rgba(10, 25, 47, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(10, 25, 47, 0.85)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function animateFollower() {
    // Smoothly move the follower towards the mouse
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    // If mouse hasn't moved for 200ms, move the dot to the center of the follower
    if (Date.now() - lastMoveTime > 200) {
        cursor.style.left = followerX + 'px';
        cursor.style.top = followerY + 'px';
    }

    requestAnimationFrame(animateFollower);
}

animateFollower();