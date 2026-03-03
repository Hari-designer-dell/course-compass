import { useEffect, useRef } from "react";

const CODE_SNIPPETS = [
  "pop_score = 0.6 * subscribers",
  "kmeans.fit(X)",
  "import pandas as pd",
  "df.groupby('subject')",
  "cosine_similarity()",
  "np.array(features)",
  "model.predict(user)",
  "tf-idf vectorizer",
  "collaborative filtering",
  "content_duration",
  "num_reviews += 1",
  "sklearn.cluster",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "dot" | "code";
  text?: string;
  rotation: number;
  rotationSpeed: number;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const particles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.05,
        type: "dot",
        rotation: 0,
        rotationSpeed: 0,
      });
    }
    for (let i = 0; i < 8; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.15 - 0.05,
        size: 11,
        opacity: Math.random() * 0.12 + 0.04,
        type: "code",
        text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
        rotation: (Math.random() - 0.5) * 0.3,
        rotationSpeed: (Math.random() - 0.5) * 0.001,
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Wrap around
        if (p.x < -100) p.x = canvas.width + 100;
        if (p.x > canvas.width + 100) p.x = -100;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        if (p.type === "dot") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(0, 85%, 55%, ${p.opacity})`;
          ctx.fill();
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = `hsla(0, 85%, 55%, ${p.opacity})`;
          ctx.fillText(p.text || "", 0, 0);
          ctx.restore();
        }
      }

      // Draw faint connections between nearby dots
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].type !== "dot") continue;
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].type !== "dot") continue;
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(0, 85%, 55%, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticlesBackground;
