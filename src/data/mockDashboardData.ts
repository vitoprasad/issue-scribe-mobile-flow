import { ProgramStatus, RiskItem, SubsystemRisk, RiskTimeData, AISuggestion } from "../types/dashboard";

// Sample data for charts and tables
export const programStatus: ProgramStatus = "yellow"; // Can be "red", "yellow", "green"

export const subsystemRiskData: SubsystemRisk[] = [
  { name: 'Propulsion', high: 12, medium: 8, low: 5 },
  { name: 'Avionics', high: 5, medium: 15, low: 10 },
  { name: 'Structure', high: 8, medium: 10, low: 20 },
  { name: 'Power', high: 15, medium: 5, low: 5 },
  { name: 'Thermal', high: 3, medium: 12, low: 8 },
];

export const topRiskContributors: RiskItem[] = [
  { id: 'R-001', subsystem: 'Power', severity: 'High', impact: 'Critical', trend: 'up' },
  { id: 'R-023', subsystem: 'Propulsion', severity: 'High', impact: 'High', trend: 'up' },
  { id: 'R-015', subsystem: 'Avionics', severity: 'Medium', impact: 'High', trend: 'stable' },
  { id: 'R-034', subsystem: 'Structure', severity: 'High', impact: 'Medium', trend: 'down' },
  { id: 'R-009', subsystem: 'Thermal', severity: 'Medium', impact: 'Medium', trend: 'up' },
];

export const riskTimeData: RiskTimeData[] = [
  { month: 'Jan', high: 25, medium: 40, low: 35 },
  { month: 'Feb', high: 30, medium: 45, low: 25 },
  { month: 'Mar', high: 40, medium: 35, low: 25 },
  { month: 'Apr', high: 35, medium: 30, low: 35 },
  { month: 'May', high: 25, medium: 35, low: 40 },
  { month: 'Jun', high: 30, medium: 30, low: 40 },
];

export const aiSuggestions = [
  {
    id: "ai-rec-001",
    title: "Replace faulty wiring harnesses in propulsion control units",
    description: "Analysis shows that 35% of propulsion failures are due to wiring harness degradation. Implementing a preventative replacement program could reduce downtime by 28%.",
    category: "quality",
    impact: "high",
    actionable: true,
    estimatedSavings: 156000,
    relatedIssues: ["CL-2025-001", "CL-2025-004"],
  },
  {
    id: "ai-rec-002",
    title: "Recalibrate avionics sensor arrays across the fleet",
    description: "Sensor drift detected in 17% of navigational arrays, contributing to inaccurate readings and unnecessary component replacements. Systemwide recalibration recommended.",
    category: "cost",
    impact: "medium",
    actionable: true,
    estimatedSavings: 82500,
    relatedIssues: ["CL-2025-002", "CL-2025-005"],
  },
  {
    id: "ai-rec-003",
    title: "Increase inspection frequency for cooling system components",
    description: "Predictive models indicate early wear patterns in cooling system gaskets. Recommend increasing inspection intervals from 500 to 250 hours to prevent catastrophic failures.",
    category: "safety",
    impact: "high",
    actionable: false,
    relatedIssues: ["CL-2025-004"],
  },
  {
    id: "ai-rec-004",
    title: "Implement batch testing of hydraulic fluid for contamination",
    description: "Data analysis reveals correlation between hydraulic system failures and particulate contamination. Recommend implementing batch testing protocol prior to fluid replacement.",
    category: "maintenance",
    impact: "low",
    actionable: true,
    estimatedSavings: 45000,
    relatedIssues: ["CL-2025-003", "CL-2025-006"],
  }
];
