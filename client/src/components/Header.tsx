import React, { useState } from 'react';
import { Phone, MessageCircle, ShoppingBag, MapPin, ShieldCheck, Menu, X } from 'lucide-react';
import { ROUTE_MAP, type PageRoute } from '../router';

interface HeaderProps {
  quoteCount: number;
  onOpenQuoteDrawer: () => void;
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

const NAV_LINKS: { label: string; route: PageRoute }[] = [
  { label: 'Início', route: 'home' },
  { label: 'Sobre a Empresa', route: 'about' },
  { label: 'Catálogo de Peças', route: 'catalog' },
  { label: 'Engenharia & 3D', route: 'engineering' },
  { label: 'Segmentos', route: 'segments' },
  { label: 'Contato', route: 'contact' },
];

export const Header: React.FC<HeaderProps> = ({
  quoteCount,
  onOpenQuoteDrawer,
  currentRoute,
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="mw-header">
      {/* Top bar with company info */}
      <div className="mw-header-top">
        <div className="mw-container mw-header-top-content">
          <div className="mw-top-contact-list">
            <span className="mw-top-contact-item">
              <MapPin size={13} color="#7CD450" />
              Botucatu – SP, Brasil
            </span>
            <span className="mw-top-contact-item">
              <ShieldCheck size={13} color="#7CD450" />
              Chicotes 100% Homologados e Certificados ISO 6722-1
            </span>
          </div>

          <div className="mw-top-contact-list">
            <a href="tel:+551438131160" className="mw-top-contact-item">
              <Phone size={13} color="#7CD450" />
              (14) 3813-1160 / 3813-1127
            </a>
            <a
              href="https://wa.me/551438131160?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20chicotes%20el%C3%A9tricos"
              target="_blank"
              rel="noopener noreferrer"
              className="mw-top-contact-item"
            >
              <MessageCircle size={13} color="#7CD450" />
              WhatsApp Comercial
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mw-container mw-nav-row">
        <a
          href="/"
          className="mw-brand"
          title="Mega Whip Chicotes Elétricos - Início"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <img
            src="https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp"
            alt="Mega Whip Chicotes Elétricos"
            className="mw-logo-img"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://megawhip.com.br/wp-content/uploads/2023/07/Logo.png";
            }}
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="mw-nav-desktop" aria-label="Navegação Principal">
          <ul className="mw-nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.route}>
                <a
                  href={ROUTE_MAP[link.route]}
                  className={`mw-nav-link ${currentRoute === link.route ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.route)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="mw-header-actions">
          <button
            type="button"
            className="mw-btn-header-cta"
            onClick={() => onNavigate('contact')}
          >
            <MessageCircle size={15} />
            <span>Atendimento Comercial</span>
          </button>

          <button
            onClick={onOpenQuoteDrawer}
            className="mw-btn-cart"
            title="Ver lista de cotação"
            aria-label="Itens da cotação"
          >
            <ShoppingBag size={19} />
            {quoteCount > 0 && <span className="mw-cart-badge">{quoteCount}</span>}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mw-btn-mobile-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="mw-mobile-nav-drawer">
          <ul className="mw-mobile-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.route}>
                <a
                  href={ROUTE_MAP[link.route]}
                  className={`mw-mobile-nav-link ${currentRoute === link.route ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.route)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mw-mobile-nav-footer">
            <button
              type="button"
              className="mw-btn-header-cta"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('contact');
              }}
            >
              <MessageCircle size={16} />
              <span>Falar com o Comercial</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
