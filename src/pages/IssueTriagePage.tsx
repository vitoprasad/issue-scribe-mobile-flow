
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { IssueTriageProvider } from '@/contexts/IssueTriageContext';
import { IssueTriageSidebar } from '@/components/issue-triage/IssueTriageSidebar';
import { AIClustersList } from '@/components/issue-triage/AIClustersList';
import { ManualClustersList } from '@/components/issue-triage/ManualClustersList';
import { StandardRepairsList } from '@/components/issue-triage/StandardRepairsList';
import { ContainmentsList } from '@/components/issue-triage/ContainmentsList';
import { EditClusterDialog } from '@/components/issue-triage/dialogs/EditClusterDialog';
import { RejectClusterDialog } from '@/components/issue-triage/dialogs/RejectClusterDialog';
import { SubmitForApprovalDialog } from '@/components/issue-triage/dialogs/SubmitForApprovalDialog';
import { ChangelogDialog } from '@/components/issue-triage/dialogs/ChangelogDialog';
import { CreateManualClusterDialog } from '@/components/issue-triage/dialogs/CreateManualClusterDialog';

const IssueTriagePage = () => {
  return (
    <IssueTriageProvider>
      <div className="flex h-screen bg-gray-50">
        <IssueTriageSidebar />
        <div className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="clusters" className="w-full">
            <TabsList>
              <TabsTrigger value="clusters">AI-Clustered Issues</TabsTrigger>
              <TabsTrigger value="manual-clusters">Manual Clusters</TabsTrigger>
              <TabsTrigger value="standard-repairs">Standard Repairs</TabsTrigger>
              <TabsTrigger value="containments">Containments & Escalations</TabsTrigger>
            </TabsList>
            <TabsContent value="clusters"><AIClustersList /></TabsContent>
            <TabsContent value="manual-clusters"><ManualClustersList /></TabsContent>
            <TabsContent value="standard-repairs"><StandardRepairsList /></TabsContent>
            <TabsContent value="containments"><ContainmentsList /></TabsContent>
          </Tabs>
        </div>
        
        {/* Dialog components */}
        <EditClusterDialog />
        <RejectClusterDialog />
        <SubmitForApprovalDialog />
        <ChangelogDialog />
        <CreateManualClusterDialog />
      </div>
    </IssueTriageProvider>
  );
};

export default IssueTriagePage;
