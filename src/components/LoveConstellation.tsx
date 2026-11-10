import React, { useRef, useEffect, useState } from 'react';
import { Star, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio.ts';

interface StarNode {
  x: number;
  y: number;
  label?: string;
  isMain?: boolean;
}

export const LoveConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userStars, setUserStars] = useState<Array<{ x: number; y: number }>>([]);
  const [totalStarsAdded, setTotalStarsAdded] = useState(0);

  // Defined constellation nodes tracing out BB ♥ TALHA
  const baseNodes: StarNode[] = [
    // "B"
    { x: 0.18, y: 0.35, label: 'B' },
    { x: 0.18, y: 0.5 },
    { x: 0.18, y: 0.65 },
    { x: 0.24, y: 0.42 },
    { x: 0.24, y: 0.58 },

    // Heart "♥"
    { x: 0.36, y: 0.42 },
    { x: 0.40, y: 0.35, label: '♥' },
    { x: 0.44, y: 0.42 },
    { x: 0.40, y: 0.65 },

    // "T"
    { x: 0.54, y: 0.35, label: 'T' },
    { x: 0.60, y: 0.35 },
    { x: 0.66, y: 0.35 },
    { x: 0.60, y: 0.65 },

    // Surrounding shimmering constellation ring
    { x: 0.76, y: 0.4 },
    { x: 0.82, y: 0.55 },
    { x: 0.74, y: 0.68 },
    { x: 0.12, y: 0.5 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const render = () => {
      t += 0.03;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Deep space background gradient
      const bg = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w / 1.5);
      bg.addColorStop(0, '#1c0828');
      bg.addColorStop(0.5, '#12041a');
      bg.addColorStop(1, '#08020d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Draw faint constellation lines
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < baseNodes.length - 1; i++) {
        const n1 = baseNodes[i];
        const n2 = baseNodes[i + 1];
        ctx.moveTo(n1.x * w, n1.y * h);
        ctx.lineTo(n2.x * w, n2.y * h);
      }
      ctx.stroke();

      // Connect user stars if any
      if (userStars.length > 0) {
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
        ctx.beginPath();
        for (let i = 0; i < userStars.length; i++) {
          const us = userStars[i];
          if (i === 0) {
            ctx.moveTo(us.x * w, us.y * h);
          } else {
            ctx.lineTo(us.x * w, us.y * h);
          }
        }
        ctx.stroke();
      }

      // Draw Base Stars
      for (let i = 0; i < baseNodes.length; i++) {
        const n = baseNodes[i];
        const sx = n.x * w;
        const sy = n.y * h;
        const pulse = Math.sin(t + i * 0.7) * 1.5 + 3.5;

        // Glow
        const starGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, pulse * 2.5);
        starGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
        starGrad.addColorStop(0.5, 'rgba(244, 63, 94, 0.5)');
        starGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = starGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, pulse * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(sx, sy, pulse * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Label if any
        if (n.label) {
          ctx.fillStyle = '#fbbf24';
          ctx.font = 'bold 15px "Playfair Display", Georgia, serif';
          ctx.fillText(n.label, sx + 8, sy - 8);
        }
      }

      // Draw User Added Stars
      for (let i = 0; i < userStars.length; i++) {
        const us = userStars[i];
        const sx = us.x * w;
        const sy = us.y * h;
        const pulse = Math.sin(t * 1.5 + i) * 1.5 + 4;

        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(sx, sy, pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [userStars]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setUserStars((prev) => [...prev.slice(-15), { x, y }]);
    setTotalStarsAdded((prev) => prev + 1);
    soundEngine.playSparkleSound();
  };

  return (
    <section id="constellation" className="py-20 px-4 max-w-7xl mx-auto relative z-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Written in the Cosmos</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
          Our Love <span className="text-gold-gradient">Constellation</span>
        </h2>
        <p className="text-rose-200/80 text-xs sm:text-sm mt-1">
          Touch the night sky below to add your own shining star of love with Talha!
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-rose-900/50 shadow-2xl shadow-rose-950/80 bg-[#08020d]">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          onClick={handleCanvasClick}
          className="w-full h-72 sm:h-96 block cursor-crosshair"
          aria-label="Interactive Love Constellation Canvas"
        />

        {/* Overlay Instructions & Counter */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs text-rose-200/90 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xs border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Click sky to place stars</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xs border border-amber-500/30 text-amber-200">
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
            <span>{totalStarsAdded} Wishes Added</span>
          </div>
        </div>
      </div>
    </section>
  );
};
