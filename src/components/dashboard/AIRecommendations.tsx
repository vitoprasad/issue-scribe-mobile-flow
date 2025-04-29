
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AISuggestion } from '@/types/dashboard';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Lightbulb, 
  TrendingUp, 
  ArrowRight, 
  Link, 
  Tag, 
  BarChart3,
  ArrowDown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/utils/formatters';

interface AIRecommendationsProps {
  suggestions: AISuggestion[];
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ suggestions }) => {
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
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

  const handleViewImpact = (suggestion: AISuggestion) => {
    toast({
      title: "Impact Analysis",
      description: `Viewing detailed impact analysis for: ${suggestion.title}`,
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const generateSuggestion = () => {
    setLoading(true);
    
    // Simulate generating a new AI suggestion
    setTimeout(() => {
      toast({
        title: "AI Analysis Complete",
        description: "New strategic recommendations based on executive directives have been generated.",
      });
      setLoading(false);
    }, 1500);
  };
  
  const getImpactIndicator = (impact: string) => {
    if (impact === 'high') {
      return (
        <div className="flex items-center gap-1.5">
          <span className="bg-red-500 h-2 w-2 rounded-full"></span>
          <span className="bg-red-500 h-3 w-2 rounded-full"></span>
          <span className="bg-red-500 h-4 w-2 rounded-full"></span>
        </div>
      );
    } else if (impact === 'medium') {
      return (
        <div className="flex items-center gap-1.5">
          <span className="bg-yellow-500 h-2 w-2 rounded-full"></span>
          <span className="bg-yellow-500 h-3 w-2 rounded-full"></span>
          <span className="bg-gray-300 h-4 w-2 rounded-full"></span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5">
          <span className="bg-green-500 h-2 w-2 rounded-full"></span>
          <span className="bg-gray-300 h-3 w-2 rounded-full"></span>
          <span className="bg-gray-300 h-4 w-2 rounded-full"></span>
        </div>
      );
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 text-primary mr-2" />
          <CardTitle className="text-lg font-medium">AI Strategic Recommendations</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center text-primary"
            onClick={generateSuggestion}
            disabled={loading}
          >
            <Lightbulb className="h-4 w-4 mr-1" />
            {loading ? "Analyzing..." : "AI Suggestion"}
          </Button>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3 p-2 bg-blue-50 rounded-md">
          <div className="flex items-start">
            <ArrowDown className="h-4 w-4 text-blue-600 mt-1 mr-2" />
            <p className="text-sm text-blue-800">
              Recommendations are derived from Executive Directives and system risk analysis. 
              Implementing these suggestions aligns with leadership priorities.
            </p>
          </div>
        </div>
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
                    
                    {suggestion.alignedWithDirectives && (
                      <div className="ml-2 bg-blue-100 text-blue-800 text-xs py-0.5 px-2 rounded-full flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        <span>Executive Priority</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 inline-block">
                      {suggestion.category.charAt(0).toUpperCase() + suggestion.category.slice(1)}
                    </span>
                    
                    {suggestion.estimatedSavings && (
                      <span className="text-xs px-2 py-0.5 rounded bg-green-50 text-green-700 inline-block">
                        Savings: {formatCurrency(suggestion.estimatedSavings)}
                      </span>
                    )}
                    
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500">Impact:</span>
                      {getImpactIndicator(suggestion.impact)}
                    </div>
                  </div>
                </div>
                <ArrowRight size={16} className={`transition-transform duration-200 ${expandedId === suggestion.id ? 'rotate-90' : ''}`} />
              </div>
              
              {expandedId === suggestion.id && (
                <div className="mt-3 animate-fade-in">
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  
                  {suggestion.relatedIssues && (
                    <div className="bg-slate-50 p-2 rounded-md mb-3">
                      <h4 className="text-xs font-medium text-slate-500 mb-1 flex items-center">
                        <Link className="h-3 w-3 mr-1" />
                        Related Issues
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestion.relatedIssues.map((issue, idx) => (
                          <div key={idx} className="text-xs px-2 py-0.5 bg-white border border-slate-200 rounded flex items-center">
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {suggestion.alignedWithDirectives && (
                    <div className="bg-blue-50 p-2 rounded-md mb-3">
                      <h4 className="text-xs font-medium text-blue-700 mb-1 flex items-center">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        Executive Alignment
                      </h4>
                      <p className="text-xs text-blue-600">This recommendation directly supports executive priorities and directives.</p>
                    </div>
                  )}
                  
                  {suggestion.impact === 'high' && (
                    <div className="bg-red-50 p-2 rounded-md mb-3">
                      <h4 className="text-xs font-medium text-red-700 mb-1 flex items-center">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Impact Analysis
                      </h4>
                      <p className="text-xs text-red-600">This issue affects multiple systems and requires immediate attention to mitigate risk.</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewImpact(suggestion)}
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Impact
                    </Button>
                    
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
