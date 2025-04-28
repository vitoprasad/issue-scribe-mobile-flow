
import React from 'react';
import { ManagerDashboardHeader } from './ManagerDashboardHeader';
import { RepairActionsTable } from './RepairActionsTable';
import { DashboardFilters } from './DashboardFilters';
import { Card } from '@/components/ui/card';
import { ProgramRiskSummary } from './ProgramRiskSummary';
import { CostRiskMetric } from './CostRiskMetric';
import { SidebarInset } from '@/components/ui/sidebar';
import { ExecutiveFeedbackPanel } from './ExecutiveFeedbackPanel';
import { executiveFeedback } from '@/data/mockFeedbackData';

export const DashboardContent = () => {
  return (
    <SidebarInset className="p-6 overflow-auto">
      <ManagerDashboardHeader />
      
      {/* Executive Feedback Panel */}
      <div className="mb-6">
        <ExecutiveFeedbackPanel feedback={executiveFeedback} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-4 col-span-2">
          <DashboardFilters />
        </Card>
        <Card className="p-4">
          <h3 className="font-medium text-sm mb-2 text-muted-foreground">Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <CostRiskMetric />
            <ProgramRiskSummary />
          </div>
        </Card>
      </div>
      
      <div className="rounded-lg border">
        <RepairActionsTable />
      </div>
    </SidebarInset>
  );
};
