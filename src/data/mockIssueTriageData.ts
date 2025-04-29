
import { IssueCluster, StandardRepair, Containment, ChangeLogEntry } from "@/types/issue-triage";

// Mock data for demonstration
export const mockClusters: IssueCluster[] = [
  {
    id: 'CL-001',
    affectedParts: ['A123', 'A124', 'A125'],
    likelyFix: 'Calibration adjustment in assembly station 3',
    confidence: 87,
    program: 'Alpha',
    severity: 'High',
    date: '2025-04-25',
    status: 'Pending',
    changelog: [],
    source: 'AI'
  },
  {
    id: 'CL-002',
    affectedParts: ['B234', 'B235'],
    likelyFix: 'Replace worn tooling in milling operation',
    confidence: 92,
    program: 'Beta',
    severity: 'Medium',
    date: '2025-04-26',
    status: 'Pending',
    changelog: [],
    source: 'AI'
  },
  {
    id: 'CL-003',
    affectedParts: ['C345', 'C346', 'C347', 'C348'],
    likelyFix: 'Update process parameters in coating application',
    confidence: 75,
    program: 'Charlie',
    severity: 'Low',
    date: '2025-04-27',
    status: 'Pending',
    changelog: [],
    source: 'AI'
  },
  {
    id: 'CL-004',
    affectedParts: ['D456'],
    likelyFix: 'Supplier quality issue - notify procurement',
    confidence: 95,
    program: 'Delta',
    severity: 'High',
    date: '2025-04-28',
    status: 'Pending',
    changelog: [],
    source: 'AI'
  },
  {
    id: 'CL-005',
    affectedParts: ['E567', 'E568', 'E569'],
    likelyFix: 'Operator training required on measurement technique',
    confidence: 83,
    program: 'Alpha',
    severity: 'Medium',
    date: '2025-04-28',
    status: 'Pending',
    changelog: [],
    source: 'AI'
  }
];

// Mock data for manually created clusters
export const mockManualClusters: IssueCluster[] = [
  {
    id: 'MC-001',
    affectedParts: ['F678', 'F679'],
    likelyFix: 'Replacement of worn seals on hydraulic assembly',
    program: 'Alpha',
    severity: 'High',
    date: '2025-04-24',
    status: 'Pending',
    changelog: [],
    source: 'Manual',
    creator: 'John Smith',
    justification: 'Visual inspection revealed consistent pattern of seal wear across multiple assemblies'
  },
  {
    id: 'MC-002',
    affectedParts: ['G789', 'G790', 'G791'],
    likelyFix: 'Update torque specifications for connector installation',
    program: 'Beta',
    severity: 'Medium',
    date: '2025-04-23',
    status: 'Approved',
    changelog: [
      {
        id: 'log-1',
        timestamp: '2025-04-23T14:30:00',
        user: 'James Wilson',
        action: 'Created',
        comment: 'Created based on field failures analysis'
      },
      {
        id: 'log-2',
        timestamp: '2025-04-24T09:15:00',
        user: 'Maria Chen',
        action: 'Approved',
        comment: 'Approved after verification with test data'
      }
    ],
    source: 'Manual',
    creator: 'James Wilson',
    justification: 'Analysis of field failures showed consistent pattern of under-torqued connectors'
  },
  {
    id: 'MC-003',
    affectedParts: ['H890', 'H891'],
    likelyFix: 'Modify fixture design to prevent component misalignment',
    program: 'Charlie',
    severity: 'High',
    date: '2025-04-22',
    status: 'Pending',
    submissionType: 'Standard Repair',
    changelog: [],
    source: 'Manual',
    creator: 'Emily Johnson',
    justification: 'Observed consistent misalignment issues during assembly process review'
  }
];

// Mock data for standard repairs
export const mockStandardRepairs: StandardRepair[] = [
  {
    id: 'SR-001',
    description: 'Torque adjustment for connector seating',
    partNumbers: ['A123', 'A124', 'A125'],
    approvedBy: 'Manufacturing Engineering',
    approvalDate: '2025-04-10',
    expiryDate: '2025-07-10',
    status: 'Active',
    daysActive: 18,
    program: 'Alpha'
  },
  {
    id: 'SR-002',
    description: 'Heat treatment parameter adjustment',
    partNumbers: ['B234', 'B235'],
    approvedBy: 'Quality Engineering',
    approvalDate: '2025-03-15',
    expiryDate: '2025-06-15',
    status: 'Active',
    daysActive: 44,
    program: 'Beta'
  },
  {
    id: 'SR-003',
    description: 'Surface finish buffing procedure',
    partNumbers: ['C345', 'C346'],
    approvedBy: 'Process Engineering',
    approvalDate: '2025-02-20',
    expiryDate: '2025-05-01',
    status: 'Expiring Soon',
    daysActive: 67,
    program: 'Charlie'
  },
  {
    id: 'SR-004',
    description: 'Inspection criteria relaxation for non-critical feature',
    partNumbers: ['D456'],
    approvedBy: 'Quality Assurance',
    approvalDate: '2025-01-10',
    expiryDate: '2025-04-30',
    status: 'Expired',
    daysActive: 108,
    program: 'Delta'
  }
];

// Mock data for containments/escalations
export const mockContainments: Containment[] = [
  {
    id: 'CE-001',
    description: 'Material lot quarantine due to supplier nonconformance',
    affectedAreas: ['Receiving', 'Assembly Line A'],
    approvedBy: 'Quality Management',
    approvalDate: '2025-04-20',
    escalationLevel: 'High',
    team: 'Supplier Quality',
    daysActive: 8,
    program: 'Alpha',
    status: 'Active'
  },
  {
    id: 'CE-002',
    description: '100% inspection of threaded interfaces',
    affectedAreas: ['Assembly Line B', 'Final Test'],
    approvedBy: 'Operations',
    approvalDate: '2025-04-15',
    escalationLevel: 'Medium',
    team: 'Production',
    daysActive: 13,
    program: 'Beta',
    status: 'Active'
  },
  {
    id: 'CE-003',
    description: 'Temporary process bypass with additional verification',
    affectedAreas: ['CNC Department'],
    approvedBy: 'Process Engineering',
    approvalDate: '2025-04-05',
    escalationLevel: 'Low',
    team: 'Manufacturing Engineering',
    daysActive: 23,
    program: 'Charlie',
    status: 'Pending Review'
  },
  {
    id: 'CE-004',
    description: 'Customer notification for potential late deliveries',
    affectedAreas: ['Logistics', 'Customer Service'],
    approvedBy: 'Executive Leadership',
    approvalDate: '2025-03-28',
    escalationLevel: 'Critical',
    team: 'Program Management',
    daysActive: 31,
    program: 'Delta',
    status: 'Completed'
  }
];

export const predefinedTeamOptions = [
  'Manufacturing Engineering',
  'Quality Engineering', 
  'Process Engineering',
  'Operations',
  'Supply Chain',
  'Tooling Department',
  'Production Control'
];
