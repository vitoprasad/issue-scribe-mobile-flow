
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AISuggestion } from '@/types/dashboard';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIRecommendationsProps {
  suggestions: AISuggestion[];
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ suggestions }) => {
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const handleImplement = (suggestion: AISuggestion) => {
    toast({
      title: "Action Initiated",
      description: `Implementing suggestion: ${suggestion.title}`,
    });
  };
  
  const handleDelegate = (suggestion: AISuggestion) => {
    toast({
      title: "Task Delegated",
      description: `Suggestion assigned to appropriate team: ${suggestion.title}`,
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 text-primary mr-2" />
          <CardTitle className="text-lg font-medium">AI Strategic Recommendations</CardTitle>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-primary/10 text-xs px-2 py-1 rounded-full text-primary font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Predictive
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Recommendations based on predictive analytics</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="border rounded-lg p-3 hover:bg-slate-50 transition-colors"
            >
              <div 
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleExpand(suggestion.id)}
              >
                <div>
                  <div className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      suggestion.impact === 'high' ? 'bg-red-500' :
                      suggestion.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></span>
                    <h3 className="font-medium text-sm">{suggestion.title}</h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 mt-1 inline-block">
                    {suggestion.category.charAt(0).toUpperCase() + suggestion.category.slice(1)}
                  </span>
                </div>
                <ArrowRight size={16} className={`transition-transform duration-200 ${expandedId === suggestion.id ? 'rotate-90' : ''}`} />
              </div>
              
              {expandedId === suggestion.id && (
                <div className="mt-3 animate-fade-in">
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  <div className="flex space-x-2 justify-end">
                    {suggestion.actionable && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelegate(suggestion)}
                        >
                          Delegate
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleImplement(suggestion)}
                        >
                          Implement
                        </Button>
                      </>
                    )}
                    {!suggestion.actionable && (
                      <span className="text-xs text-muted-foreground self-center">Monitoring required</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
