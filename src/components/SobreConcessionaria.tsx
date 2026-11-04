import React from 'react';
import { MapPin, Clock, Award, ShieldCheck, Zap, Headphones, Check, Bike } from 'lucide-react';
import { CONTATO_CONFIG } from '../data/motos.ts';

interface SobreProps {
  onOpenTestRide: () => void;
}

export const SobreConcessionaria: React.FC<SobreProps> = ({ onOpenTestRide }) => {
  const pilares = [
    {
      icone: Award,
      titulo: 'Showroom Especializado',
      descricao: 'Ambiente moderno nos Jardins com modelos autopropelidos 1000W à pronta-entrega e pista privativa para test-ride livre de CNH.'
    },
    {
      icone: ShieldCheck,
      titulo: 'Oficina e Peças Originais',
      descricao: 'Estoque imediato de baterias de lítio portáteis, pneus fat tire, módulos controladores e peças de reposição com garantia.'
    },
    {
      icone: Bike,
      titulo: 'Homologação CONTRAN 996',
      descricao: 'Todos os modelos saem com declaração de conformidade técnica para tráfego legal em ciclovias e vias urbanas.'
    },
    {
      icone: Headphones,
      titulo: 'Atendimento Sem Burocracia',
      descricao: 'Sem taxa de despachante, sem filas em cartório e sem espera: você escolhe a cor, parcela em até 18x e leva sua moto no mesmo dia.'
    }
  ];

  return (
    <section id="sobre" className="py-24 bg-slate-950 border-t border-slate-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
              A Concessionária
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6">
              A maior revenda especializada em motos elétricas autopropelidas do Brasil
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-light">
              A <strong className="text-white font-semibold">VoltMoto</strong> é pioneira no mercado nacional de veículos autopropelidos de duas rodas, democratizando a mobilidade com zero burocracia de trânsito.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              Localizada no coração dos Jardins em São Paulo, oferecemos modelos inspirados no estilo Chopper, Jet e MotoChefe com velocidade travada em até 32 km/h e motor de 1000W — ideais para escapar do trânsito sem gastar com autoescola, IPVA ou gasolina.
            </p>

            {/* Bullet List */}
            <div className="space-y-3 mb-8">
              {[
                '100% Dispensada de CNH e ACC pela Resolução CONTRAN 996',
                'Sem necessidade de emplacamento, sem taxa de licenciamento e sem IPVA',
                'Baterias de lítio portáteis recarregáveis em qualquer tomada comum 110V/220V',
                'Parcelamento facilitado em até 18x no cartão com pronta-entrega'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenTestRide}
              className="px-6 py-3.5 text-xs uppercase tracking-wider font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-md shadow-emerald-500/20"
            >
              Agendar Test-Ride Livre
            </button>
          </div>

          {/* Right Column: 4 Pillars Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pilares.map((pilar, idx) => {
              const Icon = pilar.icone;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pilar.titulo}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pilar.descricao}
                  </p>
                </div>
              );
            })}

            {/* Address & Hours highlight card spanning 2 columns */}
            <div className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">Visite nosso Showroom</span>
                    <span className="text-xs text-slate-400">{CONTATO_CONFIG.endereco}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
                  <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">Horário de Funcionamento</span>
                    <span className="text-xs text-slate-400">{CONTATO_CONFIG.horario}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
