import React, { useState } from 'react';
import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, X, Filter, Calendar, Info, Clock, Users, Shield, Wrench, MessageSquare, GitPullRequest } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

// Define the type for issue clusters
interface IssueCluster {
  id: string;
  affectedParts: string[];
  likelyFix: string;
  confidence: number;
  program: string;
  severity: 'High' | 'Medium' | 'Low';
  date: string;
  rejectionReason?: string;
  changelog?: ChangeLogEntry[];
  status?: 'Pending' | 'Approved' | 'Rejected';
  submissionType?: 'Standard Repair' | 'Containment' | null;
}

// Define type for change log entries
interface ChangeLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  comment: string;
}

// Define type for standard repairs
interface StandardRepair {
  id: string;
  description: string;
  partNumbers: string[];
  approvedBy: string;
  approvalDate: string;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  daysActive: number;
  program: string;
}

// Define type for containment or escalation
interface Containment {
  id: string;
  description: string;
  affectedAreas: string[];
  approvedBy: string;
  approvalDate: string;
  escalationLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  team: string;
  daysActive: number;
  program: string;
  status: 'Active' | 'Pending Review' | 'Completed';
}

// Mock data for demonstration
const mockClusters: IssueCluster[] = [
  {
    id: 'CL-001',
    affectedParts: ['A123', 'A124', 'A125'],
    likelyFix: 'Calibration adjustment in assembly station 3',
    confidence: 87,
    program: 'Alpha',
    severity: 'High',
    date: '2025-04-25',
    status: 'Pending',
    changelog: []
  },
  {
    id: 'CL-002',
    affectedParts: ['B234', 'B235'],
    likelyFix: 'Replace worn tooling in milling operation',
    confidence: 92,
    program: 'Beta',
    severity: 'Medium',
    date: '2025-04-26',
    status: 'Pending',
    changelog: []
  },
  {
    id: 'CL-003',
    affectedParts: ['C345', 'C346', 'C347', 'C348'],
    likelyFix: 'Update process parameters in coating application',
    confidence: 75,
    program: 'Charlie',
    severity: 'Low',
    date: '2025-04-27',
    status: 'Pending',
    changelog: []
  },
  {
    id: 'CL-004',
    affectedParts: ['D456'],
    likelyFix: 'Supplier quality issue - notify procurement',
    confidence: 95,
    program: 'Delta',
    severity: 'High',
    date: '2025-04-28',
    status: 'Pending',
    changelog: []
  },
  {
    id: 'CL-005',
    affectedParts: ['E567', 'E568', 'E569'],
    likelyFix: 'Operator training required on measurement technique',
    confidence: 83,
    program: 'Alpha',
    severity: 'Medium',
    date: '2025-04-28',
    status: 'Pending',
    changelog: []
  }
];

// Mock data for standard repairs
const mockStandardRepairs: StandardRepair[] = [
  {
    id: 'SR-001',
    description: 'Torque adjustment for connector seating',
    partNumbers: ['A123', 'A124', 'A125'],
    approvedBy: 'Manufacturing Engineering',
    approvalDate: '2025-04-10',
    expiryDate: '2025-07-10',
    status: 'Active',
    daysActive: 18,
    program: 'Alpha'
  },
  {
    id: 'SR-002',
    description: 'Heat treatment parameter adjustment',
    partNumbers: ['B234', 'B235'],
    approvedBy: 'Quality Engineering',
    approvalDate: '2025-03-15',
    expiryDate: '2025-06-15',
    status: 'Active',
    daysActive: 44,
    program: 'Beta'
  },
  {
    id: 'SR-003',
    description: 'Surface finish buffing procedure',
    partNumbers: ['C345', 'C346'],
    approvedBy: 'Process Engineering',
    approvalDate: '2025-02-20',
    expiryDate: '2025-05-01',
    status: 'Expiring Soon',
    daysActive: 67,
    program: 'Charlie'
  },
  {
    id: 'SR-004',
    description: 'Inspection criteria relaxation for non-critical feature',
    partNumbers: ['D456'],
    approvedBy: 'Quality Assurance',
    approvalDate: '2025-01-10',
    expiryDate: '2025-04-30',
    status: 'Expired',
    daysActive: 108,
    program: 'Delta'
  }
];

// Mock data for containments/escalations
const mockContainments: Containment[] = [
  {
    id: 'CE-001',
    description: 'Material lot quarantine due to supplier nonconformance',
    affectedAreas: ['Receiving', 'Assembly Line A'],
    approvedBy: 'Quality Management',
    approvalDate: '2025-04-20',
    escalationLevel: 'High',
    team: 'Supplier Quality',
    daysActive: 8,
    program: 'Alpha',
    status: 'Active'
  },
  {
    id: 'CE-002',
    description: '100% inspection of threaded interfaces',
    affectedAreas: ['Assembly Line B', 'Final Test'],
    approvedBy: 'Operations',
    approvalDate: '2025-04-15',
    escalationLevel: 'Medium',
    team: 'Production',
    daysActive: 13,
    program: 'Beta',
    status: 'Active'
  },
  {
    id: 'CE-003',
    description: 'Temporary process bypass with additional verification',
    affectedAreas: ['CNC Department'],
    approvedBy: 'Process Engineering',
    approvalDate: '2025-04-05',
    escalationLevel: 'Low',
    team: 'Manufacturing Engineering',
    daysActive: 23,
    program: 'Charlie',
    status: 'Pending Review'
  },
  {
    id: 'CE-004',
    description: 'Customer notification for potential late deliveries',
    affectedAreas: ['Logistics', 'Customer Service'],
    approvedBy: 'Executive Leadership',
    approvalDate: '2025-03-28',
    escalationLevel: 'Critical',
    team: 'Program Management',
    daysActive: 31,
    program: 'Delta',
    status: 'Completed'
  }
];

// Define the type for filters
interface Filters {
  program: string;
  severity: string;
  startDate: string;
  endDate: string;
  team: string;
  status: string;
}

// Define interfaces for forms
interface RejectFormValues {
  comment: string;
}

interface SubmissionFormValues {
  submissionType: 'Standard Repair' | 'Containment';
  targetTeam: string;
  comment: string;
}

const IssueTriagePage = () => {
  const { toast } = useToast();
  const [clusters, setClusters] = useState<IssueCluster[]>(mockClusters);
  const [standardRepairs, setStandardRepairs] = useState<StandardRepair[]>(mockStandardRepairs);
  const [containments, setContainments] = useState<Containment[]>(mockContainments);
  const [selectedClusters, setSelectedClusters] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({ 
    program: '', 
    severity: '', 
    startDate: '', 
    endDate: '',
    team: '',
    status: ''
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCluster, setCurrentCluster] = useState<IssueCluster | null>(null);
  const [activeTab, setActiveTab] = useState("clusters");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isChangelogDialogOpen, setIsChangelogDialogOpen] = useState(false);
  const [currentChangeLogEntry, setCurrentChangeLogEntry] = useState<string>('');
  
  // Initialize form hooks
  const rejectForm = useForm<RejectFormValues>({
    defaultValues: {
      comment: ''
    }
  });
  
  const submissionForm = useForm<SubmissionFormValues>({
    defaultValues: {
      submissionType: 'Standard Repair',
      targetTeam: '',
      comment: ''
    }
  });
  
  // Define available teams
  const predefinedTeamOptions = [
    'Manufacturing Engineering',
    'Quality Engineering', 
    'Process Engineering',
    'Operations',
    'Supply Chain',
    'Tooling Department',
    'Production Control'
  ];

  // Calculate summary metrics
  const openClusters = clusters.length;
  const avgConfidence = clusters.length > 0 
    ? Math.round(clusters.reduce((sum, cluster) => sum + cluster.confidence, 0) / clusters.length) 
    : 0;
  const activeStandardRepairs = standardRepairs.filter(repair => repair.status === 'Active').length;
  const activeContainments = containments.filter(containment => containment.status === 'Active').length;

  // Filter unique programs and severities for filter dropdown options
  const uniquePrograms = [...new Set([
    ...clusters.map(cluster => cluster.program),
    ...standardRepairs.map(repair => repair.program),
    ...containments.map(containment => containment.program)
  ])];
  const severityOptions = ['High', 'Medium', 'Low'];
  
  // Generate dynamic team options from the data
  const dynamicTeamOptions = [...new Set([
    ...standardRepairs.map(repair => repair.approvedBy),
    ...containments.map(containment => containment.team)
  ])];
  
  // Combine predefined and dynamic team options
  const allTeamOptions = [...new Set([...predefinedTeamOptions, ...dynamicTeamOptions])];
  
  const statusOptions = ['Active', 'Expiring Soon', 'Expired', 'Pending Review', 'Completed'];

  // Handle filter changes
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Apply filters to clusters
  const filteredClusters = clusters.filter(cluster => {
    return (
      (filters.program === '' || cluster.program === filters.program) &&
      (filters.severity === '' || cluster.severity === filters.severity) &&
      (filters.startDate === '' || new Date(cluster.date) >= new Date(filters.startDate)) &&
      (filters.endDate === '' || new Date(cluster.date) <= new Date(filters.endDate))
    );
  });

  // Apply filters to standard repairs
  const filteredStandardRepairs = standardRepairs.filter(repair => {
    return (
      (filters.program === '' || repair.program === filters.program) &&
      (filters.team === '' || repair.approvedBy === filters.team) &&
      (filters.status === '' || repair.status === filters.status) &&
      (filters.startDate === '' || new Date(repair.approvalDate) >= new Date(filters.startDate)) &&
      (filters.endDate === '' || new Date(repair.approvalDate) <= new Date(filters.endDate))
    );
  });

  // Apply filters to containments
  const filteredContainments = containments.filter(containment => {
    return (
      (filters.program === '' || containment.program === filters.program) &&
      (filters.team === '' || containment.team === filters.team) &&
      (filters.status === '' || containment.status === filters.status) &&
      (filters.startDate === '' || new Date(containment.approvalDate) >= new Date(filters.startDate)) &&
      (filters.endDate === '' || new Date(containment.approvalDate) <= new Date(filters.endDate))
    );
  });

  // Handle cluster selection
  const toggleClusterSelection = (clusterId: string) => {
    setSelectedClusters(prev => 
      prev.includes(clusterId) 
        ? prev.filter(id => id !== clusterId)
        : [...prev, clusterId]
    );
  };

  // Handle bulk actions
  const handleBulkAction = (action: 'modify' | 'reject') => {
    if (selectedClusters.length === 0) {
      toast({
        title: "No clusters selected",
        description: "Please select clusters to perform this action.",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would send the action to an API
    toast({
      title: "Action performed",
      description: `${action.charAt(0).toUpperCase() + action.slice(1)}ed ${selectedClusters.length} clusters.`,
      variant: "default"
    });

    // Clear selection after action
    setSelectedClusters([]);
  };

  // Handle individual cluster action
  const handleClusterAction = (cluster: IssueCluster, action: 'modify' | 'reject' | 'submit' | 'changelog') => {
    setCurrentCluster(cluster);
    
    switch (action) {
      case 'modify':
        // Open edit dialog
        setIsEditDialogOpen(true);
        break;
      case 'reject':
        // Open reject dialog
        setIsRejectDialogOpen(true);
        break;
      case 'submit':
        // Open submit for approval dialog
        setIsSubmitDialogOpen(true);
        break;
      case 'changelog':
        // Open changelog dialog
        handleViewChangelog(cluster);
        break;
    }
  };

  // New function to handle cluster rejection
  const handleRejectCluster = (clusterId: string, reason: string) => {
    setClusters(prev => prev.map(cluster => {
      if (cluster.id === clusterId) {
        const newChangelogEntry: ChangeLogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user: 'Current User',
          action: 'Rejected',
          comment: reason
        };
        
        return {
          ...cluster,
          status: 'Rejected',
          rejectionReason: reason,
          changelog: [...(cluster.changelog || []), newChangelogEntry]
        };
      }
      return cluster;
    }));
    
    toast({
      title: "Cluster Rejected",
      description: `Feedback recorded for AI improvement.`,
    });
    
    setIsRejectDialogOpen(false);
  };
  
  // New function to handle submission for approval
  const handleSubmitForApproval = (clusterId: string, values: SubmissionFormValues) => {
    setClusters(prev => prev.map(cluster => {
      if (cluster.id === clusterId) {
        const newChangelogEntry: ChangeLogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user: 'Current User',
          action: `Submitted for ${values.submissionType} approval to ${values.targetTeam}`,
          comment: values.comment
        };
        
        return {
          ...cluster,
          submissionType: values.submissionType,
          changelog: [...(cluster.changelog || []), newChangelogEntry]
        };
      }
      return cluster;
    }));
    
    toast({
      title: "Submitted for Approval",
      description: `Cluster ${clusterId} sent to ${values.targetTeam} for ${values.submissionType} approval.`,
    });
    
    setIsSubmitDialogOpen(false);
  };
  
  // New function to approve a cluster
  const handleApproveCluster = (clusterId: string) => {
    setClusters(prev => prev.map(cluster => {
      if (cluster.id === clusterId) {
        const newChangelogEntry: ChangeLogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user: 'Current User',
          action: 'Approved',
          comment: 'Approved cluster and AI suggestion.'
        };
        
        return {
          ...cluster,
          status: 'Approved',
          changelog: [...(cluster.changelog || []), newChangelogEntry]
        };
      }
      return cluster;
    }));
    
    toast({
      title: "Cluster Approved",
      description: `Cluster ${clusterId} has been approved.`,
    });
  };
  
  // New function to view cluster changelog
  const handleViewChangelog = (cluster: IssueCluster) => {
    setCurrentCluster(cluster);
    setIsChangelogDialogOpen(true);
  };
  
  // New function to add a comment to the changelog
  const handleAddChangelog = () => {
    if (!currentCluster || !currentChangeLogEntry.trim()) return;
    
    setClusters(prev => prev.map(cluster => {
      if (cluster.id === currentCluster.id) {
        const newChangelogEntry: ChangeLogEntry = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user: 'Current User',
          action: 'Comment',
          comment: currentChangeLogEntry
        };
        
        return {
          ...cluster,
          changelog: [...(cluster.changelog || []), newChangelogEntry]
        };
      }
      return cluster;
    }));
    
    setCurrentChangeLogEntry('');
    
    toast({
      title: "Comment Added",
      description: `Comment added to cluster ${currentCluster.id} changelog.`,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-industrial-100 p-4 flex flex-col">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-industrial-700 mb-2">Issue Triage</h2>
          <p className="text-sm text-industrial-500">Quality Control Dashboard</p>
        </div>
        
        {/* Quick Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-industrial-600 flex items-center mb-3">
            <Filter className="h-4 w-4 mr-2" /> Quick Filters
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-industrial-500 mb-1 block">Program</label>
              <select 
                className="w-full h-9 rounded border border-industrial-200 bg-white px-3 text-sm"
                value={filters.program}
                onChange={(e) => handleFilterChange('program', e.target.value)}
              >
                <option value="">All Programs</option>
                {uniquePrograms.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>
            
            {activeTab === 'clusters' && (
              <div>
                <label className="text-xs text-industrial-500 mb-1 block">Severity</label>
                <select 
                  className="w-full h-9 rounded border border-industrial-200 bg-white px-3 text-sm"
                  value={filters.severity}
                  onChange={(e) => handleFilterChange('severity', e.target.value)}
                >
                  <option value="">All Severities</option>
                  {severityOptions.map(severity => (
                    <option key={severity} value={severity}>{severity}</option>
                  ))}
                </select>
              </div>
            )}
            
            {(activeTab === 'standard-repairs' || activeTab === 'containments') && (
              <>
                <div>
                  <label className="text-xs text-industrial-500 mb-1 block">Team</label>
                  <select 
                    className="w-full h-9 rounded border border-industrial-200 bg-white px-3 text-sm"
                    value={filters.team}
                    onChange={(e) => handleFilterChange('team', e.target.value)}
                  >
                    <option value="">All Teams</option>
                    {allTeamOptions.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-xs text-industrial-500 mb-1 block">Status</label>
                  <select 
                    className="w-full h-9 rounded border border-industrial-200 bg-white px-3 text-sm"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            
            <div>
              <label className="text-xs text-industrial-500 mb-1 block flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> Start Date
              </label>
              <input 
                type="date" 
                className="w-full h-9 rounded border border-industrial-200 bg-white px-3 text-sm"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-xs text-industrial-500 mb-1 block flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> End Date
              </label>
              <input 
                type="date" 
                className="w-full h-9 rounded border border-industrial-200 bg-white px-3 text-sm"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Summary Metrics */}
        <div>
          <h3 className="text-sm font-semibold text-industrial-600 flex items-center mb-3">
            <Info className="h-4 w-4 mr-2" /> Summary Metrics
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-industrial-50 p-3 rounded">
              <div className="text-xs text-industrial-500">Open Clusters</div>
              <div className="text-lg font-bold text-industrial-700">{openClusters}</div>
            </div>
            <div className="bg-industrial-50 p-3 rounded">
              <div className="text-xs text-industrial-500">Avg. Confidence</div>
              <div className="text-lg font-bold text-industrial-700">{avgConfidence}%</div>
            </div>
            <div className="bg-industrial-50 p-3 rounded">
              <div className="text-xs text-industrial-500">Active Repairs</div>
              <div className="text-lg font-bold text-industrial-700">{activeStandardRepairs}</div>
            </div>
            <div className="bg-industrial-50 p-3 rounded">
              <div className="text-xs text-industrial-500">Active Containments</div>
              <div className="text-lg font-bold text-industrial-700">{activeContainments}</div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => setFilters({ program: '', severity: '', startDate: '', endDate: '', team: '', status: '' })}
          >
            Reset Filters
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-6 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="clusters">AI-Clustered Issues</TabsTrigger>
              <TabsTrigger value="standard-repairs">Standard Repairs</TabsTrigger>
              <TabsTrigger value="containments">Containments & Escalations</TabsTrigger>
            </TabsList>
            
            {/* Bulk Actions - only show for clusters tab */}
            {activeTab === 'clusters' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-industrial-500">
                  {selectedClusters.length} selected
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" disabled={selectedClusters.length === 0}>
                      Bulk Disposition
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleBulkAction('reject')}>
                      <X className="mr-2 h-4 w-4 text-red-500" /> Reject All
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          
          {/* AI Clusters Table */}
          <TabsContent value="clusters" className="mt-0">
            <div className="bg-white border border-industrial-100 rounded-md shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-industrial-50">
                    <TableHead className="w-12">
                      <input 
                        type="checkbox" 
                        className="rounded border-industrial-300"
                        checked={selectedClusters.length === filteredClusters.length && filteredClusters.length > 0}
                        onChange={() => {
                          if (selectedClusters.length === filteredClusters.length) {
                            setSelectedClusters([]);
                          } else {
                            setSelectedClusters(filteredClusters.map(c => c.id));
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Cluster ID</TableHead>
                    <TableHead>Affected Parts</TableHead>
                    <TableHead className="w-1/4">Likely Fix (AI Suggestion)</TableHead>
                    <TableHead className="text-center">AI Confidence</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClusters.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-industrial-500">
                        No clusters match the current filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClusters.map((cluster) => (
                      <TableRow key={cluster.id} className={`border-b border-industrial-100 ${
                        cluster.status === 'Approved' ? 'bg-green-50' :
                        cluster.status === 'Rejected' ? 'bg-red-50' : ''
                      }`}>
                        <TableCell>
                          <input 
                            type="checkbox" 
                            className="rounded border-industrial-300"
                            checked={selectedClusters.includes(cluster.id)}
                            onChange={() => toggleClusterSelection(cluster.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{cluster.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {cluster.affectedParts.map(part => (
                              <span 
                                key={part} 
                                className="bg-industrial-100 text-industrial-700 text-xs px-2 py-1 rounded"
                              >
                                {part}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm relative">
                          {cluster.likelyFix}
                          <div className="absolute -top-1 -left-1">
                            <span className="bg-blue-100 text-blue-700 text-[9px] px-1 rounded-sm flex items-center">
                              <span className="mr-1">AI</span>
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center">
                            <div 
                              className={`font-bold ${
                                cluster.confidence >= 90 ? 'text-green-600' : 
                                cluster.confidence >= 75 ? 'text-amber-600' : 
                                'text-red-600'
                              }`}
                            >
                              {cluster.confidence}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            cluster.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                            cluster.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {cluster.status || 'Pending'}
                            {cluster.submissionType && ` - ${cluster.submissionType}`}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleClusterAction(cluster, 'modify')}
                              title="Modify"
                            >
                              <Pencil className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleClusterAction(cluster, 'reject')}
                              title="Reject"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleClusterAction(cluster, 'submit')}
                              title="Submit for approval"
                            >
                              {cluster.submissionType === 'Standard Repair' ? 
                                <Wrench className="h-4 w-4 text-amber-500" /> : 
                                <Shield className="h-4 w-4 text-purple-500" />
                              }
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleClusterAction(cluster, 'changelog')}
                              title="View change log"
                            >
                              <GitPullRequest className="h-4 w-4 text-industrial-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Standard Repairs Table */}
          <TabsContent value="standard-repairs" className="mt-0">
            <div className="bg-white border border-industrial-100 rounded-md shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-industrial-50">
                    <TableHead>ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Part Numbers</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Approval Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Days Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStandardRepairs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-industrial-500">
                        No standard repairs match the current filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStandardRepairs.map((repair) => (
                      <TableRow key={repair.id} className="border-b border-industrial-100">
                        <TableCell className="font-medium">{repair.id}</TableCell>
                        <TableCell>{repair.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {repair.partNumbers.map(part => (
                              <span 
                                key={part} 
                                className="bg-industrial-100 text-industrial-700 text-xs px-2 py-1 rounded"
                              >
                                {part}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{repair.approvedBy}</TableCell>
                        <TableCell>{repair.approvalDate}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            repair.status === 'Active' ? 'bg-green-100 text-green-700' : 
                            repair.status === 'Expiring Soon' ? 'bg-amber-100 text-amber-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {repair.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center items-center gap-1">
                            <Clock className="h-3 w-3 text-industrial-500" />
                            <span className="font-medium">{repair.daysActive}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Containments & Escalations Table */}
          <TabsContent value="containments" className="mt-0">
            <div className="bg-white border border-industrial-100 rounded-md shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-industrial-50">
                    <TableHead>ID</TableHead>
                    <TableHead className="w-1/4">Description</TableHead>
                    <TableHead>Affected Areas</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Approval Date</TableHead>
                    <TableHead>Escalation Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Days Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContainments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-industrial-500">
                        No containments or escalations match the current filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContainments.map((containment) => (
                      <TableRow key={containment.id} className="border-b border-industrial-100">
                        <TableCell className="font-medium">{containment.id}</TableCell>
                        <TableCell>{containment.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {containment.affectedAreas.map(area => (
                              <span 
                                key={area} 
                                className="bg-industrial-100 text-industrial-700 text-xs px-2 py-1 rounded"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-industrial-500" />
                            <span>{containment.team}</span>
                          </div>
                        </TableCell>
                        <TableCell>{containment.approvalDate}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            containment.escalationLevel === 'Critical' ? 'bg-red-100 text-red-700' : 
                            containment.escalationLevel === 'High' ? 'bg-amber-100 text-amber-700' : 
                            containment.escalationLevel === 'Medium' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {containment.escalationLevel}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            containment.status === 'Active' ? 'bg-green-100 text-green-700' : 
                            containment.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {containment.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center items-center gap-1">
                            <Clock className="h-3 w-3 text-industrial-500" />
                            <span className="font-medium">{containment.daysActive}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Modify Cluster {currentCluster?.id}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Likely Fix</label>
              <textarea 
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue={currentCluster?.likelyFix}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({
                title: "Changes saved",
                description: `Cluster ${currentCluster?.id} has been updated.`,
              });
              setIsEditDialogOpen(false);
            }}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Reject Cluster {currentCluster?.id}</DialogTitle>
          </DialogHeader>
          <Form {...rejectForm}>
            <form onSubmit={rejectForm.handleSubmit((values) => {
              if (currentCluster) handleRejectCluster(currentCluster.id, values.comment);
            })}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <FormField
                    control={rejectForm.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for rejection (provides feedback to AI system)</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="min-h-[100px]"
                            placeholder="Please provide detailed feedback to help improve AI suggestions"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsRejectDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Rejection
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Submit for Approval Dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit Cluster {currentCluster?.id} for Approval</DialogTitle>
          </DialogHeader>
          <Form {...submissionForm}>
            <form onSubmit={submissionForm.handleSubmit((values) => {
              if (currentCluster) handleSubmitForApproval(currentCluster.id, values);
            })}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={submissionForm.control}
                  name="submissionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submission Type</FormLabel>
                      <FormControl>
                        <select
                          className="w-full h-9 rounded border border-industrial-200 bg-white px-3 text-sm"
                          {...field}
                        >
                          <option value="Standard Repair">Standard Repair</option>
                          <option value="Containment">Containment/Escalation</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={submissionForm.control}
                  name="targetTeam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Team for Approval</FormLabel>
                      <FormControl>
                        <select
                          className="w-full h-9 rounded border border-industrial-200 bg-white px-3 text-sm"
                          {...field}
                        >
                          <option value="">Select a team...</option>
                          {predefinedTeamOptions.map(team => (
                            <option key={team} value={team}>{team}</option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={submissionForm.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[100px]"
                          placeholder="Additional context or instructions for approval"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsSubmitDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={!submissionForm.watch("targetTeam")}
                >
                  Submit for Approval
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Changelog Dialog */}
      <Dialog open={isChangelogDialogOpen} onOpenChange={setIsChangelogDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Change Log for Cluster {currentCluster?.id}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            <div className="space-y-4">
              {currentCluster?.changelog && currentCluster.changelog.length > 0 ? (
                currentCluster.changelog.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        <span className="font-medium">{entry.user}</span> · {entry.action}
                      </span>
                      <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="mt-1 text-gray-700">{entry.comment}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No change log entries yet
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Add a comment</label>
              <div className="flex gap-2">
                <Textarea 
                  value={currentChangeLogEntry}
                  onChange={(e) => setCurrentChangeLogEntry(e.target.value)}
                  placeholder="Enter a comment to add to the change log"
                  className="min-h-[80px]"
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddChangelog}
                  disabled={!currentChangeLogEntry.trim()}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueTriagePage;
