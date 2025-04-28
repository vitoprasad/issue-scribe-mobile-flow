
import React from 'react';
import { IssueTicketsHeader } from '@/components/IssueTicketsHeader';
import { IssueTicketsFilters } from '@/components/IssueTicketsFilters';
import { IssueTicketsTable } from '@/components/IssueTicketsTable';
import { IssueDetailPane } from '@/components/IssueDetailPane';
import MainNavigation from '@/components/MainNavigation';

const IssueTicketsPage = () => {
  const [selectedIssueId, setSelectedIssueId] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainNavigation />
      <IssueTicketsHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <IssueTicketsFilters />
          <div className="flex-1 overflow-hidden p-4">
            <IssueTicketsTable 
              onRowClick={(issueId) => setSelectedIssueId(issueId)}
              selectedIssueId={selectedIssueId}
            />
          </div>
        </div>
        {selectedIssueId && (
          <div className="w-1/3 border-l border-gray-200 bg-white overflow-auto">
            <IssueDetailPane issueId={selectedIssueId} onClose={() => setSelectedIssueId(null)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueTicketsPage;
