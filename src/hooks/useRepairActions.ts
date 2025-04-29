
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { RepairAction, DiscussionItem } from '../components/approval-requests/types';
import { ChangeLogEntry } from '@/types/issue-triage';
import { mockRepairActions } from '../components/repair-actions/mockData';
import { executiveFeedback } from '@/data/mockFeedbackData';

export const useRepairActions = () => {
  const { toast } = useToast();
  const [tableData, setTableData] = useState<RepairAction[]>(mockRepairActions);
  const [selectedRepairAction, setSelectedRepairAction] = useState<RepairAction | null>(null);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [changeLogEntry, setChangeLogEntry] = useState('');
  const [discussionMessage, setDiscussionMessage] = useState('');

  // Extract system tags from executive feedback
  const getExecutiveSystemTags = () => {
    const systemTags: string[] = [];
    executiveFeedback.forEach(feedback => {
      if (feedback.tags) {
        feedback.tags.forEach(tag => {
          if (!systemTags.includes(tag)) {
            systemTags.push(tag);
          }
        });
      }
    });
    return systemTags;
  };

  const executiveSystemTags = getExecutiveSystemTags();

  // Check if a system is tagged in executive feedback
  const isSystemTagged = (system: string) => {
    return executiveSystemTags.includes(system);
  };

  const handleViewDetails = (repairAction: RepairAction) => {
    setSelectedRepairAction(repairAction);
    setActiveTab('details');
    setDetailViewOpen(true);
  };

  const handleAction = (id: string, action: 'approve' | 'modify' | 'reject') => {
    const actionMessages = {
      approve: 'Repair action approved',
      modify: 'Repair action marked for modification',
      reject: 'Repair action rejected'
    };
    
    toast({
      title: actionMessages[action],
      description: `Cluster ID: ${id}`,
    });
    
    setTableData(tableData.filter(item => item.id !== id));
    setDetailViewOpen(false);
  };

  const handleAddChangeLogEntry = () => {
    if (!selectedRepairAction || !changeLogEntry.trim()) return;
    
    const newEntry: ChangeLogEntry = {
      id: `cl-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: 'Manager',
      action: 'commented',
      comment: changeLogEntry
    };
    
    const updatedRepairAction = {
      ...selectedRepairAction,
      changelog: [...(selectedRepairAction.changelog || []), newEntry]
    };
    
    setSelectedRepairAction(updatedRepairAction);
    
    // Update the table data
    setTableData(tableData.map(item => 
      item.id === selectedRepairAction.id ? updatedRepairAction : item
    ));
    
    setChangeLogEntry('');
    
    toast({
      title: 'Change log entry added',
      description: 'Your note has been added to the change log.',
    });
  };

  const handleAddDiscussionMessage = () => {
    if (!selectedRepairAction || !discussionMessage.trim()) return;
    
    const newDiscussion: DiscussionItem = {
      id: `disc-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: 'Manager',
      message: discussionMessage,
      responses: []
    };
    
    const updatedRepairAction = {
      ...selectedRepairAction,
      discussion: [...(selectedRepairAction.discussion || []), newDiscussion]
    };
    
    setSelectedRepairAction(updatedRepairAction);
    
    // Update the table data
    setTableData(tableData.map(item => 
      item.id === selectedRepairAction.id ? updatedRepairAction : item
    ));
    
    setDiscussionMessage('');
    
    toast({
      title: 'Comment added',
      description: 'Your comment has been added to the discussion.',
    });
  };

  const handleSelectResponseTemplate = (template: string) => {
    setDiscussionMessage(template);
  };

  return {
    tableData,
    selectedRepairAction,
    detailViewOpen,
    activeTab,
    changeLogEntry,
    discussionMessage,
    setDetailViewOpen,
    setActiveTab,
    setChangeLogEntry,
    setDiscussionMessage,
    isSystemTagged,
    handleViewDetails,
    handleAction,
    handleAddChangeLogEntry,
    handleAddDiscussionMessage,
    handleSelectResponseTemplate
  };
};
