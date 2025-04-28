
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IssueTicket } from '@/pages/IssueTicketsPage';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

type SortField = 'timeReported' | 'costImpact' | 'severity';
type SortDirection = 'asc' | 'desc';

export const IssueTicketsTable = ({ 
  onTicketClick 
}: { 
  onTicketClick: (ticket: IssueTicket) => void 
}) => {
  const [sortField, setSortField] = useState<SortField>('timeReported');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="inline h-4 w-4 ml-1" /> : 
      <ArrowDown className="inline h-4 w-4 ml-1" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-destructive text-destructive-foreground hover:bg-destructive/80';
      case 'Medium': return 'bg-amber-500 text-white hover:bg-amber-600';
      case 'Low': return 'bg-green-600 text-white hover:bg-green-700';
      default: return 'bg-slate-500 text-white hover:bg-slate-600';
    }
  };
  
  // Sort the data
  const sortedTickets = [...mockIssueTickets].sort((a, b) => {
    if (sortField === 'timeReported') {
      const dateA = new Date(a.timeReported).getTime();
      const dateB = new Date(b.timeReported).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortField === 'costImpact') {
      return sortDirection === 'asc' ? a.costImpact - b.costImpact : b.costImpact - a.costImpact;
    }
    
    if (sortField === 'severity') {
      const severityMap = { 'Low': 1, 'Medium': 2, 'High': 3 };
      const valA = severityMap[a.severity as keyof typeof severityMap];
      const valB = severityMap[b.severity as keyof typeof severityMap];
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    }
    
    return 0;
  });

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Open Tickets ({mockIssueTickets.length})</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort By <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSort('timeReported')}>
              Time Needs (oldest first)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('costImpact')}>
              Cost Impact (highest first)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('severity')}>
              Severity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead>Ticket ID</TableHead>
            <TableHead>Part Number</TableHead>
            <TableHead>Issue Category</TableHead>
            <TableHead>
              <button 
                className="flex items-center font-medium"
                onClick={() => handleSort('severity')}
              >
                Severity {getSortIcon('severity')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center font-medium"
                onClick={() => handleSort('costImpact')}
              >
                Cost Impact {getSortIcon('costImpact')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                className="flex items-center font-medium"
                onClick={() => handleSort('timeReported')}
              >
                Time Reported {getSortIcon('timeReported')}
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTickets.map(ticket => (
            <TableRow 
              key={ticket.id}
              className="cursor-pointer hover:bg-slate-100"
              onClick={() => onTicketClick(ticket)}
            >
              <TableCell className="font-medium">#{ticket.id}</TableCell>
              <TableCell>{ticket.partNumber}</TableCell>
              <TableCell>{ticket.category}</TableCell>
              <TableCell>
                <Badge className={getSeverityColor(ticket.severity)}>
                  {ticket.severity}
                </Badge>
              </TableCell>
              <TableCell>${ticket.costImpact.toLocaleString()}</TableCell>
              <TableCell>{new Date(ticket.timeReported).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Mock data for demonstration
const mockIssueTickets: IssueTicket[] = [
  {
    id: 'T1001',
    partNumber: 'P-3892-A',
    category: 'Bearing Wear',
    severity: 'High',
    costImpact: 15000,
    timeReported: '2025-04-25T09:30:00',
    description: 'Excessive wear on main bearing assembly causing vibration and potential failure',
    location: 'Assembly Line 3',
    reportedBy: 'John Smith',
    assignedTo: 'Emily Johnson',
    status: 'Open'
  },
  {
    id: 'T1002',
    partNumber: 'P-4210-C',
    category: 'Cooling System',
    severity: 'Medium',
    costImpact: 7500,
    timeReported: '2025-04-24T14:15:00',
    description: 'Coolant leak detected in secondary cooling loop',
    location: 'Assembly Line 2',
    reportedBy: 'Maria Rodriguez',
    assignedTo: 'Unassigned',
    status: 'Open'
  },
  {
    id: 'T1003',
    partNumber: 'P-3892-A',
    category: 'Bearing Wear',
    severity: 'High',
    costImpact: 12000,
    timeReported: '2025-04-23T11:45:00',
    description: 'Similar bearing wear issue reported in another unit',
    location: 'Assembly Line 1',
    reportedBy: 'Robert Chen',
    assignedTo: 'Emily Johnson',
    status: 'In Progress'
  },
  {
    id: 'T1004',
    partNumber: 'P-7654-B',
    category: 'Electrical',
    severity: 'Low',
    costImpact: 2500,
    timeReported: '2025-04-22T16:20:00',
    description: 'Intermittent power fluctuations in control panel',
    location: 'Test Station 4',
    reportedBy: 'Sarah Johnson',
    assignedTo: 'David Wilson',
    status: 'Pending Review'
  },
  {
    id: 'T1005',
    partNumber: 'P-9123-D',
    category: 'Sealing',
    severity: 'Medium',
    costImpact: 5000,
    timeReported: '2025-04-21T10:10:00',
    description: 'Main seal degradation causing minor fluid leakage',
    location: 'Assembly Line 3',
    reportedBy: 'Michael Brown',
    assignedTo: 'Samantha Lee',
    status: 'Open'
  },
  {
    id: 'T1006',
    partNumber: 'P-3892-A',
    category: 'Bearing Wear',
    severity: 'High',
    costImpact: 18000,
    timeReported: '2025-04-20T08:45:00',
    description: 'Critical bearing failure detected during testing',
    location: 'Test Station 2',
    reportedBy: 'Thomas Jackson',
    assignedTo: 'Emily Johnson',
    status: 'Open'
  },
  {
    id: 'T1007',
    partNumber: 'P-5430-E',
    category: 'Material Quality',
    severity: 'Low',
    costImpact: 1800,
    timeReported: '2025-04-19T13:30:00',
    description: 'Surface finish inconsistencies on machined parts',
    location: 'Machining Area',
    reportedBy: 'Jessica Liu',
    assignedTo: 'Unassigned',
    status: 'Open'
  },
  {
    id: 'T1008',
    partNumber: 'P-4210-C',
    category: 'Cooling System',
    severity: 'Medium',
    costImpact: 6200,
    timeReported: '2025-04-18T15:15:00',
    description: 'Flow restriction in secondary cooling manifold',
    location: 'Assembly Line 2',
    reportedBy: 'Kevin Patel',
    assignedTo: 'Rachel Green',
    status: 'In Progress'
  }
];
