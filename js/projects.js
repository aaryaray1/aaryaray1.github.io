// Project constellation data with actual constellation names
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

function initProjectConstellation() {
    const canvas = document.getElementById('projectsCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = 'rgba(194, 191, 240, 0.4)';
    ctx.lineWidth = 1.5;

    // Multiple connection patterns for the project "constellation"
    const count = projects.length;

    function drawLoop() {
        for (let i = 0; i < count; i++) {
            const a = projects[i];
            const b = projects[(i + 1) % count];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
    }

    function drawStar() {
        const center = projects[0];
        for (let i = 1; i < count; i++) {
            const p = projects[i];
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        }
    }

    function drawCrissCross() {
        for (let i = 0; i < count; i++) {
            const a = projects[i];
            const b = projects[(i + Math.floor(count / 2)) % count];
            if (a === b) continue;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
    }

    function drawPath() {
        for (let i = 0; i < count - 1; i++) {
            const a = projects[i];
            const b = projects[i + 1];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
    }

    function drawRandomGraph() {
        // connect in a path first
        drawPath();
        // then add a few random extra edges
        const extra = Math.max(1, Math.floor(count / 2));
        for (let k = 0; k < extra; k++) {
            const i = Math.floor(Math.random() * count);
            let j = Math.floor(Math.random() * count);
            if (i === j) j = (j + 1) % count;
            const a = projects[i];
            const b = projects[j];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
    }

    const patterns = [drawLoop, drawStar, drawCrissCross, drawPath, drawRandomGraph];
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    pattern();

    // Draw project stars
    projects.forEach((project, index) => {
        // Star circle
        ctx.fillStyle = 'rgba(194, 191, 240, 0.9)';
        ctx.beginPath();
        ctx.arc(project.x, project.y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.shadowColor = 'rgba(194, 191, 240, 0.8)';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = 'rgba(194, 191, 240, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(project.x, project.y, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    });
    // Add click handlers
    canvas.addEventListener('click', (e) => handleCanvasClick(e, canvas));
}

function handleCanvasClick(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check if click is near any project
    for (const project of projects) {
        const dx = x - project.x;
        const dy = y - project.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 20) {
            showProjectCard(project);
            return;
        }
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
