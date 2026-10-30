// Comprehensive 6-step OT-Aware Cybersecurity Assessment Definition
export const ASSESSMENT_STEPS = [
  {
    id: 1,
    title: 'Factory Overview',
    titleHi: 'कारखाना अवलोकन',
    subtitle: 'Production scale, industry context, and operational criticality',
    subtitleHi: 'उत्पादन पैमाना, उद्योग संदर्भ और परिचालन संवेदनशीलता',
    icon: 'Factory'
  },
  {
    id: 2,
    title: 'OT Equipment & Assets',
    titleHi: 'ओटी उपकरण और संपत्तियां',
    subtitle: 'Inventory of connected industrial machinery, PLCs, and SCADA systems',
    subtitleHi: 'कनेक्टेड मशीनरी, पीएलसी और स्काडा सिस्टम की सूची',
    icon: 'Cpu'
  },
  {
    id: 3,
    title: 'Network & Connectivity',
    titleHi: 'नेटवर्क और कनेक्टिविटी',
    subtitle: 'Network segmentation, firewall protection, and remote vendor access',
    subtitleHi: 'नेटवर्क विभाजन, फ़ायरवॉल सुरक्षा और रिमोट वेंडर एक्सेस',
    icon: 'Network'
  },
  {
    id: 4,
    title: 'Access & Accounts',
    titleHi: 'एक्सेस और खाते',
    subtitle: 'Credential hygiene, administrative permissions, and operator logins',
    subtitleHi: 'पासवर्ड सुरक्षा, प्रशासनिक अनुमतियां और ऑपरेटर लॉगिन',
    icon: 'Lock'
  },
  {
    id: 5,
    title: 'Backups & Ransomware',
    titleHi: 'बैकअप और रैंसमवेयर सुरक्षा',
    subtitle: 'PLC logic retention, offline 3-2-1 storage, and recovery readiness',
    subtitleHi: 'पीएलसी लॉजिक बैकअप, ऑफलाइन स्टोरेज और रिकवरी तैयारी',
    icon: 'Database'
  },
  {
    id: 6,
    title: 'Security Controls & Training',
    titleHi: 'सुरक्षा नियंत्रण और प्रशिक्षण',
    subtitle: 'Monitoring visibility, physical panel locks, and incident procedures',
    subtitleHi: 'निगरानी, भौतिक पैनल सुरक्षा और आपातकालीन प्रक्रियाएं',
    icon: 'ShieldAlert'
  }
];

export const ASSESSMENT_QUESTIONS = [
  // STEP 1: Factory Overview
  {
    id: 'industry',
    step: 1,
    label: 'Primary Manufacturing Industry',
    labelHi: 'प्राथमिक विनिर्माण उद्योग',
    helpText: 'Helps apply sector-specific OT threat profiles and compliance benchmarks.',
    type: 'select',
    options: [
      { value: 'Automotive Components', label: 'Automotive & Auto-Components (Tier 1/2/3)', badge: 'High Risk' },
      { value: 'Machinery & Precision Engineering', label: 'Machinery & Precision Engineering' },
      { value: 'Textiles & Garments', label: 'Textiles & Garment Manufacturing' },
      { value: 'Pharmaceuticals & Chemicals', label: 'Pharmaceuticals & Chemicals', badge: 'Critical' },
      { value: 'Food & Beverage Processing', label: 'Food & Beverage Processing' },
      { value: 'Electronics & Electrical Goods', label: 'Electronics & Electrical Goods' },
      { value: 'Plastics & Packaging', label: 'Plastics & Packaging' }
    ],
    default: 'Automotive Components'
  },
  {
    id: 'employees',
    step: 1,
    label: 'Total Workforce (Factory & Office)',
    labelHi: 'कुल कार्यबल (कारखाना और कार्यालय)',
    helpText: 'Size of workforce dictates attack surface for phishing and USB hygiene.',
    type: 'radio',
    options: [
      { value: '1-25', label: 'Micro (< 25 staff)' },
      { value: '26-100', label: 'Small (26 – 100 staff)' },
      { value: '101-250', label: 'Medium (101 – 250 staff)' },
      { value: '250+', label: 'Large SME (> 250 staff)' }
    ],
    default: '26-100'
  },
  {
    id: 'productionLines',
    step: 1,
    label: 'Number of Active Production Lines',
    labelHi: 'सक्रिय उत्पादन लाइनों की संख्या',
    helpText: 'More production lines increase network complexity and blast radius of an incident.',
    type: 'number',
    min: 1,
    max: 20,
    default: 3
  },
  {
    id: 'criticalProcesses',
    step: 1,
    label: 'Core Production Processes',
    labelHi: 'मुख्य उत्पादन प्रक्रियाएं',
    helpText: 'List processes whose stoppage immediately halts factory delivery (e.g. CNC, Welding, Assembly).',
    type: 'text',
    default: 'CNC Machining, Robotic Welding, Stamping & Assembly'
  },
  {
    id: 'downtimeTolerance',
    step: 1,
    label: 'Maximum Tolerable Downtime Before Severe Financial Loss',
    labelHi: 'गंभीर नुकसान से पहले अधिकतम सहनीय डाउनटाइम',
    helpText: 'Critical in determining whether high-availability clustering and rapid recovery backups are mandatory.',
    type: 'radio',
    options: [
      { value: 'Less than 2 hours', label: 'Critical: Under 2 Hours (OEM JIT fines apply)', risk: 'critical' },
      { value: '2-6 hours', label: 'High: 2 – 6 Hours', risk: 'high' },
      { value: '6-24 hours', label: 'Moderate: 1 Working Shift (6-24 Hours)', risk: 'medium' },
      { value: 'More than 24 hours', label: 'Flexible: > 24 Hours', risk: 'low' }
    ],
    default: '2-6 hours'
  },

  // STEP 2: Equipment & OT Assets
  {
    id: 'connectedAssets',
    step: 2,
    label: 'Which Operational Technology (OT) assets are currently present on your shop floor?',
    labelHi: 'कारखाने के फर्श पर कौन से ओटी उपकरण मौजूद हैं?',
    helpText: 'Select all industrial equipment types used in your manufacturing processes.',
    type: 'multicheck',
    options: [
      { value: 'plcs', label: 'Programmable Logic Controllers (PLCs)', icon: 'Cpu', desc: 'Siemens S7, Schneider, Rockwell, Delta controlling machinery' },
      { value: 'scada', label: 'SCADA / Historian Systems', icon: 'Server', desc: 'Centralized plant supervisory control and data logging PCs' },
      { value: 'hmis', label: 'Human-Machine Interfaces (HMIs)', icon: 'Monitor', desc: 'Touch panels on machine consoles for operator recipe inputs' },
      { value: 'cnc', label: 'Connected CNC Machines', icon: 'Cog', desc: 'Milling, turning, laser cutting machines connected via Ethernet/RS485' },
      { value: 'robots', label: 'Industrial Robots / Cobots', icon: 'Bot', desc: 'Automated robotic arms for welding, palletizing, or paint' },
      { value: 'iot', label: 'IIoT Sensors & Gateways', icon: 'Radio', desc: 'Vibration, temperature, energy meters transmitting to dashboards' },
      { value: 'workstations', label: 'Engineering Workstations', icon: 'Laptop', desc: 'Laptops/PCs used by engineers to program PLCs and upload logic' }
    ],
    default: ['plcs', 'scada', 'hmis', 'cnc', 'robots', 'iot', 'workstations']
  },
  {
    id: 'plcsCount',
    step: 2,
    label: 'Approximate Number of PLCs in Plant',
    labelHi: 'संयंत्र में पीएलसी की अनुमानित संख्या',
    helpText: 'Count all independent programmable controllers across all production cells.',
    type: 'number',
    min: 0,
    max: 100,
    default: 8
  },
  {
    id: 'scadaCount',
    step: 2,
    label: 'Number of SCADA / Supervisory Workstations',
    labelHi: 'स्काडा / पर्यवेक्षी कार्यस्थानों की संख्या',
    helpText: 'Dedicated PCs running supervisory software like WinCC, Wonderware, Ignition.',
    type: 'number',
    min: 0,
    max: 20,
    default: 2
  },
  {
    id: 'cloudConnected',
    step: 2,
    label: 'Are any OT or shop-floor systems connected directly to the Cloud / SaaS?',
    labelHi: 'क्या कोई ओटी सिस्टम सीधे क्लाउड से जुड़े हैं?',
    helpText: 'Example: Cloud telemetry for predictive maintenance, remote OEM dashboards.',
    type: 'radio',
    options: [
      { value: 'Yes', label: 'Yes, IoT sensors or machine telemetry connect to cloud platforms' },
      { value: 'No', label: 'No, all systems are strictly on-premise without cloud connectivity' },
      { value: 'Unknown', label: 'I do not know / Not sure', isUnknown: true }
    ],
    default: 'Yes'
  },

  // STEP 3: Network & Connectivity
  {
    id: 'networkSeparation',
    step: 3,
    label: 'Are your Corporate Office (IT) and Shop-Floor (OT) networks separated?',
    labelHi: 'क्या आपका कार्यालय (आईटी) और कारखाना (ओटी) नेटवर्क अलग हैं?',
    helpText: 'In a flat network, an office PC infected by ransomware can directly compromise PLCs and halt production.',
    type: 'radio',
    options: [
      { value: 'Completely Separated', label: 'Yes, physically or via VLANs + Industrial Firewall (Recommended)', points: 0 },
      { value: 'Partially Separated', label: 'Partially, separate Wi-Fi but same underlying router/switch', points: -10 },
      { value: 'Single Flat Network', label: 'No, everything is on a single flat subnet (e.g. 192.168.1.x)', points: -20, badge: 'Critical Risk' },
      { value: 'Unknown', label: 'I do not know / Not sure', points: -15, isUnknown: true }
    ],
    default: 'Single Flat Network'
  },
  {
    id: 'firewallInstalled',
    step: 3,
    label: 'What type of firewall protects the factory boundary?',
    labelHi: 'फ़ायरवॉल का क्या प्रकार है?',
    helpText: 'Consumer home/office routers lack deep packet inspection and OT protocol filtering.',
    type: 'radio',
    options: [
      { value: 'Dedicated UTM/Industrial Firewall', label: 'Dedicated Industrial Firewall / UTM (e.g., pfSense, Fortinet, Cisco)' },
      { value: 'Basic ISP / Consumer Router', label: 'Basic consumer ISP broadband router / Wi-Fi router', badge: 'High Risk' },
      { value: 'No Firewall', label: 'Direct internet connection / No active firewall' },
      { value: 'Unknown', label: 'I do not know / Not sure', isUnknown: true }
    ],
    default: 'Basic ISP / Consumer Router'
  },
  {
    id: 'remoteAccessEnabled',
    step: 3,
    label: 'Is remote access to plant machinery or SCADA enabled for vendors or engineers?',
    labelHi: 'क्या वेंडरों या इंजीनियरों के लिए रिमोट एक्सेस सक्षम है?',
    helpText: 'Remote access without strong controls is the #1 vector for industrial cyber extortion in SMEs.',
    type: 'radio',
    options: [
      { value: 'Direct Desktop Software', label: 'Yes, using AnyDesk, TeamViewer, or UltraViewer installed directly on SCADA/Workstations', badge: 'Critical Risk' },
      { value: 'Cellular Modem Dongle', label: 'Yes, OEM vendors installed 4G SIM modems directly into machine cabinets' },
      { value: 'Secure VPN with MFA', label: 'Yes, but strictly via secure encrypted VPN with Multi-Factor Authentication' },
      { value: 'Disabled', label: 'No, remote access is permanently disabled' },
      { value: 'Unknown', label: 'I do not know / Not sure', isUnknown: true }
    ],
    default: 'Direct Desktop Software'
  },
  {
    id: 'vpnUsed',
    step: 3,
    label: 'Is an encrypted VPN required for any inbound access into the factory?',
    labelHi: 'क्या फ़ैक्टरी में इनबाउंड एक्सेस के लिए वीपीएन अनिवार्य है?',
    helpText: 'Direct port-forwarding on public IP addresses invites automated ransomware botnets.',
    type: 'radio',
    options: [
      { value: 'Yes with MFA', label: 'Yes, with Multi-Factor Authentication (MFA)' },
      { value: 'Yes without MFA', label: 'Yes, VPN username/password only' },
      { value: 'No', label: 'No VPN, port forwarding or desktop sharing used directly', badge: 'High Risk' },
      { value: 'Unknown', label: 'I do not know / Not sure', isUnknown: true }
    ],
    default: 'No'
  },

  // STEP 4: Access & Accounts
  {
    id: 'defaultPasswordsUsed',
    step: 4,
    label: 'Are default factory credentials still active on any PLCs, HMIs, or network switches?',
    labelHi: 'क्या पीएलसी, एचएमआई या स्विच पर डिफ़ॉल्ट पासवर्ड अभी भी सक्रिय हैं?',
    helpText: 'Default passwords like "admin/admin", "1234", "password" are publicly indexed in attacker manuals.',
    type: 'radio',
    options: [
      { value: 'All Changed', label: 'All default credentials have been changed to complex unique passwords' },
      { value: 'Partially Changed', label: 'Changed on servers, but PLCs or switches still retain default passwords' },
      { value: 'Default Passwords Active', label: 'Yes, most machines use default installer passwords', badge: 'Critical Risk' },
      { value: 'Unknown', label: 'I do not know / Not sure (High probability of default)', isUnknown: true }
    ],
    default: 'Default Passwords Active'
  },
  {
    id: 'sharedAccounts',
    step: 4,
    label: 'Do machine operators and maintenance engineers share common login accounts?',
    labelHi: 'क्या ऑपरेटर और रखरखाव कर्मचारी साझा लॉगिन का उपयोग करते हैं?',
    helpText: 'Shared accounts prevent audit traceability: you cannot identify who modified parameters during an outage.',
    type: 'radio',
    options: [
      { value: 'Individual Accounts', label: 'Every engineer and supervisor has an individual named account' },
      { value: 'Shared Operator Account', label: 'Shift workers share generic accounts (e.g. "operator", "admin")', badge: 'High Risk' },
      { value: 'No Passwords Required', label: 'No password required; consoles are unlocked permanently', badge: 'Critical Risk' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'Shared Operator Account'
  },
  {
    id: 'rbacImplemented',
    step: 4,
    label: 'Is Role-Based Access Control (RBAC) enforced on engineering stations and SCADA?',
    labelHi: 'क्या भूमिका-आधारित पहुँच नियंत्रण (RBAC) लागू है?',
    helpText: 'Operators should only adjust batch limits; only certified engineers should upload PLC ladder logic.',
    type: 'radio',
    options: [
      { value: 'Fully Implemented', label: 'Yes, strict least-privilege roles (Operator vs Engineer vs Admin)' },
      { value: 'Partially Implemented', label: 'Some permissions restricted, but all technicians have admin access' },
      { value: 'Not Implemented', label: 'No, anyone with physical or remote access has full admin control' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'Not Implemented'
  },
  {
    id: 'vendorAccessControlled',
    step: 4,
    label: 'How is third-party machine vendor and contractor access managed?',
    labelHi: 'तृतीय-पक्ष वेंडर और ठेकेदार एक्सेस कैसे प्रबंधित किया जाता है?',
    helpText: 'Supply chain compromise via external maintenance vendors is a frequent attack vector.',
    type: 'radio',
    options: [
      { value: 'Strictly Supervised & Time-Bound', label: 'Only on-demand with supervisor approval, session logged & closed immediately' },
      { value: 'Permanent Unattended Access', label: 'Vendors have permanent unattended passwords into machine computers', badge: 'High Risk' },
      { value: 'No Policy', label: 'Vendors connect their own uninspected laptops directly to OT switches' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'Permanent Unattended Access'
  },

  // STEP 5: Backups & Ransomware Protection
  {
    id: 'plcLogicBackedUp',
    step: 5,
    label: 'Are PLC ladder logic programs and device firmware configurations backed up?',
    labelHi: 'क्या पीएलसी प्रोग्राम और फर्मवेयर कॉन्फ़िगरेशन का बैकअप लिया जाता है?',
    helpText: 'Without PLC logic backups, restoring an automated production line after cyber erasure takes weeks.',
    type: 'radio',
    options: [
      { value: 'Automated & Versioned', label: 'Yes, automated backups with change versioning (Weekly/Monthly)' },
      { value: 'Occasional Manual', label: 'Occasional manual backups on engineer personal laptops or USB pens' },
      { value: 'Never Backed Up', label: 'No backups exist since commissioning', badge: 'Critical Risk' },
      { value: 'Unknown', label: 'I do not know / Not sure', isUnknown: true }
    ],
    default: 'Occasional Manual'
  },
  {
    id: 'offlineBackupsStored',
    step: 5,
    label: 'Are your industrial backups stored offline (air-gapped from network)?',
    labelHi: 'क्या औद्योगिक बैकअप ऑफ़लाइन (नेटवर्क से अलग) संग्रहीत हैं?',
    helpText: 'Ransomware actively seeks and encrypts connected NAS shares and network backup drives.',
    type: 'radio',
    options: [
      { value: 'Yes 3-2-1 Strategy', label: 'Yes, offline air-gapped copies (3-2-1 strategy: 3 copies, 2 media, 1 offline)' },
      { value: 'Only Connected Storage', label: 'Only on a network shared folder or connected external drive', badge: 'High Risk' },
      { value: 'No Offline Copies', label: 'No offline copies exist', badge: 'Critical Risk' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'No Offline Copies'
  },
  {
    id: 'backupRestorationTested',
    step: 5,
    label: 'Has your team ever conducted a test restore from your backups?',
    labelHi: 'क्या बैकअप से पुनर्स्थापना का कभी परीक्षण किया गया है?',
    helpText: 'An untested backup is not a backup—many factories discover backups are corrupt only during disaster.',
    type: 'radio',
    options: [
      { value: 'Tested Within 6 Months', label: 'Yes, tested within the past 6 months on spare or staging hardware' },
      { value: 'Tested Over 1 Year Ago', label: 'Tested once during original plant commissioning years ago' },
      { value: 'Never Tested', label: 'Never tested / We assume they work', badge: 'High Risk' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'Never Tested'
  },
  {
    id: 'endpointProtection',
    step: 5,
    label: 'Is antivirus or endpoint protection installed on SCADA PCs & Engineering Workstations?',
    labelHi: 'क्या स्काडा पीसी पर एंटीवायरस स्थापित है?',
    helpText: 'Industrial PCs are frequent landing zones for malware spreading through infected USB pendrives.',
    type: 'radio',
    options: [
      { value: 'Managed Endpoint Protection', label: 'Yes, centralized endpoint protection with scheduled off-peak scans' },
      { value: 'Basic Windows Defender', label: 'Standard unmanaged Windows Defender only' },
      { value: 'Disabled or None', label: 'Disabled or absent to prevent process interference/lag', badge: 'Critical Risk' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'Disabled or None'
  },

  // STEP 6: Existing Security Controls
  {
    id: 'otMonitoring',
    step: 6,
    label: 'Do you have any network traffic logging or threat monitoring inside the OT network?',
    labelHi: 'क्या आपके पास ओटी नेटवर्क में ट्रैफ़िक लॉगिंग या खतरा निगरानी है?',
    helpText: 'Lack of visibility means malware can dwell unnoticed inside the factory network for months.',
    type: 'radio',
    options: [
      { value: 'Active OT Monitoring', label: 'Yes, passive OT network monitoring or syslog aggregation active' },
      { value: 'Basic Router Logs Only', label: 'Basic gateway firewall logs only (not inspected)' },
      { value: 'No Visibility', label: 'Zero monitoring; complete blind spot in shop-floor traffic', badge: 'High Risk' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'No Visibility'
  },
  {
    id: 'physicalPanelSecurity',
    step: 6,
    label: 'Are machine control cabinets, switches, and PLC panels physically locked?',
    labelHi: 'क्या मशीन नियंत्रण कैबिनेट और पीएलसी पैनल बंद हैं?',
    helpText: 'Uncontrolled physical access allows rogue USB drives, malicious Wi-Fi implants, or accidental wiring.',
    type: 'radio',
    options: [
      { value: 'All Locked & Key Controlled', label: 'All electrical control panels locked with strict key management' },
      { value: 'Main Panel Locked Only', label: 'Main substation locked, but individual machine cabinets unlocked' },
      { value: 'Open Access', label: 'Openly accessible to anyone walking on the shop floor' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'Main Panel Locked Only'
  },
  {
    id: 'incidentResponsePlan',
    step: 6,
    label: 'Does the plant have a documented Cyber Incident Response & Production Quarantine procedure?',
    labelHi: 'क्या संयंत्र में प्रलेखित साइबर घटना प्रतिक्रिया प्रक्रिया है?',
    helpText: 'When screens lock up, supervisors must know whether to pull network cables or press emergency stop.',
    type: 'radio',
    options: [
      { value: 'Documented & Drilled', label: 'Yes, clear documented protocol with emergency contacts and isolation steps' },
      { value: 'Informal Understanding', label: 'Informal verbal idea (e.g. "call the IT vendor")' },
      { value: 'No Incident Plan', label: 'No plan exists whatsoever', badge: 'Critical Risk' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'No Incident Plan'
  },
  {
    id: 'employeeCyberTraining',
    step: 6,
    label: 'Have operators and technicians received industrial cyber hygiene training?',
    labelHi: 'क्या कर्मचारियों को साइबर स्वच्छता प्रशिक्षण प्राप्त हुआ है?',
    helpText: 'Shop floor personnel often charge personal smartphones or plug unverified USB sticks into HMIs.',
    type: 'radio',
    options: [
      { value: 'Regular Training Conducted', label: 'Yes, annual training on USB hazards, suspicious emails, and password safety' },
      { value: 'Brief Overview Only', label: 'Brief mention during initial onboarding only' },
      { value: 'Never Trained', label: 'Never received any cybersecurity training', badge: 'High Risk' },
      { value: 'Unknown', label: 'I do not know', isUnknown: true }
    ],
    default: 'Never Trained'
  }
];
