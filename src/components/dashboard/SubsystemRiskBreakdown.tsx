
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { SubsystemRisk, chartConfig } from '@/types/dashboard';

interface SubsystemRiskBreakdownProps {
  data: SubsystemRisk[];
}

export const SubsystemRiskBreakdown: React.FC<SubsystemRiskBreakdownProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Subsystem Risk Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-72" config={chartConfig}>
          <BarChart data={data}>
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
  );
};
