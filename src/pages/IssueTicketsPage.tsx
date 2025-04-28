
import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { IssueTicketsHeader } from '@/components/IssueTicketsHeader';
import { IssueTicketsTable } from '@/components/IssueTicketsTable';
import { IssueDetailPane } from '@/components/IssueDetailPane';
import { IssueTicketsFilters } from '@/components/IssueTicketsFilters';
import { useToast } from "@/hooks/use-toast";

const IssueTicketsPage = () => {
  const [selectedTicket, setSelectedTicket] = useState<IssueTicket | null>(null);
  const [showDetailPane, setShowDetailPane] = useState(false);
  const { toast } = useToast();
  
  const handleTicketClick = (ticket: IssueTicket) => {
    setSelectedTicket(ticket);
    setShowDetailPane(true);
  };
  
  const handleCloseDetailPane = () => {
    setShowDetailPane(false);
  };
  
  const handleTicketAction = (action: string, ticketId: string) => {
    toast({
      title: `Ticket ${action}`,
      description: `Ticket #${ticketId} has been ${action.toLowerCase()}`,
    });
    
    if (action === "Closed" || action === "Flagged") {
      setShowDetailPane(false);
    }
  };
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen bg-background">
        <IssueTicketsSidebar />
        <div className="flex-1 flex flex-col">
          <IssueTicketsHeader />
          <div className="flex flex-1">
            <div className={`flex-1 p-6 ${showDetailPane ? 'lg:pr-0' : ''}`}>
              <IssueTicketsTable onTicketClick={handleTicketClick} />
            </div>
            {showDetailPane && selectedTicket && (
              <div className="w-96 border-l bg-slate-50 overflow-auto">
                <IssueDetailPane 
                  ticket={selectedTicket} 
                  onClose={handleCloseDetailPane} 
                  onAction={handleTicketAction}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

const IssueTicketsSidebar = () => {
  return (
    <Sidebar side="left" variant="inset" collapsible="icon">
      <SidebarHeader className="flex flex-col gap-4 px-2 py-4">
        <div className="flex items-center justify-center h-12">
          <h2 className="text-xl font-bold text-sidebar-foreground">Issue Scribe</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <IssueTicketsFilters />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export interface IssueTicket {
  id: string;
  partNumber: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High';
  costImpact: number;
  timeReported: string;
  description: string;
  location: string;
  reportedBy: string;
  assignedTo: string;
  status: 'Open' | 'In Progress' | 'Pending Review' | 'Closed';
}

export default IssueTicketsPage;
