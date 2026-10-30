import React from 'react';
import { 
  ClipboardCheck, 
  Compass, 
  Code2, 
  ListTodo, 
  FileCheck2, 
  FileText,
  ArrowRight
} from 'lucide-react';

export default function QuickActionGrid({ onNavigate }) {
  const actions = [
    {
      id: 'assessment',
      title: 'Run Cyber Assessment',
      desc: '6-step OT questionnaire to uncover vulnerabilities across shop floor assets.',
      icon: ClipboardCheck,
      color: '#00F0FF',
      badge: 'Step 1-6 Wizard'
    },
    {
      id: 'blueprint',
      title: 'Custom Security Blueprint',
      desc: 'Rules-based architecture: Network zones, Purdue conduits, PLC hardening.',
      icon: Compass,
      color: '#38BDF8',
      badge: 'IEC 62443 Aligned'
    },
    {
      id: 'templates',
      title: 'Configuration Templates',
      desc: 'Vendor-neutral configs: pfSense, VLANs, PLC keyswitches, Windows IoT.',
      icon: Code2,
      color: '#818CF8',
      badge: '7 Copy-Paste Packs'
    },
    {
      id: 'checklist',
      title: 'Prioritized Action Plan',
      desc: 'Immediate 1-2 wks, 1-3 mos, 3-12 mos tasks with dynamic risk score update.',
      icon: ListTodo,
      color: '#34D399',
      badge: 'Interactive Tracker'
    },
    {
      id: 'policies',
      title: 'Plain-Language Policies',
      desc: 'Auto-generate SME-ready Access, Backup, Change Management & SOP docs.',
      icon: FileCheck2,
      color: '#F472B6',
      badge: '4 Core Documents'
    },
    {
      id: 'reports',
      title: 'Executive Reports & Export',
      desc: 'One-click downloadable vector PDF reports for management, audits & insurers.',
      icon: FileText,
      color: '#FBBF24',
      badge: 'Print & PDF Ready'
    }
  ];

  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 700 }}>
          FactoryShield Core Cyber-Resilience Modules
        </h3>
        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
          Select any module to start hardening your plant
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {actions.map(act => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              onClick={() => onNavigate(act.id)}
              className="cyber-card"
              style={{
                cursor: 'pointer',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: `${act.color}15`,
                    border: `1px solid ${act.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} color={act.color} />
                  </div>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: `${act.color}15`,
                    color: act.color,
                    border: `1px solid ${act.color}33`,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {act.badge}
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '6px' }}>
                  {act.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.4 }}>
                  {act.desc}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '16px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: act.color
              }}>
                <span>Launch Module</span>
                <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
