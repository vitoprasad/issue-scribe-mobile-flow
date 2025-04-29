
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, FileText } from 'lucide-react';
import { ApprovalRequest } from './types';
import { formatDate, getRiskBadge, getTypeLabel } from './utils';

interface RequestsTableProps {
  requests: ApprovalRequest[];
  onViewDetails: (request: ApprovalRequest) => void;
  onApprove: (request: ApprovalRequest) => void;
  onReject: (request: ApprovalRequest) => void;
}

export const RequestsTable: React.FC<RequestsTableProps> = ({
  requests,
  onViewDetails,
  onApprove,
  onReject
}) => {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[110px]">Request ID</TableHead>
            <TableHead className="w-[110px]">Cluster ID</TableHead>
            <TableHead className="w-[130px]">Type</TableHead>
            <TableHead className="w-[120px]">Risk Level</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[130px]">Submitted By</TableHead>
            <TableHead className="w-[130px]">Submission Date</TableHead>
            <TableHead className="w-[140px]">Cost Estimate</TableHead>
            <TableHead className="w-[180px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell>{request.clusterId}</TableCell>
              <TableCell>
                <Badge className={getTypeLabel(request.requestType)}>
                  {request.requestType}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getRiskBadge(request.riskLevel) as any} className="font-medium">
                  {request.riskLevel}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[250px] truncate" title={request.title}>
                {request.title}
              </TableCell>
              <TableCell>{request.submittedBy}</TableCell>
              <TableCell>{formatDate(request.submissionDate)}</TableCell>
              <TableCell>${request.costEstimate.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onViewDetails(request)}
                    title="View details"
                  >
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="sr-only">View details</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => onApprove(request)}
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Approve</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() => onReject(request)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Reject</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
