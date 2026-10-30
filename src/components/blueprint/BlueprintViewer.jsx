import React, { useState } from 'react';
import NetworkTopology from './NetworkTopology';
import { 
  Network, 
  Cpu, 
  Lock, 
  Database, 
  ShieldAlert, 
  Printer, 
  Download, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function BlueprintViewer({ assessmentState, assessmentAnswers, factory, onNavigateToTemplate }) {
  const [activeSection, setActiveSection] = useState('zoning');
  const [expandedCards, setExpandedCards] = useState({ 0: true, 1: true });

  const { dynamicScore, riskLevel, riskColor } = assessmentState;

  const sections = [
    { id: 'zoning', label: 'Network Zoning & Segmentation', icon: Network },
    { id: 'plc', label: 'PLC & SCADA Hardening', icon: Cpu },
    { id: 'rbac', label: 'Role-Based Access Control', icon: Lock },
    { id: 'backup', label: '3-2-1 Backup & Ransomware', icon: Database },
    { id: 'ir', label: 'Incident Response Procedures', icon: ShieldAlert }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Blueprint Header */}
      <div className="cyber-card" style={{ marginBottom: '24px', padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="cyber-tag" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
                Feature 2: Custom Security Blueprint
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                Aligned with IEC 62443 & NIST CSF
              </span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginTop: '8px' }}>
              Custom Industrial Cyber-Resilience Blueprint
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '4px' }}>
              Tailored architectural specifications and hardening rules for <strong>{factory.name}</strong> ({factory.location}).
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={handlePrint}
              className="btn btn-outline-cyan"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Executive summary banner */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Target Architecture</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>3-Zone Purdue SME Model</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Protected Controllers</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#00F0FF', marginTop: '2px' }}>8 PLCs + 2 SCADA Servers</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Backup Protocol</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10B981', marginTop: '2px' }}>3-2-1 Offline Cold Vault</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Current Risk Level</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: riskColor, marginTop: '2px' }}>{riskLevel} ({dynamicScore}/100)</div>
          </div>
        </div>
      </div>

      {/* Interactive Network Topology Diagram */}
      <NetworkTopology answers={assessmentAnswers || assessmentState.answers || {}} />

      {/* Section Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        marginBottom: '20px',
        paddingBottom: '4px'
      }}>
        {sections.map(sec => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '8px',
                background: isActive ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 119, 182, 0.2))' : 'rgba(255, 255, 255, 0.03)',
                border: isActive ? '1px solid #00F0FF' : '1px solid rgba(255, 255, 255, 0.08)',
                color: isActive ? '#00F0FF' : '#94A3B8',
                cursor: 'pointer',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={16} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      {activeSection === 'zoning' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="cyber-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-high">Priority: Critical</span>
                <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>
                  1. Eliminate Flat Network: Deploy 3-Zone VLAN Segmentation
                </h3>
              </div>
              <button 
                onClick={() => onNavigateToTemplate('tpl-net-01')}
                className="btn btn-outline-cyan"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                View Config Template →
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '12px', lineHeight: 1.5 }}>
              Currently, office accounting laptops share subnet <code>192.168.1.0/24</code> with high-precision Siemens S7-1200 PLCs. Any phishing link clicked in accounting can release ransomware directly onto machine controllers.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              marginTop: '16px',
              padding: '14px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Estimated Cost:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>₹15,000 - ₹35,000 (Low)</div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Implementation Effort:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>2-3 Days (Shift Downtime)</div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Responsible Role:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00F0FF' }}>IT/OT Lead Engineer</div>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>IEC 62443 Standard:</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10B981' }}>IEC 62443-3-2 (Zones)</div>
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#00F0FF', marginBottom: '6px' }}>
                Technical Execution Steps:
              </div>
              <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Configure managed 24-port switch with 802.1Q tags: VLAN 10 (IT), VLAN 20 (OT), VLAN 30 (DMZ).</li>
                <li>Assign static IPs to all 8 PLCs in the <code>192.168.20.10 - 20.35</code> pool.</li>
                <li>Place central SCADA WinCC host into DMZ (<code>192.168.30.5</code>) as the sole bidirectional polling server.</li>
                <li>Drop all lateral routing between office subnet and industrial subnet at the core firewall.</li>
              </ul>
            </div>
          </div>

          <div className="cyber-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-high">Priority: Critical</span>
                <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>
                  2. Boundary Firewall Rules & Conduit Enforcement
                </h3>
              </div>
              <button 
                onClick={() => onNavigateToTemplate('tpl-fw-01')}
                className="btn btn-outline-cyan"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                View Firewall Script →
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '12px' }}>
              Enforce stateful conduit rules. Block raw internet access for all PLCs and allow only SCADA ports 102 (S7Comm) and 502 (Modbus) from DMZ hosts.
            </p>
          </div>
        </div>
      )}

      {activeSection === 'plc' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="cyber-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-high">Priority: Critical</span>
                <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>
                  1. Controller Keyswitch Mode Enforcement & Default Password Purge
                </h3>
              </div>
              <button 
                onClick={() => onNavigateToTemplate('tpl-plc-01')}
                className="btn btn-outline-cyan"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                Hardening Guide →
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '12px' }}>
              Walk the floor of Lines 1, 2, and 3. Switch all physical controller keyswitches from 'REMOTE' to 'RUN' mode to block unauthorized remote logic flashing over Ethernet. Replace factory credentials across all 8 PLCs and 5 HMIs.
            </p>
          </div>

          <div className="cyber-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-medium">Priority: High</span>
                <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>
                  2. Disable Unused Web Servers & Legacy Protocols on Controllers
                </h3>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '12px' }}>
              In Siemens TIA Portal and Schneider SoMachine, deactivate embedded HTTP/HTTPS web servers, Telnet, and anonymous FTP. Restrict controller programming access strictly to the engineering jump workstation MAC address.
            </p>
          </div>
        </div>
      )}

      {activeSection === 'rbac' && (
        <div className="cyber-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <span className="badge badge-medium">Governance & Identity</span>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginTop: '6px' }}>
                SME Role-Based Access Control (RBAC) Architecture
              </h3>
            </div>
            <button 
              onClick={() => onNavigateToTemplate('tpl-rbac-01')}
              className="btn btn-outline-cyan"
              style={{ padding: '6px 12px', fontSize: '0.75rem' }}
            >
              Full RBAC Matrix →
            </button>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '16px' }}>
            Replace the generic "operator" shared account across SCADA and HMIs with 4 distinct least-privilege tiers:
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#00F0FF' }}>
                  <th style={{ padding: '10px' }}>Role</th>
                  <th style={{ padding: '10px' }}>Target Systems</th>
                  <th style={{ padding: '10px' }}>Authorized Actions</th>
                  <th style={{ padding: '10px' }}>Prohibited Actions</th>
                </tr>
              </thead>
              <tbody style={{ color: '#CBD5E1' }}>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#FFFFFF' }}>Shift Operator</td>
                  <td style={{ padding: '10px' }}>Machine HMIs</td>
                  <td style={{ padding: '10px' }}>Start/Stop, View metrics, Acknowledge basic alarms</td>
                  <td style={{ padding: '10px', color: '#EF4444' }}>No recipe modification, No OS access</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#FFFFFF' }}>Shift Supervisor</td>
                  <td style={{ padding: '10px' }}>HMIs & SCADA View</td>
                  <td style={{ padding: '10px' }}>Select approved recipes, Set batch targets (±5%)</td>
                  <td style={{ padding: '10px', color: '#EF4444' }}>No PLC ladder logic upload</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#FFFFFF' }}>Automation Engineer</td>
                  <td style={{ padding: '10px' }}>Engineering Station & PLCs</td>
                  <td style={{ padding: '10px' }}>Upload logic, Backup routines, Configure drives</td>
                  <td style={{ padding: '10px', color: '#F59E0B' }}>Must log change tickets</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', fontWeight: 700, color: '#FFFFFF' }}>Machine Vendor</td>
                  <td style={{ padding: '10px' }}>Vendor Remote Jump Host</td>
                  <td style={{ padding: '10px' }}>Supervised remote diagnostics (2h limit)</td>
                  <td style={{ padding: '10px', color: '#EF4444' }}>No permanent unattended passwords</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'backup' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="cyber-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-high">Priority: Critical</span>
                <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>
                  Industrial 3-2-1 Backup Implementation
                </h3>
              </div>
              <button 
                onClick={() => onNavigateToTemplate('tpl-bkp-01')}
                className="btn btn-outline-cyan"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                Automated Script →
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '12px' }}>
              Implement the 3-2-1 strategy: 3 copies of PLC logic and recipes, stored on 2 different media types (server SSD + BitLocker USB), with 1 copy kept completely offline in the Plant Manager's fireproof safe.
            </p>
          </div>
        </div>
      )}

      {activeSection === 'ir' && (
        <div className="cyber-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <span className="badge badge-high">Emergency Playbook</span>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginTop: '6px' }}>
                SME Incident Response & Production Quarantine Flow
              </h3>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <h4 style={{ fontSize: '0.9rem', color: '#EF4444', marginBottom: '8px', fontWeight: 700 }}>
                NON-TECHNICAL LINE OPERATOR STEPS
              </h4>
              <ol style={{ paddingLeft: '18px', fontSize: '0.8rem', color: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>DO NOT restart or turn off the computer.</li>
                <li>Pull the blue Ethernet cable from the console.</li>
                <li>Press red E-Stop if safety is endangered.</li>
                <li>Call Plant Manager immediately (+91 98220 14820).</li>
              </ol>
            </div>

            <div style={{
              padding: '16px',
              borderRadius: '8px',
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.3)'
            }}>
              <h4 style={{ fontSize: '0.9rem', color: '#00F0FF', marginBottom: '8px', fontWeight: 700 }}>
                IT/OT ENGINEER CONTAINMENT ACTIONS
              </h4>
              <ol style={{ paddingLeft: '18px', fontSize: '0.8rem', color: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Unplug firewall uplink to isolate plant network.</li>
                <li>Terminate active AnyDesk / TeamViewer tasks.</li>
                <li>Photograph error codes for CERT-In reporting.</li>
                <li>Prepare clean flash drives with verified offline backups.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
