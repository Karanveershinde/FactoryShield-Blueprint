// Maharashtra Precision Manufacturing - Realistic Demonstration Factory
export const DEMO_FACTORY = {
  id: 'fac-pune-001',
  name: 'Maharashtra Precision Manufacturing',
  tagline: 'Leading Tier-2 Automotive Transmission & Engine Components Producer',
  location: 'MIDC Bhosari Industrial Area, Pune, Maharashtra, India',
  industry: 'Automotive Components',
  size: 'Medium',
  establishedYear: 2012,
  employees: 85,
  productionLines: 3,
  linesDetail: [
    { id: 'L1', name: 'Line 1: High-Precision CNC Machining', status: 'Operational', criticalLevel: 'Critical' },
    { id: 'L2', name: 'Line 2: Robotic Spot & Arc Welding', status: 'Operational', criticalLevel: 'Critical' },
    { id: 'L3', name: 'Line 3: Stamping, Quality Inspection & Assembly', status: 'Operational', criticalLevel: 'High' }
  ],
  criticalProcesses: 'High-speed CNC gear hobbing, robotic transmission housing welding, coordinate measuring machine (CMM) dimensional verification',
  acceptableDowntimeHours: 4, // Exceeding 4h risks OEM line-stoppage penalties

  // OT Asset Breakdown
  assets: {
    plcs: 8,
    plcDetails: [
      { id: 'PLC-01', model: 'Siemens S7-1200 CPU 1214C', line: 'Line 1', ip: '192.168.1.10', firmware: 'v4.2 (Unpatched)', protected: false, backupStatus: 'Missing' },
      { id: 'PLC-02', model: 'Siemens S7-1200 CPU 1214C', line: 'Line 1', ip: '192.168.1.11', firmware: 'v4.2 (Unpatched)', protected: false, backupStatus: 'Missing' },
      { id: 'PLC-03', model: 'Siemens S7-1500 CPU 1515-2', line: 'Line 1', ip: '192.168.1.12', firmware: 'v2.8', protected: false, backupStatus: 'Old (6 mos)' },
      { id: 'PLC-04', model: 'Schneider Modicon M221', line: 'Line 2', ip: '192.168.1.20', firmware: 'v1.4', protected: false, backupStatus: 'Missing' },
      { id: 'PLC-05', model: 'Schneider Modicon M241', line: 'Line 2', ip: '192.168.1.21', firmware: 'v2.1', protected: false, backupStatus: 'Missing' },
      { id: 'PLC-06', model: 'Rockwell Micro850', line: 'Line 2', ip: '192.168.1.22', firmware: 'v12', protected: false, backupStatus: 'Old (1 yr)' },
      { id: 'PLC-07', model: 'Delta DVP-ES2', line: 'Line 3', ip: '192.168.1.30', firmware: 'v1.0', protected: false, backupStatus: 'Missing' },
      { id: 'PLC-08', model: 'Siemens S7-1200 CPU 1212C', line: 'Line 3', ip: '192.168.1.31', firmware: 'v4.0', protected: false, backupStatus: 'Missing' }
    ],
    scada: 2,
    scadaDetails: [
      { id: 'SCADA-SRV-01', name: 'WinCC V7.5 Central Server', os: 'Windows 10 Pro (Non-LTSC)', ip: '192.168.1.5', usbAllowed: true, antiVirus: false, protected: false },
      { id: 'SCADA-SRV-02', name: 'Wonderware InTouch Historian', os: 'Windows 7 Embedded (EOL)', ip: '192.168.1.6', usbAllowed: true, antiVirus: false, protected: false }
    ],
    hmis: 5,
    hmiDetails: [
      { id: 'HMI-01', model: 'Siemens KTP700 Basic', line: 'Line 1', ip: '192.168.1.15', defaultPass: true },
      { id: 'HMI-02', model: 'Siemens KTP900 Comfort', line: 'Line 1', ip: '192.168.1.16', defaultPass: true },
      { id: 'HMI-03', model: 'Pro-face GP4000', line: 'Line 2', ip: '192.168.1.25', defaultPass: true },
      { id: 'HMI-04', model: 'Schneider Magelis GTO', line: 'Line 2', ip: '192.168.1.26', defaultPass: true },
      { id: 'HMI-05', model: 'Weintek MT8071iE', line: 'Line 3', ip: '192.168.1.35', defaultPass: true }
    ],
    cncMachines: 6,
    robots: 4,
    iotSensors: 12,
    workstations: 3,
    workstationDetails: [
      { id: 'ENG-WS-01', name: 'Senior Automation Engg Laptop', user: 'Ramesh K. (Shared with interns)', internetAccess: true, hasAnyDesk: true, protected: false },
      { id: 'ENG-WS-02', name: 'Maintenance Desktop PC', user: 'Maintenance Team (No password)', internetAccess: true, hasAnyDesk: true, protected: false },
      { id: 'ENG-WS-03', name: 'Quality Lab CMM Workstation', user: 'Quality Inspector', internetAccess: false, hasAnyDesk: false, protected: true }
    ]
  },

  // Initial Assessment Responses (Pre-populated sample demonstrating realistic SME gaps)
  initialAssessment: {
    // Step 1: Factory Overview
    industry: 'Automotive Components',
    factorySize: 'Medium (50-250 employees)',
    employees: '85',
    productionLines: '3',
    criticalProcesses: 'CNC Machining, Robotic Welding, Stamping & Assembly',
    downtimeTolerance: 'Less than 4 hours (Severe OEM supply chain penalties)',

    // Step 2: Equipment & OT Assets
    plcsCount: '8',
    scadaCount: '2',
    hmisCount: '5',
    cncCount: '6',
    robotsCount: '4',
    iotCount: '12',
    workstationsCount: '3',
    connectedAssets: ['plcs', 'scada', 'hmis', 'cnc', 'robots', 'iot', 'workstations'],
    cloudConnected: 'Yes (IoT sensors stream vibration metrics to AWS IoT)',

    // Step 3: Network & Connectivity
    networkSeparation: 'No (Single flat subnet 192.168.1.0/24 shared by office ERP, Wi-Fi, and PLCs)',
    firewallInstalled: 'Consumer router only (No industrial firewall or VLANs configured)',
    remoteAccessEnabled: 'Yes (Maintenance engineer and German machine vendor use AnyDesk/TeamViewer directly to SCADA PC)',
    vpnUsed: 'No (Direct desktop remote software without MFA or VPN tunnel)',
    cellularModems: 'Yes (1 4G SIM router installed on Robot welding cell for vendor diagnostics)',

    // Step 4: Access and Accounts
    defaultPasswordsUsed: 'Yes (Default credentials "admin/admin" and "1234" still active on HMIs and network switches)',
    sharedAccounts: 'Yes (All 3 shift operators log into SCADA using generic "operator" account)',
    rbacImplemented: 'No (All production technicians have full Administrator rights to engineering software)',
    vendorAccessControlled: 'No (German robot vendor has permanent AnyDesk unattended password)',

    // Step 5: Backup & Ransomware Protection
    plcLogicBackedUp: 'Irregular (Last backup taken 6 months ago on technician’s personal pen drive)',
    scadaConfigBackedUp: 'No (Never backed up since commissioning in 2021)',
    offlineBackupsStored: 'No (No disconnected, air-gapped, or 3-2-1 backup scheme)',
    backupRestorationTested: 'No (Never tested if PLC programs can actually be restored)',
    endpointProtection: 'No (Antivirus disabled on SCADA to prevent false-positive process lag)',

    // Step 6: Existing Security Controls
    otMonitoring: 'None (No logging, no anomaly detection, blind to OT traffic)',
    physicalPanelSecurity: 'Partially (Main electrical room locked, but machine junction boxes are unlocked)',
    incidentResponsePlan: 'None (No documented procedure if screens lock or ransomware strikes)',
    employeeCyberTraining: 'None (Shop floor staff have never received phishing or USB hazard training)'
  },

  // Active User Profile
  currentUser: {
    id: 'usr-001',
    name: 'Vikram Joshi',
    email: 'v.joshi@mahaprecision.in',
    role: 'Plant Manager',
    factoryId: 'fac-pune-001',
    phone: '+91 98220 14820',
    joinedDate: '2023-04-15'
  }
};
