import { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

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
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Connections
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacityValue = 1 - (distance / connectionDistance);
            // Use cyan-purple gradient for connections
            const isCyanPair = particles[a].hue === 0 || particles[b].hue === 0;
            if (isCyanPair) {
              ctx.strokeStyle = `rgba(0, 229, 255, ${opacityValue * 0.15})`;
            } else {
              ctx.strokeStyle = `rgba(168, 85, 247, ${opacityValue * 0.15})`;
            }
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        // Move
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx = -particle.vx;
        if (particle.y < 0 || particle.y > height) particle.vy = -particle.vy;

        // Mouse interaction
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

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        if (particle.hue === 0) {
          ctx.fillStyle = 'rgba(0, 229, 255, 0.5)';
        } else {
          ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
        }
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
    />
  );
};

export default BackgroundAnimation;
