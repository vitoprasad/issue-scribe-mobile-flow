
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Calendar } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface DashboardFiltersProps {
  filters?: {
    program: string;
    dateRange: string;
    severity: string;
  };
  onFilterChange?: (key: string, value: string) => void;
  layout?: 'horizontal' | 'vertical';
}

export const DashboardFilters = ({ 
  filters = {
    program: 'all',
    dateRange: '30days',
    severity: 'all'
  }, 
  onFilterChange,
  layout = 'horizontal'
}: DashboardFiltersProps) => {
  const handleProgramChange = (value: string) => {
    onFilterChange?.('program', value);
    // In a real app, this would trigger a data fetch or filter
    console.log('Program filter changed:', value);
  };
  
  const handleDateRangeChange = (value: string) => {
    onFilterChange?.('dateRange', value);
    console.log('Date range changed:', value);
  };
  
  const handleSeverityChange = (value: string) => {
    onFilterChange?.('severity', value);
    console.log('Severity filter changed:', value);
  };

  if (layout === 'vertical') {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-sidebar-foreground/70">Program/Subsystem</label>
          <Select value={filters.program} onValueChange={handleProgramChange}>
            <SelectTrigger className="w-full h-8 text-xs">
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
        
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-sidebar-foreground/70">Date Range</label>
          <ToggleGroup type="single" value={filters.dateRange} onValueChange={(value) => value && handleDateRangeChange(value)} className="justify-between" size="sm">
            <ToggleGroupItem value="7days" className="text-xs flex-1">7d</ToggleGroupItem>
            <ToggleGroupItem value="30days" className="text-xs flex-1">30d</ToggleGroupItem>
            <ToggleGroupItem value="90days" className="text-xs flex-1">90d</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-sidebar-foreground/70">Severity</label>
          <ToggleGroup type="single" value={filters.severity} onValueChange={(value) => value && handleSeverityChange(value)} className="justify-between" size="sm">
            <ToggleGroupItem value="all" className="text-xs flex-1">All</ToggleGroupItem>
            <ToggleGroupItem value="high" className="text-xs text-destructive flex-1">High</ToggleGroupItem>
            <ToggleGroupItem value="med" className="text-xs text-amber-500 flex-1">Med</ToggleGroupItem>
            <ToggleGroupItem value="low" className="text-xs text-green-600 flex-1">Low</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm mb-2 text-muted-foreground">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Program/Subsystem</label>
          <Select value={filters.program} onValueChange={handleProgramChange}>
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
          <ToggleGroup type="single" value={filters.dateRange} onValueChange={(value) => value && handleDateRangeChange(value)}>
            <ToggleGroupItem value="7days" className="text-xs">7d</ToggleGroupItem>
            <ToggleGroupItem value="30days" className="text-xs">30d</ToggleGroupItem>
            <ToggleGroupItem value="90days" className="text-xs">90d</ToggleGroupItem>
            <ToggleGroupItem value="custom" className="text-xs flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Custom
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Severity</label>
          <ToggleGroup type="single" value={filters.severity} onValueChange={(value) => value && handleSeverityChange(value)}>
            <ToggleGroupItem value="all" className="text-xs">All</ToggleGroupItem>
            <ToggleGroupItem value="high" className="text-xs text-destructive">High</ToggleGroupItem>
            <ToggleGroupItem value="med" className="text-xs text-amber-500">Med</ToggleGroupItem>
            <ToggleGroupItem value="low" className="text-xs text-green-600">Low</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};
