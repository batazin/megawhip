import React from 'react';
import { ShieldCheck, Cpu, Factory, Award, Truck, Check, Sparkles, Compass, Wrench } from 'lucide-react';

export const InstitutionalSections: React.FC = () => {
  return (
    <>
      {/* SEÇÃO 1: SEGMENTOS DE ATUAÇÃO INSTITUCIONAL */}
      <section id="segmentos" className="mw-institutional-section mw-bg-slate-50">
        <div className="mw-container">
          <div className="mw-section-title-wrap">
            <h2 className="mw-inst-heading">
              Especialistas em Chicotes para os Segmentos Mais Exigentes
            </h2>
            <p className="mw-inst-lead">
              Engenharia dedicada para frentes de operação severa em maquinário pesado e agronegócio.
            </p>
          </div>

          <div className="mw-segments-grid">
            {/* Card 1 */}
            <div className="mw-segment-card">
              <div className="mw-segment-icon">
                <Factory size={28} color="#6BB345" />
              </div>
              <h3 className="mw-segment-title">Usinas de Cana-de-Açúcar</h3>
              <p className="mw-segment-text">
                Operação ininterrupta 24 horas por dia em safra. Chicotes para colhedoras, tratores
                transbordo e caminhões canavieiros com proteção contra palha, fogo e alta temperatura.
              </p>
              <ul className="mw-segment-features">
                <li><Check size={14} color="#6BB345" /> Resistência térmica até 125°C</li>
                <li><Check size={14} color="#6BB345" /> Proteção mecânica corrugada</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="mw-segment-card">
              <div className="mw-segment-icon">
                <Cpu size={28} color="#6BB345" />
              </div>
              <h3 className="mw-segment-title">Mercado de Grãos (Soja e Milho)</h3>
              <p className="mw-segment-text">
                Chicotes para colheitadeiras axiais de alto rendimento, pulverizadores autopropelidos
                e tratores de alta potência com redes de comunicação CAN Bus blindadas.
              </p>
              <ul className="mw-segment-features">
                <li><Check size={14} color="#6BB345" /> Compatibilidade com ISOBUS e GPS</li>
                <li><Check size={14} color="#6BB345" /> Vedação extrema contra poeira e defensivos</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="mw-segment-card">
              <div className="mw-segment-icon">
                <Truck size={28} color="#6BB345" />
              </div>
              <h3 className="mw-segment-title">Mercado de Algodão</h3>
              <p className="mw-segment-text">
                Fiação especializada para colhedoras e enfardadoras de algodão cilíndrico, garantindo
                estabilidade para sensores de umidade, pesagem e formação de fardos.
              </p>
              <ul className="mw-segment-features">
                <li><Check size={14} color="#6BB345" /> Imunidade eletrostática</li>
                <li><Check size={14} color="#6BB345" /> Conexão direta com módulos Pro-16</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="mw-segment-card">
              <div className="mw-segment-icon">
                <Compass size={28} color="#6BB345" />
              </div>
              <h3 className="mw-segment-title">Engenharia Reversa</h3>
              <p className="mw-segment-text">
                Recriação e aprimoramento de chicotes fora de linha ou importados com elevado tempo de
                espera. Desenvolvemos o gabarito fiel com fiação nacionalizada e conectores originais.
              </p>
              <ul className="mw-segment-features">
                <li><Check size={14} color="#6BB345" /> Eliminação de gargalos de importação</li>
                <li><Check size={14} color="#6BB345" /> Mesmas dimensões e pinagem de fábrica</li>
              </ul>
            </div>

            {/* Card 5 */}
            <div className="mw-segment-card">
              <div className="mw-segment-icon">
                <Wrench size={28} color="#6BB345" />
              </div>
              <h3 className="mw-segment-title">Desenvolvimento OEM Sob Medida</h3>
              <p className="mw-segment-text">
                Projetos elétricos completos para fabricantes de implementos e montadoras, desde a
                elaboração de esquemáticos até o fornecimento de lotes seriados com controle dimensional.
              </p>
              <ul className="mw-segment-features">
                <li><Check size={14} color="#6BB345" /> Teste elétrico 100% automatizado</li>
                <li><Check size={14} color="#6BB345" /> Rastreabilidade com número de série</li>
              </ul>
            </div>

            {/* Card 6 */}
            <div className="mw-segment-card">
              <div className="mw-segment-icon">
                <Award size={28} color="#6BB345" />
              </div>
              <h3 className="mw-segment-title">Peças de Reposição Rápidas</h3>
              <p className="mw-segment-text">
                Estoque estratégico para os principais modelos de colheitadeiras e tratores para pronta
                entrega, minimizando o tempo de máquina parada no campo durante a janela de plantio e corte.
              </p>
              <ul className="mw-segment-features">
                <li><Check size={14} color="#6BB345" /> Despacho ágil para todo o Brasil</li>
                <li><Check size={14} color="#6BB345" /> 12 meses de garantia de fábrica</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: PILARES INSTITUCIONAIS E QUALIDADE */}
      <section id="sobre" className="mw-institutional-section mw-bg-white">
        <div className="mw-container">
          <div className="mw-about-grid">
            <div>
              <h2 className="mw-inst-heading" style={{ textAlign: 'left', marginTop: '0' }}>
                15 Anos de Engenharia de Precisão e Confiabilidade na Lavoura
              </h2>
              <p className="mw-about-text">
                Fundada em Botucatu – SP, um dos principais pólos industriais e tecnológicos do interior
                paulista, a <strong>Mega Whip</strong> consolidou-se como referência nacional na produção
                de chicotes elétricos automotivos e agrícolas de alta complexidade.
              </p>
              <p className="mw-about-text">
                Diferente de soluções artesanais ou genéricas, utilizamos unicamente matéria-prima de
                fabricantes globais de primeira linha (como Aptiv/Delphi, Deutsch, TE Connectivity e
                fiação de cobre eletrolítico recozido homologada pela norma <strong>ISO 6722-1</strong>).
              </p>

              <div className="mw-quality-checks-list">
                <div className="mw-check-item">
                  <div className="mw-check-icon"><ShieldCheck size={20} color="#6BB345" /></div>
                  <div>
                    <strong>Padrão ISO 6722-1 Homologado</strong>
                    <p>Cabos com isolamento termoplástico de parede fina de alta rigidez dielétrica e resistência química.</p>
                  </div>
                </div>

                <div className="mw-check-item">
                  <div className="mw-check-icon"><Sparkles size={20} color="#6BB345" /></div>
                  <div>
                    <strong>Bancadas de Teste 100% Informatizadas</strong>
                    <p>Cada chicote é verificado eletricamente contra curto-circuito, resistência ôhmica e continuidade antes da expedição.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mw-about-metrics-card">
              <div className="mw-metric-tile">
                <span className="mw-metric-number">15+</span>
                <span className="mw-metric-label">Anos de Fabricação Especializada</span>
              </div>
              <div className="mw-metric-tile">
                <span className="mw-metric-number">100%</span>
                <span className="mw-metric-label">Componentes Certificados e Homologados</span>
              </div>
              <div className="mw-metric-tile">
                <span className="mw-metric-number">+1.200</span>
                <span className="mw-metric-label">Projetos de Chicotes Desenvolvidos</span>
              </div>
              <div className="mw-metric-tile">
                <span className="mw-metric-number">12</span>
                <span className="mw-metric-label">Meses de Garantia Direta de Fábrica</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
