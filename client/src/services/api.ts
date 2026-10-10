import type { FiltersData, Product, ProductsResponse, QuoteCartItem } from '../types';

const API_BASE_URL = '/api';

export async function fetchProducts(params: {
  search?: string;
  maquina?: string;
  modelo?: string;
  aplicacao?: string;
  tag?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const query = new URLSearchParams();

  if (params.search) query.append('search', params.search);
  if (params.maquina) query.append('maquina', params.maquina);
  if (params.modelo) query.append('modelo', params.modelo);
  if (params.aplicacao) query.append('aplicacao', params.aplicacao);
  if (params.tag) query.append('tag', params.tag);
  if (params.sort) query.append('sort', params.sort);
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());

  const response = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
  if (!response.ok) {
    throw new Error('Falha ao carregar produtos');
  }
  return response.json();
}

export async function fetchProductById(id: string): Promise<{ product: Product; relatedProducts: Product[] }> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Produto não encontrado');
  }
  return response.json();
}

export async function fetchFilters(): Promise<FiltersData> {
  const response = await fetch(`${API_BASE_URL}/filters`);
  if (!response.ok) {
    throw new Error('Falha ao carregar filtros');
  }
  return response.json();
}

export async function submitQuote(payload: {
  customerName: string;
  companyName?: string;
  phone: string;
  email?: string;
  notes?: string;
  items: QuoteCartItem[];
}): Promise<{ success: boolean; quoteId: string; whatsappUrl: string }> {
  const formattedItems = payload.items.map((i) => ({
    id: i.product.id,
    codigoMega: i.product.codigoMega,
    partNumber: i.product.partNumber,
    title: i.product.title,
    quantity: i.quantity,
  }));

  const response = await fetch(`${API_BASE_URL}/quote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerName: payload.customerName,
      companyName: payload.companyName,
      phone: payload.phone,
      email: payload.email,
      notes: payload.notes,
      items: formattedItems,
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar cotação');
  }
  return response.json();
}
