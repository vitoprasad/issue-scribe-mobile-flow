
import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
  SidebarInset
} from '@/components/ui/sidebar';
import { IssueTicketsHeader } from '@/components/IssueTicketsHeader';
import { IssueTicketsTable } from '@/components/IssueTicketsTable';
import { IssueDetailPane } from '@/components/IssueDetailPane';
import { IssueTicketsFilters } from '@/components/IssueTicketsFilters';
import { useToast } from "@/hooks/use-toast";
import MainNavigation from '@/components/MainNavigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Filter, Clipboard, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FilterState {
  categories: string[];
  minCost: number | null;
  maxCost: number | null;
  severityLevels: string[];
  startDate: string | null;
  endDate: string | null;
}

const IssueTicketsPage = () => {
  const [selectedTicket, setSelectedTicket] = useState<IssueTicket | null>(null);
  const [showDetailPane, setShowDetailPane] = useState(false);
  const [activeView, setActiveView] = useState<'all-tickets' | 'open' | 'in-progress' | 'pending'>('all-tickets');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    minCost: null,
    maxCost: null,
    severityLevels: [],
    startDate: null,
    endDate: null
  });
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

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      minCost: null,
      maxCost: null,
      severityLevels: [],
      startDate: null,
      endDate: null
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full min-h-screen bg-background flex-1">
          <IssueTicketsSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onClearFilters={handleClearFilters} 
          />
          
          <SidebarInset className="flex-1 p-0 flex flex-col">
            {/* Move the header outside the tabs to prevent shifting */}
            <IssueTicketsHeader />
            
            <div className="mb-4 px-6 pt-4">
              <Tabs 
                value={activeView} 
                onValueChange={(value) => setActiveView(value as 'all-tickets' | 'open' | 'in-progress' | 'pending')} 
                className="w-full"
              >
                <TabsList className="grid w-full max-w-[600px] grid-cols-4">
                  <TabsTrigger value="all-tickets">All Tickets</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="pending">Pending Review</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Use a single Tabs component to avoid nesting */}
            <TabsContent value={activeView} className="m-0 flex-1 p-6">
              <div className="flex flex-1">
                <div className={`flex-1 ${showDetailPane ? 'lg:pr-0' : ''}`}>
                  {activeView === 'all-tickets' && (
                    <IssueTicketsTable 
                      onTicketClick={handleTicketClick} 
                      filters={filters}
                      statusFilter={null}
                    />
                  )}
                  {activeView === 'open' && (
                    <IssueTicketsTable 
                      onTicketClick={handleTicketClick} 
                      filters={filters}
                      statusFilter="Open"
                    />
                  )}
                  {activeView === 'in-progress' && (
                    <IssueTicketsTable 
                      onTicketClick={handleTicketClick} 
                      filters={filters}
                      statusFilter="In Progress"
                    />
                  )}
                  {activeView === 'pending' && (
                    <IssueTicketsTable 
                      onTicketClick={handleTicketClick} 
                      filters={filters}
                      statusFilter="Pending Review"
                    />
                  )}
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
            </TabsContent>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

const IssueTicketsSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}: { 
  filters: FilterState, 
  onFilterChange: (filters: FilterState) => void,
  onClearFilters: () => void
}) => {
  return (
    <Sidebar side="left" variant="inset" collapsible="icon">
      <SidebarHeader className="flex flex-col gap-4 px-2 py-4">
        <div className="flex items-center justify-center h-12">
          <h2 className="text-xl font-bold text-sidebar-foreground">Issue Scribe</h2>
        </div>
        <SidebarSeparator className="mt-2" />
      </SidebarHeader>
      
      <SidebarContent className="pb-4">
        {/* Dashboard Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Ticket Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="All Tickets" 
                  isActive={true}
                >
                  <Clipboard />
                  <span>All Tickets</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Priority Items" 
                >
                  <AlertTriangle />
                  <span>Priority Items</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Pending Review" 
                >
                  <Clock />
                  <span>Pending Review</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Visual separator between Navigation and Filters */}
        <SidebarSeparator className="my-3" />
        
        {/* Ticket Filters Group */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Ticket Filters
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <IssueTicketsFilters 
              filters={filters}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
            />
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={onClearFilters}
              >
                Reset Filters
              </Button>
            </div>
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
