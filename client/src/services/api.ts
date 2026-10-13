import type { FiltersData, Product, ProductsResponse, QuoteCartItem } from '../types';
import { PRODUCTS_DATABASE } from '../data/products-data';

const API_BASE_URL = '/api';

// Fallback in-memory query engine for static hosting (Netlify, Vercel static, GitHub Pages)
function getLocalProducts(params: {
  search?: string;
  maquina?: string;
  modelo?: string;
  aplicacao?: string;
  tag?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): ProductsResponse {
  let list = [...PRODUCTS_DATABASE];

  if (params.search) {
    const q = params.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.codigoMega.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.modelos.some((m) => m.toLowerCase().includes(q))
    );
  }

  if (params.maquina) {
    list = list.filter((p) => p.maquinaSlug === params.maquina);
  }

  if (params.modelo) {
    list = list.filter((p) => p.modelos.includes(params.modelo!));
  }

  if (params.aplicacao) {
    list = list.filter((p) => p.aplicacaoSlug === params.aplicacao);
  }

  if (params.tag) {
    list = list.filter((p) => p.tag === params.tag);
  }

  if (params.sort === 'pn-asc') {
    list.sort((a, b) => a.partNumber.localeCompare(b.partNumber));
  } else if (params.sort === 'pn-desc') {
    list.sort((a, b) => b.partNumber.localeCompare(a.partNumber));
  } else if (params.sort === 'codigo-asc') {
    list.sort((a, b) => a.codigoMega.localeCompare(b.codigoMega));
  }

  const page = params.page || 1;
  const limit = params.limit || 12;
  const total = list.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const start = (page - 1) * limit;
  const paginated = list.slice(start, start + limit);

  return {
    products: paginated,
    total,
    page,
    limit,
    totalPages,
  };
}

function getLocalFilters(): FiltersData {
  const maquinasMap = new Map<string, { name: string; count: number }>();
  const modelosMap = new Map<string, number>();
  const aplicacoesMap = new Map<string, { name: string; count: number }>();
  const tagsMap = new Map<string, { name: string; count: number }>();

  PRODUCTS_DATABASE.forEach((p) => {
    const m = maquinasMap.get(p.maquinaSlug) || { name: p.maquina, count: 0 };
    m.count++;
    maquinasMap.set(p.maquinaSlug, m);

    p.modelos.forEach((mod) => {
      modelosMap.set(mod, (modelosMap.get(mod) || 0) + 1);
    });

    const a = aplicacoesMap.get(p.aplicacaoSlug) || { name: p.aplicacao, count: 0 };
    a.count++;
    aplicacoesMap.set(p.aplicacaoSlug, a);

    if (p.tag) {
      const t = tagsMap.get(p.tag) || { name: p.tagLabel || p.tag, count: 0 };
      t.count++;
      tagsMap.set(p.tag, t);
    }
  });

  return {
    maquinas: Array.from(maquinasMap.entries()).map(([slug, val]) => ({
      slug,
      name: val.name,
      count: val.count,
    })),
    modelos: Array.from(modelosMap.entries()).map(([name, count]) => ({
      name,
      count,
    })),
    aplicacoes: Array.from(aplicacoesMap.entries()).map(([slug, val]) => ({
      slug,
      name: val.name,
      count: val.count,
    })),
    tags: Array.from(tagsMap.entries()).map(([slug, val]) => ({
      slug,
      name: val.name,
      count: val.count,
    })),
    totalProducts: PRODUCTS_DATABASE.length,
  };
}

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
  try {
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
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // API not available, proceed to fallback
  }
  return getLocalProducts(params);
}

export async function fetchProductById(id: string): Promise<{ product: Product; relatedProducts: Product[] }> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // proceed to fallback
  }

  const product = PRODUCTS_DATABASE.find((p) => p.id === id);
  if (!product) {
    throw new Error('Produto não encontrado');
  }
  const relatedProducts = PRODUCTS_DATABASE.filter(
    (p) => p.maquinaSlug === product.maquinaSlug && p.id !== product.id
  ).slice(0, 4);

  return { product, relatedProducts };
}

export async function fetchFilters(): Promise<FiltersData> {
  try {
    const response = await fetch(`${API_BASE_URL}/filters`);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // proceed to fallback
  }
  return getLocalFilters();
}

export async function submitQuote(payload: {
  customerName: string;
  companyName?: string;
  phone: string;
  email?: string;
  notes?: string;
  items: QuoteCartItem[];
}): Promise<{ success: boolean; quoteId: string; whatsappUrl: string }> {
  try {
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

    if (response.ok) {
      return await response.json();
    }
  } catch {
    // proceed to fallback
  }

  // Local fallback: generate WhatsApp message directly
  const quoteId = `MW-${Date.now().toString(36).toUpperCase()}`;
  let message = `*SOLICITAÇÃO DE COTAÇÃO - MEGA WHIP*\n`;
  message += `📋 Protocolo: ${quoteId}\n`;
  if (payload.customerName) message += `👤 Cliente: ${payload.customerName}\n`;
  if (payload.companyName) message += `🏢 Empresa / Usina: ${payload.companyName}\n`;
  if (payload.phone) message += `📱 Contato: ${payload.phone}\n`;
  if (payload.email) message += `✉️ E-mail: ${payload.email}\n`;
  message += `\n*ITENS SOLICITADOS:*\n`;

  payload.items.forEach((item, index) => {
    message += `${index + 1}. *PN:* ${item.product.partNumber} | *Cód. Mega:* ${item.product.codigoMega} (Qtd: ${item.quantity || 1})\n   ${item.product.title}\n`;
  });

  if (payload.notes) {
    message += `\n*Observações:* ${payload.notes}\n`;
  }

  message += `\n_Mensagem gerada pelo Catálogo Digital Mega Whip_`;
  const whatsappUrl = `https://wa.me/551438131160?text=${encodeURIComponent(message)}`;

  return { success: true, quoteId, whatsappUrl };
}
