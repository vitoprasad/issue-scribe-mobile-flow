
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { RiskItem } from '@/types/dashboard';

interface TopRiskContributorsProps {
  risks: RiskItem[];
}

export const TopRiskContributors: React.FC<TopRiskContributorsProps> = ({ risks }) => {
  return (
    <Card>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {risks.map((risk) => (
              <TableRow key={risk.id}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
