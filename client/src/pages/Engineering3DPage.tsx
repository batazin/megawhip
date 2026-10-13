import React from 'react';
import { InteractiveHarvester } from '../components/InteractiveHarvester';
import type { PageRoute } from '../router';

interface Engineering3DPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectProductCode: (code: string) => void;
}

export const Engineering3DPage: React.FC<Engineering3DPageProps> = ({
  onNavigate,
  onSelectProductCode,
}) => {
  const handleSelectCode = (code: string) => {
    onSelectProductCode(code);
    onNavigate('catalog');
  };

  return (
    <div className="mw-engineering-page">
      {/* PAGE HEADER */}
      <section className="mw-page-header">
        <div className="mw-container">
          <div className="mw-breadcrumb">
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Início</span>
            <span>/</span>
            <span className="current">Engenharia & Raio-X 3D</span>
          </div>
          <h1 className="mw-page-title">Mapeamento Técnico & Engenharia Reversa</h1>
          <p className="mw-page-subtitle">
            Conheça o posicionamento real dos chicotes elétricos na máquina de colheita. Inspecione em 360° no modelo 3D interativo ou na fotografia em ultra-definição.
          </p>
        </div>
      </section>

      {/* RAIO-X INTERATIVO */}
      <InteractiveHarvester onSelectProductCode={handleSelectCode} />
    </div>
  );
};
