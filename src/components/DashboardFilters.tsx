
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Calendar } from 'lucide-react';

export const DashboardFilters = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm mb-2 text-muted-foreground">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Program/Subsystem</label>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              <SelectItem value="alpha">Alpha Platform</SelectItem>
              <SelectItem value="beta">Beta Platform</SelectItem>
              <SelectItem value="gamma">Gamma Platform</SelectItem>
              <SelectItem value="delta">Delta Platform</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Last 30 Days</span>
          </Button>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Severity</label>
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity Levels</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
