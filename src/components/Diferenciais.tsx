import React, { useState } from 'react';
import { DIFERENCIAIS } from '../data/motos.ts';
import { 
  Zap, 
  Coins, 
  Wrench, 
  BatteryCharging, 
  VolumeX, 
  CheckCircle2, 
  XCircle,
  ShieldCheck,
  Bike
} from 'lucide-react';

export const Diferenciais: React.FC = () => {
  const [diferencialSelecionado, setDiferencialSelecionado] = useState<number>(0);

  const icones = [
    ShieldCheck,
    Coins,
    Bike,
    Zap,
    BatteryCharging,
    VolumeX
  ];

  const comparativoTecnico = [
    {
      criterio: 'Exigência de CNH / Habilitação',
      combustao: 'Obrigatória CNH categoria A (Autoescola de R$ 2.500 a R$ 3.500)',
      voltmoto: 'TOTALMENTE DISPENSADA (Resolução CONTRAN 996)',
      vantagem: 'Qualquer pessoa pode pilotar'
    },
    {
      criterio: 'Emplacamento e Taxas de Trânsito',
      combustao: 'Emplacamento inicial + taxa de vistoria + despachante (~R$ 1.200)',
      voltmoto: 'ZERO EMPLACAMENTO (Não precisa de placa nem registro)',
      vantagem: 'R$ 0 em taxas de Detran'
    },
    {
      criterio: 'IPVA e Licenciamento Anual',
      combustao: 'Obrigatório pagar IPVA + taxa de licenciamento todo ano',
      voltmoto: '100% ISENTA DE IPVA E LICENCIAMENTO',
      vantagem: 'Zero imposto anual'
    },
    {
      criterio: 'Acesso a Ciclovias e Ciclofaixas',
      combustao: 'Estritamente proibida (multa gravíssima e apreensão)',
      voltmoto: 'PERMITIDA em ciclovias e vias urbanas (até 32 km/h)',
      vantagem: 'Fuja de 100% dos engarrafamentos'
    },
    {
      criterio: 'Custo de Abastecimento para 50 km',
      combustao: 'R$ 10,00 a R$ 15,00 (gasolina a R$ 6,20/L)',
      voltmoto: 'Apenas R$ 0,70 a R$ 0,90 (energia elétrica na tomada)',
      vantagem: 'Economia superior a 90%'
    },
    {
      criterio: 'Como e Onde Abastecer',
      combustao: 'Obrigatório parar em postos de combustível com filas',
      voltmoto: 'Bateria removível portátil recarregável na tomada comum',
      vantagem: 'Recarregue na sala ou escritório'
    }
  ];

  return (
    <section id="diferenciais" className="py-24 bg-slate-900/60 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            Por que as Autopropelidas São a Maior Tendência no Brasil?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Vantagens do Autopropelido VoltMoto
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A união perfeita entre o estilo de uma moto imponente e a facilidade jurídica de uma bicicleta elétrica: sem taxas, sem burocracia e com economia astronômica.
          </p>
        </div>

        {/* Interactive Differentials Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {DIFERENCIAIS.map((item, index) => {
            const Icon = icones[index] || Zap;
            const isSelected = diferencialSelecionado === index;

            return (
              <div
                key={index}
                onClick={() => setDiferencialSelecionado(index)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/60 shadow-xl shadow-emerald-950/30 -translate-y-1'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-0.5 rounded">
                    {item.metrica}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{item.titulo}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.descricao}
                </p>
              </div>
            );
          })}
        </div>

        {/* Head-to-Head Comparison Table: Moto Combustão vs Autopropelida VoltMoto */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 border-b border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 block mb-1">
                Comparativo Jurídico e Financeiro Direto
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Moto Tradicional a Combustão vs. Autopropelida VoltMoto
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-rose-400">
                <XCircle className="w-4 h-4" /> Moto Tradicional
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Autopropelida 1000W
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase tracking-wider font-semibold text-slate-400 bg-slate-900/70">
                  <th className="py-4 px-6">Aspecto Avaliado</th>
                  <th className="py-4 px-6 text-rose-300/90">Moto a Combustão</th>
                  <th className="py-4 px-6 text-emerald-300 font-bold">VoltMoto Autopropelida</th>
                  <th className="py-4 px-6 text-cyan-400 text-right">Vantagem VoltMoto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                {comparativoTecnico.map((linha, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-white whitespace-nowrap">
                      {linha.criterio}
                    </td>
                    <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                      {linha.combustao}
                    </td>
                    <td className="py-4 px-6 text-emerald-300 font-semibold font-mono text-xs">
                      {linha.voltmoto}
                    </td>
                    <td className="py-4 px-6 text-cyan-400 font-semibold text-right">
                      {linha.vantagem}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
