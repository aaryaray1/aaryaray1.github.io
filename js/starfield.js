/* =============================================================================
   Night sky

   Paints the background of every page. The field is generated from scratch on
   each page load, so no two visits - and no two pages - show the same sky.

   Two canvases:
     .sky-static  drawn once per resize. Nebulosity, the Milky Way band, dust
                  lanes and every star. This is where the cost lives, and it is
                  paid once instead of on every frame.
     .sky-live    only the handful of stars that twinkle, plus the occasional
                  meteor. Cheap enough to run at full frame rate.

   Star positions are stored normalised (0..1), so a resize re-lays out the
   same sky rather than shuffling it.
   ========================================================================== */

(function () {
    'use strict';

    const host = document.querySelector('.stars-background');
    if (!host) return;

    const TAU = Math.PI * 2;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    /* --- Per-page presets --------------------------------------------------
       density    stars per unit area, relative
       band       brightness of the Milky Way (0 = none)
       bandWidth  half-thickness of the band, as a fraction of viewport height
       bandY      where the band crosses the vertical centre line
       bandAngle  tilt in radians
       twinkle    how many stars are animated
    */
    const SKIES = {
        home: {
            density: 1.15, band: 0.5, bandWidth: 0.22, bandY: 0.2, bandAngle: -0.4,
            dust: 3, blooms: 3, bloom: 0.05, twinkle: 55, vignette: 0.5,
            meteor: [6000, 15000]
        },
        projects: {
            density: 1.0, band: 0.42, bandWidth: 0.24, bandY: 0.8, bandAngle: 0.34,
            dust: 3, blooms: 3, bloom: 0.045, twinkle: 45, vignette: 0.55,
            meteor: [8000, 20000]
        },
        // The "standing in a dark field looking up" sky: dense, bright, with the
        // galactic core sweeping right across the page. The band is kept narrow
        // relative to the viewport so it reads as a defined arch rather than
        // general haze, and most of the stars are packed into it.
        about: {
            density: 3.2, band: 1.35, bandWidth: 0.17, bandY: 0.52, bandAngle: -0.52,
            dust: 7, blooms: 4, bloom: 0.075, twinkle: 90, vignette: 0.28,
            meteor: [7000, 17000]
        }
    };

    const body = document.body;
    const page = body.classList.contains('about-page') ? 'about'
        : body.classList.contains('projects-page') ? 'projects'
            : 'home';
    const cfg = SKIES[page];

    /* --- Colour ------------------------------------------------------------
       Star tints, roughly following real spectral classes but pulled towards
       the site palette. Weights are cumulative. */
    const TINTS = [
        { c: '255,255,255', w: 0.54 },  // white
        { c: '203,218,255', w: 0.70 },  // blue-white
        { c: '208,198,255', w: 0.84 },  // lilac
        { c: '255,235,208', w: 0.94 },  // warm white
        { c: '255,206,166', w: 1.00 }   // amber
    ];

    // Nebulosity tints - the same violets and indigos the rest of the site uses.
    const CLOUDS = [
        '124,102,204',
        '92,110,192',
        '154,132,232',
        '78,140,190'
    ];

    const rand = (a, b) => a + Math.random() * (b - a);

    // Cheap bell curve in roughly -1..1; three samples is plenty for a sky.
    const bell = () => ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2;

    function pickTint() {
        const r = Math.random();
        for (let i = 0; i < TINTS.length; i++) {
            if (r <= TINTS[i].w) return TINTS[i].c;
        }
        return TINTS[0].c;
    }

    /* --- Canvases ---------------------------------------------------------- */

    const staticCanvas = document.createElement('canvas');
    staticCanvas.className = 'sky-static';
    staticCanvas.setAttribute('aria-hidden', 'true');

    const liveCanvas = document.createElement('canvas');
    liveCanvas.className = 'sky-live';
    liveCanvas.setAttribute('aria-hidden', 'true');

    const veil = document.createElement('div');
    veil.className = 'sky-veil';

    const sctx = staticCanvas.getContext('2d');
    const lctx = liveCanvas.getContext('2d');
    if (!sctx || !lctx) return;

    host.appendChild(staticCanvas);
    host.appendChild(liveCanvas);
    host.appendChild(veil);

    let width = 0;
    let height = 0;
    let stars = [];
    let twinklers = [];

    /* --- Generating the field ---------------------------------------------- */

    function makeStar(inBand) {
        let x;
        let y;

        if (inBand) {
            // Place along the band axis with a bell-shaped scatter either side,
            // and a gentle arc so it reads as a galactic plane rather than a
            // ruled line.
            const t = rand(-0.75, 0.75);
            const arc = Math.cos(t * Math.PI * 0.5) * cfg.bandWidth * 0.35;
            const n = bell() * cfg.bandWidth + arc;
            const dx = Math.cos(cfg.bandAngle);
            const dy = Math.sin(cfg.bandAngle);
            x = 0.5 + dx * t * 1.5 - dy * n;
            y = cfg.bandY + dy * t * 1.5 + dx * n;
            if (x < -0.02 || x > 1.02 || y < -0.02 || y > 1.02) return null;
        } else {
            x = Math.random();
            y = Math.random();
        }

        // Magnitude skewed hard towards the faint end: a real sky is mostly
        // pinpricks with a scattering of bright ones.
        const mag = Math.pow(Math.random(), 3.1);
        const r = 0.3 + mag * 2.4;
        const a = 0.34 + Math.pow(Math.random(), 0.55) * 0.66;

        return { x, y, r, a, c: pickTint(), tw: false, ph: Math.random() * TAU, sp: rand(0.6, 2.2) };
    }

    function buildField() {
        const area = width * height;
        const target = Math.min(Math.round(cfg.density * area / 2200), 3200);
        const bandShare = Math.min(0.2 + cfg.band * 0.4, 0.78);

        stars = [];
        let guard = target * 4;
        while (stars.length < target && guard-- > 0) {
            const star = makeStar(Math.random() < bandShare);
            if (star) stars.push(star);
        }

        // Pick the twinklers from the mid-range: bright enough for the flicker
        // to register, not so bright that they carry diffraction spikes (those
        // stay on the static layer, where they cost nothing per frame). Their
        // static pass is dimmed so the live layer has room to brighten them.
        twinklers = [];
        const pool = stars.filter((s) => s.r >= 0.9 && s.r <= 2.3);
        for (let i = 0; i < cfg.twinkle && pool.length; i++) {
            const star = pool.splice((Math.random() * pool.length) | 0, 1)[0];
            star.tw = true;
            twinklers.push(star);
        }
    }

    /* --- Painting ----------------------------------------------------------- */

    // Soft elliptical blob, used for both nebulosity and dust.
    function blob(ctx, x, y, rx, ry, rot, color, alpha) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.scale(rx, ry);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
        g.addColorStop(0, 'rgba(' + color + ',' + alpha + ')');
        g.addColorStop(0.42, 'rgba(' + color + ',' + alpha * 0.42 + ')');
        g.addColorStop(1, 'rgba(' + color + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, TAU);
        ctx.fill();
        ctx.restore();
    }

    function paintMilkyWay(ctx) {
        if (cfg.band <= 0) return;

        // Convert the tilt from normalised space into pixel space so the band
        // keeps its intended slope whatever the viewport aspect ratio.
        const angle = Math.atan2(Math.sin(cfg.bandAngle) * height, Math.cos(cfg.bandAngle) * width);
        const span = Math.hypot(width, height) * 1.25;
        const half = cfg.bandWidth * height;

        ctx.save();
        ctx.translate(width / 2, cfg.bandY * height);
        ctx.rotate(angle);

        // Glowing core, built from overlapping puffs so the edges stay ragged.
        // A wide, flat wash first, then brighter concentrations inside it.
        ctx.globalCompositeOperation = 'lighter';
        const puffs = 22;
        for (let i = 0; i < puffs; i++) {
            const f = i / (puffs - 1) - 0.5;
            const t = f * span;
            const arc = Math.cos(f * Math.PI) * half * 0.5;
            // The band is brightest towards the middle of its run, the way the
            // galactic centre outshines the arms either side of it.
            const weight = 0.45 + Math.cos(f * Math.PI) * 0.55;
            blob(
                ctx,
                t,
                bell() * half * 0.3 - arc,
                span / puffs * rand(1.6, 3.2),
                half * rand(0.55, 1.3),
                rand(-0.12, 0.12),
                CLOUDS[(Math.random() * CLOUDS.length) | 0],
                cfg.band * weight * rand(0.05, 0.1)
            );
        }

        // Dust lanes: the dark rifts that split the band lengthwise. Long and
        // thin, so they cut the band rather than just dimming it.
        ctx.globalCompositeOperation = 'source-over';
        for (let i = 0; i < cfg.dust; i++) {
            blob(
                ctx,
                rand(-span * 0.45, span * 0.45),
                bell() * half * 0.55,
                span * rand(0.12, 0.3),
                half * rand(0.1, 0.26),
                rand(-0.08, 0.08),
                '3,2,10',
                rand(0.5, 0.85)
            );
        }

        ctx.restore();
    }

    function paintBlooms(ctx) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < cfg.blooms; i++) {
            blob(
                ctx,
                rand(0, width),
                rand(0, height),
                rand(width * 0.22, width * 0.5),
                rand(height * 0.18, height * 0.42),
                rand(0, Math.PI),
                CLOUDS[(Math.random() * CLOUDS.length) | 0],
                cfg.bloom * rand(0.7, 1.3)
            );
        }
        ctx.restore();
    }

    // Diffraction spikes on the brightest few stars - the detail that makes a
    // rendered sky read as a photograph rather than a dot pattern.
    function paintSpikes(ctx, x, y, len, alpha, color) {
        const h = ctx.createLinearGradient(x - len, y, x + len, y);
        h.addColorStop(0, 'rgba(' + color + ',0)');
        h.addColorStop(0.5, 'rgba(' + color + ',' + alpha + ')');
        h.addColorStop(1, 'rgba(' + color + ',0)');
        ctx.fillStyle = h;
        ctx.fillRect(x - len, y - 0.4, len * 2, 0.8);

        const v = ctx.createLinearGradient(x, y - len, x, y + len);
        v.addColorStop(0, 'rgba(' + color + ',0)');
        v.addColorStop(0.5, 'rgba(' + color + ',' + alpha + ')');
        v.addColorStop(1, 'rgba(' + color + ',0)');
        ctx.fillStyle = v;
        ctx.fillRect(x - 0.4, y - len, 0.8, len * 2);
    }

    // `lite` skips the diffraction spikes; the live layer uses it so the
    // per-frame cost stays at one gradient per twinkling star.
    function paintStar(ctx, star, alpha, lite) {
        const x = star.x * width;
        const y = star.y * height;

        if (star.r > 1.35) {
            const glow = ctx.createRadialGradient(x, y, 0, x, y, star.r * 7);
            glow.addColorStop(0, 'rgba(' + star.c + ',' + alpha * 0.42 + ')');
            glow.addColorStop(0.4, 'rgba(' + star.c + ',' + alpha * 0.1 + ')');
            glow.addColorStop(1, 'rgba(' + star.c + ',0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(x, y, star.r * 7, 0, TAU);
            ctx.fill();
        }

        ctx.fillStyle = 'rgba(' + star.c + ',' + alpha + ')';
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, TAU);
        ctx.fill();

        if (!lite && star.r > 2.45) {
            paintSpikes(ctx, x, y, star.r * 6.5, alpha * 0.3, star.c);
        }
    }

    function paintStatic() {
        sctx.setTransform(1, 0, 0, 1, 0, 0);
        sctx.clearRect(0, 0, staticCanvas.width, staticCanvas.height);
        sctx.scale(staticCanvas.width / width, staticCanvas.height / height);

        // Base wash - not flat black, so the sky has some depth to it.
        const base = sctx.createLinearGradient(0, 0, 0, height);
        base.addColorStop(0, '#07061a');
        base.addColorStop(0.55, '#050411');
        base.addColorStop(1, '#030209');
        sctx.fillStyle = base;
        sctx.fillRect(0, 0, width, height);

        paintBlooms(sctx);
        paintMilkyWay(sctx);

        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            // Twinklers are laid down dim; the live layer supplies the rest.
            paintStar(sctx, star, star.tw ? star.a * 0.4 : star.a);
        }

        // Vignette, to settle the edges and keep the corners out of the way of
        // the content.
        const vig = sctx.createRadialGradient(
            width / 2, height / 2, Math.min(width, height) * 0.25,
            width / 2, height / 2, Math.max(width, height) * 0.78
        );
        vig.addColorStop(0, 'rgba(3,2,9,0)');
        vig.addColorStop(1, 'rgba(3,2,9,' + cfg.vignette + ')');
        sctx.fillStyle = vig;
        sctx.fillRect(0, 0, width, height);
    }

    /* --- Meteors ------------------------------------------------------------ */

    let meteor = null;
    let nextMeteor = performance.now() + rand(cfg.meteor[0], cfg.meteor[1]);

    function spawnMeteor() {
        // Always travelling downwards, from a random point along the top two
        // thirds of one edge or the top.
        const dir = Math.random() < 0.5 ? 1 : -1;
        const angle = rand(0.35, 0.85) * dir;
        meteor = {
            x: dir > 0 ? rand(-0.1, 0.6) * width : rand(0.4, 1.1) * width,
            y: rand(-0.05, 0.35) * height,
            vx: Math.cos(angle) * dir * rand(0.75, 1.25),
            vy: Math.sin(Math.abs(angle)) * rand(0.75, 1.25),
            speed: rand(0.9, 1.6),
            len: rand(90, 230),
            life: 0,
            span: rand(900, 1500)
        };
    }

    function drawMeteor(ctx, dt) {
        meteor.life += dt;
        const p = meteor.life / meteor.span;
        if (p >= 1) {
            meteor = null;
            return;
        }

        const step = dt * meteor.speed * 1.15;
        meteor.x += meteor.vx * step;
        meteor.y += meteor.vy * step;

        // Fade in over the first fifth, out over the last third.
        const alpha = Math.min(p / 0.2, 1) * Math.min((1 - p) / 0.34, 1);
        const nx = meteor.vx / Math.hypot(meteor.vx, meteor.vy);
        const ny = meteor.vy / Math.hypot(meteor.vx, meteor.vy);
        const tailX = meteor.x - nx * meteor.len;
        const tailY = meteor.y - ny * meteor.len;

        const trail = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        trail.addColorStop(0, 'rgba(226,224,255,' + alpha * 0.9 + ')');
        trail.addColorStop(0.35, 'rgba(194,191,240,' + alpha * 0.32 + ')');
        trail.addColorStop(1, 'rgba(194,191,240,0)');
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        const head = ctx.createRadialGradient(meteor.x, meteor.y, 0, meteor.x, meteor.y, 7);
        head.addColorStop(0, 'rgba(255,255,255,' + alpha + ')');
        head.addColorStop(1, 'rgba(194,191,240,0)');
        ctx.fillStyle = head;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 7, 0, TAU);
        ctx.fill();
    }

    /* --- Live layer --------------------------------------------------------- */

    let rafId = 0;
    let lastFrame = 0;

    function frame(now) {
        rafId = requestAnimationFrame(frame);
        const dt = Math.min(now - lastFrame, 64);
        lastFrame = now;

        lctx.setTransform(1, 0, 0, 1, 0, 0);
        lctx.clearRect(0, 0, liveCanvas.width, liveCanvas.height);
        lctx.scale(liveCanvas.width / width, liveCanvas.height / height);

        const t = now / 1000;
        for (let i = 0; i < twinklers.length; i++) {
            const star = twinklers[i];
            // Two detuned sines give an irregular flicker instead of a pulse.
            const s = Math.sin(t * star.sp + star.ph) * 0.6
                + Math.sin(t * star.sp * 2.7 + star.ph * 1.7) * 0.4;
            paintStar(lctx, star, star.a * (0.5 + 0.5 * (s * 0.5 + 0.5)), true);
        }

        if (meteor) {
            drawMeteor(lctx, dt);
        } else if (now >= nextMeteor) {
            spawnMeteor();
            nextMeteor = now + rand(cfg.meteor[0], cfg.meteor[1]);
        }

        applyParallax();
    }

    function startLive() {
        if (rafId || motionQuery.matches) return;
        lastFrame = performance.now();
        nextMeteor = lastFrame + rand(cfg.meteor[0], cfg.meteor[1]);
        rafId = requestAnimationFrame(frame);
    }

    function stopLive() {
        if (!rafId) return;
        cancelAnimationFrame(rafId);
        rafId = 0;
        lctx.setTransform(1, 0, 0, 1, 0, 0);
        lctx.clearRect(0, 0, liveCanvas.width, liveCanvas.height);
        meteor = null;
    }

    /* --- Parallax -----------------------------------------------------------
       A few pixels of drift under the pointer. Transform only, so it never
       costs a repaint - the .stars-background element is deliberately bled
       past the viewport so the edges never show. */

    let targetX = 0;
    let targetY = 0;
    let driftX = 0;
    let driftY = 0;

    function applyParallax() {
        if (!finePointer.matches) return;
        driftX += (targetX - driftX) * 0.06;
        driftY += (targetY - driftY) * 0.06;
        if (Math.abs(targetX - driftX) < 0.01 && Math.abs(targetY - driftY) < 0.01) return;
        host.style.transform = 'translate3d(' + driftX.toFixed(2) + 'px,' + driftY.toFixed(2) + 'px,0)';
    }

    function onPointerMove(e) {
        targetX = (e.clientX / window.innerWidth - 0.5) * -16;
        targetY = (e.clientY / window.innerHeight - 0.5) * -12;
    }

    /* --- Sizing ------------------------------------------------------------- */

    function size() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        // The host is bled 32px past the viewport on every side for parallax;
        // fall back to that if it has not been laid out yet.
        width = host.clientWidth || window.innerWidth + 64;
        height = host.clientHeight || window.innerHeight + 64;

        [staticCanvas, liveCanvas].forEach((canvas) => {
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
        });
    }

    function build() {
        size();
        buildField();
        paintStatic();
    }

    build();
    startLive();

    if (finePointer.matches) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    // Resize: re-lay out the same sky rather than generating a new one, so a
    // window drag does not reshuffle the stars under the reader.
    let resizeTimer = 0;
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;

    window.addEventListener('resize', () => {
        // Mobile browsers fire resize as the URL bar hides; ignore height-only
        // changes small enough to be that rather than a real layout change.
        if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 120) return;
        lastW = window.innerWidth;
        lastH = window.innerHeight;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            size();
            paintStatic();
        }, 150);
    });

    // Do not animate a sky nobody is looking at.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopLive();
        else startLive();
    });

    const onMotionChange = () => {
        if (motionQuery.matches) stopLive();
        else startLive();
    };

    if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', onMotionChange);
    } else if (typeof motionQuery.addListener === 'function') {
        motionQuery.addListener(onMotionChange);
    }
}());
