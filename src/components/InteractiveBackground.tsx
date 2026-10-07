import React, { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
}

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth lerping
    const mouse = {
      x: width * 0.5,
      y: height * 0.3,
      targetX: width * 0.5,
      targetY: height * 0.3,
      prevX: width * 0.5,
      prevY: height * 0.3,
      isHovered: false,
      speed: 0,
    };

    // Track ripples generated on movement
    const ripples: Ripple[] = [];

    // Background floating ambient particles (few & lightweight)
    const particleCount = 20;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.25 + 0.1,
    }));

    // Handle high DPI displays safely
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Pointer listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;

      // Calculate speed and trigger occasional subtle ripples
      const dx = mouse.targetX - mouse.prevX;
      const dy = mouse.targetY - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.targetX;
      mouse.prevY = mouse.targetY;

      if (!prefersReducedMotion && mouse.speed > 8 && ripples.length < 5) {
        ripples.push({
          x: mouse.targetX,
          y: mouse.targetY,
          radius: 12,
          maxRadius: 110,
          alpha: Math.min(0.22, mouse.speed * 0.008),
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Grid configuration
    const gridSpacing = 42; // Distance between grid lattice points
    const distortionRadius = 130; // Radius of influence around cursor
    const maxDisplacement = 14; // Maximum pixels a dot will displace

    // Strict 60 FPS cap configuration (locks frame rate on high refresh displays like 120Hz/144Hz)
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS; // 16.67ms
    let lastFrameTime = performance.now();

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) {
        return; // Skip render to limit to 60 FPS
      }
      lastFrameTime = currentTime - (elapsed % frameInterval);

      // Smooth interpolation (lerping)
      const lerpFactor = 0.09;
      mouse.x += (mouse.targetX - mouse.x) * lerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * lerpFactor;

      ctx.clearRect(0, 0, width, height);


      // 1. Soft Dynamic Radial Glow that follows the interpolated cursor
      if (mouse.isHovered || prefersReducedMotion) {
        const glowRadius = 260;
        const radialGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        radialGlow.addColorStop(0, "rgba(34, 211, 238, 0.07)");
        radialGlow.addColorStop(0.4, "rgba(59, 130, 246, 0.035)");
        radialGlow.addColorStop(1, "rgba(8, 9, 13, 0)");

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Subtle Ripples around cursor position
      if (!prefersReducedMotion && ripples.length > 0) {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += 2.2;
          r.alpha *= 0.94;

          if (r.alpha < 0.01 || r.radius >= r.maxRadius) {
            ripples.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34, 211, 238, ${r.alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // 3. Dynamic Grid with Distortion/Bending
      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * gridSpacing;
          const baseY = j * gridSpacing;

          let drawX = baseX;
          let drawY = baseY;
          let pointAlpha = 0.08;
          let pointSize = 1;

          if (!prefersReducedMotion && mouse.isHovered) {
            const dx = baseX - mouse.x;
            const dy = baseY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < distortionRadius && dist > 0.001) {
              // Smooth cosine decay for organic bending
              const factor = (1 - dist / distortionRadius);
              const displacement = Math.sin(factor * Math.PI * 0.5) * maxDisplacement;

              // Repel slightly away from cursor with subtle wave twist
              const angle = Math.atan2(dy, dx);
              drawX = baseX + Math.cos(angle) * displacement;
              drawY = baseY + Math.sin(angle) * displacement;

              // Brighten grid dots when close to cursor
              pointAlpha = 0.08 + factor * 0.35;
              pointSize = 1 + factor * 1.2;
            }
          }

          ctx.fillStyle = `rgba(148, 163, 184, ${pointAlpha})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, pointSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Ambient Floating Particles that gently steer near cursor
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        let alpha = p.baseAlpha;

        if (!prefersReducedMotion && mouse.isHovered) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180 && dist > 1) {
            // Subtle magnetic repulsion
            const force = (1 - dist / 180) * 0.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            alpha = Math.min(0.6, p.baseAlpha + force * 0.4);
          }
        }

        ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);


    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: 0.95,
      }}
    />
  );
};
