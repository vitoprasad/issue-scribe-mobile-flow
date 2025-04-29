
// Define the type for issue clusters
export interface IssueCluster {
  id: string;
  affectedParts: string[];
  likelyFix: string;
  confidence?: number;
  program: string;
  severity: 'High' | 'Medium' | 'Low';
  date: string;
  rejectionReason?: string;
  changelog?: ChangeLogEntry[];
  status?: 'Pending' | 'Approved' | 'Rejected';
  submissionType?: 'Standard Repair' | 'Containment' | null;
  source?: 'AI' | 'Manual';
  creator?: string;
  justification?: string;
}

// Define type for change log entries
export interface ChangeLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  comment: string;
}

// Define type for standard repairs
export interface StandardRepair {
  id: string;
  description: string;
  partNumbers: string[];
  approvedBy: string;
  approvalDate: string;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  daysActive: number;
  program: string;
}

// Define type for containment or escalation
export interface Containment {
  id: string;
  description: string;
  affectedAreas: string[];
  approvedBy: string;
  approvalDate: string;
  escalationLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  team: string;
  daysActive: number;
  program: string;
  status: 'Active' | 'Pending Review' | 'Completed';
}

// Define the type for manual cluster form values
export interface ManualClusterFormValues {
  affectedParts: string;
  likelyFix: string;
  program: string;
  severity: 'High' | 'Medium' | 'Low';
  justification: string;
  source: string;
}

// Define the type for filters
export interface Filters {
  program: string;
  severity: string;
  startDate: string;
  endDate: string;
  team: string;
  status: string;
  source?: string;
}

// Define interfaces for forms
export interface RejectFormValues {
  comment: string;
}

export interface SubmissionFormValues {
  submissionType: 'Standard Repair' | 'Containment';
  targetTeam: string;
  comment: string;
}
