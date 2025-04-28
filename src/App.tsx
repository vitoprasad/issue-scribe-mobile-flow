
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import IssueTriagePage from "./pages/IssueTriagePage";
import ManagerDashboardPage from "./pages/ManagerDashboardPage";
import IssueTicketsPage from "./pages/IssueTicketsPage";
import ExecutiveDashboardPage from "./pages/ExecutiveDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/triage" element={<IssueTriagePage />} />
          <Route path="/manager-dashboard" element={<ManagerDashboardPage />} />
          <Route path="/issue-tickets" element={<IssueTicketsPage />} />
          <Route path="/executive-dashboard" element={<ExecutiveDashboardPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
