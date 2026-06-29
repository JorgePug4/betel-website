import * as React from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  size: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  "rgba(0,174,239,0.55)", // azul espíritu
  "rgba(255,122,0,0.5)", // naranja
  "rgba(126,217,87,0.5)", // verde
  "rgba(255,213,79,0.55)", // amarillo
];

const buildParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 4,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    color: COLORS[i % COLORS.length],
  }));

interface Props {
  count?: number;
  className?: string;
}

/** Partículas flotantes decorativas. Aria-hidden por ser puramente visual. */
export const ParticleBackground: React.FC<Props> = ({
  count = 28,
  className = "",
}) => {
  // Menos partículas en móvil (mejora TBT) y respeta prefers-reduced-motion.
  const [effectiveCount, setEffectiveCount] = React.useState(count);
  React.useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setEffectiveCount(0);
    } else if (window.innerWidth < 768) {
      setEffectiveCount(Math.ceil(count / 2));
    } else {
      setEffectiveCount(count);
    }
  }, [count]);

  const particles = React.useMemo(
    () => buildParticles(effectiveCount),
    [effectiveCount],
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
