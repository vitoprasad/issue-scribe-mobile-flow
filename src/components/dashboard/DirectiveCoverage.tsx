
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface DirectiveCoverageProps {
  totalHighRisks: number;
  coveredHighRisks: number;
  coveragePercentage: number;
}

export const DirectiveCoverage: React.FC<DirectiveCoverageProps> = ({
  totalHighRisks,
  coveredHighRisks,
  coveragePercentage
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium">High Risk Coverage</span>
        </div>
        <span className="text-lg font-semibold">
          {coveredHighRisks}/{totalHighRisks}
        </span>
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-slate-500">Coverage</span>
          <span className="text-sm font-medium">{coveragePercentage}%</span>
        </div>
        <Progress 
          value={coveragePercentage} 
          className="h-2"
        />
      </div>
      
      <div className={`p-3 rounded-lg border ${
        coveragePercentage < 50
          ? 'bg-red-50 border-red-200 text-red-700'
          : coveragePercentage < 85
            ? 'bg-amber-50 border-amber-200 text-amber-700'
            : 'bg-green-50 border-green-200 text-green-700'
      }`}>
        <div className="flex items-start space-x-2">
          {coveragePercentage < 50 ? (
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-medium mb-1">
              {coveragePercentage < 50
                ? 'Low Coverage Alert'
                : coveragePercentage < 85
                  ? 'Moderate Coverage'
                  : 'Good Coverage'}
            </p>
            <p className="text-xs">
              {coveragePercentage < 50
                ? 'Less than half of your high-risk items have executive directives. Consider adding more targeted directives.'
                : coveragePercentage < 85
                  ? 'Your directive coverage is adequate but could be improved. Review uncovered high-risk items.'
                  : 'Excellent directive coverage. Continue monitoring for new high-risk items.'}
            </p>
          </div>
        </div>
      </div>
      
      {coveredHighRisks < totalHighRisks && (
        <div className="text-xs text-slate-500 italic">
          {totalHighRisks - coveredHighRisks} high-risk items are not addressed by any directive
        </div>
      )}
    </div>
  );
};
