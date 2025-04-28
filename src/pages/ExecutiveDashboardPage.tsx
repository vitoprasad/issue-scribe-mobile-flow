
import React from 'react';
import { ExecutiveDashboardHeader } from '@/components/ExecutiveDashboardHeader';
import { ProgramHealthStatus } from '@/components/dashboard/ProgramHealthStatus';
import { SubsystemRiskBreakdown } from '@/components/dashboard/SubsystemRiskBreakdown';
import { TopRiskContributors } from '@/components/dashboard/TopRiskContributors';
import { RiskTrendOverTime } from '@/components/dashboard/RiskTrendOverTime';
import { 
  programStatus, 
  subsystemRiskData, 
  topRiskContributors, 
  riskTimeData 
} from '@/data/mockDashboardData';

const ExecutiveDashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ExecutiveDashboardHeader />
      
      <div className="flex-1 p-6">
        {/* Program Health Status Bar */}
        <ProgramHealthStatus status={programStatus} />

        {/* Middle Section - Risk Breakdown and Top Contributors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Subsystem Risk Breakdown */}
          <SubsystemRiskBreakdown data={subsystemRiskData} />

          {/* Top 5 Risk Contributors */}
          <TopRiskContributors risks={topRiskContributors} />
        </div>

        {/* Bottom Section - Risk Over Time */}
        <RiskTrendOverTime data={riskTimeData} />
      </div>
    </div>
  );
};

export default ExecutiveDashboardPage;
