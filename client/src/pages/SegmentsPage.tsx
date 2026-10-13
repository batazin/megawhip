import React from 'react';
import { Factory, Cpu, Compass, Truck, Check, ArrowRight } from 'lucide-react';
import type { PageRoute } from '../router';

interface SegmentsPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectMaquinaFilter: (slug: string) => void;
}

export const SegmentsPage: React.FC<SegmentsPageProps> = ({
  onNavigate,
  onSelectMaquinaFilter,
}) => {
  const handleFilterSegment = (maquinaSlug: string) => {
    onSelectMaquinaFilter(maquinaSlug);
    onNavigate('catalog');
  };

  return (
    <div className="mw-segments-page">
      {/* PAGE HEADER */}
      <section className="mw-page-header">
        <div className="mw-container">
          <div className="mw-breadcrumb">
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Início</span>
            <span>/</span>
            <span className="current">Segmentos de Atuação</span>
          </div>
          <h1 className="mw-page-title">Chicotes Especializados para Aplicações Severas</h1>
          <p className="mw-page-subtitle">
            Cada segmento do agronegócio e da indústria pesada exige propriedades elétricas e mecânicas específicas. Conheça como a Mega Whip atende cada operação.
          </p>
        </div>
      </section>

      {/* SEGMENTOS EM DETALHE */}
      <section className="mw-institutional-section mw-bg-white">
        <div className="mw-container">
          <div className="mw-segment-detail-list">
            {/* SEGMENTO 1 */}
            <div className="mw-segment-detail-card">
              <div className="mw-segment-detail-header">
                <div className="mw-segment-icon-box">
                  <Factory size={32} color="#6BB345" />
                </div>
                <div>
                  <h2>Usinas Sucroalcooleiras (Setor Canavieiro)</h2>
                  <p className="mw-segment-lead">Operação ininterrupta 24 horas por dia em safra severa com alta temperatura e fuligem.</p>
                </div>
              </div>
              <div className="mw-segment-detail-body">
                <p>
                  As colhedoras de cana (como John Deere CH570, CH670, CH950 e Case IH Austoft 8800/8810) trabalham imersas em calor e palha seca. Nossos chicotes para usinas possuem tubos corrugados antichama e isolamento classe 4 que resistem ao calor irradiado dos escapamentos e turbinas de motor sem derretimento.
                </p>
                <div className="mw-segment-specs-grid">
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Resistência térmica de pico até +125°C</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Vedação IP68 para lavagem pós-safra</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Proteção antiabrasão contra palha moída</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Conectores Deutsch série DT e HDP</div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <button
                    type="button"
                    className="mw-btn-primary"
                    onClick={() => handleFilterSegment('colhedoras-de-cana')}
                  >
                    Ver Chicotes para Colhedoras de Cana
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* SEGMENTO 2 */}
            <div className="mw-segment-detail-card">
              <div className="mw-segment-detail-header">
                <div className="mw-segment-icon-box">
                  <Cpu size={32} color="#6BB345" />
                </div>
                <div>
                  <h2>Mercado de Grãos (Soja, Milho e Algodão)</h2>
                  <p className="mw-segment-lead">Colheitadeiras axiais de alto rendimento, plataformas de corte e plantadeiras de precisão.</p>
                </div>
              </div>
              <div className="mw-segment-detail-body">
                <p>
                  Equipamentos modernos (como John Deere Séries S600/S700 e Case Axial-Flow 8250/9250) integram dezenas de sensores eletrônicos de perda de grãos, telemetria e piloto automático. O cabeamento Mega Whip mantém a integridade do sinal CAN bus livre de ruídos elétricos e interferências.
                </p>
                <div className="mw-segment-specs-grid">
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Fiação par trançado blindada para rede CAN</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Conectores padrão Delphi Weather Pack e Metri-Pack</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Cabos flexíveis para barras de pulverizador</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Resistência a inseticidas e fertilizantes</div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <button
                    type="button"
                    className="mw-btn-primary"
                    onClick={() => handleFilterSegment('colheitadeiras-de-graos')}
                  >
                    Ver Chicotes para Colheitadeiras de Grãos
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* SEGMENTO 3 */}
            <div className="mw-segment-detail-card">
              <div className="mw-segment-detail-header">
                <div className="mw-segment-icon-box">
                  <Compass size={32} color="#6BB345" />
                </div>
                <div>
                  <h2>Linha Amarela & Construção Pesada</h2>
                  <p className="mw-segment-lead">Pás-carregadeiras, escavadeiras hidráulicas e motoniveladoras sob extrema vibração.</p>
                </div>
              </div>
              <div className="mw-segment-detail-body">
                <p>
                  No ambiente de terraplanagem e mineração, a vibração contínua e o contato com óleos hidráulicos exigem terminais crimpados sob pressão calibrada e selos duplos de silicone para evitar oxidação ou desconexão prematura.
                </p>
                <div className="mw-segment-specs-grid">
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Crimpagem industrial sob tração certificada</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Resistência a óleos minerais e fluidos ATF</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Fixação com grampos e presilhas reforçadas</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Durabilidade superior a 5.000 horas de máquina</div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <button
                    type="button"
                    className="mw-btn-primary"
                    onClick={() => handleFilterSegment('tratores')}
                  >
                    Ver Chicotes Linha Amarela & Tratores
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* SEGMENTO 4 */}
            <div className="mw-segment-detail-card">
              <div className="mw-segment-detail-header">
                <div className="mw-segment-icon-box">
                  <Truck size={32} color="#6BB345" />
                </div>
                <div>
                  <h2>Concessionárias, Frotistas & Revendas de Peças</h2>
                  <p className="mw-segment-lead">Distribuição ágil e pronta-entrega para abastecer oficinas e balcões de peças em todo o país.</p>
                </div>
              </div>
              <div className="mw-segment-detail-body">
                <p>
                  Oferecemos condições especiais de faturamento para concessionárias autorizadas e distribuidores de autopeças agrícolas, com catálogo categorizado por código OEM para agilizar a cotação no balcão de vendas.
                </p>
                <div className="mw-segment-specs-grid">
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Part Numbers originais gravados em etiqueta indelével</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Embalagem plástica lacrada individual</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Tabela de preços para revenda corporativa</div>
                  <div className="mw-spec-box"><Check size={16} color="#6BB345" /> Despacho rodoviário e aéreo expresso</div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <button
                    type="button"
                    className="mw-btn-primary"
                    onClick={() => onNavigate('contact')}
                  >
                    Cadastrar Revenda ou Usina
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
