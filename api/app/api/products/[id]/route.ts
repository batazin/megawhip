import { NextResponse } from 'next/server';
import { PRODUCTS_DATABASE } from '@/lib/products-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = PRODUCTS_DATABASE.find(
    (p) =>
      p.id.toLowerCase() === id.toLowerCase() ||
      p.partNumber.toLowerCase() === id.toLowerCase() ||
      p.codigoMega.replace(/\./g, '') === id.replace(/\./g, '')
  );

  if (!product) {
    return NextResponse.json(
      { error: 'Produto não encontrado' },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // Get related products (same machine or same application)
  const relatedProducts = PRODUCTS_DATABASE.filter(
    (p) => p.id !== product.id && (p.maquinaSlug === product.maquinaSlug || p.aplicacaoSlug === product.aplicacaoSlug)
  ).slice(0, 4);

  return NextResponse.json(
    {
      product,
      relatedProducts,
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
