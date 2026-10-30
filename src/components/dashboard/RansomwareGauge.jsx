import React from 'react';
import { Database, HardDrive, RotateCcw, ShieldCheck, Network, Lock, AlertTriangle } from 'lucide-react';

export default function RansomwareGauge({ ransomwareReadiness, onNavigateToChecklist }) {
  const { percentage, hasBackups, hasOffline, hasRestores, hasSegmentation, hasIRPlan, status } = ransomwareReadiness;

  const pillars = [
    { label: 'PLC & Logic Backups', status: hasBackups, icon: Database, tip: 'Current ladder logic archived' },
    { label: '3-2-1 Offline Air-Gap', status: hasOffline, icon: HardDrive, tip: 'Disconnected USB in fireproof safe' },
    { label: 'Restore Drills Tested', status: hasRestores, icon: RotateCcw, tip: 'Verified test restore in last 6 mos' },
    { label: 'IT/OT VLAN Isolation', status: hasSegmentation, icon: Network, tip: 'Firewall blocks lateral ransomware spread' },
    { label: 'Incident SOP Posted', status: hasIRPlan, icon: ShieldCheck, tip: 'Emergency cable-pull cards on lines' }
  ];

  const getStatusColor = () => {
    if (percentage >= 80) return '#10B981';
    if (percentage >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span className="cyber-tag" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
            Ransomware Defense
          </span>
          <h2 style={{ fontSize: '1.25rem', marginTop: '6px', color: '#FFFFFF' }}>
            Ransomware Resilience Gauge
          </h2>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: getStatusColor(), fontFamily: 'var(--font-mono)' }}>
            {percentage}%
          </div>
          <div style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase' }}>
            Preparedness: <strong style={{ color: getStatusColor() }}>{status}</strong>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div style={{
        height: '8px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '20px'
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          background: getStatusColor(),
          borderRadius: '4px',
          transition: 'width 0.6s ease'
        }} />
      </div>

      {/* 5 Defense Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '10px',
        flex: 1
      }}>
        {pillars.map(p => {
          const Icon = p.icon;
          const isPassed = p.status;
          return (
            <div
              key={p.label}
              style={{
                padding: '12px 10px',
                borderRadius: '8px',
                background: isPassed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.06)',
                border: isPassed ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Icon size={18} color={isPassed ? '#10B981' : '#EF4444'} />
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: isPassed ? '#10B981' : '#EF4444',
                  textTransform: 'uppercase'
                }}>
                  {isPassed ? 'READY' : 'DEFICIT'}
                </span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#F1F5F9', lineHeight: 1.2 }}>
                  {p.label}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748B', marginTop: '4px' }}>
                  {p.tip}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Remediation Note */}
      {percentage < 100 && (
        <div style={{
          marginTop: '16px',
          padding: '10px 14px',
          borderRadius: '6px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#94A3B8'
        }}>
          <span>Complete missing tasks in Action Checklist to reach 100% immune state.</span>
          <button 
            onClick={onNavigateToChecklist}
            className="btn btn-outline-cyan"
            style={{ padding: '3px 10px', fontSize: '0.7rem' }}
          >
            Action Plan →
          </button>
        </div>
      )}
    </div>
  );
}
