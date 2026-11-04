import React, { useState } from 'react';
import { MotoEletrica, gerarLinkWhatsapp, CONTATO_CONFIG } from '../data/motos.ts';
import { MotoPhotoView } from './MotoPhotoView.tsx';
import { 
  X, 
  MessageCircle, 
  Zap, 
  Battery, 
  Gauge, 
  Clock, 
  Scale, 
  Cpu, 
  Check, 
  Calculator,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Bike
} from 'lucide-react';

interface ModalDetalhesMotoProps {
  moto: MotoEletrica | null;
  onClose: () => void;
  onOpenTestRide: (modelName: string) => void;
}

export const ModalDetalhesMoto: React.FC<ModalDetalhesMotoProps> = ({
  moto,
  onClose,
  onOpenTestRide
}) => {
  if (!moto) return null;

  // Financing calculation state
  const precoTotal = moto.precoNumero;
  const [percentualEntrada, setPercentualEntrada] = useState<number>(30); // 30% default
  const [meses, setMeses] = useState<number>(18);

  const valorEntrada = (precoTotal * percentualEntrada) / 100;
  const saldoFinanciar = precoTotal - valorEntrada;
  const taxaMensal = 0.0119;
  const parcelaEstimada =
    (saldoFinanciar * (taxaMensal * Math.pow(1 + taxaMensal, meses))) /
    (Math.pow(1 + taxaMensal, meses) - 1);

  const formatarMoeda = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  const linkWhatsappFinanciamento = encodeURIComponent(
    `Olá! Estive vendo a ficha técnica da ${moto.nome} (${moto.precoFormatado}) no site da VoltMoto. Gostaria de parcelar com entrada de ${formatarMoeda(valorEntrada)} + ${meses}x de aproximadamente ${formatarMoeda(parcelaEstimada)}. Como este modelo não exige CNH nem emplacamento, quero saber como fechar o pedido!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Background click handler */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span className="text-emerald-400 font-semibold">{moto.categoria}</span>
              <span>·</span>
              <span className="text-emerald-300 font-medium">100% Livre de CNH e Emplacamento</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{moto.nome}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Visual Artwork Showcase */}
          <div className="relative">
            <MotoPhotoView
              tipo={moto.tipoSilhueta}
              nome={moto.nome}
              corAcento={moto.corPrincipal}
              imagemUrl={moto.imagemUrl}
              className="h-64 sm:h-72 w-full"
            />
          </div>

          {/* Pricing & Commercial Description */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block">Preço à vista (Pronta-Entrega):</span>
              <span className="text-3xl font-extrabold font-mono text-cyan-400">
                {moto.precoFormatado}
              </span>
              <span className="text-xs text-emerald-400 block mt-0.5">Sem taxa de emplacamento · Sem IPVA</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={gerarLinkWhatsapp(moto.nome, moto.precoFormatado)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                Negociar no WhatsApp
              </a>
              <button
                onClick={() => {
                  onClose();
                  onOpenTestRide(moto.nome);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Test-Ride Livre
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {moto.descricaoComercial}
          </p>

          {/* Full Technical Specifications Matrix */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Especificações do Autopropelido (CONTRAN 996)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-emerald-500/20">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400" /> Velocidade Máx.
                </span>
                <span className="text-sm font-bold font-mono text-emerald-400">Até 32 km/h</span>
                <span className="text-[10px] text-slate-500 block">Limite legal seguro</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> Potência Motor
                </span>
                <span className="text-sm font-bold font-mono text-white">{moto.potencia}</span>
                <span className="text-[10px] text-slate-500 block">Motor Brushless</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                  <Battery className="w-3.5 h-3.5 text-cyan-400" /> Autonomia
                </span>
                <span className="text-sm font-bold font-mono text-emerald-400">{moto.autonomia}</span>
                <span className="text-[10px] text-slate-500 block">Por recarga completa</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Tempo de Carga
                </span>
                <span className="text-xs font-bold font-mono text-slate-200">{moto.tempoCarga.split('/')[0]}</span>
                <span className="text-[10px] text-slate-500 block">Tomada 110V/220V</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-emerald-500/20">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Exigência de CNH
                </span>
                <span className="text-xs font-bold font-mono text-emerald-300">NÃO EXIGE CNH</span>
                <span className="text-[10px] text-slate-500 block">Dispensada por lei</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Placa e IPVA</span>
                <span className="text-xs font-bold font-mono text-emerald-300">ISENTO TOTAL</span>
                <span className="text-[10px] text-slate-500 block">Sem taxa de Detran</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">Vias Permitidas</span>
                <span className="text-xs font-bold font-mono text-white">Ciclovias e Ruas</span>
                <span className="text-[10px] text-slate-500 block">Conforme CONTRAN 996</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                  <Scale className="w-3.5 h-3.5 text-cyan-400" /> Peso do Veículo
                </span>
                <span className="text-xs font-bold font-mono text-white">{moto.pesoKg} kg</span>
                <span className="text-[10px] text-slate-500 block">Fácil de manobrar</span>
              </div>
            </div>
          </div>

          {/* Destaques do Modelo */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-bold text-emerald-400 mb-3">
              Itens de Série e Equipamentos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {moto.destaques.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-850 text-xs text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financing Simulator */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/30 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Simulador de Parcelamento em até 18x
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Condições facilitadas no cartão de crédito ou carnê sem consulta burocrática.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Slider de Entrada */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Entrada ({percentualEntrada}%):</span>
                  <span className="font-mono font-bold text-cyan-300">{formatarMoeda(valorEntrada)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={percentualEntrada}
                  onChange={(e) => setPercentualEntrada(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Seletor de Parcelas */}
              <div>
                <span className="block text-xs text-slate-300 mb-1.5">Número de Parcelas:</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[6, 10, 12, 18].map((parcelas) => (
                    <button
                      key={parcelas}
                      onClick={() => setMeses(parcelas)}
                      className={`py-1 text-xs font-semibold rounded-md transition-colors ${
                        meses === parcelas
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                      }`}
                    >
                      {parcelas}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultado da Parcela */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Parcela estimada:</span>
                <span className="text-xl font-extrabold font-mono text-emerald-400">
                  {meses}x de {formatarMoeda(parcelaEstimada)}
                </span>
              </div>
              <a
                href={`https://wa.me/${CONTATO_CONFIG.telefoneWhatsapp}?text=${linkWhatsappFinanciamento}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
              >
                Simular no WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>VoltMoto Autopropelidos · Resolução CONTRAN 996/2023 · Garantia Nacional</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
