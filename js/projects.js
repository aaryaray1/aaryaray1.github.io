// Project data used to build the Projects page, both in constellation
// and tile (simplified) view.
const projects = [
    {
        id: 'captain-alex',
        name: 'Captain Alex',
        year: '2026'
    },
    {
        id: 'portfolio-website',
        name: 'Portfolio Website',
        year: '2026'
    },
    {
        id: 'homelab',
        name: 'Homelab',
        year: 'Ongoing'
    },
    {
        id: 'machine-learning',
        name: 'Machine Learning',
        year: 'Ongoing'
    },
    {
        id: 'good-times',
        name: 'Good Times Music Blog',
        year: '2025'
    },
    {
        id: 'speeds7ers',
        name: 'Speeds7ers',
        year: '2024'
    },
    {
        id: 'scout-agent-search',
        name: 'Scout Agent Search',
        year: 'Ongoing'
    },
    {
        id: 'grow-kasterlee',
        name: 'Grow Kasterlee',
        year: ''
    },
    {
        id: 'the-andersons',
        name: 'The Andersons',
        year: ''
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're in simplified view mode
    const viewMode = localStorage.getItem('portfolioViewMode');

    // Only render constellation if in constellation view or if no preference set yet
    if (!viewMode || viewMode === 'constellation') {
        initProjectConstellation();
    }
});

// Build a real, night-sky-accurate constellation (same geometry engine as the
// homepage) and place each project on one of its stars.
function initProjectConstellation() {
    const svg = document.getElementById('projectsConstellation');
    if (!svg) return;

    const items = projects.map((project) => ({
        label: project.name,
        project
    }));

    const constellation = pickConstellationForItems(items);

    renderConstellation(constellation, svg, {
        onStarClick: (star) => showProjectCard(star.project)
    });

    const skyLabel = document.getElementById('skyLabel');
    if (skyLabel) {
        skyLabel.textContent = describeConstellation(constellation);
        // Trigger the fade-in transition on the next frame.
        requestAnimationFrame(() => skyLabel.classList.add('visible'));
    }
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
