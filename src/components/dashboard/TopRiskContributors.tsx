
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { TrendingDown, TrendingUp, LinkIcon, AlertCircle } from 'lucide-react';
import { RiskItem } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { executiveFeedback } from '@/data/mockFeedbackData';
import { useToast } from "@/hooks/use-toast";

interface TopRiskContributorsProps {
  risks: RiskItem[];
}

export const TopRiskContributors: React.FC<TopRiskContributorsProps> = ({ risks }) => {
  const { toast } = useToast();
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  const getDirectiveDetails = (directiveIds: string[] | undefined) => {
    if (!directiveIds || directiveIds.length === 0) return [];
    
    return executiveFeedback
      .filter(directive => directiveIds.includes(directive.id))
      .map(directive => ({
        id: directive.id,
        title: directive.title,
        priority: directive.priority,
        status: directive.status
      }));
  };

  const handleRiskClick = (riskId: string) => {
    setSelectedRisk(selectedRisk === riskId ? null : riskId);
    
    const risk = risks.find(r => r.id === riskId);
    if (risk) {
      if (risk.relatedDirectives && risk.relatedDirectives.length > 0) {
        toast({
          title: `Risk ${riskId} is covered by ${risk.relatedDirectives.length} directive(s)`,
          description: `Related to: ${risk.relatedDirectives.join(', ')}`
        });
      } else {
        toast({
          title: `Risk ${riskId} has no related directives`,
          description: "This risk is not targeted by any executive directive yet.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Card className={selectedRisk ? "border-blue-400" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top 5 Risk Contributors</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Subsystem</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead>Directive Coverage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {risks.map((risk) => {
              const hasDirectives = risk.relatedDirectives && risk.relatedDirectives.length > 0;
              const isSelected = selectedRisk === risk.id;
              
              return (
                <TableRow 
                  key={risk.id}
                  className={`cursor-pointer ${isSelected ? "bg-blue-50" : ""}`}
                  onClick={() => handleRiskClick(risk.id)}
                >
                  <TableCell className="font-medium">{risk.id}</TableCell>
                  <TableCell>{risk.subsystem}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded text-xs ${
                        risk.severity === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : risk.severity === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {risk.severity}
                    </span>
                  </TableCell>
                  <TableCell>{risk.impact}</TableCell>
                  <TableCell>
                    {risk.trend === 'up' ? (
                      <TrendingUp className="text-red-500" size={18} />
                    ) : risk.trend === 'down' ? (
                      <TrendingDown className="text-green-500" size={18} />
                    ) : (
                      <span className="inline-block w-4 h-0.5 bg-gray-400"></span>
                    )}
                  </TableCell>
                  <TableCell>
                    {hasDirectives ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 flex items-center gap-1">
                                <LinkIcon size={12} />
                                {risk.relatedDirectives?.length}
                              </Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="w-64">
                            <div className="space-y-2 p-1">
                              <p className="text-xs font-semibold">Related Directives:</p>
                              {getDirectiveDetails(risk.relatedDirectives).map((directive) => (
                                <div key={directive.id} className="text-xs border-l-2 border-blue-400 pl-2">
                                  <p className="font-medium">{directive.title}</p>
                                  <div className="flex gap-2 mt-1">
                                    <Badge variant="outline" className="text-[10px]">{directive.id}</Badge>
                                    <Badge 
                                      variant="outline" 
                                      className={`text-[10px] ${
                                        directive.priority === 'critical' ? 'bg-red-50 text-red-700' :
                                        directive.priority === 'high' ? 'bg-orange-50 text-orange-700' :
                                        'bg-blue-50 text-blue-700'
                                      }`}
                                    >
                                      {directive.priority}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Badge variant="outline" className="bg-red-50 text-red-700 flex items-center gap-1">
                                <AlertCircle size={12} />
                                No Coverage
                              </Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">This risk is not addressed by any executive directive</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
