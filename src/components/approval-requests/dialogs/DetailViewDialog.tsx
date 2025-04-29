
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check, X } from 'lucide-react';
import { ApprovalRequest, QuickResponseTemplate } from '../types';
import { DetailsTab } from '../details-tabs/DetailsTab';
import { ChangeLogTab } from '../details-tabs/ChangeLogTab';
import { DiscussionTab } from '../details-tabs/DiscussionTab';
import { AIAssistanceTab } from '../details-tabs/AIAssistanceTab';

interface DetailViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: ApprovalRequest | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  changeLogEntry: string;
  setChangeLogEntry: (entry: string) => void;
  discussionMessage: string;
  setDiscussionMessage: (message: string) => void;
  quickResponseTemplates: QuickResponseTemplate[];
  onAddChangeLogEntry: () => void;
  onAddDiscussionMessage: () => void;
  onSelectResponseTemplate: (template: string) => void;
  onApprove: () => void;
  onReject: () => void;
}

export const DetailViewDialog: React.FC<DetailViewDialogProps> = ({
  open,
  onOpenChange,
  request,
  activeTab,
  setActiveTab,
  changeLogEntry,
  setChangeLogEntry,
  discussionMessage,
  setDiscussionMessage,
  quickResponseTemplates,
  onAddChangeLogEntry,
  onAddDiscussionMessage,
  onSelectResponseTemplate,
  onApprove,
  onReject
}) => {
  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {request.title}
          </DialogTitle>
          <DialogDescription>
            {request.requestType} - {request.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="changelog">Change Log ({request.changelog?.length || 0})</TabsTrigger>
              <TabsTrigger value="discussion">Discussion ({request.discussion?.length || 0})</TabsTrigger>
              <TabsTrigger value="ai">AI Assistance</TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto pr-2" style={{ maxHeight: 'calc(80vh - 200px)' }}>
              <TabsContent value="details" className="mt-0">
                <DetailsTab request={request} />
              </TabsContent>
              
              <TabsContent value="changelog" className="mt-0">
                <ChangeLogTab
                  request={request}
                  changeLogEntry={changeLogEntry}
                  setChangeLogEntry={setChangeLogEntry}
                  onAddChangeLogEntry={onAddChangeLogEntry}
                />
              </TabsContent>
              
              <TabsContent value="discussion" className="mt-0">
                <DiscussionTab
                  request={request}
                  discussionMessage={discussionMessage}
                  setDiscussionMessage={setDiscussionMessage}
                  onAddDiscussionMessage={onAddDiscussionMessage}
                  quickResponseTemplates={quickResponseTemplates}
                  onSelectResponseTemplate={onSelectResponseTemplate}
                />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-0">
                <AIAssistanceTab request={request} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <DialogFooter className="mt-6 pt-4 border-t">
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button 
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-50"
              onClick={onReject}
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700"
              onClick={onApprove}
            >
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
