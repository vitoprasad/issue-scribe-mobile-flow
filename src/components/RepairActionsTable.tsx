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
import { Button } from '@/components/ui/button';
import { Check, X, Pencil, FileText, Package, Shield, DollarSign, Clock, Cpu } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Updated mock data to include affected systems
const mockData = [
  {
    id: 'CL-2025-001',
    parts: ['A320-FN23', 'B451-TH89'],
    systems: ['Propulsion', 'Navigation'],
    riskLevel: 'High',
    costSavings: 25000,
    timeSavings: 48,
    suggestedAction: 'Replace faulty wiring harness in control unit',
  },
  {
    id: 'CL-2025-002',
    parts: ['C789-GH12', 'D234-JK56'],
    systems: ['Avionics', 'Communications'],
    riskLevel: 'Medium',
    costSavings: 12000,
    timeSavings: 24,
    suggestedAction: 'Recalibrate sensor array and update firmware',
  },
  {
    id: 'CL-2025-003',
    parts: ['E567-LM90', 'F890-OP34'],
    systems: ['Hydraulic', 'Landing Gear'],
    riskLevel: 'Low',
    costSavings: 5000,
    timeSavings: 8,
    suggestedAction: 'Replace worn gaskets in hydraulic system',
  },
  {
    id: 'CL-2025-004',
    parts: ['G123-QR78', 'H456-ST12'],
    systems: ['Cooling', 'Power'],
    riskLevel: 'High',
    costSavings: 32000,
    timeSavings: 72,
    suggestedAction: 'Overhaul cooling system and replace heat exchanger',
  },
  {
    id: 'CL-2025-005',
    parts: ['I789-UV56', 'J012-WX90'],
    systems: ['Electrical', 'Avionics'],
    riskLevel: 'Medium',
    costSavings: 18000,
    timeSavings: 36,
    suggestedAction: 'Replace faulty circuit boards in control panel',
  },
  {
    id: 'CL-2025-006',
    parts: ['K345-YZ78', 'L678-AB12'],
    systems: ['Power Distribution', 'Thermal'],
    riskLevel: 'Low',
    costSavings: 7500,
    timeSavings: 16,
    suggestedAction: 'Correct assembly error in power distribution module',
  }
];

export const RepairActionsTable = () => {
  const { toast } = useToast();
  const [tableData, setTableData] = useState(mockData);

  const handleAction = (id: string, action: 'approve' | 'modify' | 'reject') => {
    const actionMessages = {
      approve: 'Repair action approved',
      modify: 'Repair action marked for modification',
      reject: 'Repair action rejected'
    };
    
    toast({
      title: actionMessages[action],
      description: `Cluster ID: ${id}`,
    });
    
    setTableData(tableData.filter(item => item.id !== id));
  };

  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case 'High':
        return <Badge variant="destructive" className="font-medium">High</Badge>;
      case 'Medium':
        return <Badge variant="default" className="bg-amber-500 font-medium">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline" className="text-green-600 border-green-600 font-medium">Low</Badge>;
      default:
        return <Badge>{risk}</Badge>;
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[110px]">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Cluster ID</span>
              </div>
            </TableHead>
            <TableHead className="w-[180px]">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Affected Parts</span>
              </div>
            </TableHead>
            <TableHead className="w-[180px]">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                <span>Affected Systems</span>
              </div>
            </TableHead>
            <TableHead className="w-[110px]">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Risk Level</span>
              </div>
            </TableHead>
            <TableHead className="w-[140px]">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Cost Savings</span>
              </div>
            </TableHead>
            <TableHead className="w-[140px]">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Time Savings</span>
              </div>
            </TableHead>
            <TableHead>
              <span>Suggested Action</span>
            </TableHead>
            <TableHead className="w-[200px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item) => (
            <TableRow key={item.id}>
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
                      className="justify-start max-w-fit bg-blue-50 text-blue-700 border-blue-200"
                    >
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
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleAction(item.id, 'approve')}
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Approve</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-500 text-blue-500 hover:bg-blue-50"
                    onClick={() => handleAction(item.id, 'modify')}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Modify</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() => handleAction(item.id, 'reject')}
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
