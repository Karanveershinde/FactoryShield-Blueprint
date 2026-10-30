import React, { useState } from 'react';
import { 
  CONFIG_TEMPLATES, 
  TEMPLATE_CATEGORIES 
} from '../../data/templatesData';
import { 
  Search, 
  Copy, 
  Download, 
  Check, 
  ShieldAlert, 
  Code2, 
  Clock, 
  FileCode,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export default function TemplatesLibrary({ preSelectedId = null }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTemplate, setActiveTemplate] = useState(
    preSelectedId 
      ? CONFIG_TEMPLATES.find(t => t.id === preSelectedId) || CONFIG_TEMPLATES[0] 
      : CONFIG_TEMPLATES[0]
  );
  const [copied, setCopied] = useState(false);

  // Filter templates
  const filteredTemplates = CONFIG_TEMPLATES.filter(tpl => {
    const matchCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchQuery = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       tpl.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (tpl) => {
    const element = document.createElement("a");
    const file = new Blob([tpl.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${tpl.id}_${tpl.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.conf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div className="cyber-card" style={{ marginBottom: '24px', padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="cyber-tag" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
            Feature 3: Configuration Templates
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
            Ready-to-Use Industrial Hardening Scripts
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginTop: '8px' }}>
          Vendor-Neutral Configuration & Script Library
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '4px' }}>
          Copy-pasteable scripts, firewall rules, and RBAC matrices tailored for low-cost Indian SME factory environments.
        </p>

        {/* Mandatory OT Safety Warning */}
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(239, 68, 68, 0.08)',
          borderLeft: '4px solid #EF4444',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <ShieldAlert size={20} color="#EF4444" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.78rem', color: '#FCA5A5', lineHeight: 1.4 }}>
            <strong>CRITICAL OT SAFETY DISCLAIMER:</strong> All configuration examples are vendor-neutral and illustrative. Qualified industrial automation personnel must review and validate all changes in a staging environment or during a scheduled maintenance shutdown before applying to live factory production machinery.
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Categories, Search & List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px'
          }}>
            <Search size={16} color="#64748B" />
            <input
              type="text"
              placeholder="Search templates or ports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '0.82rem',
                outline: 'none',
                width: '100%'
              }}
            />
          </div>

          {/* Category Filter Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {TEMPLATE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedCategory === cat ? '#00F0FF' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCategory === cat ? '#070d1e' : '#94A3B8',
                  border: selectedCategory === cat ? '1px solid #00F0FF' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Template Cards List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            {filteredTemplates.map(tpl => {
              const isSelected = activeTemplate?.id === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setActiveTemplate(tpl)}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(0, 240, 255, 0.1)' : 'var(--bg-card)',
                    border: isSelected ? '1px solid #00F0FF' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                      {tpl.category}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={11} /> {tpl.estimatedTime}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', marginTop: '4px', lineHeight: 1.3 }}>
                    {tpl.name}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {tpl.benefits}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Template Detail & Code Viewer */}
        {activeTemplate && (
          <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Template Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-cyan">{activeTemplate.category}</span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Difficulty: <strong>{activeTemplate.difficulty}</strong></span>
                </div>
                <h2 style={{ fontSize: '1.3rem', color: '#FFFFFF', marginTop: '6px' }}>
                  {activeTemplate.name}
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#CBD5E1', marginTop: '4px' }}>
                  {activeTemplate.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleCopy(activeTemplate.content)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.78rem' }}
                >
                  {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Config'}</span>
                </button>

                <button
                  onClick={() => handleDownload(activeTemplate)}
                  className="btn btn-primary"
                  style={{ padding: '8px 14px', fontSize: '0.78rem' }}
                >
                  <Download size={14} />
                  <span>Download .conf</span>
                </button>
              </div>
            </div>

            {/* Security Benefit Pill */}
            <div style={{
              padding: '10px 14px',
              borderRadius: '6px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '0.78rem',
              color: '#A7F3D0',
              marginBottom: '16px'
            }}>
              <strong>Security Benefit:</strong> {activeTemplate.benefits}
            </div>

            {/* Code / Script Block */}
            <div style={{ position: 'relative' }}>
              <pre style={{
                background: '#070d1e',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '18px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#38BDF8',
                lineHeight: 1.5,
                overflowX: 'auto',
                maxHeight: '480px',
                whiteSpace: 'pre'
              }}>
                {activeTemplate.content}
              </pre>
            </div>

            {/* Specific Warning for this template */}
            {activeTemplate.warning && (
              <div style={{
                marginTop: '16px',
                padding: '10px 14px',
                borderRadius: '6px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                fontSize: '0.75rem',
                color: '#FCD34D'
              }}>
                <strong>Implementation Notice:</strong> {activeTemplate.warning}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
