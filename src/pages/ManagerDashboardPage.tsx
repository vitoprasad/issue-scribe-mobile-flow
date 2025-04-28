
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
  SidebarSeparator
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";
import { PieChart, DollarSign, ClipboardCheck } from 'lucide-react';
import { DashboardContent } from '@/components/DashboardContent';
import MainNavigation from '@/components/MainNavigation';
import { ApprovalRequestsContent } from '@/components/ApprovalRequestsContent';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ManagerDashboardPage = () => {
  const isMobile = useIsMobile();
  const [activeView, setActiveView] = useState<'dashboard' | 'approvals'>('dashboard');
  
  return (
    <div className="flex flex-col h-screen">
      <MainNavigation />
      <div className="mb-4 px-6 pt-4">
        <Tabs 
          value={activeView} 
          onValueChange={(value) => setActiveView(value as 'dashboard' | 'approvals')} 
          className="w-full"
        >
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full flex-1 bg-background overflow-hidden">
          <DashboardSidebar activeMetric={activeView === 'dashboard' ? 'risk' : 'approvals'} />
          
          {/* Use TabsContent components here for proper rendering */}
          <Tabs value={activeView} className="flex-1">
            <TabsContent value="dashboard" className="flex-1 h-full m-0">
              <DashboardContent />
            </TabsContent>
            <TabsContent value="approvals" className="flex-1 h-full m-0">
              <ApprovalRequestsContent />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarProvider>
    </div>
  );
};

interface DashboardSidebarProps {
  activeMetric: string;
}

const DashboardSidebar = ({ activeMetric }: DashboardSidebarProps) => {
  const { toast } = useToast();
  
  const handleMenuClick = (metric: string) => {
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
          <h2 className="text-xl font-bold text-sidebar-foreground">Issue Scribe</h2>
        </div>
        <SidebarSeparator />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Metrics</SidebarGroupLabel>
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
      </SidebarContent>
    </Sidebar>
  );
};

export default ManagerDashboardPage;
