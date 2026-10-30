import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

export default function ThreatAlertsWidget({ alerts, onResolveAlert, onNavigateToBlueprint }) {
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('Active');

  const filteredAlerts = alerts.filter(alert => {
    const matchSeverity = filterSeverity === 'All' || alert.severity === filterSeverity;
    const matchStatus = filterStatus === 'All' || alert.status === filterStatus;
    return matchSeverity && matchStatus;
  });

  return (
    <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span className="cyber-tag" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
            Threat Telemetry
          </span>
          <h2 style={{ fontSize: '1.25rem', marginTop: '6px', color: '#FFFFFF' }}>
            Active Security Alerts
          </h2>
        </div>

        {/* Severity Filters */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'High', 'Medium'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              style={{
                background: filterSeverity === sev ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: filterSeverity === sev ? '#00F0FF' : '#94A3B8',
                border: filterSeverity === sev ? '1px solid #00F0FF' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        flex: 1,
        overflowY: 'auto',
        maxHeight: '340px'
      }}>
        {filteredAlerts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '30px 20px',
            color: '#64748B',
            fontSize: '0.85rem'
          }}>
            <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 8px auto' }} />
            <div>No matching security alerts found for current filter.</div>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isHigh = alert.severity === 'High';
            const isResolved = alert.status === 'Resolved';

            return (
              <div
                key={alert.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: '8px',
                  background: isResolved ? 'rgba(16, 185, 129, 0.05)' : isHigh ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                  border: isResolved ? '1px solid rgba(16, 185, 129, 0.2)' : isHigh ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '14px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                  <div style={{ marginTop: '2px' }}>
                    {isHigh ? (
                      <ShieldAlert size={18} color="#EF4444" />
                    ) : (
                      <AlertTriangle size={18} color="#F59E0B" />
                    )}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {alert.title}
                      </span>
                      <span className={`badge ${isHigh ? 'badge-high' : 'badge-medium'}`}>
                        {alert.severity}
                      </span>
                      {isResolved && (
                        <span className="badge badge-low">
                          Resolved
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#CBD5E1', marginTop: '4px', lineHeight: 1.4 }}>
                      {alert.description}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '0.7rem',
                      color: '#94A3B8',
                      marginTop: '8px'
                    }}>
                      <span>Target: <strong style={{ color: '#F1F5F9' }}>{alert.asset}</strong></span>
                      <span>•</span>
                      <span>Category: <strong style={{ color: '#00F0FF' }}>{alert.category}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Quick Mitigate Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', flexShrink: 0 }}>
                  {!isResolved ? (
                    <button
                      onClick={() => onResolveAlert(alert.id)}
                      className="btn btn-outline-cyan"
                      style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                      title="Mark vulnerability as mitigated in factory audit"
                    >
                      Mitigate
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={13} /> Hardened
                    </span>
                  )}

                  <button
                    onClick={onNavigateToBlueprint}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#64748B',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                  >
                    <span>View Fix</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
