
import React from 'react';
import { ApprovalRequest } from '../types';
import { BarChart3, DollarSign, Clock, Package, ThumbsUp } from 'lucide-react';

interface AIAssistanceTabProps {
  request: ApprovalRequest;
}

export const AIAssistanceTab: React.FC<AIAssistanceTabProps> = ({ request }) => {
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
              (request.aiConfidence || 0) >= 90 ? 'text-green-600' : 
              (request.aiConfidence || 0) >= 75 ? 'text-amber-600' : 
              'text-red-600'
            }`}>
              {request.aiConfidence}%
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {request.aiConfidence && request.aiConfidence >= 90 ? 
              "AI has high confidence in this repair approach based on historical data and similar issues." : 
              request.aiConfidence && request.aiConfidence >= 75 ?
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
              <span>Estimated Cost:</span>
              <span className="font-medium">${request.costEstimate.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Typical Cost (similar issues):</span>
              <span className="font-medium">$18,000 - $28,000</span>
            </div>
            <div className="flex justify-between text-xs mt-3">
              <span className={request.costEstimate > 20000 ? "text-amber-600" : "text-green-600"}>
                {request.costEstimate > 20000 ? 
                  "Above average cost compared to similar issues" : 
                  "Within typical cost range for similar issues"}
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
              <span>Implementation Time:</span>
              <span className="font-medium">{request.timeEstimate} hours</span>
            </div>
            <div className="flex justify-between">
              <span>Production Downtime Impact:</span>
              <span className="font-medium">Moderate</span>
            </div>
            <div className="flex justify-between">
              <span>Schedule Risk:</span>
              <span className={`font-medium ${request.riskLevel === 'High' ? 'text-red-600' : request.riskLevel === 'Medium' ? 'text-amber-600' : 'text-green-600'}`}>
                {request.riskLevel}
              </span>
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <div className="flex items-center mb-3">
            <div className="bg-green-100 text-green-700 p-1 rounded mr-2">
              <Package className="h-4 w-4" />
            </div>
            <h3 className="font-medium">Similar Issues ({request.similarIssues?.length || 0})</h3>
          </div>
          {request.similarIssues && request.similarIssues.length > 0 ? (
            <div className="space-y-2">
              {request.similarIssues.map(issue => (
                <div key={issue} className="flex justify-between text-sm border-b pb-1 last:border-0 last:pb-0">
                  <span className="text-blue-600">{issue}</span>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs">Successful</span>
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 pt-2">
                {request.similarIssues.length} similar issues found with {request.similarIssues.length} successful resolutions (100% success rate)
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
