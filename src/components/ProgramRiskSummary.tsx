
import React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart } from 'lucide-react';

export const ProgramRiskSummary = () => {
  return (
    <div className="p-3 rounded-lg border bg-slate-50 flex items-center space-x-4">
      <div className="p-2 rounded-full bg-primary/10">
        <PieChart className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium">Risk Summary</h3>
        <div className="grid grid-cols-3 gap-1 mt-1">
          <div className="text-xs">
            <span className="block font-semibold text-destructive">2</span>
            <span className="text-muted-foreground text-[10px]">High</span>
          </div>
          <div className="text-xs">
            <span className="block font-semibold text-amber-500">2</span>
            <span className="text-muted-foreground text-[10px]">Med</span>
          </div>
          <div className="text-xs">
            <span className="block font-semibold text-green-600">2</span>
            <span className="text-muted-foreground text-[10px]">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};
