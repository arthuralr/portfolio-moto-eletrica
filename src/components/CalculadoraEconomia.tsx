import React, { useState, useId } from 'react';
import { Zap, Fuel, TrendingUp, Leaf, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CONTATO_CONFIG } from '../data/motos.ts';

export const CalculadoraEconomia: React.FC = () => {
  const kmId = useId();
  const precoGasId = useId();
  const consumoGasId = useId();
  const tarifaId = useId();

  // User input states with realistic Brazilian averages
  const [kmMensal, setKmMensal] = useState<number>(800);
  const [precoGasolina, setPrecoGasolina] = useState<number>(6.20);
  const [consumoGasolina, setConsumoGasolina] = useState<number>(30); // km por litro
  const [tarifaKwh, setTarifaKwh] = useState<number>(0.85); // R$ por kWh

  // Calculations for 1000W Autopropelido:
  // 1000W motor consumes approx 0.022 kWh per km (~1.1 kWh to travel 50 km, less than R$ 1 per charge)
  const consumoKwhPorKm = 0.022;
  const litrosGasolinaMes = kmMensal / consumoGasolina;
  const custoGasolinaMes = litrosGasolinaMes * precoGasolina;

  const kwhMes = kmMensal * consumoKwhPorKm;
  const custoEletricoMes = kwhMes * tarifaKwh;

  const economiaMes = Math.max(0, custoGasolinaMes - custoEletricoMes);
  const economiaAno = economiaMes * 12;
  const economia3Anos = economiaAno * 3;
  const percentualEconomia = custoGasolinaMes > 0 
    ? Math.round(((custoGasolinaMes - custoEletricoMes) / custoGasolinaMes) * 100) 
    : 0;

  // CO2 avoidance: approx 2.31 kg CO2 per liter of gasoline
  const co2EvitadoAnoKg = Math.round(litrosGasolinaMes * 12 * 2.31);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(valor);
  };

  const handleConsultarEconomiaWhatsApp = () => {
    const msg = encodeURIComponent(
      `Olá! Fiz a simulação na Calculadora VoltMoto rodando ${kmMensal} km/mês. Minha economia estimada é de ${formatarMoeda(economiaAno)} por ano sem gastar nada com CNH, IPVA ou gasolina! Gostaria de escolher meu modelo autopropelido 1000W.`
    );
    window.open(`https://wa.me/${CONTATO_CONFIG.telefoneWhatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="calculadora" className="relative py-24 bg-slate-950 border-t border-slate-850">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-900/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
            Eficiência Financeira Absoluta
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Simulador: Moto a Gasolina vs. Autopropelida
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Enquanto uma moto a gasolina queima litros caros e exige taxas pesadas, a moto autopropelida roda com recargas de centavos na tomada da sua casa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (Left Column) */}
          <div className="lg:col-span-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Sua Rotina de Deslocamento
            </h3>

            {/* Slider 1: Quilometragem mensal */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={kmId} className="text-sm font-medium text-slate-300">
                  Quilômetros rodados por mês:
                </label>
                <span className="text-base font-bold font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded">
                  {kmMensal.toLocaleString('pt-BR')} km
                </span>
              </div>
              <input
                id={kmId}
                type="range"
                min="150"
                max="2500"
                step="50"
                value={kmMensal}
                onChange={(e) => setKmMensal(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>150 km (Passeios)</span>
                <span>800 km (Ida e volta do trabalho)</span>
                <span>2.500 km (Uso intenso)</span>
              </div>
            </div>

            {/* Slider 2: Preço da Gasolina */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={precoGasId} className="text-sm font-medium text-slate-300">
                  Preço do litro da gasolina:
                </label>
                <span className="text-base font-bold font-mono text-white bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                  R$ {precoGasolina.toFixed(2)}
                </span>
              </div>
              <input
                id={precoGasId}
                type="range"
                min="4.80"
                max="8.20"
                step="0.10"
                value={precoGasolina}
                onChange={(e) => setPrecoGasolina(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>R$ 4,80</span>
                <span>R$ 6,50</span>
                <span>R$ 8,20</span>
              </div>
            </div>

            {/* Two-column sub-sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
              {/* Consumo Gasolina */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor={consumoGasId} className="text-xs font-medium text-slate-400">
                    Consumo da moto a combustão:
                  </label>
                  <span className="text-xs font-bold font-mono text-slate-200">
                    {consumoGasolina} km/L
                  </span>
                </div>
                <input
                  id={consumoGasId}
                  type="range"
                  min="20"
                  max="45"
                  step="1"
                  value={consumoGasolina}
                  onChange={(e) => setConsumoGasolina(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Tarifa Elétrica */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor={tarifaId} className="text-xs font-medium text-slate-400">
                    Tarifa de energia (kWh):
                  </label>
                  <span className="text-xs font-bold font-mono text-slate-200">
                    R$ {tarifaKwh.toFixed(2)}
                  </span>
                </div>
                <input
                  id={tarifaId}
                  type="range"
                  min="0.55"
                  max="1.30"
                  step="0.05"
                  value={tarifaKwh}
                  onChange={(e) => setTarifaKwh(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            {/* Regulatory Extra Savings */}
            <div className="mt-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Economia oculta que você NÃO gasta:</span>
              </div>
              <ul className="space-y-1 text-slate-400 pl-6 list-disc">
                <li><strong className="text-white">R$ 2.500+</strong> economizados em processo de autoescola e CNH</li>
                <li><strong className="text-white">R$ 1.200</strong> economizados em primeiro emplacamento e despachante</li>
                <li><strong className="text-white">R$ 500 a R$ 900/ano</strong> economizados em IPVA e licenciamento</li>
              </ul>
            </div>
          </div>

          {/* Results Display (Right Column) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-emerald-950/20">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Economia Somente em Combustível
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {percentualEconomia}% menor custo
                </span>
              </div>

              <div className="mb-6">
                <div className="text-sm text-slate-400 mb-1">Você economiza anualmente cerca de:</div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  {formatarMoeda(economiaAno)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Ou seja, <span className="text-emerald-400 font-semibold">{formatarMoeda(economiaMes)}</span> por mês que continuam no seu bolso.
                </div>
              </div>

              {/* 3-Year Projection */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Economia em 3 anos rodando de autopropelida:</span>
                  <span className="text-xl font-bold font-mono text-cyan-300">
                    {formatarMoeda(economia3Anos)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Essa economia é superior ao valor total de compra da sua própria moto autopropelida nova!
                </p>
              </div>

              {/* Side by Side Cost Breakdown */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                {/* Gasolina */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <Fuel className="w-3.5 h-3.5" /> Gasto mensal Gasolina:
                    </span>
                    <span className="font-mono text-rose-300 font-bold">{formatarMoeda(custoGasolinaMes)}/mês</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-rose-500 h-2 rounded-full w-full" />
                  </div>
                </div>

                {/* Elétrica Autopropelida */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Zap className="w-3.5 h-3.5" /> Gasto mensal VoltMoto 1000W:
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{formatarMoeda(custoEletricoMes)}/mês</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.max(4, Math.min(100, (custoEletricoMes / (custoGasolinaMes || 1)) * 100))}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Metric Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Impacto Sustentável</div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono">
                    {co2EvitadoAnoKg.toLocaleString('pt-BR')} kg de CO₂ evitados por ano
                  </div>
                </div>
              </div>
              <button
                onClick={handleConsultarEconomiaWhatsApp}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors font-bold"
              >
                Tirar Dúvidas no WhatsApp
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
