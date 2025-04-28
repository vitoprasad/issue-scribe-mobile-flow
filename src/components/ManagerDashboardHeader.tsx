
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

export const ManagerDashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-industrial-700">AI-Suggested Repairs</h1>
        <p className="text-sm text-gray-500">Management Review Dashboard</p>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="sm">
            Submit New Issue
          </Button>
        </Link>
        <Link to="/triage">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>QA Triage View</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
