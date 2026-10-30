import React, { useState } from 'react';
import { Network, Shield, Server, Laptop, Cpu, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function NetworkTopology({ answers }) {
  const [activeZone, setActiveZone] = useState('dmz');
  const isFlat = answers.networkSeparation === 'Single Flat Network' || answers.networkSeparation === 'Unknown';

  const zoneDetails = {
    enterprise: {
      title: 'Zone 4/5: Enterprise Corporate IT (VLAN 10)',
      subnet: '192.168.10.0/24',
      devices: 'ERP Workstations, Accounting PCs, Corporate Wi-Fi, Office Printers',
      threat: 'High Phishing & Ransomware Landing Ground',
      firewallPolicy: 'Outbound HTTP/HTTPS permitted to Internet. DIRECT OT INBOUND TRAFFIC BLOCKED.'
    },
    dmz: {
      title: 'Zone 3.5: Industrial Demilitarized Zone / OT DMZ (VLAN 30)',
      subnet: '192.168.30.0/24',
      devices: 'Central SCADA Server (192.168.30.5), Process Historian, Engineering Jump Box',
      threat: 'Critical Gateway & Inspection Conduit',
      firewallPolicy: 'Stateful firewall terminates all inbound RDP/SSH. Jump box requires MFA.'
    },
    control: {
      title: 'Zone 2/1: OT Industrial Control & Automation (VLAN 20)',
      subnet: '192.168.20.0/24',
      devices: '8 PLCs (Siemens, Schneider, Delta), 5 HMIs, Robotic Welding Cells, CNCs',
      threat: 'Zero Inherent Security; Relies Completely on Boundary Protection',
      firewallPolicy: 'AIR-GAPPED FROM PUBLIC INTERNET. Accepts only Port 102/502 from DMZ SCADA.'
    },
    safety: {
      title: 'Zone 0: Safety Instrumented Systems (SIS)',
      subnet: 'Hardwired Emergency Circuits',
      devices: 'E-Stop Mushroom Relays, Light Curtains, Safety Interlocks',
      threat: 'Direct Physical Human Safety Risk',
      firewallPolicy: 'Physically isolated from Ethernet routing.'
    }
  };

  return (
    <div className="cyber-card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span className="cyber-tag" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
            Purdue Architecture Model
          </span>
          <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginTop: '6px' }}>
            IEC 62443 Zones & Conduits Network Topology
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Current Plant State:</span>
          {isFlat ? (
            <span className="badge badge-high" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertTriangle size={12} /> Vulnerable Flat Network
            </span>
          ) : (
            <span className="badge badge-low" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={12} /> Segmented Architecture
            </span>
          )}
        </div>
      </div>

      {/* Interactive SVG Diagram */}
      <div style={{
        background: '#070d1e',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px',
        position: 'relative'
      }}>
        <svg viewBox="0 0 900 380" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="gradIT" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="gradDMZ" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 119, 182, 0.3)" />
              <stop offset="100%" stopColor="rgba(0, 240, 255, 0.15)" />
            </linearGradient>
            <linearGradient id="gradOT" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.15)" />
              <stop offset="100%" stopColor="rgba(5, 150, 105, 0.25)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ZONE 1: Enterprise Office IT */}
          <g 
            onClick={() => setActiveZone('enterprise')}
            style={{ cursor: 'pointer' }}
          >
            <rect 
              x="20" y="20" width="860" height="85" rx="8" 
              fill="url(#gradIT)" 
              stroke={activeZone === 'enterprise' ? '#38BDF8' : 'rgba(255,255,255,0.1)'} 
              strokeWidth={activeZone === 'enterprise' ? '2' : '1'} 
            />
            <text x="40" y="48" fill="#38BDF8" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              ENTERPRISE CORPORATE IT ZONE (VLAN 10: 192.168.10.0/24)
            </text>
            <text x="40" y="70" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">
              Office Workstations • ERP Server • Tally • Corporate Internet Gateway • Wi-Fi APs
            </text>
            <rect x="740" y="42" width="120" height="26" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
            <text x="755" y="59" fill="#F8FAFC" fontSize="10" fontFamily="monospace">Purdue Level 4/5</text>
          </g>

          {/* CONDUIT 1: BOUNDARY FIREWALL */}
          <g>
            <line x1="450" y1="105" x2="450" y2="135" stroke="#EF4444" strokeWidth="3" strokeDasharray="5,5" />
            <rect x="360" y="115" width="180" height="28" rx="6" fill="#1e1b4b" stroke="#00F0FF" strokeWidth="1.5" filter="url(#glow)" />
            <text x="375" y="133" fill="#00F0FF" fontSize="10" fontWeight="700" fontFamily="monospace">
              FIREWALL CONDUIT A
            </text>
          </g>

          {/* ZONE 2: OT DMZ */}
          <g 
            onClick={() => setActiveZone('dmz')}
            style={{ cursor: 'pointer' }}
          >
            <rect 
              x="20" y="150" width="860" height="85" rx="8" 
              fill="url(#gradDMZ)" 
              stroke={activeZone === 'dmz' ? '#00F0FF' : 'rgba(0, 240, 255, 0.3)'} 
              strokeWidth={activeZone === 'dmz' ? '2' : '1'} 
            />
            <text x="40" y="178" fill="#00F0FF" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              INDUSTRIAL DEMILITARIZED ZONE / OT DMZ (VLAN 30: 192.168.30.0/24)
            </text>
            <text x="40" y="200" fill="#CBD5E1" fontSize="11" fontFamily="sans-serif">
              Central SCADA Server (192.168.30.5) • Process Historian • MFA Jump Host (192.168.30.10)
            </text>
            <rect x="740" y="172" width="120" height="26" rx="4" fill="rgba(0, 240, 255, 0.1)" stroke="#00F0FF" />
            <text x="755" y="189" fill="#00F0FF" fontSize="10" fontFamily="monospace">Purdue Level 3.5</text>
          </g>

          {/* CONDUIT 2: OT INTERNAL FILTER */}
          <g>
            <line x1="450" y1="235" x2="450" y2="265" stroke="#10B981" strokeWidth="3" />
            <rect x="360" y="245" width="180" height="28" rx="6" fill="#064e3b" stroke="#10B981" strokeWidth="1.5" />
            <text x="375" y="263" fill="#A7F3D0" fontSize="10" fontWeight="700" fontFamily="monospace">
              OT CONDUIT B (S7/Modbus)
            </text>
          </g>

          {/* ZONE 3: INDUSTRIAL CONTROL ZONE */}
          <g 
            onClick={() => setActiveZone('control')}
            style={{ cursor: 'pointer' }}
          >
            <rect 
              x="20" y="280" width="860" height="85" rx="8" 
              fill="url(#gradOT)" 
              stroke={activeZone === 'control' ? '#10B981' : 'rgba(16, 185, 129, 0.3)'} 
              strokeWidth={activeZone === 'control' ? '2' : '1'} 
            />
            <text x="40" y="308" fill="#10B981" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              CELL & AREA CONTROL ZONE (VLAN 20: 192.168.20.0/24)
            </text>
            <text x="40" y="330" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">
              Line 1-3 PLCs (8 Units) • Touchscreen HMIs (5 Units) • Robotic Welding Controllers • Connected CNCs
            </text>
            <rect x="740" y="302" width="120" height="26" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" />
            <text x="755" y="319" fill="#10B981" fontSize="10" fontFamily="monospace">Purdue Level 1/2</text>
          </g>
        </svg>

        {/* Selected Zone Deep Dive Panel */}
        <div style={{
          marginTop: '16px',
          padding: '14px 18px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
              {zoneDetails[activeZone].title}
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#00F0FF' }}>
              Subnet: {zoneDetails[activeZone].subnet}
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>
            <strong>Assigned Assets:</strong> {zoneDetails[activeZone].devices}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#F59E0B' }}>
            <strong>Threat Exposure:</strong> {zoneDetails[activeZone].threat}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#10B981' }}>
            <strong>Firewall Enforced Conduit:</strong> {zoneDetails[activeZone].firewallPolicy}
          </div>
        </div>
      </div>
    </div>
  );
}
