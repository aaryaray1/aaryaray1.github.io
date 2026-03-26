// Project constellation data used to build the SVG constellation on the Projects page
const projects = [
    {
        id: 'captain-alex',
        name: 'Captain Alex',
        year: '2026',
        x: 150,
        y: 100
    },
    {
        id: 'portfolio-website',
        name: 'Portfolio Website',
        year: '2026',
        x: 300,
        y: 150
    },
    {
        id: 'homelab',
        name: 'Homelab',
        year: 'Ongoing',
        x: 450,
        y: 80
    },
    {
        id: 'machine-learning',
        name: 'Machine Learning',
        year: 'Ongoing',
        x: 550,
        y: 200
    },
    {
        id: 'good-times',
        name: 'Good Times Music Blog',
        year: '2025',
        x: 200,
        y: 350
    },
    {
        id: 'speeds7ers',
        name: 'Speeds7ers',
        year: '2024',
        x: 400,
        y: 400
    },
    {
        id: 'scout-agent-search',
        name: 'Scout Agent Search',
        year: 'Ongoing',
        x: 600,
        y: 300
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initProjectConstellation();
});

// Build a constellation similar in style to the homepage one, but for projects
function initProjectConstellation() {
    const svg = document.getElementById('projectsConstellation');
    if (!svg) return;

    const svgWidth = 800;
    const svgHeight = 600;
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2 - 20;
    const baseRadius = Math.min(svgWidth, svgHeight) / 3.2;
    const count = projects.length;

    // Position each project around a loose circle like the homepage
    const angleStep = (2 * Math.PI) / count;
    const stars = projects.map((project, idx) => {
        const angle = idx * angleStep + (Math.random() - 0.5) * 0.35;
        const r = baseRadius + (Math.random() - 0.5) * 45;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        return {
            x,
            y,
            label: project.name,
            project
        };
    });

    function buildLoopConnections() {
        const connections = [];
        for (let i = 0; i < count - 1; i++) {
            connections.push([i, i + 1]);
        }
        if (count > 2) connections.push([count - 1, 0]);
        return connections;
    }

    function buildStarConnections() {
        const connections = [];
        for (let i = 1; i < count; i++) {
            connections.push([0, i]);
        }
        return connections;
    }

    function buildWebConnections() {
        const connections = [];
        for (let i = 0; i < count; i++) {
            connections.push([i, (i + 1) % count]);
            connections.push([i, (i + 2) % count]);
        }
        return connections;
    }

    const patterns = [
        buildLoopConnections(),
        buildStarConnections(),
        buildWebConnections()
    ];
    const connections = patterns[Math.floor(Math.random() * patterns.length)];

    renderProjectConstellation(svg, stars, connections);
}

// Render the projects constellation as SVG with the same star/label style as the homepage
function renderProjectConstellation(svg, stars, connections) {
    svg.innerHTML = '';

    const linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    linesGroup.setAttribute('class', 'constellation-lines');

    connections.forEach(([i, j], idx) => {
        const a = stars[i];
        const b = stars[j];
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', a.x);
        line.setAttribute('y1', a.y);
        line.setAttribute('x2', b.x);
        line.setAttribute('y2', b.y);
        line.style.animationDelay = `${idx * 0.08}s`;
        linesGroup.appendChild(line);
    });

    svg.appendChild(linesGroup);

    const starsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    starsGroup.setAttribute('class', 'stars-group');

    stars.forEach((star, index) => {
        const starGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        starGroup.setAttribute('class', 'star-group');

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', star.x);
        circle.setAttribute('cy', star.y);
        circle.setAttribute('r', '11');
        circle.setAttribute('class', 'constellation-star');
        circle.style.animationDelay = `${index * 0.12}s`;

        // Click opens the project modal
        circle.addEventListener('click', (e) => {
            e.stopPropagation();
            showProjectCard(star.project);
        });

        // Hover toggles label visibility
        circle.addEventListener('mouseenter', () => {
            const label = starGroup.querySelector('.constellation-label');
            if (label) label.classList.add('visible');
        });
        circle.addEventListener('mouseleave', () => {
            const label = starGroup.querySelector('.constellation-label');
            if (label) label.classList.remove('visible');
        });

        starGroup.appendChild(circle);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', star.x);
        label.setAttribute('y', star.y - 20);
        label.setAttribute('class', 'constellation-label');
        label.textContent = star.label;

        starGroup.appendChild(label);
        starsGroup.appendChild(starGroup);
    });

    svg.appendChild(starsGroup);
}

function showProjectCard(project) {
    // Get the project card from HTML
    const projectCard = document.getElementById(project.id);
    if (!projectCard) return;

    // Remove existing modal if present
    const existing = document.getElementById('projectModal');
    if (existing) existing.remove();

    // Extract data from HTML card
    const header = projectCard.querySelector('.project-header h3');
    const year = projectCard.querySelector('.project-year');
    const description = projectCard.querySelector('.project-description');
    const techTags = projectCard.querySelectorAll('.tech-tag');
    const githubLink = projectCard.querySelector('.project-github');

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'projectModal';
    modal.className = 'project-modal';
    
    let ghButton = '';
    if (githubLink && githubLink.href !== '#') {
        ghButton = `<a href="${githubLink.href}" class="project-modal-github" target="_blank"><i class="fab fa-github"></i></a>`;
    }

    let techHTML = '';
    if (techTags.length > 0) {
        techHTML = '<div class="modal-tech">';
        techTags.forEach(tag => {
            techHTML += `<span class="tech-tag">${tag.textContent}</span>`;
        });
        techHTML += '</div>';
    }

    modal.innerHTML = `
        <div class="project-modal-content">
            <button class="modal-close">&times;</button>
            <h3>${header.textContent}</h3>
            <span class="modal-year">${year.textContent}</span>
            <p class="modal-description">${description.textContent}</p>
            ${techHTML}
            ${ghButton}
        </div>
    `;

    document.body.appendChild(modal);
    
    // Close button handler
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    // Animation
    setTimeout(() => modal.classList.add('active'), 10);
}
