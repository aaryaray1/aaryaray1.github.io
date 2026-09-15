/* Night sky. .sky-static holds the field and costs one paint per resize; .sky-live holds twinkles and meteors. */

(function () {
    'use strict';

    const host = document.querySelector('.stars-background');
    if (!host) return;

    const TAU = Math.PI * 2;

    // The floor the flicker falls back to, so a twinkling star never blinks out completely.
    const TWINKLE_FLOOR = 0.26;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    /* Per-page presets: density, band brightness/width/position/angle, and twinkle count. */
    const SKIES = {
        home: {
            density: 1.15, band: 0.5, bandWidth: 0.22, bandY: 0.2, bandAngle: -0.4,
            dust: 3, blooms: 3, bloom: 0.05, twinkle: 210, vignette: 0.5,
            meteor: [6000, 15000]
        },
        projects: {
            density: 1.0, band: 0.42, bandWidth: 0.24, bandY: 0.8, bandAngle: 0.34,
            dust: 3, blooms: 3, bloom: 0.045, twinkle: 185, vignette: 0.55,
            meteor: [8000, 20000]
        },
        // Dense and bright, with a narrow band so it reads as an arch rather than haze.
        about: {
            density: 3.2, band: 1.35, bandWidth: 0.17, bandY: 0.52, bandAngle: -0.52,
            dust: 7, blooms: 4, bloom: 0.075, twinkle: 360, vignette: 0.28,
            meteor: [7000, 17000]
        }
    };

    const body = document.body;
    const page = body.classList.contains('about-page') ? 'about'
        : body.classList.contains('projects-page') ? 'projects'
            : 'home';
    const cfg = SKIES[page];

    /* Star tints, loosely spectral but pulled towards the site palette. Weights are cumulative. */
    const TINTS = [
        { c: '255,255,255', w: 0.50 },  // white
        { c: '203,218,255', w: 0.65 },  // blue-white
        { c: '214,199,255', w: 0.80 },  // lavender
        { c: '231,196,236', w: 0.89 },  // mauve
        { c: '255,235,208', w: 0.96 },  // warm white
        { c: '255,206,166', w: 1.00 }   // amber
    ];

    // Nebulosity tints - the same violets and indigos the rest of the site uses.
    const CLOUDS = [
        '124,102,204',
        '92,110,192',
        '154,132,232',
        '150,104,168',  // mauve
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

    // Never shown: bakes the wash and nebulosity so they can be relaid without re-randomising.
    const backCanvas = document.createElement('canvas');

    const sctx = staticCanvas.getContext('2d');
    const lctx = liveCanvas.getContext('2d');
    const bctx = backCanvas.getContext('2d');
    if (!sctx || !lctx || !bctx) return;

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
            // Bell-shaped scatter along the band axis, arced so it is not a ruled line.
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

        // Skewed to the faint end: a real sky is mostly pinpricks.
        const mag = Math.pow(Math.random(), 3.1);
        const r = 0.3 + mag * 2.4;
        const a = 0.34 + Math.pow(Math.random(), 0.55) * 0.66;

        return {
            x, y, r, a, c: pickTint(), tw: false,
            // Scintillation - the fast, irregular flicker.
            ph: Math.random() * TAU, sp: rand(0.7, 2.6),
            // Breath: the slow swell underneath, and the half that carries the size change.
            bph: Math.random() * TAU, bp: rand(0.13, 0.4),
            // Brightness envelope and size swing, filled in by setSwing().
            lo: 1, hi: 1, swell: 0
        };
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

        // The brightest few are left out: their spikes are static, and a moving core under a fixed spike reads as a glitch.
        twinklers = [];
        const pool = stars.filter((s) => s.r >= 0.5 && s.r <= 2.35);
        const wanted = Math.min(cfg.twinkle, Math.round(pool.length * 0.62));
        for (let i = 0; i < wanted && pool.length; i++) {
            const star = pool.splice((Math.random() * pool.length) | 0, 1)[0];
            star.tw = true;
            setSwing(star);
            twinklers.push(star);
        }
    }

    /* Faint stars scintillate hardest, and anything near the reading column is damped. */
    function setSwing(star) {
        // 1 at the faint end of the twinkling range, 0 at the bright end.
        const faint = 1 - Math.min(Math.max((star.r - 0.5) / 1.85, 0), 1);
        const reach = 0.4 + faint * 0.46;

        const lo = 1 - reach;
        const hi = 1 + reach * 0.28;
        const mid = (lo + hi) / 2;

        // 0 on the centre line, 1 once clear of the widest content on the site.
        const edge = Math.min(Math.abs(star.x - 0.5) / 0.34, 1);
        const damp = 0.5 + 0.5 * edge * edge;

        star.lo = mid + (lo - mid) * damp;
        star.hi = mid + (hi - mid) * damp;
        // A few percent of radius: a pulse, not a flicker, and nothing visibly inflates.
        star.swell = (0.09 + faint * 0.13) * damp;
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

        // Tilt converted to pixel space so the slope survives any viewport aspect ratio.
        const angle = Math.atan2(Math.sin(cfg.bandAngle) * height, Math.cos(cfg.bandAngle) * width);
        const span = Math.hypot(width, height) * 1.25;
        const half = cfg.bandWidth * height;

        ctx.save();
        ctx.translate(width / 2, cfg.bandY * height);
        ctx.rotate(angle);

        // Overlapping puffs so the edges stay ragged: a flat wash first, then brighter cores.
        ctx.globalCompositeOperation = 'lighter';
        const puffs = 22;
        for (let i = 0; i < puffs; i++) {
            const f = i / (puffs - 1) - 0.5;
            const t = f * span;
            const arc = Math.cos(f * Math.PI) * half * 0.5;
            // Brightest mid-run, the way the galactic centre outshines the arms.
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

        // Dust lanes: long and thin, so they cut the band rather than dimming it.
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

    // Diffraction spikes on the brightest few, so the sky reads as a photograph.
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

    /* One pre-rendered halo per tint, stamped with drawImage; a fresh gradient per star was the bottleneck. */

    const SPRITE_R = 24;
    const sprites = new Map();

    function glowSprite(color) {
        const cached = sprites.get(color);
        if (cached) return cached;

        const canvas = document.createElement('canvas');
        canvas.width = SPRITE_R * 2;
        canvas.height = SPRITE_R * 2;

        // The stops carry shape only; the star's alpha is applied at draw time.
        const ctx = canvas.getContext('2d');
        const g = ctx.createRadialGradient(SPRITE_R, SPRITE_R, 0, SPRITE_R, SPRITE_R, SPRITE_R);
        g.addColorStop(0, 'rgba(' + color + ',0.42)');
        g.addColorStop(0.4, 'rgba(' + color + ',0.1)');
        g.addColorStop(1, 'rgba(' + color + ',0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, SPRITE_R * 2, SPRITE_R * 2);

        sprites.set(color, canvas);
        return canvas;
    }

    // `lite` skips the static-layer spikes; `scale` is the pulse, 1 being at rest.
    function paintStar(ctx, star, alpha, lite, scale) {
        const x = star.x * width;
        const y = star.y * height;
        const a = alpha > 1 ? 1 : alpha;
        const r = star.r * (scale || 1);

        // Gated on resting radius, or a star on the threshold would pop its halo in and out.
        if (star.r > 1.35) {
            const reach = r * 7;
            ctx.globalAlpha = a;
            ctx.drawImage(glowSprite(star.c), x - reach, y - reach, reach * 2, reach * 2);
            ctx.globalAlpha = 1;
        }

        ctx.fillStyle = 'rgba(' + star.c + ',' + a + ')';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fill();

        if (!lite && star.r > 2.45) {
            paintSpikes(ctx, x, y, star.r * 6.5, a * 0.3, star.c);
        }
    }

    function paintBackdrop() {
        bctx.setTransform(1, 0, 0, 1, 0, 0);
        bctx.clearRect(0, 0, backCanvas.width, backCanvas.height);
        bctx.scale(backCanvas.width / width, backCanvas.height / height);

        // Base wash - not flat black, so the sky has some depth to it.
        const base = bctx.createLinearGradient(0, 0, 0, height);
        base.addColorStop(0, '#07061a');
        base.addColorStop(0.55, '#050411');
        base.addColorStop(1, '#030209');
        bctx.fillStyle = base;
        bctx.fillRect(0, 0, width, height);

        paintBlooms(bctx);
        paintMilkyWay(bctx);
    }

    // Settles the edges and keeps the corners out of the way of the content.
    function paintVignette(ctx) {
        const vig = ctx.createRadialGradient(
            width / 2, height / 2, Math.min(width, height) * 0.25,
            width / 2, height / 2, Math.max(width, height) * 0.78
        );
        vig.addColorStop(0, 'rgba(3,2,9,0)');
        vig.addColorStop(1, 'rgba(3,2,9,' + cfg.vignette + ')');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, width, height);
    }

    function paintStatic() {
        sctx.setTransform(1, 0, 0, 1, 0, 0);
        sctx.clearRect(0, 0, staticCanvas.width, staticCanvas.height);
        sctx.drawImage(backCanvas, 0, 0, staticCanvas.width, staticCanvas.height);
        sctx.scale(staticCanvas.width / width, staticCanvas.height / height);

        // After the hole is clicked the stars and the vignette both belong to the live layer.
        if (sink) return;

        // Under reduced motion there is no live layer, so twinklers go down at full strength.
        const floor = motionQuery.matches ? 1 : TWINKLE_FLOOR;

        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            // Twinklers go down dim; the live layer supplies the rest.
            paintStar(sctx, star, star.tw ? star.a * floor : star.a);
        }

        paintVignette(sctx);
    }

    /* --- Meteors ------------------------------------------------------------ */

    let meteor = null;
    let nextMeteor = performance.now() + rand(cfg.meteor[0], cfg.meteor[1]);

    function spawnMeteor() {
        // Always downwards, from the top edge or the top two thirds of a side.
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
        // Cools from white through lavender into mauve down the tail.
        trail.addColorStop(0, 'rgba(230,226,255,' + alpha * 0.9 + ')');
        trail.addColorStop(0.35, 'rgba(203,178,236,' + alpha * 0.32 + ')');
        trail.addColorStop(1, 'rgba(188,150,205,0)');
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        const head = ctx.createRadialGradient(meteor.x, meteor.y, 0, meteor.x, meteor.y, 7);
        head.addColorStop(0, 'rgba(255,255,255,' + alpha + ')');
        head.addColorStop(1, 'rgba(203,178,236,0)');
        ctx.fillStyle = head;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 7, 0, TAU);
        ctx.fill();
    }

    /* --- Live layer --------------------------------------------------------- */

    // collapseSky() puts every star on the same decaying spiral as the page content.

    const SINK_SWIRL = 2.9;

    let sink = null;
    let sinkAt = 0;
    let sinkFor = 0;

    function collapseSky(viewX, viewY, duration, tearY) {
        const box = host.getBoundingClientRect();
        sink = { x: viewX - box.left, y: viewY - box.top };
        // The line the page tears along; the sky splits on the same one.
        const tear = typeof tearY === 'number' ? tearY - box.top : height / 2;
        const tearReach = Math.max(tear, height - tear) || 1;

        const reach = Math.max(
            Math.hypot(sink.x, sink.y),
            Math.hypot(width - sink.x, sink.y),
            Math.hypot(sink.x, height - sink.y),
            Math.hypot(width - sink.x, height - sink.y)
        );

        // Polar position held per star, so the frame loop does no square roots.
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            const dx = star.x * width - sink.x;
            const dy = star.y * height - sink.y;
            const r = Math.hypot(dx, dy) || 0.0001;
            star.fr = r;
            star.fc = dx / r;
            star.fs = dy / r;
            // Its own appointment with the hole, biased so the near sky goes first.
            star.ft = rand(0.32, 0.94) + 0.3 * (r / reach);
            // Above the tear rides up over the hole, below sinks under, on the line drops straight in.
            const off = Math.max(-1, Math.min(1, (star.y * height - tear) / tearReach));
            const lean = Math.sin(off * Math.PI / 2);
            // Inner sky sweeps round hardest, the way a disc winds up.
            star.fw = SINK_SWIRL * lean * (0.4 + 0.6 * (1 - r / reach));
        }

        // Stars come off the baked layer; the wash and band stay, so the colour behind holds.
        paintStatic();

        sinkFor = duration;
        sinkAt = performance.now();
        if (!rafId) {
            lastFrame = sinkAt;
            rafId = requestAnimationFrame(frame);
        }
    }

    function paintInfall(now) {
        const p = Math.min((now - sinkAt) / sinkFor, 1);

        lctx.lineCap = 'round';

        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];

            // Each star runs its own clock, so the field holds every stage at once.
            const q = p / star.ft;
            if (q >= 1) continue;

            // Burns out as it crosses, rather than winking off at the centre.
            const a = star.a * (q < 0.84 ? 1 : 1 - (q - 0.84) / 0.16);
            if (a <= 0.012) continue;

            const pull = Math.pow(q, 1.9);
            // Where it was a moment ago; the gap widens as it accelerates.
            const back = Math.max(pull - 0.01 - pull * 0.02, 0);

            const aNow = star.fw * pull;
            const aWas = star.fw * back;
            const cNow = Math.cos(aNow);
            const sNow = Math.sin(aNow);
            const cWas = Math.cos(aWas);
            const sWas = Math.sin(aWas);
            const kNow = star.fr * (1 - pull);
            const kWas = star.fr * (1 - back);

            const x = sink.x + kNow * (star.fc * cNow - star.fs * sNow);
            const y = sink.y + kNow * (star.fs * cNow + star.fc * sNow);
            const px = sink.x + kWas * (star.fc * cWas - star.fs * sWas);
            const py = sink.y + kWas * (star.fs * cWas + star.fc * sWas);

            if (star.r > 1.35) {
                const halo = star.r * 7 * (1 - pull * 0.6);
                lctx.globalAlpha = a;
                lctx.drawImage(glowSprite(star.c), x - halo, y - halo, halo * 2, halo * 2);
                lctx.globalAlpha = 1;
            }

            lctx.strokeStyle = 'rgba(' + star.c + ',' + a + ')';
            lctx.lineWidth = Math.max(star.r * 2 * (1 - 0.45 * pull), 0.5);
            lctx.beginPath();
            lctx.moveTo(px, py);
            lctx.lineTo(x, y);
            lctx.stroke();

            // The brightest keep their spikes a while, so nothing pops as the live layer takes over.
            if (star.r > 2.45 && pull < 0.3) {
                paintSpikes(lctx, x, y, star.r * 6.5, a * 0.3 * (1 - pull / 0.3), star.c);
            }
        }

        paintVignette(lctx);
    }

    let rafId = 0;
    let lastFrame = 0;

    function frame(now) {
        rafId = requestAnimationFrame(frame);
        const dt = Math.min(now - lastFrame, 64);
        lastFrame = now;

        lctx.setTransform(1, 0, 0, 1, 0, 0);
        lctx.clearRect(0, 0, liveCanvas.width, liveCanvas.height);
        lctx.scale(liveCanvas.width / width, liveCanvas.height / height);

        if (sink) {
            paintInfall(now);
            return;
        }

        const t = now / 1000;
        for (let i = 0; i < twinklers.length; i++) {
            const star = twinklers[i];

            // Scintillation: two detuned sines, so the flicker never finds a rhythm.
            const flick = Math.sin(t * star.sp + star.ph) * 0.62
                + Math.sin(t * star.sp * 2.63 + star.ph * 1.7) * 0.38;

            // Breath: the slow swell underneath, the half that reads as a pulse.
            const breath = Math.sin(t * star.bp + star.bph);

            // Weighted to the flicker but never dropping the swell, so they stay one effect.
            const lift = (flick * 0.5 + 0.5) * 0.7 + (breath * 0.5 + 0.5) * 0.3;

            paintStar(
                lctx,
                star,
                star.a * (star.lo + (star.hi - star.lo) * lift),
                true,
                1 + (lift - 0.5) * star.swell
            );
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

    /* Parallax: a few pixels of pointer drift, transform only so it never repaints. */

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
        // Host is bled 32px past the viewport for parallax; fall back to that pre-layout.
        width = host.clientWidth || window.innerWidth + 64;
        height = host.clientHeight || window.innerHeight + 64;

        [staticCanvas, liveCanvas, backCanvas].forEach((canvas) => {
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
        });
    }

    function build() {
        size();
        buildField();
        paintBackdrop();
        paintStatic();
    }

    build();
    startLive();

    if (finePointer.matches) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    // Resize re-lays out the same sky, so a window drag does not reshuffle it.
    let resizeTimer = 0;
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;

    window.addEventListener('resize', () => {
        // Mobile URL bars fire resize; ignore height-only changes small enough to be that.
        if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 120) return;
        lastW = window.innerWidth;
        lastH = window.innerHeight;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            size();
            paintBackdrop();
            paintStatic();
        }, 150);
    });

    // Do not animate a sky nobody is looking at.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopLive();
        else startLive();
    });

    const onMotionChange = () => {
        // Twinkler strength depends on whether a live layer sits over them, so restatic on change.
        paintStatic();
        if (motionQuery.matches) stopLive();
        else startLive();
    };

    if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', onMotionChange);
    } else if (typeof motionQuery.addListener === 'function') {
        motionQuery.addListener(onMotionChange);
    }
    window.collapseSky = collapseSky;
}());
