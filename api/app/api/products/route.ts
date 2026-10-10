import { NextResponse } from 'next/server';
import { PRODUCTS_DATABASE } from '@/lib/products-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const maquina = searchParams.get('maquina') || '';
  const modelo = searchParams.get('modelo') || '';
  const aplicacao = searchParams.get('aplicacao') || '';
  const tag = searchParams.get('tag') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '9', 10);
  const sort = searchParams.get('sort') || 'default';

  let filtered = [...PRODUCTS_DATABASE];

  if (search) {
    filtered = filtered.filter((p) => {
      const matchSearch =
        p.partNumber.toLowerCase().includes(search) ||
        p.codigoMega.toLowerCase().includes(search) ||
        p.title.toLowerCase().includes(search) ||
        p.maquina.toLowerCase().includes(search) ||
        p.aplicacao.toLowerCase().includes(search) ||
        p.modelos.some((m) => m.toLowerCase().includes(search));
      return matchSearch;
    });
  }

  if (maquina) {
    filtered = filtered.filter((p) => p.maquinaSlug === maquina || p.maquina.toLowerCase() === maquina.toLowerCase());
  }

  if (modelo) {
    filtered = filtered.filter((p) =>
      p.modelos.some((m) => m.toLowerCase().includes(modelo.toLowerCase()))
    );
  }

  if (aplicacao) {
    filtered = filtered.filter(
      (p) => p.aplicacaoSlug === aplicacao || p.aplicacao.toLowerCase() === aplicacao.toLowerCase()
    );
  }

  if (tag) {
    filtered = filtered.filter((p) => p.tag === tag);
  }

  if (sort === 'codigo-asc') {
    filtered.sort((a, b) => a.codigoMega.localeCompare(b.codigoMega));
  } else if (sort === 'title-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'partnumber-asc') {
    filtered.sort((a, b) => a.partNumber.localeCompare(b.partNumber));
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json(
    {
      products: paginated,
      total,
      page,
      limit,
      totalPages,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
