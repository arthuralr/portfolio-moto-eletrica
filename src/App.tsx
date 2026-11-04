/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  BatteryCharging, 
  Gauge, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  PlusCircle, 
  Trash2, 
  Sparkles, 
  AlertCircle, 
  X, 
  Calculator, 
  Check, 
  RefreshCw,
  Sliders,
  DollarSign,
  Tag,
  Search,
  Eye,
  Menu,
  MapPin,
  Calendar,
  User,
  Phone,
  Navigation,
  ExternalLink,
  ChevronDown,
  UploadCloud,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

// =========================================================================
// 1. CLIENTE SUPABASE (CONEXÃO TRANSPARENTE SEM TELEMETRIA EM TELA)
// =========================================================================
const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 'https://riirfdnzdewhzacpvwkw.supabase.co';
const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_azRqvPigs3OgrW0WpgBGeQ_jVmSbdXB';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =========================================================================
// 2. FOTOS REAIS DE CONCESSIONÁRIA EM ALTA RESOLUÇÃO
// =========================================================================
const FOTOS_PREMIUM = {
  chopper: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
  scooter: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
  motochefe: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
  vintage: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80'
};

// =========================================================================
// 3. ESTRUTURA DO MODELO (CONTRAN 996: 1000W, ATÉ 32 KM/H, SEM CNH)
// =========================================================================
export interface MotoItem {
  id: string;
  nome: string;
  preco: string;
  preco_numero?: number;
  autonomia: string;
  velocidade_maxima: string;
  tempo_carga: string;
  potencia: string;
  imagem_url?: string;
  categoria?: string;
  descricao?: string;
  created_at?: string;
}

const MOTOS_INICIAIS: MotoItem[] = [
  {
    id: 'volt-chopper-custom-1000',
    nome: 'Volt Chopper Custom 1000W',
    preco: 'R$ 11.990',
    preco_numero: 11990,
    autonomia: '55 km por carga',
    velocidade_maxima: '32 km/h (Limite CONTRAN 996)',
    tempo_carga: '4 a 5 horas (Tomada 110V/220V)',
    potencia: '1000W Brushless High Torque',
    imagem_url: FOTOS_PREMIUM.chopper,
    categoria: 'Chopper Autopropelida',
    descricao: 'Imponente estilo Harley Fat Tire com pneu largo de 9.5 polegadas, guidão customizado elevado e bateria de lítio removível. 100% liberado de CNH, emplacamento e IPVA.'
  },
  {
    id: 'volt-jet-urban-1000',
    nome: 'Volt Jet Urban Pro 1000W',
    preco: 'R$ 9.890',
    preco_numero: 9890,
    autonomia: '60 km por carga',
    velocidade_maxima: '32 km/h (Limite CONTRAN 996)',
    tempo_carga: '4 horas (Tomada Comum)',
    potencia: '1000W Brushless Silencioso',
    imagem_url: FOTOS_PREMIUM.scooter,
    categoria: 'Scooter Urbana Jet',
    descricao: 'A mais ágil para deslocamento urbano diário. Assoalho plano, cesto frontal integrado, alarme com bloqueio de roda e baú sob o assento.'
  },
  {
    id: 'volt-motochefe-beast',
    nome: 'Volt MotoChefe Beast 1000W',
    preco: 'R$ 13.490',
    preco_numero: 13490,
    autonomia: '50 km por carga',
    velocidade_maxima: '32 km/h (Limite CONTRAN 996)',
    tempo_carga: '4 a 5 horas (Tomada Comum)',
    potencia: '1000W com Pico de 1500W',
    imagem_url: FOTOS_PREMIUM.motochefe,
    categoria: 'Fat Bike MotoChefe',
    descricao: 'Estrutura reforçada de liga aeronáutica, pneus todo-terreno para asfalto e paralelepípedo, e suspensão invertida dianteira com duplo amortecedor traseiro.'
  },
  {
    id: 'volt-vintage-cruiser',
    nome: 'Volt Vintage Retro 1000W',
    preco: 'R$ 12.290',
    preco_numero: 12290,
    autonomia: '45 km por carga',
    velocidade_maxima: '32 km/h (Limite CONTRAN 996)',
    tempo_carga: '4 horas (Tomada 110V/220V)',
    potencia: '1000W Brushless Classic',
    imagem_url: FOTOS_PREMIUM.vintage,
    categoria: 'Retro Vintage Elétrica',
    descricao: 'Design clássico europeu com assento em couro sintético costurado à mão, farol redondo com iluminação diurna Halo LED e acabamentos cromados de alto padrão.'
  }
];

const NUMERO_WHATSAPP = '5511999998888';

// =========================================================================
// COMPONENTE PRINCIPAL
// =========================================================================
export default function App() {
  // Estado das motos conectado ao Supabase
  const [motos, setMotos] = useState<MotoItem[]>(MOTOS_INICIAIS);
  const [carregando, setCarregando] = useState(false);

  // Estados de UI e Navegação
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [painelAberto, setPainelAberto] = useState(false);
  const [motoDetalhes, setMotoDetalhes] = useState<MotoItem | null>(null);
  const [slideAtual, setSlideAtual] = useState(0);
  const [notificacao, setNotificacao] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);
  const [filtroBusca, setFiltroBusca] = useState('');

  // Formulário de Agendamento de Test-Ride
  const [testNome, setTestNome] = useState('');
  const [testTelefone, setTestTelefone] = useState('');
  const [testModelo, setTestModelo] = useState('');
  const [testData, setTestData] = useState('');
  const [testPeriodo, setTestPeriodo] = useState('Manhã (09h às 12h)');

  // Formulário do Painel Lojista
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [autonomia, setAutonomia] = useState('50 km');
  const [velocidadeMaxima, setVelocidadeMaxima] = useState('32 km/h (Limite Legal)');
  const [tempoCarga, setTempoCarga] = useState('4 a 5 horas');
  const [potencia, setPotencia] = useState('1000W Brushless');
  const [imagemUrl, setImagemUrl] = useState('');
  const [arquivoImagem, setArquivoImagem] = useState<File | null>(null);
  const [previewImagem, setPreviewImagem] = useState<string>(FOTOS_PREMIUM.chopper);
  const [abaUpload, setAbaUpload] = useState<'arquivo' | 'presets'>('arquivo');
  const [categoria, setCategoria] = useState('Chopper Autopropelida');
  const [descricao, setDescricao] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [statusUpload, setStatusUpload] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArquivoImagem(file);
      const urlPreview = URL.createObjectURL(file);
      setPreviewImagem(urlPreview);
      setImagemUrl('');
    }
  };

  // Exibir toast temporário
  const exibirAlerta = (texto: string, tipo: 'sucesso' | 'erro' = 'sucesso') => {
    setNotificacao({ texto, tipo });
    setTimeout(() => setNotificacao(null), 3800);
  };

  // -----------------------------------------------------------------------
  // BUSCAR E LISTAR DINAMICAMENTE DA TABELA "motos" DO SUPABASE
  // -----------------------------------------------------------------------
  const carregarMotosSupabase = useCallback(async () => {
    try {
      setCarregando(true);
      const { data, error } = await supabase
        .from('motos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setMotos(data as MotoItem[]);
      } else {
        // Se a tabela estiver vazia, semeia com os 4 modelos iniciais
        try {
          await supabase.from('motos').upsert(MOTOS_INICIAIS);
          const { data: recarregado } = await supabase
            .from('motos')
            .select('*')
            .order('created_at', { ascending: false });
          if (recarregado && recarregado.length > 0) {
            setMotos(recarregado as MotoItem[]);
          }
        } catch {
          setMotos(MOTOS_INICIAIS);
        }
      }
    } catch {
      // Fallback seguro em caso de indisponibilidade
      const local = localStorage.getItem('voltmoto_backup_v1');
      if (local) {
        try {
          setMotos(JSON.parse(local));
        } catch {
          setMotos(MOTOS_INICIAIS);
        }
      } else {
        setMotos(MOTOS_INICIAIS);
      }
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarMotosSupabase();
  }, [carregarMotosSupabase]);

  // Suporte a abertura direta do Painel Lojista via URL hash (#admin, #painel, #lojista) ou rota
  useEffect(() => {
    const verificarHashAdmin = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        hash === '#admin' || 
        hash === '#painel' || 
        hash === '#lojista' ||
        pathname.includes('admin') ||
        search.includes('admin')
      ) {
        setPainelAberto(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    verificarHashAdmin();
    window.addEventListener('hashchange', verificarHashAdmin);
    window.addEventListener('popstate', verificarHashAdmin);
    return () => {
      window.removeEventListener('hashchange', verificarHashAdmin);
      window.removeEventListener('popstate', verificarHashAdmin);
    };
  }, []);

  // -----------------------------------------------------------------------
  // INSERIR NOVO REGISTRO NO SUPABASE (INSERT)
  // -----------------------------------------------------------------------
  const handleCadastrarMoto = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      exibirAlerta('Informe o nome da moto.', 'erro');
      return;
    }

    setSalvando(true);
    setStatusUpload('Iniciando processamento...');

    const slug = nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const idUnico = `${slug}-${Date.now().toString().slice(-4)}`;

    const numLimpo = Number(preco.replace(/[^0-9]/g, '')) || 9990;
    const precoFormatado = preco.startsWith('R$') 
      ? preco 
      : `R$ ${Number(numLimpo).toLocaleString('pt-BR')}`;

    let urlFinal = imagemUrl.trim() || previewImagem || FOTOS_PREMIUM.chopper;

    // Se o lojista selecionou um arquivo de imagem real, faz o upload para o Supabase Storage
    if (arquivoImagem) {
      try {
        setStatusUpload('Fazendo upload da imagem para o Supabase Storage...');
        const fileExt = arquivoImagem.name.split('.').pop()?.toLowerCase() || 'jpg';
        const sanitizedSlug = slug || 'moto';
        const fileName = `${Date.now()}-${sanitizedSlug}.${fileExt}`;
        const filePath = `motos/${fileName}`;

        // Upload no bucket 'motos'
        const { error: uploadError } = await supabase.storage
          .from('motos')
          .upload(filePath, arquivoImagem, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          console.warn('Bucket "motos" retornou aviso, tentando bucket "imagens":', uploadError.message);
          
          // Tentativa alternativa no bucket 'imagens'
          const { error: uploadError2 } = await supabase.storage
            .from('imagens')
            .upload(filePath, arquivoImagem, {
              cacheControl: '3600',
              upsert: true
            });

          if (uploadError2) {
            console.warn('Erro em ambos os buckets de storage:', uploadError2.message);
            exibirAlerta(`Aviso de Storage: Crie o bucket "motos" como público em Storage > New Bucket no Supabase.`, 'erro');
            urlFinal = previewImagem;
          } else {
            const { data: publicData } = supabase.storage.from('imagens').getPublicUrl(filePath);
            urlFinal = publicData.publicUrl;
          }
        } else {
          const { data: publicData } = supabase.storage.from('motos').getPublicUrl(filePath);
          urlFinal = publicData.publicUrl;
        }
      } catch (err: any) {
        console.warn('Erro no upload de arquivo:', err);
        urlFinal = previewImagem;
      }
    }

    setStatusUpload('Salvando moto no catálogo...');

    const novaMoto: MotoItem = {
      id: idUnico,
      nome: nome.trim(),
      preco: precoFormatado,
      preco_numero: numLimpo,
      autonomia: autonomia.includes('km') ? autonomia : `${autonomia} km por carga`,
      velocidade_maxima: velocidadeMaxima.includes('km/h') ? velocidadeMaxima : `${velocidadeMaxima} km/h`,
      tempo_carga: tempoCarga || '4 a 5 horas',
      potencia: potencia || '1000W Brushless',
      imagem_url: urlFinal,
      categoria,
      descricao: descricao.trim() || `Modelo elétrico autopropelido ${nome} de 1000W com velocidade até 32 km/h. 100% liberado de CNH, emplacamento e IPVA conforme Resolução CONTRAN 996.`
    };

    try {
      const { error } = await supabase.from('motos').insert([novaMoto]);
      if (error) throw error;
      exibirAlerta(`Moto "${novaMoto.nome}" adicionada com sucesso ao catálogo!`);
      await carregarMotosSupabase();
      localStorage.setItem('voltmoto_backup_v1', JSON.stringify([novaMoto, ...motos]));
    } catch {
      const listaAtualizada = [novaMoto, ...motos];
      setMotos(listaAtualizada);
      localStorage.setItem('voltmoto_backup_v1', JSON.stringify(listaAtualizada));
      exibirAlerta(`Moto "${novaMoto.nome}" adicionada ao catálogo!`);
    } finally {
      setNome('');
      setPreco('');
      setDescricao('');
      setArquivoImagem(null);
      setImagemUrl('');
      setPreviewImagem(FOTOS_PREMIUM.chopper);
      setSalvando(false);
      setStatusUpload('');
    }
  };

  // -----------------------------------------------------------------------
  // EXCLUIR REGISTRO NO SUPABASE (DELETE)
  // -----------------------------------------------------------------------
  const handleExcluirMoto = async (id: string, nomeMoto: string) => {
    if (!window.confirm(`Tem certeza que deseja remover o modelo "${nomeMoto}"?`)) {
      return;
    }

    try {
      const { error } = await supabase.from('motos').delete().eq('id', id);
      if (error) throw error;
      exibirAlerta(`Modelo "${nomeMoto}" removido com sucesso.`);
      await carregarMotosSupabase();
    } catch {
      const listaAtualizada = motos.filter(m => m.id !== id);
      setMotos(listaAtualizada);
      localStorage.setItem('voltmoto_backup_v1', JSON.stringify(listaAtualizada));
      exibirAlerta(`Modelo removido.`);
    }
  };

  // -----------------------------------------------------------------------
  // AGENDAMENTO DE TEST-RIDE VIA WHATSAPP
  // -----------------------------------------------------------------------
  const handleAgendarTestRide = (e: React.FormEvent) => {
    e.preventDefault();

    if (!testNome.trim() || !testTelefone.trim()) {
      exibirAlerta('Preencha seu nome e telefone para agendamento.', 'erro');
      return;
    }

    const mensagem = `Olá! Gostaria de agendar um Test-Ride na VoltMoto:
👤 *Nome:* ${testNome.trim()}
📱 *Telefone:* ${testTelefone.trim()}
⚡ *Modelo de Interesse:* ${testModelo || 'Qualquer modelo disponível'}
📅 *Data Preferencial:* ${testData || 'A combinar'}
⏰ *Período:* ${testPeriodo}

Aguardo a confirmação dos consultores da concessionária!`;

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    exibirAlerta('Redirecionando para o WhatsApp da concessionária...');
  };

  // -----------------------------------------------------------------------
  // CARROSSEL HERO SECTION AUTOMÁTICO E MANUAL
  // -----------------------------------------------------------------------
  const slides = useMemo(() => motos.slice(0, 4), [motos]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setSlideAtual((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slideAnterior = () => setSlideAtual((prev) => (prev - 1 + slides.length) % slides.length);
  const proximoSlide = () => setSlideAtual((prev) => (prev + 1) % slides.length);

  // Formatação de link do WhatsApp para produto específico
  const gerarLinkWhatsapp = (modelo?: MotoItem) => {
    const texto = modelo
      ? `Olá! Tenho interesse na moto elétrica autopropelida ${modelo.nome} (${modelo.preco}) que vi no site da VoltMoto. Gostaria de mais informações sobre pagamento e entrega sem CNH!`
      : `Olá! Acessei o site da VoltMoto e quero conhecer os modelos autopropelidos de 1000W que não exigem CNH nem emplacamento conforme a Resolução CONTRAN 996.`;
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
  };

  const motoAtiva = slides[slideAtual] || motos[0] || MOTOS_INICIAIS[0];

  const motosFiltradas = motos.filter(m => 
    m.nome.toLowerCase().includes(filtroBusca.toLowerCase()) ||
    (m.categoria && m.categoria.toLowerCase().includes(filtroBusca.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* -----------------------------------------------------------------
          TOP BAR LEGAL: RESOLUÇÃO CONTRAN 996/2023
      ----------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 py-2 px-3 sm:px-4 text-[11px] sm:text-xs text-center text-emerald-300 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wide bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          CONTRAN 996/2023
        </span>
        <span className="font-semibold text-slate-200">
          Motos Elétricas Autopropelidas:
        </span>
        <span className="text-emerald-400 font-extrabold tracking-wide">
          SEM CNH · SEM PLACA · ZERO IPVA
        </span>
        <span className="text-slate-500 hidden md:inline">|</span>
        <span className="text-slate-400 hidden lg:inline">
          1000W · Até 32 km/h · Permitido em ciclovias e vias públicas
        </span>
      </div>

      {/* -----------------------------------------------------------------
          HEADER FIXO COM LOGO, MENU RESPONSIVO E HAMBÚRGUER MOBILE
      ----------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo VoltMoto */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white block leading-none">
                Volt<span className="text-emerald-400">Moto</span>
              </span>
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                Showroom Autopropelidos
              </span>
            </div>
          </a>

          {/* Links Desktop (Hidden no Mobile) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#catalogo" className="hover:text-emerald-400 transition-colors">Modelos</a>
            <a href="#vantagens" className="hover:text-emerald-400 transition-colors">Vantagens</a>
            <a href="#contran" className="hover:text-emerald-400 transition-colors">CONTRAN 996</a>
            <a href="#test-ride" className="hover:text-emerald-400 transition-colors">Test-Drive</a>
            <a href="#localizacao" className="hover:text-emerald-400 transition-colors">Onde Estamos</a>
          </nav>

          {/* Ações Topo: Painel Lojista + WhatsApp + Hambúrguer */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Botão Painel Lojista */}
            <button
              onClick={() => {
                setPainelAberto(!painelAberto);
                setMenuMobileAberto(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-emerald-500/40 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{painelAberto ? 'Fechar Painel' : 'Painel Lojista'}</span>
              <span className="sm:hidden">Lojista</span>
            </button>

            {/* CTA WhatsApp Oficial */}
            <a
              href={gerarLinkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-md shadow-emerald-500/20 active:scale-95 shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Botão Menu Hambúrguer (Apenas Mobile/Tablet) */}
            <button
              onClick={() => setMenuMobileAberto(!menuMobileAberto)}
              aria-label="Abrir menu de navegação"
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {menuMobileAberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            MENU MOBILE DROPDOWN SUAVE
        --------------------------------------------------------------- */}
        {menuMobileAberto && (
          <div className="lg:hidden pt-3 pb-2 border-t border-slate-850 mt-3 animate-fadeIn space-y-1">
            <a
              href="#catalogo"
              onClick={() => setMenuMobileAberto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-emerald-400 transition-colors"
            >
              ⚡ Modelos & Catálogo
            </a>
            <a
              href="#vantagens"
              onClick={() => setMenuMobileAberto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-emerald-400 transition-colors"
            >
              💰 Vantagens & Economia
            </a>
            <a
              href="#contran"
              onClick={() => setMenuMobileAberto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-emerald-400 transition-colors"
            >
              📜 Resolução CONTRAN 996 (Sem CNH)
            </a>
            <a
              href="#test-ride"
              onClick={() => setMenuMobileAberto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-emerald-400 transition-colors"
            >
              🛵 Agendar Test-Drive
            </a>
            <a
              href="#localizacao"
              onClick={() => setMenuMobileAberto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-emerald-400 transition-colors"
            >
              📍 Onde Estamos (Showroom)
            </a>
            <div className="pt-2 border-t border-slate-850 flex gap-2">
              <button
                onClick={() => {
                  setPainelAberto(true);
                  setMenuMobileAberto(false);
                }}
                className="w-full py-2.5 rounded-lg text-xs font-bold text-center bg-slate-900 border border-slate-700 text-emerald-400"
              >
                Abrir Painel Lojista
              </button>
            </div>
          </div>
        )}
      </header>

      {/* -----------------------------------------------------------------
          TOAST FEEDBACK DE OPERAÇÕES
      ----------------------------------------------------------------- */}
      {notificacao && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-[90%] sm:w-auto animate-fadeIn">
          <div
            className={`p-3.5 rounded-xl border shadow-2xl flex items-center gap-3 text-xs sm:text-sm ${
              notificacao.tipo === 'sucesso'
                ? 'bg-emerald-950/95 border-emerald-500/60 text-emerald-200'
                : 'bg-rose-950/95 border-rose-500/60 text-rose-200'
            }`}
          >
            {notificacao.tipo === 'sucesso' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span className="flex-1 font-medium">{notificacao.texto}</span>
            <button
              onClick={() => setNotificacao(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------
          PAINEL ADMINISTRATIVO LOJISTA (TOTALMENTE RESPONSIVO MOBILE)
      ----------------------------------------------------------------- */}
      {painelAberto && (
        <section className="bg-slate-900 border-b border-slate-800 p-4 sm:p-6 lg:p-8 animate-fadeIn">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 uppercase">
                  Gestão em Tempo Real
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Painel de Controle da Concessionária
                </h2>
                <p className="text-xs text-slate-400">
                  Cadastre novos autopropelidos ou exclua modelos do catálogo instantaneamente.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPainelAberto(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                >
                  Fechar Painel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              
              {/* Formulário de Cadastro (5 cols) */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 pb-3 border-b border-slate-800">
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  Cadastrar Novo Modelo
                </h3>

                <form onSubmit={handleCadastrarMoto} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nome da Moto: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Volt Chopper Sport 1000W"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Preço em Reais: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: R$ 11.990"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
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

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Velocidade: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Até 32 km/h"
                        value={velocidadeMaxima}
                        onChange={(e) => setVelocidadeMaxima(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tempo de Carga: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="4 a 5 horas"
                        value={tempoCarga}
                        onChange={(e) => setTempoCarga(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Seletor de Imagem: Upload Real de Arquivo com Prévia e Presets */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Foto da Moto: *</span>
                      </label>
                      
                      {/* Abas: Arquivo vs Presets */}
                      <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setAbaUpload('arquivo')}
                          className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                            abaUpload === 'arquivo'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Upload de Arquivo
                        </button>
                        <button
                          type="button"
                          onClick={() => setAbaUpload('presets')}
                          className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                            abaUpload === 'presets'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Presets / URL
                        </button>
                      </div>
                    </div>

                    {/* ABA 1: UPLOAD REAL DE ARQUIVO */}
                    {abaUpload === 'arquivo' ? (
                      <div>
                        <input
                          type="file"
                          id="input-foto-moto"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        
                        <label
                          htmlFor="input-foto-moto"
                          className="cursor-pointer border-2 border-dashed border-slate-800 hover:border-emerald-500/60 rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 bg-slate-900/60 hover:bg-slate-900 transition-all text-center group"
                        >
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {arquivoImagem ? 'Trocar foto selecionada' : 'Selecionar foto do computador ou celular'}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              Formatos: JPG, PNG, WEBP · Upload para o Supabase Storage
                            </span>
                          </div>
                        </label>

                        {/* Arquivo selecionado */}
                        {arquivoImagem && (
                          <div className="mt-2 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 truncate">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="font-mono text-emerald-200 truncate text-[11px]">
                                {arquivoImagem.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-mono shrink-0 ml-2">
                              {(arquivoImagem.size / 1024).toFixed(0)} KB
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* ABA 2: PRESETS E URL EXTERNA */
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setImagemUrl(FOTOS_PREMIUM.chopper);
                              setPreviewImagem(FOTOS_PREMIUM.chopper);
                              setArquivoImagem(null);
                              setCategoria('Chopper Autopropelida');
                            }}
                            className="text-left text-[11px] px-2 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/60 text-slate-300 hover:text-emerald-300 truncate"
                          >
                            ⚡ Chopper Fat Tire
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImagemUrl(FOTOS_PREMIUM.scooter);
                              setPreviewImagem(FOTOS_PREMIUM.scooter);
                              setArquivoImagem(null);
                              setCategoria('Scooter Urbana Jet');
                            }}
                            className="text-left text-[11px] px-2 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/60 text-slate-300 hover:text-emerald-300 truncate"
                          >
                            ⚡ Scooter Urbana
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImagemUrl(FOTOS_PREMIUM.motochefe);
                              setPreviewImagem(FOTOS_PREMIUM.motochefe);
                              setArquivoImagem(null);
                              setCategoria('Fat Bike MotoChefe');
                            }}
                            className="text-left text-[11px] px-2 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/60 text-slate-300 hover:text-emerald-300 truncate"
                          >
                            ⚡ MotoChefe Beast
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImagemUrl(FOTOS_PREMIUM.vintage);
                              setPreviewImagem(FOTOS_PREMIUM.vintage);
                              setArquivoImagem(null);
                              setCategoria('Retro Vintage Elétrica');
                            }}
                            className="text-left text-[11px] px-2 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/60 text-slate-300 hover:text-emerald-300 truncate"
                          >
                            ⚡ Vintage Custom
                          </button>
                        </div>

                        <input
                          type="url"
                          placeholder="Ou cole uma URL externa https://..."
                          value={imagemUrl}
                          onChange={(e) => {
                            setImagemUrl(e.target.value);
                            setPreviewImagem(e.target.value);
                            setArquivoImagem(null);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    )}

                    {/* Prévia da Imagem em Tempo Real */}
                    {previewImagem && (
                      <div className="mt-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                        <img
                          src={previewImagem}
                          alt="Prévia do Veículo"
                          className="w-16 h-12 rounded-lg object-cover border border-slate-800 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[11px] font-bold text-white block truncate">
                            Pré-visualização da Foto
                          </span>
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                            <CheckCircle2 className="w-3 h-3 inline" />
                            {arquivoImagem ? 'Foto carregada do dispositivo' : 'Foto selecionada para o catálogo'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Descrição Comercial:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Destaques de bateria removível, autonomia e conforto..."
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={salvando}
                    className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {salvando ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{statusUpload || 'Enviando...'}</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        <span>Cadastrar Moto no Catálogo</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Tabela de Listagem e Exclusão (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        Modelos Cadastrados ({motos.length})
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Exclua itens para remover instantaneamente da vitrine
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Filtrar..."
                          value={filtroBusca}
                          onChange={(e) => setFiltroBusca(e.target.value)}
                          className="pl-8 pr-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <button
                        onClick={carregarMotosSupabase}
                        disabled={carregando}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 bg-slate-900 border border-slate-800 transition-colors"
                        title="Atualizar"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${carregando ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                          <th className="py-2.5 px-3">Modelo</th>
                          <th className="py-2.5 px-3">Preço</th>
                          <th className="py-2.5 px-3">Autonomia</th>
                          <th className="py-2.5 px-3 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {motosFiltradas.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-6 text-center text-slate-500">
                              Nenhum modelo cadastrado.
                            </td>
                          </tr>
                        ) : (
                          motosFiltradas.map((moto) => (
                            <tr key={moto.id} className="hover:bg-slate-900/60 transition-colors">
                              <td className="py-2 px-3">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={moto.imagem_url || FOTOS_PREMIUM.chopper}
                                    alt={moto.nome}
                                    className="w-10 h-8 rounded-lg object-cover border border-slate-800 shrink-0"
                                  />
                                  <div>
                                    <span className="font-bold text-white block truncate max-w-[150px] sm:max-w-[200px]">
                                      {moto.nome}
                                    </span>
                                    <span className="text-[10px] text-slate-500">
                                      {moto.potencia}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-2 px-3 font-mono font-bold text-emerald-400 whitespace-nowrap">
                                {moto.preco}
                              </td>
                              <td className="py-2 px-3 font-mono text-slate-300 whitespace-nowrap">
                                {moto.autonomia}
                              </td>
                              <td className="py-2 px-3 text-right whitespace-nowrap">
                                <button
                                  onClick={() => handleExcluirMoto(moto.id, moto.nome)}
                                  title="Remover moto do catálogo"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
                  Alterações sincronizadas automaticamente com a vitrine pública.
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* -----------------------------------------------------------------
          HERO SECTION COM SLIDER FOTOGRÁFICO DINÂMICO
      ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80">
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[300px] sm:h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Texto de Conversão & Proposta de Valor (6 cols) */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Liberado de CNH · Resolução CONTRAN 996</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Liberdade Total Sem <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  CNH, Placa ou IPVA
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Adquira sua moto elétrica autopropelida homologada com motor de 
                <strong className="text-white"> 1000W</strong> e velocidade máxima limitada em 
                <strong className="text-white"> 32 km/h</strong>. Conduza livremente nas ruas e ciclovias gastando apenas R$ 0,02 por km rodado.
              </p>

              {/* Benefícios Rápidos */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 text-left">
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sem autoescola e sem CNH</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sem taxa de emplacamento</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Recarga em tomada comum</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Economia de até R$ 4.800/ano</span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2 flex-wrap">
                <a
                  href="#catalogo"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Ver Modelos no Catálogo</span>
                </a>
                <a
                  href="#test-ride"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-200 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Agendar Test-Drive</span>
                </a>
              </div>
            </div>

            {/* Slider Dinâmico com Fotos Reais (6 cols) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
                
                <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={motoAtiva.imagem_url || FOTOS_PREMIUM.chopper}
                    alt={motoAtiva.nome}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Badge Sem CNH */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Sem CNH · Sem Placa
                    </span>
                  </div>

                  {/* Detalhes sobrepostos na foto */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10">
                    <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold block mb-0.5">
                      {motoAtiva.categoria || 'Autopropelido'}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
                      {motoAtiva.nome}
                    </h3>
                    <div className="flex items-center justify-between gap-3 mt-1.5 sm:mt-2">
                      <span className="text-base sm:text-xl font-mono font-black text-emerald-400">
                        {motoAtiva.preco}
                      </span>
                      <button
                        onClick={() => setMotoDetalhes(motoAtiva)}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ficha Técnica</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid de Specs do Slide */}
                <div className="grid grid-cols-3 divide-x divide-slate-800 bg-slate-950/90 border-t border-slate-800 text-center py-2.5 sm:py-3">
                  <div className="px-2">
                    <span className="text-[9px] sm:text-[10px] uppercase text-slate-400 block">Potência</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{motoAtiva.potencia.split(' ')[0]}</span>
                  </div>
                  <div className="px-2">
                    <span className="text-[9px] sm:text-[10px] uppercase text-slate-400 block">Velocidade</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">32 km/h</span>
                  </div>
                  <div className="px-2">
                    <span className="text-[9px] sm:text-[10px] uppercase text-slate-400 block">Autonomia</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{motoAtiva.autonomia.split(' ')[0]} km</span>
                  </div>
                </div>

                {/* Setas de Navegação */}
                <button
                  onClick={slideAnterior}
                  aria-label="Slide anterior"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-white flex items-center justify-center opacity-85 hover:opacity-100 transition-all z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={proximoSlide}
                  aria-label="Próximo slide"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-white flex items-center justify-center opacity-85 hover:opacity-100 transition-all z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bullets */}
                <div className="absolute bottom-16 sm:bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideAtual(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        slideAtual === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SEÇÃO DE CONTEÚDO E VANTAGENS DETALHADAS (CONTRAN 996 & ECONOMIA)
      ----------------------------------------------------------------- */}
      <section id="vantagens" className="py-14 sm:py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">
              Vantagens Exclusivas VoltMoto
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              A Revolução da Mobilidade Sem Burocracia
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Entenda por que milhares de pessoas estão substituindo motos tradicionais por autopropelidos elétricos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Zero Habilitação</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pela Resolução CONTRAN 996/2023, veículos autopropelidos não exigem CNH nem ACC. Compre e saia pilotando no mesmo dia.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Sem IPVA ou Placa</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Totalmente isento de taxas de emplacamento, licenciamento anual do Detran e IPVA. Economia direta que fica no seu bolso.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Tomada Doméstica</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bateria de lítio portátil e removível. Leve para seu apartamento ou escritório e recarregue em qualquer tomada 110V ou 220V.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Motor 1000W Travado</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Velocidade limitada com precisão em até 32 km/h conforme a lei, permitindo circulação com segurança em ciclovias e ruas.
              </p>
            </div>

          </div>

          {/* Calculadora Comparativa de Economia */}
          <div id="contran" className="mt-12 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  Calculadora de Economia Real
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  R$ 0,02 por km contra R$ 0,35 na Gasolina
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Uma carga completa de 50 km consome menos de R$ 1,00 na tarifa residencial de energia. Em 1 ano, sua economia chega a até R$ 4.800,00 quando comparado a motos a combustão.
                </p>

                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero custos com troca de óleo, velas, correia ou filtros</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Isenção vitalícia de IPVA e licenciamento anual</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Totalmente aprovado para ciclovias pela Resolução CONTRAN 996</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Moto 160cc a Gasolina (Combustível + IPVA + Manutenção):</span>
                    <span className="font-mono font-bold text-rose-400">R$ 380,00 / mês</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full w-[90%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-emerald-300 font-semibold">VoltMoto 1000W Autopropelida (Energia Elétrica):</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">R$ 22,00 / mês</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[12%]" />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Economia no seu bolso em 12 meses:</span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-emerald-400 block mt-0.5">
                    + R$ 4.296,00 economizados
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------------
          CATÁLOGO COMPLETO DE AUTOPROPELIDOS (DINÂMICO)
      ----------------------------------------------------------------- */}
      <section id="catalogo" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">
              Catálogo Oficial · Pronta Entrega
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Motos Elétricas Autopropelidas
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Modelos de alto padrão configurados estritamente na norma CONTRAN 996. Escolha a sua e saia rodando hoje.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-mono text-slate-400">
              {motos.length} modelos disponíveis para entrega imediata
            </span>
          </div>
        </div>

        {/* Grid de Cards dos Autopropelidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {motos.map((moto) => (
            <div
              key={moto.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Imagem Fotográfica Real com Hover Zoom */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src={moto.imagem_url || FOTOS_PREMIUM.chopper}
                    alt={moto.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  
                  {/* Badge Sem CNH */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <ShieldCheck className="w-3 h-3" />
                      Sem CNH
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-300 uppercase">
                      {moto.categoria || 'Autopropelida'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      1000W
                    </span>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {moto.nome}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {moto.descricao || 'Autopropelido elétrico de 1000W dispensado de emplacamento e habilitação.'}
                  </p>

                  {/* Ficha Técnica em Mini Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <BatteryCharging className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{moto.autonomia}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Gauge className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{moto.velocidade_maxima}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{moto.tempo_carga}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{moto.potencia}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rodapé do Card com Preço e Botão WhatsApp */}
              <div className="p-4 sm:p-5 pt-0">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">Preço à vista</span>
                    <span className="text-lg font-mono font-black text-emerald-400">
                      {moto.preco}
                    </span>
                  </div>
                  <button
                    onClick={() => setMotoDetalhes(moto)}
                    className="text-xs text-slate-400 hover:text-white underline font-medium"
                  >
                    Ficha Técnica
                  </button>
                </div>

                <a
                  href={gerarLinkWhatsapp(moto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Tenho Interesse</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -----------------------------------------------------------------
          FORMULÁRIO INTELIGENTE DE AGENDAMENTO DE TEST-RIDE
      ----------------------------------------------------------------- */}
      <section id="test-ride" className="py-14 sm:py-20 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block">
                Experimente a Sensação
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Agende Seu Test-Drive Gratuito
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Venha até nossa concessionária ou solicite uma demonstração assistida. Teste a aceleração silenciosa, a frenagem e o conforto de uma moto elétrica autopropelida de alto padrão.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Não precisa de CNH para realizar o Test-Ride</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Capacetes e equipamentos fornecidos na loja</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Atendimento com consultores especialistas em CONTRAN 996</span>
                </div>
              </div>
            </div>

            {/* Card com Formulário */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Preencha Seus Dados para Agendar
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Enviaremos uma mensagem instantânea para o WhatsApp oficial da concessionária confirmando seu horário.
              </p>

              <form onSubmit={handleAgendarTestRide} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      Nome Completo: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Silva"
                      value={testNome}
                      onChange={(e) => setTestNome(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      WhatsApp com DDD: *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: (11) 98765-4321"
                      value={testTelefone}
                      onChange={(e) => setTestTelefone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Modelo Desejado:
                    </label>
                    <select
                      value={testModelo}
                      onChange={(e) => setTestModelo(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">Qualquer Modelo</option>
                      {motos.map((m) => (
                        <option key={m.id} value={m.nome}>{m.nome}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Melhor Data:
                    </label>
                    <input
                      type="date"
                      value={testData}
                      onChange={(e) => setTestData(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Melhor Horário:
                    </label>
                    <select
                      value={testPeriodo}
                      onChange={(e) => setTestPeriodo(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Manhã (09h às 12h)">Manhã (09h às 12h)</option>
                      <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
                      <option value="Sábado de Manhã (09h às 14h)">Sábado (09h às 14h)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center justify-center gap-2 mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Agendar Test-Ride via WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  Ao clicar, você será direcionado ao WhatsApp com sua solicitação pré-preenchida.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SEÇÃO "ONDE ESTAMOS" (LOCALIZAÇÃO, SHOWROOM E CONTATO)
      ----------------------------------------------------------------- */}
      <section id="localizacao" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">
            Concessionária Oficial VoltMoto
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Venha Conhecer Nosso Showroom
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Estrutura premium com modelos à pronta entrega, pista segura para test-drive e oficina autorizada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card de Informações de Contato (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Endereço do Showroom</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Av. das Nações Unidas, 12.551 — Brooklin Paulista<br />
                    São Paulo - SP, CEP: 04578-903
                  </p>
                  <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
                    Próximo à Ponte Estaiada (Estacionamento gratuito no local)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Horário de Funcionamento</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Segunda a Sexta: 08:30 às 19:00<br />
                    Sábados: 09:00 às 17:00<br />
                    Domingos e Feriados: 10:00 às 14:00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Canais de Atendimento</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    WhatsApp Comercial: (11) 99999-8888<br />
                    Telefone Fixo: (11) 3210-7000<br />
                    E-mail: contato@voltmoto.com.br
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Como Chegar (Abrir no GPS / Waze / Google Maps)</span>
              </a>
            </div>

          </div>

          {/* Mapa Visual Estilizado (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative min-h-[300px] flex flex-col justify-end shadow-xl">
            
            {/* Imagem do mapa estilizado com satélite e pontos */}
            <div className="absolute inset-0 bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Mapa da Concessionária"
                className="w-full h-full object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            {/* Ponto / Pin do Showroom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-emerald-400/20 animate-ping absolute" />
                <div className="w-10 h-10 rounded-2xl bg-emerald-400 flex items-center justify-center text-slate-950 shadow-2xl font-black">
                  <Zap className="w-5 h-5 fill-slate-950" />
                </div>
              </div>
              <span className="mt-2 px-3 py-1 rounded-full bg-slate-950/90 border border-emerald-500/40 text-emerald-300 font-bold text-xs shadow-xl backdrop-blur-md">
                Showroom VoltMoto
              </span>
            </div>

            {/* Rodapé do Mapa */}
            <div className="relative p-5 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">Pista de Test-Ride no Local</span>
                <span className="text-[11px] text-slate-400">Venha tomar um café conosco e testar os modelos autopropelidos</span>
              </div>
              <a
                href={gerarLinkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chamar no WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------------
          MODAL DE FICHA TÉCNICA DETALHADA
      ----------------------------------------------------------------- */}
      {motoDetalhes && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setMotoDetalhes(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/9] bg-slate-950">
              <img
                src={motoDetalhes.imagem_url || FOTOS_PREMIUM.chopper}
                alt={motoDetalhes.nome}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  CONTRAN 996 · Autopropelido
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {motoDetalhes.nome}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {motoDetalhes.descricao}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Motor</span>
                  <span className="text-xs font-bold text-white font-mono">{motoDetalhes.potencia}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Velocidade Máx.</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">{motoDetalhes.velocidade_maxima}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Autonomia</span>
                  <span className="text-xs font-bold text-white font-mono">{motoDetalhes.autonomia}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Recarga</span>
                  <span className="text-xs font-bold text-white font-mono">{motoDetalhes.tempo_carga}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Exigência CNH</span>
                  <span className="text-xs font-bold text-emerald-400">DISPENSADO</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Emplacamento</span>
                  <span className="text-xs font-bold text-emerald-400">ISENTO</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 block">Preço Promocional:</span>
                  <span className="text-2xl font-mono font-black text-emerald-400">
                    {motoDetalhes.preco}
                  </span>
                </div>
                <a
                  href={gerarLinkWhatsapp(motoDetalhes)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar com Consultor</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------
          RODAPÉ COMPLETO
      ----------------------------------------------------------------- */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-400 flex items-center justify-center text-slate-950 font-black">
                <Zap className="w-4 h-4 fill-slate-950" />
              </div>
              <span className="text-lg font-black text-white">
                Volt<span className="text-emerald-400">Moto</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Concessionária especializada em motos e scooters elétricas autopropelidas. Veículos 100% elétricos, sustentáveis e homologados na Resolução CONTRAN 996/2023.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantia de 1 ano para bateria de lítio e motor</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
              Informações Legais
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Resolução CONTRAN 996/2023</li>
              <li>Velocidade Travada em 32 km/h</li>
              <li>Motor Elétrico até 1000W</li>
              <li>Isenção de CNH e Autoescola</li>
              <li>Isenção de Emplacamento e IPVA</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
              Atendimento e Showroom
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Segunda a Sexta: 08:30 às 19:00</li>
              <li>Sábado: 09:00 às 17:00</li>
              <li>WhatsApp: (11) 99999-8888</li>
              <li>Entrega em todo o Brasil</li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <span>© {new Date().getFullYear()} VoltMoto Autopropelidos · Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setPainelAberto(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[11px] text-slate-400 hover:text-emerald-400 font-semibold underline transition-colors flex items-center gap-1"
            >
              <Sliders className="w-3 h-3 text-emerald-400" />
              <span>Área do Lojista (Painel Administrativo)</span>
            </button>
            <span className="text-[11px] text-slate-600 hidden sm:inline">
              Mobilidade Elétrica Inteligente e Sustentável
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
