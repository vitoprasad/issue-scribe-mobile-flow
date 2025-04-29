
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
  ResponsiveContainer,
} from 'recharts';
import { costBySubsystem } from '@/data/mockCostRiskData';
import { formatCurrency } from '@/utils/formatters';

const costConfig = {
  cost: {
    label: 'Cost at Risk',
    color: '#8B5CF6',
  }
};

export const CostBySubsystemChart = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Cost by Subsystem</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64" config={costConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costBySubsystem} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <YAxis type="category" dataKey="name" />
              <Tooltip 
                content={({ payload, active }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-md">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm">{formatCurrency(data.cost)}</p>
                        <p className="text-xs text-muted-foreground">{data.percentage}% of total</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="cost" fill="#8B5CF6" name="Cost at Risk" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
