
import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export const CostRiskMetric = () => {
  return (
    <div className="p-3 rounded-lg border bg-slate-50 flex items-center space-x-4">
      <div className="p-2 rounded-full bg-primary/10">
        <DollarSign className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium">Total Cost at Risk</h3>
        <p className="text-lg font-bold">$99,500</p>
      </div>
    </div>
  );
};
