import React from 'react';
import { 
  AlertTriangle, 
  User, 
  Building, 
  RotateCcw, 
  Languages, 
  ShieldAlert,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function Header({
  currentUser,
  setCurrentUser,
  factory,
  lang,
  setLang,
  onOpenEmergencyModal,
  onResetDemoData,
  onOpenAuthModal
}) {
  const roles = [
    'Factory Owner',
    'Plant Manager',
    'IT/OT Engineer',
    'Production Supervisor'
  ];

  return (
    <header style={{
      height: '70px',
      background: 'rgba(10, 19, 41, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Left: Active Facility Info & Fast Demo Reset */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 12px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <Building size={16} color="#00F0FF" />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
              {factory.name}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>
              {factory.location}
            </div>
          </div>
        </div>

        {/* Demo Fast Reset Button */}
        <button
          onClick={onResetDemoData}
          title="Reload baseline Pune automotive factory assessment"
          className="btn btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
        >
          <RotateCcw size={14} />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Right Controls: Role Switcher, Language Toggle, Emergency Button, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="btn btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
          title="Toggle English / हिंदी labels"
        >
          <Languages size={15} color="#00F0FF" />
          <span>{lang === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
        </button>

        {/* Role Switcher (Crucial for Hackathon evaluation of 4 target personas!) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 240, 255, 0.05)',
          padding: '4px 10px',
          borderRadius: '8px',
          border: '1px solid rgba(0, 240, 255, 0.2)'
        }}>
          <span style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Role:
          </span>
          <select
            value={currentUser.role}
            onChange={(e) => setCurrentUser(prev => ({ ...prev, role: e.target.value }))}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00F0FF',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {roles.map(r => (
              <option key={r} value={r} style={{ background: '#0a1329', color: '#FFFFFF' }}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Emergency Incident Response Button */}
        <button
          onClick={onOpenEmergencyModal}
          className="btn btn-danger"
          style={{
            padding: '8px 16px',
            fontSize: '0.82rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: '0.02em',
            animation: 'pulse 2s infinite'
          }}
        >
          <ShieldAlert size={16} />
          <span>I'm Facing a Security Issue</span>
        </button>

        {/* User Account / Profile */}
        <div 
          onClick={onOpenAuthModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '5px 10px',
            borderRadius: '8px',
            cursor: 'pointer',
            border: '1px solid transparent',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0077B6, #00F0FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#070d1e',
            fontWeight: 800,
            fontSize: '0.85rem'
          }}>
            {currentUser.name.charAt(0)}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2 }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
              {currentUser.role}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
