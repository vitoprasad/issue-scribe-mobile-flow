import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowDown, 
  MessageSquare, 
  ArrowUp, 
  CheckCircle, 
  Minimize, 
  ChevronDown, 
  ChevronUp, 
  Tag,
  Plus,
  LinkIcon,
  ShieldAlert,
  TrendingUp
} from 'lucide-react';
import { ExecutiveFeedback } from '@/types/dashboard';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { topRiskContributors } from '@/data/mockDashboardData';
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface ExecutiveFeedbackPanelProps {
  feedback: ExecutiveFeedback[];
  readOnly?: boolean; // New prop to control edit capabilities
}

export const ExecutiveFeedbackPanel: React.FC<ExecutiveFeedbackPanelProps> = ({ 
  feedback,
  readOnly = false // Default to false for backward compatibility
}) => {
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeFeedback, setActiveFeedback] = useState<ExecutiveFeedback[]>(feedback);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [risksSheetOpen, setRisksSheetOpen] = useState(false);
  const [selectedRiskIds, setSelectedRiskIds] = useState<string[]>([]);
  const [newDirective, setNewDirective] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'directive',
  });

  const handleRiskSelectionChange = (riskId: string, isSelected: boolean) => {
    setSelectedRiskIds((prev) => 
      isSelected 
        ? [...prev, riskId]
        : prev.filter(id => id !== riskId)
    );
  };

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

  const handleAddDirective = () => {
    if (!newDirective.title.trim() || !newDirective.description.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newId = `EF-${String(activeFeedback.length + 1).padStart(3, '0')}`;
    
    const directive: ExecutiveFeedback = {
      id: newId,
      title: newDirective.title,
      description: newDirective.description,
      priority: newDirective.priority as "critical" | "high" | "medium" | "low",
      category: newDirective.category as "directive" | "inquiry" | "notification",
      createdAt: new Date().toISOString(),
      status: "new",
      targetedRisks: selectedRiskIds.length > 0 ? selectedRiskIds : undefined
    };

    setActiveFeedback([...activeFeedback, directive]);
    setDialogOpen(false);
    setSelectedRiskIds([]);
    setNewDirective({
      title: '',
      description: '',
      priority: 'medium',
      category: 'directive',
    });

    toast({
      title: "Directive Added",
      description: selectedRiskIds.length > 0 
        ? `New directive targeting ${selectedRiskIds.length} risk items`
        : "New executive directive has been created."
    });
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

  const getRelatedRiskCount = (item: ExecutiveFeedback) => {
    if (!item.targetedRisks || item.targetedRisks.length === 0) {
      return null;
    }
    
    return (
      <Badge 
        variant="outline" 
        className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
      >
        <LinkIcon className="h-3 w-3" />
        {item.targetedRisks.length} {item.targetedRisks.length === 1 ? 'Risk' : 'Risks'}
      </Badge>
    );
  };

  const renderRelatedRisks = (riskIds: string[] | undefined) => {
    if (!riskIds || riskIds.length === 0) {
      return (
        <div className="flex items-center gap-2 text-sm text-slate-500 italic mt-2">
          <ShieldAlert className="h-4 w-4" />
          No targeted risks defined
        </div>
      );
    }

    const relatedRisks = topRiskContributors.filter(risk => riskIds.includes(risk.id));
    
    return (
      <div className="mt-3">
        <p className="text-sm font-medium text-slate-700 mb-2">Targeted Risks:</p>
        <div className="grid grid-cols-1 gap-2">
          {relatedRisks.map(risk => (
            <div key={risk.id} className="border border-slate-200 rounded p-2 bg-slate-50 text-sm">
              <div className="flex justify-between items-center">
                <p className="font-medium">{risk.id}: {risk.subsystem}</p>
                <span 
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    risk.severity === 'High' 
                      ? 'bg-red-100 text-red-800' 
                      : risk.severity === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {risk.severity}
                </span>
              </div>
              <p className="text-xs text-slate-500">{risk.impact} Impact</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle className="text-lg font-medium">Executive Directives</CardTitle>
                {readOnly && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Directives flow down from executive leadership
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Only show Add Directive button when not in readOnly mode */}
              {!readOnly && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDialogOpen(true)}
                  className="text-blue-600 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Directive
                </Button>
              )}
              <Badge variant="outline" className="bg-blue-50 text-blue-600">
                {activeFeedback.length} Items
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
                      {getRelatedRiskCount(item)}
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
                      {/* Badge indicating this is from Executive leadership when in readOnly mode */}
                      {readOnly && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          From Executive
                        </Badge>
                      )}
                    </div>
                    
                    {expandedId === item.id && (
                      <div className="mt-3 pt-3 border-t animate-in fade-in duration-200">
                        <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                        
                        {/* Display related risks when expanded */}
                        {renderRelatedRisks(item.targetedRisks)}
                        
                        <div className="flex justify-end gap-2 mt-4">
                          {/* Status update buttons remain available even in readOnly mode
                              as managers should still be able to mark progress */}
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

      {/* Add New Directive Dialog - Only render if not in readOnly mode */}
      {!readOnly && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Executive Directive</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input
                  id="title"
                  value={newDirective.title}
                  onChange={(e) => setNewDirective({...newDirective, title: e.target.value})}
                  placeholder="Enter directive title"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  value={newDirective.description}
                  onChange={(e) => setNewDirective({...newDirective, description: e.target.value})}
                  placeholder="Provide detailed instructions"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                  <select
                    id="priority"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newDirective.priority}
                    onChange={(e) => setNewDirective({...newDirective, priority: e.target.value})}
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newDirective.category}
                    onChange={(e) => setNewDirective({...newDirective, category: e.target.value})}
                  >
                    <option value="directive">Directive</option>
                    <option value="inquiry">Inquiry</option>
                    <option value="notification">Notification</option>
                  </select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Target Specific Risks</label>
                  <Sheet open={risksSheetOpen} onOpenChange={setRisksSheetOpen}>
                    <SheetTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                        {selectedRiskIds.length > 0 
                          ? `${selectedRiskIds.length} Selected` 
                          : "Link Risks"}
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Select Risks to Target</SheetTitle>
                        <SheetDescription>
                          Link this directive to specific risk contributors
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <div className="space-y-4">
                          {topRiskContributors.map((risk) => (
                            <div key={risk.id} className="flex items-start space-x-3 border p-3 rounded-md">
                              <Checkbox
                                checked={selectedRiskIds.includes(risk.id)}
                                onCheckedChange={(checked) => 
                                  handleRiskSelectionChange(risk.id, checked === true)
                                }
                                id={`risk-${risk.id}`}
                              />
                              <div className="grid gap-1.5">
                                <label
                                  htmlFor={`risk-${risk.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {risk.id}: {risk.subsystem}
                                </label>
                                <div className="flex items-center space-x-2">
                                  <span 
                                    className={`text-xs px-1.5 py-0.5 rounded ${
                                      risk.severity === 'High' 
                                        ? 'bg-red-100 text-red-800' 
                                        : risk.severity === 'Medium'
                                          ? 'bg-yellow-100 text-yellow-800'
                                          : 'bg-green-100 text-green-800'
                                    }`}
                                  >
                                    {risk.severity}
                                  </span>
                                  <span className="text-xs text-gray-500">{risk.impact} Impact</span>
                                  {risk.trend === 'up' && (
                                    <span className="flex items-center text-xs text-red-600">
                                      <TrendingUp className="h-3 w-3 mr-0.5" /> Increasing
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button 
                            onClick={() => setRisksSheetOpen(false)}
                          >
                            Done
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                
                {selectedRiskIds.length > 0 && (
                  <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-slate-50">
                    {selectedRiskIds.map((riskId) => {
                      const risk = topRiskContributors.find(r => r.id === riskId);
                      return (
                        <Badge 
                          key={riskId} 
                          variant="outline" 
                          className="bg-blue-50 text-blue-700 flex items-center gap-1"
                        >
                          {riskId}: {risk?.subsystem}
                          <button 
                            className="ml-1 hover:bg-blue-100 rounded-full"
                            onClick={() => handleRiskSelectionChange(riskId, false)}
                          >
                            ×
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddDirective}>Create Directive</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
