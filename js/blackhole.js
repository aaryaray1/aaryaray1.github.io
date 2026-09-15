// Clicking the black hole throws the page onto a decaying spiral into it.

(function () {
    'use strict';

    const FALL = 1250;
    const SWIRL = 3.0;
    const STEPS = 18;

    // One level into each container, so a paragraph or a card falls on its own.
    const SHARDS = [
        '.hero-text > *',
        '#constellationCanvas',
        '.projects-header > *',
        '.constellation-view > *',
        '.project-card',
        '.about-header > *',
        '.about-text > *',
        '.skills-section',
        '.simplified-header > *',
        '.simplified-card-link',
        '.simplified-footer-section > h2',
        '.simplified-footer-section .social-link',
        '.footer-links > *',
        '.footer > p',
        '.view-toggle-btn'
    ].join(', ');

    function centreOf(el) {
        const box = el.getBoundingClientRect();
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    }

    function collect(hole) {
        const found = [];
        document.querySelectorAll(SHARDS).forEach((el) => {
            const box = el.getBoundingClientRect();
            if (box.width < 1 || box.height < 1) return;
            const x = box.left + box.width / 2;
            const y = box.top + box.height / 2;
            const dx = x - hole.x;
            const dy = y - hole.y;
            found.push({ el: el, x: x, y: y, a: Math.atan2(dy, dx), r: Math.hypot(dx, dy) });
        });
        return found;
    }

    // Where the weight of the page sits, so both arms of light land on screen.
    function centroidBearing(shards, hole) {
        if (!shards.length) return Math.PI / 4;
        let x = 0;
        let y = 0;
        shards.forEach((s) => { x += s.x; y += s.y; });
        return Math.atan2(y / shards.length - hole.y, x / shards.length - hole.x);
    }

    // Full lean at the edges of the scene, none at the tear line itself.
    function leanAt(y, tear, reach) {
        return Math.sin(Math.max(-1, Math.min(1, (y - tear) / reach)) * Math.PI / 2);
    }

    // Radius decays as t^1.9, and the stretch axis tracks the line to the hole.
    function infall(shard, hole, swirl, spin) {
        const frames = [];

        for (let i = 0; i <= STEPS; i++) {
            const t = i / STEPS;
            const pull = Math.pow(t, 1.9);
            const radius = shard.r * (1 - pull);
            const angle = shard.a + swirl * pull;
            const deg = angle * 180 / Math.PI;

            const shrink = 1 - 0.8 * pull;
            const along = shrink * (1 + 2.5 * pull * pull);
            const across = shrink * (1 - 0.7 * pull);

            const dx = hole.x + radius * Math.cos(angle) - shard.x;
            const dy = hole.y + radius * Math.sin(angle) - shard.y;

            frames.push({
                offset: t,
                opacity: t < 0.62 ? 1 : Math.max(0, 1 - (t - 0.62) / 0.38),
                transform:
                    'translate(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px) ' +
                    'rotate(' + deg.toFixed(2) + 'deg) ' +
                    'scale(' + along.toFixed(3) + ', ' + across.toFixed(3) + ') ' +
                    'rotate(' + (-deg).toFixed(2) + 'deg) ' +
                    'rotate(' + (spin * pull).toFixed(2) + 'deg)'
            });
        }

        return frames;
    }

    // Drawn inside the canvas by js/starfield.js; a transform on the field would swing its edge into view.
    function windSky(hole, tear) {
        const sky = document.querySelector('.stars-background');
        if (!sky) return;

        if (typeof window.collapseSky === 'function') {
            window.collapseSky(hole.x, hole.y, FALL + 220, tear);
            return;
        }

        sky.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: FALL + 220,
            easing: 'cubic-bezier(0.5, 0, 0.75, 0.4)',
            fill: 'forwards'
        });
    }

    function veil(className, hole) {
        const el = document.createElement('div');
        el.className = className;
        el.style.setProperty('--bh-x', hole.x.toFixed(1) + 'px');
        el.style.setProperty('--bh-y', hole.y.toFixed(1) + 'px');
        document.body.appendChild(el);
        return el;
    }

    function collapse(hole, plane) {
        // Conic gradients start at twelve o'clock; atan2 starts at three.
        const axis = (plane * 180 / Math.PI + 90).toFixed(1) + 'deg';
        const origin = hole.x.toFixed(1) + 'px ' + hole.y.toFixed(1) + 'px';

        // One wedge of light per arm, each wound the way its half of the page goes.
        [['bh-vortex', 118, 0.5], ['bh-vortex bh-vortex--over', -118, 0.34]].forEach((arm) => {
            const light = veil(arm[0], hole);
            light.style.setProperty('--bh-axis', axis);
            light.style.transformOrigin = origin;
            light.animate([
                { opacity: 0, transform: 'rotate(0deg) scale(1)' },
                { opacity: arm[2], offset: 0.45 },
                { opacity: 0, transform: 'rotate(' + arm[1] + 'deg) scale(0.5)' }
            ], {
                duration: FALL + 220,
                easing: 'cubic-bezier(0.5, 0, 0.75, 0.4)',
                fill: 'forwards'
            });
        });

        veil('bh-collapse', hole).animate([
            { opacity: 0 },
            { opacity: 0.2, offset: 0.5 },
            { opacity: 0.6, offset: 0.8 },
            { opacity: 1 }
        ], {
            duration: FALL + 250,
            easing: 'linear',
            fill: 'forwards'
        });
    }

    function swallowPage(button, href) {
        const hole = centreOf(button);
        const shards = collect(hole);
        const farthest = shards.reduce((max, s) => Math.max(max, s.r), 1);

        // The line the scene tears along: above it rides up over the hole, below sinks under.
        const rows = shards.map((s) => s.y);
        const tear = rows.length
            ? (Math.min.apply(null, rows) + Math.max.apply(null, rows)) / 2
            : window.innerHeight / 2;
        const reach = shards.reduce((max, s) => Math.max(max, Math.abs(s.y - tear)), 1);

        document.body.classList.add('page-sucked');
        windSky(hole, tear);
        collapse(hole, centroidBearing(shards, hole));

        shards.forEach((shard, i) => {
            // What is already close goes first; the rest is dragged after it.
            const delay = 190 * (shard.r / farthest);
            const lean = leanAt(shard.y, tear, reach);
            // Inner shards wind hardest, so the block shears instead of sliding in whole.
            const swirl = SWIRL * lean * (0.45 + 0.55 * (1 - shard.r / farthest));
            const spin = (lean < 0 ? -1 : 1) * (14 + (i * 37) % 22);
            shard.el.style.willChange = 'transform, opacity';
            shard.el.style.transformBox = 'border-box';
            shard.el.style.transformOrigin = '50% 50%';
            shard.el.animate(infall(shard, hole, swirl, spin), {
                duration: FALL,
                delay: delay,
                easing: 'linear',
                fill: 'forwards'
            });
        });

        setTimeout(() => { window.location.href = href; }, FALL + 260);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const button = document.querySelector('.black-hole-home');
        if (!button) return;

        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (!href) return;

            // Reduced motion just gets the link.
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            if (typeof Element.prototype.animate !== 'function') return;
            if (document.body.classList.contains('page-sucked')) return;

            e.preventDefault();
            swallowPage(button, href);
        });
    });
})();
