import React from 'react';
import { Filter, RotateCcw, ChevronRight, Tag } from 'lucide-react';
import type { FiltersData } from '../types';

interface FilterSidebarProps {
  filtersData: FiltersData | null;
  selectedMaquina: string;
  selectedModelo: string;
  selectedAplicacao: string;
  selectedTag: string;
  onSelectMaquina: (slug: string) => void;
  onSelectModelo: (name: string) => void;
  onSelectAplicacao: (slug: string) => void;
  onSelectTag: (slug: string) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filtersData,
  selectedMaquina,
  selectedModelo,
  selectedAplicacao,
  selectedTag,
  onSelectMaquina,
  onSelectModelo,
  onSelectAplicacao,
  onSelectTag,
  onResetFilters,
}) => {
  const hasActiveFilters = Boolean(
    selectedMaquina || selectedModelo || selectedAplicacao || selectedTag
  );

  return (
    <aside className="mw-sidebar">
      <div className="mw-sidebar-header">
        <div className="mw-sidebar-title">
          <Filter size={18} color="#6BB345" />
          Filtros do Catálogo
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="mw-btn-reset-filters"
            title="Limpar todos os filtros"
          >
            <RotateCcw size={13} style={{ display: 'inline', marginRight: 4 }} />
            Limpar
          </button>
        )}
      </div>

      {/* Destaques / Status */}
      <div className="mw-filter-group">
        <div className="mw-filter-group-title">
          <span>Destaques</span>
          <Tag size={14} />
        </div>
        <ul className="mw-filter-list">
          <li>
            <button
              className={`mw-filter-item-btn ${selectedTag === '' ? 'active' : ''}`}
              onClick={() => onSelectTag('')}
            >
              <span>Todos os Chicotes</span>
              <ChevronRight size={14} opacity={0.6} />
            </button>
          </li>
          <li>
            <button
              className={`mw-filter-item-btn ${selectedTag === 'lancamento' ? 'active' : ''}`}
              onClick={() => onSelectTag('lancamento')}
            >
              <span>Lançamentos</span>
              <span className="mw-filter-count-badge" style={{ color: '#6BB345' }}>Novo</span>
            </button>
          </li>
          <li>
            <button
              className={`mw-filter-item-btn ${selectedTag === 'pre-venda' ? 'active' : ''}`}
              onClick={() => onSelectTag('pre-venda')}
            >
              <span>Pré-venda</span>
              <span className="mw-filter-count-badge" style={{ color: '#BE1313' }}>Exclusivo</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Máquinas */}
      <div className="mw-filter-group">
        <div className="mw-filter-group-title">
          <span>Máquinas Agrícolas</span>
        </div>
        <ul className="mw-filter-list">
          <li>
            <button
              className={`mw-filter-item-btn ${selectedMaquina === '' ? 'active' : ''}`}
              onClick={() => onSelectMaquina('')}
            >
              <span>Todas as Máquinas</span>
              <span className="mw-filter-count-badge">
                {filtersData?.totalProducts || 0}
              </span>
            </button>
          </li>
          {filtersData?.maquinas.map((item) => {
            const slug = item.slug || item.name.toLowerCase();
            const isActive = selectedMaquina === slug;
            return (
              <li key={slug}>
                <button
                  className={`mw-filter-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectMaquina(isActive ? '' : slug)}
                >
                  <span>{item.name}</span>
                  <span className="mw-filter-count-badge">{item.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Modelos Principais */}
      {filtersData?.modelos && filtersData.modelos.length > 0 && (
        <div className="mw-filter-group">
          <div className="mw-filter-group-title">
            <span>Modelos Compatíveis</span>
          </div>
          <ul className="mw-filter-list">
            <li>
              <button
                className={`mw-filter-item-btn ${selectedModelo === '' ? 'active' : ''}`}
                onClick={() => onSelectModelo('')}
              >
                <span>Todos os Modelos</span>
              </button>
            </li>
            {filtersData.modelos.slice(0, 8).map((mod) => {
              const isActive = selectedModelo === mod.name;
              return (
                <li key={mod.name}>
                  <button
                    className={`mw-filter-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectModelo(isActive ? '' : mod.name)}
                  >
                    <span>{mod.name}</span>
                    <span className="mw-filter-count-badge">{mod.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Aplicações */}
      {filtersData?.aplicacoes && filtersData.aplicacoes.length > 0 && (
        <div className="mw-filter-group">
          <div className="mw-filter-group-title">
            <span>Aplicações no Veículo</span>
          </div>
          <ul className="mw-filter-list">
            <li>
              <button
                className={`mw-filter-item-btn ${selectedAplicacao === '' ? 'active' : ''}`}
                onClick={() => onSelectAplicacao('')}
              >
                <span>Todas as Aplicações</span>
              </button>
            </li>
            {filtersData.aplicacoes.slice(0, 8).map((app) => {
              const slug = app.slug || app.name.toLowerCase();
              const isActive = selectedAplicacao === slug;
              return (
                <li key={slug}>
                  <button
                    className={`mw-filter-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectAplicacao(isActive ? '' : slug)}
                  >
                    <span>{app.name}</span>
                    <span className="mw-filter-count-badge">{app.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </aside>
  );
};
