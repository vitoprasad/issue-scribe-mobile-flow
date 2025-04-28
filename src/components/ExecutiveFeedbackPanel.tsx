
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowDown, MessageSquare, ArrowUp, CheckCircle, Minimize, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { ExecutiveFeedback } from '@/types/dashboard';
import { useToast } from "@/hooks/use-toast";

interface ExecutiveFeedbackPanelProps {
  feedback: ExecutiveFeedback[];
}

export const ExecutiveFeedbackPanel: React.FC<ExecutiveFeedbackPanelProps> = ({ feedback }) => {
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeFeedback, setActiveFeedback] = useState<ExecutiveFeedback[]>(feedback);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleStatusUpdate = (id: string, newStatus: "new" | "in-progress" | "completed") => {
    const updatedFeedback = activeFeedback.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    setActiveFeedback(updatedFeedback);
    
    toast({
      title: "Status Updated",
      description: `Feedback #${id} marked as ${newStatus}`,
    });
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'critical':
        return <Badge variant="destructive" className="font-medium">Critical</Badge>;
      case 'high':
        return <Badge variant="default" className="bg-red-500 font-medium">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500 font-medium">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-green-600 border-green-600 font-medium">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'directive':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Directive</Badge>;
      case 'inquiry':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Inquiry</Badge>;
      case 'notification':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Notification</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">New</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowDown className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg font-medium">Executive Directives</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-600">
              {feedback.length} Items
            </Badge>
            <Button
              variant="ghost" 
              size="sm"
              onClick={toggleMinimize}
              className="p-1 h-8 w-8"
            >
              {isMinimized ? <ChevronDown className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              <span className="sr-only">{isMinimized ? 'Expand' : 'Minimize'}</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      {!isMinimized && (
        <CardContent>
          <div className="space-y-4">
            {activeFeedback.map((item) => (
              <div 
                key={item.id}
                className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-slate-500" />
                      <h3 
                        className="font-medium cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => toggleExpand(item.id)}
                      >
                        {item.title}
                      </h3>
                    </div>
                    {getPriorityBadge(item.priority)}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {getCategoryBadge(item.category)}
                    {getStatusIcon(item.status)}
                    <span className="text-xs text-slate-500">{formatDate(item.createdAt)}</span>
                    {item.assignee && (
                      <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                        Assignee: {item.assignee}
                      </span>
                    )}
                    {item.tags && item.tags.map((tag, idx) => (
                      <div key={idx} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </div>
                    ))}
                  </div>
                  
                  {expandedId === item.id && (
                    <div className="mt-3 pt-3 border-t animate-in fade-in duration-200">
                      <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                      <div className="flex justify-end gap-2">
                        {item.status !== "completed" && (
                          <>
                            {item.status === "new" && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-blue-600"
                                onClick={() => handleStatusUpdate(item.id, "in-progress")}
                              >
                                <ArrowUp className="h-4 w-4 mr-1" />
                                Start Working
                              </Button>
                            )}
                            {item.status === "in-progress" && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-green-600"
                                onClick={() => handleStatusUpdate(item.id, "completed")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Complete
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
