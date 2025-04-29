
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AISuggestion } from '@/types/dashboard';
import { Check, DollarSign, GraduationCap, Lightbulb, Plus, Rocket, ArrowDown, ChevronDown, Minimize } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { executiveFeedback } from '@/data/mockFeedbackData';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AIRecommendationsProps {
  suggestions: AISuggestion[];
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ suggestions }) => {
  const { toast } = useToast();
  const [isMinimized, setIsMinimized] = useState(false);
  
  const handleImplementation = (suggestion: AISuggestion) => {
    toast({
      title: "Implementation Scheduled",
      description: `${suggestion.title} has been added to the implementation queue.`,
    });
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-slate-600';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'quality':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Quality</Badge>;
      case 'cost':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Cost</Badge>;
      case 'safety':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Safety</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Pending</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>;
      default:
        return null;
    }
  };

  const isAlignedWithDirectives = (suggestion: AISuggestion) => {
    return suggestion.alignedWithDirectives === true;
  };

  const getRelatedDirectives = (suggestion: AISuggestion) => {
    if (!suggestion.alignedWithDirectives) return [];
    
    // In a real app, you'd have a more robust way to determine which directives
    // are related to which suggestions. Here we're just matching some by simulation.
    const matchingDirectives = executiveFeedback.filter(directive => {
      // Match based on subsystem or category
      if (suggestion.title.toLowerCase().includes(directive.title.toLowerCase())) return true;
      
      // Match based on tags
      if (directive.tags) {
        for (const tag of directive.tags) {
          if (suggestion.title.toLowerCase().includes(tag.toLowerCase())) return true;
        }
      }
      
      return false;
    });
    
    return matchingDirectives;
  };

  const handleRequestSuggestion = () => {
    toast({
      title: "AI Processing",
      description: "Generating new strategic recommendations based on current directives...",
    });
    
    // In a real app, this would trigger an API call to generate new suggestions
    setTimeout(() => {
      toast({
        title: "New Recommendations Ready",
        description: "AI has generated 2 new strategic recommendations.",
      });
    }, 2000);
  };

  return (
    <Collapsible
      open={!isMinimized}
      onOpenChange={(open) => setIsMinimized(!open)}
      className="w-full"
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg font-medium">AI Strategic Recommendations</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-blue-600 flex gap-1 items-center"
                onClick={handleRequestSuggestion}
              >
                <Lightbulb className="h-4 w-4" />
                <span>Generate</span>
              </Button>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-8 w-8"
                >
                  {isMinimized ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <Minimize className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Recommendations derived from executive directives and system analysis
          </p>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion) => {
                const relatedDirectives = getRelatedDirectives(suggestion);
                const isAligned = isAlignedWithDirectives(suggestion);
                
                return (
                  <div 
                    key={suggestion.id} 
                    className={`border rounded-lg p-4 ${
                      isAligned 
                        ? 'border-blue-200 bg-blue-50/30' 
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{suggestion.title}</h3>
                      <div className="flex items-center gap-2">
                        {suggestion.impact && (
                          <span className={`text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                            {suggestion.impact.charAt(0).toUpperCase() + suggestion.impact.slice(1)} Impact
                          </span>
                        )}
                        {getCategoryBadge(suggestion.category)}
                        {getStatusBadge(suggestion.implementationStatus)}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{suggestion.description}</p>
                    
                    {/* Alignment with directives */}
                    {isAligned && (
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center gap-1 mb-2 text-xs text-blue-700">
                          <ArrowDown className="h-3.5 w-3.5" />
                          <span className="font-medium">Aligned with Executive Directives</span>
                        </div>
                        
                        {relatedDirectives.length > 0 ? (
                          <div className="grid grid-cols-1 gap-1.5">
                            {relatedDirectives.map((directive) => (
                              <div key={directive.id} className="text-xs bg-blue-50 border border-blue-100 rounded p-1.5 flex justify-between">
                                <span className="font-medium">{directive.title}</span>
                                <Badge variant="outline" className="text-[10px] bg-blue-100">
                                  {directive.id}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500 italic">
                            Generally aligned with executive priorities
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Actionable items */}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-1">
                        {suggestion.estimatedSavings && (
                          <div className="flex items-center text-sm text-green-600 font-medium">
                            <DollarSign className="h-3.5 w-3.5 mr-0.5" />
                            {suggestion.estimatedSavings.toLocaleString()} est. savings
                          </div>
                        )}
                      </div>
                      
                      {suggestion.actionable && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => handleImplementation(suggestion)}
                        >
                          <Rocket className="h-3.5 w-3.5 mr-1.5" />
                          Implement
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
              
              <Button
                variant="outline"
                className="w-full border-dashed text-slate-600 hover:text-blue-600"
                onClick={handleRequestSuggestion}
              >
                <Plus className="h-4 w-4 mr-1" />
                Request More Recommendations
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
