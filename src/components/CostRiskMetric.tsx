
import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CostRiskMetricProps {
  sidebarVariant?: boolean;
}

export const CostRiskMetric = ({ sidebarVariant = false }: CostRiskMetricProps) => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Cost Risk Breakdown",
      description: "Viewing detailed cost risk analysis across all affected parts and subsystems.",
    });
    
    // In a real app, this would navigate to a detailed view or open a modal
    console.log("Cost risk metric clicked");
  };

  if (sidebarVariant) {
    return (
      <div 
        className="p-2 rounded-md border bg-slate-50/80 flex items-center space-x-2 cursor-pointer hover:bg-slate-100 transition-colors"
        onClick={handleClick}
      >
        <div className="p-1.5 rounded-full bg-primary/10">
          <DollarSign className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-xs font-medium">Total Cost at Risk</h3>
          <p className="text-base font-bold">$99,500</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="p-3 rounded-lg border bg-slate-50 flex items-center space-x-4 cursor-pointer hover:bg-slate-100 transition-colors"
      onClick={handleClick}
    >
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
