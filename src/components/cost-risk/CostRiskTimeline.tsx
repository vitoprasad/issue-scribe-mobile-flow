
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { costRiskTimeline, costChartConfig } from '@/data/mockCostRiskData';
import { formatCurrency } from '@/utils/formatters';

export const CostRiskTimeline = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Cost Risk Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64" config={costChartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={costRiskTimeline}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value/1000)}k`} />
              <Tooltip 
                formatter={(value) => [`${formatCurrency(value)}`, ""]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="forecasted"
                name="Forecasted Cost"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual Cost"
                stroke="#ea384c"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
