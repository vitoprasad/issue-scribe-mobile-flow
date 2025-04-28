
export type ProgramStatus = "red" | "yellow" | "green";

export interface RiskItem {
  id: string;
  subsystem: string;
  severity: string;
  impact: string;
  trend: string;
}

export interface SubsystemRisk {
  name: string;
  high: number;
  medium: number;
  low: number;
}

export interface RiskTimeData {
  month: string;
  high: number;
  medium: number;
  low: number;
}

export interface AISuggestion {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "risk" | "process" | "resource";
  actionable: boolean;
}

export interface ExecutiveFeedback {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  category: "directive" | "inquiry" | "notification";
  createdAt: string;
  status: "new" | "in-progress" | "completed";
  assignee?: string;
}

export const chartConfig = {
  high: {
    label: 'High Risk',
    color: '#ea384c',
  },
  medium: {
    label: 'Medium Risk',
    color: '#FFC107',
  },
  low: {
    label: 'Low Risk',
    color: '#4CAF50',
  },
};
