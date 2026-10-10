import React, { useState } from 'react';
import { CheckCircle, Layers, Box, Camera, Sparkles, Info, MessageSquare, Eye, ChevronRight } from 'lucide-react';
import type { Product } from '../types';
import type { HarvesterHotspot } from '../types/harvester';
import { HARVESTER_HOTSPOTS } from '../types/harvester';
import { Harvester3D } from './Harvester3D';
import harvesterPhoto from '../assets/john-deere-s790.png';

const SHORT_NAMES: Record<string, string> = {
  'corte-base': 'Plataforma Draper',
  'chassi-dianteiro': 'Garganta Alimentadora',
  'bloco-motor': 'Motor PowerTech',
  'estrutura-esquerda': 'Central Hidráulica',
  'caixa-fusiveis': 'Cabine CommandARM',
  'elevador-descarga': 'Tubo de Descarga',
};

interface InteractiveHarvesterProps {
  onSelectProductCode?: (code: string) => void;
  onOpenProductDetail?: (product: Product) => void;
}

export const InteractiveHarvester: React.FC<InteractiveHarvesterProps> = ({
  onSelectProductCode,
}) => {
  const [selectedSpot, setSelectedSpot] = useState<HarvesterHotspot>(HARVESTER_HOTSPOTS[0]);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');

  return (
    <section className="mw-harvester-section">
      <div className="mw-container">
        {/* Section Heading */}
        <div className="mw-harvester-header">
          <div className="mw-section-badge">
            <Layers size={14} color="#6BB345" />
            <span>Raio-X Técnico Interativo • John Deere S790</span>
          </div>
          <h2 className="mw-harvester-title">
            Onde os <strong>Chicotes Mega Whip</strong> operam na sua colheitadeira?
          </h2>
          <p className="mw-harvester-desc">
            Inspecione o modelo 3D em 360° ou a foto real nos pontos de operação dos chicotes elétricos.
            Clique nos números interativos para visualizar o chicote correspondente e as normas de isolamento.
          </p>
        </div>

        {/* Interactive Workspace: 3D / Photo + Details Inspector Panel */}
        <div className="mw-harvester-workspace">
          {/* Left / Center: Interactive Harvester Canvas Card */}
          <div className="mw-harvester-canvas-card">
            {/* Top Toolbar */}
            <div className="mw-canvas-toolbar">
              <div className="mw-canvas-indicator">
                <span className="mw-pulse-dot"></span>
                <span>
                  {viewMode === '3d' ? 'Modelo 3D Interativo 360°' : 'Foto Real Ultra-HD'}
                </span>
              </div>

              {/* View Switcher: 3D vs Photo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '3px',
                    gap: '4px',
                  }}
                >
                  <button
                    type="button"
                    className={`mw-view-btn ${viewMode === '3d' ? 'active' : ''}`}
                    onClick={() => setViewMode('3d')}
                    title="Modo 3D Interativo 360°"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      background: viewMode === '3d' ? '#1E293B' : 'transparent',
                      color: viewMode === '3d' ? '#FFFFFF' : '#475569',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Box size={14} color={viewMode === '3d' ? '#6BB345' : '#64748B'} />
                    <span>Modelo 3D</span>
                  </button>

                  <button
                    type="button"
                    className={`mw-view-btn ${viewMode === 'photo' ? 'active' : ''}`}
                    onClick={() => setViewMode('photo')}
                    title="Foto Real em Alta Definição"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      background: viewMode === 'photo' ? '#367C2B' : 'transparent',
                      color: viewMode === 'photo' ? '#FFFFFF' : '#475569',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Camera size={14} color={viewMode === 'photo' ? '#FFFFFF' : '#367C2B'} />
                    <span>Foto Real</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mw-harvester-canvas-wrapper">
              {/* 1. MODO FOTO REAL (100% REALISTA) */}
              {viewMode === 'photo' && (
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    background: '#0F172A',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  }}
                >
                  <img
                    src={harvesterPhoto}
                    alt="Colheitadeira John Deere S790 com Plataforma Draper 740FD"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      maxHeight: '560px',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Hotspots Sobrepostos na Foto Real */}
                  {HARVESTER_HOTSPOTS.map((spot, idx) => {
                    const isSelected = selectedSpot.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        className={`mw-hotspot-pin ${isSelected ? 'active' : ''}`}
                        style={{ left: `${spot.photoX}%`, top: `${spot.photoY}%` }}
                        onClick={() => setSelectedSpot(spot)}
                        aria-label={`Ver chicote de ${spot.name}`}
                      >
                        <span className="mw-hotspot-ripple"></span>
                        <span className="mw-hotspot-core">{idx + 1}</span>
                        <span className="mw-hotspot-label-tag">{spot.name}</span>
                      </button>
                    );
                  })}

                  {/* Legenda Informativa no canto inferior */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      color: '#1E293B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      pointerEvents: 'none',
                    }}
                  >
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#367C2B',
                        boxShadow: '0 0 0 2px #BBF7D0',
                      }}
                    ></span>
                    <span>
                      <strong>John Deere S790</strong> • Plataforma Draper 740FD • Fiação Mapeada
                    </span>
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      pointerEvents: 'none',
                    }}
                  >
                    <Sparkles size={12} color="#6BB345" />
                    <span>Clique nos pontos 1 a 6 para inspecionar o chicote</span>
                  </div>
                </div>
              )}

              {/* 2. MODO 3D INTERATIVO 360° */}
              {viewMode === '3d' && (
                <Harvester3D
                  selectedSpotId={selectedSpot.id}
                  onSelectSpot={(spot) => setSelectedSpot(spot)}
                />
              )}

              {/* Bottom Quick Navigator for spots */}
              <div className="mw-spots-nav-row">
                {HARVESTER_HOTSPOTS.map((spot, i) => (
                  <button
                    key={spot.id}
                    className={`mw-spot-pill-btn ${selectedSpot.id === spot.id ? 'active' : ''}`}
                    onClick={() => setSelectedSpot(spot)}
                  >
                    <span className="mw-spot-pill-num">{i + 1}</span>
                    <span className="mw-spot-pill-title">{SHORT_NAMES[spot.id] || spot.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Inspector Card for the Selected Hotspot */}
          <div className="mw-spot-details-panel">
            <div className="mw-panel-badge">
              <CheckCircle size={14} color="#6BB345" />
              <span>Chicote Homologado Mega Whip</span>
            </div>

            <h3 className="mw-spot-panel-title">{selectedSpot.name}</h3>
            <p className="mw-spot-panel-subsystem">{selectedSpot.subsystem}</p>

            {/* Product Image & Mega Codes */}
            <div className="mw-spot-product-hero">
              <div className="mw-spot-img-container">
                <img
                  src={selectedSpot.fotoChicote}
                  alt={selectedSpot.name}
                  className="mw-spot-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://megawhip.com.br/wp-content/uploads/2023/07/logo-mw-Cinza-top.webp';
                  }}
                />
              </div>

              <div className="mw-spot-codes-block">
                <div className="mw-spec-kv">
                  <span className="k">Código Mega Whip:</span>
                  <span className="v mega">MW {selectedSpot.codigoMega}</span>
                </div>
                <div className="mw-spec-kv">
                  <span className="k">Part Number Original:</span>
                  <span className="v pn">{selectedSpot.partNumber}</span>
                </div>
                <div className="mw-spec-kv">
                  <span className="k">Norma Técnica:</span>
                  <span className="v green">{selectedSpot.norma}</span>
                </div>
              </div>
            </div>

            {/* Technical description */}
            <div className="mw-spot-desc-card">
              <p>{selectedSpot.descricao}</p>
            </div>

            {/* Brands and Models Compatibility Box */}
            <div className="mw-brands-box">
              <div className="mw-brands-header">
                <Info size={15} color="#0284C7" />
                <span>Marcas e Modelos que utilizam este chicote:</span>
              </div>

              <div className="mw-brands-list">
                {selectedSpot.marcas.map((marca) => (
                  <div key={marca.nome} className="mw-brand-card-item">
                    <div className="mw-brand-card-top">
                      <span
                        className="mw-brand-bullet"
                        style={{ backgroundColor: marca.logoColor }}
                      ></span>
                      <strong className="mw-brand-nome">{marca.nome}</strong>
                    </div>

                    <div className="mw-modelos-chips">
                      {marca.modelos.map((m) => (
                        <span key={m} className="mw-modelo-tag">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mw-spot-actions">
              <a
                href={`https://wa.me/551438131160?text=${encodeURIComponent(
                  `Olá Mega Whip! Gostaria de cotar o chicote elétrico de ${selectedSpot.name} (PN: ${selectedSpot.partNumber} / Cód. Mega: ${selectedSpot.codigoMega}) para minha colheitadeira John Deere / Case IH.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mw-btn-whatsapp-spot"
              >
                <MessageSquare size={16} />
                <span>Cotar Chicote deste Ponto</span>
              </a>

              {onSelectProductCode && (
                <button
                  type="button"
                  className="mw-btn-view-in-catalog"
                  onClick={() => onSelectProductCode(selectedSpot.partNumber)}
                >
                  <Eye size={16} />
                  <span>Localizar no Catálogo</span>
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default InteractiveHarvester;
