import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Activity, 
  Cpu, 
  Server, 
  Monitor, 
  Laptop, 
  Radio, 
  CheckCircle2, 
  AlertTriangle,
  Edit2,
  Save
} from 'lucide-react';

export default function FactoryProfile({ factory, onUpdateFactory, currentUser, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: factory.name,
    location: factory.location,
    industry: factory.industry,
    employees: factory.employees,
    productionLines: factory.productionLines,
    criticalProcesses: factory.criticalProcesses
  });

  const handleSave = () => {
    onUpdateFactory({
      ...factory,
      ...formData
    });
    setIsEditing(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Profile Header Card */}
      <div className="cyber-card" style={{ marginBottom: '24px', padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 119, 182, 0.3))',
              border: '2px solid #00F0FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Building2 size={32} color="#00F0FF" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.6rem', color: '#FFFFFF' }}>
                  {factory.name}
                </h1>
                <span className="badge badge-cyan">Registered SME</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.82rem', color: '#94A3B8', marginTop: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="#00F0FF" /> {factory.location}
                </span>
                <span>•</span>
                <span>Sector: <strong>{factory.industry}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className={isEditing ? 'btn btn-primary' : 'btn btn-secondary'}
          >
            {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
            <span>{isEditing ? 'Save Profile' : 'Edit Factory Details'}</span>
          </button>
        </div>

        {/* Operational Specs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '24px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Factory Size</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>Medium (85 Staff)</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Production Lines</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#00F0FF', marginTop: '2px' }}>3 Active Automated Lines</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Downtime Impact</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#EF4444', marginTop: '2px' }}>&lt; 4 Hours (OEM Penalty)</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase' }}>Logged In Officer</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10B981', marginTop: '2px' }}>{currentUser.name} ({currentUser.role})</div>
          </div>
        </div>
      </div>

      {/* Production Lines & Assets Deep-Dive */}
      <div className="cyber-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '16px' }}>
          Production Line Topology & Criticality
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {factory.linesDetail?.map(line => (
            <div
              key={line.id}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#00F0FF', fontWeight: 700 }}>
                  {line.id}
                </span>
                <span className={`badge ${line.criticalLevel === 'Critical' ? 'badge-high' : 'badge-medium'}`}>
                  {line.criticalLevel}
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
                {line.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#10B981', marginTop: '8px' }}>
                <span className="status-dot active" />
                <span>Status: {line.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Inventory Table */}
      <div className="cyber-card">
        <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '16px' }}>
          Registered Shop Floor PLCs & Workstations
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#00F0FF' }}>
                <th style={{ padding: '10px' }}>Controller ID</th>
                <th style={{ padding: '10px' }}>Hardware Model</th>
                <th style={{ padding: '10px' }}>Assigned Line</th>
                <th style={{ padding: '10px' }}>Assigned IP</th>
                <th style={{ padding: '10px' }}>Firmware Status</th>
                <th style={{ padding: '10px' }}>Backup State</th>
              </tr>
            </thead>
            <tbody style={{ color: '#CBD5E1' }}>
              {factory.assets?.plcDetails?.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FFFFFF' }}>{p.id}</td>
                  <td style={{ padding: '10px' }}>{p.model}</td>
                  <td style={{ padding: '10px' }}>{p.line}</td>
                  <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', color: '#38BDF8' }}>{p.ip}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ color: p.firmware.includes('Unpatched') ? '#EF4444' : '#94A3B8' }}>
                      {p.firmware}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <span className={`badge ${p.backupStatus === 'Missing' ? 'badge-high' : 'badge-medium'}`}>
                      {p.backupStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
