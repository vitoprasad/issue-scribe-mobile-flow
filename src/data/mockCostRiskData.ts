
// Mock data for cost risk analysis
export const costBySubsystem = [
  { name: 'Propulsion', cost: 32500, percentage: 33 },
  { name: 'Avionics', cost: 28700, percentage: 29 },
  { name: 'Structure', cost: 18300, percentage: 18 },
  { name: 'Power', cost: 12500, percentage: 13 },
  { name: 'Thermal', cost: 7500, percentage: 7 },
];

export const costRiskTimeline = [
  { month: 'Jan', forecasted: 65000, actual: 70000 },
  { month: 'Feb', forecasted: 70000, actual: 75000 },
  { month: 'Mar', forecasted: 75000, actual: 82000 },
  { month: 'Apr', forecasted: 80000, actual: 90000 },
  { month: 'May', forecasted: 85000, actual: 95000 },
  { month: 'Jun', forecasted: 90000, actual: 99500 },
];

export const costRiskContributors = [
  { id: 'CR-001', component: 'Main Thruster', estimated: 22000, probability: 'High', impact: 'Critical' },
  { id: 'CR-002', component: 'Control System', estimated: 18500, probability: 'Medium', impact: 'High' },
  { id: 'CR-003', component: 'Power Converter', estimated: 15000, probability: 'High', impact: 'Medium' },
  { id: 'CR-004', component: 'Framework Joints', estimated: 12000, probability: 'Medium', impact: 'Medium' },
  { id: 'CR-005', component: 'Cooling System', estimated: 8000, probability: 'Low', impact: 'High' },
];

export const costRiskMetrics = {
  totalAtRisk: 99500,
  criticalComponents: 3,
  projectedOverrun: 15800,
  potentialSavings: 22400,
};

export const costChartConfig = {
  forecasted: {
    label: 'Forecasted Cost',
    color: '#8B5CF6',
  },
  actual: {
    label: 'Actual Cost',
    color: '#ea384c',
  },
};

