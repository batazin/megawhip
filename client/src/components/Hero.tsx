import React from 'react';
import { Search, X, CheckCircle, Cpu, Award, Zap } from 'lucide-react';

interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onQuickFilter: (filterKey: string, filterValue: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchTerm,
  onSearchChange,
  onQuickFilter,
}) => {
  return (
    <section className="mw-hero">
      <div className="mw-container">
        <div className="mw-hero-badge">
          <Zap size={14} />
          Tecnologia em Chicotes Elétricos Industriais & Agrícolas
        </div>

        <h1 className="mw-hero-title">
          Mega <span>Catálogo</span> Especializado em Chicotes Elétricos
        </h1>

        <p className="mw-hero-subtitle">
          Fabricação e desenvolvimento há mais de 15 anos usando apenas componentes de grandes fabricantes,
          certificados e homologados sob a norma técnica <strong>ISO 6722-1</strong> para frentes de corte,
          plantio e colheita sem paradas imprevistas.
        </p>

        {/* Search bar */}
        <div className="mw-search-card">
          <div className="mw-search-input-wrap">
            <Search size={22} className="mw-search-icon" />
            <input
              type="text"
              className="mw-search-input"
              placeholder="Busque por Part Number (ex: AXT22357), Código Mega (76.100.183), Máquina ou Modelo..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                className="mw-btn-clear-search"
                onClick={() => onSearchChange('')}
                title="Limpar busca"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button className="mw-btn-search-action">
            <Search size={16} />
            Buscar
          </button>
        </div>

        {/* Quick suggestions */}
        <div className="mw-quick-tags">
          <span className="mw-quick-tags-label">Sugestões rápidas:</span>
          <button
            className="mw-quick-tag-chip"
            onClick={() => onSearchChange('CH950')}
          >
            John Deere CH950
          </button>
          <button
            className="mw-quick-tag-chip"
            onClick={() => onSearchChange('Magnum')}
          >
            Case Magnum
          </button>
          <button
            className="mw-quick-tag-chip"
            onClick={() => onSearchChange('S760')}
          >
            Colheitadeira S760
          </button>
          <button
            className="mw-quick-tag-chip"
            onClick={() => onQuickFilter('tag', 'lancamento')}
          >
            Lançamentos
          </button>
          <button
            className="mw-quick-tag-chip"
            onClick={() => onQuickFilter('tag', 'pre-venda')}
          >
            Pré-venda
          </button>
        </div>

        {/* Credibility highlights */}
        <div className="mw-hero-stats">
          <div className="mw-stat-item">
            <div className="mw-stat-icon-box">
              <Award size={20} />
            </div>
            <div>
              <div className="mw-stat-val">15+ Anos</div>
              <div className="mw-stat-desc">Fabricação Nacional</div>
            </div>
          </div>

          <div className="mw-stat-item">
            <div className="mw-stat-icon-box">
              <CheckCircle size={20} />
            </div>
            <div>
              <div className="mw-stat-val">ISO 6722-1</div>
              <div className="mw-stat-desc">Norma Homologada</div>
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
              <div className="mw-stat-desc">Garantia de 12 Meses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
