import React, { useState } from 'react';
import { X, Trash2, Send, ShoppingBag, Plus, Minus, CheckCircle } from 'lucide-react';
import type { QuoteCartItem } from '../types';
import { submitQuote } from '../services/api';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteCartItem[];
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ quoteId: string; whatsappUrl: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const res = await submitQuote({
        customerName: customerName.trim() || 'Cliente Catálogo',
        companyName: companyName.trim(),
        phone: phone.trim() || 'Não informado',
        notes: notes.trim(),
        items,
      });

      setSuccessInfo({ quoteId: res.quoteId, whatsappUrl: res.whatsappUrl });
      // Open WhatsApp automatically
      window.open(res.whatsappUrl, '_blank');
      onClearCart();
    } catch {
      // Fallback: generate client-side WhatsApp link if API is unavailable
      let msg = `*SOLICITAÇÃO DE COTAÇÃO - MEGA WHIP*\n`;
      if (customerName) msg += `Cliente: ${customerName}\n`;
      if (companyName) msg += `Empresa/Usina: ${companyName}\n`;
      msg += `\n*ITENS:*\n`;
      items.forEach((it, i) => {
        msg += `${i + 1}. PN: ${it.product.partNumber} | Mega: ${it.product.codigoMega} (Qtd: ${it.quantity})\n`;
      });
      const fallbackUrl = `https://wa.me/551438131160?text=${encodeURIComponent(msg)}`;
      window.open(fallbackUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mw-drawer-backdrop" onClick={onClose}>
      <aside className="mw-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="mw-drawer-header">
          <div className="mw-drawer-title">
            <ShoppingBag size={20} color="#6BB345" />
            <span>Itens para Cotação ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
          </div>
          <button className="mw-modal-close-btn" onClick={onClose} style={{ position: 'static' }}>
            <X size={18} />
          </button>
        </div>

        <div className="mw-drawer-content">
          {successInfo ? (
            <div style={{ textAlign: 'center', padding: '36px 12px' }}>
              <CheckCircle size={56} color="#6BB345" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '8px' }}>
                Cotação Gerada com Sucesso!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                Protocolo: <strong>{successInfo.quoteId}</strong>
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px' }}>
                Sua janela do WhatsApp foi aberta com os códigos dos chicotes selecionados.
              </p>
              <a
                href={successInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mw-btn-submit-quote"
              >
                Abrir WhatsApp Novamente
              </a>
              <button
                onClick={() => setSuccessInfo(null)}
                style={{
                  marginTop: '12px',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  textDecoration: 'underline',
                }}
              >
                Nova Cotação
              </button>
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 12px', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
              <p style={{ fontSize: '15px', color: '#fff', fontWeight: 600, marginBottom: '6px' }}>
                Sua lista de cotação está vazia
              </p>
              <p style={{ fontSize: '13px' }}>
                Navegue pelo catálogo e clique no botão <strong>+</strong> para adicionar chicotes para orçamento em lote.
              </p>
            </div>
          ) : (
            <div className="mw-drawer-items-list">
              {items.map((item) => (
                <div key={item.product.id} className="mw-drawer-item">
                  <img
                    src={item.product.imagens[0] || 'https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp'}
                    alt={item.product.title}
                    className="mw-drawer-item-img"
                  />
                  <div className="mw-drawer-item-info">
                    <h4 className="mw-drawer-item-title">{item.product.title}</h4>
                    <div className="mw-drawer-item-code">
                      PN: {item.product.partNumber} | Mega: {item.product.codigoMega}
                    </div>
                  </div>

                  <div className="mw-drawer-qty-control">
                    <button
                      className="mw-qty-btn"
                      onClick={() => onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="mw-qty-val">{item.quantity}</span>
                    <button
                      className="mw-qty-btn"
                      onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    style={{ color: 'var(--text-muted)', padding: '6px' }}
                    title="Remover item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && !successInfo && (
          <div className="mw-drawer-footer">
            <form onSubmit={handleSubmitQuote} className="mw-quote-form">
              <input
                type="text"
                placeholder="Seu Nome / Responsável *"
                required
                className="mw-input-field"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Empresa, Usina ou Fazenda"
                className="mw-input-field"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="WhatsApp ou Telefone com DDD *"
                required
                className="mw-input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                placeholder="Observações adicionais ou urgência..."
                rows={2}
                className="mw-input-field"
                style={{ resize: 'none' }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <button
                type="submit"
                className="mw-btn-submit-quote"
                disabled={isSubmitting}
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Gerando Cotação...' : 'Enviar Cotação para WhatsApp da Fábrica'}</span>
              </button>
            </form>
          </div>
        )}
      </aside>
    </div>
  );
};
