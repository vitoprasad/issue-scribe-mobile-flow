
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarInset } from '@/components/ui/sidebar';
import { useToast } from "@/hooks/use-toast";
import { createChangeLogEntry } from '@/utils/issue-triage-utils';
import { RequestsTable } from './approval-requests/RequestsTable';
import { ApproveDialog } from './approval-requests/dialogs/ApproveDialog';
import { RejectDialog } from './approval-requests/dialogs/RejectDialog';
import { DetailViewDialog } from './approval-requests/dialogs/DetailViewDialog';
import { ApprovalRequest } from './approval-requests/types';
import { mockApprovalRequests, quickResponseTemplates } from './approval-requests/mock-data';

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

    const newMessage = {
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

  const handleDetailViewApprove = () => {
    setIsDetailViewOpen(false);
    selectedRequest && openApproveDialog(selectedRequest);
  };

  const handleDetailViewReject = () => {
    setIsDetailViewOpen(false);
    selectedRequest && openRejectDialog(selectedRequest);
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
        <RequestsTable 
          requests={requests}
          onViewDetails={openDetailView}
          onApprove={openApproveDialog}
          onReject={openRejectDialog}
        />
      ) : (
        <div className="text-center py-8 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No pending approval requests</p>
        </div>
      )}

      {/* Dialogs */}
      <DetailViewDialog
        open={isDetailViewOpen}
        onOpenChange={setIsDetailViewOpen}
        request={selectedRequest}
        activeTab={activeDetailTab}
        setActiveTab={setActiveDetailTab}
        changeLogEntry={changeLogEntry}
        setChangeLogEntry={setChangeLogEntry}
        discussionMessage={discussionMessage}
        setDiscussionMessage={setDiscussionMessage}
        quickResponseTemplates={quickResponseTemplates}
        onAddChangeLogEntry={handleAddChangeLogEntry}
        onAddDiscussionMessage={handleAddDiscussionMessage}
        onSelectResponseTemplate={handleSelectResponseTemplate}
        onApprove={handleDetailViewApprove}
        onReject={handleDetailViewReject}
      />

      <ApproveDialog
        open={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
        request={selectedRequest}
        approvalComment={approvalComment}
        setApprovalComment={setApprovalComment}
        onApprove={handleApprove}
      />
      
      <RejectDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        request={selectedRequest}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onReject={handleReject}
      />
    </SidebarInset>
  );
};
