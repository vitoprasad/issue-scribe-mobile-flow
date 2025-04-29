
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ApprovalRequest } from '../types';
import { formatDate, getRiskBadge, getTypeLabel } from '../utils';

interface DetailsTabProps {
  request: ApprovalRequest;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({ request }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-gray-500">Cluster Information</h3>
          <div className="mt-2 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Cluster ID:</span>
              <span>{request.clusterId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Submitted By:</span>
              <span>{request.submittedBy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Submission Date:</span>
              <span>{formatDate(request.submissionDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Risk Level:</span>
              <Badge variant={getRiskBadge(request.riskLevel) as any} className="font-medium">
                {request.riskLevel}
              </Badge>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm text-gray-500">Systems & Parts</h3>
          <div className="mt-2">
            <div className="mb-2">
              <span className="text-sm font-medium block mb-1">Affected Systems:</span>
              <div className="flex flex-wrap gap-1">
                {request.systems.map((system) => (
                  <Badge key={system} variant="outline" className="bg-blue-50">
                    {system}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium block mb-1">Affected Parts:</span>
              <div className="flex flex-wrap gap-1">
                {request.parts.map((part) => (
                  <Badge key={part} variant="outline" className="bg-amber-50">
                    {part}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-gray-500">Implementation Details</h3>
          <div className="mt-2 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Cost Estimate:</span>
              <span className="font-medium">${request.costEstimate.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Time Estimate:</span>
              <span>{request.timeEstimate} hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Type:</span>
              <Badge className={getTypeLabel(request.requestType)}>
                {request.requestType}
              </Badge>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm text-gray-500">Notes</h3>
          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
            {request.notes}
          </div>
        </div>
      </div>
    </div>
  );
};
