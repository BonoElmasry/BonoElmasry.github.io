// ============================
// Navbar Active Link & Mobile Menu
// ============================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        hamburger.setAttribute('aria-expanded', isOpen);
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'unset';
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Active link on click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ============================
// Active Section on Scroll (throttled)
// ============================
let ticking = false;

function updateActiveSection() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
    }
});

// Initialize active section on load
updateActiveSection();

// ============================
// Custom Cursor (performance optimized)
// ============================
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.7;
    transition: transform 0.15s ease-out;
    transform: translate(-50%, -50%);
    left: 0;
    top: 0;
`;
document.body.appendChild(cursor);

function hideCursorOnMobile() {
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    } else {
        cursor.style.display = 'block';
    }
}

// Initial check
hideCursorOnMobile();

// Update on resize
window.addEventListener('resize', hideCursorOnMobile);

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
});
