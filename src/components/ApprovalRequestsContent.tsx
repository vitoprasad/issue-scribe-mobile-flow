
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
import { Check, X, FileText, Package, Cpu, Shield, DollarSign, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

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
    notes: 'Requesting urgent approval to prevent production delays.'
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
    notes: 'Temporary containment until permanent fix can be implemented.'
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
    notes: 'Critical issue affecting multiple production lines.'
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
    notes: 'Intermittent failures causing quality issues.'
  }
];

type ApprovalRequest = typeof mockApprovalRequests[0];

export const ApprovalRequestsContent = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockApprovalRequests);
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [approvalComment, setApprovalComment] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

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
                <TableHead className="w-[120px] text-right">Actions</TableHead>
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
