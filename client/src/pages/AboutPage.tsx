import React from 'react';
import { ShieldCheck, Cpu, Factory, ArrowRight, Wrench } from 'lucide-react';
import type { PageRoute } from '../router';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="mw-about-page">
      {/* PAGE HEADER */}
      <section className="mw-page-header">
        <div className="mw-container">
          <div className="mw-breadcrumb">
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Início</span>
            <span>/</span>
            <span className="current">Sobre a Mega Whip</span>
          </div>
          <h1 className="mw-page-title">Engenharia de Precisão & Tradição Fabril</h1>
          <p className="mw-page-subtitle">
            Mais de 15 anos desenvolvendo e fabricando chicotes elétricos de alta robustez para as operações mais severas do agronegócio e maquinário pesado brasileiro.
          </p>
        </div>
      </section>

      {/* HISTÓRIA E ORIGEM */}
      <section className="mw-institutional-section mw-bg-white">
        <div className="mw-container">
          <div className="mw-about-grid">
            <div>
              <h2 className="mw-inst-heading" style={{ textAlign: 'left', marginTop: 0 }}>
                Nossa Trajetória em Botucatu – SP
              </h2>
              <p className="mw-about-text">
                Fundada em <strong>Botucatu – SP</strong>, um dos mais importantes pólos industriais, metalmecânicos e aeronáuticos do interior paulista, a <strong>Mega Whip Chicotes Elétricos</strong> nasceu para atender à carência de peças de reposição elétricas de alta durabilidade no mercado agroindustrial.
              </p>
              <p className="mw-about-text">
                Diferente de soluções artesanais ou genéricas encontradas no mercado paralelo, a Mega Whip trabalha unicamente com insumos automotivos de primeiro escalão mundial — como terminais e conectores <strong>Aptiv (Delphi), Deutsch e TE Connectivity</strong> —, além de cabos flexíveis de cobre eletrolítico recozido de altíssima pureza.
              </p>
              <p className="mw-about-text">
                O resultado é um chicote com durabilidade igual ou superior à peça genuína da montadora, com encaixe perfeito (Plug & Play) e custo-benefício que reduz drasticamente o tempo de máquina parada na safra.
              </p>

              <div style={{ marginTop: '28px' }}>
                <button
                  type="button"
                  className="mw-btn-primary"
                  onClick={() => onNavigate('catalog')}
                >
                  Consultar Peças no Catálogo
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Destaque Visual / Cartão de Fábrica */}
            <div className="mw-about-stat-panel">
              <div className="mw-about-stat-card">
                <span className="mw-stat-number">15+</span>
                <span className="mw-stat-label">Anos de Fabricação Contínua</span>
              </div>
              <div className="mw-about-stat-card">
                <span className="mw-stat-number">100%</span>
                <span className="mw-stat-label">Testado em Bancada Eletrônica</span>
              </div>
              <div className="mw-about-stat-card">
                <span className="mw-stat-number">ISO</span>
                <span className="mw-stat-label">Norma 6722-1 Homologada</span>
              </div>
              <div className="mw-about-stat-card">
                <span className="mw-stat-number">12</span>
                <span className="mw-stat-label">Meses de Garantia de Fábrica</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILARES DE QUALIDADE INDUSTRIAL */}
      <section className="mw-institutional-section mw-bg-slate-50">
        <div className="mw-container">
          <div className="mw-section-title-wrap">
            <h2 className="mw-inst-heading">Nossos Pilares de Fabricação</h2>
            <p className="mw-inst-lead">
              Rigor técnico em cada etapa: da seleção do lote de matéria-prima até a bancada final de conferência.
            </p>
          </div>

          <div className="mw-pillars-grid">
            <div className="mw-pillar-card">
              <div className="mw-pillar-icon"><ShieldCheck size={28} color="#6BB345" /></div>
              <h3>Padrão ISO 6722-1 Homologado</h3>
              <p>Condutores flexíveis revestidos em PVC especial para suportar variações térmicas contínuas de -40°C a +125°C, sem ressecamento precoce ou quebra interna.</p>
            </div>

            <div className="mw-pillar-card">
              <div className="mw-pillar-icon"><Cpu size={28} color="#6BB345" /></div>
              <h3>Teste Eletrônico Automatizado</h3>
              <p>100% dos chicotes são submetidos a testes de continuidade, resistência ôhmica e isolamento elétrico antes de serem embalados e enviados ao cliente.</p>
            </div>

            <div className="mw-pillar-card">
              <div className="mw-pillar-icon"><Factory size={28} color="#6BB345" /></div>
              <h3>Conectores Genuínos OEM</h3>
              <p>Utilizamos apenas carcaças, selos de silicone e terminais de grandes fornecedores globais (Deutsch, Aptiv, Delphi), garantindo vedação IP67/IP68 contra água e poeira.</p>
            </div>

            <div className="mw-pillar-card">
              <div className="mw-pillar-icon"><Wrench size={28} color="#6BB345" /></div>
              <h3>Proteção Mecânica Reforçada</h3>
              <p>Tubos corrugados antichama e termoencolhíveis de alta densidade protegem a fiação contra abrasão física por palha de cana, galhos e pedriscos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAMADA DE CONTATO */}
      <section className="mw-cta-strip">
        <div className="mw-container mw-cta-strip-inner">
          <div>
            <h2>Quer agendar uma visita técnica ou homologar a Mega Whip?</h2>
            <p>Recebemos equipes de engenharia e compras de usinas para homologação de fábrica e acordos corporativos de fornecimento.</p>
          </div>
          <div>
            <button
              type="button"
              className="mw-btn-cta-white"
              onClick={() => onNavigate('contact')}
            >
              Falar com o Diretor Comercial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
