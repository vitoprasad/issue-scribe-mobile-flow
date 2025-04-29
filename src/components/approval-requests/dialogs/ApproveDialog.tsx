
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ApprovalRequest } from '../types';

interface ApproveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: ApprovalRequest | null;
  approvalComment: string;
  setApprovalComment: (comment: string) => void;
  onApprove: (id: string) => void;
}

export const ApproveDialog: React.FC<ApproveDialogProps> = ({
  open,
  onOpenChange,
  request,
  approvalComment,
  setApprovalComment,
  onApprove
}) => {
  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this request?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Request ID</p>
              <p className="text-sm">{request.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Request Type</p>
              <p className="text-sm">{request.requestType}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1">Title</p>
            <p className="text-sm">{request.title}</p>
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
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="default" 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => onApprove(request.id)}
          >
            Approve Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
