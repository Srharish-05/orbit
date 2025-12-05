// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // Mobile Menu Toggle
    // --------------------------------------------------------------------------
    const mobileBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('is-active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('is-active');
        });
    });

    // --------------------------------------------------------------------------
    // Helper: Wrap Letters for Animation
    // --------------------------------------------------------------------------
    // This looks for elements with class 'letters' and wraps every character in a span
    var textWrapper = document.querySelectorAll('.letters');
    textWrapper.forEach(wrapper => {
        wrapper.innerHTML = wrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    });

    // --------------------------------------------------------------------------
    // Hero & Intro Animations
    // --------------------------------------------------------------------------
    var timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1200
    });

    timeline
        // 1. Navbar
        .add({
            targets: '.nav-container',
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 1000
        })
        // 2. Letters Staggering (The "Anime.js" style effect)
        .add({
            targets: '.letters .letter',
            translateY: ["1.1em", 0],
            scaleY: [1.1, 1], // subtle stretch
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 900,
            delay: anime.stagger(50, { start: 300 }) // Stagger each letter
        }, '-=800')
        // 3. Subtitle & Buttons
        .add({
            targets: ['.hero-subtitle', '.hero-cta .btn'],
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000,
            delay: anime.stagger(100)
        }, '-=600')
        // 4. Orbit System/Icon Entrance
        .add({
            targets: '.orbit-system',
            opacity: [0, 1],
            scale: [0.8, 1],
            rotate: [-45, 0],
            duration: 1500,
            easing: 'spring(1, 80, 10, 0)'
        }, '-=1000');


    // --------------------------------------------------------------------------
    // Continuous Animations
    // --------------------------------------------------------------------------

    // Rotate the Orbit Rings at different speeds
    anime({
        targets: '.ring-1',
        rotate: '1turn',
        duration: 10000,
        loop: true,
        easing: 'linear'
    });

    anime({
        targets: '.ring-2',
        rotate: '-1turn',
        duration: 15000,
        loop: true,
        easing: 'linear'
    });

    anime({
        targets: '.ring-3',
        rotate: '1turn',
        duration: 20000, // Slowest
        loop: true,
        easing: 'linear'
    });

    // Gentle float for the Atom Icon
    anime({
        targets: '.hero-glitch-icon',
        translateY: [-10, 10],
        duration: 3000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });

    // --------------------------------------------------------------------------
    // Scroll Animations (IntersectionObserver)
    // --------------------------------------------------------------------------

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate IN
                if (entry.target.classList.contains('services-grid')) {
                    anime({
                        targets: '.service-card',
                        opacity: [0, 1],
                        translateY: [50, 0],
                        delay: anime.stagger(150),
                        easing: 'easeOutQuad',
                        duration: 800
                    });
                }

                if (entry.target.id === 'contact') {
                    anime({
                        targets: '.contact-text',
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        easing: 'easeOutQuad',
                        duration: 800
                    });

                    anime({
                        targets: '.contact-form',
                        opacity: [0, 1],
                        translateX: [50, 0],
                        easing: 'easeOutQuad',
                        duration: 800,
                        delay: 200
                    });
                }
            } else {
                // Animate OUT (Reset)
                if (entry.target.classList.contains('services-grid')) {
                    anime.set('.service-card', { opacity: 0, translateY: 50 });
                }

                if (entry.target.id === 'contact') {
                    anime.set('.contact-text', { opacity: 0, translateX: -50 });
                    anime.set('.contact-form', { opacity: 0, translateX: 50 });
                }
            }
        });
    }, observerOptions);

    // Observe sections
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) observer.observe(servicesGrid);

    const contactSection = document.getElementById('contact');
    if (contactSection) observer.observe(contactSection);

    // --------------------------------------------------------------------------
    // Form Handling
    // --------------------------------------------------------------------------
    const form = document.getElementById('lead-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation simulation
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.style.background = 'var(--clr-accent)';

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = 'var(--clr-secondary)';
                form.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = ''; // Revert to default class style
                }, 3000);
            }, 1500);
        });
    }
});
