import React, { useState } from 'react';
import { X, MessageCircle, Plus, Check, Shield, FileCheck, Layers, Wrench } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
  isInQuoteCart: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  isInQuoteCart,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const currentImage =
    product.imagens && product.imagens.length > 0
      ? product.imagens[activeImageIndex] || product.imagens[0]
      : 'https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp';

  const whatsappMessage = encodeURIComponent(
    `Olá equipe Mega Whip! Gostaria de cotar o seguinte item:\n*Part Number:* ${product.partNumber}\n*Código Mega:* ${product.codigoMega}\n*Aplicação:* ${product.aplicacao}\n*Máquina:* ${product.maquina}\n${product.title}\nPor favor, enviem prazo e disponibilidade.`
  );

  return (
    <div className="mw-modal-backdrop" onClick={onClose}>
      <div className="mw-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="mw-modal-close-btn"
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          <X size={20} />
        </button>

        <div className="mw-modal-grid">
          {/* Gallery */}
          <div className="mw-modal-gallery">
            <div className="mw-modal-main-img-wrap">
              {product.tag && (
                <span className={`mw-badge-status ${product.tag}`}>
                  {product.tagLabel || (product.tag === 'lancamento' ? 'Lançamento' : 'Pré-venda')}
                </span>
              )}
              <img
                src={currentImage}
                alt={product.title}
                className="mw-modal-main-img"
              />
            </div>

            {product.imagens && product.imagens.length > 1 && (
              <div className="mw-gallery-thumbs">
                {product.imagens.map((img, idx) => (
                  <button
                    key={idx}
                    className={`mw-gallery-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="mw-gallery-thumb-img"
                    />
                  </button>
                ))}
              </div>
            )}

            <div
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                textAlign: 'center',
                marginTop: '4px',
              }}
            >
              Passe o mouse sobre a foto para ampliar os detalhes do chicote
            </div>
          </div>

          {/* Details */}
          <div className="mw-modal-details">
            <div className="mw-card-codes">
              <span className="mw-code-tag mega-code">
                Código Mega: {product.codigoMega}
              </span>
              <span className="mw-code-tag">
                PN Original: {product.partNumber}
              </span>
              <span className="mw-code-tag" style={{ color: '#fff' }}>
                {product.marca}
              </span>
            </div>

            <h2 className="mw-modal-title">{product.title}</h2>

            <p className="mw-modal-description">{product.description}</p>

            {/* Specifications table */}
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--text-highlight)',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <FileCheck size={16} />
              Especificações Técnicas Oficiais
            </h4>

            <table className="mw-specs-table">
              <tbody>
                <tr>
                  <td className="label">Código Original / Part Number:</td>
                  <td className="val">{product.partNumber}</td>
                </tr>
                <tr>
                  <td className="label">Código Mega Whip:</td>
                  <td className="val">{product.codigoMega}</td>
                </tr>
                <tr>
                  <td className="label">Norma dos Cabos:</td>
                  <td className="val">
                    <span style={{ color: '#6BB345' }}>{product.norma}</span> (Resistente a calor e abrasão)
                  </td>
                </tr>
                <tr>
                  <td className="label">Máquina Agrícola:</td>
                  <td className="val">{product.maquina}</td>
                </tr>
                <tr>
                  <td className="label">Modelos Compatíveis:</td>
                  <td className="val">{product.modelos.join(', ')}</td>
                </tr>
                <tr>
                  <td className="label">Aplicação / Sistema:</td>
                  <td className="val">{product.aplicacao}</td>
                </tr>
                <tr>
                  <td className="label">País de Fabricação:</td>
                  <td className="val">{product.paisFabricacao} (Fábrica Botucatu - SP)</td>
                </tr>
                <tr>
                  <td className="label">Garantia de Fábrica:</td>
                  <td className="val">{product.garantiaMeses} Meses</td>
                </tr>
              </tbody>
            </table>

            {/* Badges of trust */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  background: 'var(--bg-input)',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <Shield size={16} color="#6BB345" style={{ margin: '0 auto 4px' }} />
                100% Homologado
              </div>
              <div
                style={{
                  background: 'var(--bg-input)',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <Layers size={16} color="#6BB345" style={{ margin: '0 auto 4px' }} />
                Componentes Genuínos
              </div>
              <div
                style={{
                  background: 'var(--bg-input)',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <Wrench size={16} color="#6BB345" style={{ margin: '0 auto 4px' }} />
                Plug & Play Direto
              </div>
            </div>

            {/* Action buttons */}
            <div className="mw-modal-actions">
              <a
                href={`https://wa.me/551438131160?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mw-btn-whatsapp-quote"
              >
                <MessageCircle size={18} />
                <span>Cotar Agora via WhatsApp</span>
              </a>

              <button
                className="mw-btn-modal-add-cart"
                onClick={() => onAddToQuote(product)}
              >
                {isInQuoteCart ? (
                  <>
                    <Check size={18} color="#6BB345" />
                    <span>Item Adicionado</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>Adicionar à Cotação</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
