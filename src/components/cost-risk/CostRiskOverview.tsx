
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, AlertTriangle, TrendingDown, BarChart } from 'lucide-react';
import { costRiskMetrics } from '@/data/mockCostRiskData';
import { formatCurrency } from '@/utils/formatters';

export const CostRiskOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Cost at Risk</p>
              <h3 className="text-2xl font-bold">{formatCurrency(costRiskMetrics.totalAtRisk)}</h3>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical Components</p>
              <h3 className="text-2xl font-bold">{costRiskMetrics.criticalComponents}</h3>
            </div>
            <div className="p-2 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Projected Overrun</p>
              <h3 className="text-2xl font-bold text-destructive">{formatCurrency(costRiskMetrics.projectedOverrun)}</h3>
            </div>
            <div className="p-2 bg-destructive/10 rounded-full">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Potential Savings</p>
              <h3 className="text-2xl font-bold text-green-600">{formatCurrency(costRiskMetrics.potentialSavings)}</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <BarChart className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
