import React, { useState } from 'react';

interface MotoPhotoViewProps {
  imagemUrl?: string;
  nome: string;
  tipo: 'cruiser' | 'scooter' | 'naked' | 'sport' | 'hyper';
  corAcento?: string;
  className?: string;
  badge?: string;
  showMirror?: boolean;
}

// Curated high-resolution photographic sources for electric autopropelidos
export const FOTOS_PADRAO_AUTOPROPELIDOS: Record<string, string> = {
  'voltmoto-chopper-custom-1000': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
  'voltmoto-jet-urban-1000': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
  'voltmoto-motochefe-fat-1000': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
  'voltmoto-vintage-retro-1000': 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
  'default-chopper': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
  'default-scooter': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
  'default-fatbike': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
  'default-vintage': 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80'
};

export const MotoPhotoView: React.FC<MotoPhotoViewProps> = ({
  imagemUrl,
  nome,
  tipo,
  corAcento = '#10b981',
  className = 'w-full h-64',
  badge,
  showMirror = true
}) => {
  const [carregouComSucesso, setCarregouComSucesso] = useState(false);
  const [erroCarregamento, setErroCarregamento] = useState(false);

  // If no custom URL provided, pick curated automotive photo based on type
  const urlFoto = imagemUrl || (
    tipo === 'cruiser' ? FOTOS_PADRAO_AUTOPROPELIDOS['voltmoto-chopper-custom-1000'] :
    tipo === 'scooter' ? FOTOS_PADRAO_AUTOPROPELIDOS['voltmoto-jet-urban-1000'] :
    tipo === 'naked' ? FOTOS_PADRAO_AUTOPROPELIDOS['voltmoto-motochefe-fat-1000'] :
    FOTOS_PADRAO_AUTOPROPELIDOS['voltmoto-vintage-retro-1000']
  );

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800/80 group ${className}`}
    >
      {/* Studio radial ambient spotlight */}
      <div
        className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 55%, ${corAcento}33 0%, transparent 65%)`
        }}
      />

      {/* Subtle showroom grid & floor reflection */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute bottom-4 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      {/* Badge over photo */}
      {badge && (
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-slate-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-400 backdrop-blur-md shadow-lg">
          {badge}
        </div>
      )}

      {/* Real High-Resolution Photograph with dark showroom grading */}
      {!erroCarregamento && (
        <div className="relative z-10 w-full h-full flex items-center justify-center p-2 overflow-hidden">
          <img
            src={urlFoto}
            alt={`Fotografia da moto elétrica autopropelida ${nome}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setCarregouComSucesso(true)}
            onError={() => setErroCarregamento(true)}
            className={`w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-105 filter contrast-105 brightness-95 group-hover:brightness-105 ${
              carregouComSucesso ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Subtle dark gradient scrim at the bottom for showroom depth */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none rounded-b-xl" />
        </div>
      )}

      {/* Fallback: Ultra-realistic 3D Render Presentation if image fails or before loading */}
      {(erroCarregamento || !carregouComSucesso) && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-center">
          {/* 3D Realistic Vehicle Silhouette */}
          <div className="relative w-full max-w-sm h-36 flex items-center justify-center">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="metal-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="50%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="tire-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <linearGradient id="emerald-glow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>

              {/* Floor Shadow */}
              <ellipse cx="200" cy="180" rx="170" ry="12" fill="#000" opacity="0.6" />

              {/* Rear Fat Wheel */}
              <circle cx="85" cy="140" r="45" stroke="url(#tire-grad)" strokeWidth="18" fill="#0b0f19" />
              <circle cx="85" cy="140" r="32" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
              <circle cx="85" cy="140" r="10" fill="#334155" stroke="#10b981" strokeWidth="2" />

              {/* Front Wheel */}
              <circle cx="315" cy="140" r="45" stroke="url(#tire-grad)" strokeWidth="18" fill="#0b0f19" />
              <circle cx="315" cy="140" r="32" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
              <circle cx="315" cy="140" r="10" fill="#334155" stroke="#10b981" strokeWidth="2" />

              {/* Chassis Frame */}
              <path d="M85 140 L160 135 L220 95 L285 75 L315 140" stroke="url(#metal-grad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="160" y1="135" x2="200" y2="70" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
              <line x1="200" y1="70" x2="250" y2="75" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />

              {/* Battery Pack with cooling ribs */}
              <rect x="145" y="100" width="70" height="50" rx="6" fill="#090d16" stroke="#334155" strokeWidth="2" />
              <line x1="155" y1="112" x2="205" y2="112" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="155" y1="122" x2="205" y2="122" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="155" y1="132" x2="205" y2="132" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />

              {/* 1000W Motor Hub Badge */}
              <circle cx="85" cy="140" r="18" fill="#090d16" stroke="#10b981" strokeWidth="1.5" />
              <text x="85" y="143" textAnchor="middle" fill="#10b981" fontSize="7" fontWeight="bold">1000W</text>

              {/* High Handlebars */}
              <path d="M285 75 L295 45 L310 50" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

              {/* Headlamp Lens Flare */}
              <circle cx="320" cy="80" r="8" fill="#10b981" opacity="0.8" />
              <circle cx="320" cy="80" r="4" fill="#fff" />
            </svg>
          </div>

          <span className="text-xs font-semibold text-slate-300 mt-2 font-mono">
            {nome} · 1000W Autopropelido
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">
            Resolução CONTRAN 996 · Sem CNH
          </span>
        </div>
      )}

      {/* Showroom Lighting Rim Effect */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  );
};
