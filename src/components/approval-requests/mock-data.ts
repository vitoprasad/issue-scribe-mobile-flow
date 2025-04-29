
import { ApprovalRequest, QuickResponseTemplate } from './types';

// Mock data for approval requests
export const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: 'AR-2025-001',
    clusterId: 'CL-2025-001',
    title: 'Replace faulty wiring harness in control unit',
    submittedBy: 'Emily Johnson',
    requestType: 'Repair Action',
    systems: ['Propulsion', 'Navigation'],
    parts: ['A320-FN23', 'B451-TH89'],
    riskLevel: 'High',
    costEstimate: 25000,
    timeEstimate: 48,
    submissionDate: '2025-04-25T14:30:00',
    notes: 'Requesting urgent approval to prevent production delays.',
    similarIssues: ['AR-2024-089', 'AR-2024-112'],
    aiConfidence: 92,
    changelog: [
      {
        id: 'log-1',
        timestamp: '2025-04-24T10:15:00',
        user: 'Emily Johnson',
        action: 'Created cluster',
        comment: 'Initial identification of issue in control unit'
      },
      {
        id: 'log-2',
        timestamp: '2025-04-24T15:40:00',
        user: 'QA Team',
        action: 'Updated parts list',
        comment: 'Added B451-TH89 part to affected components'
      },
      {
        id: 'log-3',
        timestamp: '2025-04-25T09:20:00',
        user: 'Emily Johnson',
        action: 'Submitted for approval',
        comment: 'Repair plan finalized and ready for review'
      }
    ],
    discussion: [
      {
        id: 'disc-1',
        timestamp: '2025-04-25T15:10:00',
        user: 'Robert Chen',
        message: 'Have we confirmed this is not related to the software update from last week?',
        responses: []
      }
    ]
  },
  {
    id: 'AR-2025-002',
    clusterId: 'CL-2025-003',
    title: 'Replace worn gaskets in hydraulic system',
    submittedBy: 'Robert Chen',
    requestType: 'Containment',
    systems: ['Hydraulic', 'Landing Gear'],
    parts: ['E567-LM90', 'F890-OP34'],
    riskLevel: 'Low',
    costEstimate: 5000,
    timeEstimate: 8,
    submissionDate: '2025-04-24T09:15:00',
    notes: 'Temporary containment until permanent fix can be implemented.',
    similarIssues: ['AR-2023-245'],
    aiConfidence: 85,
    changelog: [
      {
        id: 'log-1',
        timestamp: '2025-04-23T14:20:00',
        user: 'Robert Chen',
        action: 'Created cluster',
        comment: 'Initial identification of hydraulic issue'
      },
      {
        id: 'log-2',
        timestamp: '2025-04-24T08:15:00',
        user: 'Robert Chen',
        action: 'Submitted for approval',
        comment: 'Containment plan ready for review'
      }
    ],
    discussion: []
  },
  {
    id: 'AR-2025-003',
    clusterId: 'CL-2025-004',
    title: 'Overhaul cooling system and replace heat exchanger',
    submittedBy: 'Sarah Adams',
    requestType: 'Repair Action',
    systems: ['Cooling', 'Power'],
    parts: ['G123-QR78', 'H456-ST12'],
    riskLevel: 'High',
    costEstimate: 32000,
    timeEstimate: 72,
    submissionDate: '2025-04-23T16:45:00',
    notes: 'Critical issue affecting multiple production lines.',
    similarIssues: ['AR-2024-023', 'AR-2023-156', 'AR-2024-078'],
    aiConfidence: 78,
    changelog: [
      {
        id: 'log-1',
        timestamp: '2025-04-22T11:30:00',
        user: 'Sarah Adams',
        action: 'Created cluster',
        comment: 'Initial identification of cooling system failure'
      },
      {
        id: 'log-2',
        timestamp: '2025-04-23T14:15:00',
        user: 'Engineering Team',
        action: 'Updated repair plan',
        comment: 'Added heat exchanger replacement to repair scope'
      },
      {
        id: 'log-3',
        timestamp: '2025-04-23T16:45:00',
        user: 'Sarah Adams',
        action: 'Submitted for approval',
        comment: 'Finalized repair plan after engineering review'
      }
    ],
    discussion: [
      {
        id: 'disc-1',
        timestamp: '2025-04-24T09:15:00',
        user: 'Michael Torres',
        message: 'Could we expedite the parts delivery? Production lines 3 and 4 will need to be shut down within 48 hours if not addressed.',
        responses: [
          {
            id: 'resp-1',
            timestamp: '2025-04-24T10:20:00',
            user: 'Sarah Adams',
            message: "I've contacted the supplier. They can deliver by EOD tomorrow with express shipping."
          }
        ]
      }
    ]
  },
  {
    id: 'AR-2025-004',
    clusterId: 'CL-2025-005',
    title: 'Replace faulty circuit boards in control panel',
    submittedBy: 'Michael Torres',
    requestType: 'Repair Action',
    systems: ['Electrical', 'Avionics'],
    parts: ['I789-UV56', 'J012-WX90'],
    riskLevel: 'Medium',
    costEstimate: 18000,
    timeEstimate: 36,
    submissionDate: '2025-04-22T11:20:00',
    notes: 'Intermittent failures causing quality issues.',
    similarIssues: ['AR-2024-122'],
    aiConfidence: 88,
    changelog: [
      {
        id: 'log-1',
        timestamp: '2025-04-21T13:45:00',
        user: 'Michael Torres',
        action: 'Created cluster',
        comment: 'Initial identification of circuit board issues'
      },
      {
        id: 'log-2',
        timestamp: '2025-04-22T11:20:00',
        user: 'Michael Torres',
        action: 'Submitted for approval',
        comment: 'Repair plan finalized'
      }
    ],
    discussion: []
  }
];

// Quick response templates
export const quickResponseTemplates: QuickResponseTemplate[] = [
  { 
    label: "Request more details", 
    template: "Please provide more details about the specific components affected and the expected downtime for this repair."
  },
  { 
    label: "Alternative approach", 
    template: "Have you considered using an alternative approach that might reduce production impact?"
  },
  { 
    label: "Cost concern", 
    template: "The cost estimate seems high. Please justify the expense or explore lower-cost alternatives."
  },
  { 
    label: "Schedule impact", 
    template: "What is the impact to production schedule if this is approved? What is the impact if delayed?"
  }
];
