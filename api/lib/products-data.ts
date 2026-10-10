export interface Product {
  id: string;
  codigoMega: string;
  partNumber: string;
  title: string;
  shortDescription: string;
  description: string;
  maquina: string;
  maquinaSlug: string;
  modelos: string[];
  aplicacao: string;
  aplicacaoSlug: string;
  tag: 'lancamento' | 'pre-venda' | null;
  tagLabel: string | null;
  norma: string;
  paisFabricacao: string;
  marca: string;
  emEstoque: boolean;
  garantiaMeses: number;
  imagens: string[];
}

export const PRODUCTS_DATABASE: Product[] = [
  {
    id: "axt22357",
    codigoMega: "76.100.183",
    partNumber: "AXT22357",
    title: "AXT22357 Chicote Elétrico da Estrutura Esquerda para Colhedora de Cana John Deere CH950 e CH960",
    shortDescription: "Essa peça se encaixa nos modelos de colheitadeira John Deere CH950 e CH960 atuando no sistema da estrutura esquerda.",
    description: "Chicote elétrico de alta durabilidade e resistência a vibrações severas e intempéries. Fabricado exclusivamente com componentes de grandes fabricantes, certificados e homologados, fiação em conformidade estrita com a norma ISO 6722-1 para operações 24/7 no setor sucroenergético.",
    maquina: "Colhedora de cana",
    maquinaSlug: "colhedora-de-cana",
    modelos: ["CH950", "CH960"],
    aplicacao: "Estrutura esquerda",
    aplicacaoSlug: "estrutura-esquerda",
    tag: "pre-venda",
    tagLabel: "Pré-venda",
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/10/76.100.183-01.webp",
      "https://megawhip.com.br/wp-content/uploads/2026/10/76.100.183-02.webp",
      "https://megawhip.com.br/wp-content/uploads/2026/10/76.100.183-03.webp",
      "https://megawhip.com.br/wp-content/uploads/2026/10/76.100.183-04.webp"
    ]
  },
  {
    id: "axt18234",
    codigoMega: "76.100.184",
    partNumber: "AXT18234",
    title: "AXT18234 Chicote Elétrico do Chassi Dianteiro para Colhedora de Cana John Deere CH950 e 960",
    shortDescription: "Chicote do chassi dianteiro projetado para suportar calor intenso, umidade e impactos mecânicos da colheita contínua.",
    description: "Chicote elétrico genuíno Mega Whip para integração frontal de chicotes de controle, sensores e iluminação das colhedoras John Deere CH950 e CH960. Conectores selados e blindagem anti-desgaste.",
    maquina: "Colhedora de cana",
    maquinaSlug: "colhedora-de-cana",
    modelos: ["CH950", "CH960"],
    aplicacao: "Chassi dianteiro",
    aplicacaoSlug: "chassi-dianteiro",
    tag: "pre-venda",
    tagLabel: "Pré-venda",
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/09/76.100.184-01.webp"
    ]
  },
  {
    id: "axe74917",
    codigoMega: "88.100.091",
    partNumber: "AXE74917",
    title: "AXE74917 Chicote elétrico do motor da contra-faca para Colheitadeira de Grãos John Deere S760 a S790",
    shortDescription: "Chicote elétrico do acionamento do motor da contra-faca para colheitadeiras de grãos da linha Série S.",
    description: "Desenvolvido para operar em ambientes com alta dispersão de poeira e vibração intensa. Conectores selados padrão IP67/IP69K contra umidade e resíduos orgânicos de grãos, mantendo a precisão da colheita.",
    maquina: "Colheitadeira de grãos",
    maquinaSlug: "colhedora-de-graos",
    modelos: ["S760", "S770", "S780", "S785", "S790"],
    aplicacao: "Motor contra-faca",
    aplicacaoSlug: "motor-contra-faca",
    tag: "lancamento",
    tagLabel: "Lançamento",
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/09/88.100.091-01.webp"
    ]
  },
  {
    id: "92208026",
    codigoMega: "71.100.140",
    partNumber: "92208026",
    title: "92208026 Chicote elétrico da Caixa de Fusível do Chassi para Colhedora de Cana Case Austoft 9000, 9900 e 9990",
    shortDescription: "Chicote central de distribuição de energia e proteção elétrica para colhedoras de cana Case IH Austoft.",
    description: "Compatibilidade plug-and-play com a central e caixa de fusíveis do chassi. Proteção antichama e isolamento térmico premium para usinas e frentes de corte pesadas sem paradas não programadas.",
    maquina: "Colhedora de cana",
    maquinaSlug: "colhedora-de-cana",
    modelos: ["AUSTOFT 9000", "AUSTOFT 9900", "AUSTOFT 9990"],
    aplicacao: "Chassi",
    aplicacaoSlug: "chassi",
    tag: "lancamento",
    tagLabel: "Lançamento",
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/09/71.100.140-01.webp"
    ]
  },
  {
    id: "re594655",
    codigoMega: "76.100.190",
    partNumber: "RE594655",
    title: "RE594655 Chicote elétrico do Distribuidor Dianteiro para Trator 8R John Deere (8235 a 8400)",
    shortDescription: "Chicote para sistema de distribuição dianteira e transmissão em tratores pesados John Deere Série 8R.",
    description: "Chicote de comando e sinalização de alta precisão. Suporta os regimes mais severos de plantio e preparo de solo sem perda de sinal de rede CAN, testado em bancada 100% eletrônica.",
    maquina: "Trator",
    maquinaSlug: "trator",
    modelos: ["8235R", "8245R", "8260R", "8270R", "8285R", "8295R", "8310R", "8320R", "8335R", "8345R", "8360R", "8370R", "8400R"],
    aplicacao: "Distribuidor",
    aplicacaoSlug: "distribuidor",
    tag: "lancamento",
    tagLabel: "Lançamento",
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/09/76.100.190-01.webp"
    ]
  },
  {
    id: "48022757",
    codigoMega: "71.100.143",
    partNumber: "48022757",
    title: "48022757 Chicote elétrico da Transmissão do Motor Trator Case Magnum e New Holland T8",
    shortDescription: "Chicote de conexão direta de transmissão e gerenciamento de tração para tratores Case Magnum e New Holland T8.",
    description: "Fiação reforçada com conduíte espiralado corrugado de alta densidade antichama, terminais selados alemães e crimpagem automatizada com controle de força e resistência ôhmica impecável.",
    maquina: "Trator",
    maquinaSlug: "trator",
    modelos: ["Magnum 250", "Magnum 260", "Magnum 280", "Magnum 290", "Magnum 310", "Magnum 315", "Magnum 340", "T8.295", "T8.320", "T8.325", "T8.350", "T8.355", "T8.380", "T8.410"],
    aplicacao: "Transmissão do motor",
    aplicacaoSlug: "transmissao-do-motor",
    tag: "lancamento",
    tagLabel: "Lançamento",
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/09/71.100.143-04.webp"
    ]
  },
  {
    id: "akk52752",
    codigoMega: "88.100.050",
    partNumber: "AKK52752",
    title: "AKK52752 Chicote elétrico estrutura central do pulverizador John Deere 4630",
    shortDescription: "Chicote de comando das seções de pulverização e sensores de estabilidade na estrutura central.",
    description: "Projetado com vedação extrema contra defensivos agrícolas corrosivos, adubação líquida e lavagens diárias de alta pressão. Cabos flexíveis classe F para movimentação de braços.",
    maquina: "Pulverizador",
    maquinaSlug: "pulverizador",
    modelos: ["4630", "4730"],
    aplicacao: "Estrutura central",
    aplicacaoSlug: "estrutura-central",
    tag: "lancamento",
    tagLabel: "Lançamento",
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2025/02/88100050-01-1024x1024.webp"
    ]
  },
  {
    id: "an401156",
    codigoMega: "76.100.112",
    partNumber: "AN401156",
    title: "AN401156 Chicote Elétrico de Monitoramento de Linhas para Plantadeira John Deere DB40 a DB90",
    shortDescription: "Chicote de distribuição de sensores de sementes e pressão hidráulica para plantadeiras John Deere DB.",
    description: "Conexão blindada com módulos de dosagem pneumática e distribuição CanBus. Resistência mecânica reforçada para flexão constante na abertura e fechamento das linhas de plantio.",
    maquina: "Plantadeira",
    maquinaSlug: "plantadeira",
    modelos: ["DB40", "DB50", "DB60", "DB74", "DB90"],
    aplicacao: "Unidades",
    aplicacaoSlug: "unidades",
    tag: null,
    tagLabel: null,
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/10/76.100.183-05.webp"
    ]
  },
  {
    id: "axe45890",
    codigoMega: "88.100.120",
    partNumber: "AXE45890",
    title: "AXE45890 Chicote Elétrico Principal do Elevador para Colhedora John Deere CH570 e CH670",
    shortDescription: "Chicote para cilindros, giro e flap do elevador de cana com proteção extrema contra atrito severo.",
    description: "Submetido a testes em dinamômetro e esteira de flexão contínua. Isolação classe T3 (-40°C a +125°C) e terminais estanhados para evitar corrosão galvânica e paradas operacionais.",
    maquina: "Colhedora de cana",
    maquinaSlug: "colhedora-de-cana",
    modelos: ["CH570", "CH670"],
    aplicacao: "Elevador",
    aplicacaoSlug: "elevador",
    tag: null,
    tagLabel: null,
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/10/76.100.183-02.webp"
    ]
  },
  {
    id: "re210543",
    codigoMega: "76.100.088",
    partNumber: "RE210543",
    title: "RE210543 Chicote de Injeção Eletrônica e Sensores do Motor Tratores John Deere 6150J a 6210J",
    shortDescription: "Chicote do bloco do motor, bicos injetores e sensores de rotação para motores PowerTech 6.8L.",
    description: "Isolamento térmico especial para montagem adjacente ao bloco de motor e coletor de escape. Conectores originais Delphi/Aptiv e Deutsch certificados.",
    maquina: "Trator",
    maquinaSlug: "trator",
    modelos: ["6150J", "6165J", "6180J", "6205J", "6210J"],
    aplicacao: "Motor",
    aplicacaoSlug: "motor",
    tag: "lancamento",
    tagLabel: "Lançamento",
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/09/76.100.190-01.webp"
    ]
  },
  {
    id: "kk489210",
    codigoMega: "79.100.035",
    partNumber: "KK489210",
    title: "KK489210 Chicote Elétrico Módulo de Controle para Colhedora de Algodão John Deere CP690 e CP770",
    shortDescription: "Chicote de interligação da cabine com as unidades de colheita Pro-16 em colhedoras de algodão.",
    description: "Chicote de alta condutividade e imunidade a interferências eletromagnéticas para enfardadoras cilíndricas de algodão John Deere CP690 e CP770.",
    maquina: "Colhedora de algodão",
    maquinaSlug: "colhedora-de-algodao",
    modelos: ["CP690", "CP770", "CP7760"],
    aplicacao: "Unidades pro-16",
    aplicacaoSlug: "unidades-pro-16",
    tag: "pre-venda",
    tagLabel: "Pré-venda",
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/09/71.100.140-01.webp"
    ]
  },
  {
    id: "nh874521",
    codigoMega: "73.100.062",
    partNumber: "87452109",
    title: "87452109 Chicote Elétrico do Console e Apoio de Braço para Tratores Puma 140 a Puma 230",
    shortDescription: "Chicote ergonômico interno de comandos joystick, acelerador eletrônico e controle de válvulas remotas.",
    description: "Projetado para perfeito encaixe no console lateral da cabine sem folgas ou tensões mecânicas nos conectores. Pinos banhados a ouro para sinal analógico e digital estável.",
    maquina: "Trator",
    maquinaSlug: "trator",
    modelos: ["Puma 140", "Puma 155", "Puma 165", "Puma 180", "Puma 195", "Puma 200", "Puma 215", "Puma 230"],
    aplicacao: "Console e apoio do braço",
    aplicacaoSlug: "console-e-apoio-do-braco",
    tag: null,
    tagLabel: null,
    norma: "ISO 6722-1",
    paisFabricacao: "Brasil",
    marca: "Mega Whip",
    emEstoque: true,
    garantiaMeses: 12,
    imagens: [
      "https://megawhip.com.br/wp-content/uploads/2026/09/71.100.143-04.webp"
    ]
  }
];
