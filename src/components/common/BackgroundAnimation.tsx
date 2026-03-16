import { useEffect, useRef } from 'react';

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  trail: number;
}

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // ─── Theme detection ───
    const isDark = () => document.documentElement.classList.contains('dark');

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      density: number;
      hue: number; // 0 = cyan, 1 = purple
    }

    let particles: Particle[] = [];
    
    const connectionDistance = 150;
    const mouseRadius = 150;
    
    let mouse = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;

    // ─── Shooting Stars ───
    const MAX_SHOOTING_STARS = 3;
    let shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;
    const SHOOTING_STAR_INTERVAL = 2500;

    const createShootingStar = (): ShootingStar => {
      const angle = (Math.random() * 30 + 20) * (Math.PI / 180);
      return {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.3,
        length: Math.random() * 60 + 40,
        speed: Math.random() * 8 + 6,
        angle,
        opacity: 1,
        active: true,
        trail: Math.random() * 30 + 20,
      };
    };

    // ─── Twinkling stars ───
    interface TwinklingStar {
      x: number;
      y: number;
      size: number;
      baseOpacity: number;
      phase: number;
      speed: number;
    }

    let twinklingStars: TwinklingStar[] = [];

    const initTwinklingStars = () => {
      twinklingStars = [];
      const count = Math.floor((width * height) / 8000);
      for (let i = 0; i < count; i++) {
        twinklingStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.3,
          baseOpacity: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      density: (Math.random() * 30) + 1,
      hue: Math.random() > 0.5 ? 0 : 1,
    });

    const initParticles = () => {
      particles = [];
      const area = width * height;
      const count = Math.floor(area / 15000);
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
      initTwinklingStars();
    };

    const animate = () => {
      const dark = isDark();
      const now = performance.now();

      // ─── Theme-aware background ───
      if (dark) {
        ctx.fillStyle = '#010208';
        ctx.fillRect(0, 0, width, height);

        // Subtle nebula glows (dark mode only)
        const gradient1 = ctx.createRadialGradient(width * 0.25, height * 0.3, 0, width * 0.25, height * 0.3, width * 0.4);
        gradient1.addColorStop(0, 'rgba(6, 182, 212, 0.03)');
        gradient1.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, width, height);

        const gradient2 = ctx.createRadialGradient(width * 0.75, height * 0.7, 0, width * 0.75, height * 0.7, width * 0.35);
        gradient2.addColorStop(0, 'rgba(128, 0, 255, 0.025)');
        gradient2.addColorStop(1, 'rgba(128, 0, 255, 0)');
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Light mode: clean clear
        ctx.clearRect(0, 0, width, height);
      }

      // ─── Twinkling stars (dark mode only) ───
      if (dark) {
        twinklingStars.forEach(star => {
          star.phase += star.speed;
          const twinkle = star.baseOpacity + Math.sin(star.phase) * 0.3;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, twinkle)})`;
          ctx.fill();
        });
      }

      // ─── Shooting stars (dark mode only) ───
      if (dark) {
        if (now - lastShootingStarTime > SHOOTING_STAR_INTERVAL && shootingStars.filter(s => s.active).length < MAX_SHOOTING_STARS) {
          shootingStars.push(createShootingStar());
          lastShootingStarTime = now;
        }

        shootingStars = shootingStars.filter(s => s.active);
        shootingStars.forEach(star => {
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          star.opacity -= 0.008;

          if (star.opacity <= 0 || star.x > width + 100 || star.y > height + 100) {
            star.active = false;
            return;
          }

          const tailX = star.x - Math.cos(star.angle) * star.length;
          const tailY = star.y - Math.sin(star.angle) * star.length;
          
          const trailGradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
          trailGradient.addColorStop(0, `rgba(6, 182, 212, 0)`);
          trailGradient.addColorStop(0.6, `rgba(6, 182, 212, ${star.opacity * 0.4})`);
          trailGradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity * 0.9})`);
          
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(star.x, star.y);
          ctx.strokeStyle = trailGradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.fill();

          const glowGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 6);
          glowGradient.addColorStop(0, `rgba(6, 182, 212, ${star.opacity * 0.4})`);
          glowGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
          ctx.beginPath();
          ctx.arc(star.x, star.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        });
      }

      // ─── Particle connections (both themes, different colors) ───
      const cyanParticle = dark ? 'rgba(0, 229, 255,' : 'rgba(6, 145, 180,';
      const purpleParticle = dark ? 'rgba(168, 85, 247,' : 'rgba(120, 60, 200,';
      const connOpacity = dark ? 0.15 : 0.35;
      const particleOpacity = dark ? 0.5 : 0.7;
      const lineWidth = dark ? 1 : 1.5;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacityValue = 1 - (distance / connectionDistance);
            const isCyanPair = particles[a].hue === 0 || particles[b].hue === 0;
            ctx.strokeStyle = isCyanPair
              ? `${cyanParticle} ${opacityValue * connOpacity})`
              : `${purpleParticle} ${opacityValue * connOpacity})`;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      // ─── Draw particles ───
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx = -particle.vx;
        if (particle.y < 0 || particle.y > height) particle.vy = -particle.vy;

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRadius - distance) / mouseRadius;
          particle.x -= forceDirectionX * force * particle.density;
          particle.y -= forceDirectionY * force * particle.density;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.hue === 0
          ? `${cyanParticle} ${particleOpacity})`
          : `${purpleParticle} ${particleOpacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default BackgroundAnimation;
