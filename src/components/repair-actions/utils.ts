
import { RepairAction } from '../approval-requests/types';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const getRiskBadge = (risk: string) => {
  switch(risk) {
    case 'High':
      return 'destructive';
    case 'Medium':
      return 'default bg-amber-500';
    case 'Low':
      return 'outline text-green-600 border-green-600';
    default:
      return 'default';
  }
};

export const sortActionsByDate = (actions: RepairAction[]): RepairAction[] => {
  return [...actions].sort((a, b) => 
    new Date((b.submissionDate || '')).getTime() - new Date((a.submissionDate || '')).getTime()
  );
};

export const getQuickResponseTemplates = (): { label: string; template: string }[] => {
  return [
    {
      label: "Looks good",
      template: "This repair action looks good. I approve of the approach taken."
    },
    {
      label: "Need more info",
      template: "I need more information about this repair action before making a decision."
    },
    {
      label: "Consider alternative",
      template: "Have we considered alternative approaches? I think we should explore other options."
    },
    {
      label: "Cost concern",
      template: "I have concerns about the cost implications of this repair action."
    },
    {
      label: "Schedule impact",
      template: "What's the impact on schedule if we implement this repair action?"
    }
  ];
};
