import React from 'react';
import { Search, X, RefreshCw } from 'lucide-react';
import type { Product, FiltersData } from '../types';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductCard } from '../components/ProductCard';
import type { PageRoute } from '../router';

interface CatalogPageProps {
  products: Product[];
  totalProducts: number;
  loading: boolean;
  filtersData: FiltersData | null;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedMaquina: string;
  selectedModelo: string;
  selectedAplicacao: string;
  selectedTag: string;
  sortBy: string;
  onSelectMaquina: (slug: string) => void;
  onSelectModelo: (name: string) => void;
  onSelectAplicacao: (slug: string) => void;
  onSelectTag: (slug: string) => void;
  onSortChange: (sort: string) => void;
  onResetFilters: () => void;
  onOpenProductDetail: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  isProductInCart: (productId: string) => boolean;
  onNavigate: (route: PageRoute) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  totalProducts,
  loading,
  filtersData,
  searchTerm,
  onSearchChange,
  selectedMaquina,
  selectedModelo,
  selectedAplicacao,
  selectedTag,
  sortBy,
  onSelectMaquina,
  onSelectModelo,
  onSelectAplicacao,
  onSelectTag,
  onSortChange,
  onResetFilters,
  onOpenProductDetail,
  onAddToQuote,
  isProductInCart,
  onNavigate,
}) => {
  return (
    <div className="mw-catalog-page">
      {/* PAGE HEADER */}
      <section className="mw-page-header">
        <div className="mw-container">
          <div className="mw-breadcrumb">
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Início</span>
            <span>/</span>
            <span className="current">Catálogo de Peças</span>
          </div>
          <h1 className="mw-page-title">Catálogo Completo de Chicotes Elétricos</h1>
          <p className="mw-page-subtitle">
            Consulte nosso acervo completo por Part Number OEM, Código Mega Whip ou selecione sua máquina agrícola para reposição rápida.
          </p>

          {/* Search Bar in Catalog */}
          <div className="mw-search-card" style={{ marginTop: '24px', maxWidth: '780px' }}>
            <div className="mw-search-input-wrap">
              <Search size={20} className="mw-search-icon" />
              <input
                type="text"
                className="mw-search-input"
                placeholder="Busque por Part Number (ex: AXT22357), Código Mega (76.100.183), Máquina ou Modelo..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="mw-btn-clear-search"
                  onClick={() => onSearchChange('')}
                  title="Limpar busca"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG MAIN WORKSPACE */}
      <section className="mw-catalog-section" style={{ paddingTop: '32px' }}>
        <div className="mw-container">
          <div className="mw-catalog-layout">
            {/* Sidebar com Filtros Taxonômicos */}
            <FilterSidebar
              filtersData={filtersData}
              selectedMaquina={selectedMaquina}
              selectedModelo={selectedModelo}
              selectedAplicacao={selectedAplicacao}
              selectedTag={selectedTag}
              onSelectMaquina={onSelectMaquina}
              onSelectModelo={onSelectModelo}
              onSelectAplicacao={onSelectAplicacao}
              onSelectTag={onSelectTag}
              onResetFilters={onResetFilters}
            />

            {/* Grid e Resultados */}
            <div className="mw-catalog-content">
              {/* Toolbar */}
              <div className="mw-catalog-toolbar">
                <div className="mw-results-count">
                  {loading ? (
                    <span>Carregando chicotes...</span>
                  ) : (
                    <span>
                      Exibindo <strong>{products.length}</strong> de <strong>{totalProducts}</strong> chicotes
                    </span>
                  )}
                </div>

                <div className="mw-toolbar-controls">
                  <div className="mw-sort-wrap">
                    <label htmlFor="catalog-sort" className="mw-sort-label">Ordenar:</label>
                    <select
                      id="catalog-sort"
                      className="mw-sort-select"
                      value={sortBy}
                      onChange={(e) => onSortChange(e.target.value)}
                    >
                      <option value="relevancia">Relevância</option>
                      <option value="nome_asc">Nome (A - Z)</option>
                      <option value="codigo_asc">Código Mega Whip</option>
                      <option value="lancamentos">Lançamentos Primeiro</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid de Produtos */}
              {loading ? (
                <div className="mw-loading-state">
                  <RefreshCw size={32} className="spin" color="#6BB345" />
                  <p>Consultando catálogo da fábrica...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="mw-empty-state">
                  <h3>Nenhum chicote encontrado com os filtros selecionados</h3>
                  <p>Tente buscar por termos mais genéricos, verificar o Part Number ou limpar os filtros.</p>
                  <button className="mw-btn-primary" onClick={onResetFilters} style={{ marginTop: '16px' }}>
                    Limpar Todos os Filtros
                  </button>
                </div>
              ) : (
                <div className="mw-products-grid">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={onOpenProductDetail}
                      onAddToQuote={onAddToQuote}
                      isInQuoteCart={isProductInCart(product.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
