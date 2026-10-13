import React from 'react';
import { Search, ArrowRight, ShieldCheck, Cpu, Award, Zap, Eye } from 'lucide-react';
import type { Product } from '../types';
import type { PageRoute } from '../router';
import { HomeBannerSlider } from '../components/HomeBannerSlider';

interface HomePageProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNavigate: (route: PageRoute) => void;
  featuredProducts: Product[];
  onOpenProductDetail: (product: Product) => void;
  onSelectMaquinaFilter: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  searchTerm,
  onSearchChange,
  onNavigate,
  featuredProducts,
  onOpenProductDetail,
  onSelectMaquinaFilter,
}) => {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('catalog');
  };

  const handleCategoryClick = (maquinaSlug: string) => {
    onSelectMaquinaFilter(maquinaSlug);
    onNavigate('catalog');
  };

  return (
    <div className="mw-home-page">
      {/* BANNER INSTITUCIONAL ROTATIVO */}
      <HomeBannerSlider
        onNavigate={onNavigate}
        onSelectMaquinaFilter={onSelectMaquinaFilter}
      />

      {/* CONSULTA RÁPIDA DE PEÇAS & MÉTRICAS */}
      <section className="mw-quick-search-section">
        <div className="mw-container">

          {/* Quick Search Tool */}
          <form className="mw-search-card" onSubmit={handleSearchSubmit}>
            <div className="mw-search-input-wrap">
              <Search size={22} className="mw-search-icon" />
              <input
                type="text"
                className="mw-search-input"
                placeholder="Busque por Part Number OEM, Código Mega Whip (ex: 76.100.183) ou Modelo..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <button type="submit" className="mw-btn-search-action">
              <Search size={16} />
              <span>Consultar Peça</span>
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="mw-quick-tags">
            <span className="mw-quick-tags-label">Consultas Frequentes:</span>
            {['John Deere CH950', 'Case Magnum', 'Colheitadeira S760', 'Plataforma Draper'].map((tag) => (
              <button
                key={tag}
                type="button"
                className="mw-quick-tag-chip"
                onClick={() => {
                  onSearchChange(tag);
                  onNavigate('catalog');
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Institutional Metric Strip */}
          <div className="mw-hero-stats">
            <div className="mw-stat-item">
              <div className="mw-stat-icon-box">
                <Award size={20} />
              </div>
              <div>
                <div className="mw-stat-val">15+ Anos</div>
                <div className="mw-stat-desc">Fábrica em Botucatu-SP</div>
              </div>
            </div>

            <div className="mw-stat-item">
              <div className="mw-stat-icon-box">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="mw-stat-val">ISO 6722-1</div>
                <div className="mw-stat-desc">Padrão Homologado</div>
              </div>
            </div>

            <div className="mw-stat-item">
              <div className="mw-stat-icon-box">
                <Cpu size={20} />
              </div>
              <div>
                <div className="mw-stat-val">100% Testado</div>
                <div className="mw-stat-desc">Bancada Eletrônica</div>
              </div>
            </div>

            <div className="mw-stat-item">
              <div className="mw-stat-icon-box">
                <Zap size={20} />
              </div>
              <div>
                <div className="mw-stat-val">Plug & Play</div>
                <div className="mw-stat-desc">12 Meses de Garantia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 1: CATEGORIAS DE MÁQUINAS PRINCIPAIS */}
      <section className="mw-home-section mw-bg-slate-50">
        <div className="mw-container">
          <div className="mw-section-title-wrap">
            <h2 className="mw-inst-heading">
              Aplicações Especializadas para o Agronegócio
            </h2>
            <p className="mw-inst-lead">
              Desenvolvimento sob medida com matéria-prima de grandes fabricantes globais para suportar intempéries, vibração e calor extremo.
            </p>
          </div>

          <div className="mw-categories-grid">
            <div className="mw-category-card" onClick={() => handleCategoryClick('colhedoras-de-cana')}>
              <div className="mw-category-icon">🌾</div>
              <h3>Colhedoras de Cana</h3>
              <p>Chicotes de alta temperatura para colhedoras John Deere e Case IH, resistentes à queima de palha e água de alta pressão.</p>
              <span className="mw-category-link">Ver chicotes compatíveis <ArrowRight size={14} /></span>
            </div>

            <div className="mw-category-card" onClick={() => handleCategoryClick('colheitadeiras-de-graos')}>
              <div className="mw-category-icon">🚜</div>
              <h3>Colheitadeiras de Grãos</h3>
              <p>Chicotes axiais e para plataformas Draper com conectores selados Deutsch e isolamento contra poeira fina.</p>
              <span className="mw-category-link">Ver chicotes compatíveis <ArrowRight size={14} /></span>
            </div>

            <div className="mw-category-card" onClick={() => handleCategoryClick('tratores')}>
              <div className="mw-category-icon">⚙️</div>
              <h3>Tratores de Alta Potência</h3>
              <p>Chicotes de cabine, comando hidráulico, motor e transmissão para tratores das linhas pesadas.</p>
              <span className="mw-category-link">Ver chicotes compatíveis <ArrowRight size={14} /></span>
            </div>

            <div className="mw-category-card" onClick={() => handleCategoryClick('pulverizadores')}>
              <div className="mw-category-icon">💧</div>
              <h3>Pulverizadores Autopropelidos</h3>
              <p>Fiação com revestimento quimicamente resistente a defensivos agrícolas e umidade contínua nas barras de corte.</p>
              <span className="mw-category-link">Ver chicotes compatíveis <ArrowRight size={14} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: CHAMADA PARA O RAIO-X 3D DA COLHEITADEIRA */}
      <section className="mw-home-section mw-bg-white">
        <div className="mw-container">
          <div className="mw-tech-banner">
            <div className="mw-tech-banner-content">
              <span className="mw-tech-tag">Engenharia Reversa & Inovação</span>
              <h2>Inspecione Nossos Chicotes em Ação na Colheitadeira 3D</h2>
              <p>
                Nossa equipe de engenharia mapeou os pontos críticos de operação em uma colheitadeira de grande porte. Visualize a posição exata, Part Numbers correspondentes e especificações técnicas de cada chicote.
              </p>
              <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="mw-btn-primary"
                  onClick={() => onNavigate('engineering')}
                >
                  Abrir Modelo 3D Interativo
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="mw-btn-secondary"
                  onClick={() => onNavigate('about')}
                >
                  Conhecer Nossa Fábrica
                </button>
              </div>
            </div>
            <div className="mw-tech-banner-preview" onClick={() => onNavigate('engineering')}>
              <div className="mw-tech-badge-3d">3D Interativo 360°</div>
              <img
                src="/images/john-deere-s790.png"
                alt="Colheitadeira John Deere - Inspeção 3D"
                className="mw-tech-img"
              />
              <span className="mw-tech-preview-hint">Clique para inspecionar chicotes em 360°</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: PRODUTOS EM DESTAQUE NO CATÁLOGO */}
      {featuredProducts.length > 0 && (
        <section className="mw-home-section mw-bg-slate-50">
          <div className="mw-container">
            <div className="mw-section-title-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', textAlign: 'left', marginBottom: '32px' }}>
              <div>
                <h2 className="mw-inst-heading" style={{ marginBottom: '6px' }}>
                  Chicotes em Destaque para Reposição Imediata
                </h2>
                <p className="mw-inst-lead" style={{ margin: 0 }}>
                  Modelos homologados de alto giro para colheitadeiras John Deere e Case IH.
                </p>
              </div>
              <button
                type="button"
                className="mw-btn-text-link"
                onClick={() => onNavigate('catalog')}
              >
                Ver Catálogo Completo <ArrowRight size={16} />
              </button>
            </div>

            <div className="mw-featured-products-grid">
              {featuredProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="mw-product-card" onClick={() => onOpenProductDetail(product)}>
                  <div className="mw-card-media">
                    {product.tag && (
                      <span className={`mw-badge-status ${product.tag}`}>
                        {product.tag === 'lancamento' ? 'Lançamento' : 'Pré-venda'}
                      </span>
                    )}
                    <img
                      src={product.imagens[0] || 'https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp'}
                      alt={product.title}
                      className="mw-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="mw-card-body">
                    <div className="mw-card-codes">
                      <span className="mw-code-tag mega-code">MW {product.codigoMega}</span>
                      <span className="mw-code-tag">PN {product.partNumber}</span>
                    </div>
                    <h3 className="mw-card-title">{product.title}</h3>
                    <p className="mw-card-desc">{product.shortDescription}</p>
                    <button className="mw-btn-details" style={{ marginTop: 'auto' }}>
                      <Eye size={15} />
                      Ver Ficha Técnica
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEÇÃO 4: CTA INSTITUCIONAL PARA COMPRAS CORPORATIVAS */}
      <section className="mw-cta-strip">
        <div className="mw-container mw-cta-strip-inner">
          <div>
            <h2>Precisa de cotação para frotas de usinas ou concessionárias?</h2>
            <p>Atendemos departamentos de compras, suprimentos e manutenção agrícola com faturamento direto e despacho para todo o Brasil.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className="mw-btn-cta-white"
              onClick={() => onNavigate('contact')}
            >
              Falar com o Comercial
            </button>
            <button
              type="button"
              className="mw-btn-cta-outline"
              onClick={() => onNavigate('catalog')}
            >
              Consultar Catálogo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
