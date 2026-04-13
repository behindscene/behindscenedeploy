// Elements
const sideNavs = document.querySelectorAll('.side-nav');
const bottomNav = document.querySelector('.bottom-nav');
const panels = document.querySelectorAll('.panel');
const closeButtons = document.querySelectorAll('.panel-close');

// Transition layers
const glitchLayer = document.querySelector('.glitch-layer');
const sliceLayer = document.querySelector('.slice-layer');
const morphLayer = document.querySelector('.morph-layer');

let isAnimating = false;

// Transition configurations
const transitions = {
    services: {
        layer: glitchLayer,
        openDuration: 800,
        closeDuration: 600
    },
    about: {
        layer: sliceLayer,
        openDuration: 900,
        closeDuration: 700
    },
    contact: {
        layer: morphLayer,
        openDuration: 1000,
        closeDuration: 800
    }
};

// Open panel with transition
function openPanel(panelId) {
    if (isAnimating) return;
    isAnimating = true;

    const panel = document.getElementById(panelId);
    const config = transitions[panelId];

    // Reset and activate transition layer
    config.layer.classList.remove('closing');
    config.layer.classList.add('active');

    // Show panel mid-transition
    setTimeout(() => {
        panel.classList.add('active');
    }, config.openDuration * 0.5);

    // Clean up transition layer
    setTimeout(() => {
        config.layer.classList.remove('active');
        isAnimating = false;
    }, config.openDuration);
}

// Close panel with transition
function closePanel(panelId) {
    if (isAnimating) return;
    isAnimating = true;

    const panel = document.getElementById(panelId);
    const config = transitions[panelId];

    // Start closing transition
    config.layer.classList.remove('active');
    config.layer.classList.add('closing');

    // Hide panel mid-transition
    setTimeout(() => {
        panel.classList.remove('active');
    }, config.closeDuration * 0.4);

    // Clean up
    setTimeout(() => {
        config.layer.classList.remove('closing');
        isAnimating = false;
    }, config.closeDuration);
}

// Event listeners for side navigation
sideNavs.forEach(nav => {
    nav.addEventListener('click', () => {
        const target = nav.dataset.target;
        openPanel(target);
    });

    // Hover sound effect (optional visual feedback)
    nav.addEventListener('mouseenter', () => {
        nav.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// Bottom navigation
bottomNav.addEventListener('click', () => {
    openPanel('contact');
});

// Close buttons
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const panel = btn.closest('.panel');
        closePanel(panel.id);
    });
});

// Keyboard close (Escape)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activePanel = document.querySelector('.panel.active');
        if (activePanel) {
            closePanel(activePanel.id);
        }
    }
});

// Initial animation for landing elements
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.center-logo');
    const leftNav = document.querySelector('.side-nav.left');
    const rightNav = document.querySelector('.side-nav.right');
    const bottomNavEl = document.querySelector('.bottom-nav');

    // Fade in elements with delay
    [logo, leftNav, rightNav, bottomNavEl].forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
            el.style.opacity = '1';
        }, 300 + (i * 200));
    });
});

// Mouse tracking for subtle parallax on landing
document.addEventListener('mousemove', (e) => {
    const logo = document.querySelector('.center-logo');
    const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

    logo.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
});

// ============ CUSTOM CURSOR ============

// Create cursor elements
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor cursor-dot';
document.body.appendChild(cursorDot);

// Trail elements
const trailCount = 5;
const trails = [];
for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor cursor-trail';
    trail.style.opacity = (1 - i / trailCount) * 0.3;
    document.body.appendChild(trail);
    trails.push({ element: trail, x: 0, y: 0 });
}

// Cursor position
let mouseX = 0;
let mouseY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Dot follows mouse directly
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    // Animate trails
    let prevX = mouseX;
    let prevY = mouseY;
    trails.forEach((trail, index) => {
        const speed = 0.2 - (index * 0.03);
        trail.x += (prevX - trail.x) * speed;
        trail.y += (prevY - trail.y) * speed;
        trail.element.style.left = trail.x + 'px';
        trail.element.style.top = trail.y + 'px';
        prevX = trail.x;
        prevY = trail.y;
    });

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effects
const hoverElements = document.querySelectorAll('a, .side-nav, .bottom-nav, .panel-close, .service-card');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('cursor-hover');
    });
});

// Click effect
document.addEventListener('mousedown', () => {
    cursorDot.classList.add('cursor-click');
});

document.addEventListener('mouseup', () => {
    cursorDot.classList.remove('cursor-click');
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    trails.forEach(t => t.element.style.opacity = '0');
});

document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    trails.forEach((t, i) => t.element.style.opacity = (1 - i / trailCount) * 0.3);
});
