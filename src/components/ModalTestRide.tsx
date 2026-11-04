import React, { useState } from 'react';
import { MOTOS_ELETRICAS, CONTATO_CONFIG } from '../data/motos.ts';
import { X, Calendar, CheckCircle2, MessageCircle, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

interface ModalTestRideProps {
  isOpen: boolean;
  onClose: () => void;
  modeloPreSelecionado?: string;
}

export const ModalTestRide: React.FC<ModalTestRideProps> = ({
  isOpen,
  onClose,
  modeloPreSelecionado
}) => {
  if (!isOpen) return null;

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [modelo, setModelo] = useState(
    modeloPreSelecionado || MOTOS_ELETRICAS[0].nome
  );
  const [dataPreferida, setDataPreferida] = useState('');
  const [horario, setHorario] = useState('14:00');
  const [maiorIdade, setMaiorIdade] = useState(true);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSucesso(true);
  };

  const handleIrParaWhatsapp = () => {
    const msg = encodeURIComponent(
      `Olá! Meu nome é ${nome}. Gostaria de confirmar meu agendamento de Test-Ride na VoltMoto para o modelo autopropelido ${modelo}${dataPreferida ? ` no dia ${dataPreferida} às ${horario}` : ''}. Sei que não precisa de CNH e gostaria de conhecer as cores disponíveis!`
    );
    window.open(`https://wa.me/${CONTATO_CONFIG.telefoneWhatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!sucesso ? (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4" />
                100% Livre de CNH · Test-Ride Liberado
              </span>
              <h2 className="text-2xl font-bold text-white">Agende seu Test-Ride</h2>
              <p className="text-xs text-slate-400 mt-1">
                Experimente a facilidade de pilotagem das motos autopropelidas de 1000W em nossa pista privativa nos Jardins (SP).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Seu Nome Completo:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Eduardo Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  WhatsApp com DDD:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 98765-4321"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Modelo de Interesse */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Modelo Autopropelido de Interesse:
                </label>
                <select
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {MOTOS_ELETRICAS.map((m) => (
                    <option key={m.id} value={m.nome}>
                      {m.nome} — {m.categoria} ({m.precoFormatado})
                    </option>
                  ))}
                  <option value="Ainda estou escolhendo">Ainda estou indeciso (quero auxílio do consultor)</option>
                </select>
              </div>

              {/* Data e Horário */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Data Pretendida:
                  </label>
                  <input
                    type="date"
                    value={dataPreferida}
                    onChange={(e) => setDataPreferida(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Horário:
                  </label>
                  <select
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="10:00">10:00 Manhã</option>
                    <option value="11:30">11:30 Manhã</option>
                    <option value="14:00">14:00 Tarde</option>
                    <option value="15:30">15:30 Tarde</option>
                    <option value="17:00">17:00 Tarde</option>
                    <option value="18:30">18:30 Noite</option>
                  </select>
                </div>
              </div>

              {/* Age / ID Confirmation (No CNH required) */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-xs text-slate-300">
                <span className="text-emerald-400 font-bold block mb-1">
                  Não é necessário possuir CNH!
                </span>
                <span>
                  O test-ride é livre para maiores de 18 anos portando apenas documento de identificação pessoal (RG ou CPF). Fornecemos capacete esterilizado no local.
                </span>
              </div>

              <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maiorIdade}
                  onChange={(e) => setMaiorIdade(e.target.checked)}
                  className="mt-0.5 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>
                  Declaro ter 18 anos ou mais para realizar o test-ride em nossa pista no Showroom Jardins.
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-4 py-3 text-xs uppercase tracking-wider font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-md shadow-emerald-500/20"
              >
                Reservar Horário de Test-Ride
              </button>
            </form>
          </div>
        ) : (
          /* Success confirmation screen */
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Reserva de Test-Ride Solicitada!</h3>
            <p className="text-sm text-slate-300 mb-6">
              Obrigado, <strong className="text-white">{nome}</strong>! Nossa equipe reservou seu interesse no modelo <strong className="text-emerald-400">{modelo}</strong>. Lembrando: você não precisa de CNH para pilotar!
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-400 mb-6 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Showroom VoltMoto Jardins</span>
              </div>
              <p>{CONTATO_CONFIG.endereco}</p>
              <p className="text-slate-500 text-[11px]">
                * Traga apenas seu documento com foto. A moto já estará carregada e regulada para você.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleIrParaWhatsapp}
                className="w-full py-3 text-xs font-bold rounded-xl text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                Confirmar Horário no WhatsApp
              </button>
              <button
                onClick={() => {
                  setSucesso(false);
                  onClose();
                }}
                className="py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
