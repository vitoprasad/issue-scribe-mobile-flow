
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { FileText, Package, Shield, DollarSign, Clock, Cpu } from 'lucide-react';

export const RepairActionTableHeader: React.FC = () => {
  return (
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
  );
};
