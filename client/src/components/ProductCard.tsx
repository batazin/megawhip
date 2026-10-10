import React from 'react';
import { Eye, Plus, Check, MessageSquare } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  isInQuoteCart: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToQuote,
  isInQuoteCart,
}) => {
  const mainImage = product.imagens && product.imagens.length > 0
    ? product.imagens[0]
    : 'https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp';

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no chicote elétrico:\nPN: ${product.partNumber} | Código Mega: ${product.codigoMega}\n${product.title}\nPoderia me enviar um orçamento?`
  );

  return (
    <article className="mw-product-card">
      {/* Media container */}
      <div className="mw-card-media" onClick={() => onOpenDetails(product)} style={{ cursor: 'pointer' }}>
        {product.tag && (
          <span className={`mw-badge-status ${product.tag}`}>
            {product.tagLabel || (product.tag === 'lancamento' ? 'Lançamento' : 'Pré-venda')}
          </span>
        )}
        <img
          src={mainImage}
          alt={product.title}
          className="mw-card-img"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp';
          }}
        />
      </div>

      {/* Body content */}
      <div className="mw-card-body">
        <div className="mw-card-codes">
          <span className="mw-code-tag mega-code" title="Código de Fabricação Mega Whip">
            MW {product.codigoMega}
          </span>
          <span className="mw-code-tag" title="Part Number Original">
            PN {product.partNumber}
          </span>
        </div>

        <h3
          className="mw-card-title"
          onClick={() => onOpenDetails(product)}
          style={{ cursor: 'pointer' }}
          title={product.title}
        >
          {product.title}
        </h3>

        <p className="mw-card-desc">{product.shortDescription}</p>

        {/* Specs tags */}
        <div className="mw-card-specs-row">
          <span className="mw-card-spec-item">
            🚜 {product.maquina}
          </span>
          <span className="mw-card-spec-item">
            ⚡ {product.aplicacao}
          </span>
          {product.modelos && product.modelos.length > 0 && (
            <span className="mw-card-spec-item">
              🔧 {product.modelos.slice(0, 2).join(', ')}
              {product.modelos.length > 2 && ` +${product.modelos.length - 2}`}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="mw-card-actions">
          <button
            className="mw-btn-details"
            onClick={() => onOpenDetails(product)}
          >
            <Eye size={15} />
            <span>Ver Ficha Técnica</span>
          </button>

          <button
            className={`mw-btn-add-quote ${isInQuoteCart ? 'active' : ''}`}
            onClick={() => onAddToQuote(product)}
            title={isInQuoteCart ? 'Item já está na cotação' : 'Adicionar ao carrinho de cotação'}
            style={
              isInQuoteCart
                ? { background: 'var(--mw-green-primary)', color: '#fff' }
                : {}
            }
          >
            {isInQuoteCart ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>

        {/* Fast WhatsApp direct link */}
        <div style={{ marginTop: '10px' }}>
          <a
            href={`https://wa.me/551438131160?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              padding: '6px 0',
              borderRadius: 'var(--radius-sm)',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#6BB345')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
          >
            <MessageSquare size={13} />
            Cotar este item via WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
};
