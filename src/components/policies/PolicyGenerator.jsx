import React, { useState } from 'react';
import { POLICY_TEMPLATES } from '../../data/policiesData';
import { 
  FileCheck2, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  Sliders, 
  Edit3, 
  Eye,
  FileText
} from 'lucide-react';

export default function PolicyGenerator({ factory }) {
  const [selectedPolicy, setSelectedPolicy] = useState(POLICY_TEMPLATES[0]);
  const [policyOptions, setPolicyOptions] = useState({
    includeVendorRemote: true,
    includeUSBMedia: true,
    includeMobileProhibition: true,
    includeEmergencyChange: true,
    includePreBackupMandate: true,
    includeOfflineSafe: true,
    includeRestorationDrill: true,
    includeRansomwareProtocol: true,
    includeEscalationContacts: true
  });
  const [customText, setCustomText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate current policy content based on factory + toggle options
  const activeContent = isEditing && customText
    ? customText
    : selectedPolicy.generateContent(factory, policyOptions);

  const handleToggle = (key) => {
    setPolicyOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setIsEditing(false); // Reset custom edit when toggles change to regenerate
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([activeContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedPolicy.id}_${selectedPolicy.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
      {/* Header */}
      <div className="cyber-card" style={{ marginBottom: '24px', padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="cyber-tag" style={{ background: 'rgba(244, 114, 182, 0.1)', color: '#F472B6', border: '1px solid rgba(244, 114, 182, 0.3)' }}>
            Feature 5: Plain-Language Policies
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
            Non-Legalistic Industrial Governance Docs
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginTop: '8px' }}>
          Automated OT Security Policy Generator
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '4px' }}>
          Clear, concise policies that shop-floor supervisors, line technicians, and directors can immediately understand and enforce.
        </p>
      </div>

      {/* Main Grid Layout: Policy Selector + Customizer Controls + Live Document View */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Select Policy & Customization Toggles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Policy Cards List */}
          <div className="cyber-card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px' }}>
              Select Policy Template
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {POLICY_TEMPLATES.map(p => {
                const isSelected = selectedPolicy.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPolicy(p);
                      setIsEditing(false);
                      setCustomText('');
                    }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(244, 114, 182, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: isSelected ? '1px solid #F472B6' : '1px solid rgba(255, 255, 255, 0.06)',
                      color: isSelected ? '#FFFFFF' : '#CBD5E1',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.3 }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: isSelected ? '#F472B6' : '#64748B', marginTop: '4px' }}>
                      {p.category} • {p.effectiveDays}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clause Customizer Toggles */}
          <div className="cyber-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Sliders size={16} color="#00F0FF" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase' }}>
                Policy Clause Toggles
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedPolicy.toggles.map(t => {
                const isChecked = !!policyOptions[t.key];
                return (
                  <div
                    key={t.key}
                    onClick={() => handleToggle(t.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      background: isChecked ? 'rgba(0, 240, 255, 0.06)' : 'rgba(0, 0, 0, 0.2)',
                      border: isChecked ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', color: isChecked ? '#F8FAFC' : '#94A3B8', fontWeight: isChecked ? 600 : 400, flex: 1, paddingRight: '8px' }}>
                      {t.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      style={{ accentColor: '#00F0FF', width: '16px', height: '16px' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Policy Document Preview & Action Bar */}
        <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Top Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '16px',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div>
              <span className="badge badge-cyan">{selectedPolicy.version}</span>
              <h2 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginTop: '6px' }}>
                {selectedPolicy.title}
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  if (!isEditing) setCustomText(activeContent);
                  setIsEditing(!isEditing);
                }}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                {isEditing ? <Eye size={14} /> : <Edit3 size={14} />}
                <span>{isEditing ? 'Preview Mode' : 'Edit Text'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="btn btn-outline-cyan"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                <Printer size={14} />
                <span>Print SOP</span>
              </button>

              <button
                onClick={handleDownload}
                className="btn btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.75rem' }}
              >
                <Download size={14} />
                <span>Download .MD</span>
              </button>
            </div>
          </div>

          {/* Document Content View */}
          {isEditing ? (
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              style={{
                width: '100%',
                height: '520px',
                background: '#070d1e',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                borderRadius: '8px',
                padding: '20px',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                outline: 'none',
                resize: 'vertical'
              }}
            />
          ) : (
            <div style={{
              background: '#070d1e',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '28px',
              fontFamily: 'var(--font-sans)',
              color: '#CBD5E1',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              maxHeight: '600px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {activeContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
