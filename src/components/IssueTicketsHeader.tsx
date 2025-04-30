
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, Download } from 'lucide-react';

export const IssueTicketsHeader = () => {
  return (
    <div className="border-b bg-white">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Issue Tickets</h1>
          <p className="text-sm text-gray-500">Review and manage quality issue tickets</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="text-gray-600">
            <Calendar className="mr-1 h-4 w-4" /> 
            Last 7 Days
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600">
            <Filter className="mr-1 h-4 w-4" /> 
            Filter View
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
