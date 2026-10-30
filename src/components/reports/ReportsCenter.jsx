import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Compass, 
  ListTodo, 
  ShieldAlert, 
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

export default function ReportsCenter({ factory, assessmentState }) {
  const [activeReportId, setActiveReportId] = useState('exec');
  const [copied, setCopied] = useState(false);

  const { dynamicScore, rawScore, riskLevel, riskColor, deductions, tasks, alerts, assetSummary } = assessmentState;

  const reports = [
    {
      id: 'exec',
      title: 'Executive Cybersecurity Risk Assessment',
      subtitle: 'Board-level summary of plant cyber exposure, downtime financial risks, and compliance benchmarks.',
      icon: FileText
    },
    {
      id: 'blueprint',
      title: 'Technical Security Blueprint & Architecture',
      subtitle: 'IEC 62443 Purdue zone layout, IP addressing, firewall conduits, and controller hardening specifications.',
      icon: Compass
    },
    {
      id: 'roadmap',
      title: 'Prioritized Action Plan & Budget Roadmap',
      subtitle: 'Implementation schedule, cost estimates (in ₹ INR), responsible personnel, and time horizons.',
      icon: ListTodo
    },
    {
      id: 'monitoring',
      title: 'Threat Monitoring & Asset Inventory Audit',
      subtitle: 'Detailed catalog of 8 PLCs, 2 SCADA servers, telemetry alerts, and current hardening statuses.',
      icon: ShieldAlert
    }
  ];

  const generateReportText = () => {
    const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    if (activeReportId === 'exec') {
      return `
# FACTORYSHIELD BLUEPRINT: EXECUTIVE CYBER RISK REPORT
**Organization:** ${factory.name}  
**Location:** ${factory.location}  
**Industry:** ${factory.industry} (${factory.size})  
**Report Date:** ${date}  
**Overall Risk Posture:** ${riskLevel.toUpperCase()} RISK (${dynamicScore}/100)  
**Standard Benchmark:** IEC 62443 / NIST Cybersecurity Framework  

---

### 1. EXECUTIVE SUMMARY
${factory.name} operates 3 high-volume production lines supported by 8 PLCs and 2 SCADA servers. With an acceptable downtime threshold of under 4 hours, cyber incident exposure presents severe financial risks of OEM line-stoppage penalties.

Currently, the factory's overall Cyber Risk Score is **${dynamicScore} out of 100**, placing the plant in the **${riskLevel} Risk** tier.

### 2. PRIMARY SYSTEMIC WEAKNESSES IDENTIFIED
${deductions.map(d => `- **${d.factor}**: Deduction -${d.penalty} pts. *${d.explanation}*`).join('\n')}

### 3. ASSET SECURITY PROPORTIONS
- **Total Operational Assets:** ${assetSummary.total}
- **Hardened / Protected Assets:** ${assetSummary.protected} (${Math.round((assetSummary.protected / assetSummary.total) * 100)}%)
- **Exposed / Vulnerable Assets:** ${assetSummary.unprotected} (${Math.round((assetSummary.unprotected / assetSummary.total) * 100)}%)

### 4. RECOMMENDED CAPITAL EXPENDITURE & IMMEDIATE STEPS
- Immediate (1-2 weeks, Zero Cost): Terminate unattended remote desktop (AnyDesk) on SCADA and change default passwords on all 8 PLCs.
- Medium-Term (₹15,000 - ₹35,000): Implement 3-zone VLAN segmentation and establish rotating 3-2-1 offline backup vaults.

---
*Report Prepared via FactoryShield Blueprint Engine for Indian Manufacturing SMEs.*
`;
    } else if (activeReportId === 'blueprint') {
      return `
# FACTORYSHIELD BLUEPRINT: TECHNICAL SECURITY ARCHITECTURE
**Facility:** ${factory.name} | Pune, Maharashtra  
**Document Ref:** FSP-ARCH-BLUEPRINT-2026 | **Date:** ${date}

---

### 1. ZONE & CONDUIT ARCHITECTURE SPECIFICATION (IEC 62443-3-2)
- **Zone 4/5 (Enterprise IT):** Subnet \`192.168.10.0/24\` (VLAN 10). Corporate ERP, accounting PCs.
- **Zone 3.5 (OT DMZ):** Subnet \`192.168.30.0/24\` (VLAN 30). Central SCADA Server (\`192.168.30.5\`) and Jump Workstation (\`192.168.30.10\`).
- **Zone 1/2 (Cell Control):** Subnet \`192.168.20.0/24\` (VLAN 20). 8 PLCs, 5 HMIs, CNCs and Robotic Cells. NO raw internet routing.

### 2. PERIMETER CONDUIT FILTERING RULES
- Block all incoming WAN ports from public internet.
- Restrict DMZ-to-OT routing strictly to TCP port 102 (Siemens S7Comm) and TCP port 502 (Modbus-TCP).
- Drop all lateral traffic from Enterprise VLAN 10 attempting to contact Industrial VLAN 20 directly.

### 3. CONTROLLER HARDENING MANDATES
- Physical Mode Keyswitch: Turned to 'RUN' mode on all 8 PLCs; keys removed and stored in management safe.
- Disable embedded web server and unauthenticated FTP on controllers.
- Bind write permissions to designated engineering workstation static IP.

### 4. 3-2-1 BACKUP & COLD VAULT PROTOCOL
- 3 copies of PLC ladder logic (.zap16) and SCADA SQL tags.
- 2 storage media types (Local SSD vault + external BitLocker USB).
- 1 offline air-gapped copy locked inside the Plant Manager's office safe.
`;
    } else if (activeReportId === 'roadmap') {
      return `
# FACTORYSHIELD BLUEPRINT: PRIORITIZED ACTION PLAN & BUDGET
**Organization:** ${factory.name} | Pune, Maharashtra  
**Report Date:** ${date}  

---

### PHASE 1: IMMEDIATE ACTIONS (1–2 WEEKS) - LOW/ZERO COST
${(tasks.immediate || []).map(t => `
- **${t.title}** [${t.status.toUpperCase()}]
  * Estimated Cost: ${t.cost} | Effort: ${t.effort}
  * Owner: ${t.owner} | Priority: ${t.priority}
  * Scope: ${t.description}
`).join('\n')}

### PHASE 2: MEDIUM-TERM ACTIONS (1–3 MONTHS)
${(tasks.medium || []).map(t => `
- **${t.title}** [${t.status.toUpperCase()}]
  * Estimated Cost: ${t.cost} | Effort: ${t.effort}
  * Owner: ${t.owner} | Priority: ${t.priority}
  * Scope: ${t.description}
`).join('\n')}

### PHASE 3: LONG-TERM ACTIONS (3–12 MONTHS)
${(tasks.longTerm || []).map(t => `
- **${t.title}** [${t.status.toUpperCase()}]
  * Estimated Cost: ${t.cost} | Effort: ${t.effort}
  * Owner: ${t.owner} | Priority: ${t.priority}
  * Scope: ${t.description}
`).join('\n')}
`;
    } else {
      return `
# FACTORYSHIELD BLUEPRINT: OT THREAT TELEMETRY & ASSET AUDIT
**Organization:** ${factory.name} | **Audit Date:** ${date}  

---

### 1. ACTIVE CYBERSECURITY ALERTS SUMMARY
${alerts.map(a => `
- **[${a.severity}] ${a.title}**
  * Target Asset: ${a.asset}
  * Status: ${a.status}
  * Observation: ${a.description}
  * Recommendation: ${a.recommendation}
`).join('\n')}

### 2. REGISTERED OT CONTROLLER INVENTORY
- Siemens S7-1200 CPU 1214C (Line 1: 192.168.1.10) - Firmware v4.2
- Siemens S7-1200 CPU 1214C (Line 1: 192.168.1.11) - Firmware v4.2
- Siemens S7-1500 CPU 1515-2 (Line 1: 192.168.1.12) - Firmware v2.8
- Schneider Modicon M221 (Line 2: 192.168.1.20) - Firmware v1.4
- Schneider Modicon M241 (Line 2: 192.168.1.21) - Firmware v2.1
- Rockwell Micro850 (Line 2: 192.168.1.22) - Firmware v12
- Delta DVP-ES2 (Line 3: 192.168.1.30) - Firmware v1.0
- Siemens S7-1200 CPU 1212C (Line 3: 192.168.1.31) - Firmware v4.0

### 3. SCADA & SUPERVISORY STATIONS
- WinCC V7.5 Central Server (192.168.1.5) - Windows 10 Pro
- Wonderware InTouch Historian (192.168.1.6) - Windows 7 Embedded
`;
    }
  };

  const reportText = generateReportText();

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([reportText], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${factory.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${activeReportId}_report.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
      {/* Header */}
      <div className="cyber-card" style={{ marginBottom: '24px', padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="cyber-tag" style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#FBBF24', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
            Compliance & Executive Reports
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
            Board, Auditor & Insurance Ready
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginTop: '8px' }}>
          Cybersecurity Reports & Export Center
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '4px' }}>
          Generate formal documentation for plant management, supply chain partners, and cyber insurance underwriters.
        </p>
      </div>

      {/* Grid: Selector + Document View */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left: Report Types */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {reports.map(rep => {
            const Icon = rep.icon;
            const isSelected = activeReportId === rep.id;
            return (
              <div
                key={rep.id}
                onClick={() => setActiveReportId(rep.id)}
                className="cyber-card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(0, 240, 255, 0.12)' : 'var(--bg-card)',
                  border: isSelected ? '1px solid #00F0FF' : '1px solid var(--border-subtle)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} color={isSelected ? '#00F0FF' : '#94A3B8'} />
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {rep.title}
                  </div>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.4 }}>
                  {rep.subtitle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Document Viewer */}
        <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Action Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '16px',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div>
              <span className="badge badge-cyan">Formatted Report</span>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginTop: '4px' }}>
                {reports.find(r => r.id === activeReportId)?.title}
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleCopy}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="btn btn-outline-cyan"
                style={{ padding: '6px 14px', fontSize: '0.75rem' }}
              >
                <Printer size={14} />
                <span>Print / Vector PDF</span>
              </button>

              <button
                onClick={handleDownload}
                className="btn btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.75rem' }}
              >
                <Download size={14} />
                <span>Download .MD</span>
              </button>
            </div>
          </div>

          {/* Formatted Content Body */}
          <div style={{
            background: '#070d1e',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '28px',
            fontFamily: 'var(--font-sans)',
            color: '#E2E8F0',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            maxHeight: '620px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {reportText}
          </div>
        </div>
      </div>
    </div>
  );
}
