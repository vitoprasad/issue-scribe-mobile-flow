
import { ExecutiveFeedback } from "../types/dashboard";

export const executiveFeedback: ExecutiveFeedback[] = [
  {
    id: "EF-001",
    title: "Increase Focus on Propulsion System Issues",
    description: "Based on recent risk analysis, propulsion system risks have increased. Prioritize resources to mitigate these issues before the end of Q3.",
    priority: "critical",
    category: "directive",
    createdAt: "2025-04-22T10:30:00Z",
    status: "new",
    assignee: "Engineering Team Lead",
    tags: ["Propulsion", "High Priority"]
  },
  {
    id: "EF-002",
    title: "Streamline Power System Testing",
    description: "Executive review identified potential cost savings in power system testing procedures. Implement new protocols by next month.",
    priority: "high",
    category: "directive",
    createdAt: "2025-04-20T14:15:00Z",
    status: "in-progress",
    assignee: "QA Manager",
    tags: ["Power Distribution", "Cost Reduction"]
  },
  {
    id: "EF-003",
    title: "Clarify Risk Metrics for Avionics Subsystem",
    description: "Board requested additional context on avionics risk increase. Prepare detailed report on mitigation strategies by Friday.",
    priority: "medium",
    category: "inquiry",
    createdAt: "2025-04-18T09:45:00Z",
    status: "new",
    tags: ["Avionics", "Risk Analysis"]
  },
  {
    id: "EF-004",
    title: "Budget Approval for Additional Resources",
    description: "Based on AI recommendations, the executive team has approved additional resources for thermal system improvements.",
    priority: "medium",
    category: "notification",
    createdAt: "2025-04-15T16:20:00Z",
    status: "completed",
    tags: ["Thermal", "Budget"]
  }
];
