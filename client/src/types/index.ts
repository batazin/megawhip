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

export interface FilterItem {
  slug?: string;
  name: string;
  count: number;
}

export interface FiltersData {
  maquinas: FilterItem[];
  modelos: FilterItem[];
  aplicacoes: FilterItem[];
  tags: FilterItem[];
  totalProducts: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QuoteCartItem {
  product: Product;
  quantity: number;
}
