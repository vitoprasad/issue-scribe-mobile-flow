
import React from 'react';
import { Button } from '@/components/ui/button';
import { IssueTicket } from '@/pages/IssueTicketsPage';
import { X, FileText, AlertTriangle, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface IssueDetailPaneProps {
  ticket: IssueTicket;
  onClose: () => void;
  onAction: (action: string, ticketId: string) => void;
}

export const IssueDetailPane = ({ ticket, onClose, onAction }: IssueDetailPaneProps) => {
  const aiInsight = getAIInsight(ticket);
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h3 className="text-lg font-semibold">Ticket Details</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold">#{ticket.id}</h2>
            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Part: {ticket.partNumber}</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="mt-1">{ticket.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Category</h4>
              <p className="mt-1">{ticket.category}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Severity</h4>
              <p className="mt-1">{ticket.severity}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Cost Impact</h4>
              <p className="mt-1">${ticket.costImpact.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Location</h4>
              <p className="mt-1">{ticket.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Reported By</h4>
              <p className="mt-1">{ticket.reportedBy}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Assigned To</h4>
              <p className="mt-1">{ticket.assignedTo || "Unassigned"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Reported Date</h4>
              <p className="mt-1">{new Date(ticket.timeReported).toLocaleString()}</p>
            </div>
          </div>
          
          {aiInsight && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h4 className="font-medium text-blue-800 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                AI Insight
              </h4>
              <p className="mt-2 text-blue-700 text-sm">{aiInsight}</p>
            </Card>
          )}
          
          <div className="pt-2">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Related Clusters</h4>
            <Button 
              variant="outline" 
              className="w-full justify-start text-sm"
              onClick={() => window.location.href = "/triage"}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Related Clusters
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t bg-white mt-auto">
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            onClick={() => onAction("Closed", ticket.id)}
          >
            Close Ticket
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onAction("Escalated", ticket.id)}
          >
            Escalate
          </Button>
          <Button 
            onClick={() => onAction("Flagged", ticket.id)}
          >
            Flag for Clustering
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'bg-blue-100 text-blue-800';
    case 'In Progress': return 'bg-amber-100 text-amber-800';
    case 'Pending Review': return 'bg-purple-100 text-purple-800';
    case 'Closed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getAIInsight = (ticket: IssueTicket) => {
  // In a real app, this would come from an API call to an AI service
  if (ticket.category === 'Bearing Wear') {
    return "This is the 3rd ticket of the 'Bearing Wear' category for part P-3892-A this month. Recommend clustering for systematic investigation.";
  } else if (ticket.category === 'Cooling System') {
    return "Similar cooling system issues have been reported across multiple assembly lines. Potential systemic issue detected.";
  }
  return null;
};
