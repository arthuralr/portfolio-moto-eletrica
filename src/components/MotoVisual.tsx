import React, { useState } from 'react';

interface MotoVisualProps {
  tipo: 'sport' | 'naked' | 'cruiser' | 'scooter' | 'hyper';
  nome: string;
  corAcento?: string;
  className?: string;
  glow?: boolean;
  imagemUrl?: string;
}

export const MotoVisual: React.FC<MotoVisualProps> = ({
  tipo,
  nome,
  corAcento = '#06b6d4',
  className = 'w-full h-48',
  glow = true,
  imagemUrl
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-slate-800/80 group ${className}`}
    >
      {/* Background radial glow */}
      {glow && (
        <div
          className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${corAcento}33 0%, transparent 70%)`
          }}
        />
      )}

      {/* Grid pattern backdrop */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle floor reflection line */}
      <div className="absolute bottom-5 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Custom Image URL rendering if provided and not in error */}
      {imagemUrl && !imageError ? (
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
          <img
            src={imagemUrl}
            alt={`Fotografia da motocicleta elétrica ${nome}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full max-h-56 object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        /* SVG Vector Motorcycle Illustration */
        <svg
          viewBox="0 0 600 320"
          className="w-full h-full max-h-56 p-4 z-10 transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={`Ilustração técnica da motocicleta elétrica ${nome}`}
        >
          <defs>
            <linearGradient id={`grad-metal-${tipo}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id={`grad-neon-${tipo}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={corAcento} />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id={`grad-tire`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#090d16" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <filter id={`neon-glow-${tipo}`} x1="-20%" y1="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={corAcento} floodOpacity="0.8" />
            </filter>
          </defs>

          {/* REAR WHEEL */}
          <g className="rear-wheel">
            <circle cx="120" cy="220" r="68" stroke="url(#grad-tire)" strokeWidth="18" fill="#090d16" />
            <circle cx="120" cy="220" r="54" stroke="#475569" strokeWidth="3" />
            <circle cx="120" cy="220" r="48" stroke={corAcento} strokeWidth="1.5" strokeDasharray="16 10" filter={`url(#neon-glow-${tipo})`} />
            <circle cx="120" cy="220" r="32" stroke="#64748b" strokeWidth="4" strokeDasharray="4 3" />
            <circle cx="120" cy="220" r="14" fill="#334155" stroke={corAcento} strokeWidth="2" />
            <line x1="120" y1="168" x2="120" y2="272" stroke="#475569" strokeWidth="2" />
            <line x1="68" y1="220" x2="172" y2="220" stroke="#475569" strokeWidth="2" />
            <line x1="84" y1="184" x2="156" y2="256" stroke="#475569" strokeWidth="2" />
            <line x1="156" y1="184" x2="84" y2="256" stroke="#475569" strokeWidth="2" />
          </g>

          {/* FRONT WHEEL */}
          <g className="front-wheel">
            <circle cx="480" cy="220" r="68" stroke="url(#grad-tire)" strokeWidth="18" fill="#090d16" />
            <circle cx="480" cy="220" r="54" stroke="#475569" strokeWidth="3" />
            <circle cx="480" cy="220" r="48" stroke={corAcento} strokeWidth="1.5" strokeDasharray="16 10" filter={`url(#neon-glow-${tipo})`} />
            <circle cx="480" cy="220" r="36" stroke="#64748b" strokeWidth="5" strokeDasharray="5 3" />
            <circle cx="480" cy="220" r="14" fill="#334155" stroke={corAcento} strokeWidth="2" />
            <rect x="496" y="195" width="10" height="24" rx="2" fill={corAcento} />
            <line x1="480" y1="168" x2="480" y2="272" stroke="#475569" strokeWidth="2" />
            <line x1="428" y1="220" x2="532" y2="220" stroke="#475569" strokeWidth="2" />
            <line x1="444" y1="184" x2="516" y2="256" stroke="#475569" strokeWidth="2" />
            <line x1="516" y1="184" x2="444" y2="256" stroke="#475569" strokeWidth="2" />
          </g>

          {/* SWINGARM & REAR SUSPENSION */}
          <path d="M120 220 L240 210 L260 170" stroke="#475569" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="190" y1="215" x2="230" y2="155" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
          <path d="M200 200 L220 170" stroke={corAcento} strokeWidth="5" strokeDasharray="4 3" />

          {/* ELECTRIC MOTOR & BATTERY CORE PACK */}
          <rect x="210" y="150" width="120" height="75" rx="8" fill="url(#grad-metal-sport)" stroke="#334155" strokeWidth="2" />
          <line x1="225" y1="165" x2="315" y2="165" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="225" y1="178" x2="315" y2="178" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="225" y1="191" x2="315" y2="191" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="225" y1="204" x2="315" y2="204" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M240 185 Q270 200 310 185" stroke={corAcento} strokeWidth="3" filter={`url(#neon-glow-${tipo})`} />

          {/* CHASSIS & FRAME */}
          {tipo === 'naked' || tipo === 'hyper' ? (
            <g>
              <path d="M220 145 L350 135 L440 120" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
              <line x1="240" y1="145" x2="280" y2="215" stroke="#475569" strokeWidth="4" />
              <line x1="280" y1="140" x2="330" y2="215" stroke="#475569" strokeWidth="4" />
              <line x1="330" y1="137" x2="380" y2="190" stroke="#475569" strokeWidth="4" />
              <line x1="350" y1="135" x2="320" y2="170" stroke={corAcento} strokeWidth="3" />
            </g>
          ) : (
            <path d="M220 145 L330 140 L440 120" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
          )}

          {/* FRONT FORK & HANDLEBARS */}
          <g>
            <line x1="440" y1="110" x2="480" y2="220" stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" />
            <line x1="444" y1="120" x2="475" y2="200" stroke={corAcento} strokeWidth="2" />
            <rect x="430" y="105" width="22" height="12" rx="2" fill="#334155" />
            <path d="M428 102 L442 92 L455 96" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* BODYWORK SPECIFIC TO TYPE */}
          {tipo === 'sport' && (
            <g className="fairing-sport">
              <path
                d="M440 110 L505 130 L455 185 L350 170 L300 130 L440 110 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="2"
              />
              <path d="M475 145 L515 155 L485 162 Z" fill={corAcento} />
              <path d="M320 132 L440 112 L495 130" stroke={corAcento} strokeWidth="3" filter={`url(#neon-glow-${tipo})`} />
              <path d="M290 128 C340 110 390 100 440 110" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              <path d="M160 140 L240 140 L280 155" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
              <path d="M170 135 L220 135" stroke={corAcento} strokeWidth="3" />
              <polygon points="505,128 518,135 498,138" fill={corAcento} filter={`url(#neon-glow-${tipo})`} />
            </g>
          )}

          {tipo === 'naked' && (
            <g className="fairing-naked">
              <path
                d="M310 135 C350 105 400 102 438 114 L420 145 L320 145 Z"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="2"
              />
              <path d="M340 118 L420 112" stroke={corAcento} strokeWidth="4" filter={`url(#neon-glow-${tipo})`} />
              <polygon points="450,105 470,118 456,132 444,118" fill="#1e293b" stroke={corAcento} strokeWidth="2" />
              <circle cx="458" cy="118" r="5" fill={corAcento} filter={`url(#neon-glow-${tipo})`} />
              <path d="M170 142 L250 144 L290 155" stroke="#0f172a" strokeWidth="14" strokeLinecap="round" />
              <path d="M165 136 L210 136" stroke={corAcento} strokeWidth="2.5" />
            </g>
          )}

          {tipo === 'cruiser' && (
            <g className="fairing-cruiser">
              <path
                d="M260 145 C320 110 380 115 425 125 L400 155 L280 160 Z"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="2"
              />
              <path d="M190 170 C220 185 260 180 290 155" stroke="#020617" strokeWidth="16" strokeLinecap="round" />
              <path d="M190 163 C220 178 250 173 280 150" stroke={corAcento} strokeWidth="3" />
              <circle cx="455" cy="120" r="12" fill="#090d16" stroke={corAcento} strokeWidth="2.5" />
              <circle cx="455" cy="120" r="6" fill={corAcento} filter={`url(#neon-glow-${tipo})`} />
              <path d="M80 200 C80 165 120 150 170 160" stroke="#1e293b" strokeWidth="8" fill="none" />
            </g>
          )}

          {tipo === 'scooter' && (
            <g className="fairing-scooter">
              <path
                d="M440 100 L480 150 L420 220 L300 220 L270 180 L220 180 L180 190"
                stroke="#1e293b"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M430 85 L445 55 L465 85 L448 105 Z" fill="#020617" stroke={corAcento} strokeWidth="1.5" />
              <path d="M200 165 L320 165" stroke="#0f172a" strokeWidth="18" strokeLinecap="round" />
              <line x1="210" y1="158" x2="310" y2="158" stroke={corAcento} strokeWidth="2.5" />
              <polygon points="465,130 488,140 460,150" fill={corAcento} filter={`url(#neon-glow-${tipo})`} />
            </g>
          )}

          {tipo === 'hyper' && (
            <g className="fairing-hyper">
              <path
                d="M440 105 L490 120 L445 155 L350 145 L320 120 Z"
                fill="#090d16"
                stroke={corAcento}
                strokeWidth="2"
              />
              <line x1="435" y1="120" x2="475" y2="135" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="478" cy="122" r="4" fill={corAcento} filter={`url(#neon-glow-${tipo})`} />
              <circle cx="468" cy="130" r="3.5" fill="#22c55e" filter={`url(#neon-glow-${tipo})`} />
              <polygon points="450,140 485,150 440,165" fill="#1e293b" stroke="#334155" />
              <path d="M150 135 L230 138 L280 150" stroke="#020617" strokeWidth="12" strokeLinecap="round" />
              <path d="M145 130 L195 132" stroke={corAcento} strokeWidth="3" filter={`url(#neon-glow-${tipo})`} />
            </g>
          )}

          {/* VOLTMOTO ELECTRIC BADGE */}
          <text
            x="300"
            y="295"
            textAnchor="middle"
            fill="#475569"
            fontSize="11"
            letterSpacing="4"
            className="font-mono uppercase font-semibold"
          >
            VOLTMOTO EV ARCHITECTURE · 100% ELECTRIC
          </text>
        </svg>
      )}
    </div>
  );
};
