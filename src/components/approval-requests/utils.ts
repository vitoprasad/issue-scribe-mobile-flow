
import { ApprovalRequest } from './types';

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

export const getTypeLabel = (type: string) => {
  if (type === 'Repair Action') {
    return 'bg-blue-600';
  } else if (type === 'Containment') {
    return 'bg-purple-600';
  }
  return 'default';
};

export const sortRequestsByDate = (requests: ApprovalRequest[]): ApprovalRequest[] => {
  return [...requests].sort((a, b) => 
    new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
  );
};
