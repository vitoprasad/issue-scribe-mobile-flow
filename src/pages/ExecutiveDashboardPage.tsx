
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CircleAlert, CircleCheck, TrendingDown, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ExecutiveDashboardHeader } from '@/components/ExecutiveDashboardHeader';

// Define the possible program status values
type ProgramStatus = "red" | "yellow" | "green";

// Sample data for charts and tables
const programStatus: ProgramStatus = "yellow"; // Can be "red", "yellow", "green"

const subsystemRiskData = [
  { name: 'Propulsion', high: 12, medium: 8, low: 5 },
  { name: 'Avionics', high: 5, medium: 15, low: 10 },
  { name: 'Structure', high: 8, medium: 10, low: 20 },
  { name: 'Power', high: 15, medium: 5, low: 5 },
  { name: 'Thermal', high: 3, medium: 12, low: 8 },
];

const topRiskContributors = [
  { id: 'R-001', subsystem: 'Power', severity: 'High', impact: 'Critical', trend: 'up' },
  { id: 'R-023', subsystem: 'Propulsion', severity: 'High', impact: 'High', trend: 'up' },
  { id: 'R-015', subsystem: 'Avionics', severity: 'Medium', impact: 'High', trend: 'stable' },
  { id: 'R-034', subsystem: 'Structure', severity: 'High', impact: 'Medium', trend: 'down' },
  { id: 'R-009', subsystem: 'Thermal', severity: 'Medium', impact: 'Medium', trend: 'up' },
];

const riskTimeData = [
  { month: 'Jan', high: 25, medium: 40, low: 35 },
  { month: 'Feb', high: 30, medium: 45, low: 25 },
  { month: 'Mar', high: 40, medium: 35, low: 25 },
  { month: 'Apr', high: 35, medium: 30, low: 35 },
  { month: 'May', high: 25, medium: 35, low: 40 },
  { month: 'Jun', high: 30, medium: 30, low: 40 },
];

// Chart configurations
const chartConfig = {
  high: {
    label: 'High Risk',
    color: '#ea384c',
  },
  medium: {
    label: 'Medium Risk',
    color: '#FFC107',
  },
  low: {
    label: 'Low Risk',
    color: '#4CAF50',
  },
};

const ExecutiveDashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ExecutiveDashboardHeader />
      
      <div className="flex-1 p-6">
        {/* Program Health Status Bar */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Program Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="flex-1 bg-gray-200 h-8 rounded-md overflow-hidden flex">
                <div 
                  className={`h-full ${
                    programStatus === 'red' 
                      ? 'bg-red-500' 
                      : programStatus === 'yellow' 
                        ? 'bg-yellow-400' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: '60%' }}
                ></div>
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  {programStatus === 'red' ? (
                    <CircleAlert className="text-red-500 mr-2" />
                  ) : programStatus === 'yellow' ? (
                    <CircleAlert className="text-yellow-400 mr-2" />
                  ) : (
                    <CircleCheck className="text-green-500 mr-2" />
                  )}
                  <span className="font-medium">
                    {programStatus === 'red' 
                      ? 'Critical Risk Level' 
                      : programStatus === 'yellow' 
                        ? 'Elevated Risk Level' 
                        : 'Acceptable Risk Level'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {programStatus === 'red' 
                    ? 'Immediate action required' 
                    : programStatus === 'yellow' 
                      ? 'Monitor closely and develop mitigation plans' 
                      : 'Continue standard monitoring'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middle Section - Risk Breakdown and Top Contributors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Subsystem Risk Breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Subsystem Risk Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-72" config={chartConfig}>
                <BarChart data={subsystemRiskData}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Legend />
                  <Bar dataKey="high" stackId="a" fill="#ea384c" name="High Risk" />
                  <Bar dataKey="medium" stackId="a" fill="#FFC107" name="Medium Risk" />
                  <Bar dataKey="low" stackId="a" fill="#4CAF50" name="Low Risk" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top 5 Risk Contributors */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Top 5 Risk Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Subsystem</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topRiskContributors.map((risk) => (
                    <TableRow key={risk.id}>
                      <TableCell className="font-medium">{risk.id}</TableCell>
                      <TableCell>{risk.subsystem}</TableCell>
                      <TableCell>
                        <span 
                          className={`px-2 py-1 rounded text-xs ${
                            risk.severity === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : risk.severity === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {risk.severity}
                        </span>
                      </TableCell>
                      <TableCell>{risk.impact}</TableCell>
                      <TableCell>
                        {risk.trend === 'up' ? (
                          <TrendingUp className="text-red-500" size={18} />
                        ) : risk.trend === 'down' ? (
                          <TrendingDown className="text-green-500" size={18} />
                        ) : (
                          <span className="inline-block w-4 h-0.5 bg-gray-400"></span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Risk Over Time */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Risk Trend Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-64" config={chartConfig}>
              <LineChart data={riskTimeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="high"
                  name="High Risk"
                  stroke="#ea384c"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="medium"
                  name="Medium Risk"
                  stroke="#FFC107"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="low"
                  name="Low Risk"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveDashboardPage;
