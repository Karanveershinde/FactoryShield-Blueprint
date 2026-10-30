import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  Cpu, 
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, currentUser, onLogin, onRegister, factory }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name || 'Vikram Joshi',
    email: currentUser.email || 'v.joshi@mahaprecision.in',
    password: '••••••••••••',
    role: currentUser.role || 'Plant Manager',
    factoryName: factory.name || 'Maharashtra Precision Manufacturing',
    location: factory.location || 'Pune, Maharashtra, India',
    industry: factory.industry || 'Automotive Components',
    productionLines: factory.productionLines || 3,
    size: 'Medium (50-250 staff)'
  });
  const [submittedMessage, setSubmittedMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      onRegister(formData);
      setSubmittedMessage(`Factory '${formData.factoryName}' registered successfully under ${formData.role}!`);
    } else {
      onLogin(formData);
      setSubmittedMessage(`Welcome back, ${formData.name}! Switched role to ${formData.role}.`);
    }
    setTimeout(() => {
      setSubmittedMessage(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.1) 0%, transparent 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid #00F0FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} color="#00F0FF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 700 }}>
                {isRegisterMode ? 'Register New Smart Factory' : 'FactoryShield User Access'}
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                {isRegisterMode ? 'Onboard your plant and generate a fresh security baseline' : 'Select user credentials and persona role'}
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {submittedMessage ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <CheckCircle2 size={40} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>{submittedMessage}</div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '6px' }}>Updating dashboard session...</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Role Selection (Vital for Persona demonstration) */}
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600 }}>
                  Active Persona & Role
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  marginTop: '6px'
                }}>
                  {[
                    { role: 'Factory Owner', desc: 'Financial & Downtime Risk' },
                    { role: 'Plant Manager', desc: 'Line Continuity & Tasks' },
                    { role: 'IT/OT Engineer', desc: 'VLANs, Scripts & PLC Rules' },
                    { role: 'Production Supervisor', desc: 'SOPs & Shift Hygiene' }
                  ].map(r => (
                    <div
                      key={r.role}
                      onClick={() => setFormData({ ...formData, role: r.role })}
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        background: formData.role === r.role ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                        border: formData.role === r.role ? '1px solid #00F0FF' : '1px solid rgba(255, 255, 255, 0.06)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: formData.role === r.role ? '#00F0FF' : '#FFFFFF' }}>
                        {r.role}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '2px' }}>
                        {r.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      marginTop: '4px',
                      padding: '8px 12px',
                      background: '#0a1329',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Work Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      marginTop: '4px',
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

              {/* If Register Mode: Factory Details */}
              {isRegisterMode && (
                <>
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                    <div style={{ fontSize: '0.78rem', color: '#00F0FF', fontWeight: 700, marginBottom: '8px' }}>
                      Factory Specifications:
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Factory Name</label>
                        <input
                          type="text"
                          required
                          value={formData.factoryName}
                          onChange={(e) => setFormData({ ...formData, factoryName: e.target.value })}
                          style={{
                            width: '100%',
                            marginTop: '4px',
                            padding: '8px 12px',
                            background: '#0a1329',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '6px',
                            color: '#FFFFFF',
                            fontSize: '0.82rem'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Location (City, State)</label>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          style={{
                            width: '100%',
                            marginTop: '4px',
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
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Industry Sector</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        style={{
                          width: '100%',
                          marginTop: '4px',
                          padding: '8px 12px',
                          background: '#0a1329',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '6px',
                          color: '#FFFFFF',
                          fontSize: '0.82rem'
                        }}
                      >
                        <option value="Automotive Components">Automotive Components</option>
                        <option value="Precision Engineering">Precision Engineering</option>
                        <option value="Textiles & Garments">Textiles & Garments</option>
                        <option value="Pharmaceuticals">Pharmaceuticals</option>
                        <option value="Food & Beverage">Food & Beverage</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase' }}>Production Lines</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.productionLines}
                        onChange={(e) => setFormData({ ...formData, productionLines: parseInt(e.target.value, 10) })}
                        style={{
                          width: '100%',
                          marginTop: '4px',
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
                </>
              )}

              {/* Submit Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  style={{ background: 'transparent', border: 'none', color: '#00F0FF', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {isRegisterMode ? 'Already registered? Login here' : '+ Register a new factory profile'}
                </button>

                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                  {isRegisterMode ? 'Register & Initialize' : 'Save & Continue'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
