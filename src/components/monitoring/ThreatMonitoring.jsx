import React, { useState } from 'react';
import ThreatAlertsWidget from '../dashboard/ThreatAlertsWidget';
import RansomwareGauge from '../dashboard/RansomwareGauge';
import AssetOverview from '../dashboard/AssetOverview';
import RiskScoreWidget from '../dashboard/RiskScoreWidget';
import { 
  ShieldAlert, 
  Activity, 
  Radio, 
  Terminal, 
  PlusCircle, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Play
} from 'lucide-react';

export default function ThreatMonitoring({ 
  assessmentState, 
  onResolveAlert, 
  onAddAlert, 
  onOpenEmergencyModal,
  onNavigateToChecklist,
  onNavigateToBlueprint,
  factory,
  incidents
}) {
  const { dynamicScore, alerts, ransomwareReadiness, assetSummary } = assessmentState;

  // Simulator scenarios for Hackathon live presentation
  const simulationScenarios = [
    {
      title: 'Simulate Inbound S7 Port 102 Scan',
      category: 'Reconnaissance',
      severity: 'High',
      asset: 'Siemens S7-1200 PLC-01 (192.168.1.10)',
      description: 'Automated external TCP SYN sweep targeting industrial Port 102 from unmapped IP 45.154.255.88.',
      recommendation: 'Verify perimeter firewall blocks all WAN inbound port forwards to 192.168.1.10.'
    },
    {
      title: 'Simulate Suspicious USB Insertion on SCADA',
      category: 'Physical / Host',
      severity: 'High',
      asset: 'WinCC Central Server (192.168.1.5)',
      description: 'Removable flash storage device connected to SCADA PC during active shift without pre-scan.',
      recommendation: 'Enforce USB Group Policy disabling AutoRun and require quarantine kiosk scan.'
    },
    {
      title: 'Simulate Unscheduled AnyDesk Connection',
      category: 'Remote Access',
      severity: 'Medium',
      asset: 'Maintenance Laptop (192.168.1.42)',
      description: 'Remote desktop session initiated outside approved maintenance window (02:14 AM IST).',
      recommendation: 'Revoke unattended remote desktop password. Require on-demand supervisor PIN.'
    }
  ];

  const handleRunSimulation = (scenario) => {
    const newAlert = {
      id: `ALT-SIM-${Date.now().toString().slice(-4)}`,
      title: scenario.title.replace('Simulate ', ''),
      severity: scenario.severity,
      asset: scenario.asset,
      timestamp: 'Just now (Simulated)',
      description: scenario.description,
      recommendation: scenario.recommendation,
      status: 'Active',
      category: scenario.category
    };
    onAddAlert(newAlert);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div className="cyber-card" style={{ marginBottom: '24px', padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="cyber-tag" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                Feature 6: Cyber Threat Monitoring & Alert Engine
              </span>
              <span className="status-dot active pulse" style={{ marginLeft: '4px' }} />
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>Active Telemetry Stream</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginTop: '8px' }}>
              OT Threat Monitoring & Alert Center
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '4px' }}>
              Real-time rule-based detection for <strong>{factory.name}</strong>. Monitors PLC communication integrity, remote gateways, and anomalous USB activity.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onOpenEmergencyModal}
              className="btn btn-danger"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <ShieldAlert size={16} />
              <span>Report Security Incident</span>
            </button>
          </div>
        </div>

        {/* Hackathon Live Simulator Toolbar */}
        <div style={{
          marginTop: '20px',
          padding: '14px 18px',
          borderRadius: '8px',
          background: 'rgba(0, 240, 255, 0.05)',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={18} color="#00F0FF" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>
              Judge Demo Live Simulator:
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Trigger real-time telemetry events to evaluate alert processing:
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {simulationScenarios.map((sc, i) => (
              <button
                key={i}
                onClick={() => handleRunSimulation(sc)}
                className="btn btn-outline-cyan"
                style={{ padding: '5px 12px', fontSize: '0.72rem' }}
              >
                <Play size={11} />
                <span>{sc.title.replace('Simulate ', '')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Grid: Live Score + Ransomware Gauge */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        <RiskScoreWidget 
          assessmentState={assessmentState} 
          onNavigateToChecklist={onNavigateToChecklist} 
        />
        <RansomwareGauge 
          ransomwareReadiness={ransomwareReadiness} 
          onNavigateToChecklist={onNavigateToChecklist} 
        />
      </div>

      {/* Middle Grid: Active Alerts + Connected Assets */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        <ThreatAlertsWidget 
          alerts={alerts} 
          onResolveAlert={onResolveAlert} 
          onNavigateToBlueprint={onNavigateToBlueprint} 
        />
        <AssetOverview 
          assetSummary={assetSummary} 
          dynamicScore={dynamicScore} 
        />
      </div>

      {/* Logged Incident History Table */}
      <div className="cyber-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <span className="badge badge-high">Emergency Logs</span>
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginTop: '6px' }}>
              Recent Factory Cyber Incident Log
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
            {incidents.length} Incident(s) Logged
          </span>
        </div>

        {incidents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#64748B', fontSize: '0.85rem' }}>
            <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 8px auto' }} />
            <div>No active quarantine emergencies recorded in logbook.</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#00F0FF' }}>
                  <th style={{ padding: '10px' }}>Incident ID</th>
                  <th style={{ padding: '10px' }}>Threat Classification</th>
                  <th style={{ padding: '10px' }}>Affected Area</th>
                  <th style={{ padding: '10px' }}>Logged Time</th>
                  <th style={{ padding: '10px' }}>Reported By</th>
                  <th style={{ padding: '10px' }}>Quarantine Status</th>
                </tr>
              </thead>
              <tbody style={{ color: '#CBD5E1' }}>
                {incidents.map(inc => (
                  <tr key={inc.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FFFFFF' }}>{inc.id}</td>
                    <td style={{ padding: '10px', color: '#F87171', fontWeight: 600 }}>{inc.type}</td>
                    <td style={{ padding: '10px' }}>{inc.line}</td>
                    <td style={{ padding: '10px', fontFamily: 'var(--font-mono)' }}>{inc.timestamp}</td>
                    <td style={{ padding: '10px' }}>{inc.reportedBy}</td>
                    <td style={{ padding: '10px' }}>
                      <span className="badge badge-high" style={{ animation: 'pulse 2s infinite' }}>
                        {inc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
