import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InteractiveHarvester } from './components/InteractiveHarvester';
import { InstitutionalSections } from './components/InstitutionalSections';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteDrawer } from './components/QuoteDrawer';
import { Footer } from './components/Footer';
import { fetchProducts, fetchFilters } from './services/api';
import type { FiltersData, Product, QuoteCartItem } from './types';
import { LayoutGrid, List, SearchX, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

// Mega Whip - Catálogo de Chicotes Elétricos & Esquema Interativo
export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtersData, setFiltersData] = useState<FiltersData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaquina, setSelectedMaquina] = useState('');
  const [selectedModelo, setSelectedModelo] = useState('');
  const [selectedAplicacao, setSelectedAplicacao] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedSort, setSelectedSort] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals & Drawers
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

  // Quotation Cart with LocalStorage persistence
  const [quoteCart, setQuoteCart] = useState<QuoteCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('megawhip_quote_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('megawhip_quote_cart', JSON.stringify(quoteCart));
    } catch {
      // storage unavailable
    }
  }, [quoteCart]);

  // Load Filters on Mount
  useEffect(() => {
    fetchFilters()
      .then((data) => setFiltersData(data))
      .catch((err) => console.error('Erro ao carregar filtros:', err));
  }, []);

  // Load Products
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts({
        search: searchTerm,
        maquina: selectedMaquina,
        modelo: selectedModelo,
        aplicacao: selectedAplicacao,
        tag: selectedTag,
        sort: selectedSort,
        page: currentPage,
        limit: 9,
      });
      setProducts(data.products);
      setTotalCount(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedMaquina, selectedModelo, selectedAplicacao, selectedTag, selectedSort, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 200);
    return () => clearTimeout(timer);
  }, [loadProducts]);

  // Reset page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedMaquina('');
    setSelectedModelo('');
    setSelectedAplicacao('');
    setSelectedTag('');
    setSelectedSort('default');
    setCurrentPage(1);
  };

  const handleQuickFilter = (key: string, value: string) => {
    if (key === 'tag') {
      setSelectedTag(value);
    }
    setCurrentPage(1);
  };

  // When clicking on a hotspot code to search in catalog
  const handleSelectFromHarvester = (productCode: string) => {
    setSearchTerm(productCode);
    setCurrentPage(1);
    const catalogElem = document.getElementById('catalogo');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToQuote = (product: Product) => {
    setQuoteCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: string, quantity: number) => {
    setQuoteCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromQuote = (productId: string) => {
    setQuoteCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearQuoteCart = () => {
    setQuoteCart([]);
  };

  const isProductInCart = (productId: string) => {
    return quoteCart.some((item) => item.product.id === productId);
  };

  return (
    <div className="mw-app-wrapper">
      {/* Header Institucional */}
      <Header
        quoteCount={quoteCart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
      />

      {/* Hero Institucional com Busca */}
      <Hero
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          handleFilterChange();
        }}
        onQuickFilter={handleQuickFilter}
      />

      {/* ANIMAÇÃO INTERATIVA: RAIO-X DA MÁQUINA DE COLHEITA COM PONTOS CLICÁVEIS */}
      <InteractiveHarvester
        onSelectProductCode={handleSelectFromHarvester}
      />

      {/* Segmentos e Sobre a Empresa */}
      <InstitutionalSections />

      {/* Catálogo de Produtos com Filtros */}
      <section id="catalogo" className="mw-catalog-section">
        <div className="mw-container">
          <div className="mw-section-title-wrap" style={{ marginBottom: '32px' }}>
            <span className="mw-badge-institutional">Consulta Técnica</span>
            <h2 className="mw-inst-heading">
              Catálogo de Peças de Reposição & Chicotes Elétricos
            </h2>
            <p className="mw-inst-lead">
              Consulte nosso acervo completo por Part Number, Código de Fábrica Mega Whip ou filtre
              por tipo de máquina agrícola.
            </p>
          </div>

          <div className="mw-catalog-layout">
            {/* Sidebar com Filtros Taxonômicos */}
            <FilterSidebar
              filtersData={filtersData}
              selectedMaquina={selectedMaquina}
              selectedModelo={selectedModelo}
              selectedAplicacao={selectedAplicacao}
              selectedTag={selectedTag}
              onSelectMaquina={(slug) => {
                setSelectedMaquina(slug);
                handleFilterChange();
              }}
              onSelectModelo={(name) => {
                setSelectedModelo(name);
                handleFilterChange();
              }}
              onSelectAplicacao={(slug) => {
                setSelectedAplicacao(slug);
                handleFilterChange();
              }}
              onSelectTag={(slug) => {
                setSelectedTag(slug);
                handleFilterChange();
              }}
              onResetFilters={handleResetFilters}
            />

            {/* Grid e Resultados */}
            <div className="mw-catalog-content">
              {/* Toolbar */}
              <div className="mw-catalog-toolbar">
                <div className="mw-toolbar-results">
                  Mostrando <strong>{products.length}</strong> de <strong>{totalCount}</strong> chicotes elétricos
                  {searchTerm && (
                    <span> para "<em>{searchTerm}</em>"</span>
                  )}
                </div>

                <div className="mw-toolbar-controls">
                  <select
                    className="mw-sort-select"
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                  >
                    <option value="default">Ordenar por: Relevância</option>
                    <option value="codigo-asc">Código Mega (Ordem)</option>
                    <option value="partnumber-asc">Part Number Original</option>
                    <option value="title-asc">Título (A-Z)</option>
                  </select>

                  <div className="mw-view-switchers">
                    <button
                      className={`mw-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Visualização em Grade"
                    >
                      <LayoutGrid size={16} />
                    </button>
                    <button
                      className={`mw-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                      title="Visualização em Lista"
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Área de Produtos */}
              {isLoading ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '340px',
                    gap: '12px',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Loader2 size={36} color="#6BB345" className="animate-spin" />
                  <span>Carregando chicotes homologados Mega Whip...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="mw-empty-state">
                  <div className="mw-empty-icon" style={{ margin: '0 auto 16px' }}>
                    <SearchX size={32} color="#94A3B8" />
                  </div>
                  <h3 className="mw-empty-title" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                    Nenhum chicote elétrico encontrado
                  </h3>
                  <p className="mw-empty-text" style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Não encontramos resultados com os filtros ou termo de busca selecionados.<br />
                    Tente buscar pelo Part Number exato ou verifique a categoria da máquina.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mw-btn-whatsapp-pill"
                    style={{ margin: '0 auto' }}
                  >
                    Ver Todos os Chicotes
                  </button>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'mw-products-grid' : 'mw-products-list'}>
                  {products.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onOpenDetails={(p) => setDetailProduct(p)}
                      onAddToQuote={handleAddToQuote}
                      isInQuoteCart={isProductInCart(prod.id)}
                    />
                  ))}
                </div>
              )}

              {/* Paginação */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '28px',
                  }}
                >
                  <button
                    className="mw-btn-details"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
                  >
                    <ChevronLeft size={16} /> Anterior
                  </button>

                  <span style={{ fontSize: '13px', color: 'var(--text-body)', padding: '0 8px' }}>
                    Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
                  </span>

                  <button
                    className="mw-btn-details"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}
                  >
                    Próxima <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Técnico de Detalhes */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToQuote={handleAddToQuote}
        isInQuoteCart={detailProduct ? isProductInCart(detailProduct.id) : false}
      />

      {/* Drawer de Cotação Multi-Itens */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteCart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromQuote}
        onClearCart={handleClearQuoteCart}
      />

      {/* Footer Institucional */}
      <Footer />
    </div>
  );
};

export default App;
