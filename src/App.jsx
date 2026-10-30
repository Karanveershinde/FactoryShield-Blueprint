import React, { useState, useMemo } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import EmergencyModal from './components/layout/EmergencyModal';
import AuthModal from './components/auth/AuthModal';

// Feature Views
import RiskScoreWidget from './components/dashboard/RiskScoreWidget';
import AssetOverview from './components/dashboard/AssetOverview';
import ThreatAlertsWidget from './components/dashboard/ThreatAlertsWidget';
import RansomwareGauge from './components/dashboard/RansomwareGauge';
import QuickActionGrid from './components/dashboard/QuickActionGrid';

import AssessmentWizard from './components/questionnaire/AssessmentWizard';
import BlueprintViewer from './components/blueprint/BlueprintViewer';
import TemplatesLibrary from './components/templates/TemplatesLibrary';
import ActionChecklist from './components/checklist/ActionChecklist';
import PolicyGenerator from './components/policies/PolicyGenerator';
import ThreatMonitoring from './components/monitoring/ThreatMonitoring';
import FactoryProfile from './components/profile/FactoryProfile';
import ReportsCenter from './components/reports/ReportsCenter';

// Data & Rules
import { DEMO_FACTORY } from './data/demoFactory';
import { evaluateAssessment } from './data/rulesEngine';

export default function App() {
  // Primary State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lang, setLang] = useState('en');
  const [factory, setFactory] = useState(DEMO_FACTORY);
  const [currentUser, setCurrentUser] = useState(DEMO_FACTORY.currentUser);
  const [assessmentAnswers, setAssessmentAnswers] = useState(DEMO_FACTORY.initialAssessment);
  const [tasksProgress, setTasksProgress] = useState({});
  const [customAlerts, setCustomAlerts] = useState([]);
  const [resolvedAlertIds, setResolvedAlertIds] = useState([]);
  const [incidents, setIncidents] = useState([
    {
      id: 'INC-9821',
      type: 'Suspicious External Inbound S7 Connection',
      line: 'Line 1: High-Precision CNC Machining',
      timestamp: 'Yesterday, 18:42 IST',
      reportedBy: 'Ramesh K. (OT Engineer)',
      status: 'Quarantine Cleared',
      notes: 'Firewall dropped unauthenticated packets from external IP.'
    }
  ]);

  // Modal controls
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [preSelectedTemplateId, setPreSelectedTemplateId] = useState(null);

  // Evaluate assessment reactively through rules engine
  const baseAssessmentState = useMemo(() => {
    return evaluateAssessment(assessmentAnswers, tasksProgress);
  }, [assessmentAnswers, tasksProgress]);

  // Merge custom simulated alerts and filter resolved
  const assessmentState = useMemo(() => {
    const combinedAlerts = [...baseAssessmentState.alerts, ...customAlerts].map(a => ({
      ...a,
      status: resolvedAlertIds.includes(a.id) ? 'Resolved' : a.status
    }));

    return {
      ...baseAssessmentState,
      alerts: combinedAlerts
    };
  }, [baseAssessmentState, customAlerts, resolvedAlertIds]);

  // Task Status update handler
  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasksProgress(prev => ({
      ...prev,
      [taskId]: newStatus
    }));
  };

  // Alert resolve handler
  const handleResolveAlert = (alertId) => {
    setResolvedAlertIds(prev => [...prev, alertId]);
  };

  // Alert add handler (from simulator)
  const handleAddAlert = (newAlert) => {
    setCustomAlerts(prev => [newAlert, ...prev]);
  };

  // Incident log handler
  const handleLogIncident = (reportData) => {
    setIncidents(prev => [reportData, ...prev]);
  };

  // Deep-link to template from checklist or blueprint
  const handleNavigateToTemplate = (templateId) => {
    setPreSelectedTemplateId(templateId);
    setActiveTab('templates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to original Demo Factory data
  const handleResetDemoData = () => {
    setFactory(DEMO_FACTORY);
    setCurrentUser(DEMO_FACTORY.currentUser);
    setAssessmentAnswers(DEMO_FACTORY.initialAssessment);
    setTasksProgress({});
    setCustomAlerts([]);
    setResolvedAlertIds([]);
    setActiveTab('dashboard');
  };

  // User auth login / register
  const handleLogin = (userCreds) => {
    setCurrentUser({
      ...currentUser,
      name: userCreds.name,
      email: userCreds.email,
      role: userCreds.role
    });
  };

  const handleRegister = (regData) => {
    setFactory({
      ...factory,
      name: regData.factoryName,
      location: regData.location,
      industry: regData.industry,
      productionLines: regData.productionLines
    });
    setCurrentUser({
      ...currentUser,
      name: regData.name,
      email: regData.email,
      role: regData.role
    });
    // Start fresh assessment
    setActiveTab('assessment');
  };

  return (
    <div className="app-container">
      {/* 11-View Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        assessmentState={assessmentState}
        lang={lang}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Header with Role Switcher & Emergency Trigger */}
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          factory={factory}
          lang={lang}
          setLang={setLang}
          onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          onResetDemoData={handleResetDemoData}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        <div className="page-wrapper">
          {/* Persona role alert banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'rgba(0, 240, 255, 0.05)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            marginBottom: '20px',
            fontSize: '0.78rem',
            color: '#CBD5E1'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-cyan">{currentUser.role} View</span>
              <span>
                {currentUser.role === 'Factory Owner' && 'Focusing on production uptime, insurance readiness, and capital expenditure.'}
                {currentUser.role === 'Plant Manager' && 'Focusing on production line continuity, shift task progress, and emergency drills.'}
                {currentUser.role === 'IT/OT Engineer' && 'Focusing on VLAN subnets, firewall conduit scripts, and controller logic backups.'}
                {currentUser.role === 'Production Supervisor' && 'Focusing on physical console locks, operator passwords, and incident SOPs.'}
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
              Use the top header dropdown to switch personas anytime
            </span>
          </div>

          {/* VIEW 1: MAIN DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Top Row: Risk Score + Ransomware Readiness */}
              <div className="grid-2" style={{ marginBottom: '24px' }}>
                <RiskScoreWidget
                  assessmentState={assessmentState}
                  lang={lang}
                  onNavigateToChecklist={() => setActiveTab('checklist')}
                />
                <RansomwareGauge
                  ransomwareReadiness={assessmentState.ransomwareReadiness}
                  onNavigateToChecklist={() => setActiveTab('checklist')}
                />
              </div>

              {/* Middle Row: Active Threat Alerts + Connected OT Asset Proportion */}
              <div className="grid-2" style={{ marginBottom: '24px' }}>
                <ThreatAlertsWidget
                  alerts={assessmentState.alerts}
                  onResolveAlert={handleResolveAlert}
                  onNavigateToBlueprint={() => setActiveTab('blueprint')}
                />
                <AssetOverview
                  assetSummary={assessmentState.assetSummary}
                  dynamicScore={assessmentState.dynamicScore}
                  onNavigateToInventory={() => setActiveTab('profile')}
                />
              </div>

              {/* Quick Actions to all 6 Core Features */}
              <QuickActionGrid onNavigate={(target) => setActiveTab(target)} />
            </div>
          )}

          {/* VIEW 2: FACTORY PROFILE */}
          {activeTab === 'profile' && (
            <FactoryProfile
              factory={factory}
              onUpdateFactory={setFactory}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}

          {/* VIEW 3: CYBER ASSESSMENT (FEATURE 1) */}
          {activeTab === 'assessment' && (
            <AssessmentWizard
              assessmentAnswers={assessmentAnswers}
              onUpdateAnswers={setAssessmentAnswers}
              onCompleteAssessment={(finalAnswers) => {
                setAssessmentAnswers(finalAnswers);
                setActiveTab('blueprint');
              }}
              lang={lang}
            />
          )}

          {/* VIEW 4: SECURITY BLUEPRINT (FEATURE 2) */}
          {activeTab === 'blueprint' && (
            <BlueprintViewer
              assessmentState={assessmentState}
              assessmentAnswers={assessmentAnswers}
              factory={factory}
              onNavigateToTemplate={handleNavigateToTemplate}
            />
          )}

          {/* VIEW 5: CONFIGURATION TEMPLATES (FEATURE 3) */}
          {activeTab === 'templates' && (
            <TemplatesLibrary preSelectedId={preSelectedTemplateId} />
          )}

          {/* VIEW 6: ACTION CHECKLIST (FEATURE 4) */}
          {activeTab === 'checklist' && (
            <ActionChecklist
              assessmentState={assessmentState}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onNavigateToTemplate={handleNavigateToTemplate}
              onNavigateToPolicy={() => setActiveTab('policies')}
            />
          )}

          {/* VIEW 7: POLICY GENERATOR (FEATURE 5) */}
          {activeTab === 'policies' && (
            <PolicyGenerator factory={factory} />
          )}

          {/* VIEW 8: THREAT MONITORING (FEATURE 6) */}
          {activeTab === 'monitoring' && (
            <ThreatMonitoring
              assessmentState={assessmentState}
              onResolveAlert={handleResolveAlert}
              onAddAlert={handleAddAlert}
              onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
              onNavigateToChecklist={() => setActiveTab('checklist')}
              onNavigateToBlueprint={() => setActiveTab('blueprint')}
              factory={factory}
              incidents={incidents}
            />
          )}

          {/* VIEW 9: INCIDENT MANAGEMENT */}
          {activeTab === 'incidents' && (
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="cyber-card" style={{ marginBottom: '24px', padding: '24px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span className="badge badge-high">Emergency Operations</span>
                    <h1 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginTop: '6px' }}>
                      Industrial Incident Management & SOPs
                    </h1>
                    <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '4px' }}>
                      Step-by-step guidance during suspected cyber events, ransomware outbreaks, or abnormal controller actions.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsEmergencyModalOpen(true)}
                    className="btn btn-danger"
                    style={{ padding: '10px 20px' }}
                  >
                    Launch Emergency Incident Triage
                  </button>
                </div>
              </div>

              {/* Incident log table */}
              <div className="cyber-card">
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '16px' }}>
                  Recorded Plant Incident History
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#00F0FF' }}>
                        <th style={{ padding: '10px' }}>ID</th>
                        <th style={{ padding: '10px' }}>Threat Classification</th>
                        <th style={{ padding: '10px' }}>Affected Machine / Line</th>
                        <th style={{ padding: '10px' }}>Time</th>
                        <th style={{ padding: '10px' }}>Reporter</th>
                        <th style={{ padding: '10px' }}>Status</th>
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
                            <span className="badge badge-high">{inc.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 10: REPORTS & EXPORT */}
          {activeTab === 'reports' && (
            <ReportsCenter
              factory={factory}
              assessmentState={assessmentState}
            />
          )}

          {/* VIEW 11: SETTINGS */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="cyber-card" style={{ padding: '28px 32px' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  Platform Configuration & Compliance Settings
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '24px' }}>
                  Configure regulatory framework profiles, data residency, and notifications for Indian manufacturing plants.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Cybersecurity Standards Baseline</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      Defaulted to <strong>IEC 62443 (Industrial Network and System Security)</strong> and <strong>NIST CSF v2.0</strong>.
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>CERT-In Mandatory Reporting Protocol</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      Configured for Indian Computer Emergency Response Team (CERT-In) 6-hour incident disclosure requirement for critical industrial manufacturing disruption.
                    </div>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>Data Sovereignty & Local Vaulting</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      All plant schemas and assessment results reside strictly within localized on-premises or Indian cloud data regions (AWS Mumbai / Azure Pune).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Incident Response Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onLogIncident={handleLogIncident}
        factory={factory}
      />

      {/* User Login & Factory Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onRegister={handleRegister}
        factory={factory}
      />
    </div>
  );
}
