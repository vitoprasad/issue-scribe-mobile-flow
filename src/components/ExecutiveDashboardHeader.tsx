
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Filter } from 'lucide-react';

export const ExecutiveDashboardHeader = () => {
  return (
    <div className="border-b bg-white">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Program Risk Overview</h1>
          <p className="text-sm text-gray-500">System-level risk analysis and trending</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="text-gray-600">
            <Calendar className="mr-1 h-4 w-4" /> 
            Last Quarter
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600">
            <Filter className="mr-1 h-4 w-4" /> 
            Filter
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600">
            <Download className="mr-1 h-4 w-4" /> 
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};
