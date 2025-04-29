
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
  category: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  estimatedSavings?: number;
  relatedIssues?: string[];
  implementationStatus?: 'pending' | 'in-progress' | 'completed';
  alignedWithDirectives?: boolean;
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
  tags?: string[];
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
