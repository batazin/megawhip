import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mw-footer">
      <div className="mw-container">
        <div className="mw-footer-grid">
          {/* Brand Column */}
          <div>
            <div className="mw-brand">
              <img
                src="https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp"
                alt="Mega Whip Chicotes Elétricos"
                className="mw-logo-img"
              />
              <div className="mw-brand-title">
                <div className="mw-brand-name">
                  MEGA<span>WHIP</span>
                </div>
                <div className="mw-brand-tagline">Chicotes Elétricos</div>
              </div>
            </div>

            <p className="mw-footer-brand-desc">
              Fabricação e desenvolvimento especializado de Chicotes Elétricos há mais de 15 anos.
              Usando apenas componentes originais de grandes fabricantes mundiais, certificados e
              homologados sob a rigorosa norma técnica <strong>ISO 6722-1</strong>.
            </p>

            <div style={{ display: 'flex', gap: '14px', marginTop: '18px', alignItems: 'center' }}>
              <a
                href="https://megawhip.com.br"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
                aria-label="Website Oficial"
              >
                <Globe size={16} color="#6BB345" />
                megawhip.com.br
              </a>
              <a
                href="https://lp.megawhip.com.br/link-bio"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
                aria-label="Canais Oficiais"
              >
                <Share2 size={16} color="#6BB345" />
                Redes Sociais
              </a>
            </div>
          </div>

          {/* Segmentos */}
          <div>
            <h4 className="mw-footer-heading">Segmentos Atendidos</h4>
            <ul className="mw-footer-links">
              <li>
                <a href="https://megawhip.com.br/chicotes-eletricos-para-maquinas-agricolas/" target="_blank" rel="noreferrer">
                  Máquinas Agrícolas
                </a>
              </li>
              <li>
                <a href="https://megawhip.com.br/chicotes-eletricos-para-usinas-de-cana-de-acucar/" target="_blank" rel="noreferrer">
                  Mercado de Cana-de-Açúcar
                </a>
              </li>
              <li>
                <a href="https://megawhip.com.br/chicotes-eletricos-para-o-mercado-de-graos/" target="_blank" rel="noreferrer">
                  Mercado de Grãos
                </a>
              </li>
              <li>
                <a href="https://megawhip.com.br/chicotes-eletricos-para-o-mercado-de-algodao/" target="_blank" rel="noreferrer">
                  Mercado de Algodão
                </a>
              </li>
              <li>
                <a href="https://megawhip.com.br/engenharia-reversa-de-chicotes-eletricos/" target="_blank" rel="noreferrer">
                  Engenharia Reversa
                </a>
              </li>
              <li>
                <a href="https://megawhip.com.br/desenvolvimento-de-projetos-oem-para-chicotes-eletricos/" target="_blank" rel="noreferrer">
                  Projetos OEM Sob Medida
                </a>
              </li>
            </ul>
          </div>

          {/* Produtos e Links */}
          <div>
            <h4 className="mw-footer-heading">Navegação</h4>
            <ul className="mw-footer-links">
              <li><a href="#catalogo">Catálogo Completo</a></li>
              <li><a href="#catalogo">Lançamentos</a></li>
              <li><a href="#catalogo">Pré-vendas</a></li>
              <li>
                <a href="https://megawhip.com.br/pecas-de-reposicao-para-chicote-eletrico/" target="_blank" rel="noreferrer">
                  Peças de Reposição
                </a>
              </li>
              <li>
                <a href="https://megawhip.com.br/como-identificar-um-produto-genuino-mega-whip/" target="_blank" rel="noreferrer">
                  Produto Genuíno Mega Whip
                </a>
              </li>
              <li>
                <a href="https://megawhip.com.br/politica-de-garantia-devolucao-e-troca-dos-produtos/" target="_blank" rel="noreferrer">
                  Política de Garantia
                </a>
              </li>
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
