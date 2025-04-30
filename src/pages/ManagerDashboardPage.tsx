
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
  SidebarFooter
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";
import { PieChart, DollarSign, ClipboardCheck, Filter } from 'lucide-react';
import { DashboardContent } from '@/components/DashboardContent';
import MainNavigation from '@/components/MainNavigation';
import { ApprovalRequestsContent } from '@/components/ApprovalRequestsContent';
import { CostRiskAnalysisContent } from '@/components/cost-risk/CostRiskAnalysisContent';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DashboardFilters } from '@/components/DashboardFilters';
import { CostRiskMetric } from '@/components/CostRiskMetric';
import { ProgramRiskSummary } from '@/components/ProgramRiskSummary';
import { Button } from '@/components/ui/button';

const ManagerDashboardPage = () => {
  const isMobile = useIsMobile();
  const [activeView, setActiveView] = useState<'dashboard' | 'approvals' | 'cost-risk'>('dashboard');
  const [filters, setFilters] = useState({
    program: 'all',
    dateRange: '30days',
    severity: 'all'
  });
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleResetFilters = () => {
    setFilters({
      program: 'all',
      dateRange: '30days',
      severity: 'all'
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full flex-1">
          <DashboardSidebar 
            activeMetric={activeView === 'dashboard' ? 'risk' : activeView === 'approvals' ? 'approvals' : 'cost'} 
            setActiveView={setActiveView}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
          
          <Tabs 
            value={activeView} 
            onValueChange={(value) => setActiveView(value as 'dashboard' | 'approvals' | 'cost-risk')} 
            className="flex-1"
          >
            <div className="mb-4 px-6 pt-4">
              <TabsList className="grid w-[600px] grid-cols-3">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
                <TabsTrigger value="cost-risk">Cost Risk Analysis</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="flex-1 h-full m-0">
              <DashboardContent />
            </TabsContent>
            <TabsContent value="approvals" className="flex-1 h-full m-0">
              <ApprovalRequestsContent />
            </TabsContent>
            <TabsContent value="cost-risk" className="flex-1 h-full m-0">
              <CostRiskAnalysisContent />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarProvider>
    </div>
  );
};

interface DashboardSidebarProps {
  activeMetric: string;
  setActiveView: (view: 'dashboard' | 'approvals' | 'cost-risk') => void;
  filters: {
    program: string;
    dateRange: string;
    severity: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onResetFilters: () => void;
}

const DashboardSidebar = ({ 
  activeMetric, 
  setActiveView,
  filters,
  onFilterChange,
  onResetFilters
}: DashboardSidebarProps) => {
  const { toast } = useToast();
  
  const handleMenuClick = (metric: string) => {
    // Set the correct view based on menu selection
    if (metric === 'approvals') {
      setActiveView('approvals');
    } else if (metric === 'cost') {
      setActiveView('cost-risk');
    } else {
      setActiveView('dashboard');
    }
    
    const metricNames = {
      risk: 'Program Risk Summary',
      cost: 'Total Cost at Risk',
      approvals: 'Pending Approvals'
    };
    
    toast({
      title: `Viewing ${metricNames[metric as keyof typeof metricNames]}`,
      description: "Dashboard metrics updated",
    });
    
    console.log(`Dashboard metric selected: ${metric}`);
  };

  return (
    <Sidebar side="left" variant="inset" collapsible="icon">
      <SidebarHeader className="flex flex-col gap-4 px-2 py-4">
        <div className="flex items-center justify-center h-12">
          {/* Removed "Issue Scribe" text here */}
        </div>
        <SidebarSeparator className="mt-2" />
      </SidebarHeader>
      
      <SidebarContent className="pb-4">
        {/* Dashboard Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Program Risk Summary" 
                  isActive={activeMetric === 'risk'} 
                  onClick={() => handleMenuClick('risk')}
                >
                  <PieChart />
                  <span>Program Risk Summary</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Total Cost at Risk" 
                  isActive={activeMetric === 'cost'} 
                  onClick={() => handleMenuClick('cost')}
                >
                  <DollarSign />
                  <span>Total Cost at Risk</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  tooltip="Pending Approvals" 
                  isActive={activeMetric === 'approvals'} 
                  onClick={() => handleMenuClick('approvals')}
                >
                  <ClipboardCheck />
                  <span>Pending Approvals</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Visual separator between Navigation and Filters */}
        <SidebarSeparator className="my-3" />
        
        {/* Dashboard Filters Group */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Dashboard Filters
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <DashboardFilters 
              filters={filters} 
              onFilterChange={onFilterChange}
              layout="vertical"
            />
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={onResetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* Summary Metrics moved to Footer */}
      <SidebarFooter className="mt-auto pt-3">
        <SidebarSeparator className="mb-3" />
        <div className="px-4 pb-4">
          <SidebarGroupLabel className="mb-2">Summary Metrics</SidebarGroupLabel>
          <div className="space-y-3 px-2">
            <CostRiskMetric sidebarVariant={true} />
            <ProgramRiskSummary sidebarVariant={true} />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ManagerDashboardPage;
