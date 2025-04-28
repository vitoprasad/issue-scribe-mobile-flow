
import React from 'react';
import IssueForm from '@/components/IssueForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import MainNavigation from '@/components/MainNavigation';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="py-6 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-industrial-700">Issue Scribe</h1>
              <div className="text-sm text-industrial-400 border border-industrial-100 px-3 py-1 rounded-full bg-industrial-50">
                {isMobile ? 'Mobile' : 'Desktop'} View
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">Quality Assurance System</p>
            
            <div className="mt-4">
              <Link to="/triage">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>View Issue Triage Dashboard</span>
                </Button>
              </Link>
            </div>
          </header>
          
          <IssueForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
