
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Ruler } from 'lucide-react';
import { costRiskTimeline, costChartConfig } from '@/data/mockCostRiskData';
import { formatCurrency } from '@/utils/formatters';

export const CostRiskTimeline = () => {
  const formatYAxis = (value: number) => {
    return formatCurrency(value);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Ruler className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg font-medium">Cost Timeline</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={costRiskTimeline}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip formatter={(value: number) => [formatCurrency(value), ""]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="forecasted"
                stroke={costChartConfig.forecasted.color}
                name={costChartConfig.forecasted.label}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke={costChartConfig.actual.color}
                name={costChartConfig.actual.label}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
