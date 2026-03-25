// Initialize constellation on page load
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('constellationCanvas');
    
    if (canvas) {
        // Get a random constellation and render it
        const constellation = getRandomConstellation();
        renderConstellation(constellation, canvas);

        // Optional: Log the constellation name for debugging
        console.log(`Loaded constellation: ${constellation.name}`);
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
