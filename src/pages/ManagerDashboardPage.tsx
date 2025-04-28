
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
import { PieChart, DollarSign } from 'lucide-react';
import { DashboardContent } from '@/components/DashboardContent';
import MainNavigation from '@/components/MainNavigation';

const ManagerDashboardPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col h-screen">
      <MainNavigation />
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full flex-1 bg-background overflow-hidden">
          <DashboardSidebar />
          <DashboardContent />
        </div>
      </SidebarProvider>
    </div>
  );
};

const DashboardSidebar = () => {
  const { toast } = useToast();
  const [activeMetric, setActiveMetric] = useState('risk');
  
  const handleMenuClick = (metric: string) => {
    setActiveMetric(metric);
    
    const metricNames = {
      risk: 'Program Risk Summary',
      cost: 'Total Cost at Risk'
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ManagerDashboardPage;
