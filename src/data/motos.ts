export interface MotoEletrica {
  id: string;
  nome: string;
  categoria: 'Chopper Autopropelida' | 'Scooter Urbana Jet' | 'Fat Bike MotoChefe' | 'Retro Vintage Elétrica';
  precoFormatado: string;
  precoNumero: number;
  autonomia: string;
  autonomiaKm: number;
  velocidadeMaxima: string;
  tempoCarga: string;
  potencia: string;
  torque: string;
  capacidadeBateria: string;
  pesoKg: number;
  descricaoComercial: string;
  destaques: string[];
  seloDestaque?: string;
  corPrincipal: string;
  tipoSilhueta: 'sport' | 'naked' | 'cruiser' | 'scooter' | 'hyper';
  imagemUrl?: string;
  exigeCnh: false;
  exigeEmplacamento: false;
  regulamentacao: string;
}

export const MOTOS_ELETRICAS: MotoEletrica[] = [
  {
    id: 'voltmoto-chopper-custom-1000',
    nome: 'Volt Custom Chopper 1000W',
    categoria: 'Chopper Autopropelida',
    precoFormatado: 'R$ 11.890',
    precoNumero: 11890,
    autonomia: '55 km por carga',
    autonomiaKm: 55,
    velocidadeMaxima: '32 km/h (Limite Legal Autopropelido)',
    tempoCarga: '4 a 5 horas (Tomada Comum 110V/220V)',
    potencia: '1000W Brushless de Alto Torque',
    torque: '65 Nm instantâneo',
    capacidadeBateria: '60V 20Ah Lítio Removível',
    pesoKg: 58,
    descricaoComercial: 'Inspirada no visual clássico das choppers americanas com pneus extra largos Fat Tire. 100% autopropelida: não exige CNH, não precisa de emplacamento e está isenta de IPVA conforme a Resolução CONTRAN 996. Bateria removível para recarregar na tomada da sua sala ou escritório.',
    destaques: [
      'NÃO EXIGE CNH (Sem Habilitação)',
      'NÃO EXIGE EMPLACAMENTO (Zero Burocracia)',
      'Pneus Extra Largos Fat Tire 18x9.5"',
      'Bateria de Lítio Removível com Chave de Segurança',
      'Amortecedor Duplo Dianteiro e Traseiro Hidráulico',
      'Alarme Sonoro com Trava de Roda e Partida Remota'
    ],
    seloDestaque: 'Campeã de Vendas',
    corPrincipal: '#06b6d4',
    tipoSilhueta: 'cruiser',
    exigeCnh: false,
    exigeEmplacamento: false,
    regulamentacao: 'Resolução CONTRAN 996/2023 - Equipamento Autopropelido'
  },
  {
    id: 'voltmoto-jet-urban-1000',
    nome: 'Volt Jet Urban Flow 1000W',
    categoria: 'Scooter Urbana Jet',
    precoFormatado: 'R$ 8.990',
    precoNumero: 8990,
    autonomia: '50 km por carga',
    autonomiaKm: 50,
    velocidadeMaxima: '32 km/h (Limite Legal Autopropelido)',
    tempoCarga: '4 horas em qualquer tomada 110V/220V',
    potencia: '1000W Motor Hub Traseiro',
    torque: '55 Nm instantâneo',
    capacidadeBateria: '48V 16Ah Lítio Long Life',
    pesoKg: 46,
    descricaoComercial: 'A solução mais prática e econômica para o transporte diário nas cidades. Ágil nas ciclovias e vias urbanas secundárias. Sem necessidade de carteira de motorista nem emplacamento. Possui baú porta-objetos sob o banco e painel 100% digital com velocímetro e nível de bateria.',
    destaques: [
      'NÃO EXIGE CNH (Dispensada por Lei)',
      'NÃO EXIGE EMPLACAMENTO OU IPVA',
      'Liberada para Ciclovias e Ciclofaixas (CONTRAN 996)',
      'Baú Embutido para Mochila e Compras',
      'Farol Angel Eyes LED com Luz Diurna DRL',
      'Entrada USB para Carregar o Celular'
    ],
    seloDestaque: 'Melhor Custo-Benefício',
    corPrincipal: '#22c55e',
    tipoSilhueta: 'scooter',
    exigeCnh: false,
    exigeEmplacamento: false,
    regulamentacao: 'Resolução CONTRAN 996/2023 - Equipamento Autopropelido'
  },
  {
    id: 'voltmoto-motochefe-fat-1000',
    nome: 'Volt MotoChefe Beast 1000W',
    categoria: 'Fat Bike MotoChefe',
    precoFormatado: 'R$ 13.490',
    precoNumero: 13490,
    autonomia: '60 km por carga',
    autonomiaKm: 60,
    velocidadeMaxima: '32 km/h (Limite Legal Autopropelido)',
    tempoCarga: '5 a 6 horas (Carga Completa)',
    potencia: '1000W High Peak Torque',
    torque: '72 Nm instantâneo',
    capacidadeBateria: '60V 24Ah Lítio Premium (Maior Autonomia)',
    pesoKg: 62,
    descricaoComercial: 'O autêntico estilo MotoChefe com banco duplo para piloto e garupa, encosto confort, pedaleiras retráteis e a maior autonomia da categoria (até 60 km). Zero burocracia de trânsito: compre agora e saia pilotando na hora sem despachante nem taxas do Detran.',
    destaques: [
      'NÃO EXIGE CNH (Sem Autoescola)',
      'NÃO EXIGE EMPLACAMENTO (Sem Placa nem Taxas)',
      'Banco Duplo Confort com Encosto para Garupa',
      'Freios a Disco Hidráulicos Dianteiro e Traseiro',
      'Painel LCD Colorido de Alta Visibilidade',
      'Chave Presencial Keyless com Botão Start'
    ],
    seloDestaque: 'Maior Autonomia (60 km)',
    corPrincipal: '#0ea5e9',
    tipoSilhueta: 'naked',
    exigeCnh: false,
    exigeEmplacamento: false,
    regulamentacao: 'Resolução CONTRAN 996/2023 - Equipamento Autopropelido'
  },
  {
    id: 'voltmoto-vintage-retro-1000',
    nome: 'Volt Classic Vintage 1000W',
    categoria: 'Retro Vintage Elétrica',
    precoFormatado: 'R$ 10.490',
    precoNumero: 10490,
    autonomia: '48 km por carga',
    autonomiaKm: 48,
    velocidadeMaxima: '32 km/h (Limite Legal Autopropelido)',
    tempoCarga: '4 a 5 horas',
    potencia: '1000W Eco Silent Motor',
    torque: '58 Nm instantâneo',
    capacidadeBateria: '48V 20Ah Lítio Estojo Metálico',
    pesoKg: 50,
    descricaoComercial: 'Elegância europeia clássica combinada com a liberdade da mobilidade elétrica moderna. Perfeita para quem busca estilo refinado para ir ao trabalho, faculdade ou passeios de lazer sem se preocupar com combustível caro, multas de trânsito, CNH ou IPVA.',
    destaques: [
      'NÃO EXIGE CNH (Pilotagem Livre)',
      'NÃO EXIGE EMPLACAMENTO OU VISTORIA',
      'Acabamento em Couro Sintético Marrom Havana',
      'Cesta Dianteira Clássica Integrada',
      'Pedal Assistido Opcional e Acelerador Inteligente',
      'Silenciosa: Zero Ruído e Zero Poluição'
    ],
    seloDestaque: 'Design Exclusivo',
    corPrincipal: '#10b981',
    tipoSilhueta: 'sport',
    exigeCnh: false,
    exigeEmplacamento: false,
    regulamentacao: 'Resolução CONTRAN 996/2023 - Equipamento Autopropelido'
  }
];

export const STORAGE_KEY_MOTOS = 'voltmoto_catalogo_autopropelidos_v2';

export function obterCatalogoMotos(): MotoEletrica[] {
  if (typeof window !== 'undefined') {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY_MOTOS);
      if (salvo) {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
  }
  return MOTOS_ELETRICAS;
}

export function salvarCatalogoMotos(motos: MotoEletrica[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY_MOTOS, JSON.stringify(motos));
      window.dispatchEvent(new Event('voltmoto_catalogo_updated'));
    } catch (e) {
      console.warn('Erro ao salvar motos no localStorage', e);
    }
  }
}

export function resetarCatalogoMotos(): MotoEletrica[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY_MOTOS);
      window.dispatchEvent(new Event('voltmoto_catalogo_updated'));
    } catch (e) {
      console.warn('Erro ao resetar catálogo', e);
    }
  }
  return MOTOS_ELETRICAS;
}

export const DIFERENCIAIS = [
  {
    titulo: 'Totalmente Dispensada de CNH',
    descricao: 'Conforme a Resolução 996 do CONTRAN, motos autopropelidas de até 32 km/h e 1000W NÃO exigem Carteira Nacional de Habilitação nem ACC. Qualquer pessoa pode pilotar!',
    metrica: 'SEM CNH · LIVRE'
  },
  {
    titulo: 'Zero Emplacamento e Sem IPVA',
    descricao: 'Não precisa de placa, não passa por vistorias do Detran e você nunca mais pagará IPVA, licenciamento anual nem taxas de transferência.',
    metrica: 'SEM PLACA · 0 IPVA'
  },
  {
    titulo: 'Livre nas Ciclovias e Ruas Urbanas',
    descricao: 'Mobilidade total para escapar do trânsito parado utilizando ciclovias, ciclofaixas e ruas do bairro com total segurança e comodidade.',
    metrica: 'Ciclovias Permitidas'
  },
  {
    titulo: 'Economia Brutal: R$ 0,02 por km',
    descricao: 'Uma recarga completa consome menos de R$ 1,00 de energia elétrica e rende até 60 km. Você economiza mais de R$ 3.500 por ano comparado a uma moto a combustão.',
    metrica: 'Menos de R$ 1 / Carga'
  },
  {
    titulo: 'Bateria Removível: Recarregue na Tomada',
    descricao: 'Retire a bateria portátil com a chave de segurança e leve para recarregar no seu apartamento, sala de aula ou na mesa do escritório como se fosse um notebook.',
    metrica: 'Tomada Comum 110V/220V'
  },
  {
    titulo: 'Compre Hoje e Saia Pilotando',
    descricao: 'Sem esperar aprovação de despachante, sem filas em cartório e sem custos surpresa. A moto sai da nossa loja pronta para rodar.',
    metrica: 'Pronta-Entrega Imediata'
  }
];

export const CONTATO_CONFIG = {
  telefone: '(11) 3450-8800',
  telefoneWhatsapp: '5511999998888',
  email: 'contato@voltmoto.com.br',
  endereco: 'Avenida Europa, 780 - Jardins, São Paulo - SP',
  horario: 'Segunda a Sexta: 09h às 19h | Sábado: 09h às 16h'
};

export function formatarPrecoBRL(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(valor);
}

export function gerarLinkWhatsapp(motoNome: string, preco: string): string {
  const mensagem = encodeURIComponent(
    `Olá, equipe VoltMoto! Tenho interesse no modelo autopropelido ${motoNome} (${preco}) que NÃO EXIGE CNH NEM EMPLACAMENTO. Gostaria de saber as cores disponíveis para pronta-entrega, opções de parcelamento e agendar um test-ride sem burocracia!`
  );
  return `https://wa.me/${CONTATO_CONFIG.telefoneWhatsapp}?text=${mensagem}`;
}
