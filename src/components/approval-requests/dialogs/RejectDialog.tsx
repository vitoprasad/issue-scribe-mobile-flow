
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

interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: ApprovalRequest | null;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onReject: (id: string) => void;
}

export const RejectDialog: React.FC<RejectDialogProps> = ({
  open,
  onOpenChange,
  request,
  rejectionReason,
  setRejectionReason,
  onReject
}) => {
  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Request</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this request.
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
            <p className="text-sm font-medium mb-1">Rejection Reason</p>
            <Textarea 
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Provide reason for rejection..."
              className="h-24"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive"
            onClick={() => onReject(request.id)}
          >
            Reject Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
