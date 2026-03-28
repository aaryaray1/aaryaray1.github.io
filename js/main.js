// Initialize constellation and interactions on page load
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('constellationCanvas');
    
    if (canvas) {
        // Get a random constellation and render it
        const constellation = getRandomConstellation();
        renderConstellation(constellation, canvas);

        // Optional: Log the constellation name for debugging
        console.log(`Loaded constellation: ${constellation.name}`);
    }

    // Black hole "suck into home" transition
    const blackHole = document.querySelector('.black-hole-home');
    if (blackHole) {
        blackHole.addEventListener('click', (e) => {
            const href = blackHole.getAttribute('href');
            if (!href) return;

            e.preventDefault();

            // Trigger CSS animations
            document.body.classList.add('page-sucked');

            // After the animation completes, navigate to the target (home)
            setTimeout(() => {
                window.location.href = href;
            }, 1150);
        });
    }

    // Add smooth scroll behavior for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetSelector = this.getAttribute('href');
            if (!targetSelector || targetSelector === '#') return;

            const target = document.querySelector(targetSelector);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
