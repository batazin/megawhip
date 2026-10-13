import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteDrawer } from './components/QuoteDrawer';
import { useRoute } from './router';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { AboutPage } from './pages/AboutPage';
import { SegmentsPage } from './pages/SegmentsPage';
import { Engineering3DPage } from './pages/Engineering3DPage';
import { ContactPage } from './pages/ContactPage';
import { fetchProducts, fetchFilters } from './services/api';
import type { FiltersData, Product, QuoteCartItem } from './types';

export const App: React.FC = () => {
  const { route, navigateTo } = useRoute();

  const [products, setProducts] = useState<Product[]>([]);
  const [filtersData, setFiltersData] = useState<FiltersData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setTotalPages] = useState(1);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaquina, setSelectedMaquina] = useState('');
  const [selectedModelo, setSelectedModelo] = useState('');
  const [selectedAplicacao, setSelectedAplicacao] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedSort, setSelectedSort] = useState('relevancia');

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
        limit: 12,
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

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedMaquina('');
    setSelectedModelo('');
    setSelectedAplicacao('');
    setSelectedTag('');
    setSelectedSort('relevancia');
    setCurrentPage(1);
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
      {/* Header Institucional com navegação interna */}
      <Header
        quoteCount={quoteCart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        currentRoute={route}
        onNavigate={navigateTo}
      />

      {/* Roteamento de Páginas Institucionais */}
      <main className="mw-main-content">
        {route === 'home' && (
          <HomePage
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onNavigate={navigateTo}
            featuredProducts={products}
            onOpenProductDetail={setDetailProduct}
            onSelectMaquinaFilter={(slug) => {
              setSelectedMaquina(slug);
              setCurrentPage(1);
            }}
          />
        )}

        {route === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {route === 'catalog' && (
          <CatalogPage
            products={products}
            totalProducts={totalCount}
            loading={isLoading}
            filtersData={filtersData}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedMaquina={selectedMaquina}
            selectedModelo={selectedModelo}
            selectedAplicacao={selectedAplicacao}
            selectedTag={selectedTag}
            sortBy={selectedSort}
            onSelectMaquina={(slug) => {
              setSelectedMaquina(slug);
              setCurrentPage(1);
            }}
            onSelectModelo={(name) => {
              setSelectedModelo(name);
              setCurrentPage(1);
            }}
            onSelectAplicacao={(slug) => {
              setSelectedAplicacao(slug);
              setCurrentPage(1);
            }}
            onSelectTag={(slug) => {
              setSelectedTag(slug);
              setCurrentPage(1);
            }}
            onSortChange={setSelectedSort}
            onResetFilters={handleResetFilters}
            onOpenProductDetail={setDetailProduct}
            onAddToQuote={handleAddToQuote}
            isProductInCart={isProductInCart}
            onNavigate={navigateTo}
          />
        )}

        {route === 'segments' && (
          <SegmentsPage
            onNavigate={navigateTo}
            onSelectMaquinaFilter={(slug) => {
              setSelectedMaquina(slug);
              setCurrentPage(1);
            }}
          />
        )}

        {route === 'engineering' && (
          <Engineering3DPage
            onNavigate={navigateTo}
            onSelectProductCode={(code) => {
              setSearchTerm(code);
              setCurrentPage(1);
            }}
          />
        )}

        {route === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer com Links Institucionais */}
      <Footer onNavigate={navigateTo} />

      {/* Modais Globais */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onAddToQuote={handleAddToQuote}
          isInQuoteCart={isProductInCart(detailProduct.id)}
        />
      )}

      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteCart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromQuote}
        onClearCart={handleClearQuoteCart}
      />
    </div>
  );
};

export default App;
