
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
import { RepairAction, QuickResponseTemplate } from '../approval-requests/types';
import { DetailsTab } from './detail-tabs/DetailsTab';
import { ChangeLogTab } from './detail-tabs/ChangeLogTab';
import { DiscussionTab } from './detail-tabs/DiscussionTab';
import { AIAssistanceTab } from './detail-tabs/AIAssistanceTab';

interface RepairActionDetailViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  repairAction: RepairAction | null;
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
  onModify: () => void;
}

export const RepairActionDetailViewDialog: React.FC<RepairActionDetailViewDialogProps> = ({
  open,
  onOpenChange,
  repairAction,
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
  onReject,
  onModify
}) => {
  if (!repairAction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {repairAction.suggestedAction}
          </DialogTitle>
          <DialogDescription>
            Repair Action - {repairAction.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="changelog">Change Log ({repairAction.changelog?.length || 0})</TabsTrigger>
              <TabsTrigger value="discussion">Discussion ({repairAction.discussion?.length || 0})</TabsTrigger>
              <TabsTrigger value="ai">AI Assistance</TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto pr-2" style={{ maxHeight: 'calc(80vh - 200px)' }}>
              <TabsContent value="details" className="mt-0">
                <DetailsTab repairAction={repairAction} />
              </TabsContent>
              
              <TabsContent value="changelog" className="mt-0">
                <ChangeLogTab
                  repairAction={repairAction}
                  changeLogEntry={changeLogEntry}
                  setChangeLogEntry={setChangeLogEntry}
                  onAddChangeLogEntry={onAddChangeLogEntry}
                />
              </TabsContent>
              
              <TabsContent value="discussion" className="mt-0">
                <DiscussionTab
                  repairAction={repairAction}
                  discussionMessage={discussionMessage}
                  setDiscussionMessage={setDiscussionMessage}
                  onAddDiscussionMessage={onAddDiscussionMessage}
                  quickResponseTemplates={quickResponseTemplates}
                  onSelectResponseTemplate={onSelectResponseTemplate}
                />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-0">
                <AIAssistanceTab repairAction={repairAction} />
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
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={onModify}
            >
              Modify
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
