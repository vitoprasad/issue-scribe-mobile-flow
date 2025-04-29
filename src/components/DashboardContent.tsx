
import React from 'react';
import { ManagerDashboardHeader } from './ManagerDashboardHeader';
import { RepairActionsTable } from './RepairActionsTable';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarInset } from '@/components/ui/sidebar';
import { ExecutiveFeedbackPanel } from './ExecutiveFeedbackPanel';
import { AIRecommendations } from './dashboard/AIRecommendations';
import { executiveFeedback } from '@/data/mockFeedbackData';
import { aiSuggestions } from '@/data/mockDashboardData';
import { ArrowDown } from 'lucide-react';

export const DashboardContent = () => {
  return (
    <SidebarInset className="p-6 overflow-auto">
      <ManagerDashboardHeader />
      
      {/* Executive Feedback Panel - now in readOnly mode */}
      <div className="mb-6">
        <ExecutiveFeedbackPanel 
          feedback={executiveFeedback} 
          readOnly={true} // Enable readOnly mode for Manager Dashboard
        />
      </div>
      
      {/* AI Strategic Recommendations */}
      <div className="mb-6">
        <AIRecommendations suggestions={aiSuggestions} />
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-medium">AI-Suggested Repair Actions</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 bg-blue-50 rounded-sm inline-block"></span>
                <span>Highlighted rows have executive directive tags</span>
              </span>
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
