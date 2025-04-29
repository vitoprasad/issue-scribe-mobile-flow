import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SidebarInset } from '@/components/ui/sidebar';
import { Check, X, FileText, Package, Cpu, Shield, DollarSign, Clock, GitPullRequest, MessageSquare, ThumbsUp, ThumbsDown, BarChart3 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChangeLogEntry } from '@/types/issue-triage';
import { createChangeLogEntry } from '@/utils/issue-triage-utils';

// Mock data for approval requests
const mockApprovalRequests = [
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

// Define types for discussion and enhanced approval requests
type DiscussionResponse = {
  id: string;
  timestamp: string;
  user: string;
  message: string;
};

type DiscussionItem = {
  id: string;
  timestamp: string;
  user: string;
  message: string;
  responses: DiscussionResponse[];
};

type ApprovalRequest = {
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

// Quick response templates
const quickResponseTemplates = [
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

export const ApprovalRequestsContent = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ApprovalRequest[]>(mockApprovalRequests);
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [approvalComment, setApprovalComment] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [discussionMessage, setDiscussionMessage] = useState('');
  const [changeLogEntry, setChangeLogEntry] = useState('');
  const [activeDetailTab, setActiveDetailTab] = useState('details');
  const [selectedResponseTemplate, setSelectedResponseTemplate] = useState('');

  const handleApprove = (id: string) => {
    if (approvalComment.trim() === '') {
      toast({
        title: "Comment required",
        description: "Please provide approval comments before proceeding.",
        variant: "destructive"
      });
      return;
    }

    setRequests(requests.filter(request => request.id !== id));
    setIsApproveDialogOpen(false);
    setApprovalComment('');
    
    toast({
      title: "Request approved",
      description: `Approval request ${id} has been approved.`,
    });
  };

  const handleReject = (id: string) => {
    if (rejectionReason.trim() === '') {
      toast({
        title: "Reason required",
        description: "Please provide a reason for rejection.",
        variant: "destructive"
      });
      return;
    }

    setRequests(requests.filter(request => request.id !== id));
    setIsRejectDialogOpen(false);
    setRejectionReason('');
    
    toast({
      title: "Request rejected",
      description: `Approval request ${id} has been rejected.`,
    });
  };

  const openApproveDialog = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setIsApproveDialogOpen(true);
  };

  const openRejectDialog = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setIsRejectDialogOpen(true);
  };

  const openDetailView = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setIsDetailViewOpen(true);
  };

  const handleAddDiscussionMessage = () => {
    if (!selectedRequest || !discussionMessage.trim()) return;

    const newMessage: DiscussionItem = {
      id: `disc-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: 'Manager',
      message: discussionMessage,
      responses: []
    };

    setRequests(requests.map(req => 
      req.id === selectedRequest.id 
        ? { 
            ...req, 
            discussion: [...(req.discussion || []), newMessage] 
          }
        : req
    ));

    setDiscussionMessage('');
    
    toast({
      title: "Comment added",
      description: "Your discussion comment has been added.",
    });
  };

  const handleAddChangeLogEntry = () => {
    if (!selectedRequest || !changeLogEntry.trim()) return;

    const newEntry = createChangeLogEntry(
      'Manager',
      'Added comment',
      changeLogEntry
    );

    setRequests(requests.map(req => 
      req.id === selectedRequest.id 
        ? { 
            ...req, 
            changelog: [...(req.changelog || []), newEntry] 
          }
        : req
    ));

    setChangeLogEntry('');
    
    toast({
      title: "Log entry added",
      description: "Your change log entry has been added.",
    });
  };

  const handleSelectResponseTemplate = (template: string) => {
    setSelectedResponseTemplate(template);
    setDiscussionMessage(template);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case 'High':
        return <Badge variant="destructive" className="font-medium">High</Badge>;
      case 'Medium':
        return <Badge variant="default" className="bg-amber-500 font-medium">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline" className="text-green-600 border-green-600 font-medium">Low</Badge>;
      default:
        return <Badge>{risk}</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    if (type === 'Repair Action') {
      return <Badge className="bg-blue-600">Repair Action</Badge>;
    } else if (type === 'Containment') {
      return <Badge className="bg-purple-600">Containment</Badge>;
    }
    return <Badge>{type}</Badge>;
  };

  return (
    <SidebarInset className="p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-industrial-700">Pending Approval Requests</h1>
          <p className="text-sm text-gray-500">Review and approve/reject clustered actions</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Pending Requests ({requests.length})</CardTitle>
        </CardHeader>
      </Card>

      {requests.length > 0 ? (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[110px]">Request ID</TableHead>
                <TableHead className="w-[110px]">Cluster ID</TableHead>
                <TableHead className="w-[130px]">Type</TableHead>
                <TableHead className="w-[120px]">Risk Level</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-[130px]">Submitted By</TableHead>
                <TableHead className="w-[130px]">Submission Date</TableHead>
                <TableHead className="w-[140px]">Cost Estimate</TableHead>
                <TableHead className="w-[180px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.clusterId}</TableCell>
                  <TableCell>{getTypeLabel(request.requestType)}</TableCell>
                  <TableCell>{getRiskBadge(request.riskLevel)}</TableCell>
                  <TableCell className="max-w-[250px] truncate" title={request.title}>
                    {request.title}
                  </TableCell>
                  <TableCell>{request.submittedBy}</TableCell>
                  <TableCell>{formatDate(request.submissionDate)}</TableCell>
                  <TableCell>${request.costEstimate.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openDetailView(request)}
                        title="View details"
                      >
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-green-600 text-green-600 hover:bg-green-50"
                        onClick={() => openApproveDialog(request)}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-600 text-red-600 hover:bg-red-50"
                        onClick={() => openRejectDialog(request)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No pending approval requests</p>
        </div>
      )}

      {/* Detailed Request View Dialog */}
      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedRequest?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest?.requestType} - {selectedRequest?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="flex flex-col h-full overflow-hidden">
              <Tabs value={activeDetailTab} onValueChange={setActiveDetailTab} className="mt-2">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="changelog">Change Log ({selectedRequest.changelog?.length || 0})</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion ({selectedRequest.discussion?.length || 0})</TabsTrigger>
                  <TabsTrigger value="ai">AI Assistance</TabsTrigger>
                </TabsList>
                
                <div className="overflow-y-auto pr-2" style={{ maxHeight: 'calc(80vh - 200px)' }}>
                  <TabsContent value="details" className="mt-0">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-sm text-gray-500">Cluster Information</h3>
                          <div className="mt-2 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Cluster ID:</span>
                              <span>{selectedRequest.clusterId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Submitted By:</span>
                              <span>{selectedRequest.submittedBy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Submission Date:</span>
                              <span>{formatDate(selectedRequest.submissionDate)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Risk Level:</span>
                              <span>{getRiskBadge(selectedRequest.riskLevel)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-sm text-gray-500">Systems & Parts</h3>
                          <div className="mt-2">
                            <div className="mb-2">
                              <span className="text-sm font-medium block mb-1">Affected Systems:</span>
                              <div className="flex flex-wrap gap-1">
                                {selectedRequest.systems.map((system) => (
                                  <Badge key={system} variant="outline" className="bg-blue-50">
                                    {system}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium block mb-1">Affected Parts:</span>
                              <div className="flex flex-wrap gap-1">
                                {selectedRequest.parts.map((part) => (
                                  <Badge key={part} variant="outline" className="bg-amber-50">
                                    {part}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-sm text-gray-500">Implementation Details</h3>
                          <div className="mt-2 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Cost Estimate:</span>
                              <span className="font-medium">${selectedRequest.costEstimate.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Time Estimate:</span>
                              <span>{selectedRequest.timeEstimate} hours</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Type:</span>
                              <span>{getTypeLabel(selectedRequest.requestType)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-sm text-gray-500">Notes</h3>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                            {selectedRequest.notes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="changelog" className="mt-0">
                    <div className="space-y-4">
                      {selectedRequest.changelog && selectedRequest.changelog.length > 0 ? (
                        selectedRequest.changelog.map((entry) => (
                          <div key={entry.id} className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>
                                <span className="font-medium">{entry.user}</span> · {entry.action}
                              </span>
                              <span>{formatDate(entry.timestamp)}</span>
                            </div>
                            <div className="mt-1 text-gray-700">{entry.comment}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          No change log entries yet
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 border-t pt-4">
                      <h3 className="font-medium text-sm mb-2">Add to Change Log</h3>
                      <Textarea 
                        value={changeLogEntry}
                        onChange={(e) => setChangeLogEntry(e.target.value)}
                        placeholder="Add a note to the change log..."
                        className="min-h-[80px] mb-3"
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleAddChangeLogEntry}
                          disabled={!changeLogEntry.trim()}
                        >
                          <GitPullRequest className="h-4 w-4 mr-2" />
                          Add to Change Log
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discussion" className="mt-0">
                    <div className="space-y-4">
                      {selectedRequest.discussion && selectedRequest.discussion.length > 0 ? (
                        selectedRequest.discussion.map((item) => (
                          <div key={item.id} className="border rounded-md">
                            <div className="bg-gray-50 p-3 rounded-t-md">
                              <div className="flex justify-between text-sm text-gray-500">
                                <span className="font-medium">{item.user}</span>
                                <span>{formatDate(item.timestamp)}</span>
                              </div>
                              <div className="mt-1 text-gray-700">{item.message}</div>
                            </div>
                            
                            {item.responses.length > 0 && (
                              <div className="p-3 pl-6 border-t">
                                {item.responses.map((response) => (
                                  <div key={response.id} className="mb-3 last:mb-0">
                                    <div className="flex justify-between text-sm text-gray-500">
                                      <span className="font-medium">{response.user}</span>
                                      <span>{formatDate(response.timestamp)}</span>
                                    </div>
                                    <div className="mt-1 text-gray-700">{response.message}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          No discussion yet
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 border-t pt-4">
                      <h3 className="font-medium text-sm mb-2">Quick Response Templates</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {quickResponseTemplates.map((template) => (
                          <Button 
                            key={template.label}
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSelectResponseTemplate(template.template)}
                          >
                            {template.label}
                          </Button>
                        ))}
                      </div>
                      
                      <h3 className="font-medium text-sm mb-2">Add Comment</h3>
                      <Textarea 
                        value={discussionMessage}
                        onChange={(e) => setDiscussionMessage(e.target.value)}
                        placeholder="Add a discussion comment..."
                        className="min-h-[80px] mb-3"
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleAddDiscussionMessage}
                          disabled={!discussionMessage.trim()}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ai" className="mt-0">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="border rounded-md p-4">
                          <div className="flex items-center mb-3">
                            <div className="bg-blue-100 text-blue-700 p-1 rounded mr-2">
                              <BarChart3 className="h-4 w-4" />
                            </div>
                            <h3 className="font-medium">AI Risk Assessment</h3>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Confidence Score:</span>
                            <div className={`font-bold text-sm ${
                              (selectedRequest.aiConfidence || 0) >= 90 ? 'text-green-600' : 
                              (selectedRequest.aiConfidence || 0) >= 75 ? 'text-amber-600' : 
                              'text-red-600'
                            }`}>
                              {selectedRequest.aiConfidence}%
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {selectedRequest.aiConfidence && selectedRequest.aiConfidence >= 90 ? 
                              "AI has high confidence in this repair approach based on historical data and similar issues." : 
                              selectedRequest.aiConfidence && selectedRequest.aiConfidence >= 75 ?
                              "AI has moderate confidence in this approach. Consider reviewing alternatives." :
                              "AI has low confidence in this approach. Recommended to explore other solutions."
                            }
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex items-center mb-3">
                            <div className="bg-purple-100 text-purple-700 p-1 rounded mr-2">
                              <DollarSign className="h-4 w-4" />
                            </div>
                            <h3 className="font-medium">Cost Analysis</h3>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Estimated Cost:</span>
                              <span className="font-medium">${selectedRequest.costEstimate.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Typical Cost (similar issues):</span>
                              <span className="font-medium">$18,000 - $28,000</span>
                            </div>
                            <div className="flex justify-between text-xs mt-3">
                              <span className={selectedRequest.costEstimate > 20000 ? "text-amber-600" : "text-green-600"}>
                                {selectedRequest.costEstimate > 20000 ? 
                                  "Above average cost compared to similar issues" : 
                                  "Within typical cost range for similar issues"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="border rounded-md p-4">
                          <div className="flex items-center mb-3">
                            <div className="bg-amber-100 text-amber-700 p-1 rounded mr-2">
                              <Clock className="h-4 w-4" />
                            </div>
                            <h3 className="font-medium">Time Impact Analysis</h3>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Implementation Time:</span>
                              <span className="font-medium">{selectedRequest.timeEstimate} hours</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Production Downtime Impact:</span>
                              <span className="font-medium">Moderate</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Schedule Risk:</span>
                              <span className={`font-medium ${selectedRequest.riskLevel === 'High' ? 'text-red-600' : selectedRequest.riskLevel === 'Medium' ? 'text-amber-600' : 'text-green-600'}`}>{selectedRequest.riskLevel}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex items-center mb-3">
                            <div className="bg-green-100 text-green-700 p-1 rounded mr-2">
                              <Package className="h-4 w-4" />
                            </div>
                            <h3 className="font-medium">Similar Issues ({selectedRequest.similarIssues?.length || 0})</h3>
                          </div>
                          {selectedRequest.similarIssues && selectedRequest.similarIssues.length > 0 ? (
                            <div className="space-y-2">
                              {selectedRequest.similarIssues.map(issue => (
                                <div key={issue} className="flex justify-between text-sm border-b pb-1 last:border-0 last:pb-0">
                                  <span className="text-blue-600">{issue}</span>
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3 text-green-500" />
                                    <span className="text-xs">Successful</span>
                                  </div>
                                </div>
                              ))}
                              <div className="text-xs text-gray-500 pt-2">
                                {selectedRequest.similarIssues.length} similar issues found with {selectedRequest.similarIssues.length} successful resolutions (100% success rate)
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-600">
                              No similar issues found in the database.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
          
          <DialogFooter className="mt-6 pt-4 border-t">
            <div className="flex justify-end gap-2 w-full">
              <Button variant="outline" onClick={() => setIsDetailViewOpen(false)}>
                Close
              </Button>
              <Button 
                variant="outline" 
                className="border-red-600 text-red-600 hover:bg-red-50"
                onClick={() => {
                  setIsDetailViewOpen(false);
                  selectedRequest && openRejectDialog(selectedRequest);
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button 
                variant="default" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setIsDetailViewOpen(false);
                  selectedRequest && openApproveDialog(selectedRequest);
                }}
              >
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this request?
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Request ID</p>
                  <p className="text-sm">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Request Type</p>
                  <p className="text-sm">{selectedRequest.requestType}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Title</p>
                <p className="text-sm">{selectedRequest.title}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Approval Comments</p>
                <Textarea 
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  placeholder="Provide any comments or instructions..."
                  className="h-24"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => selectedRequest && handleApprove(selectedRequest.id)}
            >
              Approve Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Request ID</p>
                  <p className="text-sm">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Request Type</p>
                  <p className="text-sm">{selectedRequest.requestType}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Title</p>
                <p className="text-sm">{selectedRequest.title}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Rejection Reason</p>
                <Textarea 
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Provide reason for rejection..."
                  className="h-24"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => selectedRequest && handleReject(selectedRequest.id)}
            >
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarInset>
  );
};
