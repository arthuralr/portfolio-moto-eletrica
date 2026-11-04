import React from 'react';
import { ArrowDown, Zap, BatteryCharging, Gauge, Shield, ChevronRight, CheckCircle2, ShieldCheck, Bike } from 'lucide-react';
import { MotoVisual } from './MotoVisual.tsx';

interface HeroProps {
  onOpenTestRide: () => void;
  onSelectMoto: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTestRide, onSelectMoto }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Floor */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-300 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Resolução CONTRAN 996</span>
              <span className="text-slate-600">·</span>
              <span className="text-white">100% Liberada de CNH e Emplacamento</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 text-balance">
              Liberdade urbana{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                sem CNH, sem placa
              </span>{' '}
              e sem IPVA.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl font-light">
              Chega de trânsito parado, autoescola e combustível caro. Conheça as motos elétricas autopropelidas da{' '}
              <strong className="text-white font-semibold">VoltMoto</strong>: 1000W de potência, até 32 km/h e permitidas em ciclovias e vias urbanas. Compre hoje e saia rodando na mesma hora.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
              >
                Ver Modelos Autopropelidos
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenTestRide}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl text-slate-200 bg-slate-900 border border-slate-700/80 hover:bg-slate-850 hover:text-white transition-all hover:border-emerald-500/50"
              >
                Test-Ride Sem Habilitação
              </button>
            </div>

            {/* Adjacency Proof Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  32<span className="text-cyan-400 text-lg">km/h</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Velocidade Máxima Legal</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  1000<span className="text-cyan-400 text-lg">W</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Motor Brushless Forte</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  60<span className="text-emerald-300 text-lg">km</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Autonomia por Carga</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-2 rounded-2xl bg-gradient-to-b from-slate-800/40 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl">
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/90 border border-emerald-500/40 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Sem CNH · Sem Emplacamento
              </div>

              {/* Vector Showcase */}
              <div className="relative">
                <MotoVisual
                  tipo="cruiser"
                  nome="Volt Custom Chopper 1000W"
                  corAcento="#06b6d4"
                  className="w-full h-72 sm:h-80"
                />
              </div>

              {/* Overlay Model Specs Box */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 rounded-b-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">Volt Custom Chopper 1000W</h3>
                    <p className="text-xs text-emerald-400 font-medium">Estilo Harley Fat Tire · Sem CNH</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Preço à vista</span>
                    <span className="text-base font-bold font-mono text-cyan-400">R$ 11.890</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-850 text-center">
                  <div className="bg-slate-900/60 p-2 rounded">
                    <span className="text-[10px] text-slate-400 block">Velocidade</span>
                    <span className="text-xs font-bold font-mono text-slate-200">32 km/h</span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded">
                    <span className="text-[10px] text-slate-400 block">Autonomia</span>
                    <span className="text-xs font-bold font-mono text-cyan-300">55 km</span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded">
                    <span className="text-[10px] text-slate-400 block">Bateria</span>
                    <span className="text-xs font-bold font-mono text-emerald-300">Removível</span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => onSelectMoto('voltmoto-chopper-custom-1000')}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white transition-colors"
                  >
                    Ver Ficha Técnica
                  </button>
                  <button
                    onClick={onOpenTestRide}
                    className="flex-1 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
                  >
                    Test-Ride Livre
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-pillar trust strip below hero */}
        <div className="mt-16 pt-10 border-t border-slate-850 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Não Exige CNH</div>
              <div className="text-xs text-slate-400">Sem autoescola nem prova</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Zero Emplacamento</div>
              <div className="text-xs text-slate-400">Sem taxa de Detran nem IPVA</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-950/60 border border-teal-800/40 flex items-center justify-center text-teal-400 shrink-0">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Livre em Ciclovias</div>
              <div className="text-xs text-slate-400">Escape de todo engarrafamento</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-950/60 border border-sky-800/40 flex items-center justify-center text-sky-400 shrink-0">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Carga em Tomada Comum</div>
              <div className="text-xs text-slate-400">Bateria portátil tipo maleta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
