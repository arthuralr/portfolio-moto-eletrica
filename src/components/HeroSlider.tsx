import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Gauge, 
  Zap, 
  Battery, 
  Bike
} from 'lucide-react';
import { CONTATO_CONFIG, gerarLinkWhatsapp } from '../data/motos.ts';

interface HeroSliderProps {
  onOpenTestRide: (modelo?: string) => void;
  onSelectMoto: (id: string) => void;
}

interface SlideItem {
  id: string;
  nome: string;
  categoria: string;
  tituloForte: string;
  subtitulo: string;
  preco: string;
  precoParcelado: string;
  velocidade: string;
  potencia: string;
  autonomia: string;
  corAcento: string;
  imagemFoto: string;
  badge: string;
}

const SLIDES_FOTOGRAFICOS: SlideItem[] = [
  {
    id: 'voltmoto-chopper-custom-1000',
    nome: 'Volt Custom Chopper 1000W',
    categoria: 'Estilo Harley Fat Tire Autopropelida',
    tituloForte: 'A Autêntica Chopper Fat Tire Sem CNH.',
    subtitulo: 'Design brutal inspirado nas choppers americanas com pneus extra largos. Totalmente dispensada de carteira de habilitação, emplacamento e IPVA conforme a Resolução CONTRAN 996.',
    preco: 'R$ 11.890',
    precoParcelado: 'Ou 18x de R$ 789 no cartão',
    velocidade: 'Até 32 km/h (Legal)',
    potencia: '1000W Brushless',
    autonomia: '55 km por carga',
    corAcento: '#10b981',
    imagemFoto: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1920&q=85',
    badge: 'Campeã de Vendas no Brasil'
  },
  {
    id: 'voltmoto-motochefe-fat-1000',
    nome: 'Volt MotoChefe Beast 1000W',
    categoria: 'Fat Bike MotoChefe Urbana',
    tituloForte: 'Estilo MotoChefe com Banco Duplo e 60 km de Autonomia.',
    subtitulo: 'A autopropelida mais robusta do mercado com encosto confort para garupa, freios hidráulicos duplos e bateria de lítio 60V para você escapar de todo engarrafamento.',
    preco: 'R$ 13.490',
    precoParcelado: 'Ou 18x de R$ 895 no cartão',
    velocidade: 'Até 32 km/h (Legal)',
    potencia: '1000W High Torque',
    autonomia: '60 km Recorde',
    corAcento: '#06b6d4',
    imagemFoto: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1920&q=85',
    badge: 'Maior Autonomia (60 km)'
  },
  {
    id: 'voltmoto-jet-urban-1000',
    nome: 'Volt Jet Urban Flow 1000W',
    categoria: 'Scooter Urbana Jet',
    tituloForte: 'A Scooter Elétrica que Não Precisa de Placa.',
    subtitulo: 'Praticidade extrema para o dia a dia. Permitida em ciclovias e ciclofaixas, com baú embutido e custo de recarga inferior a R$ 1,00 na tomada comum da sua casa.',
    preco: 'R$ 8.990',
    precoParcelado: 'Ou 18x de R$ 598 no cartão',
    velocidade: 'Até 32 km/h (Legal)',
    potencia: '1000W Hub Traseiro',
    autonomia: '50 km por carga',
    corAcento: '#22c55e',
    imagemFoto: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1920&q=85',
    badge: 'Melhor Custo x Benefício'
  },
  {
    id: 'voltmoto-vintage-retro-1000',
    nome: 'Volt Classic Vintage 1000W',
    categoria: 'Retro Vintage Café Elétrica',
    tituloForte: 'Visual Retrô Sofisticado com Liberdade 100% Elétrica.',
    subtitulo: 'Elegância europeia com acabamento em couro marrom e motor silencioso de 1000W. Compre hoje e saia pilotando no mesmo dia sem taxa de Detran nem autoescola.',
    preco: 'R$ 10.490',
    precoParcelado: 'Ou 18x de R$ 698 no cartão',
    velocidade: 'Até 32 km/h (Legal)',
    potencia: '1000W Eco Silent',
    autonomia: '48 km por carga',
    corAcento: '#10b981',
    imagemFoto: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1920&q=85',
    badge: 'Edição Exclusiva'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenTestRide, onSelectMoto }) => {
  const [slideAtual, setSlideAtual] = useState(0);
  const [estaPausado, setEstaPausado] = useState(false);
  const tempoIntervalo = 6500; // 6.5s per slide
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const irParaProximo = () => {
    setSlideAtual((prev) => (prev + 1) % SLIDES_FOTOGRAFICOS.length);
  };

  const irParaAnterior = () => {
    setSlideAtual((prev) => (prev - 1 + SLIDES_FOTOGRAFICOS.length) % SLIDES_FOTOGRAFICOS.length);
  };

  useEffect(() => {
    if (!estaPausado) {
      timerRef.current = setInterval(() => {
        irParaProximo();
      }, tempoIntervalo);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [estaPausado, slideAtual]);

  const slide = SLIDES_FOTOGRAFICOS[slideAtual];
  const linkWhatsSlide = gerarLinkWhatsapp(slide.nome, slide.preco);

  return (
    <section
      id="hero-slider"
      className="relative min-h-[640px] lg:min-h-[760px] pt-24 pb-16 flex items-center overflow-hidden bg-slate-950"
      onMouseEnter={() => setEstaPausado(true)}
      onMouseLeave={() => setEstaPausado(false)}
    >
      {/* Background Cinematic Photo Banner with Fade Transition */}
      <div className="absolute inset-0 z-0">
        {SLIDES_FOTOGRAFICOS.map((item, idx) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === slideAtual ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            {/* Background High-Res Photographic Asset */}
            <img
              src={item.imagemFoto}
              alt={item.nome}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-110 saturate-[0.85]"
            />
            {/* Dark Obsidian & Gradient Scrims for maximum readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div
              className="absolute inset-0 opacity-25"
              style={{
                background: `radial-gradient(circle at 75% 45%, ${item.corAcento}44 0%, transparent 60%)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Grid Overlay texture */}
      <div
        className="absolute inset-0 z-[1] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Content Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Pill / Legal Seal */}
            <div className="flex flex-wrap items-center gap-2 mb-4 animate-fadeIn">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-xs font-bold text-emerald-300 shadow-sm shadow-emerald-500/20 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                CONTRAN 996 · SEM CNH · SEM EMPLACAMENTO
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700/80 text-cyan-300">
                {slide.badge}
              </span>
            </div>

            {/* Model Category Sub-label */}
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-2">
              {slide.categoria}
            </p>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-5 text-balance">
              {slide.tituloForte}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl font-light">
              {slide.subtitulo}
            </p>

            {/* Core Spec Bar */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md mb-8 w-full max-w-lg shadow-xl">
              <div>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                  <Gauge className="w-3 h-3 text-emerald-400" /> Velocidade
                </span>
                <span className="text-xs sm:text-sm font-bold font-mono text-white">
                  {slide.velocidade}
                </span>
              </div>
              <div className="border-x border-slate-800 px-2">
                <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                  <Zap className="w-3 h-3 text-cyan-400" /> Potência
                </span>
                <span className="text-xs sm:text-sm font-bold font-mono text-white">
                  {slide.potencia}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-0.5">
                  <Battery className="w-3 h-3 text-emerald-400" /> Autonomia
                </span>
                <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400">
                  {slide.autonomia}
                </span>
              </div>
            </div>

            {/* Price & CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <div>
                <span className="text-[11px] text-slate-400 block">Preço à vista:</span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
                  {slide.preco}
                </div>
                <span className="text-[11px] text-emerald-400 block font-medium">
                  {slide.precoParcelado}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto pt-2 sm:pt-0">
                <a
                  href={linkWhatsSlide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-wider font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  Tenho Interesse
                </a>

                <button
                  onClick={() => onOpenTestRide(slide.nome)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold rounded-xl text-slate-200 bg-slate-900/90 border border-slate-700 hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Test-Ride Livre
                </button>

                <button
                  onClick={() => onSelectMoto(slide.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  Ficha Técnica
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Showroom Spotlight Card */}
          <div className="lg:col-span-5 relative hidden md:block">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-sm group">
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={slide.imagemFoto}
                  alt={slide.nome}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Overlaid specs on image */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 block font-semibold">
                      {slide.nome}
                    </span>
                    <span className="text-[11px] text-slate-300">
                      Disponível para Pronta-Entrega
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/90 text-cyan-300 border border-slate-700 font-mono">
                    {slide.preco}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Bar (Arrows + Indicators) */}
        <div className="flex items-center justify-between pt-10 mt-8 border-t border-slate-850/80">
          {/* Slide Indicator Bullets */}
          <div className="flex items-center gap-2">
            {SLIDES_FOTOGRAFICOS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setSlideAtual(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === slideAtual
                    ? 'w-8 h-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400'
                    : 'w-2.5 h-2.5 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Ir para slide ${idx + 1}: ${item.nome}`}
              />
            ))}
            <span className="text-xs text-slate-500 font-mono ml-2">
              0{slideAtual + 1} / 0{SLIDES_FOTOGRAFICOS.length}
            </span>
          </div>

          {/* Previous / Next Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={irParaAnterior}
              className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={irParaProximo}
              className="w-10 h-10 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
