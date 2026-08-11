// Initialize constellation and interactions on page load
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('constellationCanvas');
    
    if (canvas) {
        // Check if we're in simplified view mode
        const viewMode = localStorage.getItem('portfolioViewMode');
        
        // Only render constellation if in constellation view or if no preference set yet
        if (!viewMode || viewMode === 'constellation') {
            // Get a random real night-sky constellation and render it
            const constellation = getRandomConstellation();
            renderConstellation(constellation, canvas);

            // Let visitors know which real constellation they're looking at
            const skyLabel = document.getElementById('skyLabel');
            if (skyLabel) {
                skyLabel.textContent = describeConstellation(constellation);
                requestAnimationFrame(() => skyLabel.classList.add('visible'));
            }
        }
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
