import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  ClipboardCheck, 
  Compass, 
  Code2, 
  ListTodo, 
  FileCheck2, 
  ShieldAlert, 
  AlertOctagon, 
  FileText, 
  Settings,
  Shield,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, assessmentState, lang = 'en' }) {
  const { dynamicScore, riskLevel, riskColor, alerts, tasks } = assessmentState;

  const incompleteTasksCount = tasks?.all?.filter(t => t.status !== 'Completed').length || 
    (tasks?.immediate?.length + tasks?.medium?.length + tasks?.longTerm?.length) || 0;
  const activeAlertsCount = alerts?.filter(a => a.status === 'Active').length || 0;

  const navItems = [
    { id: 'dashboard', label: lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'profile', label: lang === 'hi' ? 'कारखाना प्रोफाइल' : 'Factory Profile', icon: Building2, badge: null },
    { id: 'assessment', label: lang === 'hi' ? 'साइबर मूल्यांकन' : 'Cyber Assessment', icon: ClipboardCheck, badge: 'Step 1-6' },
    { id: 'blueprint', label: lang === 'hi' ? 'सुरक्षा ब्लूप्रिंट' : 'Security Blueprint', icon: Compass, badge: 'Custom' },
    { id: 'templates', label: lang === 'hi' ? 'कॉन्फ़िगरेशन टेम्पलेट्स' : 'Config Templates', icon: Code2, badge: '7 Packs' },
    { id: 'checklist', label: lang === 'hi' ? 'प्राथमिकता कार्य सूची' : 'Action Checklist', icon: ListTodo, badge: incompleteTasksCount > 0 ? `${incompleteTasksCount}` : null, badgeColor: '#00F0FF' },
    { id: 'policies', label: lang === 'hi' ? 'नीति जनरेटर' : 'Policy Generator', icon: FileCheck2, badge: '4 Docs' },
    { id: 'monitoring', label: lang === 'hi' ? 'खतरा निगरानी' : 'Threat Monitoring', icon: ShieldAlert, badge: activeAlertsCount > 0 ? `${activeAlertsCount}` : null, badgeColor: '#EF4444' },
    { id: 'incidents', label: lang === 'hi' ? 'घटना प्रबंधन' : 'Incident Management', icon: AlertOctagon, badge: 'SOP' },
    { id: 'reports', label: lang === 'hi' ? 'रिपोर्ट सेंटर' : 'Reports & Export', icon: FileText, badge: 'PDF' },
    { id: 'settings', label: lang === 'hi' ? 'सेटिंग्स' : 'Settings', icon: Settings, badge: null }
  ];

  return (
    <aside className="sidebar" style={{
      width: '280px',
      background: '#0a1329',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(180deg, rgba(0, 240, 255, 0.04) 0%, transparent 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 119, 182, 0.4))',
            border: '1px solid #00F0FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)'
          }}>
            <Shield size={24} color="#00F0FF" />
          </div>
          <div>
            <div style={{ 
              fontWeight: 800, 
              fontSize: '1.05rem', 
              color: '#FFFFFF', 
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              FactoryShield <span style={{ color: '#00F0FF', fontSize: '0.75rem', fontWeight: 600, border: '1px solid #00F0FF', padding: '1px 5px', borderRadius: '4px' }}>BLUEPRINT</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>
              OT Cyber-Resilience for Indian SMEs
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '14px',
          padding: '8px 10px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.05)',
          fontSize: '0.72rem',
          color: '#64748B',
          fontStyle: 'italic',
          lineHeight: 1.3
        }}>
          "Secure Your Smart Factory. Protect Your Production."
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{
        flex: 1,
        padding: '16px 12px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div style={{
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          color: '#64748B',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0 10px 8px 10px'
        }}>
          {lang === 'hi' ? 'मुख्य नेविगेशन' : 'MAIN APPLICATION'}
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '8px',
                background: isActive ? 'linear-gradient(90deg, rgba(0, 240, 255, 0.15) 0%, rgba(0, 119, 182, 0.08) 100%)' : 'transparent',
                color: isActive ? '#00F0FF' : '#94A3B8',
                border: isActive ? '1px solid rgba(0, 240, 255, 0.35)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                width: '100%',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.85rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.color = '#F8FAFC';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94A3B8';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={18} color={isActive ? '#00F0FF' : '#64748B'} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '10px',
                  background: item.badgeColor ? `${item.badgeColor}22` : 'rgba(255,255,255,0.08)',
                  color: item.badgeColor || '#94A3B8',
                  border: item.badgeColor ? `1px solid ${item.badgeColor}55` : '1px solid rgba(255,255,255,0.1)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer: Real-time Live Posture Snapshot */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(7, 13, 30, 0.6)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Cyber Posture
          </span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: riskColor,
            background: `${riskColor}22`,
            padding: '2px 8px',
            borderRadius: '4px',
            border: `1px solid ${riskColor}44`
          }}>
            {riskLevel} Risk
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
            {dynamicScore}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>/ 100</span>
        </div>

        {/* Mini progress track */}
        <div style={{
          height: '5px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '3px',
          marginTop: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${dynamicScore}%`,
            background: riskColor,
            borderRadius: '3px',
            transition: 'width 0.4s ease'
          }} />
        </div>

        <div style={{
          marginTop: '12px',
          fontSize: '0.68rem',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>Facility: MH Precision, Pune</span>
          <span className="status-dot active pulse" title="System Live" />
        </div>
      </div>
    </aside>
  );
}
