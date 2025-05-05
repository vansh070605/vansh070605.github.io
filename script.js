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
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
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

// Enhanced Timeline Animation with Particles
const createParticle = (x, y) => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.6;
        box-shadow: 0 0 10px var(--primary-color);
    `;
    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    let opacity = 0.6;

    const animate = () => {
        if (opacity <= 0) {
            particle.remove();
            return;
        }
        opacity -= 0.02;
        particle.style.opacity = opacity;
        particle.style.transform = `translate(${vx}px, ${vy}px)`;
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
};

// Enhanced Timeline Observer
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add particle effect when timeline item becomes visible
            const rect = entry.target.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createParticle(x, y), i * 100);
            }
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize timeline items
timelineItems.forEach(item => {
    // Set initial state
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.4s ease';
    
    // Make list items visible immediately
    const listItems = item.querySelectorAll('li');
    listItems.forEach(li => {
        li.style.opacity = '1';
        li.style.transform = 'translateX(0)';
        li.style.transition = 'all 0.3s ease';
    });
    
    // Observe the item
    timelineObserver.observe(item);
});

// Force initial visibility check
const checkInitialVisibility = () => {
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isVisible) {
            item.classList.add('visible');
        }
    });
};

// Run initial visibility check
document.addEventListener('DOMContentLoaded', checkInitialVisibility);
window.addEventListener('load', checkInitialVisibility);

// Enhanced Resume Column Interactions
const resumeColumns = document.querySelectorAll('.resume-column');
resumeColumns.forEach(column => {
    column.addEventListener('mouseenter', () => {
        column.style.transform = 'translateY(-5px)';
        column.style.borderColor = 'var(--primary-color)';
        column.style.boxShadow = '0 10px 30px rgba(100, 255, 218, 0.1)';
    });
    
    column.addEventListener('mouseleave', () => {
        column.style.transform = 'translateY(0)';
        column.style.borderColor = 'var(--glass-border)';
        column.style.boxShadow = 'none';
    });
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