import * as React from "react";

interface Props {
  className?: string;
  withText?: boolean;
  /** Fuerza el texto en blanco (para usarse sobre fondos oscuros, ej. el Hero). */
  light?: boolean;
}

/**
 * Marca gráfica de la comunidad: cruz + fuego del Espíritu + paloma,
 * construida en SVG con la paleta del logo para ser nítida en cualquier tamaño.
 * (Puedes reemplazarla por el logo oficial en src/assets/logo.png.)
 */
export const BrandLogo: React.FC<Props> = ({
  className = "",
  withText = true,
  light = false,
}) => {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10 shrink-0"
        role="img"
        aria-label="Logo Comunidad Bet-el"
      >
        <defs>
          <linearGradient id="bl-flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="55%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FF3D00" />
          </linearGradient>
          <linearGradient id="bl-spirit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00AEEF" />
            <stop offset="100%" stopColor="#005B9A" />
          </linearGradient>
          <linearGradient id="bl-hope" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7ED957" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
        </defs>
        {/* Cruz / tronco */}
        <rect x="28" y="14" width="8" height="40" rx="3" fill="url(#bl-spirit)" />
        <rect x="16" y="26" width="32" height="8" rx="3" fill="url(#bl-hope)" />
        {/* Llama del Espíritu */}
        <path
          d="M32 4c4 5 7 8 7 13a7 7 0 1 1-14 0c0-3 2-5 4-7-1 4 3 5 3 8 .5-4 1-9 0-14z"
          fill="url(#bl-flame)"
        />
        {/* Paloma */}
        <path
          d="M44 30c4-3 9-3 14-1-3 1-4 3-4 6 3-1 6-1 8 1-4 3-9 4-13 2-2-1-4-4-5-8z"
          fill="url(#bl-spirit)"
          opacity="0.9"
        />
      </svg>
      {withText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-base font-extrabold tracking-tight ${
              light ? "text-white" : "text-surface-dark dark:text-white"
            }`}
          >
            Bet-el
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-spirit">
            Casa Abierta
          </span>
        </span>
      )}
    </span>
  );
};

export default BrandLogo;
