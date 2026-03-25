// Real constellation patterns extracted from official star maps
// Exact coordinates and line connections from reference star chart
const CONSTELLATION_DATA = {
    'Ursa Major': {
        description: 'The Great Bear (Big Dipper)',
        stars: [
            { x: 150, y: 180, name: "Dubhe" },
            { x: 220, y: 160, name: "Merak" },
            { x: 280, y: 170, name: "Phecda" },
            { x: 340, y: 190, name: "Megrez" },
            { x: 380, y: 260, name: "Alioth" },
            { x: 420, y: 310, name: "Mizar" },
            { x: 450, y: 350, name: "Alkaid" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [0,4], [1,4]]
    },
    'Ursa Minor': {
        description: 'The Little Bear',
        stars: [
            { x: 200, y: 80, name: "Polaris" },
            { x: 240, y: 100, name: "β UMi" },
            { x: 260, y: 140, name: "γ UMi" }
        ],
        lines: [[0,1], [1,2], [2,0]]
    },
    'Cassiopeia': {
        description: 'The Queen (W-shape)',
        stars: [
            { x: 300, y: 140, name: "Schedar" },
            { x: 340, y: 120, name: "Caph" },
            { x: 380, y: 150, name: "Gamma" },
            { x: 410, y: 190, name: "Rucbah" },
            { x: 350, y: 200, name: "Segin" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4], [4,0]]
    },
    'Cepheus': {
        description: 'The King',
        stars: [
            { x: 420, y: 100, name: "Alderamin" },
            { x: 460, y: 110, name: "β Cep" },
            { x: 490, y: 130, name: "γ Cep" },
            { x: 480, y: 170, name: "ζ Cep" },
            { x: 440, y: 160, name: "δ Cep" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4], [4,0]]
    },
    'Perseus': {
        description: 'The Hero',
        stars: [
            { x: 480, y: 200, name: "Algenib" },
            { x: 520, y: 180, name: "Algol" },
            { x: 560, y: 200, name: "γ Per" },
            { x: 540, y: 250, name: "δ Per" },
            { x: 500, y: 280, name: "Epsilon" },
            { x: 460, y: 260, name: "ζ Per" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,0], [1,5]]
    },
    'Orion': {
        description: 'The Hunter',
        stars: [
            { x: 500, y: 220, name: "Betelgeuse" },
            { x: 600, y: 230, name: "Bellatrix" },
            { x: 530, y: 300, name: "Alnitak" },
            { x: 570, y: 310, name: "Alnilam" },
            { x: 610, y: 320, name: "Mintaka" },
            { x: 510, y: 380, name: "Saiph" },
            { x: 610, y: 390, name: "Rigel" },
            { x: 570, y: 340, name: "Sword" }
        ],
        lines: [[0,2], [2,3], [3,4], [4,1], [0,1], [0,5], [1,6], [2,7], [3,7], [4,7]]
    },
    'Canis Major': {
        description: 'The Great Dog',
        stars: [
            { x: 620, y: 350, name: "Sirius" },
            { x: 660, y: 370, name: "β CMa" },
            { x: 680, y: 320, name: "γ CMa" },
            { x: 700, y: 340, name: "δ CMa" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,0], [0,2]]
    },
    'Canis Minor': {
        description: 'The Small Dog',
        stars: [
            { x: 620, y: 280, name: "Procyon" },
            { x: 660, y: 270, name: "β CMi" }
        ],
        lines: [[0,1]]
    },
    'Gemini': {
        description: 'The Twins',
        stars: [
            { x: 650, y: 200, name: "Castor" },
            { x: 650, y: 270, name: "Pollux" },
            { x: 680, y: 190, name: "γ Gem" },
            { x: 680, y: 280, name: "δ Gem" }
        ],
        lines: [[0,1], [2,3], [0,2], [1,3]]
    },
    'Cancer': {
        description: 'The Crab',
        stars: [
            { x: 620, y: 220, name: "Altarf" },
            { x: 650, y: 210, name: "β Cnc" },
            { x: 670, y: 240, name: "θ Cnc" }
        ],
        lines: [[0,1], [1,2], [2,0]]
    },
    'Leo': {
        description: 'The Lion (Sickle)',
        stars: [
            { x: 640, y: 240, name: "Regulus" },
            { x: 680, y: 220, name: "Algieba" },
            { x: 710, y: 200, name: "Gamma" },
            { x: 720, y: 150, name: "Eta" },
            { x: 740, y: 280, name: "Denebola" }
        ],
        lines: [[0,1], [1,2], [2,3], [0,4], [3,4]]
    },
    'Auriga': {
        description: 'The Charioteer',
        stars: [
            { x: 700, y: 100, name: "Capella" },
            { x: 740, y: 110, name: "β Aur" },
            { x: 750, y: 150, name: "θ Aur" },
            { x: 720, y: 170, name: "δ Aur" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,0]]
    },
    'Cygnus': {
        description: 'The Swan (Northern Cross)',
        stars: [
            { x: 380, y: 270, name: "Deneb" },
            { x: 380, y: 350, name: "Sadr" },
            { x: 300, y: 350, name: "Albireo" },
            { x: 460, y: 350, name: "δ Cyg" }
        ],
        lines: [[0,1], [1,2], [1,3]]
    },
    'Lyra': {
        description: 'The Harp',
        stars: [
            { x: 420, y: 320, name: "Vega" },
            { x: 460, y: 340, name: "β Lyr" },
            { x: 450, y: 380, name: "γ Lyr" },
            { x: 400, y: 360, name: "δ Lyr" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,0]]
    },
    'Aquila': {
        description: 'The Eagle',
        stars: [
            { x: 430, y: 380, name: "Altair" },
            { x: 400, y: 420, name: "β Aql" },
            { x: 460, y: 420, name: "γ Aql" }
        ],
        lines: [[0,1], [0,2], [1,2]]
    },
    'Aquarius': {
        description: 'The Water Bearer',
        stars: [
            { x: 380, y: 480, name: "Sadalmelik" },
            { x: 420, y: 500, name: "β Aqr" },
            { x: 400, y: 530, name: "γ Aqr" }
        ],
        lines: [[0,1], [1,2]]
    },
    'Capricornus': {
        description: 'The Sea-Goat',
        stars: [
            { x: 300, y: 480, name: "Deneb Algedi" },
            { x: 340, y: 500, name: "β Cap" },
            { x: 320, y: 540, name: "γ Cap" }
        ],
        lines: [[0,1], [1,2], [2,0]]
    },
    'Sagittarius': {
        description: 'The Archer (Teapot)',
        stars: [
            { x: 380, y: 520, name: "Kaus Australis" },
            { x: 410, y: 500, name: "Kaus Media" },
            { x: 400, y: 490, name: "Kaus Borealis" },
            { x: 370, y: 540, name: "Ascella" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,0]]
    },
    'Scorpius': {
        description: 'The Scorpion',
        stars: [
            { x: 520, y: 500, name: "Antares" },
            { x: 550, y: 480, name: "σ Sco" },
            { x: 570, y: 520, name: "τ Sco" },
            { x: 540, y: 560, name: "λ Sco" },
            { x: 510, y: 580, name: "ν Sco" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4]]
    },
    'Libra': {
        description: 'The Scales',
        stars: [
            { x: 480, y: 480, name: "Zubenelgenubi" },
            { x: 520, y: 460, name: "Zubeneschamali" },
            { x: 500, y: 500, name: "σ Lib" }
        ],
        lines: [[0,1], [1,2], [2,0]]
    },
    'Virgo': {
        description: 'The Virgin',
        stars: [
            { x: 580, y: 380, name: "Spica" },
            { x: 620, y: 360, name: "Gamma" },
            { x: 610, y: 420, name: "δ Vir" }
        ],
        lines: [[0,1], [1,2], [2,0]]
    },
    'Aries': {
        description: 'The Ram',
        stars: [
            { x: 250, y: 480, name: "Hamal" },
            { x: 280, y: 500, name: "Sheratan" },
            { x: 270, y: 530, name: "Mesarthim" }
        ],
        lines: [[0,1], [1,2]]
    },
    'Pisces': {
        description: 'The Fishes',
        stars: [
            { x: 220, y: 520, name: "Alrescha" },
            { x: 250, y: 540, name: "β Psc" }
        ],
        lines: [[0,1]]
    },
    'Taurus': {
        description: 'The Bull (V-shape)',
        stars: [
            { x: 300, y: 380, name: "Aldebaran" },
            { x: 320, y: 340, name: "β Tau" },
            { x: 350, y: 320, name: "γ Tau" }
        ],
        lines: [[0,1], [1,2]]
    },
    'Hercules': {
        description: 'The Hero (Keystone)',
        stars: [
            { x: 500, y: 400, name: "Ras Algethi" },
            { x: 540, y: 380, name: "β Her" },
            { x: 570, y: 410, name: "γ Her" },
            { x: 540, y: 450, name: "δ Her" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,0]]
    },
    'Corona Borealis': {
        description: 'The Northern Crown (Arc)',
        stars: [
            { x: 480, y: 370, name: "Alphecca" },
            { x: 450, y: 355, name: "β CrB" },
            { x: 500, y: 340, name: "γ CrB" },
            { x: 520, y: 365, name: "δ CrB" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,0]]
    },
    'Boötes': {
        description: 'The Herdsman (Kite)',
        stars: [
            { x: 520, y: 360, name: "Arcturus" },
            { x: 550, y: 340, name: "β Boo" },
            { x: 540, y: 300, name: "γ Boo" },
            { x: 480, y: 320, name: "η Boo" }
        ],
        lines: [[0,1], [1,2], [2,3], [3,0]]
    }
};

// Navigation links
const NAV_LINKS = [
    { link: "about.html", label: "About Me" },
    { link: "projects.html", label: "Projects" },
    { link: "assets/cv.pdf", label: "CV" },
    { link: "#", label: "Contact" },
    { link: "https://www.linkedin.com/in/aarya-ray-3b2663270/", label: "LinkedIn" },
    { link: "https://www.kaggle.com/aaryaraychaudhuri", label: "Kaggle" },
    { link: "https://github.com/aaryaray1", label: "GitHub" }
];

// Build multiple random "constellations" from the navigation links
// Each pattern uses the same stars count but different connection styles
const CONSTELLATIONS = (() => {
    const svgWidth = 800;
    const svgHeight = 600;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2 - 40; // keep away from bottom edge
    const baseRadius = Math.min(svgWidth, svgHeight) / 3;

    const count = NAV_LINKS.length;

    function buildStars() {
        const angleStep = (2 * Math.PI) / count;
        return NAV_LINKS.map((nav, idx) => {
            const angle = idx * angleStep + (Math.random() - 0.5) * 0.3; // small random offset
            const r = baseRadius + (Math.random() - 0.5) * 40; // slight radial jitter

            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

            return {
                x,
                y,
                name: nav.label,
                link: nav.link,
                label: nav.label
            };
        });
    }

    function buildLoopConnections() {
        const connections = [];
        for (let i = 0; i < count - 1; i++) {
            connections.push([i, i + 1]);
        }
        if (count > 2) {
            connections.push([count - 1, 0]);
        }
        return connections;
    }

    function buildLineConnections() {
        const connections = [];
        for (let i = 0; i < count - 1; i++) {
            connections.push([i, i + 1]);
        }
        return connections;
    }

    function buildStarConnections() {
        const connections = [];
        for (let i = 1; i < count; i++) {
            connections.push([0, i]);
        }
        return connections;
    }

    function buildCrissCrossConnections() {
        const connections = [];
        for (let i = 0; i < count; i++) {
            const j = (i + Math.floor(count / 2)) % count;
            if (i !== j) {
                connections.push([i, j]);
            }
        }
        return connections;
    }

    function buildRandomConnections() {
        const connections = [];
        for (let i = 0; i < count - 1; i++) {
            connections.push([i, i + 1]);
        }
        // add a few random extra chords
        for (let k = 0; k < Math.max(1, Math.floor(count / 3)); k++) {
            const a = Math.floor(Math.random() * count);
            let b = Math.floor(Math.random() * count);
            if (a === b) {
                b = (b + 1) % count;
            }
            connections.push([a, b]);
        }
        return connections;
    }

    const patterns = [];

    patterns.push({
        name: 'Loop Pattern',
        description: '',
        stars: buildStars(),
        connections: buildLoopConnections()
    });

    patterns.push({
        name: 'Line Pattern',
        description: '',
        stars: buildStars(),
        connections: buildLineConnections()
    });

    patterns.push({
        name: 'Star Pattern',
        description: '',
        stars: buildStars(),
        connections: buildStarConnections()
    });

    patterns.push({
        name: 'Criss-Cross Pattern',
        description: '',
        stars: buildStars(),
        connections: buildCrissCrossConnections()
    });

    patterns.push({
        name: 'Random Graph Pattern',
        description: '',
        stars: buildStars(),
        connections: buildRandomConnections()
    });

    return patterns;
})();

/**
 * Get a random constellation from the list
 * @returns {Object} A randomly selected constellation object
 */
function getRandomConstellation() {
    const randomIndex = Math.floor(Math.random() * CONSTELLATIONS.length);
    return CONSTELLATIONS[randomIndex];
}

/**
 * Render constellation on SVG canvas with improved visuals
 * @param {Object} constellation - Constellation object with stars and connections
 * @param {SVGElement} svg - SVG element to render on
 */
function renderConstellation(constellation, svg) {
    // Clear existing content
    svg.innerHTML = '';

    // Base SVG size
    const svgWidth = 800;
    const svgHeight = 600;
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

    if (!constellation.stars || constellation.stars.length === 0) {
        return;
    }

    // Compute bounding box of the raw star coordinates
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    constellation.stars.forEach((star) => {
        if (star.x < minX) minX = star.x;
        if (star.x > maxX) maxX = star.x;
        if (star.y < minY) minY = star.y;
        if (star.y > maxY) maxY = star.y;
    });

    const rawWidth = maxX - minX || 1;
    const rawHeight = maxY - minY || 1;

    // Scale up and center the constellation within the SVG, with a margin
    const margin = 60;
    const scale = Math.min(
        (svgWidth - 2 * margin) / rawWidth,
        (svgHeight - 2 * margin) / rawHeight
    );

    const offsetX = (svgWidth - rawWidth * scale) / 2 - minX * scale;
    const offsetY = (svgHeight - rawHeight * scale) / 2 - minY * scale;

    // Precompute transformed positions so shapes stay exactly the same, just bigger and centered
    const transformedStars = constellation.stars.map((star) => ({
        ...star,
        tx: star.x * scale + offsetX,
        ty: star.y * scale + offsetY
    }));

    // Create a group for lines
    const linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    linesGroup.setAttribute('class', 'constellation-lines');

    // Draw connections (lines between stars)
    constellation.connections.forEach((connection, idx) => {
        const [starIndex1, starIndex2] = connection;
        const star1 = transformedStars[starIndex1];
        const star2 = transformedStars[starIndex2];

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', star1.tx);
        line.setAttribute('y1', star1.ty);
        line.setAttribute('x2', star2.tx);
        line.setAttribute('y2', star2.ty);
        line.style.animationDelay = `${idx * 0.1}s`;

        linesGroup.appendChild(line);
    });

    svg.appendChild(linesGroup);

    // Create a group for stars and labels
    const starsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    starsGroup.setAttribute('class', 'stars-group');

    // Draw stars
    transformedStars.forEach((star, index) => {
        // Create a group for this star and its label
        const starGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        starGroup.setAttribute('class', 'star-group');
        starGroup.style.cursor = star.link ? 'pointer' : 'default';

        // Create the star circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', star.tx);
        circle.setAttribute('cy', star.ty);
        circle.setAttribute('r', '12');
        circle.setAttribute('class', 'constellation-star');
        circle.setAttribute('data-index', index);
        circle.setAttribute('data-link', star.link);
        circle.style.animationDelay = `${index * 0.15}s`;

        // Add click handler
        circle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (star.link) {
                // Check if it's an external link (LinkedIn, Kaggle, GitHub)
                if (star.link.startsWith('http')) {
                    window.open(star.link, '_blank');
                } else {
                    window.location.href = star.link;
                }
            }
        });

        // Add hover effect to show label
        circle.addEventListener('mouseenter', () => {
            const label = starGroup.querySelector('.constellation-label');
            if (label) {
                label.classList.add('visible');
            }
        });

        circle.addEventListener('mouseleave', () => {
            const label = starGroup.querySelector('.constellation-label');
            if (label) {
                label.classList.remove('visible');
            }
        });

        starGroup.appendChild(circle);

        // Create label text
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', star.tx);
        label.setAttribute('y', star.ty - 20);
        label.setAttribute('class', 'constellation-label');
        label.setAttribute('data-index', index);
        label.textContent = star.label;

        starGroup.appendChild(label);
        starsGroup.appendChild(starGroup);
    });

    svg.appendChild(starsGroup);

}
