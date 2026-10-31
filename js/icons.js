/**
 * icons.js — Official-Style Vector Logos for Microsoft Certifications (AZ-900, DP-900, DP-600, DP-700) & MS Learn Topics
 */

export const CERT_BADGE_SVGS = {
  ALL: `
    <svg viewBox="0 0 48 48" width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="18" height="18" rx="2" fill="#F25022"/>
      <rect x="26" y="4" width="18" height="18" rx="2" fill="#7FBA00"/>
      <rect x="4" y="26" width="18" height="18" rx="2" fill="#00A4EF"/>
      <rect x="26" y="26" width="18" height="18" rx="2" fill="#FFB900"/>
    </svg>
  `,
  'AZ-900': `
    <svg viewBox="0 0 56 64" width="42" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 2L52 12V31C52 46.5 41.8 57.8 28 62C14.2 57.8 4 46.5 4 31V12L28 2Z" fill="#1E3A8A" stroke="#60A5FA" stroke-width="2.5"/>
      <path d="M28 7L47 15V30.5C47 43 38.8 52.5 28 56.2C17.2 52.5 9 43 9 30.5V15L28 7Z" fill="#2563EB"/>
      <polygon points="28,13 30.2,17.5 35,18.2 31.5,21.6 32.3,26.4 28,24.1 23.7,26.4 24.5,21.6 21,18.2 25.8,17.5" fill="#FFB900"/>
      <rect x="12" y="32" width="32" height="13" rx="3" fill="#0F172A"/>
      <text x="28" y="41.5" text-anchor="middle" fill="#60A5FA" font-size="8.5" font-family="Segoe UI, sans-serif" font-weight="800">AZ-900</text>
    </svg>
  `,
  'DP-900': `
    <svg viewBox="0 0 56 64" width="42" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 2L52 12V31C52 46.5 41.8 57.8 28 62C14.2 57.8 4 46.5 4 31V12L28 2Z" fill="#005A9E" stroke="#38BDF8" stroke-width="2.5"/>
      <path d="M28 7L47 15V30.5C47 43 38.8 52.5 28 56.2C17.2 52.5 9 43 9 30.5V15L28 7Z" fill="#0078D4"/>
      <polygon points="28,13 30.2,17.5 35,18.2 31.5,21.6 32.3,26.4 28,24.1 23.7,26.4 24.5,21.6 21,18.2 25.8,17.5" fill="#FFB900"/>
      <rect x="12" y="32" width="32" height="13" rx="3" fill="#0A192F"/>
      <text x="28" y="41.5" text-anchor="middle" fill="#38BDF8" font-size="8.5" font-family="Segoe UI, sans-serif" font-weight="800">DP-900</text>
    </svg>
  `,
  'DP-600': `
    <svg viewBox="0 0 56 64" width="42" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 2L52 12V31C52 46.5 41.8 57.8 28 62C14.2 57.8 4 46.5 4 31V12L28 2Z" fill="#0B5345" stroke="#4ADE80" stroke-width="2.5"/>
      <path d="M28 7L47 15V30.5C47 43 38.8 52.5 28 56.2C17.2 52.5 9 43 9 30.5V15L28 7Z" fill="#107C41"/>
      <polygon points="21,14 22.6,17.3 26.2,17.8 23.6,20.3 24.2,23.9 21,22.2 17.8,23.9 18.4,20.3 15.8,17.8 19.4,17.3" fill="#FFB900"/>
      <polygon points="35,14 36.6,17.3 40.2,17.8 37.6,20.3 38.2,23.9 35,22.2 31.8,23.9 32.4,20.3 29.8,17.8 33.4,17.3" fill="#FFB900"/>
      <rect x="12" y="32" width="32" height="13" rx="3" fill="#091E16"/>
      <text x="28" y="41.5" text-anchor="middle" fill="#4ADE80" font-size="8.5" font-family="Segoe UI, sans-serif" font-weight="800">DP-600</text>
    </svg>
  `,
  'DP-700': `
    <svg viewBox="0 0 56 64" width="42" height="48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 2L52 12V31C52 46.5 41.8 57.8 28 62C14.2 57.8 4 46.5 4 31V12L28 2Z" fill="#78350F" stroke="#FBBF24" stroke-width="2.5"/>
      <path d="M28 7L47 15V30.5C47 43 38.8 52.5 28 56.2C17.2 52.5 9 43 9 30.5V15L28 7Z" fill="#B45309"/>
      <polygon points="21,14 22.6,17.3 26.2,17.8 23.6,20.3 24.2,23.9 21,22.2 17.8,23.9 18.4,20.3 15.8,17.8 19.4,17.3" fill="#FDE68A"/>
      <polygon points="35,14 36.6,17.3 40.2,17.8 37.6,20.3 38.2,23.9 35,22.2 31.8,23.9 32.4,20.3 29.8,17.8 33.4,17.3" fill="#FDE68A"/>
      <rect x="12" y="32" width="32" height="13" rx="3" fill="#271206"/>
      <text x="28" y="41.5" text-anchor="middle" fill="#FBBF24" font-size="8.5" font-family="Segoe UI, sans-serif" font-weight="800">DP-700</text>
    </svg>
  `
};

export const TOPIC_ICON_METADATA = {
  compute: {
    label: 'Azure Compute, VMs, Containers & Cloud Concepts',
    color: '#60a5fa',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><rect x="4" y="4" width="16" height="12" rx="2" fill="#1D4ED8" stroke="#93C5FD" stroke-width="1.5"/><path d="M8 20h8M12 16v4" stroke="#93C5FD" stroke-width="1.6" stroke-linecap="round"/></svg>`
  },
  network: {
    label: 'Azure Networking (VNet, VPN, ExpressRoute & DNS)',
    color: '#38bdf8',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><circle cx="12" cy="12" r="8" fill="#0369A1" stroke="#7DD3FC" stroke-width="1.5"/><path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16" stroke="#E0F2FE" stroke-width="1.3"/></svg>`
  },
  governance: {
    label: 'Azure Governance, Costes, Policy, ARM/Bicep & Monitor',
    color: '#c084fc',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M12 3L3 8l9 5 9-5-9-5z" fill="#7E22CE" stroke="#D8B4FE" stroke-width="1.5"/><path d="M3 13l9 5 9-5M3 17l9 5 9-5" stroke="#D8B4FE" stroke-width="1.5" stroke-linecap="round"/></svg>`
  },
  fabric: {
    label: 'Microsoft Fabric & Gobernanza',
    color: '#2dd4bf',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M5 4h14l-3 6H8v4h7l-2.5 6H5V4z" fill="#107C41" stroke="#4ADE80" stroke-width="1.5"/></svg>`
  },
  onelake: {
    label: 'OneLake & Shortcuts',
    color: '#38bdf8',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M12 2L21 8.5V15.5L12 22L3 15.5V8.5L12 2Z" fill="#0284C7" stroke="#7DD3FC" stroke-width="1.5"/><path d="M6 13c2-1.5 4-1.5 6 0s4 1.5 6 0" stroke="#FFF" stroke-width="1.8" stroke-linecap="round"/></svg>`
  },
  lakehouse: {
    label: 'Fabric Lakehouse & Delta',
    color: '#34d399',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M3 11L12 3l9 8v9H3v-9z" fill="#059669" stroke="#6EE7B7" stroke-width="1.5"/><path d="M5 17c2-1 4-1 6 0s4 1 6 0" stroke="#FFF" stroke-width="1.6" stroke-linecap="round"/></svg>`
  },
  warehouse: {
    label: 'Fabric Data Warehouse (T-SQL)',
    color: '#60a5fa',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><ellipse cx="12" cy="5" rx="8" ry="3" fill="#2563EB" stroke="#93C5FD" stroke-width="1.5"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#93C5FD" stroke-width="1.5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="#93C5FD" stroke-width="1.5"/></svg>`
  },
  powerbi: {
    label: 'Power BI, Modelos Semánticos & DAX',
    color: '#fbbf24',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><rect x="4" y="12" width="4" height="8" rx="1" fill="#D97706"/><rect x="10" y="8" width="4" height="12" rx="1" fill="#F59E0B"/><rect x="16" y="4" width="4" height="16" rx="1" fill="#FBBF24"/></svg>`
  },
  kql: {
    label: 'Real-Time Intelligence, Eventhouse & KQL',
    color: '#f472b6',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M2 12h4l3-7 5 14 3-7h5" stroke="#F472B6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  spark: {
    label: 'Apache Spark & PySpark Notebooks',
    color: '#fb923c',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="#EA580C" stroke="#FDBA74" stroke-width="1.4" stroke-linejoin="round"/></svg>`
  },
  pipeline: {
    label: 'Data Factory Pipelines & Dataflow Gen2',
    color: '#a78bfa',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><circle cx="5" cy="7" r="3" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1.5"/><circle cx="19" cy="7" r="3" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1.5"/><circle cx="12" cy="18" r="3" fill="#7C3AED" stroke="#C4B5FD" stroke-width="1.5"/><path d="M8 7h8M6.5 9.5L10.5 15.5M17.5 9.5L13.5 15.5" stroke="#C4B5FD" stroke-width="1.5"/></svg>`
  },
  sql: {
    label: 'Azure SQL & Datos Relacionales',
    color: '#38bdf8',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><ellipse cx="12" cy="6" rx="7" ry="3" fill="#0078D4" stroke="#7DD3FC" stroke-width="1.5"/><path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" fill="#005A9E" stroke="#7DD3FC" stroke-width="1.5"/><text x="12" y="15" text-anchor="middle" fill="#FFF" font-size="6.5" font-weight="800" font-family="Segoe UI">SQL</text></svg>`
  },
  cosmos: {
    label: 'Azure Storage & Cosmos DB NoSQL',
    color: '#818cf8',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><circle cx="12" cy="12" r="5" fill="#4F46E5" stroke="#A5B4FC" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)" stroke="#A5B4FC" stroke-width="1.5"/></svg>`
  },
  security: {
    label: 'Identidad (Entra ID), RBAC, Seguridad & Purview',
    color: '#f87171',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M12 2L19 5.5V11c0 5-3.2 9.2-7 11-3.8-1.8-7-6-7-11V5.5L12 2z" fill="#B91C1C" stroke="#FCA5A5" stroke-width="1.5"/><circle cx="12" cy="11" r="2" fill="#FFF"/></svg>`
  }
};

export function getTopicIconSvg(iconKey) {
  return (TOPIC_ICON_METADATA[iconKey] || TOPIC_ICON_METADATA.fabric).svg;
}

export function getTopicMeta(iconKey) {
  return TOPIC_ICON_METADATA[iconKey] || TOPIC_ICON_METADATA.fabric;
}
