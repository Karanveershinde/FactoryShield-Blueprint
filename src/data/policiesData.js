// Plain-Language Industrial Cybersecurity Policies for Indian SME Factories
// Easy-to-read, legally sound, and practically implementable on the shop floor

export const POLICY_TEMPLATES = [
  {
    id: 'pol-access-01',
    title: 'Factory OT Access Control & Credential Policy',
    category: 'Access Management',
    version: '1.2-SME',
    effectiveDays: 'Annual Review',
    summary: 'Establishes clear rules for user passwords, account sharing elimination, and contractor access permissions.',
    toggles: [
      { key: 'includeVendorRemote', label: 'Include External Vendor Remote Access Rules', default: true },
      { key: 'includeUSBMedia', label: 'Include USB Pen Drive Quarantine & Scanning Station Clause', default: true },
      { key: 'includeMobileProhibition', label: 'Prohibit Charging Personal Phones on Machine USB Ports', default: true }
    ],
    generateContent: (factory, options = {}) => `
# FACTORY OT ACCESS CONTROL & CREDENTIAL POLICY
**Organization:** ${factory.name || 'Maharashtra Precision Manufacturing'}  
**Location:** ${factory.location || 'Pune, Maharashtra, India'}  
**Document Ref:** FSP-POL-ACC-001 | **Effective Date:** October 2026 | **Scope:** Production Lines 1-${factory.productionLines || 3}

---

### 1. PURPOSE AND OBJECTIVE
The purpose of this policy is to safeguard the industrial automation, PLCs, SCADA systems, and machinery of **${factory.name}** against unauthorized access, accidental misconfiguration, and cyber-sabotage.

### 2. CORE ACCESS PRINCIPLES
- **No Shared Accounts:** The practice of multiple shift technicians sharing generic credentials (e.g., "admin", "operator") is strictly prohibited. Every technician, supervisor, and engineer must operate under an individual named profile.
- **Principle of Least Privilege:** Users shall only be granted permissions strictly necessary to perform their designated shift duties. Machine operators shall not possess administrator rights to modify PLC ladder logic or operating system files.
- **Default Password Elimination:** All default factory installer credentials ("admin/admin", "1234", "password", "root") on newly commissioned PLCs, HMIs, drives, and network switches must be changed prior to commissioning.

### 3. PASSWORD SPECIFICATIONS
1. Passwords on all supervisory workstations and engineering laptops must be at least **12 characters in length** and combine uppercase letters, lowercase letters, numbers, and special symbols.
2. Machine HMI alphanumeric PINs (where keyboard entry is restricted) must be at least **6 digits** and rotated every 90 days.
3. Passwords must never be written on sticky notes attached to machine panels, computer monitors, or electrical cabinets.

${options.includeVendorRemote ? `
### 4. THIRD-PARTY MACHINE VENDOR & CONTRACTOR ACCESS
- Unattended, 24/7 remote desktop connections (such as standalone AnyDesk or TeamViewer) are strictly prohibited on all shop-floor computers.
- All remote support sessions by external machine vendors must receive prior authorization from the **${factory.currentUser?.name || 'Plant Manager'}**.
- Remote vendor sessions must take place via an encrypted VPN jump host with multi-factor authentication (MFA) enabled.
- A designated internal automation technician must remain present and monitor the session in real-time. Sessions will automatically terminate after 2 hours.
` : ''}

${options.includeUSBMedia ? `
### 5. USB REMOVABLE MEDIA & PORT SECURITY
- Personal USB flash drives, external hard disks, and MP3 players are prohibited from connecting to any SCADA PC, HMI, or engineering workstation.
- Only authorized, encrypted company USB drives labeled with serial numbers may be utilized for OT backups and project transfers.
- Before connecting any USB drive to an OT device, the drive must be scanned for malware at the dedicated "Air-Gap USB Kiosk" in the Maintenance Office.
` : ''}

${options.includeMobileProhibition ? `
### 6. PERSONAL SMARTPHONE CHARGING PROHIBITION
- Workers and operators are strictly prohibited from plugging personal mobile phones, power banks, or wireless dongles into machine USB ports, HMI consoles, or PLC interfaces for charging.
- Wall-mounted charging stations located in designated break rooms must be used instead.
` : ''}

### 7. VIOLATIONS AND DISCIPLINARY ACTIONS
Intentional bypassing of access controls, sharing administrative passwords, or disabling security safeguards without change authorization may lead to formal disciplinary action and immediate revocation of factory network privileges.

---
**Approved By:** ___________________________ (**Plant Director / Owner**)  
**Implemented By:** ___________________________ (**IT/OT Engineering Lead**)
`
  },
  {
    id: 'pol-change-01',
    title: 'OT Change Management & Logic Deployment Policy',
    category: 'Operations & Engineering',
    version: '1.0-SME',
    effectiveDays: 'Bi-Annual Review',
    summary: 'Governs how PLC ladder logic, setpoints, recipes, and network configurations are modified and recorded.',
    toggles: [
      { key: 'includeEmergencyChange', label: 'Include Emergency Break-Glass Procedure for Breakdowns', default: true },
      { key: 'includePreBackupMandate', label: 'Mandate Pre-Deployment Backup Verification', default: true }
    ],
    generateContent: (factory, options = {}) => `
# OT CHANGE MANAGEMENT & LOGIC DEPLOYMENT POLICY
**Organization:** ${factory.name || 'Maharashtra Precision Manufacturing'}  
**Facility:** ${factory.location || 'Pune, Maharashtra, India'}  
**Document Ref:** FSP-POL-CHG-002 | **Scope:** All Industrial Controllers, HMIs, Drives & CNCs

---

### 1. OBJECTIVE
To prevent production downtime, quality defects, and cyber incidents resulting from unauthorized, untested, or unrecorded modifications to industrial automation programs.

### 2. CHANGE CATEGORIES
1. **Standard Operational Change:** Routine recipe parameter adjustments within pre-approved OEM tolerance envelopes (±5%). Handled directly by Shift Supervisors.
2. **Major Engineering Change:** Modifications to PLC ladder logic, safety interlock parameters, robotic welding tool paths, or SCADA alarm thresholds. Requires written approval.
3. **Emergency Breakdown Change:** Urgent logic bypasses required to clear a critical line jam or mechanical breakdown during active shift production.

${options.includePreBackupMandate ? `
### 3. MANDATORY PRE-DEPLOYMENT BACKUP RULE ("BACKUP BEFORE TOUCH")
- **Rule:** Under no circumstances shall an engineer or technician upload modified program code to a live production PLC without first taking a full timestamped backup of the existing running logic.
- The pre-change backup must be saved to the local engineering archive with the prefix: \`PRE_CHANGE_[DATE]_[PROJECT]\`.
- If the new code exhibits unexpected behavior during commissioning, the pre-change backup must be restored immediately.
` : ''}

### 4. FORMAL APPROVAL WORKFLOW
1. **Request:** The Automation Engineer fills out an OT Change Request (OTCR) form detailing the machine ID, reason for change, and tested offline simulation result.
2. **Review:** The **Plant Manager** reviews the request to verify safety compliance and alignment with production schedules.
3. **Execution Window:** Modifications to production lines must be scheduled during planned line maintenance or shift changeover.
4. **Post-Change Verification:** The engineer and Quality Inspector must run 5 test production cycles to verify dimensional tolerance before releasing the line to production.

${options.includeEmergencyChange ? `
### 5. EMERGENCY BREAKDOWN ("BREAK-GLASS") PROTOCOL
- If a machine stops during night shift and immediate ladder logic override is required to prevent material hardening or tooling damage, the on-duty engineer may perform an emergency change with verbal authorization from the Plant Manager.
- The engineer must document the exact change in the Shop Floor Logbook within 2 hours of resumption and submit formal documentation by 10:00 AM the following morning.
` : ''}

---
**Approved By:** ___________________________ (**Plant Director**)  
**Lead Automation Engineer:** ___________________________
`
  },
  {
    id: 'pol-backup-01',
    title: 'Industrial Backup, Retention & Disaster Recovery Policy',
    category: 'Disaster Recovery',
    version: '2.0-SME',
    effectiveDays: 'Quarterly Audit',
    summary: 'Defines the 3-2-1 backup architecture, retention timetables, and offline vault custody for industrial configurations.',
    toggles: [
      { key: 'includeOfflineSafe', label: 'Require Fireproof Safe for Offline Drives', default: true },
      { key: 'includeRestorationDrill', label: 'Enforce Semi-Annual Restoration Testing Drills', default: true }
    ],
    generateContent: (factory, options = {}) => `
# INDUSTRIAL BACKUP, RETENTION & DISASTER RECOVERY POLICY
**Organization:** ${factory.name || 'Maharashtra Precision Manufacturing'}  
**Facility:** ${factory.location || 'Pune, Maharashtra, India'}  
**Document Ref:** FSP-POL-BKP-003 | **Standard:** IEC 62443 / NIST CSF (Recover)

---

### 1. GOAL AND SCOPE
This policy establishes mandatory operational standards to ensure that **${factory.name}** can rapidly recover all production machinery, PLCs, SCADA servers, and robotic controllers in the event of ransomware encryption, hard drive failure, or electrical surge damage.

### 2. THE INDUSTRIAL 3-2-1 BACKUP STANDARD
All digital assets controlling production lines must comply with the 3-2-1 Rule:
- **3 Copies:** Maintain at least three copies of all engineering files (1 active production copy, 1 local on-site backup archive, 1 offline cold backup).
- **2 Media Types:** Backups must reside on at least two different storage mediums (e.g., local SSD server storage and external BitLocker-encrypted hard drives).
- **1 Offline / Air-Gapped Copy:** At least one complete copy must be stored completely disconnected from any network to prevent ransomware infection.

### 3. BACKUP RETENTION SCHEDULE
| Asset Type | Backup Frequency | Target Location | Responsible Role |
| :--- | :--- | :--- | :--- |
| **PLC Ladder Logic & Firmware** | After every change or Monthly | Engineering Vault & Air-Gap USB | Automation Engineer |
| **SCADA Historian & SQL Logs** | Daily Automated at 02:00 IST | On-Site NAS & Weekly Offline Drive | IT Administrator |
| **HMI Screen Projects & Recipes** | Monthly | Local Vault & Cloud Vault | OT Engineer |
| **Robotic Welding Coordinates** | Quarterly | Air-Gap Vault | Robotics Specialist |

${options.includeOfflineSafe ? `
### 4. AIR-GAPPED OFFLINE STORAGE & CUSTODY
- Two identical high-durability external USB hard drives (Drive A and Drive B) shall be rotated on a weekly basis.
- The offline drive must be physically locked inside the **Fireproof Safe in the Plant Manager's Office**.
- Under no circumstances shall an offline drive remain permanently plugged into any computer or network port.
` : ''}

${options.includeRestorationDrill ? `
### 5. SEMI-ANNUAL DISASTER RECOVERY TESTING DRILLS
- Backups that have never been tested for restoration cannot be relied upon in a crisis.
- Every six months, the OT Engineer must perform a mock recovery drill: restoring a program onto a test bench spare PLC and verifying that the firmware and logic boot without error.
- A Recovery Audit Certificate must be signed and filed with factory management.
` : ''}

---
**Reviewed By:** ___________________________ (**IT/OT Lead**)  
**Authorized By:** ___________________________ (**Managing Director**)
`
  },
  {
    id: 'pol-ir-01',
    title: 'Factory Cyber Incident Response & Production Quarantine Procedure',
    category: 'Emergency Response',
    version: '1.5-SME',
    effectiveDays: 'Immediate Enforcement',
    summary: 'A step-by-step action plan for shop floor operators and engineers when facing ransomware, screen lockouts, or erratic PLC behavior.',
    toggles: [
      { key: 'includeRansomwareProtocol', label: 'Include Ransomware Quarantine Steps ("Do Not Turn Off")', default: true },
      { key: 'includeEscalationContacts', label: 'Include Emergency Escalation Contact Table', default: true }
    ],
    generateContent: (factory, options = {}) => `
# FACTORY CYBER INCIDENT RESPONSE & PRODUCTION QUARANTINE PROCEDURE
**Organization:** ${factory.name || 'Maharashtra Precision Manufacturing'}  
**Location:** ${factory.location || 'Pune, Maharashtra, India'}  
**Emergency Hotline:** +91 98220 14820 | **Document Ref:** FSP-SOP-IR-004

---

### 1. IMMEDIATE ACTIONS FOR LINE OPERATORS (FIRST 5 MINUTES)
If you observe any of the following symptoms:
- SCADA screens display a ransom note, lock screen, or countdown timer.
- All files have strange extensions (\`.locked\`, \`.enc\`, \`.crypto\`).
- Industrial machinery moves erratically or ignores manual touch inputs.
- Unfamiliar pop-up windows appear asking for cryptocurrency or passwords.

**DO THE FOLLOWING IMMEDIATELY:**
1. **DO NOT TURN OFF OR REBOOT THE COMPUTER!**  
   *Reason: Rebooting destroys volatile memory (RAM) evidence needed by forensic specialists and may trigger ransomware encryption routines on reboot.*
2. **DISCONNECT THE ETHERNET NETWORK CABLE:**  
   *Physically pull out the blue/yellow network RJ45 cable from the back of the computer or panel switch immediately to prevent the virus from spreading to neighboring PLCs.*
3. **PRESS EMERGENCY STOP (E-STOP) IF SAFETY IS AT RISK:**  
   *If machinery moves unexpectedly, immediately press the nearest physical red mushroom E-Stop button.*
4. **ALERT THE PLANT MANAGER IMMEDIATELY:**  
   *Do not attempt to fix or delete files yourself.*

${options.includeRansomwareProtocol ? `
### 2. TECHNICAL CONTAINMENT PROTOCOL FOR IT/OT ENGINEERS
1. **Isolate the Industrial Subnet:** At the core switch, disconnect the uplink cable connecting the Office IT network to the OT network.
2. **Kill Remote Sessions:** Terminate any active remote sessions (AnyDesk, TeamViewer, VPN) at the perimeter firewall.
3. **Capture Volatile Data:** If safe, capture photos of error messages and ransom notes using a smartphone camera.
4. **Do Not Pay Any Ransom:** Paying ransom funds criminal syndicates, rarely results in data recovery, and exposes the company to legal liabilities.
5. **Prepare Clean Recovery Environment:** Format storage media on clean, verified machines before re-flashing PLC programs from offline air-gapped backups.
` : ''}

${options.includeEscalationContacts ? `
### 3. EMERGENCY ESCALATION CONTACTS
| Role | Name | Phone Number | Responsibility |
| :--- | :--- | :--- | :--- |
| **Plant Manager** | Vikram Joshi | +91 98220 14820 | Incident Commander & OEM Communication |
| **IT/OT Lead Engineer** | Ramesh K. | +91 98220 14821 | Network Isolation & Backup Restoration |
| **Factory Owner / MD** | Rajesh Deshmukh | +91 98220 14800 | Executive Decisions & Legal Escalation |
| **Local Police Cyber Cell** | Pune Cyber Crime Dept | 1930 / +91 20 2971 0097 | Official First Information Report (FIR) |
| **National CERT-In Hotline** | CERT-In Incident Desk | 1800-11-4949 (toll free) | National Cyber Emergency Reporting |
` : ''}

---
**Post this SOP on every production line bulletin board and beside SCADA consoles.**  
**Approved By:** ___________________________ (**Plant Director**)
`
  }
];
