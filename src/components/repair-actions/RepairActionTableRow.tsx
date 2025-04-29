
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Pencil, FileText, Tag } from 'lucide-react';
import { RepairAction } from '../approval-requests/types';

interface RepairActionTableRowProps {
  item: RepairAction;
  isSystemTagged: (system: string) => boolean;
  getRiskBadge: (risk: string) => React.ReactNode;
  onViewDetails: (item: RepairAction) => void;
  onAction: (id: string, action: 'approve' | 'modify' | 'reject') => void;
}

export const RepairActionTableRow: React.FC<RepairActionTableRowProps> = ({
  item,
  isSystemTagged,
  getRiskBadge,
  onViewDetails,
  onAction
}) => {
  return (
    <TableRow className={item.systems.some(isSystemTagged) ? "bg-blue-50" : ""}>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          {item.parts.map((part, index) => (
            <Badge key={index} variant="outline" className="justify-start max-w-fit">
              {part}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          {item.systems.map((system, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={`justify-start max-w-fit flex items-center gap-1 ${
                isSystemTagged(system) 
                  ? "bg-blue-100 text-blue-800 border-blue-300" 
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {isSystemTagged(system) && <Tag className="h-3 w-3" />}
              {system}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell>{getRiskBadge(item.riskLevel)}</TableCell>
      <TableCell>${item.costSavings.toLocaleString()}</TableCell>
      <TableCell>{item.timeSavings} hrs</TableCell>
      <TableCell className="max-w-[300px]">{item.suggestedAction}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewDetails(item)}
            title="View details"
          >
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="sr-only">View details</span>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => onAction(item.id, 'approve')}
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Approve</span>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
            onClick={() => onAction(item.id, 'modify')}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Modify</span>
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-red-600 text-red-600 hover:bg-red-50"
            onClick={() => onAction(item.id, 'reject')}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Reject</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
