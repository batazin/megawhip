import { NextResponse } from 'next/server';
import { PRODUCTS_DATABASE } from '@/lib/products-data';

export async function GET() {
  const maquinasMap = new Map<string, { slug: string; name: string; count: number }>();
  const modelosMap = new Map<string, { name: string; count: number }>();
  const aplicacoesMap = new Map<string, { slug: string; name: string; count: number }>();
  const tagsMap = new Map<string, { slug: string; name: string; count: number }>();

  PRODUCTS_DATABASE.forEach((p) => {
    // Máquinas
    const currentM = maquinasMap.get(p.maquinaSlug) || { slug: p.maquinaSlug, name: p.maquina, count: 0 };
    currentM.count++;
    maquinasMap.set(p.maquinaSlug, currentM);

    // Modelos
    p.modelos.forEach((m) => {
      const currentMod = modelosMap.get(m) || { name: m, count: 0 };
      currentMod.count++;
      modelosMap.set(m, currentMod);
    });

    // Aplicações
    const currentA = aplicacoesMap.get(p.aplicacaoSlug) || { slug: p.aplicacaoSlug, name: p.aplicacao, count: 0 };
    currentA.count++;
    aplicacoesMap.set(p.aplicacaoSlug, currentA);

    // Tags
    if (p.tag) {
      const currentT = tagsMap.get(p.tag) || { slug: p.tag, name: p.tagLabel || p.tag, count: 0 };
      currentT.count++;
      tagsMap.set(p.tag, currentT);
    }
  });

  return NextResponse.json(
    {
      maquinas: Array.from(maquinasMap.values()).sort((a, b) => b.count - a.count),
      modelos: Array.from(modelosMap.values()).sort((a, b) => b.count - a.count),
      aplicacoes: Array.from(aplicacoesMap.values()).sort((a, b) => b.count - a.count),
      tags: Array.from(tagsMap.values()),
      totalProducts: PRODUCTS_DATABASE.length,
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
