
import React, { useState } from 'react';
import { IssueTicketsHeader } from '@/components/IssueTicketsHeader';
import { IssueTicketsFilters } from '@/components/IssueTicketsFilters';
import { IssueTicketsTable } from '@/components/IssueTicketsTable';
import { IssueDetailPane } from '@/components/IssueDetailPane';
import MainNavigation from '@/components/MainNavigation';

// Define interfaces that components are looking for
export interface IssueTicket {
  id: string;
  partNumber: string;
  category: string;
  severity: string;
  costImpact: number;
  timeReported: string;
  description: string;
  location: string;
  reportedBy: string;
  assignedTo?: string;
  status: string;
}

export interface FilterState {
  categories: string[];
  severityLevels: string[];
  minCost: number | null;
  maxCost: number | null;
  startDate: string | null;
  endDate: string | null;
}

const IssueTicketsPage = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<IssueTicket | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    severityLevels: [],
    minCost: null,
    maxCost: null,
    startDate: null,
    endDate: null
  });

  const handleTicketClick = (ticket: IssueTicket) => {
    setSelectedIssueId(ticket.id);
    setSelectedTicket(ticket);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      severityLevels: [],
      minCost: null,
      maxCost: null,
      startDate: null,
      endDate: null
    });
  };

  const handleActionOnTicket = (action: string, ticketId: string) => {
    console.log(`Action ${action} performed on ticket ${ticketId}`);
    // In a real application, this would update the ticket status via an API call
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainNavigation />
      <IssueTicketsHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <IssueTicketsFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
          <div className="flex-1 overflow-hidden p-4">
            <IssueTicketsTable 
              onTicketClick={handleTicketClick}
              filters={filters}
            />
          </div>
        </div>
        {selectedTicket && (
          <div className="w-1/3 border-l border-gray-200 bg-white overflow-auto">
            <IssueDetailPane 
              ticket={selectedTicket} 
              onClose={() => {
                setSelectedIssueId(null);
                setSelectedTicket(null);
              }} 
              onAction={handleActionOnTicket}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueTicketsPage;
