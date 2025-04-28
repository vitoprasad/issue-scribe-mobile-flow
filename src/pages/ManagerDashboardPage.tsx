
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
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, PieChart, DollarSign, Clock, Filter, Calendar, Shield, FileText, Package, X, Pencil } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ManagerDashboardHeader } from '@/components/ManagerDashboardHeader';
import { RepairActionsTable } from '@/components/RepairActionsTable';
import { ProgramRiskSummary } from '@/components/ProgramRiskSummary';
import { DashboardFilters } from '@/components/DashboardFilters';
import { CostRiskMetric } from '@/components/CostRiskMetric';
import { DashboardContent } from '@/components/DashboardContent';

const ManagerDashboardPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen bg-background">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </SidebarProvider>
  );
};

const DashboardSidebar = () => {
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
                <SidebarMenuButton tooltip="Program Risk Summary">
                  <PieChart />
                  <span>Program Risk Summary</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Total Cost at Risk">
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
