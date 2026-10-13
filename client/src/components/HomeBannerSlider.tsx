import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Cpu, Flame } from 'lucide-react';
import type { PageRoute } from '../router';

interface Slide {
  id: string;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  primaryBtnText: string;
  primaryBtnRoute: PageRoute;
  primaryBtnFilter?: string;
  secondaryBtnText: string;
  secondaryBtnRoute: PageRoute;
  accentColor: string;
  bgGradient: string;
  badgeIcon: React.ReactNode;
}

interface HomeBannerSliderProps {
  onNavigate: (route: PageRoute) => void;
  onSelectMaquinaFilter: (slug: string) => void;
}

const SLIDES: Slide[] = [
  {
    id: 'usinas',
    tag: 'Engenharia Canavieira & Usinas',
    title: 'Chicotes de Alta Temperatura para Safra Contínua 24 Horas',
    description: 'Engenharia dedicada para colhedoras John Deere e Case IH com isolamento térmico até 125°C e proteção mecânica corrugada antichama. Máxima disponibilidade mecânica na frente de corte.',
    highlights: ['Proteção térmica reforçada', 'Conectores selados Deutsch IP68', '12 meses de garantia de fábrica'],
    primaryBtnText: 'Ver Chicotes para Colhedoras',
    primaryBtnRoute: 'catalog',
    primaryBtnFilter: 'colhedoras-de-cana',
    secondaryBtnText: 'Atendimento Comercial',
    secondaryBtnRoute: 'contact',
    accentColor: '#7CD450',
    bgGradient: 'radial-gradient(circle at 80% 30%, rgba(107, 179, 69, 0.18) 0%, transparent 60%), linear-gradient(135deg, #0B0F14 0%, #131A22 100%)',
    badgeIcon: <Flame size={16} color="#7CD450" />,
  },
  {
    id: 'graos',
    tag: 'Mercado de Grãos & Telemetria',
    title: 'Precisão Absoluta em Redes CAN para Colheitadeiras Axiais',
    description: 'Cabeamento com par trançado de cobre eletrolítico puro e terminais padrão OEM para sistemas de perda de grãos, sensores de umidade e plataformas Draper.',
    highlights: ['Fiação blindada contra ruído elétrico', 'Padrão ISO 6722-1 homologado', '100% testado em bancada eletrônica'],
    primaryBtnText: 'Explorar Catálogo de Grãos',
    primaryBtnRoute: 'catalog',
    primaryBtnFilter: 'colheitadeiras-de-graos',
    secondaryBtnText: 'Inspecionar no Raio-X 3D',
    secondaryBtnRoute: 'engineering',
    accentColor: '#6BB345',
    bgGradient: 'radial-gradient(circle at 80% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 60%), linear-gradient(135deg, #090D12 0%, #111822 100%)',
    badgeIcon: <Cpu size={16} color="#6BB345" />,
  },
  {
    id: 'fabrica',
    tag: 'Fábrica em Botucatu – SP',
    title: '15 Anos de Fabricação Nacional e Fornecimento Corporativo',
    description: 'Atendimento direto a usinas, concessionárias autorizadas e frotistas com faturamento PJ, garantia de procedência de matéria-prima e logística ágil para todo o Brasil.',
    highlights: ['Fábrica própria no interior de SP', 'Insumos Aptiv, Delphi e Deutsch', 'Condições para compras em lote'],
    primaryBtnText: 'Conhecer Nossa Infraestrutura',
    primaryBtnRoute: 'about',
    secondaryBtnText: 'Solicitar Cotação em Lote',
    secondaryBtnRoute: 'contact',
    accentColor: '#38BDF8',
    bgGradient: 'radial-gradient(circle at 80% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 60%), linear-gradient(135deg, #0B0F14 0%, #0F172A 100%)',
    badgeIcon: <ShieldCheck size={16} color="#38BDF8" />,
  },
];

export const HomeBannerSlider: React.FC<HomeBannerSliderProps> = ({
  onNavigate,
  onSelectMaquinaFilter,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, isPaused]);

  const currentSlide = SLIDES[currentSlideIndex];

  const handlePrimaryClick = () => {
    if (currentSlide.primaryBtnFilter) {
      onSelectMaquinaFilter(currentSlide.primaryBtnFilter);
    }
    onNavigate(currentSlide.primaryBtnRoute);
  };

  return (
    <div
      className="mw-banner-slider-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="mw-banner-slide"
        style={{ background: currentSlide.bgGradient }}
      >
        <div className="mw-container mw-banner-slide-content">
          <div className="mw-banner-text-col">
            <div className="mw-banner-tag-pill">
              {currentSlide.badgeIcon}
              <span>{currentSlide.tag}</span>
            </div>

            <h2 className="mw-banner-heading">
              {currentSlide.title}
            </h2>

            <p className="mw-banner-desc">
              {currentSlide.description}
            </p>

            <div className="mw-banner-highlights">
              {currentSlide.highlights.map((item, idx) => (
                <span key={idx} className="mw-banner-highlight-item">
                  <span className="mw-bullet-check">✓</span>
                  {item}
                </span>
              ))}
            </div>

            <div className="mw-banner-cta-row">
              <button
                type="button"
                className="mw-btn-banner-primary"
                onClick={handlePrimaryClick}
              >
                <span>{currentSlide.primaryBtnText}</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="mw-btn-banner-secondary"
                onClick={() => onNavigate(currentSlide.secondaryBtnRoute)}
              >
                {currentSlide.secondaryBtnText}
              </button>
            </div>
          </div>

          <div className="mw-banner-graphic-col">
            <div className="mw-banner-badge-box">
              <div className="mw-banner-stat-giant">15+</div>
              <div className="mw-banner-stat-text">
                <strong>Anos de Tradição</strong>
                <span>Fabricação de precisão</span>
              </div>
            </div>

            <div className="mw-banner-badge-box">
              <div className="mw-banner-stat-giant">ISO</div>
              <div className="mw-banner-stat-text">
                <strong>Norma 6722-1</strong>
                <span>Homologação e testes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          className="mw-banner-arrow mw-arrow-prev"
          onClick={prevSlide}
          aria-label="Slide anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          className="mw-banner-arrow mw-arrow-next"
          onClick={nextSlide}
          aria-label="Próximo slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Indicators Dots / Bars */}
        <div className="mw-banner-indicators">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`mw-banner-dot ${idx === currentSlideIndex ? 'active' : ''}`}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Ir para o slide ${idx + 1}: ${slide.tag}`}
            >
              <span className="mw-banner-dot-bar"></span>
              <span className="mw-banner-dot-label">{slide.tag.split('&')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
