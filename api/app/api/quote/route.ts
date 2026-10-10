import { NextResponse } from 'next/server';

interface QuoteItem {
  id: string;
  codigoMega: string;
  partNumber: string;
  title: string;
  quantity: number;
}

interface QuoteRequest {
  customerName: string;
  companyName?: string;
  phone: string;
  email?: string;
  notes?: string;
  items: QuoteItem[];
}

export async function POST(request: Request) {
  try {
    const body: QuoteRequest = await request.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'A lista de produtos para cotação está vazia.' },
        { status: 400 }
      );
    }

    const quoteId = `MW-${Date.now().toString(36).toUpperCase()}`;

    // Format WhatsApp message
    let message = `*SOLICITAÇÃO DE COTAÇÃO - MEGA WHIP*\n`;
    message += `📋 Protocolo: ${quoteId}\n`;
    if (body.customerName) message += `👤 Cliente: ${body.customerName}\n`;
    if (body.companyName) message += `🏢 Empresa / Usina: ${body.companyName}\n`;
    if (body.phone) message += `📱 Contato: ${body.phone}\n`;
    if (body.email) message += `✉️ E-mail: ${body.email}\n`;
    message += `\n*ITENS SOLICITADOS:*\n`;

    body.items.forEach((item, index) => {
      message += `${index + 1}. *PN:* ${item.partNumber} | *Cód. Mega:* ${item.codigoMega} (Qtd: ${item.quantity || 1})\n   ${item.title}\n`;
    });

    if (body.notes) {
      message += `\n*Observações:* ${body.notes}\n`;
    }

    message += `\n_Mensagem gerada pelo Catálogo Digital Mega Whip_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '551438131160'; // Official Mega Whip number from site
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return NextResponse.json(
      {
        success: true,
        quoteId,
        whatsappUrl,
        messageSummary: message,
        createdAt: new Date().toISOString(),
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Erro ao processar cotação.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
