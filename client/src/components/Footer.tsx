import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Globe } from 'lucide-react';
import type { PageRoute } from '../router';

interface FooterProps {
  onNavigate?: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, route: PageRoute) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(route);
    }
  };

  return (
    <footer className="mw-footer" id="contato">
      <div className="mw-container">
        <div className="mw-footer-grid">
          {/* Brand Column */}
          <div>
            <div
              className="mw-brand"
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleNav(e, 'home')}
              title="Voltar ao início"
            >
              <img
                src="https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp"
                alt="Mega Whip Chicotes Elétricos"
                className="mw-logo-img"
              />
            </div>

            <p className="mw-footer-brand-desc">
              Fabricação e desenvolvimento especializado de Chicotes Elétricos há mais de 15 anos.
              Usando apenas componentes originais de grandes fabricantes mundiais, certificados e
              homologados sob a rigorosa norma técnica <strong>ISO 6722-1</strong>.
            </p>

            <div style={{ display: 'flex', gap: '14px', marginTop: '18px', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <Globe size={16} color="#6BB345" />
                Unidade Fabril: Botucatu – SP
              </span>
            </div>
          </div>

          {/* Segmentos */}
          <div>
            <h4 className="mw-footer-heading">Segmentos Atendidos</h4>
            <ul className="mw-footer-links">
              <li>
                <a href="/segmentos" onClick={(e) => handleNav(e, 'segments')}>
                  Usinas de Cana-de-Açúcar
                </a>
              </li>
              <li>
                <a href="/segmentos" onClick={(e) => handleNav(e, 'segments')}>
                  Mercado de Grãos (Soja/Milho)
                </a>
              </li>
              <li>
                <a href="/segmentos" onClick={(e) => handleNav(e, 'segments')}>
                  Linha Amarela & Construção
                </a>
              </li>
              <li>
                <a href="/segmentos" onClick={(e) => handleNav(e, 'segments')}>
                  Concessionárias & Frotas
                </a>
              </li>
              <li>
                <a href="/engenharia-3d" onClick={(e) => handleNav(e, 'engineering')}>
                  Engenharia & Raio-X 3D
                </a>
              </li>
            </ul>
          </div>

          {/* Produtos e Links */}
          <div>
            <h4 className="mw-footer-heading">Navegação Institucional</h4>
            <ul className="mw-footer-links">
              <li><a href="/" onClick={(e) => handleNav(e, 'home')}>Início</a></li>
              <li><a href="/sobre" onClick={(e) => handleNav(e, 'about')}>Sobre a Empresa</a></li>
              <li><a href="/catalogo" onClick={(e) => handleNav(e, 'catalog')}>Catálogo de Peças</a></li>
              <li><a href="/engenharia-3d" onClick={(e) => handleNav(e, 'engineering')}>Engenharia 3D</a></li>
              <li><a href="/segmentos" onClick={(e) => handleNav(e, 'segments')}>Segmentos</a></li>
              <li><a href="/contato" onClick={(e) => handleNav(e, 'contact')}>Fale Conosco</a></li>
            </ul>
          </div>

          {/* Contato & Localização */}
          <div>
            <h4 className="mw-footer-heading">Central de Atendimento</h4>
            <div className="mw-footer-contact-item">
              <MapPin size={16} color="#6BB345" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>
                Rua Reverendo Celso Assumpção, 344<br />
                Vila Assumpção — Botucatu – SP
              </span>
            </div>

            <div className="mw-footer-contact-item">
              <Phone size={16} color="#6BB345" style={{ flexShrink: 0 }} />
              <span>+55 (14) 3813-1160 / 3813-1127</span>
            </div>

            <div className="mw-footer-contact-item">
              <Mail size={16} color="#6BB345" style={{ flexShrink: 0 }} />
              <span>comercial@megawhip.com.br</span>
            </div>

            <div className="mw-footer-contact-item" style={{ marginTop: '16px' }}>
              <ShieldCheck size={18} color="#6BB345" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Certificação de qualidade técnica com rastreabilidade total de lote.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mw-footer-bottom">
          <div>
            © {new Date().getFullYear()} Mega Whip Chicotes Elétricos. Todos os direitos reservados.
          </div>
          <div>
            Desenvolvido com Vite (Frontend) e Next.js (APIs)
          </div>
        </div>
      </div>
    </footer>
  );
};
