
import React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProgramRiskSummaryProps {
  sidebarVariant?: boolean;
}

export const ProgramRiskSummary = ({ sidebarVariant = false }: ProgramRiskSummaryProps) => {
  const { toast } = useToast();

  const handleRiskLevelClick = (level: string) => {
    toast({
      title: `${level} Risk Items`,
      description: `Viewing all ${level.toLowerCase()} risk items across the program.`,
    });
    
    // In a real app, this would filter the table or navigate to a filtered view
    console.log(`${level} risk level clicked`);
  };

  if (sidebarVariant) {
    return (
      <div className="p-2 rounded-md border bg-slate-50/80 flex items-center space-x-2 cursor-pointer hover:bg-slate-100 transition-colors">
        <div className="p-1.5 rounded-full bg-primary/10">
          <PieChart className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-xs font-medium">Risk Summary</h3>
          <div className="grid grid-cols-3 gap-1 mt-1">
            <div 
              className="text-xs cursor-pointer hover:bg-slate-200 rounded px-1 py-0.5"
              onClick={() => handleRiskLevelClick('High')}
            >
              <span className="block font-semibold text-destructive text-[11px]">2</span>
              <span className="text-muted-foreground text-[9px]">High</span>
            </div>
            <div 
              className="text-xs cursor-pointer hover:bg-slate-200 rounded px-1 py-0.5"
              onClick={() => handleRiskLevelClick('Medium')}
            >
              <span className="block font-semibold text-amber-500 text-[11px]">2</span>
              <span className="text-muted-foreground text-[9px]">Med</span>
            </div>
            <div 
              className="text-xs cursor-pointer hover:bg-slate-200 rounded px-1 py-0.5"
              onClick={() => handleRiskLevelClick('Low')}
            >
              <span className="block font-semibold text-green-600 text-[11px]">2</span>
              <span className="text-muted-foreground text-[9px]">Low</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-lg border bg-slate-50 flex items-center space-x-4 cursor-pointer hover:bg-slate-100 transition-colors">
      <div className="p-2 rounded-full bg-primary/10">
        <PieChart className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium">Risk Summary</h3>
        <div className="grid grid-cols-3 gap-1 mt-1">
          <div 
            className="text-xs cursor-pointer hover:bg-slate-200 rounded px-1 py-0.5"
            onClick={() => handleRiskLevelClick('High')}
          >
            <span className="block font-semibold text-destructive">2</span>
            <span className="text-muted-foreground text-[10px]">High</span>
          </div>
          <div 
            className="text-xs cursor-pointer hover:bg-slate-200 rounded px-1 py-0.5"
            onClick={() => handleRiskLevelClick('Medium')}
          >
            <span className="block font-semibold text-amber-500">2</span>
            <span className="text-muted-foreground text-[10px]">Med</span>
          </div>
          <div 
            className="text-xs cursor-pointer hover:bg-slate-200 rounded px-1 py-0.5"
            onClick={() => handleRiskLevelClick('Low')}
          >
            <span className="block font-semibold text-green-600">2</span>
            <span className="text-muted-foreground text-[10px]">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};
