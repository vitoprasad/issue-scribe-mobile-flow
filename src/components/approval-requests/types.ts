
import { ChangeLogEntry } from '@/types/issue-triage';

export type DiscussionResponse = {
  id: string;
  timestamp: string;
  user: string;
  message: string;
};

export type DiscussionItem = {
  id: string;
  timestamp: string;
  user: string;
  message: string;
  responses: DiscussionResponse[];
};

export type ApprovalRequest = {
  id: string;
  clusterId: string;
  title: string;
  submittedBy: string;
  requestType: string;
  systems: string[];
  parts: string[];
  riskLevel: string;
  costEstimate: number;
  timeEstimate: number;
  submissionDate: string;
  notes: string;
  similarIssues?: string[];
  aiConfidence?: number;
  changelog?: ChangeLogEntry[];
  discussion?: DiscussionItem[];
};

export type QuickResponseTemplate = {
  label: string;
  template: string;
};

export type RepairAction = {
  id: string;
  parts: string[];
  systems: string[];
  riskLevel: string;
  costSavings: number;
  timeSavings: number;
  suggestedAction: string;
  submittedBy?: string;
  submissionDate?: string;
  aiConfidence?: number;
  notes?: string;
  similarIssues?: string[];
  changelog?: ChangeLogEntry[];
  discussion?: DiscussionItem[];
};
