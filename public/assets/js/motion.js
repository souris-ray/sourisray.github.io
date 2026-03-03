/**
 * Motion Engineering - Vanilla JS
 * Handles staggered reveals and magnetic interactions without heavy libraries.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveals();
    initMagneticInteractions();
    initSpotlightCards();
});

/**
 * 1. Staggered Intersection Observer (Waterfall Reveals)
 */
function initScrollReveals() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger the CSS transition
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need to animate in
    const animatedElements = document.querySelectorAll('.script-card, .hero-content');

    // Assign a staggered --index if not manually set
    animatedElements.forEach((el, i) => {
        if (!el.style.getPropertyValue('--index')) {
            el.style.setProperty('--index', i % 10);
        }
        observer.observe(el);
    });
}

/**
 * 2. Spotlight Border Glow for Script Cards
 */
function initSpotlightCards() {
    const cards = document.querySelectorAll('.script-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update CSS variables for the radial gradient center
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/**
 * 3. Magnetic Hover Physics for Primary Buttons
 */
function initMagneticInteractions() {
    const magneticElements = document.querySelectorAll('.btn-primary');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const h = rect.width / 2;

            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle pull
            el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        el.addEventListener('mouseleave', () => {
            // Reset to original position with a spring-like CSS transition
            el.style.transform = 'translate(0px, 0px)';
        });
    });
}
