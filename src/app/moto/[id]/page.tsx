'use client';

import React, { use, useState, useEffect } from 'react';
import { 
  MOTOS_ELETRICAS, 
  MotoEletrica, 
  CONTATO_CONFIG, 
  gerarLinkWhatsapp, 
  obterCatalogoMotos 
} from '../../../data/motos.ts';
import { MotoPhotoView } from '../../../components/MotoPhotoView.tsx';
import { 
  ArrowLeft, 
  MessageCircle, 
  Battery, 
  Gauge, 
  Zap, 
  Clock, 
  Scale, 
  Cpu, 
  Check, 
  ShieldCheck, 
  Calendar,
  Phone,
  Share2,
  Sparkles,
  MapPin,
  CheckCircle2,
  Bike
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
  onNavigateHome?: () => void;
  onOpenTestRide?: (modelName: string) => void;
}

export default function MotoDetailPage({ params, onNavigateHome, onOpenTestRide }: PageProps) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const motoId = resolvedParams?.id;

  const [moto, setMoto] = useState<MotoEletrica | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [entradaPercent, setEntradaPercent] = useState<number>(30);
  const [mesesFinanciamento, setMesesFinanciamento] = useState<number>(24);

  useEffect(() => {
    if (motoId) {
      const catalogo: MotoEletrica[] = obterCatalogoMotos();
      const encontrada =
        catalogo.find((m: MotoEletrica) => m.id === motoId) ||
        MOTOS_ELETRICAS.find((m: MotoEletrica) => m.id === motoId) ||
        null;
      setMoto(encontrada);
    }
  }, [motoId]);

  const handleVoltar = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    }
  };

  const handleCompartilhar = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    }
  };

  if (!moto) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <Zap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Modelo Não Encontrado</h1>
          <p className="text-sm text-slate-400 mb-6">
            O modelo com identificador <code className="text-emerald-400 font-mono">"{motoId}"</code> não está em nosso catálogo ativo no momento.
          </p>
          <button
            onClick={handleVoltar}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider rounded-xl text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a Vitrine
          </button>
        </div>
      </div>
    );
  }

  // Pre-formatted WhatsApp message for autopropelidos
  const mensagemWhatsApp = encodeURIComponent(
    `Olá! Tenho muito interesse no modelo autopropelido ${moto.nome} (${moto.precoFormatado}) que vi no site da VoltMoto. Sei que NÃO EXIGE CNH NEM EMPLACAMENTO e é 100% legalizada para circular em ciclovias e ruas urbanas (CONTRAN 996). Gostaria de falar com um consultor para saber cores disponíveis e opções de parcelamento!`
  );
  const linkWhatsApp = `https://wa.me/${CONTATO_CONFIG.telefoneWhatsapp}?text=${mensagemWhatsApp}`;

  // Financing calculation
  const valorEntrada = (moto.precoNumero * entradaPercent) / 100;
  const saldoFinanciar = moto.precoNumero - valorEntrada;
  const taxaMensal = 0.0119;
  const valorParcela =
    (saldoFinanciar * (taxaMensal * Math.pow(1 + taxaMensal, mesesFinanciamento))) /
    (Math.pow(1 + taxaMensal, mesesFinanciamento) - 1);

  const formatarMoeda = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            onClick={handleVoltar}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar para a Vitrine</span>
          </button>

          {/* Logo Brand */}
          <div className="flex items-center gap-2 font-extrabold text-white text-base sm:text-lg">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-950 shadow-sm shadow-emerald-500/20">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
            </div>
            <span>
              Volt<span className="text-emerald-400">Moto</span>
            </span>
          </div>

          {/* Share or Action */}
          <button
            onClick={handleCompartilhar}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
            title="Compartilhar link desta moto"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{copiado ? 'Link Copiado!' : 'Compartilhar'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Breadcrumb metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <span onClick={handleVoltar} className="hover:text-slate-300 cursor-pointer">Catálogo</span>
          <span>/</span>
          <span className="text-slate-400">{moto.categoria}</span>
          <span>/</span>
          <span className="text-emerald-400 font-medium">{moto.nome}</span>
        </div>

        {/* Hero Product Split: Featured Visual vs Fast Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Visual Artwork in Large Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-4 sm:p-8 shadow-2xl overflow-hidden group">
              {/* Badges */}
              <div className="absolute top-5 left-5 z-20 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 backdrop-blur-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  NÃO EXIGE CNH
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 backdrop-blur-md">
                  SEM EMPLACAMENTO
                </span>
                {moto.seloDestaque && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {moto.seloDestaque}
                  </span>
                )}
              </div>

              {/* Main Visual Render */}
              <MotoPhotoView
                tipo={moto.tipoSilhueta}
                nome={moto.nome}
                corAcento={moto.corPrincipal}
                imagemUrl={moto.imagemUrl}
                className="w-full h-80 sm:h-96"
              />

              {/* Bottom spec ticker */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                <span className="font-mono text-emerald-400 font-semibold">
                  RESOLUÇÃO CONTRAN 996/2023 · EQUIPAMENTO AUTOPROPELIDO
                </span>
                <span className="text-slate-300 font-medium">LIBERADA EM CICLOVIAS E RUAS URBANAS</span>
              </div>
            </div>

            {/* Quick Benefits Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-0.5">Habilitação CNH</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">100% DISPENSADA</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-0.5">Emplacamento / IPVA</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">R$ 0 (ISENTO)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-0.5">Custo por Carga</span>
                <span className="text-xs font-bold text-cyan-300 font-mono">&lt; R$ 1,00</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Commercial Summary & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-semibold text-emerald-300 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Sem Exigência de CNH ou Emplacamento
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {moto.nome}
              </h1>
              <p className="text-xs text-slate-400 mb-4">
                Potência de 1000W · Velocidade regulamentada em até 32 km/h · Bateria de Lítio Removível
              </p>

              {/* Price Block */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-slate-400">Preço Especial para Pronta-Entrega:</span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                    Sem Burocracia
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400 mb-2">
                  {moto.precoFormatado}
                </div>
                <p className="text-xs text-slate-400">
                  Ou em até 18x no cartão ou crediário com parcelas a partir de <strong className="text-white">{formatarMoeda(valorParcela)}/mês</strong>.
                </p>
              </div>

              {/* Commercial Description */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">
                  Liberdade Urbana Descomplicada
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {moto.descricaoComercial}
                </p>
              </div>

              {/* Factory highlights list */}
              <div className="mb-8 space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">
                  Itens de Série e Legalidade
                </h3>
                {moto.destaques.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Conversion Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
              <a
                href={linkWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 text-sm font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                Negociar no WhatsApp (Sem CNH)
              </a>

              {onOpenTestRide && (
                <button
                  onClick={() => onOpenTestRide(moto.nome)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold rounded-xl text-slate-200 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  Agendar Test-Ride Livre (Sem Habilitação)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Ficha Técnica Completa em Formato Grid (Required) */}
        <section className="mb-16">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
              Engenharia e Conformidade Jurídica
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
              <Cpu className="w-6 h-6 text-emerald-400" />
              Ficha Técnica Completa do Autopropelido
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Velocidade Máxima */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-3">
                <Gauge className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 block mb-1">Velocidade Máxima</span>
              <span className="text-xl font-bold font-mono text-emerald-400 block mb-1">
                Até 32 km/h
              </span>
              <p className="text-[11px] text-slate-400">
                Travada eletronicamente no limite legal da Resolução CONTRAN 996 para autopropelidos.
              </p>
            </div>

            {/* 2. Potência do Motor */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 block mb-1">Potência Nominal</span>
              <span className="text-xl font-bold font-mono text-white block mb-1">
                {moto.potencia}
              </span>
              <p className="text-[11px] text-slate-500">
                Motor Brushless de alto torque sem escovas e livre de manutenção periódica.
              </p>
            </div>

            {/* 3. Autonomia por Carga */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3">
                <Battery className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 block mb-1">Autonomia por Carga</span>
              <span className="text-xl font-bold font-mono text-white block mb-1">
                {moto.autonomiaKm} km
              </span>
              <p className="text-[11px] text-slate-500">
                Alcance suficiente para até 3 a 5 dias de trajetos urbanos diários.
              </p>
            </div>

            {/* 4. Tempo de Carga */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 block mb-1">Tempo de Carga</span>
              <span className="text-lg font-bold font-mono text-cyan-300 block mb-1">
                {moto.tempoCarga.split('/')[0]}
              </span>
              <p className="text-[11px] text-slate-500">
                Bivolt automático (110V/220V). Carregador inteligente incluso com corte automático.
              </p>
            </div>

            {/* 5. Habilitação & CNH */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" /> Exigência de CNH
              </div>
              <span className="text-lg font-bold font-mono text-emerald-300 block mb-1">
                NÃO EXIGE CNH
              </span>
              <p className="text-[11px] text-slate-400">
                Não necessita de carteira A nem ACC. Condução liberada por lei federal.
              </p>
            </div>

            {/* 6. Vias Permitidas */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold mb-1">
                <Bike className="w-4 h-4" /> Vias de Tráfego
              </div>
              <span className="text-sm font-bold text-white block mb-1">
                Ciclovias e Ruas Urbanas
              </span>
              <p className="text-[11px] text-slate-500">
                Permitida em ciclovias, ciclofaixas e ruas com velocidade permitida de até 40 km/h.
              </p>
            </div>

            {/* 7. Pack de Bateria Removível */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <span className="text-xs text-slate-400 block mb-1">Bateria Portátil</span>
              <span className="text-base font-bold font-mono text-white block mb-1">
                {moto.capacidadeBateria}
              </span>
              <p className="text-[11px] text-slate-500">
                Células de Lítio com trava física e alça para recarregar onde você quiser.
              </p>
            </div>

            {/* 8. Emplacamento / IPVA */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" /> Placa & IPVA
              </div>
              <span className="text-lg font-bold font-mono text-emerald-300 block mb-1">
                ZERO IMPOSTOS
              </span>
              <p className="text-[11px] text-slate-400">
                Sem placa, sem vistoria no Detran e sem cobrança de IPVA anual.
              </p>
            </div>
          </div>
        </section>

        {/* Box de Atendimento Dedicado com o Consultor Especialista (Required) */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-xl shadow-emerald-950/20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Specialist Info */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Consultoria Especializada em Autopropelidos Online</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Tire suas dúvidas sobre a {moto.nome} e a Lei CONTRAN 996
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Nosso consultor técnico está disponível agora no WhatsApp para enviar vídeos do modelo em teste, cores à pronta-entrega, opções de parcelamento no cartão em até 18x e agendamento de test-ride sem precisar de CNH.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sem exigência de CNH
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400" /> Showroom Jardins (SP)
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-300" /> {CONTATO_CONFIG.telefone}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Action Box */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <a
                href={linkWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 text-sm font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                Conversar com Consultor no WhatsApp
              </a>
              <div className="text-center text-[11px] text-slate-500">
                Pronta-entrega: você compra e sai pilotando no mesmo dia
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Mobile WhatsApp Button */}
      <a
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Conversar sobre ${moto.nome} no WhatsApp`}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/40 transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-slate-950" />
        <span className="hidden sm:inline">Tenho Interesse (Sem CNH)</span>
      </a>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-850 py-8 px-4 text-center text-xs text-slate-500">
        <p className="mb-2">
          VoltMoto Autopropelidos · {CONTATO_CONFIG.endereco} · {CONTATO_CONFIG.telefone}
        </p>
        <p>© {new Date().getFullYear()} VoltMoto. Todos os direitos reservados. Em conformidade com a Resolução CONTRAN 996/2023.</p>
      </footer>
    </div>
  );
}
