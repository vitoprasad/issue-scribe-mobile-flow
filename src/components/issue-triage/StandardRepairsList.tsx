
import React from 'react';
import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell 
} from '@/components/ui/table';
import { Clock } from 'lucide-react';
import { useIssueTriage } from '@/contexts/IssueTriageContext';
import { filterStandardRepairs } from '@/utils/issue-triage-utils';

export const StandardRepairsList = () => {
  const { 
    standardRepairs,
    filters
  } = useIssueTriage();

  // Apply filters
  const filteredStandardRepairs = filterStandardRepairs(standardRepairs, filters);

  return (
    <div className="bg-white border border-industrial-100 rounded-md shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-industrial-50">
            <TableHead>ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Part Numbers</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead>Approval Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Days Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStandardRepairs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-industrial-500">
                No standard repairs match the current filters
              </TableCell>
            </TableRow>
          ) : (
            filteredStandardRepairs.map((repair) => (
              <TableRow key={repair.id} className="border-b border-industrial-100">
                <TableCell className="font-medium">{repair.id}</TableCell>
                <TableCell>{repair.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {repair.partNumbers.map(part => (
                      <span 
                        key={part} 
                        className="bg-industrial-100 text-industrial-700 text-xs px-2 py-1 rounded"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{repair.approvedBy}</TableCell>
                <TableCell>{repair.approvalDate}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    repair.status === 'Active' ? 'bg-green-100 text-green-700' : 
                    repair.status === 'Expiring Soon' ? 'bg-amber-100 text-amber-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {repair.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-1">
                    <Clock className="h-3 w-3 text-industrial-500" />
                    <span className="font-medium">{repair.daysActive}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
