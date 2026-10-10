export interface HarvesterHotspot {
  id: string;
  name: string;
  subsystem: string;
  position3D: [number, number, number]; // [x, y, z] Three.js coordinates
  x2D: number; // percentage from left for 2D schematic
  y2D: number; // percentage from top for 2D schematic
  photoX: number; // percentage from left on real photograph
  photoY: number; // percentage from top on real photograph
  productCode: string;
  codigoMega: string;
  partNumber: string;
  fotoChicote: string;
  norma: string;
  descricao: string;
  marcas: {
    nome: string;
    logoColor: string;
    modelos: string[];
  }[];
}

export const HARVESTER_HOTSPOTS: HarvesterHotspot[] = [
  {
    id: 'corte-base',
    name: 'Plataforma Draper & Carretel Frontal',
    subsystem: 'Plataforma Draper 740FD & Navalhas de Corte',
    position3D: [3.59, 2.05, 0.15],
    x2D: 22,
    y2D: 72,
    photoX: 20,
    photoY: 72,
    productCode: 'AXE74917',
    codigoMega: '88.100.091',
    partNumber: 'AXE74917',
    fotoChicote: 'https://megawhip.com.br/wp-content/uploads/2026/09/88.100.091-01.webp',
    norma: 'ISO 6722-1 (Classe T3)',
    descricao:
      'Chicote dos sensores de altura, flutuação e rotação do carretel da plataforma Draper 740FD. Conduíte com blindagem eletromagnética e proteção contra poeira e impacto constante de restolho.',
    marcas: [
      {
        nome: 'John Deere',
        logoColor: '#367C2B',
        modelos: ['S760', 'S770', 'S780', 'S790', 'Plataformas 700FD / 600FD'],
      },
      {
        nome: 'Case IH',
        logoColor: '#A6192E',
        modelos: ['Axial-Flow 7250', 'Axial-Flow 8250', 'Axial-Flow 9250'],
      },
    ],
  },
  {
    id: 'chassi-dianteiro',
    name: 'Garganta Alimentadora & Eixo Dianteiro',
    subsystem: 'Transdutores de Direção, Tração e Controle de Linha',
    position3D: [1.80, 1.75, 0.15],
    x2D: 35,
    y2D: 56,
    photoX: 35,
    photoY: 68,
    productCode: 'AXT18234',
    codigoMega: '76.100.184',
    partNumber: 'AXT18234',
    fotoChicote: 'https://megawhip.com.br/wp-content/uploads/2026/09/76.100.184-01.webp',
    norma: 'ISO 6722-1',
    descricao:
      'Interligação de sinal de transdutores de esterçamento, velocidade de avanço e piloto automático integrado. Possui conectores herméticos Deutsch DT com vedação IP68 para suportar lavagens sob pressão.',
    marcas: [
      {
        nome: 'John Deere',
        logoColor: '#367C2B',
        modelos: ['S790', 'S780', 'S770', 'CH570', 'CH950'],
      },
      {
        nome: 'Case IH',
        logoColor: '#A6192E',
        modelos: ['Axial-Flow 8250', 'Axial-Flow 9250'],
      },
    ],
  },
  {
    id: 'bloco-motor',
    name: 'Motor PowerTech 13.5L & Injeção Eletrônica',
    subsystem: 'Trem de Força e Injeção Diesel Common Rail (ECU)',
    position3D: [-1.35, 2.9, 1.05],
    x2D: 52,
    y2D: 44,
    photoX: 70,
    photoY: 52,
    productCode: 'RE210543',
    codigoMega: '76.100.088',
    partNumber: 'RE210543',
    fotoChicote: 'https://megawhip.com.br/wp-content/uploads/2026/09/76.100.190-01.webp',
    norma: 'ISO 6722-1 (Antichama)',
    descricao:
      'Chicote de alimentação dos bicos injetores piezoelétricos, sensor de trilho Common Rail, sensores CKP e CMP. Camada térmica externa em fibra de vidro para suportar a irradiação do turbocompressor.',
    marcas: [
      {
        nome: 'John Deere (PowerTech 9.0L / 13.5L)',
        logoColor: '#367C2B',
        modelos: ['S770', 'S780', 'S790', 'CH570', 'CH670'],
      },
      {
        nome: 'FPT / Case IH (Cursor 11 / 13 / 16)',
        logoColor: '#A6192E',
        modelos: ['Axial-Flow 9250', 'Magnum 380', 'Steiger 540'],
      },
    ],
  },
  {
    id: 'estrutura-esquerda',
    name: 'Central Hidráulica & Eletroválvulas',
    subsystem: 'Bloco de Válvulas Proporcionais e Fluxo Hidráulico',
    position3D: [-0.35, 1.6, 1.45],
    x2D: 64,
    y2D: 62,
    photoX: 52,
    photoY: 62,
    productCode: 'AXT22357',
    codigoMega: '76.100.183',
    partNumber: 'AXT22357',
    fotoChicote: 'https://megawhip.com.br/wp-content/uploads/2026/10/76.100.183-01.webp',
    norma: 'ISO 6722-1',
    descricao:
      'Gerenciamento elétrico das solenoides dos cilindros de inclinação da plataforma, divisão de óleo da esteira e atuadores do picador. Conduíte corrugado flexível PA66 resistente a hidrocarbonetos.',
    marcas: [
      {
        nome: 'John Deere',
        logoColor: '#367C2B',
        modelos: ['S760 a S790', 'CH950'],
      },
      {
        nome: 'Case IH',
        logoColor: '#A6192E',
        modelos: ['Axial-Flow 7250 / 8250 / 9250'],
      },
    ],
  },
  {
    id: 'caixa-fusiveis',
    name: 'Cabine CommandARM & Central Elétrica',
    subsystem: 'Distribuição Principal de Energia e Barramento CanBus',
    position3D: [1.01, 3.25, 0.15],
    x2D: 44,
    y2D: 28,
    photoX: 34,
    photoY: 42,
    productCode: '92208026',
    codigoMega: '71.100.140',
    partNumber: '92208026',
    fotoChicote: 'https://megawhip.com.br/wp-content/uploads/2026/09/71.100.140-01.webp',
    norma: 'ISO 6722-1',
    descricao:
      'Chicote mestre de barramento interligando a caixa de relés, display touchscreen GreenStar/CommandARM, faróis LED de teto e receptor GPS StarFire de piloto automático.',
    marcas: [
      {
        nome: 'John Deere',
        logoColor: '#367C2B',
        modelos: ['S770', 'S780', 'S790', 'Tratores 8R e 9R'],
      },
      {
        nome: 'Case IH',
        logoColor: '#A6192E',
        modelos: ['AFS Pro 700/1200', 'Magnum', 'Axial-Flow'],
      },
      {
        nome: 'New Holland',
        logoColor: '#002B49',
        modelos: ['CR8.90', 'CR9.90', 'CR10.90'],
      },
    ],
  },
  {
    id: 'elevador-descarga',
    name: 'Tubo de Descarga de Grãos (7m)',
    subsystem: 'Braço Articulado de Descarga no Caminhão / Transbordo',
    position3D: [-2.62, 3.55, -2.45],
    x2D: 82,
    y2D: 35,
    photoX: 78,
    photoY: 34,
    productCode: 'AXE45890',
    codigoMega: '88.100.120',
    partNumber: 'AXE45890',
    fotoChicote: 'https://megawhip.com.br/wp-content/uploads/2026/10/76.100.183-02.webp',
    norma: 'ISO 6722-1 (Flexão Contínua)',
    descricao:
      'Chicote de sinal e potência para o motor elétrico de giro do tubo, iluminação da bica de descarga e sensor de fluxo de grãos na caçamba. Desenvolvido para suportar flexão contínua em abertura e fechamento.',
    marcas: [
      {
        nome: 'John Deere',
        logoColor: '#367C2B',
        modelos: ['S760', 'S770', 'S780', 'S790'],
      },
      {
        nome: 'Case IH',
        logoColor: '#A6192E',
        modelos: ['Axial-Flow 8250', 'Axial-Flow 9250'],
      },
    ],
  },
];
