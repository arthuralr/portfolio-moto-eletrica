import React, { useState, useEffect } from 'react';
import { 
  MotoEletrica, 
  obterCatalogoMotos, 
  salvarCatalogoMotos, 
  resetarCatalogoMotos,
  formatarPrecoBRL 
} from '../data/motos.ts';
import { FOTOS_PADRAO_AUTOPROPELIDOS } from './MotoPhotoView.tsx';
import { 
  X, 
  PlusCircle, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon, 
  Battery, 
  Gauge, 
  Clock, 
  DollarSign, 
  Tag, 
  Eye, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ModalPainelLojistaProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToMoto?: (id: string) => void;
}

export const ModalPainelLojista: React.FC<ModalPainelLojistaProps> = ({
  isOpen,
  onClose,
  onNavigateToMoto
}) => {
  if (!isOpen) return null;

  const [motos, setMotos] = useState<MotoEletrica[]>([]);
  const [notificacao, setNotificacao] = useState<{ tipo: 'sucesso' | 'erro'; mensagem: string } | null>(null);

  // Form states with useState as requested
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [autonomia, setAutonomia] = useState('');
  const [velocidadeMaxima, setVelocidadeMaxima] = useState('32 km/h (Limite Legal)');
  const [tempoCarga, setTempoCarga] = useState('4 a 5 horas (Tomada 110V/220V)');
  const [imagemUrl, setImagemUrl] = useState('');
  const [categoria, setCategoria] = useState<MotoEletrica['categoria']>('Chopper Autopropelida');
  const [potencia, setPotencia] = useState('1000W Brushless');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    setMotos(obterCatalogoMotos());
  }, [isOpen]);

  const exibirAlerta = (mensagem: string, tipo: 'sucesso' | 'erro' = 'sucesso') => {
    setNotificacao({ mensagem, tipo });
    setTimeout(() => setNotificacao(null), 3500);
  };

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      exibirAlerta('Informe o nome do modelo.', 'erro');
      return;
    }

    const numeroLimpo = Number(preco.replace(/[^0-9.]/g, '')) || 9900;
    const precoFormatado = numeroLimpo > 0 ? formatarPrecoBRL(numeroLimpo) : preco;

    const baseSlug = nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const idUnico = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    const autonomiaNum = parseInt(autonomia.replace(/\D/g, '')) || 50;

    const novaMoto: MotoEletrica = {
      id: idUnico,
      nome: nome.trim(),
      categoria,
      precoFormatado: precoFormatado.startsWith('R$') ? precoFormatado : `R$ ${precoFormatado}`,
      precoNumero: numeroLimpo,
      autonomia: autonomia.includes('km') ? autonomia : `${autonomia} km por carga`,
      autonomiaKm: autonomiaNum,
      velocidadeMaxima: velocidadeMaxima.includes('km/h') ? velocidadeMaxima : `${velocidadeMaxima} km/h`,
      tempoCarga: tempoCarga || '4 a 5 horas (Tomada 110V/220V)',
      potencia: potencia || '1000W Brushless',
      torque: '60 Nm instantâneo',
      capacidadeBateria: '60V 20Ah Lítio Removível',
      pesoKg: 52,
      descricaoComercial:
        descricao.trim() ||
        `Modelo autopropelido ${nome} de 1000W com autonomia de até ${autonomiaNum} km. Totalmente liberado de CNH, emplacamento e IPVA pela Resolução CONTRAN 996.`,
      destaques: [
        'NÃO EXIGE CNH (Sem Autoescola)',
        'NÃO EXIGE EMPLACAMENTO (Zero IPVA)',
        'Bateria de Lítio Removível para Tomada Comum',
        'Velocidade Segura Travada em até 32 km/h'
      ],
      corPrincipal: '#10b981',
      tipoSilhueta: categoria === 'Chopper Autopropelida' ? 'cruiser' : categoria === 'Scooter Urbana Jet' ? 'scooter' : 'naked',
      imagemUrl: imagemUrl.trim() || undefined,
      exigeCnh: false,
      exigeEmplacamento: false,
      regulamentacao: 'Resolução CONTRAN 996/2023 - Equipamento Autopropelido'
    };

    const listaAtualizada = [novaMoto, ...motos];
    setMotos(listaAtualizada);
    salvarCatalogoMotos(listaAtualizada);

    // Reset fields
    setNome('');
    setPreco('');
    setAutonomia('');
    setImagemUrl('');
    setDescricao('');

    exibirAlerta(`Moto "${novaMoto.nome}" cadastrada com sucesso!`);
  };

  const handleExcluir = (id: string, nomeMoto: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o modelo "${nomeMoto}" do catálogo?`)) {
      const listaAtualizada = motos.filter((m) => m.id !== id);
      setMotos(listaAtualizada);
      salvarCatalogoMotos(listaAtualizada);
      exibirAlerta(`Modelo "${nomeMoto}" excluído com sucesso.`);
    }
  };

  const handleRestaurar = () => {
    if (window.confirm('Deseja restaurar os modelos originais de fábrica da VoltMoto?')) {
      const padrao = resetarCatalogoMotos();
      setMotos(padrao);
      exibirAlerta('Catálogo original restaurado!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Painel Lojista VoltMoto
                <span className="text-[10px] font-mono uppercase bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded">
                  Autopropelidos
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Cadastro e exclusão instantânea de motos no showroom
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRestaurar}
              title="Restaurar catálogo inicial"
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Padrão</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Notification */}
          {notificacao && (
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-semibold ${
                notificacao.tipo === 'sucesso'
                  ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/90 border-rose-500/40 text-rose-200'
              }`}
            >
              {notificacao.tipo === 'sucesso' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{notificacao.mensagem}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Column (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm uppercase tracking-wider font-bold text-emerald-400 mb-4 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4" />
                Cadastrar Nova Moto
              </h3>

              <form onSubmit={handleCadastrar} className="space-y-3.5">
                {/* Nome */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nome da Moto: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Volt Chopper Blackout 1000W"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Preço & Autonomia */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Preço (R$): *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 11900 ou R$ 11.900"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Autonomia: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 55 km"
                      value={autonomia}
                      onChange={(e) => setAutonomia(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Velocidade & Tempo de Carga */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Velocidade Máx:
                    </label>
                    <input
                      type="text"
                      value={velocidadeMaxima}
                      onChange={(e) => setVelocidadeMaxima(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Tempo de Carga:
                    </label>
                    <input
                      type="text"
                      value={tempoCarga}
                      onChange={(e) => setTempoCarga(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Link da Imagem Real */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Link da Imagem Real (URL):
                  </label>
                  <input
                    type="url"
                    placeholder="https://exemplo.com/foto-moto.jpg"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  {/* Quick photo presets for lojista testing */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] text-slate-400">Presets de Fotos:</span>
                    <button
                      type="button"
                      onClick={() => setImagemUrl(FOTOS_PADRAO_AUTOPROPELIDOS['default-chopper'])}
                      className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-emerald-300 hover:bg-slate-700"
                    >
                      Foto Chopper
                    </button>
                    <button
                      type="button"
                      onClick={() => setImagemUrl(FOTOS_PADRAO_AUTOPROPELIDOS['default-scooter'])}
                      className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-cyan-300 hover:bg-slate-700"
                    >
                      Foto Scooter
                    </button>
                    <button
                      type="button"
                      onClick={() => setImagemUrl(FOTOS_PADRAO_AUTOPROPELIDOS['default-fatbike'])}
                      className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-teal-300 hover:bg-slate-700"
                    >
                      Foto MotoChefe
                    </button>
                  </div>
                </div>

                {/* Live Preview if URL provided */}
                {imagemUrl && (
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <img
                      src={imagemUrl}
                      alt="Prévia"
                      className="w-14 h-12 object-cover rounded"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <div className="text-[11px] text-slate-400 truncate">
                      <span className="text-emerald-400 block font-semibold">Pré-visualização ativa</span>
                      <span className="truncate">{imagemUrl}</span>
                    </div>
                  </div>
                )}

                {/* Categoria */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Categoria Autopropelida:
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as MotoEletrica['categoria'])}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Chopper Autopropelida">Chopper Autopropelida (Estilo Harley Fat)</option>
                    <option value="Scooter Urbana Jet">Scooter Urbana Jet</option>
                    <option value="Fat Bike MotoChefe">Fat Bike MotoChefe</option>
                    <option value="Retro Vintage Elétrica">Retro Vintage Elétrica</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  Cadastrar no Showroom
                </button>
              </form>
            </div>

            {/* List / Table Column (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <h3 className="text-sm uppercase tracking-wider font-bold text-white flex items-center gap-2">
                    Modelos Cadastrados
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400">
                      {motos.length}
                    </span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Clique no lixo para excluir
                  </span>
                </div>

                <div className="divide-y divide-slate-850 overflow-y-auto max-h-[380px] pr-1">
                  {motos.map((m) => (
                    <div
                      key={m.id}
                      className="py-3 flex items-center justify-between gap-3 hover:bg-slate-900/50 px-2 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                          <img
                            src={m.imagemUrl || FOTOS_PADRAO_AUTOPROPELIDOS['default-chopper']}
                            alt={m.nome}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold text-white block truncate group-hover:text-emerald-300 transition-colors">
                            {m.nome}
                          </span>
                          <span className="text-[11px] font-mono text-cyan-400">
                            {m.precoFormatado} · {m.autonomiaKm} km
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {onNavigateToMoto && (
                          <button
                            onClick={() => {
                              onClose();
                              onNavigateToMoto(m.id);
                            }}
                            title="Ver detalhes no site"
                            className="p-1.5 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-850"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleExcluir(m.id, m.nome)}
                          title="Excluir do catálogo"
                          className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Modificações são salvas em tempo real</span>
                <span className="text-emerald-400 font-medium">CONTRAN 996</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Showroom VoltMoto · Painel Administrativo de Loja</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            Concluir e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
