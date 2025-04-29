
import React from 'react';
import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell 
} from '@/components/ui/table';
import { Clock, Users } from 'lucide-react';
import { useIssueTriage } from '@/contexts/IssueTriageContext';
import { filterContainments } from '@/utils/issue-triage-utils';

export const ContainmentsList = () => {
  const { 
    containments,
    filters
  } = useIssueTriage();

  // Apply filters
  const filteredContainments = filterContainments(containments, filters);

  return (
    <div className="bg-white border border-industrial-100 rounded-md shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-industrial-50">
            <TableHead>ID</TableHead>
            <TableHead className="w-1/4">Description</TableHead>
            <TableHead>Affected Areas</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Approval Date</TableHead>
            <TableHead>Escalation Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Days Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContainments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-industrial-500">
                No containments or escalations match the current filters
              </TableCell>
            </TableRow>
          ) : (
            filteredContainments.map((containment) => (
              <TableRow key={containment.id} className="border-b border-industrial-100">
                <TableCell className="font-medium">{containment.id}</TableCell>
                <TableCell>{containment.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {containment.affectedAreas.map(area => (
                      <span 
                        key={area} 
                        className="bg-industrial-100 text-industrial-700 text-xs px-2 py-1 rounded"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-industrial-500" />
                    <span>{containment.team}</span>
                  </div>
                </TableCell>
                <TableCell>{containment.approvalDate}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    containment.escalationLevel === 'Critical' ? 'bg-red-100 text-red-700' : 
                    containment.escalationLevel === 'High' ? 'bg-amber-100 text-amber-700' : 
                    containment.escalationLevel === 'Medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {containment.escalationLevel}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    containment.status === 'Active' ? 'bg-green-100 text-green-700' : 
                    containment.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {containment.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-1">
                    <Clock className="h-3 w-3 text-industrial-500" />
                    <span className="font-medium">{containment.daysActive}</span>
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
