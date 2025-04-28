
import React from 'react';
import { ExecutiveDashboardHeader } from '@/components/ExecutiveDashboardHeader';
import MainNavigation from '@/components/MainNavigation';
import { TopRiskContributors } from '@/components/dashboard/TopRiskContributors';
import { RiskTrendOverTime } from '@/components/dashboard/RiskTrendOverTime';
import { SubsystemRiskBreakdown } from '@/components/dashboard/SubsystemRiskBreakdown';
import { ProgramHealthStatus } from '@/components/dashboard/ProgramHealthStatus';
import { AIRecommendations } from '@/components/dashboard/AIRecommendations';

const ExecutiveDashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainNavigation />
      <ExecutiveDashboardHeader />
      <div className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <ProgramHealthStatus />
          </div>
          <div className="lg:col-span-7">
            <TopRiskContributors />
          </div>
          <div className="lg:col-span-12">
            <RiskTrendOverTime />
          </div>
          <div className="lg:col-span-6">
            <SubsystemRiskBreakdown />
          </div>
          <div className="lg:col-span-6">
            <AIRecommendations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboardPage;
