import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import type { PageRoute } from '../router';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'Cotação de Chicotes Elétricos',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Olá! Gostaria de falar com o comercial da Mega Whip.\nNome: ${formData.name || 'Cliente'}\nEmpresa: ${formData.company || 'Não informado'}\nAssunto: ${formData.subject}\nMensagem: ${formData.message || 'Gostaria de mais informações.'}`
    );
    window.open(`https://wa.me/551438131160?text=${text}`, '_blank');
  };

  return (
    <div className="mw-contact-page">
      {/* PAGE HEADER */}
      <section className="mw-page-header">
        <div className="mw-container">
          <div className="mw-breadcrumb">
            <span onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Início</span>
            <span>/</span>
            <span className="current">Fale Conosco</span>
          </div>
          <h1 className="mw-page-title">Canais de Atendimento Corporativo</h1>
          <p className="mw-page-subtitle">
            Entre em contato direto com a fábrica em Botucatu – SP para cotações em lote, suporte de engenharia ou homologação de compras.
          </p>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL DE CONTATO */}
      <section className="mw-institutional-section mw-bg-white">
        <div className="mw-container">
          <div className="mw-contact-grid">
            {/* INFORMAÇÕES DA FÁBRICA */}
            <div className="mw-contact-info-panel">
              <h2 className="mw-contact-panel-title">Mega Whip Chicotes Elétricos</h2>
              <p className="mw-contact-panel-desc">
                Unidade fabril e centro de distribuição logística para atendimento em todo o território nacional.
              </p>

              <div className="mw-contact-item-box">
                <div className="mw-contact-icon-circle"><MapPin size={20} color="#6BB345" /></div>
                <div>
                  <strong>Endereço da Fábrica</strong>
                  <p>Botucatu – SP, Brasil<br />Pólo Industrial Tecnológico</p>
                </div>
              </div>

              <div className="mw-contact-item-box">
                <div className="mw-contact-icon-circle"><Phone size={20} color="#6BB345" /></div>
                <div>
                  <strong>Telefones da Fábrica</strong>
                  <p>
                    <a href="tel:+551438131160">(14) 3813-1160</a> / <a href="tel:+551438131127">(14) 3813-1127</a>
                  </p>
                </div>
              </div>

              <div className="mw-contact-item-box">
                <div className="mw-contact-icon-circle"><MessageCircle size={20} color="#6BB345" /></div>
                <div>
                  <strong>WhatsApp Comercial & Plantão</strong>
                  <p>
                    <a
                      href="https://wa.me/551438131160?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20minha%20empresa."
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#166534', fontWeight: 600 }}
                    >
                      (14) 3813-1160 (Iniciar Conversa)
                    </a>
                  </p>
                </div>
              </div>

              <div className="mw-contact-item-box">
                <div className="mw-contact-icon-circle"><Mail size={20} color="#6BB345" /></div>
                <div>
                  <strong>E-mails de Atendimento</strong>
                  <p>
                    vendas@megawhip.com.br<br />
                    engenharia@megawhip.com.br
                  </p>
                </div>
              </div>

              <div className="mw-contact-item-box">
                <div className="mw-contact-icon-circle"><Clock size={20} color="#6BB345" /></div>
                <div>
                  <strong>Horário de Expediente</strong>
                  <p>Segunda a Sexta-feira: 07h30 às 17h30 (Horário de Brasília)</p>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO DE CONTATO */}
            <div className="mw-contact-form-panel">
              {submitted ? (
                <div className="mw-contact-success-card">
                  <CheckCircle2 size={54} color="#6BB345" />
                  <h3>Mensagem Registrada com Sucesso!</h3>
                  <p>
                    Obrigado pelo contato, <strong>{formData.name}</strong>. Nossa equipe técnica entrará em contato com sua empresa em até 2 horas úteis.
                  </p>
                  <button
                    type="button"
                    className="mw-btn-primary"
                    onClick={handleWhatsAppDirect}
                    style={{ marginTop: '16px' }}
                  >
                    <MessageCircle size={16} />
                    Agilizar pelo WhatsApp Agora
                  </button>
                  <button
                    type="button"
                    className="mw-btn-secondary"
                    onClick={() => setSubmitted(false)}
                    style={{ marginTop: '10px' }}
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mw-contact-form">
                  <h3 className="mw-form-title">Envie uma Solicitação de Cotação</h3>
                  <p className="mw-form-subtitle">Preencha os dados abaixo e entraremos em contato rapidamente.</p>

                  <div className="mw-form-row">
                    <div className="mw-form-group">
                      <label htmlFor="name">Seu Nome *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Ex: Carlos Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="mw-form-group">
                      <label htmlFor="company">Empresa / Usina / Concessionária</label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Ex: Usina São Martinho"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mw-form-row">
                    <div className="mw-form-group">
                      <label htmlFor="email">E-mail Corporativo *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="carlos@empresa.com.br"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="mw-form-group">
                      <label htmlFor="phone">Telefone / WhatsApp *</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="(14) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mw-form-group">
                    <label htmlFor="subject">Assunto Principal</label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Cotação de Chicotes Elétricos">Cotação de Chicotes Elétricos</option>
                      <option value="Desenvolvimento de Chicote Sob Medida">Desenvolvimento de Chicote Sob Medida</option>
                      <option value="Cadastro de Revenda / Concessionária">Cadastro de Revenda / Concessionária</option>
                      <option value="Dúvida Técnica / Compatibilidade OEM">Dúvida Técnica / Compatibilidade OEM</option>
                      <option value="Outro Assunto">Outro Assunto</option>
                    </select>
                  </div>

                  <div className="mw-form-group">
                    <label htmlFor="message">Mensagem ou Part Numbers de Interesse *</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Descreva quais chicotes você precisa, modelos de colheitadeiras ou part numbers..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="mw-form-actions">
                    <button type="submit" className="mw-btn-primary" style={{ flex: 1 }}>
                      <Send size={16} />
                      Enviar Solicitação
                    </button>
                    <button
                      type="button"
                      className="mw-btn-secondary"
                      onClick={handleWhatsAppDirect}
                      title="Enviar via WhatsApp comercial"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
