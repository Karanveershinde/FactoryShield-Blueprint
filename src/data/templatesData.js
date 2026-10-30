// Vendor-Neutral Configuration Templates Library for Indian SME Factories
// Designed to be practical, low-cost/open-source, and actionable

export const TEMPLATE_CATEGORIES = [
  'All',
  'Network Security',
  'Firewall Configuration',
  'PLC Security',
  'SCADA/HMI Security',
  'Access Management',
  'Backup Configuration',
  'Remote Access Security'
];

export const CONFIG_TEMPLATES = [
  {
    id: 'tpl-net-01',
    category: 'Network Security',
    name: 'SME Factory 3-Zone VLAN Segmentation Schema',
    difficulty: 'Intermediate',
    estimatedTime: '2-4 Hours',
    benefits: 'Prevents office malware & crypto-ransomware from pivoting directly onto PLC networks.',
    description: 'A vendor-neutral subnetting scheme dividing a single flat plant into Enterprise IT, OT DMZ, and Industrial Control Zones using standard 802.1Q tags.',
    warning: 'IMPORTANT: Test changes on a spare switch or during planned plant maintenance shift. Verify PLC ping response before applying full trunk isolation.',
    content: `# ==============================================================================
# FactoryShield Blueprint: SME Factory 3-Zone VLAN Architecture
# Standards Alignment: IEC 62443-3-2 (Zones and Conduits) / Purdue Model
# Suitable for: TP-Link Omada, Cisco SMB, MikroTik, or Allied Telesis switches
# ==============================================================================

# ZONE 1: Enterprise Office IT (VLAN 10)
# Subnet: 192.168.10.0/24
# Gateway: 192.168.10.1
# Scope: ERP PCs, Accountant Laptops, Office Wi-Fi, Office Printers
# Internet Policy: Direct outbound web access (HTTP/HTTPS) allowed via UTM firewall.
# Inbound OT Policy: STRICTLY DENIED (Cannot initiate connection to OT VLAN 20).

# ZONE 2: OT Industrial Control Network (VLAN 20)
# Subnet: 192.168.20.0/24
# Gateway: 192.168.20.1
# Scope: PLCs (Siemens, Schneider, Delta), CNCs, Robotic Arms, HMIs
# IP Allocation Table:
#   192.168.20.10 - 192.168.20.29 : Line 1 PLCs & Drives
#   192.168.20.30 - 192.168.20.49 : Line 2 Welding Robots & PLCs
#   192.168.20.50 - 192.168.20.69 : Line 3 Assembly & Stamping
#   192.168.20.70 - 192.168.20.89 : Operator HMIs & Touchscreens
# Internet Policy: STRICTLY BLOCKED (0.0.0.0/0 blocked at firewall).
# Inter-VLAN Policy: Only accepts connections from Industrial DMZ (VLAN 30).

# ZONE 3: Industrial Demilitarized Zone / OT DMZ (VLAN 30)
# Subnet: 192.168.30.0/24
# Gateway: 192.168.30.1
# Scope: SCADA Central Server, Process Historian, Engineering Jump Box
# IP Allocation Table:
#   192.168.30.5  : Primary SCADA Runtime Server (WinCC / InTouch / Ignition)
#   192.168.30.6  : Process Data Historian / SQL Database
#   192.168.30.10 : Engineering Jump Workstation (MFA-controlled)
# Policy: Acts as the sole conduit bridging IT and OT.`
  },
  {
    id: 'tpl-fw-01',
    category: 'Firewall Configuration',
    name: 'Stateful Boundary Firewall & Conduit Filtering Rules',
    difficulty: 'Intermediate',
    estimatedTime: '1-2 Hours',
    benefits: 'Drops all unsolicited lateral traffic between office computers and industrial controllers.',
    description: 'Vendor-neutral iptables / pfSense / OPNsense rules enforcing the conduit concept between Enterprise Zone and Industrial OT Zone.',
    warning: 'Always backup existing firewall XML/configuration before applying rule set. Keep local serial console access available.',
    content: `# ==============================================================================
# FactoryShield Blueprint: Boundary Firewall Conduit Rules (pfSense / iptables)
# Objective: Block lateral IT-to-OT movement while enabling SCADA data collection
# ==============================================================================

# Flush existing temporary test chains
iptables -F FORWARD

# Rule 1: Allow established and related connections (Stateful tracking)
iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Rule 2: Allow Central SCADA Server (VLAN 30) to poll PLCs (VLAN 20) on specific OT ports:
# Port 102 (Siemens S7Comm)
iptables -A FORWARD -s 192.168.30.5 -d 192.168.20.0/24 -p tcp --dport 102 -m comment --comment "SCADA to Siemens PLCs" -j ACCEPT

# Port 502 (Modbus-TCP)
iptables -A FORWARD -s 192.168.30.5 -d 192.168.20.0/24 -p tcp --dport 502 -m comment --comment "SCADA to Modbus PLCs" -j ACCEPT

# Port 44818 & 2222 (EtherNet/IP & CIP)
iptables -A FORWARD -s 192.168.30.5 -d 192.168.20.0/24 -p tcp --dport 44818 -j ACCEPT
iptables -A FORWARD -s 192.168.30.5 -d 192.168.20.0/24 -p udp --dport 2222 -j ACCEPT

# Rule 3: Allow Authorized Engineering Station to upload logic during authorized maintenance
iptables -A FORWARD -s 192.168.30.10 -d 192.168.20.0/24 -p tcp -m multiport --dports 102,502,44818 -j ACCEPT

# Rule 4: DROP and LOG all direct communication attempts from Office IT (VLAN 10) to OT (VLAN 20)
iptables -A FORWARD -s 192.168.10.0/24 -d 192.168.20.0/24 -j LOG --log-prefix "[FACTORYSHIELD OT-BLOCK]: " --log-level 4
iptables -A FORWARD -s 192.168.10.0/24 -d 192.168.20.0/24 -j DROP

# Rule 5: DROP all outbound internet requests originating from OT PLCs/Sensors (VLAN 20)
iptables -A FORWARD -s 192.168.20.0/24 -o wan0 -j DROP

# Default drop policy
iptables -P FORWARD DROP`
  },
  {
    id: 'tpl-plc-01',
    category: 'PLC Security',
    name: 'Industrial Controller (PLC) Hardening & Protection Checklist',
    difficulty: 'Beginner to Intermediate',
    estimatedTime: '30 Mins per Controller',
    benefits: 'Prevents unauthorized logic overwrites, setpoint sabotage, and remote unauthorized stop commands.',
    description: 'Practical 7-step vendor-neutral hardening sequence applicable to Siemens S7, Schneider Modicon, Rockwell, and Delta PLCs.',
    warning: 'Do not modify controller keyswitch while machine is executing high-speed automated cycle. Schedule during lunch or shift transition.',
    content: `# ==============================================================================
# FactoryShield Blueprint: PLC Hardware & Firmware Hardening Checklist
# ==============================================================================

Step 1: PHYSICAL KEYSWITCH ENFORCEMENT
- Turn the hardware mode selector keyswitch from 'MRES' or 'REMOTE RUN' to 'RUN'.
- Removing the physical key prevents remote software from toggling the PLC into 'STOP' mode over the network.
- Store the physical keys in the plant manager's locked key cabinet.

Step 2: DISABLE EMBEDDED WEB SERVERS & UNENCRYPTED SERVICES
- In controller hardware configuration (e.g. TIA Portal / SoMachine / Studio 5000):
  * Uncheck 'Activate Web Server on this module'.
  * Disable unauthenticated FTP server interfaces.
  * Disable Telnet or SNMP v1/v2c (use SNMPv3 with auth-priv if required for NMS).

Step 3: CONFIGURE ACCESS PROTECTION LEVELS
- Level 1: No Protection (DEFAULT - INSECURE) -> CHANGE IMMEDIATELY.
- Level 2: Read Protection (Passwords required for HMI read tags).
- Level 3: Write Protection (Operator can view values; password required to write recipe setpoints).
- Level 4: Complete Protection (Password required for both HMI access and ladder logic uploads).
* Recommendation: Apply Level 3 minimum on all shop floor PLCs.

Step 4: BIND PLC PROGRAMMING TO AUTHORIZED MAC/IP ADDRESS
- Configure connection security table: restrict write access to the specific static IP address of the authorized engineering station (192.168.30.10).

Step 5: FIRMWARE INTEGRITY VERIFICATION
- Check current firmware build against manufacturer security advisories (CERT-In / CISA ICS-Advisories).
- Update to vendor-recommended long-term stable (LTS) release patch level.`
  },
  {
    id: 'tpl-scada-01',
    category: 'SCADA/HMI Security',
    name: 'Windows 10/11 Industrial SCADA & Workstation OS Hardening Guide',
    difficulty: 'Intermediate',
    estimatedTime: '1 Hour',
    benefits: 'Eliminates USB-borne malware vectors, disables auto-execution, and mitigates lateral pass-the-hash attacks.',
    description: 'Group Policy script and registry parameters to harden Windows operating systems running SCADA runtimes and HMI panels.',
    warning: 'Apply in a staging environment first to verify that SCADA graphic runtime restarts automatically without operator intervention.',
    content: `# ==============================================================================
# FactoryShield Blueprint: SCADA Workstation PowerShell Hardening Script
# Target: Windows 10/11 Pro & LTSC Industrial PCs
# Run as Administrator in PowerShell
# ==============================================================================

# 1. Disable USB Mass Storage AutoRun & AutoPlay (Eliminates Stuxnet-style USB worms)
Write-Output "Hardening USB and Storage policies..."
Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer" -Name "NoDriveTypeAutoRun" -Value 255 -Type DWord
Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Explorer" -Name "NoAutoplayfornonVolume" -Value 1 -Type DWord

# 2. Disable Legacy Insecure Protocols (SMBv1, LLMNR, NetBIOS)
Write-Output "Disabling legacy SMBv1 and NetBIOS broadcast protocols..."
Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart
Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\DNSClient" -Name "EnableMulticast" -Value 0 -Type DWord

# 3. Disable Remote Desktop without Network Level Authentication (NLA)
Write-Output "Enforcing NLA on Remote Desktop..."
Set-ItemProperty -Path "HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server\\WinStations\\RDP-Tcp" -Name "UserAuthentication" -Value 1 -Type DWord

# 4. Configure Microsoft Defender Scheduled Off-Peak Scan Exclusions
# Prevents disk latency lockups on active SCADA circular database archives
Write-Output "Configuring SCADA folder exclusions..."
Add-MpPreference -ExclusionPath "C:\\SCADA\\DataLogs"
Add-MpPreference -ExclusionPath "C:\\Historian\\Archives"
Add-MpPreference -ExclusionProcess "WinCC.exe"
Add-MpPreference -ExclusionProcess "InTouch.exe"

# 5. Enable Local Audit Logging for Account Logons & Privilege Use
auditpol /set /subcategory:"Logon" /success:enable /failure:enable
auditpol /set /subcategory:"Process Creation" /success:enable

Write-Output "[SUCCESS] FactoryShield SCADA Hardening Complete. Restart system to enforce."`
  },
  {
    id: 'tpl-rbac-01',
    category: 'Access Management',
    name: 'Factory OT Role-Based Access Control (RBAC) Matrix',
    difficulty: 'Beginner',
    estimatedTime: '45 Mins',
    benefits: 'Eliminates shared passwords, provides distinct accountability, and protects critical safety interlocks.',
    description: 'A structured, vendor-neutral permissions matrix mapping SME plant roles to discrete authorizations across PLCs, HMIs, and SCADA.',
    warning: 'Review user assignments with shift production managers to ensure emergency stop and normal start/stop actions remain frictionless.',
    content: `# ==============================================================================
# FactoryShield Blueprint: Industrial RBAC Authorization Matrix
# ==============================================================================

ROLE 1: LINE OPERATOR / HELPER
- Device Scope: Machine HMI Touchscreens
- Allowed Actions:
  * View real-time line telemetry, cycle time, output counter.
  * Start, pause, resume standard production batch.
  * Acknowledge low/medium process alarms (temperature, level).
- Prohibited Actions:
  * Modifying PID loop parameters or motor speed limits.
  * Connecting USB storage or accessing underlying Windows OS.
  * Accessing network settings or PLC diagnostics.

ROLE 2: SHIFT SUPERVISOR / PRODUCTION ENGINEER
- Device Scope: Machine HMIs, SCADA Supervisory Displays
- Allowed Actions:
  * Select and load approved master recipes from recipe library.
  * Modify production target thresholds within pre-defined safe envelopes (±5%).
  * Acknowledge high-priority safety alarms.
- Prohibited Actions:
  * Modifying PLC ladder logic or flashing controller firmware.
  * Altering network routing, firewall rules, or user account databases.

ROLE 3: AUTOMATION / OT ENGINEER
- Device Scope: Engineering Workstation, PLCs, Drives, SCADA Servers
- Allowed Actions:
  * Full access to PLC programming software (TIA Portal, Studio 5000).
  * Upload/download verified program logic under Change Management ticket.
  * Perform and verify disaster recovery backups.
  * Configure I/O mapping and drive communication parameters.

ROLE 4: EXTERNAL MACHINE OEM / VENDOR
- Device Scope: Dedicated Machine Controller only
- Allowed Actions:
  * Temporary supervised remote access via Jump Host.
  * Read diagnostics and error logs with supervisor present.
- Requirement: Account expires automatically after 4 hours. No permanent passwords.`
  },
  {
    id: 'tpl-bkp-01',
    category: 'Backup Configuration',
    name: 'Industrial 3-2-1 Automated OT Backup & Retention Script',
    difficulty: 'Intermediate',
    estimatedTime: '1-2 Hours',
    benefits: 'Guarantees that an encrypted ransomware infection on plant computers can be restored within 4 hours.',
    description: 'Automated PowerShell script executing local hashing, timestamped compression, network staging, and air-gapped export reminders.',
    warning: 'Ensure backup destination has sufficient disk storage and that external offline USB drives are formatted with BitLocker encryption.',
    content: `# ==============================================================================
# FactoryShield Blueprint: Automated OT Project & Recipe Backup Script
# Strategy: 3 Copies | 2 Media Types | 1 Offline Air-Gapped Drive
# ==============================================================================

param (
    [string]$SourceDirectory = "C:\\AutomationProjects",
    [string]$LocalBackupVault = "D:\\FactoryShield_Backups",
    [string]$AirGapDriveLetter = "E:"
)

$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupArchiveName = "MahaPrecision_OT_Backup_$Timestamp.zip"
$TargetZip = Join-Path -Path $LocalBackupVault -ChildPath $BackupArchiveName

Write-Host ">>> Starting FactoryShield Industrial Backup..." -ForegroundColor Cyan

# 1. Create Local Backup Directory if missing
if (!(Test-Path $LocalBackupVault)) {
    New-Item -ItemType Directory -Path $LocalBackupVault -Force
}

# 2. Compress PLC logic, HMI projects, and SCADA SQL tags
Write-Host "Compressing active engineering projects from $SourceDirectory..."
Compress-Archive -Path "$SourceDirectory\\*" -DestinationPath $TargetZip -CompressionLevel Optimal

# 3. Generate SHA256 integrity hash
$FileHash = (Get-FileHash -Path $TargetZip -Algorithm SHA256).Hash
$FileHash | Out-File -FilePath "$TargetZip.sha256"
Write-Host "Integrity Hash (SHA256): $FileHash" -ForegroundColor Green

# 4. Check for Air-Gapped Drive (Rotating USB drive for offline vault)
if (Test-Path $AirGapDriveLetter) {
    Write-Host "Offline Air-Gapped Drive detected on $AirGapDriveLetter. Copying cold archive..." -ForegroundColor Yellow
    Copy-Item -Path $TargetZip -Destination "$AirGapDriveLetter\\ColdVault\\" -Force
    Copy-Item -Path "$TargetZip.sha256" -Destination "$AirGapDriveLetter\\ColdVault\\" -Force
    Write-Host "[SUCCESS] Offline Air-Gapped Backup stored successfully!" -ForegroundColor Green
    Write-Host "ACTION REQUIRED: Unplug $AirGapDriveLetter and store in Plant Manager's fireproof safe!" -ForegroundColor Magenta
} else {
    Write-Warning "No Offline Air-Gapped USB drive detected on $AirGapDriveLetter!"
    Write-Warning "Connect weekly offline backup drive to fulfill IEC 62443 cyber-resilience compliance."
}

# 5. Prune local archives older than 60 days to prevent disk exhaustion
Get-ChildItem -Path $LocalBackupVault -Filter "*.zip" | Where-Object { $_.CreationTime -lt (Get-Date).AddDays(-60) } | Remove-Item -Force
Write-Host "Local backup retention cleanup complete."`
  },
  {
    id: 'tpl-rmt-01',
    category: 'Remote Access Security',
    name: 'Secure WireGuard / OpenVPN Jump Host Architecture for Vendors',
    difficulty: 'Advanced',
    estimatedTime: '2-3 Hours',
    benefits: 'Terminates dangerous unauthenticated AnyDesk/TeamViewer backdoor access across Indian manufacturing lines.',
    description: 'Step-by-step configuration of a secure, dual-homed Linux / pfSense jump host requiring MFA and supervisor session activation.',
    warning: 'Deactivate third-party software licenses (AnyDesk unattended mode) immediately upon establishing this secure gateway.',
    content: `# ==============================================================================
# FactoryShield Blueprint: Secure Vendor Remote Access Gateway
# Solution: OpenVPN / WireGuard on pfSense + Time-Limited Jump Host
# ==============================================================================

ARCHITECTURE SPECIFICATION:
[Vendor Engineer in Germany/Japan/Delhi]
               |
         (Public Internet)
               |
       [Hardware Firewall WAN]
               | (Port 51820 UDP - WireGuard with Public Key Exchange + MFA)
      [DMZ Jump Host: 192.168.30.10]
               | (Screen recorded, keystroke logged, session auto-terminates after 2h)
       [Target PLC: 192.168.20.12]

STEP 1: UNINSTALL STANDALONE DESKTOP TOOLS
- Remove TeamViewer / AnyDesk / UltraViewer services running as persistent background Windows services:
  Command: sc stop AnyDesk; sc config AnyDesk start= disabled

STEP 2: CONFIGURE WIREGUARD VPN PROFILE (wg0.conf)
[Interface]
Address = 10.100.0.1/24
ListenPort = 51820
PrivateKey = <FACTORY_GATEWAY_PRIVATE_KEY>
PostUp = iptables -A FORWARD -i wg0 -o dmz0 -j ACCEPT
PostDown = iptables -D FORWARD -i wg0 -o dmz0 -j ACCEPT

[Peer] # Machine Vendor Remote Engineer
PublicKey = <VENDOR_PUBLIC_KEY>
AllowedIPs = 10.100.0.2/32
# Session allowed only between 09:00 - 18:00 IST on pre-approved maintenance windows.

STEP 3: SUPERVISED DUAL-CONTROL WORKFLOW
1. Vendor submits remote maintenance request ticket with expected work scope.
2. Plant Manager logs into FactoryShield dashboard and enables the vendor peer for 2 hours.
3. Vendor connects via WireGuard into Jump Host (RDP strictly confined to Jump Host).
4. Jump Host connects to target machine PLC programming port.
5. Session automatically drops after 2 hours; audit video log archived.`
  }
];
