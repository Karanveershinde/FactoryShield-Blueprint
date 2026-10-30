import React from 'react';
import { Cpu, Server, Monitor, Radio, Laptop, ShieldCheck, ShieldAlert, Bot, Cog } from 'lucide-react';

export default function AssetOverview({ assetSummary, dynamicScore, onNavigateToInventory }) {
  const { total, protected: protectedCount, unprotected, plcs, scada, hmis, iot, workstations } = assetSummary;

  const protectedPct = total > 0 ? Math.round((protectedCount / total) * 100) : 0;

  const assetCategories = [
    { label: 'PLCs', count: plcs, icon: Cpu, desc: 'Siemens, Schneider, Delta', color: '#00F0FF' },
    { label: 'SCADA / Historian', count: scada, icon: Server, desc: 'WinCC & Wonderware servers', color: '#38BDF8' },
    { label: 'HMIs', count: hmis, icon: Monitor, desc: 'Touch panels on Lines 1-3', color: '#818CF8' },
    { label: 'Connected CNCs', count: 6, icon: Cog, desc: 'Milling & Hobbing units', color: '#A78BFA' },
    { label: 'Robots', count: 4, icon: Bot, desc: 'Welding & Palletizing cells', color: '#F472B6' },
    { label: 'IIoT Sensors', count: iot, icon: Radio, desc: 'Vibration & Energy monitors', color: '#34D399' },
    { label: 'Workstations', count: workstations, icon: Laptop, desc: 'Engineering & Maintenance laptops', color: '#FBBF24' }
  ];

  return (
    <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span className="cyber-tag" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            Plant OT Inventory
          </span>
          <h2 style={{ fontSize: '1.25rem', marginTop: '6px', color: '#FFFFFF' }}>
            Connected Industrial Assets
          </h2>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
            {total}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase' }}>
            Total Registered
          </div>
        </div>
      </div>

      {/* Protected vs Unprotected Progress Bar */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '16px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#10B981" />
            <span style={{ fontSize: '0.8rem', color: '#F8FAFC', fontWeight: 600 }}>
              {protectedCount} Protected ({protectedPct}%)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600 }}>
              {unprotected} Unhardened ({100 - protectedPct}%)
            </span>
            <ShieldAlert size={16} color="#EF4444" />
          </div>
        </div>

        {/* Dual Bar */}
        <div style={{
          height: '10px',
          background: 'rgba(239, 68, 68, 0.3)',
          borderRadius: '5px',
          overflow: 'hidden',
          display: 'flex'
        }}>
          <div style={{
            height: '100%',
            width: `${protectedPct}%`,
            background: 'linear-gradient(90deg, #10B981, #00F0FF)',
            transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }} />
        </div>

        <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '8px', textAlign: 'center' }}>
          Assets become 'Protected' as action checklist items (passwords, backups, VLANs) are marked completed.
        </div>
      </div>

      {/* Asset category grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '10px',
        flex: 1
      }}>
        {assetCategories.map(cat => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.label}
              style={{
                padding: '12px 10px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Icon size={18} color={cat.color} />
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                  {cat.count}
                </span>
              </div>
              <div style={{ marginTop: '8px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#F1F5F9' }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {cat.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
