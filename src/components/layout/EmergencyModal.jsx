import React, { useState } from 'react';
import { 
  X, 
  AlertOctagon, 
  ShieldAlert, 
  Cpu, 
  WifiOff, 
  Terminal, 
  PhoneCall, 
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

export const INCIDENT_TYPES = [
  {
    id: 'ransomware',
    title: 'Suspected Ransomware / Screen Lock',
    icon: AlertOctagon,
    color: '#EF4444',
    urgency: 'CRITICAL - IMMEDIATE QUARANTINE',
    symptoms: 'Computers display ransom notes, desktop background changed, files have strange extensions (.locked), or SCADA files cannot open.',
    immediateSteps: [
      { text: 'DO NOT REBOOT OR POWER OFF THE SYSTEM! Powering off can trigger immediate volume encryption or destroy forensic RAM evidence.', critical: true },
      { text: 'Physically pull out the Ethernet RJ45 network cable from the machine/workstation immediately to stop lateral infection.', critical: true },
      { text: 'Disconnect Wi-Fi and unplug all connected USB external drives and backup disks immediately.', critical: true },
      { text: 'Notify Plant Manager (Vikram Joshi: +91 98220 14820) and senior IT engineer immediately.', critical: false },
      { text: 'Take a smartphone photograph of the ransom message on screen for legal reporting (CERT-In / Cyber Police).', critical: false }
    ]
  },
  {
    id: 'unauthorized_access',
    title: 'Unauthorized Remote Access / Ghost Movement',
    icon: Terminal,
    color: '#F59E0B',
    urgency: 'HIGH - BREACH IN PROGRESS',
    symptoms: 'Mouse moving by itself, unknown AnyDesk/TeamViewer sessions active, operator passwords changed unexpectedly.',
    immediateSteps: [
      { text: 'Unplug the internet uplink cable from the plant main gateway router immediately.', critical: true },
      { text: 'Kill all AnyDesk/TeamViewer sessions: Press Ctrl+Alt+Del -> Task Manager -> End Task.', critical: true },
      { text: 'Toggle machine keyswitch to LOCAL/RUN mode to block remote HMI/SCADA writes.', critical: false },
      { text: 'Record the remote session ID or IP address if visible on screen.', critical: false }
    ]
  },
  {
    id: 'plc_behavior',
    title: 'Unexpected PLC / Machinery Behavior',
    icon: Cpu,
    color: '#EF4444',
    urgency: 'CRITICAL - PHYSICAL SAFETY HAZARD',
    symptoms: 'Motors accelerating beyond safety setpoints, robot arms failing home-limits, temperature alarms ignored by controllers.',
    immediateSteps: [
      { text: 'HIT PHYSICAL EMERGENCY STOP (E-STOP) IMMEDIATELY if worker safety is in jeopardy.', critical: true },
      { text: 'Switch controller hardware keyswitch from REMOTE to STOP / RUN mode to halt network logic writes.', critical: true },
      { text: 'Isolate the controller Ethernet switch port.', critical: false },
      { text: 'Verify if recent ladder logic upload was authorized by automation engineering team.', critical: false }
    ]
  },
  {
    id: 'malware',
    title: 'Malware / Infected USB Pen Drive Detected',
    icon: ShieldAlert,
    color: '#F59E0B',
    urgency: 'MEDIUM - CONTAINMENT REQUIRED',
    symptoms: 'Windows Defender notification of Trojan/Worm, shortcut files appearing on USB, extreme CPU lag on SCADA.',
    immediateSteps: [
      { text: 'Unplug the infected USB drive immediately and bag it for forensic inspection.', critical: true },
      { text: 'Disconnect workstation from the factory network.', critical: true },
      { text: 'Run an offline Defender antimalware scan.', critical: false },
      { text: 'Identify which other factory PCs that same USB drive was inserted into during the last 48 hours.', critical: false }
    ]
  },
  {
    id: 'network_scan',
    title: 'Suspicious Network Scanning / Flooding',
    icon: WifiOff,
    color: '#3B82F6',
    urgency: 'MEDIUM - RECONNAISSANCE ALERT',
    symptoms: 'Switch activity LEDs blinking continuously at max rate, SCADA losing intermittent comms with Line 1 PLCs.',
    immediateSteps: [
      { text: 'Check switch port activity LEDs to isolate the source IP generating anomalous packet floods.', critical: true },
      { text: 'Disconnect suspect engineering laptops or Wi-Fi access points.', critical: true },
      { text: 'Inspect firewall logs for external port-knocking sweeps on ports 102 (S7) or 502 (Modbus).', critical: false }
    ]
  }
];

export default function EmergencyModal({ isOpen, onClose, onLogIncident, factory }) {
  const [selectedIncident, setSelectedIncident] = useState(INCIDENT_TYPES[0]);
  const [completedSteps, setCompletedSteps] = useState({});
  const [incidentReported, setIncidentReported] = useState(false);
  const [affectedLine, setAffectedLine] = useState('Line 1: High-Precision CNC Machining');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleStepToggle = (index) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleConfirmReport = () => {
    const reportData = {
      id: `INC-${Date.now().toString().slice(-4)}`,
      type: selectedIncident.title,
      severity: selectedIncident.urgency.includes('CRITICAL') ? 'Critical' : 'High',
      line: affectedLine,
      reportedBy: factory.currentUser?.name || 'Plant Supervisor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'Quarantine Active',
      notes: notes || 'Operators executed immediate physical isolation checklist.'
    };
    onLogIncident(reportData);
    setIncidentReported(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ border: '2px solid #EF4444', maxWidth: '850px' }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, rgba(185, 28, 28, 0.1) 100%)',
          borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)'
            }}>
              <AlertOctagon size={24} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 800 }}>
                EMERGENCY CYBER INCIDENT TRIAGE & QUARANTINE
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#FCA5A5' }}>
                Follow immediate containment steps to stop contagion across plant machinery.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          {incidentReported ? (
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '2px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <CheckCircle size={36} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '8px' }}>
                INCIDENT LOGGED & QUARANTINE ACTIVE
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 24px auto' }}>
                The cyber incident has been recorded in the Plant Incident Log. Offline backup restoration files are flagged for validation.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button 
                  onClick={() => { setIncidentReported(false); onClose(); }}
                  className="btn btn-primary"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Select Incident Type */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#94A3B8', textTransform: 'uppercase' }}>
                  Step 1: Select Reported Anomaly / Threat Vector
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '10px',
                  marginTop: '8px'
                }}>
                  {INCIDENT_TYPES.map(type => {
                    const isSelected = selectedIncident.id === type.id;
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.id}
                        onClick={() => {
                          setSelectedIncident(type);
                          setCompletedSteps({});
                        }}
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          background: isSelected ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? `2px solid ${type.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Icon size={20} color={type.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                            {type.title}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: type.color, marginTop: '3px', fontWeight: 600 }}>
                            {type.urgency.split('-')[0]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Symptoms banner */}
              <div style={{
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                borderLeft: `4px solid ${selectedIncident.color}`,
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600 }}>
                  Typical Symptoms Observed:
                </div>
                <div style={{ fontSize: '0.82rem', color: '#F8FAFC', marginTop: '2px' }}>
                  {selectedIncident.symptoms}
                </div>
              </div>

              {/* Step 2: Immediate Containment Checklist */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#00F0FF', textTransform: 'uppercase' }}>
                    Step 2: Execute Immediate Physical Containment Actions
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                    {Object.values(completedSteps).filter(Boolean).length} / {selectedIncident.immediateSteps.length} Verified
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedIncident.immediateSteps.map((step, idx) => {
                    const isChecked = !!completedSteps[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => handleStepToggle(idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          background: isChecked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 0, 0, 0.3)',
                          border: isChecked ? '1px solid #10B981' : step.critical ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          style={{ marginTop: '3px', cursor: 'pointer', accentColor: '#10B981', width: '16px', height: '16px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <span style={{
                            fontSize: '0.84rem',
                            color: isChecked ? '#A7F3D0' : '#FFFFFF',
                            fontWeight: step.critical ? 600 : 400,
                            textDecoration: isChecked ? 'line-through' : 'none'
                          }}>
                            {step.text}
                          </span>
                          {step.critical && !isChecked && (
                            <span style={{
                              marginLeft: '8px',
                              fontSize: '0.68rem',
                              color: '#EF4444',
                              background: 'rgba(239, 68, 68, 0.2)',
                              padding: '1px 5px',
                              borderRadius: '3px',
                              fontWeight: 700
                            }}>
                              CRITICAL
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Affected Line & Notes */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                    Affected Production Line
                  </label>
                  <select
                    value={affectedLine}
                    onChange={(e) => setAffectedLine(e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: '6px',
                      padding: '8px 12px',
                      background: '#0a1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '0.82rem'
                    }}
                  >
                    <option value="Line 1: High-Precision CNC Machining">Line 1: High-Precision CNC Machining</option>
                    <option value="Line 2: Robotic Spot & Arc Welding">Line 2: Robotic Spot & Arc Welding</option>
                    <option value="Line 3: Stamping, Quality & Assembly">Line 3: Stamping, Quality & Assembly</option>
                    <option value="Central Plant Supervisory SCADA">Central Plant Supervisory SCADA</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                    Operator Notes / Error Code Observed
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Error 0x8004 on Siemens HMI screen"
                    style={{
                      width: '100%',
                      marginTop: '6px',
                      padding: '8px 12px',
                      background: '#0a1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '0.75rem' }}>
                  <PhoneCall size={14} color="#EF4444" />
                  <span>Plant Emergency Hotline: <strong>+91 98220 14820</strong></span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={onClose} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={handleConfirmReport} className="btn btn-danger">
                    Log Incident & Activate Quarantine
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
