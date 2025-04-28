
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

export const aiSuggestions: AISuggestion[] = [
  {
    id: "AI-001",
    title: "Power System Risk Mitigation",
    description: "Based on trending data, power system failures are increasing. Consider allocating additional engineering resources to investigate root causes.",
    impact: "high",
    category: "risk",
    actionable: true
  },
  {
    id: "AI-002",
    title: "Propulsion Testing Optimization",
    description: "Current test protocols show redundancy. Streamlining could reduce schedule impact by approximately 14 days.",
    impact: "medium",
    category: "process",
    actionable: true
  },
  {
    id: "AI-003",
    title: "Cross-Functional Team Recommendation",
    description: "Thermal and Avionics risk correlation suggests establishing a joint task force would improve issue resolution efficiency.",
    impact: "medium",
    category: "resource",
    actionable: true
  },
  {
    id: "AI-004",
    title: "Supply Chain Risk Alert",
    description: "Detected potential delays in critical components for structure subsystem based on vendor performance metrics.",
    impact: "high",
    category: "risk",
    actionable: false
  }
];
