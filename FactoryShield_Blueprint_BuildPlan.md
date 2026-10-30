# FactoryShield Blueprint – Build Plan

## 1. Problem Statement

Small and medium manufacturing factories in India are rapidly adopting smart factory technologies: connected PLCs, SCADA/HMI systems, industrial IoT sensors, and cloud ERPs. However:

- **Cybersecurity is not built-in**: OT (Operational Technology) security is rarely considered during digitalization, leaving PLCs, SCADA, and HMIs exposed.
- **Limited expertise & resources**: SME owners and plant managers lack OT security knowledge and cannot afford expensive consultants, SOC services, or complex tools.
- **Misaligned incentives**: Production targets and uptime take priority over long-term cyber-resilience, so security tasks are postponed or ignored.
- **Complex standards**: Frameworks like IEC 62443, NIST CSF, and ISO 27001 are hard to interpret and implement in small factories.
- **Fragmented guidance**: No simple, integrated, and affordable “playbook” exists that tells SMEs exactly what to do, in what order, with clear OT-specific examples.

This leads to:
- Flat networks where office PCs, engineering laptops, and PLCs share the same subnet.
- Shared / default passwords on PLCs, SCADA workstations, and remote access tools.
- Lack of backups for PLC logic and recipe data, leaving factories vulnerable to ransomware and accidental misconfigurations.
- No basic incident response playbook, causing confusion and downtime during attacks.

FactoryShield Blueprint aims to provide an **affordable, step-by-step OT cyber-resilience blueprint** that SMEs can actually implement with their existing teams.

---

## 2. Solution Overview

**FactoryShield Blueprint** is a web platform that guides Indian SME factories through a **visual, OT-aware cyber assessment** and outputs a **custom, prioritized security blueprint**:

- Users answer a **simple interactive questionnaire** (with diagrams/icons for machines, networks, and connections).
- A **rules engine** generates a tailored, plain-language **security blueprint**, including:
  - Network zoning and segmentation
  - OT/PLC/SCADA protection guidelines
  - Role-based access control
  - Ransomware prevention and backup strategy
  - Incident response and recovery steps
- The platform provides:
  - **Vendor-neutral configuration templates** (e.g., firewall rules, network separation, RBAC patterns)
  - **Prioritized action checklist** optimized for low-budget, high-impact actions
  - **Plain-language policy documents** that factories can adopt immediately
  - A simple **Cyber Threat Monitoring and Alert Dashboard** (beginner-friendly), giving visibility into key cyber risks and basic alerts.

The prototype will focus on **low-cost, open-source technologies** and be **scalable across different factory types** (automotive components, textiles, pharmaceuticals, etc.).

---

## 3. Target Users

1. **Factory Owners / Directors (SMEs in India)**
   - Need: Understand cyber risk in business language (downtime, reputational loss, compliance) and low-cost steps to reduce it.
   - Constraints: Limited budget, rely on plant managers and vendors for technical decisions.

2. **Plant Managers / Production Heads**
   - Need: Simple, actionable checklist to protect production lines without excessive downtime.
   - Constraints: Non-experts in cybersecurity, must balance uptime with change.

3. **IT/OT Engineers & Maintenance Teams**
   - Need: Pragmatic, vendor-neutral guides to implement:
     - Network segmentation
     - PLC/SCADA hardening
     - Role-based access control
     - Backups and ransomware protection
   - Constraints: Juggle multiple responsibilities, often one engineer for both IT and OT.

4. **Factory Supervisors / Line Leaders**
   - Need: Clear instructions on day-to-day security hygiene and what to do during an incident.
   - Constraints: Non-technical, limited time, often communicate in local languages.

---

## 4. Key Features

You MUST implement all these features in the prototype and reference them across the build:

1. **Interactive OT-Aware Questionnaire**
2. **Custom Security Blueprint Generator**
3. **Vendor-Neutral Configuration Templates**
4. **Prioritized Action Checklist**
5. **Plain Language Policy Documentation**
6. **Cyber Threat Monitoring and Alert Dashboard**

### 4.1 Interactive OT-Aware Questionnaire

- Visual, step-by-step assessment wizard:
  - Screens for: network layout, internet connectivity, remote access, PLC/SCADA types, backup practices, user accounts, and existing controls.
  - Uses icons/diagrams (e.g., “Office PCs”, “PLC”, “SCADA/HMI”, “CNC machine”, “IoT sensor”, “Router/Firewall”, “Cloud”) so users can **drag-and-drop** or **select** what they have.
- Adaptive questions:
  - If user says “Remote access enabled”, follow-up: “How? TeamViewer, VPN, vendor modem, etc.”
  - If “Multiple production lines”: ask per-line criticality and downtime tolerance.
- Output:
  - Structured JSON of environment & risk profile for the blueprint generator.
- Design choices:
  - Very simple language (with glossary tooltips).
  - Option for **English + one Indian language (e.g., Hindi) labels** in prototype.

### 4.2 Custom Security Blueprint Generator

- Takes questionnaire JSON and applies a **rules engine** that maps to:
  - IEC 62443 basic concepts (zones & conduits, least privilege).
  - NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover).
- Outputs a **factory-specific blueprint** including:
  - **Network zoning and segmentation**:
    - Recommended logical zones (Corporate IT, OT control, Safety/critical, DMZ).
    - Suggested VLANs / subnets and minimal firewall rules.
  - **OT device protection**:
    - PLC and SCADA/HMI hardening steps (see section 4.3 & templates).
  - **Role-based access control**:
    - Role definitions (Owner, Plant Manager, OT Engineer, Operator, Vendor).
    - Role → permissions mapping for systems (engineering stations, remote access, backups).
  - **Backup and ransomware resilience**:
    - Recommended backup types: PLC programs, SCADA configs, historian, recipe data.
    - 3-2-1 backup pattern simplified for SMEs (e.g., daily to USB, weekly to NAS, monthly offline).
  - **Incident response plan**:
    - Playbook for suspected ransomware, unauthorized access, or PLC malfunction due to suspected cyber causes.
    - Step-by-step actions separated for “non-technical staff” vs “IT/OT engineer”.
- Generated blueprint is:
  - Shown on screen as sections.
  - Exportable as **PDF and Word** (for management discussions and audits).

### 4.3 Vendor-Neutral Configuration Templates

- Library of **copy-pasteable templates**, tuned for low-cost environments:
  - **Network / Firewall**:
    - Sample VLAN layout for small factory (e.g., 192.168.10.x IT, 192.168.20.x OT, 192.168.30.x DMZ).
    - Example iptables / firewall rules for “block all IT → OT except SCADA/HMI and historian”.
    - Example configuration for a cheap SMB firewall / router.
  - **PLC & SCADA Protection**:
    - Generic checklist per PLC:
      - Change default passwords.
      - Restrict programming port use.
      - Disable unused services (web, FTP, etc.) if possible.
      - Separate engineering workstation from general PCs.
    - SCADA/HMI OS hardening:
      - Disabling USB autorun.
      - Local account management.
      - Anti-malware schedule configured during off-hours.
  - **Access Control & User Management**:
    - Patterns for:
      - Individual logins instead of shared “operator” account.
      - Simple RBAC mapping table template.
  - **Backup Configurations**:
    - Template for backup folder structure.
    - Example backup schedule (cron jobs / Windows Task Scheduler).
  - All written **without referencing specific brands**, but adaptable to common ones (Siemens, Allen-Bradley, Schneider, etc.).

### 4.4 Prioritized Action Checklist

- After blueprint generation, show a **prioritized, step-wise checklist**:
  - Grouped as:
    - “Must do in 1–2 weeks” – quick wins, low/no cost (e.g., change default passwords, disable unused remote access tools).
    - “Do in 1–3 months” – moderate effort (segmentation, backup automation).
    - “Plan for 3–12 months” – structural improvements (network redesign, formal policies).
  - Each checklist item has:
    - Plain title and short description.
    - Estimated cost (₹ low / medium / high) and effort.
    - Suggested owner role (Plant Manager, IT/OT Engineer, Vendor).
    - Link to a relevant configuration template or policy section.
- Users can:
  - Mark items as “Not started / In progress / Done”.
  - Save progress in their account.
  - Export a **progress report** to PDF.

### 4.5 Plain Language Policy Documentation

- Auto-generated, editable **policy documents** in plain, non-legal language:
  - **Access Control Policy**:
    - Who gets admin rights, password strength & rotation guidelines.
    - Handling of shared accounts and external vendors.
  - **OT Change Management Policy**:
    - Simple process for changes to PLC logic, SCADA screens, and network.
  - **Backup & Recovery Policy**:
    - What must be backed up, how often, where it is stored, who is responsible.
  - **Incident Response Procedure**:
    - Roles and responsibilities, communication steps, escalation contacts.
- Features:
  - Simple toggles (e.g., “Include vendor remote access section? Yes/No”).
  - Download as **Word / PDF** for local customization.
  - Clear section headers, bullet point style, easy for translation to local language.

### 4.6 Cyber Threat Monitoring and Alert Dashboard

- Beginner-friendly **security risk overview** dashboard:
  - Not a full SOC/SIEM; instead:
    - Shows **current risk posture** based on questionnaire and checklist completion.
    - Highlights critical areas:
      - Open remote access paths.
      - Lack of backups.
      - Shared passwords.
      - No network segmentation.
  - Components:
    - **Risk Score Widget**:
      - Simple “Low / Medium / High” risk indicator with score (0–100).
      - Based on rules: unprotected remote access, no backups, etc.
    - **Key OT Assets Summary**:
      - Count of PLCs, SCADA/HMI systems, IoT devices, and which are “protected/unprotected” per the questionnaire.
    - **Alert List**:
      - Rule-based alerts, for example:
        - “Remote access enabled without VPN – HIGH”
        - “No backup configured for PLC logic – MEDIUM”
        - “Operator account shared by >5 users – MEDIUM”
      - Alerts link to relevant blueprint/checklist steps.
    - **Ransomware Readiness Gauge**:
      - Simple indicator showing:
        - Backups present? (Y/N)
        - Restores tested? (Y/N)
        - Anti-malware on OT workstations? (Y/N)
- For the **hackathon prototype**, actual log ingestion can be simulated:
  - User can “self-report” events like “We experienced a suspicious file encryption” to see which incident checklist to follow.
  - Future extension: integration with basic syslog or endpoint alerts.

---

## 5. User Flow

### 5.1 Onboarding & Factory Profile

1. User signs up with:
   - Name, role (Owner / Plant Manager / IT/OT Engineer).
   - Factory name, size (small / medium), industry type, location (state, city).
2. System creates a **Factory Profile** with:
   - Unique ID.
   - Defaults based on industry (e.g., typical OT architectures).

### 5.2 Interactive OT-Aware Questionnaire

3. User starts the **“Cyber Assessment” wizard**:
   - Step 1: **Factory Overview**
     - Number of production lines, critical processes, approximate employees.
   - Step 2: **Equipment & OT Assets**
     - Select icons for assets: PLCs, SCADA/HMI, CNC machines, robots, sensors.
     - For each, simple questions: “Is it connected to the network? Internet? Cloud?”
   - Step 3: **Network & Connectivity**
     - Do you currently have: Single flat network? Separate IT/OT? Any firewall/vLAN?
     - Is remote access used? How (TeamViewer/AnyDesk, vendor modem, VPN, etc.)?
   - Step 4: **Access & Accounts**
     - Are there shared admin accounts? Do operators share logins?
     - Are vendor accounts used for remote servicing?
   - Step 5: **Backups & Ransomware**
     - What is backed up today (PLC programs, SCADA configs, etc.)?
     - How often and where (external HDD, NAS, cloud drive)?
     - Any past ransomware or major malware event?
   - Step 6: **Current Controls**
     - Anti-virus present on engineering stations?
     - Physical security controls for OT panels?
4. On each step:
   - Tooltips explain terms using simple analogies.
   - “Skip / I don’t know” allowed (handled as high risk in rules).

### 5.3 Blueprint Generation & Review

5. After submission, the **Custom Security Blueprint Generator**:
   - Runs rules engine to:
     - Classify factory into risk level & architecture type.
     - Build recommendations for zoning, access, backups, incident response.
6. User is taken to a **Blueprint Overview page**:
   - Section tabs: “Network Zoning”, “Access Control”, “Backup & Ransomware”, “Incident Response”.
   - At top, display overall **Risk Score** and “Top 5 Actions” (from prioritized checklist).
7. User can:
   - Expand each section to see detailed recommendations and reasoning.
   - Click links to related **Vendor-Neutral Templates**.

### 5.4 Action Planning with Prioritized Checklist

8. User switches to **“Action Checklist”**:
   - See “Must do now” (1–2 weeks), “Next” (1–3 months), “Later” (3–12 months).
9. For each task:
   - User assigns an **Owner** (e.g., “Ramesh – OT Engineer”).
   - Sets target date and marks status.
10. User can:
    - Download a **Task Plan PDF**.
    - Return later to update progress (stored in DB).

### 5.5 Policies & Documentation

11. User clicks **“Policies”**:
    - Select which policies to generate:
      - Access Control, Backup & Recovery, Incident Response, OT Change Management.
12. System populates templates using:
    - Factory name, roles present, identified systems.
13. User downloads **Word/PDF policies** and (in future) can edit inline.

### 5.6 Monitoring & Dashboard

14. User opens **“Dashboard”**:
    - Sees:
      - Risk Score.
      - Main alerts.
      - Ransomware readiness gauge.
      - Progress of checklist (e.g., “10/25 tasks completed”).
15. If an event occurs (e.g., suspected ransomware):
    - User clicks “I’m facing an issue” button.
    - Selects issue type (“Ransomware suspected”, “Unexpected PLC behavior”, etc.).
    - System:
      - Shows relevant **Incident Response Checklist** steps.
      - Reminds them about backups and isolation approaches.

---

## 6. Technical Approach

### 6.1 Architecture Overview

- **Web-based, mobile-friendly** (runs on low-cost laptops/phones in factories).
- **Three main layers**:
  1. Frontend (SPA) – UI for questionnaire, blueprint, dashboard.
  2. Backend API – Rules engine & persistence.
  3. Database – Stores factory profiles, answers, artifacts.

- For hackathon prototype:
  - Focus on **static rules-based engine** (no ML).
  - Simulate “real-time” aspects of dashboard via rule evaluation + user inputs.

### 6.2 Technology Stack (Cost-Effective & Scalable)

- **Frontend**
  - React (or Next.js with React) for SPA.
  - UI Library: Material UI or Tailwind CSS for quick, responsive design.
  - Graph/Visualization: simple icons + CSS; optional React Flow for network diagrams.

- **Backend**
  - Node.js with Express (fast hackathon prototyping, good ecosystem).
  - Alternatively: Python (FastAPI) if team prefers Python; but Node is fine.

- **Database**
  - MongoDB (Atlas free tier) for flexible JSON storage of questionnaire answers and blueprints.
  - Collections:
    - `users`
    - `factories`
    - `assessments`
    - `blueprints`
    - `tasks` (checklist items)
    - `policies`

- **Authentication & Security**
  - Basic email/password with bcrypt hashing.
  - JWT tokens for session management.
  - Role field on user (`owner`, `manager`, `engineer`) for simple RBAC within the app.

- **Hosting**
  - Free/low-cost options:
    - Frontend: Vercel / Netlify.
    - Backend: Render / Railway / Fly.io.
    - DB: MongoDB Atlas free tier.
  - For internal demos in India, can be hosted on a single VPS (e.g., DigitalOcean, AWS Lightsail).

- **PDF/Document Generation**
  - HTML → PDF using libraries like `pdfkit` or `puppeteer` on backend.
  - Policy documents as `.docx` using `docx` npm library.

### 6.3 Core Modules

1. **Questionnaire Engine**
   - JSON-driven question definitions:
     - `id`, `text`, `helpText`, `type`, `options`, `dependencies`.
   - Frontend:
     - Wizard component that reads question sets and applies conditional logic.
   - Backend:
     - Stores responses as structured JSON under `assessments`.

2. **Rules Engine for Blueprint**
   - Hard-coded rule sets for hackathon:
     - Example rule:
       - IF `remoteAccess.enabled == true` AND `remoteAccess.type == "AnyDesk"` AND `vpn == false`
       - THEN add recommendation: “Introduce VPN for vendor remote access and disable direct AnyDesk/TeamViewer on OT machines.”
       - Increase risk score by X.
   - Organized as simple JavaScript functions:
     - `generateNetworkZoning()`
     - `generateAccessControl()`
     - `generateBackupPlan()`
     - `generateIncidentResponse()`
   - Each returns `recommendations[]` and `tasks[]`.

3. **Templates Service**
   - Static JSON/Markdown for vendor-neutral configuration templates.
   - Backend endpoint: `GET /templates/:type` (e.g., `network`, `plc`, `backup`).
   - Frontend: show with copy-to-clipboard and download.

4. **Checklist & Tasks Module**
   - Generated from rules engine:
     - Each task includes `priority`, `category`, `description`, `estimatedEffort`, `costLevel`.
   - CRUD endpoints:
     - `GET /factories/:id/tasks`
     - `PATCH /tasks/:id` to update status, owner, dates.

5. **Policy Generator**
   - Parameterized text templates (e.g., Mustache/Handlebars or simple placeholder replace).
   - Input: factory profile + assessment results (e.g., presence of remote access).
   - Output: HTML then to PDF/DOCX.

6. **Dashboard & Alert Logic**
   - Risk score calculation:
     - Start at **100**, subtract points for:
       - No backups, flat network, shared accounts, open remote access, etc.
     - Map score to level:
       - 0–40 = High, 41–70 = Medium, 71–100 = Low.
   - Alerts:
     - Deterministic rules: if condition, create alert object with `severity`, `message`, `actionLink`.
   - Endpoints:
     - `GET /factories/:id/dashboard` returns:
       - `riskScore`
       - `alerts[]`
       - `taskSummary` (done/in-progress/not-started)
       - `ransomwareReadiness` booleans.

### 6.4 OT/ICS Best Practice Alignment

- Integrate simplified concepts from:
  - **IEC 62443**: zones and conduits, secure remote access, hardening.
  - **NIST CSF**: used to organize blueprint and checklist sections.
- India context:
  - Use cost-conscious options (open-source firewalls, simple NAS, offline backups).
  - Avoid recommending expensive solutions like full-blown SIEM for prototype.

### 6.5 Scalability Considerations

- Multi-tenant design:
  - `factoryId` included in all relevant collections.
- New sectors:
  - Add sector-specific rule sets (e.g., textiles, food, pharma) to adjust recommendations over time.
- Future:
  - API-first design to support mobile apps or integration with local service providers.

---

## 7. Success Metrics

To evaluate if FactoryShield Blueprint is effective (especially in an Indian SME context), track:

### 7.1 Adoption & Engagement

- **# of factories onboarded** and completed initial questionnaire.
- **Questionnaire completion rate** (% who finish after starting).
- Average **time to complete** assessment (aim < 20 minutes).

### 7.2 Action & Implementation

- **% of “Must do now” actions completed** within 1 month of blueprint generation.
- Average **number of security improvements** implemented per factory (tasks marked “Done”).
- **Downloads** of:
  - Configuration templates.
  - Policy documents.
  - Blueprint reports.

### 7.3 Security Posture Improvement

- Average **Risk Score improvement** over time (e.g., baseline vs 3 months later).
- **Increase in backup coverage**:
  - Before vs after: factories with at least one regular OT backup process.
- **Reduction in high-risk alerts** on the dashboard over 3–6 months.

### 7.4 Usability & Affordability

- **User satisfaction** (quick in-app survey; e.g., 1–5 stars):
  - Clarity of recommendations.
  - Ease of use for non-technical staff.
- **Perceived cost–benefit**:
  - % of owners/managers reporting the plan as “affordable” or “very affordable”.
- Measured **drop-off points** in UI to identify confusing steps.

### 7.5 Hackathon Prototype Validation

During the hackathon itself:

- Ability to:
  - Complete an end-to-end flow for a **sample factory** in under 15 minutes.
  - Demonstrate a **clear, actionable checklist** and a **readable blueprint PDF**.
  - Show the **dashboard updating risk score and alerts** when changing key answers (e.g., adding backups, disabling unsafe remote access).
- Feedback from judges/mentors:
  - “Would this be usable by a typical Indian SME factory manager?”
  - “Are the recommendations realistically implementable at low cost?”

---

This plan should enable an AI prototyping tool (e.g., Lovable or Bolt) to generate a working web prototype of FactoryShield Blueprint, with all required features wired together and ready for demonstration in a student hackathon setting.