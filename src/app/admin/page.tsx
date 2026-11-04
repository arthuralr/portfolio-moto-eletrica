'use client';

import React, { useState, useEffect } from 'react';
import { 
  MotoEletrica, 
  obterCatalogoMotos, 
  salvarCatalogoMotos, 
  resetarCatalogoMotos,
  formatarPrecoBRL 
} from '../../data/motos.ts';
import { FOTOS_PADRAO_AUTOPROPELIDOS } from '../../components/MotoPhotoView.tsx';
import { 
  Zap, 
  PlusCircle, 
  Trash2, 
  ArrowLeft, 
  Eye, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Image as ImageIcon,
  Battery,
  Gauge,
  Clock,
  DollarSign,
  Tag,
  Search,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface AdminPageProps {
  onNavigateHome?: () => void;
  onNavigateToMoto?: (id: string) => void;
}

export default function AdminPage({ onNavigateHome, onNavigateToMoto }: AdminPageProps) {
  // Catalog state
  const [motos, setMotos] = useState<MotoEletrica[]>([]);
  const [busca, setBusca] = useState('');
  const [notificacao, setNotificacao] = useState<{ tipo: 'sucesso' | 'erro' | 'info'; mensagem: string } | null>(null);

  // Form states with useState as requested
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [autonomia, setAutonomia] = useState('50 km');
  const [velocidadeMaxima, setVelocidadeMaxima] = useState('32 km/h (Limite CONTRAN 996)');
  const [tempoCarga, setTempoCarga] = useState('4 a 5 horas (Tomada 110V/220V)');
  const [imagemUrl, setImagemUrl] = useState('');

  // Additional fields for complete model specs
  const [categoria, setCategoria] = useState<MotoEletrica['categoria']>('Chopper Autopropelida');
  const [potencia, setPotencia] = useState('1000W Brushless');
  const [descricao, setDescricao] = useState('');
  const [tipoSilhueta, setTipoSilhueta] = useState<MotoEletrica['tipoSilhueta']>('cruiser');

  // Load initial catalog on mount
  useEffect(() => {
    setMotos(obterCatalogoMotos());
  }, []);

  const exibirAlerta = (mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'sucesso') => {
    setNotificacao({ mensagem, tipo });
    setTimeout(() => setNotificacao(null), 4000);
  };

  const handleCadastrarMoto = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      exibirAlerta('Por favor, informe o nome do modelo.', 'erro');
      return;
    }

    // Sanitize price
    const numeroLimpo = Number(preco.replace(/[^0-9.]/g, '')) || 9990;
    const precoFormatado = numeroLimpo > 0 ? formatarPrecoBRL(numeroLimpo) : preco;

    // Generate slug ID
    const baseSlug = nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const idUnico = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    // Parse autonomy number
    const autonomiaNum = parseInt(autonomia.replace(/\D/g, '')) || 50;

    const fotoFinal = imagemUrl.trim() || FOTOS_PADRAO_AUTOPROPELIDOS['volt-chopper-custom'];

    const novaMoto: MotoEletrica = {
      id: idUnico,
      nome: nome.trim(),
      categoria,
      precoFormatado: precoFormatado.startsWith('R$') ? precoFormatado : `R$ ${precoFormatado}`,
      precoNumero: numeroLimpo || 9990,
      autonomia: autonomia.includes('km') ? autonomia : `${autonomia} km por carga`,
      autonomiaKm: autonomiaNum,
      velocidadeMaxima: velocidadeMaxima.includes('km/h') ? velocidadeMaxima : `${velocidadeMaxima} km/h (Limite CONTRAN 996)`,
      tempoCarga: tempoCarga || '4 a 5 horas (Tomada 110V/220V)',
      potencia: potencia || '1000W Brushless',
      torque: '60 Nm instantâneo',
      capacidadeBateria: '60V 20Ah Lítio Removível',
      pesoKg: 52,
      descricaoComercial:
        descricao.trim() ||
        `O modelo autopropelido ${nome} oferece autonomia de até ${autonomiaNum} km por carga, motor de 1000W e velocidade travada em até 32 km/h. Totalmente dispensado de CNH, emplacamento e IPVA conforme Resolução CONTRAN 996.`,
      destaques: [
        'NÃO EXIGE CNH (Sem Autoescola)',
        'NÃO EXIGE EMPLACAMENTO (Zero IPVA)',
        'Velocidade Segura Travada em até 32 km/h',
        'Bateria de Lítio Removível para Recarga em Tomada'
      ],
      corPrincipal: '#10b981',
      tipoSilhueta,
      imagemUrl: fotoFinal,
      exigeCnh: false,
      exigeEmplacamento: false,
      regulamentacao: 'Resolução CONTRAN 996/2023 - Equipamento Autopropelido'
    };

    const listaAtualizada = [novaMoto, ...motos];
    setMotos(listaAtualizada);
    salvarCatalogoMotos(listaAtualizada);

    // Reset form
    setNome('');
    setPreco('');
    setAutonomia('50 km');
    setVelocidadeMaxima('32 km/h (Limite CONTRAN 996)');
    setTempoCarga('4 a 5 horas (Tomada 110V/220V)');
    setImagemUrl('');
    setDescricao('');

    exibirAlerta(`Moto "${novaMoto.nome}" cadastrada com sucesso no catálogo!`);
  };

  const handleExcluirMoto = (id: string, nomeMoto: string) => {
    if (window.confirm(`Tem certeza que deseja remover o modelo "${nomeMoto}" do catálogo?`)) {
      const listaAtualizada = motos.filter((m) => m.id !== id);
      setMotos(listaAtualizada);
      salvarCatalogoMotos(listaAtualizada);
      exibirAlerta(`Modelo "${nomeMoto}" removido com sucesso.`);
    }
  };

  const handleRestaurarPadrao = () => {
    if (window.confirm('Deseja restaurar os modelos originais de fábrica da VoltMoto?')) {
      const padrao = resetarCatalogoMotos();
      setMotos(padrao);
      exibirAlerta('Catálogo restaurado para a configuração original.');
    }
  };

  const handleVoltar = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const handleVerNoSite = (id: string) => {
    if (onNavigateToMoto) {
      onNavigateToMoto(id);
    } else if (typeof window !== 'undefined') {
      window.location.href = `/moto/${id}`;
    }
  };

  // Filtered motorcycles for table search
  const motosFiltradas = motos.filter(
    (m) =>
      m.nome.toLowerCase().includes(busca.toLowerCase()) ||
      m.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  // Quick stats
  const totalMotos = motos.length;
  const precoMedio =
    totalMotos > 0
      ? motos.reduce((acc, m) => acc + (m.precoNumero || 0), 0) / totalMotos
      : 0;
  const maiorAutonomia =
    totalMotos > 0 ? Math.max(...motos.map((m) => m.autonomiaKm || 0)) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleVoltar}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para a Vitrine</span>
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-cyan-400 flex items-center justify-center text-slate-950 font-bold">
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
              </div>
              <span className="text-sm sm:text-base font-extrabold text-white">
                Volt<span className="text-cyan-400">Moto</span>{' '}
                <span className="text-xs uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-normal">
                  Admin
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRestaurarPadrao}
              title="Restaurar catálogo inicial de fábrica"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Padrão</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Toast Notification */}
        {notificacao && (
          <div
            className={`mb-6 p-4 rounded-xl border flex items-center gap-3 text-sm animate-fadeIn ${
              notificacao.tipo === 'sucesso'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                : notificacao.tipo === 'erro'
                ? 'bg-rose-950/80 border-rose-500/40 text-rose-200'
                : 'bg-cyan-950/80 border-cyan-500/40 text-cyan-200'
            }`}
          >
            {notificacao.tipo === 'sucesso' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{notificacao.mensagem}</span>
          </div>
        )}

        {/* Dashboard Title & Overview Stats */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-1">
            Gestão de Estoque e Showroom
          </p>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Painel Administrativo da Loja
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Cadastre novos modelos de motos elétricas para a vitrine e gerencie o catálogo em tempo real.
          </p>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-0.5">Motos no Catálogo</span>
              <span className="text-2xl font-bold font-mono text-white">{totalMotos} modelos</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-0.5">Preço Médio do Estoque</span>
              <span className="text-2xl font-bold font-mono text-emerald-400">
                {formatarPrecoBRL(precoMedio)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-0.5">Maior Autonomia</span>
              <span className="text-2xl font-bold font-mono text-cyan-300">
                {maiorAutonomia} km
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400">
              <Battery className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Main Grid: Form on Left/Top, Table on Right/Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Form Column (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Cadastrar Nova Moto</h2>
                <p className="text-xs text-slate-400">Preencha os dados técnicos do modelo</p>
              </div>
            </div>

            <form onSubmit={handleCadastrarMoto} className="space-y-4">
              {/* 1. Nome */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  Nome da Moto: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Volt Phantom XR Sport"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* 2. Preço */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Preço em Reais (R$): *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 74900 ou R$ 74.900"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* 3 & 4. Autonomia e Velocidade Máxima */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Battery className="w-3.5 h-3.5 text-cyan-400" />
                    Autonomia: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 230 km"
                    value={autonomia}
                    onChange={(e) => setAutonomia(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    Velocidade Máx: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 175 km/h"
                    value={velocidadeMaxima}
                    onChange={(e) => setVelocidadeMaxima(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* 5. Tempo de Carga */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Tempo de Carga: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 40 min DC / 3h Tomada 220V"
                  value={tempoCarga}
                  onChange={(e) => setTempoCarga(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* 6. URL da Imagem com Presets e Preview Fotográfico Realista */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    Foto Realista do Veículo:
                  </span>
                  <span className="text-[10px] text-emerald-400 font-normal">Fotos reais de concessionária</span>
                </label>

                {/* Quick Presets */}
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImagemUrl(FOTOS_PADRAO_AUTOPROPELIDOS['volt-chopper-custom']);
                      setCategoria('Chopper Autopropelida');
                    }}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-slate-300 hover:text-emerald-300 transition-colors truncate"
                  >
                    ⚡ Chopper Fat Tire (Harley)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImagemUrl(FOTOS_PADRAO_AUTOPROPELIDOS['volt-jet-urban-1000']);
                      setCategoria('Scooter Urbana Jet');
                    }}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-slate-300 hover:text-emerald-300 transition-colors truncate"
                  >
                    ⚡ Scooter Jet Urbana
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImagemUrl(FOTOS_PADRAO_AUTOPROPELIDOS['volt-motochefe-beast']);
                      setCategoria('Fat Bike MotoChefe');
                    }}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-slate-300 hover:text-emerald-300 transition-colors truncate"
                  >
                    ⚡ MotoChefe Beast Fat
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImagemUrl(FOTOS_PADRAO_AUTOPROPELIDOS['volt-vintage-cruiser']);
                      setCategoria('Retro Vintage Elétrica');
                    }}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-slate-300 hover:text-emerald-300 transition-colors truncate"
                  >
                    ⚡ Vintage Retro Custom
                  </button>
                </div>

                <input
                  type="url"
                  placeholder="https://exemplo.com/foto-real-moto.jpg"
                  value={imagemUrl}
                  onChange={(e) => setImagemUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />

                {/* Preview Thumbnail if set */}
                {imagemUrl && (
                  <div className="mt-2.5 p-2 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-3">
                    <img
                      src={imagemUrl}
                      alt="Preview"
                      className="w-16 h-12 rounded-lg object-cover border border-slate-800 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold text-slate-200 block truncate">
                        Prévia da Fotografia Realista
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 inline" /> Pronto para o catálogo
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Categoria do Autopropelido:
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as MotoEletrica['categoria'])}
                  className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Chopper Autopropelida">Chopper Autopropelida (Estilo Harley Fat Tire)</option>
                  <option value="Scooter Urbana Jet">Scooter Urbana Jet</option>
                  <option value="Fat Bike MotoChefe">Fat Bike MotoChefe</option>
                  <option value="Retro Vintage Elétrica">Retro Vintage Elétrica</option>
                </select>
              </div>

              {/* Potência */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Potência do Motor:
                </label>
                <input
                  type="text"
                  placeholder="Ex: 1000W Brushless (Padrão Autopropelido)"
                  value={potencia}
                  onChange={(e) => setPotencia(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Descrição Comercial */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Descrição Comercial (Opcional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Destaques de engenharia, suspensão e experiência de pilotagem..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-2 py-3 text-xs uppercase tracking-wider font-bold rounded-xl text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Cadastrar Moto no Catálogo
              </button>
            </form>
          </div>

          {/* Table / List Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Search and Table Header */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Modelos Ativos no Catálogo
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400">
                      {motosFiltradas.length}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Clique em excluir para remover itens ou em ver para abrir a ficha
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrar modelos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Clean Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-950/60">
                      <th className="py-3 px-3">Modelo</th>
                      <th className="py-3 px-3">Preço</th>
                      <th className="py-3 px-3">Autonomia</th>
                      <th className="py-3 px-3">Velocidade</th>
                      <th className="py-3 px-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-xs">
                    {motosFiltradas.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500">
                          Nenhum modelo encontrado para "{busca}".
                        </td>
                      </tr>
                    ) : (
                      motosFiltradas.map((m) => (
                        <tr
                          key={m.id}
                          className="hover:bg-slate-950/50 transition-colors group"
                        >
                          {/* Miniatura & Nome */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-11 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0 relative group-hover:border-emerald-500/40 transition-colors">
                                <img
                                  src={m.imagemUrl || FOTOS_PADRAO_AUTOPROPELIDOS[m.id] || FOTOS_PADRAO_AUTOPROPELIDOS['volt-chopper-custom']}
                                  alt={m.nome}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    // fallback to standard chopper photo if custom image url fails
                                    (e.target as HTMLImageElement).src = FOTOS_PADRAO_AUTOPROPELIDOS['volt-chopper-custom'];
                                  }}
                                />
                              </div>
                              <div>
                                <span className="font-bold text-white block group-hover:text-cyan-300 transition-colors">
                                  {m.nome}
                                </span>
                                <span className="text-[10px] text-slate-500 block">
                                  {m.categoria} · {m.potencia.split('(')[0]}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Preço */}
                          <td className="py-3.5 px-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                            {m.precoFormatado}
                          </td>

                          {/* Autonomia */}
                          <td className="py-3.5 px-3 font-mono text-slate-300 whitespace-nowrap">
                            {m.autonomiaKm} km
                          </td>

                          {/* Velocidade */}
                          <td className="py-3.5 px-3 font-mono text-slate-300 whitespace-nowrap">
                            {m.velocidadeMaxima}
                          </td>

                          {/* Ações */}
                          <td className="py-3.5 px-3 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => handleVerNoSite(m.id)}
                                title="Ver página deste modelo"
                                className="p-1.5 rounded-md text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleExcluirMoto(m.id, m.nome)}
                                title="Excluir modelo do catálogo"
                                className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Visual Grid Preview */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Pré-visualização da Vitrine dos Lojistas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {motos.slice(0, 4).map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-3"
                  >
                    <div className="truncate">
                      <span className="text-xs font-bold text-white block truncate">
                        {m.nome}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400 block">
                        {m.precoFormatado}
                      </span>
                    </div>
                    <button
                      onClick={() => handleVerNoSite(m.id)}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0"
                    >
                      Ver
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Admin Footer */}
      <footer className="bg-slate-950 border-t border-slate-850 py-6 px-4 text-center text-xs text-slate-500">
        VoltMoto Painel Administrativo de Loja · Gestão de Catálogo e Estoque
      </footer>
    </div>
  );
}
