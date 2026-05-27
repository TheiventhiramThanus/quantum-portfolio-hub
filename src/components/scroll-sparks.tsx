import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;

  constructor(x: number, y: number, velocity: number) {
    this.x = x;
    this.y = y;
    // Shoot leftwards from the right edge
    this.vx = (Math.random() * -3 - 1) * (Math.abs(velocity) * 0.05 + 1);
    // Shoot up/down based on scroll direction
    this.vy = (Math.random() - 0.5) * 4 + (velocity * 0.15);
    this.maxLife = Math.random() * 30 + 15; // Shorter life for performance
    this.life = this.maxLife;
    this.size = Math.random() * 2.5 + 1.0;
    
    // Fire-like neon colors for a dynamic scroll effect
    const colors = ['#FF4500', '#FF8C00', '#FFD700', '#38BDF8'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.size *= 0.92; // Shrink faster
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function ScrollSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on mobile/touch screens completely for better performance
    if (window.matchMedia("(hover: none), (max-width: 768px)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let particles: Particle[] = [];
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let animationId: number | null = null;
    let isAnimating = false;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles = particles.filter((p) => p.life > 0 && p.size > 0.1);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        animationId = null;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      
      // Prevent massive spikes if tab was inactive
      if (dt > 100) {
        lastScrollY = currentScrollY;
        lastTime = now;
        return; 
      }

      // Calculate scroll velocity
      const velocity = (currentScrollY - lastScrollY) / dt;
      
      // Only spawn if scrolling fast enough
      if (Math.abs(velocity) > 0.2) {
        // Calculate approx thumb position on screen
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const scrollPercent = currentScrollY / maxScroll;
        const thumbY = scrollPercent * window.innerHeight;

        // Spawn particles proportional to scroll speed (capped at 12 for richer fire effect)
        const count = Math.min(Math.floor(Math.abs(velocity) * 4), 12);
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(width - 15, thumbY, velocity));
        }

        if (!isAnimating) {
          isAnimating = true;
          animate();
        }
      }

      lastScrollY = currentScrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
}

