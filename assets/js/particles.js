// Particles module — exposes `initParticleBackground(options)` on `window`.
// Options:
//  - densityScale: number (multiplier for how many particles)
//  - color: CSS color string (hex, rgb, rgba). Global alpha controlled per-particle.
//  - influence: number (px) radius of hover influence
//  - burstForce: number (multiplier for burst force)
// Returns: function destroy() that removes canvas and listeners.
(function () {
  function _init(options) {
    options = options || {};
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
    if (document.getElementById('particle-bg')) return null;

    const color = (options.color || getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || getComputedStyle(document.documentElement).getPropertyValue('--purple') || '#7C3AED').trim();
    const densityScale = typeof options.densityScale === 'number' ? options.densityScale : 1;
    const influence = typeof options.influence === 'number' ? options.influence : 120;
    const burstForceMul = typeof options.burstForce === 'number' ? options.burstForce : 2.2;

    const canvas = document.createElement('canvas');
    canvas.id = 'particle-bg';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.setAttribute('aria-hidden', 'true');

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    document.body.insertBefore(canvas, document.body.firstChild);

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const baseNum = Math.max(8, Math.round((width * height) / 150000));
    const num = Math.max(6, Math.round(baseNum * densityScale));

    function rand(min, max) { return Math.random() * (max - min) + min; }

    for (let i = 0; i < num; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.18, 0.18),
        vy: rand(-0.12, 0.12),
        r: rand(4, 20) * (Math.random() < 0.5 ? 0.7 : 1),
        alpha: rand(0.04, 0.12)
      });
    }

    let raf = null;
    const pointer = { x: null, y: null, active: false };

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now();

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy + Math.sin((time + p.x) / 600) * 0.1;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        let drawR = p.r;
        if (pointer.active && pointer.x !== null && pointer.y !== null) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < influence) {
            const factor = 1 + (1 - dist / influence) * 1.0;
            drawR = p.r * factor;
            const repulse = (1 - dist / influence) * 0.5;
            p.vx += (dx / (dist || 1)) * repulse * 0.15 || 0;
            p.vy += (dy / (dist || 1)) * repulse * 0.12 || 0;
          }
        }

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, drawR, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function onPointerMove(e) {
      pointer.active = true;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    function onPointerLeave() { pointer.active = false; pointer.x = pointer.y = null; }

    function onPointerDown(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const burstRadius = Math.max(80, influence - 20);
      particles.forEach(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < burstRadius) {
          const force = (1 - dist / burstRadius) * burstForceMul;
          p.vx += (dx / (dist || 1)) * force;
          p.vy += (dy / (dist || 1)) * force;
          p.alpha = Math.min(0.45, p.alpha + 0.12);
          p.r = p.r * 1.12;
          setTimeout(() => { p.r = Math.max(3, p.r * 0.88); p.alpha = Math.max(0.03, p.alpha - 0.08); }, 380 + Math.random() * 260);
        }
      });
    }

    function onResize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
    function onVisibility() {
      if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; } else if (!raf) { raf = requestAnimationFrame(draw); }
    }

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    raf = requestAnimationFrame(draw);

    const destroy = () => {
      if (raf) cancelAnimationFrame(raf);
      try { canvas.removeEventListener('pointermove', onPointerMove); canvas.removeEventListener('pointerleave', onPointerLeave); canvas.removeEventListener('pointerdown', onPointerDown); } catch (e) {}
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      const el = document.getElementById('particle-bg'); if (el && el.parentNode) el.parentNode.removeChild(el);
    };

    return { destroy };
  }

  window.initParticleBackground = function (options) {
    return _init(options) || null;
  };
})();
