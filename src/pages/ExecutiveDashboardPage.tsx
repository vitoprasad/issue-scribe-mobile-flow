
import React from 'react';
import { ExecutiveDashboardHeader } from '@/components/ExecutiveDashboardHeader';
import { ProgramHealthStatus } from '@/components/dashboard/ProgramHealthStatus';
import { SubsystemRiskBreakdown } from '@/components/dashboard/SubsystemRiskBreakdown';
import { TopRiskContributors } from '@/components/dashboard/TopRiskContributors';
import { RiskTrendOverTime } from '@/components/dashboard/RiskTrendOverTime';
import { AIRecommendations } from '@/components/dashboard/AIRecommendations';
import { ExecutiveFeedbackPanel } from '@/components/ExecutiveFeedbackPanel';
import { ProgramRiskSummary } from '@/components/ProgramRiskSummary';
import { 
  programStatus, 
  subsystemRiskData, 
  topRiskContributors, 
  riskTimeData,
  aiSuggestions
} from '@/data/mockDashboardData';
import { executiveFeedback } from '@/data/mockFeedbackData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DirectiveCoverage } from '@/components/dashboard/DirectiveCoverage';

const ExecutiveDashboardPage = () => {
  // Calculate the risk coverage metrics
  const totalHighRisks = topRiskContributors.filter(risk => risk.severity === 'High').length;
  const coveredHighRisks = topRiskContributors.filter(
    risk => risk.severity === 'High' && risk.relatedDirectives && risk.relatedDirectives.length > 0
  ).length;
  
  const coveragePercentage = totalHighRisks > 0 
    ? Math.round((coveredHighRisks / totalHighRisks) * 100) 
    : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ExecutiveDashboardHeader />
      
      <div className="flex-1 p-6">
        {/* Program Health Status Bar */}
        <ProgramHealthStatus status={programStatus} />

        {/* Top Section - Executive Directives and Risk Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Executive Directives - Left Column (2/3 width) */}
          <div className="lg:col-span-2">
            <ExecutiveFeedbackPanel feedback={executiveFeedback} />
          </div>
          
          {/* Risk Stats - Right Column (1/3 width) */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Directive Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <DirectiveCoverage 
                  totalHighRisks={totalHighRisks}
                  coveredHighRisks={coveredHighRisks}
                  coveragePercentage={coveragePercentage}
                />
              </CardContent>
            </Card>
            <ProgramRiskSummary />
          </div>
        </div>

        {/* Middle Section - Top Risk Contributors */}
        <div className="mb-6">
          <TopRiskContributors risks={topRiskContributors} />
        </div>

        {/* Bottom Section - Risk Breakdown Charts and AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Subsystem Risk Breakdown */}
          <SubsystemRiskBreakdown data={subsystemRiskData} />

          {/* AI Strategic Recommendations */}
          <AIRecommendations suggestions={aiSuggestions} />
        </div>

        {/* Risk Trend Over Time */}
        <RiskTrendOverTime data={riskTimeData} />
      </div>
    </div>
  );
};

export default ExecutiveDashboardPage;
