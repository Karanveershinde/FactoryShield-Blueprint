import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Info, TrendingUp } from 'lucide-react';

export default function RiskScoreWidget({ assessmentState, lang = 'en', onNavigateToChecklist }) {
  const { dynamicScore, rawScore, riskLevel, riskColor, riskBg, deductions, tasks } = assessmentState;

  // Calculate SVG circular arc values
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  // Offset for percentage
  const strokeDashoffset = circumference - (dynamicScore / 100) * circumference;

  const pointsRecovered = dynamicScore - rawScore;

  return (
    <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Card Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span className="cyber-tag" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.25)' }}>
            OT Cyber Risk Index
          </span>
          <h2 style={{ fontSize: '1.25rem', marginTop: '6px', color: '#FFFFFF' }}>
            {lang === 'hi' ? 'साइबर जोखिम स्कोर' : 'Overall Security Posture'}
          </h2>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '20px',
          background: riskBg,
          border: `1px solid ${riskColor}55`,
          color: riskColor,
          fontWeight: 700,
          fontSize: '0.8rem'
        }}>
          {riskLevel === 'High' ? <ShieldAlert size={16} /> : riskLevel === 'Medium' ? <AlertTriangle size={16} /> : <ShieldCheck size={16} />}
          <span>{riskLevel} Risk</span>
        </div>
      </div>

      {/* Main Dial & Metric */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '14px 0 20px 0' }}>
        {/* SVG Radial Gauge */}
        <div style={{ position: 'relative', width: '170px', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="170" height="170" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background track */}
            <circle
              cx="85"
              cy="85"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="14"
              fill="transparent"
            />
            {/* Dynamic Value Arc */}
            <circle
              cx="85"
              cy="85"
              r={radius}
              stroke={riskColor}
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.4s ease'
              }}
            />
          </svg>

          {/* Center Value */}
          <div style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {dynamicScore}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              OUT OF 100
            </span>
          </div>
        </div>

        {/* Posture Context Summary */}
        <div style={{ maxWidth: '220px' }}>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Posture Evaluation
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F8FAFC', marginTop: '4px' }}>
            {dynamicScore >= 71 
              ? 'Defensive Perimeter Active' 
              : dynamicScore >= 41 
              ? 'Moderate Vulnerabilities' 
              : 'Severe Exposure to Outages'}
          </div>

          {pointsRecovered > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '10px',
              padding: '6px 10px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '6px',
              fontSize: '0.75rem',
              color: '#34D399'
            }}>
              <TrendingUp size={14} />
              <span>+{pointsRecovered} pts recovered via Checklist!</span>
            </div>
          )}

          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '10px', lineHeight: 1.4 }}>
            IEC 62443 scoring benchmark for Tier-2 Indian discrete manufacturing.
          </div>
        </div>
      </div>

      {/* Major Deductions Breakdown */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>
            Top Penalty Weaknesses ({deductions.length} Identified)
          </span>
          <button 
            onClick={onNavigateToChecklist}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00F0FF',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Fix in Checklist →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '140px', overflowY: 'auto' }}>
          {deductions.slice(0, 3).map((d, i) => (
            <div 
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                fontSize: '0.78rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: d.severity === 'Critical' ? '#EF4444' : '#F59E0B'
                }} />
                <span style={{ color: '#F1F5F9', fontWeight: 500 }}>{d.factor}</span>
              </div>
              <span style={{ color: '#EF4444', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                -{d.penalty} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
