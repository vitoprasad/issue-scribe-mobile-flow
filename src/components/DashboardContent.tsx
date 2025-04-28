
import React from 'react';
import { ManagerDashboardHeader } from './ManagerDashboardHeader';
import { RepairActionsTable } from './RepairActionsTable';
import { DashboardFilters } from './DashboardFilters';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgramRiskSummary } from './ProgramRiskSummary';
import { CostRiskMetric } from './CostRiskMetric';
import { SidebarInset } from '@/components/ui/sidebar';
import { ExecutiveFeedbackPanel } from './ExecutiveFeedbackPanel';
import { executiveFeedback } from '@/data/mockFeedbackData';
import { ArrowDown } from 'lucide-react';

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
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-medium">AI-Suggested Repair Actions</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">
              Prioritized based on executive directives
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="rounded-lg border">
        <RepairActionsTable />
      </div>
    </SidebarInset>
  );
};
