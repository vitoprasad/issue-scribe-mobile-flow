
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { RepairAction } from '../../approval-requests/types';
import { getRiskBadge } from '../utils';

interface DetailsTabProps {
  repairAction: RepairAction;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({ repairAction }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-gray-500">Repair Action Information</h3>
          <div className="mt-2 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">ID:</span>
              <span>{repairAction.id}</span>
            </div>
            {repairAction.submittedBy && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Submitted By:</span>
                <span>{repairAction.submittedBy}</span>
              </div>
            )}
            {repairAction.submissionDate && (
              <div className="flex justify-between">
                <span className="text-sm font-medium">Submission Date:</span>
                <span>{repairAction.submissionDate}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm font-medium">Risk Level:</span>
              <Badge variant={getRiskBadge(repairAction.riskLevel) as any} className="font-medium">
                {repairAction.riskLevel}
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
                {repairAction.systems.map((system) => (
                  <Badge key={system} variant="outline" className="bg-blue-50">
                    {system}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium block mb-1">Affected Parts:</span>
              <div className="flex flex-wrap gap-1">
                {repairAction.parts.map((part) => (
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
              <span className="text-sm font-medium">Cost Savings:</span>
              <span className="font-medium">${repairAction.costSavings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Time Savings:</span>
              <span>{repairAction.timeSavings} hours</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm text-gray-500">Suggested Action</h3>
          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
            {repairAction.suggestedAction}
          </div>
        </div>
        
        {repairAction.notes && (
          <div>
            <h3 className="font-medium text-sm text-gray-500">Additional Notes</h3>
            <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
              {repairAction.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
