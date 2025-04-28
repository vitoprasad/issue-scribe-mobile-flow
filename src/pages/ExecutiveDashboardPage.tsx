
import React from 'react';
import { ExecutiveDashboardHeader } from '@/components/ExecutiveDashboardHeader';
import MainNavigation from '@/components/MainNavigation';
import { TopRiskContributors } from '@/components/dashboard/TopRiskContributors';
import { RiskTrendOverTime } from '@/components/dashboard/RiskTrendOverTime';
import { SubsystemRiskBreakdown } from '@/components/dashboard/SubsystemRiskBreakdown';
import { ProgramHealthStatus } from '@/components/dashboard/ProgramHealthStatus';
import { AIRecommendations } from '@/components/dashboard/AIRecommendations';
import { 
  ProgramStatus, 
  RiskItem, 
  SubsystemRisk, 
  RiskTimeData, 
  AISuggestion 
} from '@/types/dashboard';

const ExecutiveDashboardPage = () => {
  // Sample data for demonstration
  const programStatus: ProgramStatus = "yellow";
  
  const topRisks: RiskItem[] = [
    { id: "R-001", subsystem: "Propulsion", severity: "High", impact: "Schedule", trend: "up" },
    { id: "R-002", subsystem: "Avionics", severity: "Medium", impact: "Cost", trend: "stable" },
    { id: "R-003", subsystem: "Structural", severity: "Low", impact: "Performance", trend: "down" },
    { id: "R-004", subsystem: "Life Support", severity: "High", impact: "Safety", trend: "up" },
    { id: "R-005", subsystem: "Power", severity: "Medium", impact: "Cost", trend: "stable" }
  ];
  
  const riskTrendData: RiskTimeData[] = [
    { month: "Jan", high: 5, medium: 8, low: 12 },
    { month: "Feb", high: 7, medium: 10, low: 10 },
    { month: "Mar", high: 8, medium: 7, low: 9 },
    { month: "Apr", high: 6, medium: 9, low: 11 },
    { month: "May", high: 9, medium: 8, low: 8 },
    { month: "Jun", high: 7, medium: 6, low: 10 }
  ];
  
  const subsystemData: SubsystemRisk[] = [
    { name: "Propulsion", high: 3, medium: 2, low: 4 },
    { name: "Avionics", high: 2, medium: 3, low: 5 },
    { name: "Structural", high: 1, medium: 5, low: 6 },
    { name: "Life Support", high: 4, medium: 2, low: 3 },
    { name: "Power", high: 2, medium: 4, low: 5 }
  ];
  
  const aiSuggestions: AISuggestion[] = [
    {
      id: "AI-001",
      title: "Evaluate alternate bearing suppliers",
      description: "Based on recurring issues with current supplier, consider evaluating alternatives with better quality control.",
      impact: "high",
      category: "risk",
      actionable: true
    },
    {
      id: "AI-002",
      title: "Update test procedures for cooling systems",
      description: "Current procedures may miss intermittent issues. Consider adding thermal cycling tests.",
      impact: "medium",
      category: "process",
      actionable: true
    },
    {
      id: "AI-003",
      title: "Monitor rising material costs",
      description: "Detected 15% increase in raw material costs over last quarter that may impact program budget.",
      impact: "medium",
      category: "resource",
      actionable: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainNavigation />
      <ExecutiveDashboardHeader />
      <div className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <ProgramHealthStatus status={programStatus} />
          </div>
          <div className="lg:col-span-7">
            <TopRiskContributors risks={topRisks} />
          </div>
          <div className="lg:col-span-12">
            <RiskTrendOverTime data={riskTrendData} />
          </div>
          <div className="lg:col-span-6">
            <SubsystemRiskBreakdown data={subsystemData} />
          </div>
          <div className="lg:col-span-6">
            <AIRecommendations suggestions={aiSuggestions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboardPage;
