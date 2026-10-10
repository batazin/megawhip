import React from 'react';
import { Phone, MessageCircle, ShoppingBag, MapPin, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  quoteCount: number;
  onOpenQuoteDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ quoteCount, onOpenQuoteDrawer }) => {
  return (
    <header className="mw-header">
      {/* Top bar with company info */}
      <div className="mw-header-top">
        <div className="mw-container mw-header-top-content">
          <div className="mw-top-contact-list">
            <span className="mw-top-contact-item">
              <MapPin size={13} color="#6BB345" />
              Botucatu – SP, Brasil
            </span>
            <span className="mw-top-contact-item">
              <ShieldCheck size={13} color="#6BB345" />
              Chicotes 100% Homologados e Certificados ISO 6722-1
            </span>
          </div>

          <div className="mw-top-contact-list">
            <a href="tel:+551438131160" className="mw-top-contact-item">
              <Phone size={13} color="#6BB345" />
              (14) 3813-1160 / 3813-1127
            </a>
            <a
              href="https://wa.me/551438131160?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20chicotes%20el%C3%A9tricos"
              target="_blank"
              rel="noopener noreferrer"
              className="mw-top-contact-item"
            >
              <MessageCircle size={13} color="#6BB345" />
              WhatsApp Comercial
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mw-container mw-nav-row">
        <a href="/" className="mw-brand">
          <img
            src="https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp"
            alt="Mega Whip Chicotes Elétricos"
            className="mw-logo-img"
            onError={(e) => {
              // fallback if remote logo block
              (e.currentTarget as HTMLImageElement).src = "https://megawhip.com.br/wp-content/uploads/2023/07/Logo.png";
            }}
          />
          <div className="mw-brand-title">
            <div className="mw-brand-name">
              MEGA<span>WHIP</span>
            </div>
            <div className="mw-brand-tagline">Chicotes Elétricos</div>
          </div>
        </a>

        <ul className="mw-nav-links">
          <li>
            <a href="https://megawhip.com.br/" className="mw-nav-link" target="_blank" rel="noreferrer">
              Início
            </a>
          </li>
          <li>
            <a href="#catalogo" className="mw-nav-link active">
              Catálogo
            </a>
          </li>
          <li>
            <a href="https://megawhip.com.br/sobre-nos/" className="mw-nav-link" target="_blank" rel="noreferrer">
              Sobre Nós
            </a>
          </li>
          <li>
            <a href="https://megawhip.com.br/chicotes-eletricos-para-maquinas-agricolas/" className="mw-nav-link" target="_blank" rel="noreferrer">
              Segmentos
            </a>
          </li>
          <li>
            <a href="https://megawhip.com.br/contato/" className="mw-nav-link" target="_blank" rel="noreferrer">
              Contato
            </a>
          </li>
        </ul>

        <div className="mw-header-actions">
          <a
            href="https://wa.me/551438131160?text=Ol%C3%A1%2C%20vim%20pelo%20Cat%C3%A1logo%20e%20gostaria%20de%20um%20or%C3%A7amento."
            target="_blank"
            rel="noopener noreferrer"
            className="mw-btn-whatsapp-pill"
          >
            <MessageCircle size={16} />
            <span>Falar com Especialista</span>
          </a>

          <button
            onClick={onOpenQuoteDrawer}
            className="mw-btn-cart"
            title="Ver itens da cotação"
            aria-label="Itens da cotação"
          >
            <ShoppingBag size={20} />
            {quoteCount > 0 && <span className="mw-cart-badge">{quoteCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};
