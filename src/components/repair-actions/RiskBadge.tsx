
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RiskBadgeProps {
  risk: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ risk }) => {
  switch(risk) {
    case 'High':
      return <Badge variant="destructive" className="font-medium">High</Badge>;
    case 'Medium':
      return <Badge variant="default" className="bg-amber-500 font-medium">Medium</Badge>;
    case 'Low':
      return <Badge variant="outline" className="text-green-600 border-green-600 font-medium">Low</Badge>;
    default:
      return <Badge>{risk}</Badge>;
  }
};
