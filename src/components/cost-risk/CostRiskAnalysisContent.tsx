
import React from 'react';
import { CostRiskOverview } from './CostRiskOverview';
import { CostBySubsystemChart } from './CostBySubsystemChart';
import { CostRiskTimeline } from './CostRiskTimeline';
import { TopCostContributors } from './TopCostContributors';
import { SidebarInset } from '@/components/ui/sidebar';
import { DashboardFilters } from '@/components/DashboardFilters';
import { Card } from '@/components/ui/card';

export const CostRiskAnalysisContent = () => {
  return (
    <SidebarInset className="p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-industrial-700">Cost Risk Analysis</h1>
        <p className="text-sm text-gray-500">Detailed analysis of financial impact across projects</p>
      </div>
      
      <Card className="p-4 mb-6">
        <DashboardFilters />
      </Card>
      
      <CostRiskOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CostBySubsystemChart />
        <CostRiskTimeline />
      </div>
      
      <TopCostContributors />
    </SidebarInset>
  );
};
