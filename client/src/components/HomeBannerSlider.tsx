import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Cpu, Flame } from 'lucide-react';
import type { PageRoute } from '../router';

interface SlideStat {
  giant: string;
  title: string;
  desc: string;
}

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
  bgImage: string;
  badgeIcon: React.ReactNode;
  previewTitle: string;
  previewBadge: string;
  stats: SlideStat[];
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
    bgImage: '/images/banners/banner-cana.jpg',
    badgeIcon: <Flame size={16} color="#7CD450" />,
    previewTitle: 'Colhedoras de Cana em Safra 24h',
    previewBadge: 'Usinas & Safra Severa',
    stats: [
      { giant: '125°C', title: 'Resistência Térmica', desc: 'Isolamento antichama' },
      { giant: 'IP68', title: 'Vedação Deutsch', desc: 'Resistência a poeira e lavagem' },
    ],
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
    bgImage: '/images/banners/banner-graos.jpg',
    badgeIcon: <Cpu size={16} color="#6BB345" />,
    previewTitle: 'Colheitadeiras Axiais de Soja & Grãos',
    previewBadge: 'Telemetria & Rede CAN',
    stats: [
      { giant: 'CAN', title: 'Rede Blindada', desc: 'Zero interferência de sinal' },
      { giant: 'ISO', title: 'Norma 6722-1', desc: 'Homologação padrão OEM' },
    ],
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
    bgImage: '/images/banners/banner-fabrica.jpg',
    badgeIcon: <ShieldCheck size={16} color="#38BDF8" />,
    previewTitle: 'Bancada Eletrônica em Botucatu - SP',
    previewBadge: '100% Produção Nacional',
    stats: [
      { giant: '15+', title: 'Anos de Tradição', desc: 'Fabricação de precisão' },
      { giant: '100%', title: 'Testado em Bancada', desc: 'Garantia de 12 meses' },
    ],
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
    }, 6500);

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
      {/* Background Images Crossfade Layer */}
      <div className="mw-banner-bg-container">
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`mw-banner-bg-item ${idx === currentSlideIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(11, 15, 20, 0.95) 0%, rgba(11, 15, 20, 0.88) 45%, rgba(11, 15, 20, 0.35) 75%, rgba(11, 15, 20, 0.65) 100%), url(${slide.bgImage})`,
            }}
          />
        ))}
      </div>

      <div className="mw-banner-slide">
        <div className="mw-container mw-banner-slide-content">
          <div className="mw-banner-text-col">
            <div
              className="mw-banner-tag-pill"
              style={{ color: currentSlide.accentColor, borderColor: `${currentSlide.accentColor}50` }}
            >
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
                  <span className="mw-bullet-check" style={{ color: currentSlide.accentColor }}>✓</span>
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
            {/* Visual machine/facility preview card */}
            <div className="mw-banner-preview-card" onClick={handlePrimaryClick}>
              <div className="mw-banner-preview-img-wrap">
                <img
                  src={currentSlide.bgImage}
                  alt={currentSlide.previewTitle}
                  className="mw-banner-preview-img"
                />
                <div className="mw-banner-card-badge" style={{ borderColor: `${currentSlide.accentColor}60` }}>
                  {currentSlide.badgeIcon}
                  <span>{currentSlide.previewBadge}</span>
                </div>
                <div className="mw-banner-card-caption">
                  <span>{currentSlide.previewTitle}</span>
                </div>
              </div>
            </div>

            {/* Slide-specific specs */}
            <div className="mw-banner-stats-row">
              {currentSlide.stats.map((st, i) => (
                <div key={i} className="mw-banner-badge-box">
                  <div className="mw-banner-stat-giant" style={{ color: currentSlide.accentColor }}>
                    {st.giant}
                  </div>
                  <div className="mw-banner-stat-text">
                    <strong>{st.title}</strong>
                    <span>{st.desc}</span>
                  </div>
                </div>
              ))}
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
