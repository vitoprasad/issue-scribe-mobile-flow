
import React from 'react';
import IssueForm from '@/components/IssueForm';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-industrial-700">Issue Scribe</h1>
            <div className="text-sm text-industrial-400 border border-industrial-100 px-3 py-1 rounded-full bg-industrial-50">
              {isMobile ? 'Mobile' : 'Desktop'} View
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">Quality Assurance System</p>
        </header>
        
        <IssueForm />
      </div>
    </div>
  );
};

export default Index;
