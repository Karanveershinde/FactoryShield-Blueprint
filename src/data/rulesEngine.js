// Rules Engine for FactoryShield Blueprint
// Deterministic OT-Aware Cybersecurity Assessment, Scoring, Blueprint & Alert Generator

export function evaluateAssessment(answers, tasksProgress = {}) {
  let score = 100;
  const deductions = [];
  const alerts = [];
  const recommendations = [];
  const immediateTasks = [];
  const mediumTasks = [];
  const longTermTasks = [];

  // 1. Network Zoning & Separation Evaluation
  if (answers.networkSeparation === 'Single Flat Network' || answers.networkSeparation === 'Unknown') {
    score -= 20;
    deductions.push({
      factor: 'Flat IT/OT Network Topology',
      penalty: 20,
      severity: 'Critical',
      explanation: 'Office workstations share the same broadcast domain as critical PLCs, enabling immediate lateral ransomware infection.'
    });
    alerts.push({
      id: 'ALT-NET-01',
      title: 'Flat IT/OT Network Detected',
      severity: 'High',
      asset: 'Entire Industrial Subnet (192.168.1.0/24)',
      timestamp: 'Active Threat Exposure',
      description: 'Production PLCs and office PCs share a flat subnet without VLAN separation. Malware from email phishing can jump directly to shop-floor machinery.',
      recommendation: 'Deploy an industrial firewall (e.g. pfSense) and segment plant into Purdue Model VLANs (IT: 192.168.10.x, OT: 192.168.20.x).',
      status: 'Active',
      category: 'Network'
    });
    mediumTasks.push({
      id: 'TSK-NET-01',
      title: 'Isolate Shop Floor into Dedicated OT VLAN',
      category: 'Network Segmentation',
      priority: 'High',
      cost: '₹15,000 - ₹35,000 (Low: using managed switch/open-source firewall)',
      effort: '2-3 Days',
      owner: 'IT/OT Engineer',
      horizon: 'Medium-Term (1-3 months)',
      description: 'Configure VLAN 20 for industrial controllers and VLAN 10 for enterprise PCs. Drop all direct lateral routing.',
      templateId: 'tpl-net-01'
    });
  } else if (answers.networkSeparation === 'Partially Separated') {
    score -= 10;
    deductions.push({
      factor: 'Incomplete Network Boundary',
      penalty: 10,
      severity: 'Medium',
      explanation: 'Partial separation without stateful packet inspection still allows bridged attacks.'
    });
  }

  // 2. Firewall Protection
  if (answers.firewallInstalled === 'Basic ISP / Consumer Router' || answers.firewallInstalled === 'No Firewall' || answers.firewallInstalled === 'Unknown') {
    score -= 15;
    deductions.push({
      factor: 'Inadequate Industrial Perimeter Filtering',
      penalty: 15,
      severity: 'High',
      explanation: 'Broadband consumer routers cannot inspect OT protocols (Modbus, Profinet, S7Comm) or throttle automated sweeps.'
    });
    immediateTasks.push({
      id: 'TSK-NET-02',
      title: 'Block Inbound Internet Ports on Gateway Router',
      category: 'Perimeter Defense',
      priority: 'Critical',
      cost: '₹0 (Zero Cost)',
      effort: '2 Hours',
      owner: 'IT/OT Engineer',
      horizon: 'Immediate (1-2 weeks)',
      description: 'Audit external IP for exposed ports (102, 502, 3389, 44818) and disable all incoming WAN port forwards.',
      templateId: 'tpl-fw-01'
    });
  }

  // 3. Remote Access & VPN
  if (answers.remoteAccessEnabled === 'Direct Desktop Software' || answers.vpnUsed === 'No') {
    score -= 20;
    deductions.push({
      factor: 'Unrestricted Remote Desktop on SCADA/HMI',
      penalty: 20,
      severity: 'Critical',
      explanation: 'AnyDesk/TeamViewer on engineering stations creates persistent unmonitored backdoors directly bypassable by credential stuffing.'
    });
    alerts.push({
      id: 'ALT-RMT-01',
      title: 'Direct AnyDesk/TeamViewer Bypass on SCADA',
      severity: 'High',
      asset: 'Central SCADA Workstation (192.168.1.5)',
      timestamp: 'Immediate Concern',
      description: 'Unattended remote desktop software is running on the supervisory workstation without MFA or jump host isolation.',
      recommendation: 'Remove permanent unattended access. Require VPN with OTP tokens before granting access to remote vendors.',
      status: 'Active',
      category: 'Remote Access'
    });
    immediateTasks.push({
      id: 'TSK-RMT-01',
      title: 'Disable Unattended Remote Desktop on Production Workstations',
      category: 'Access Control',
      priority: 'Critical',
      cost: '₹0 (Zero Cost)',
      effort: '1 Hour',
      owner: 'Plant Manager / IT Engineer',
      horizon: 'Immediate (1-2 weeks)',
      description: 'Revoke permanent AnyDesk passwords on SCADA and HMI computers. Set to manual operator confirmation only.',
      templateId: 'tpl-rmt-01'
    });
  }

  // 4. Default Credentials & Passwords
  if (answers.defaultPasswordsUsed === 'Default Passwords Active' || answers.defaultPasswordsUsed === 'Unknown') {
    score -= 15;
    deductions.push({
      factor: 'Default Factory Credentials Still Active',
      penalty: 15,
      severity: 'Critical',
      explanation: 'Known default vendor passwords on PLCs and HMIs allow anyone on network to alter setpoints or halt run-state.'
    });
    alerts.push({
      id: 'ALT-CRED-01',
      title: 'Default Credentials in Active Use',
      severity: 'High',
      asset: '5 Shop Floor HMIs & Core Switches',
      timestamp: 'Vulnerability Detected',
      description: 'Default passwords (e.g. admin/admin, 1234) are configured on human-machine interfaces and switch administration portals.',
      recommendation: 'Enforce unique 12+ character alphanumeric passwords across all PLC programming ports, HMIs, and switches.',
      status: 'Active',
      category: 'Credentials'
    });
    immediateTasks.push({
      id: 'TSK-CRED-01',
      title: 'Change Default Passwords on All PLCs & HMIs',
      category: 'Credential Hygiene',
      priority: 'Critical',
      cost: '₹0 (Zero Cost)',
      effort: '3 Hours',
      owner: 'IT/OT Engineer',
      horizon: 'Immediate (1-2 weeks)',
      description: 'Perform a walkthrough across all 8 PLCs and 5 HMIs. Replace factory defaults with salted unique passwords stored in an encrypted vault.',
      templateId: 'tpl-plc-01'
    });
  }

  // 5. Shared Accounts & RBAC
  if (answers.sharedAccounts === 'Shared Operator Account' || answers.sharedAccounts === 'No Passwords Required' || answers.rbacImplemented === 'Not Implemented') {
    score -= 10;
    deductions.push({
      factor: 'Shared Operator Credentials & No RBAC',
      penalty: 10,
      severity: 'Medium',
      explanation: 'All shifts using generic logins destroys non-repudiation and allows accidental parameter corruption.'
    });
    alerts.push({
      id: 'ALT-ACC-01',
      title: 'Shared Operator Credentials Detected',
      severity: 'Medium',
      asset: 'SCADA & Production Lines 1-3',
      timestamp: 'Audit Finding',
      description: 'Shift operators share generic "operator" login without individual attribution or activity logging.',
      recommendation: 'Implement role-based permissions: Operator (Recipe Select only), Supervisor (Parameter adjustment), Engineer (Ladder Logic).',
      status: 'Active',
      category: 'Identity'
    });
    mediumTasks.push({
      id: 'TSK-ACC-01',
      title: 'Implement Role-Based Access Tiers in SCADA/HMI',
      category: 'Access Management',
      priority: 'Medium',
      cost: '₹0 - ₹5,000 (Low)',
      effort: '1 Day',
      owner: 'IT/OT Engineer',
      horizon: 'Medium-Term (1-3 months)',
      description: 'Create 3 distinct user groups: View-Only Operator, Line Supervisor, and Automation Engineer.',
      templateId: 'tpl-rbac-01'
    });
  }

  // 6. Vendor Access Management
  if (answers.vendorAccessControlled === 'Permanent Unattended Access' || answers.vendorAccessControlled === 'No Policy') {
    score -= 10;
    deductions.push({
      factor: 'Unrestricted External Vendor & Contractor Access',
      penalty: 10,
      severity: 'High',
      explanation: 'Permanent contractor links provide a silent transit path during vendor supply chain intrusions.'
    });
    immediateTasks.push({
      id: 'TSK-ACC-02',
      title: 'Revoke Uncontrolled Vendor Access Tokens',
      category: 'Vendor Governance',
      priority: 'High',
      cost: '₹0 (Zero Cost)',
      effort: '2 Hours',
      owner: 'Plant Manager',
      horizon: 'Immediate (1-2 weeks)',
      description: 'Audit all third-party remote links. Mandate that vendor remote sessions require supervisor sign-off and live accompaniment.',
      templateId: 'tpl-rmt-01'
    });
  }

  // 7. PLC Logic Backups & 3-2-1 Strategy
  if (answers.plcLogicBackedUp === 'Never Backed Up' || answers.plcLogicBackedUp === 'Occasional Manual' || answers.plcLogicBackedUp === 'Unknown') {
    score -= 15;
    deductions.push({
      factor: 'Irregular or Missing PLC Program Backups',
      penalty: 15,
      severity: 'Critical',
      explanation: 'Controllers run unversioned code. If a controller is wiped or corrupted, production stoppage lasts until vendor reprogramming.'
    });
    alerts.push({
      id: 'ALT-BKP-01',
      title: 'Critical PLC Logic Backups Missing / Stale',
      severity: 'High',
      asset: '8 Industrial PLCs across Lines 1-3',
      timestamp: 'High Ransomware Exposure',
      description: 'No verified recent backup files exist for Siemens S7 and Schneider PLC programs.',
      recommendation: 'Archive all PLC ladder logic, hardware configurations, and recipe registers to offline encrypted media.',
      status: 'Active',
      category: 'Backup'
    });
    immediateTasks.push({
      id: 'TSK-BKP-01',
      title: 'Capture Full Baseline Backup of All 8 PLCs',
      category: 'Disaster Recovery',
      priority: 'Critical',
      cost: '₹2,500 (Cost of dedicated encrypted USB drives)',
      effort: '1 Day',
      owner: 'IT/OT Engineer',
      horizon: 'Immediate (1-2 weeks)',
      description: 'Connect engineering laptop to each PLC. Export .zap16/project files for all Siemens and Schneider controllers.',
      templateId: 'tpl-bkp-01'
    });
  }

  // 8. Offline Air-Gapped Backups
  if (answers.offlineBackupsStored === 'No Offline Copies' || answers.offlineBackupsStored === 'Only Connected Storage' || answers.offlineBackupsStored === 'Unknown') {
    score -= 10;
    deductions.push({
      factor: 'Absence of Air-Gapped / Offline Backups',
      penalty: 10,
      severity: 'Critical',
      explanation: 'Modern industrial ransomware specifically scans for connected NAS drives and deletes shadow copies before encryption.'
    });
    mediumTasks.push({
      id: 'TSK-BKP-02',
      title: 'Establish 3-2-1 Offline Backup Routine',
      category: 'Ransomware Resilience',
      priority: 'High',
      cost: '₹8,000 (Two rotating external hard drives)',
      effort: '2 Days',
      owner: 'Plant Manager / IT Engineer',
      horizon: 'Medium-Term (1-3 months)',
      description: 'Maintain 3 copies of PLC/SCADA data, across 2 different media types, with 1 copy stored disconnected in a fireproof safe.',
      templateId: 'tpl-bkp-01'
    });
  }

  // 9. Backup Restoration Testing
  if (answers.backupRestorationTested === 'Never Tested' || answers.backupRestorationTested === 'Tested Over 1 Year Ago') {
    score -= 5;
    deductions.push({
      factor: 'Untested Recovery Capability',
      penalty: 5,
      severity: 'Medium',
      explanation: 'Backups have not been test-restored to verify file integrity and compatibility.'
    });
    longTermTasks.push({
      id: 'TSK-DR-01',
      title: 'Conduct Semi-Annual Disaster Recovery Tabletop & Restore Drill',
      category: 'Business Continuity',
      priority: 'Medium',
      cost: '₹0 (Zero Cost)',
      effort: 'Half Day',
      owner: 'Plant Manager',
      horizon: 'Long-Term (3-12 months)',
      description: 'Simulate complete failure of Line 1 PLC. Test restoring logic from offline backup onto spare controller.',
      templateId: 'tpl-ir-01'
    });
  }

  // 10. Endpoint Protection on SCADA
  if (answers.endpointProtection === 'Disabled or None' || answers.endpointProtection === 'Unknown') {
    score -= 10;
    deductions.push({
      factor: 'Unprotected Supervisory Workstations (No Antivirus)',
      penalty: 10,
      severity: 'High',
      explanation: 'SCADA servers and engineering laptops have no real-time malware inspection, vulnerable to malicious USB drives.'
    });
    alerts.push({
      id: 'ALT-EDR-01',
      title: 'SCADA Workstations Running Without Endpoint Protection',
      severity: 'High',
      asset: 'WinCC Central Server & Maintenance PCs',
      timestamp: 'Vulnerability Detected',
      description: 'Antivirus protection is disabled to avoid process latency, leaving computers open to worm outbreaks.',
      recommendation: 'Configure lightweight, OT-compatible endpoint protection with automated exclusions for SCADA database folders.',
      status: 'Active',
      category: 'Workstation'
    });
    immediateTasks.push({
      id: 'TSK-EDR-01',
      title: 'Deploy OT-Tuned Endpoint Protection on SCADA PCs',
      category: 'Host Hardening',
      priority: 'High',
      cost: '₹6,000 / year (Standard SMB antivirus)',
      effort: '4 Hours',
      owner: 'IT/OT Engineer',
      horizon: 'Immediate (1-2 weeks)',
      description: 'Enable Microsoft Defender or specialized industrial AV with exclusions for SCADA archives to ensure zero CPU lag.',
      templateId: 'tpl-scada-01'
    });
  }

  // 11. Monitoring & Visibility
  if (answers.otMonitoring === 'No Visibility' || answers.otMonitoring === 'Basic Router Logs Only') {
    score -= 5;
    deductions.push({
      factor: 'Zero Traffic Logging or Monitoring Inside OT Subnet',
      penalty: 5,
      severity: 'Low',
      explanation: 'Factory cannot detect internal reconnaissance or abnormal command sequences sent to PLCs.'
    });
    longTermTasks.push({
      id: 'TSK-MON-01',
      title: 'Deploy Low-Cost Passive OT Network Sensor',
      category: 'Monitoring & Visibility',
      priority: 'Low',
      cost: '₹12,000 (Refurbished mini-PC with Zeek/Suricata on SPAN port)',
      effort: '3 Days',
      owner: 'IT/OT Engineer',
      horizon: 'Long-Term (3-12 months)',
      description: 'Mirror core switch port to a passive sensor to log all Modbus/S7Comm connections without touching production packets.',
      templateId: 'tpl-net-02'
    });
  }

  // 12. Incident Response Plan & Employee Training
  if (answers.incidentResponsePlan === 'No Incident Plan' || answers.incidentResponsePlan === 'Informal Understanding') {
    score -= 10;
    deductions.push({
      factor: 'Lack of Documented OT Cyber Incident Playbook',
      penalty: 10,
      severity: 'High',
      explanation: 'Operators do not know emergency isolation steps during a cyber incident, leading to panic and prolonged outages.'
    });
    alerts.push({
      id: 'ALT-IR-01',
      title: 'No Documented Production Quarantine Playbook',
      severity: 'Medium',
      asset: 'Plant-Wide Emergency Response',
      timestamp: 'Governance Gap',
      description: 'Shop floor lacks physical action cards detailing who to call and how to disconnect machines when ransomware strikes.',
      recommendation: 'Adopt the FactoryShield Plain-Language Incident Response Procedure and mount printed copies near plant emergency exits.',
      status: 'Active',
      category: 'Governance'
    });
    immediateTasks.push({
      id: 'TSK-IR-01',
      title: 'Publish 1-Page Emergency Factory Cyber Isolation Checklist',
      category: 'Emergency Preparedness',
      priority: 'High',
      cost: '₹0 (Zero Cost)',
      effort: '2 Hours',
      owner: 'Plant Manager',
      horizon: 'Immediate (1-2 weeks)',
      description: 'Print laminated "Pull the Cable" instruction cards for all 3 production line consoles detailing safe disconnect steps.',
      templateId: 'tpl-ir-01'
    });
  }

  if (answers.employeeCyberTraining === 'Never Trained') {
    score -= 5;
    deductions.push({
      factor: 'Shop Floor Personnel Unaware of Cyber Hazards',
      penalty: 5,
      severity: 'Low',
      explanation: 'Technicians routinely charge mobile devices on HMI USB ports and open vendor email attachments.'
    });
    longTermTasks.push({
      id: 'TSK-TRN-01',
      title: 'Conduct 30-Minute Shop Floor Cyber Hygiene Toolbox Talk',
      category: 'Human Factor',
      priority: 'Medium',
      cost: '₹0 (Zero Cost)',
      effort: '1 Hour',
      owner: 'Plant Manager',
      horizon: 'Long-Term (3-12 months)',
      description: 'Educate shift supervisors on the dangers of unauthorized USB drives and social engineering in local language (Hindi/Marathi).',
      templateId: 'tpl-trn-01'
    });
  }

  // Ensure score stays bounded between 5 and 100
  score = Math.max(5, Math.min(100, score));

  // Compute Task Completion Bonus:
  // As user completes tasks, they recover up to all deducted points!
  const allGeneratedTasks = [...immediateTasks, ...mediumTasks, ...longTermTasks];
  const completedTaskIds = Object.keys(tasksProgress).filter(id => tasksProgress[id] === 'Completed');
  const inProgressTaskIds = Object.keys(tasksProgress).filter(id => tasksProgress[id] === 'In Progress');

  const pointsPerTask = allGeneratedTasks.length > 0 ? (100 - score) / allGeneratedTasks.length : 0;
  const recoveredPoints = Math.round(completedTaskIds.length * pointsPerTask + inProgressTaskIds.length * (pointsPerTask * 0.3));
  const dynamicScore = Math.min(100, score + recoveredPoints);

  // Risk Classification
  let riskLevel = 'High';
  let riskColor = '#EF4444'; // Red
  let riskBg = 'rgba(239, 68, 68, 0.15)';
  if (dynamicScore >= 71) {
    riskLevel = 'Low';
    riskColor = '#10B981'; // Emerald
    riskBg = 'rgba(16, 185, 129, 0.15)';
  } else if (dynamicScore >= 41) {
    riskLevel = 'Medium';
    riskColor = '#F59E0B'; // Amber
    riskBg = 'rgba(245, 158, 11, 0.15)';
  }

  // Ransomware Readiness Dimensions (0-100%)
  const hasBackups = answers.plcLogicBackedUp === 'Automated & Versioned' || tasksProgress['TSK-BKP-01'] === 'Completed';
  const hasOffline = answers.offlineBackupsStored === 'Yes 3-2-1 Strategy' || tasksProgress['TSK-BKP-02'] === 'Completed';
  const hasRestores = answers.backupRestorationTested === 'Tested Within 6 Months' || tasksProgress['TSK-DR-01'] === 'Completed';
  const hasSegmentation = answers.networkSeparation === 'Completely Separated' || tasksProgress['TSK-NET-01'] === 'Completed';
  const hasIRPlan = answers.incidentResponsePlan === 'Documented & Drilled' || tasksProgress['TSK-IR-01'] === 'Completed';

  let readinessFactors = 0;
  if (hasBackups) readinessFactors += 1;
  if (hasOffline) readinessFactors += 1;
  if (hasRestores) readinessFactors += 1;
  if (hasSegmentation) readinessFactors += 1;
  if (hasIRPlan) readinessFactors += 1;
  const ransomwareReadinessPct = Math.round((readinessFactors / 5) * 100);

  // OT Assets summary
  const totalPLCs = parseInt(answers.plcsCount || 8, 10);
  const totalSCADA = parseInt(answers.scadaCount || 2, 10);
  const totalHMIs = 5;
  const totalIoTs = 12;
  const totalWorkstations = 3;
  const totalAssets = totalPLCs + totalSCADA + totalHMIs + totalIoTs + totalWorkstations;

  // Protected vs Unprotected:
  // If dynamicScore is 20, 20% protected. As score rises, protected assets rise!
  const protectedAssets = Math.round((dynamicScore / 100) * totalAssets);
  const unprotectedAssets = totalAssets - protectedAssets;

  return {
    rawScore: score,
    dynamicScore,
    riskLevel,
    riskColor,
    riskBg,
    deductions,
    alerts,
    answers,
    tasks: {
      immediate: immediateTasks.map(t => ({ ...t, status: tasksProgress[t.id] || 'Not Started' })),
      medium: mediumTasks.map(t => ({ ...t, status: tasksProgress[t.id] || 'Not Started' })),
      longTerm: longTermTasks.map(t => ({ ...t, status: tasksProgress[t.id] || 'Not Started' }))
    },
    allTasks: allGeneratedTasks.map(t => ({ ...t, status: tasksProgress[t.id] || 'Not Started' })),
    ransomwareReadiness: {
      percentage: ransomwareReadinessPct,
      hasBackups,
      hasOffline,
      hasRestores,
      hasSegmentation,
      hasIRPlan,
      status: ransomwareReadinessPct >= 80 ? 'Robust' : ransomwareReadinessPct >= 40 ? 'Moderate' : 'Vulnerable'
    },
    assetSummary: {
      total: totalAssets,
      protected: protectedAssets,
      unprotected: unprotectedAssets,
      plcs: totalPLCs,
      scada: totalSCADA,
      hmis: totalHMIs,
      iot: totalIoTs,
      workstations: totalWorkstations
    }
  };
}
