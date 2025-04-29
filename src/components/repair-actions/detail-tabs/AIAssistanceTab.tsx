
import React from 'react';
import { RepairAction } from '../../approval-requests/types';
import { BarChart3, DollarSign, Clock, Package, ThumbsUp } from 'lucide-react';

interface AIAssistanceTabProps {
  repairAction: RepairAction;
}

export const AIAssistanceTab: React.FC<AIAssistanceTabProps> = ({ repairAction }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="border rounded-md p-4">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 text-blue-700 p-1 rounded mr-2">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h3 className="font-medium">AI Risk Assessment</h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Confidence Score:</span>
            <div className={`font-bold text-sm ${
              (repairAction.aiConfidence || 0) >= 90 ? 'text-green-600' : 
              (repairAction.aiConfidence || 0) >= 75 ? 'text-amber-600' : 
              'text-red-600'
            }`}>
              {repairAction.aiConfidence || 85}%
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {(repairAction.aiConfidence || 85) >= 90 ? 
              "AI has high confidence in this repair action based on historical data and similar issues." : 
              (repairAction.aiConfidence || 85) >= 75 ?
              "AI has moderate confidence in this approach. Consider reviewing alternatives." :
              "AI has low confidence in this approach. Recommended to explore other solutions."
            }
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 text-purple-700 p-1 rounded mr-2">
              <DollarSign className="h-4 w-4" />
            </div>
            <h3 className="font-medium">Cost Analysis</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Estimated Cost Savings:</span>
              <span className="font-medium">${repairAction.costSavings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Typical Savings (similar issues):</span>
              <span className="font-medium">$15,000 - $30,000</span>
            </div>
            <div className="flex justify-between text-xs mt-3">
              <span className={repairAction.costSavings > 20000 ? "text-green-600" : "text-amber-600"}>
                {repairAction.costSavings > 20000 ? 
                  "Above average savings compared to similar actions" : 
                  "Below average savings compared to similar actions"}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-md p-4">
          <div className="flex items-center mb-3">
            <div className="bg-amber-100 text-amber-700 p-1 rounded mr-2">
              <Clock className="h-4 w-4" />
            </div>
            <h3 className="font-medium">Time Impact Analysis</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Time Savings:</span>
              <span className="font-medium">{repairAction.timeSavings} hours</span>
            </div>
            <div className="flex justify-between">
              <span>Production Downtime Impact:</span>
              <span className="font-medium">Minimal</span>
            </div>
            <div className="flex justify-between">
              <span>Schedule Risk:</span>
              <span className={`font-medium ${repairAction.riskLevel === 'High' ? 'text-red-600' : repairAction.riskLevel === 'Medium' ? 'text-amber-600' : 'text-green-600'}`}>
                {repairAction.riskLevel}
              </span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 text-green-700 p-1 rounded mr-2">
              <Package className="h-4 w-4" />
            </div>
            <h3 className="font-medium">Similar Issues ({repairAction.similarIssues?.length || 0})</h3>
          </div>
          {repairAction.similarIssues && repairAction.similarIssues.length > 0 ? (
            <div className="space-y-2">
              {repairAction.similarIssues.map(issue => (
                <div key={issue} className="flex justify-between text-sm border-b pb-1 last:border-0 last:pb-0">
                  <span className="text-blue-600">{issue}</span>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs">Successful</span>
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 pt-2">
                {repairAction.similarIssues.length} similar issues found with {repairAction.similarIssues.length} successful resolutions (100% success rate)
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              No similar issues found in the database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
