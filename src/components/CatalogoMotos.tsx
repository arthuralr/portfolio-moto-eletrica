import React, { useState, useEffect } from 'react';
import { obterCatalogoMotos, MotoEletrica, gerarLinkWhatsapp } from '../data/motos.ts';
import { MotoPhotoView } from './MotoPhotoView.tsx';
import { 
  MessageCircle, 
  Battery, 
  Gauge, 
  Zap, 
  Info, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Bike,
  Lock
} from 'lucide-react';

interface CatalogoProps {
  onSelectMoto: (id: string) => void;
  onOpenTestRideWithModel?: (modelName: string) => void;
}

export const CatalogoMotos: React.FC<CatalogoProps> = ({
  onSelectMoto,
  onOpenTestRideWithModel
}) => {
  const [motos, setMotos] = useState<MotoEletrica[]>(() => obterCatalogoMotos());
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todas');

  useEffect(() => {
    const atualizar = () => {
      setMotos(obterCatalogoMotos());
    };
    window.addEventListener('voltmoto_catalogo_updated', atualizar);
    window.addEventListener('storage', atualizar);
    return () => {
      window.removeEventListener('voltmoto_catalogo_updated', atualizar);
      window.removeEventListener('storage', atualizar);
    };
  }, []);

  const categorias = [
    'Todas',
    'Chopper Autopropelida',
    'Scooter Urbana Jet',
    'Fat Bike MotoChefe',
    'Retro Vintage Elétrica'
  ];

  const motosFiltradas =
    categoriaAtiva === 'Todas'
      ? motos
      : motos.filter((moto) => moto.categoria.includes(categoriaAtiva));

  return (
    <section id="catalogo" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/70 border border-emerald-500/40 text-xs font-bold text-emerald-300 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conforme Resolução CONTRAN 996/2023</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Galeria de Motos Autopropelidas
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Modelos de alta performance de 1000W travados estritamente em até 32 km/h. Pronta-entrega no showroom, sem CNH, sem placa e sem IPVA.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl self-start md:self-auto backdrop-blur-sm">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  categoriaAtiva === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Motorcycle Grid with Real Photographs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {motosFiltradas.map((moto: MotoEletrica) => {
            const linkWhatsapp = gerarLinkWhatsapp(moto.nome, moto.precoFormatado);

            return (
              <div
                key={moto.id}
                className="group relative flex flex-col bg-slate-900/70 hover:bg-slate-900/95 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl shadow-black/50 hover:-translate-y-1"
              >
                {/* Legal Strip on top of card */}
                <div className="bg-emerald-950/80 border-b border-emerald-900/40 px-3.5 py-2 flex items-center justify-between text-[11px] font-bold text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    SEM CNH
                  </span>
                  <span className="text-emerald-400/90 font-mono">SEM PLACA · 0 IPVA</span>
                </div>

                {/* Sub-header info */}
                <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-400 truncate">
                    {moto.categoria}
                  </span>
                  {moto.seloDestaque && (
                    <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1 shrink-0 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {moto.seloDestaque}
                    </span>
                  )}
                </div>

                {/* Realistic Photographic Display */}
                <div className="px-4 py-2 cursor-pointer" onClick={() => onSelectMoto(moto.id)}>
                  <MotoPhotoView
                    nome={moto.nome}
                    tipo={moto.tipoSilhueta}
                    corAcento={moto.corPrincipal}
                    imagemUrl={moto.imagemUrl}
                    className="h-52 w-full"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 pt-2 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Name & Pricing */}
                    <div className="mb-2">
                      <h3
                        onClick={() => onSelectMoto(moto.id)}
                        className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors cursor-pointer leading-snug mb-1"
                      >
                        {moto.nome}
                      </h3>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xl font-extrabold font-mono text-cyan-400">
                          {moto.precoFormatado}
                        </span>
                        <span className="text-[11px] text-slate-400">Em até 18x no cartão</span>
                      </div>
                    </div>

                    {/* Commercial Description */}
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                      {moto.descricaoComercial}
                    </p>

                    {/* Core Metric Strip */}
                    <div className="grid grid-cols-3 gap-1 py-2 px-2.5 bg-slate-950/80 border border-slate-800/80 rounded-xl mb-3 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                          <Gauge className="w-3 h-3 text-emerald-400" />
                          <span>Velocidade</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-white">
                          Até 32 km/h
                        </span>
                      </div>

                      <div className="border-x border-slate-800">
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                          <Zap className="w-3 h-3 text-cyan-400" />
                          <span>Motor</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-white">
                          1000W
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 mb-0.5">
                          <Battery className="w-3 h-3 text-emerald-400" />
                          <span>Autonomia</span>
                        </div>
                        <span className="text-xs font-bold font-mono text-emerald-400">
                          {moto.autonomiaKm} km
                        </span>
                      </div>
                    </div>

                    {/* Key legal compliance bullet points */}
                    <div className="space-y-1 mb-4 text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Pilotagem livre sem CNH (CONTRAN 996)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Bateria de Lítio portátil removível</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Button Tenho Interesse (WhatsApp) + Ver Ficha */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
                    <a
                      href={linkWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-md shadow-emerald-500/20 active:scale-95 whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 fill-slate-950" />
                      Tenho Interesse (WhatsApp)
                    </a>

                    <button
                      onClick={() => onSelectMoto(moto.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl text-slate-300 bg-slate-850 hover:bg-slate-800 hover:text-white border border-slate-700/60 transition-colors whitespace-nowrap"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      Ver Ficha Técnica Completa
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Catalog Sub-Footer Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Garantia e Assistência Técnica Showroom Jardins
            </span>
            <h3 className="text-xl font-bold text-white mb-1">
              Pronta-entrega com entrega técnica e suporte vitalício
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Todas as motos saem com declaração de conformidade técnica CONTRAN 996, carregador inteligente bivolt e garantia de fábrica para o motor e bateria de lítio.
            </p>
          </div>
          <button
            onClick={() => onOpenTestRideWithModel ? onOpenTestRideWithModel('Pronta-Entrega Showroom') : undefined}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-400/20 whitespace-nowrap shrink-0"
          >
            Reservar no Showroom
          </button>
        </div>
      </div>
    </section>
  );
};
