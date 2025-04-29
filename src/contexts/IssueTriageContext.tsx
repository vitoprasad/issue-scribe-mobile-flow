
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  IssueCluster, 
  ChangeLogEntry, 
  StandardRepair, 
  Containment, 
  Filters, 
  RejectFormValues,
  SubmissionFormValues,
  ManualClusterFormValues
} from '@/types/issue-triage';
import { 
  mockClusters, 
  mockManualClusters, 
  mockStandardRepairs, 
  mockContainments 
} from '@/data/mockIssueTriageData';
import { createChangeLogEntry, updateClusterWithChangeLog } from '@/utils/issue-triage-utils';

interface IssueTriageContextType {
  // Data
  clusters: IssueCluster[];
  setClusters: React.Dispatch<React.SetStateAction<IssueCluster[]>>;
  manualClusters: IssueCluster[];
  setManualClusters: React.Dispatch<React.SetStateAction<IssueCluster[]>>;
  standardRepairs: StandardRepair[];
  setStandardRepairs: React.Dispatch<React.SetStateAction<StandardRepair[]>>;
  containments: Containment[];
  setContainments: React.Dispatch<React.SetStateAction<Containment[]>>;
  
  // Selections
  selectedClusters: string[];
  setSelectedClusters: React.Dispatch<React.SetStateAction<string[]>>;
  selectedManualClusters: string[];
  setSelectedManualClusters: React.Dispatch<React.SetStateAction<string[]>>;
  
  // Active item
  currentCluster: IssueCluster | null;
  setCurrentCluster: React.Dispatch<React.SetStateAction<IssueCluster | null>>;
  
  // Filters
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  
  // Dialog states
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRejectDialogOpen: boolean;
  setIsRejectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitDialogOpen: boolean;
  setIsSubmitDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChangelogDialogOpen: boolean;
  setIsChangelogDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCreateManualClusterDialogOpen: boolean;
  setIsCreateManualClusterDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Changelog
  currentChangeLogEntry: string;
  setCurrentChangeLogEntry: React.Dispatch<React.SetStateAction<string>>;
  
  // Tab management
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  
  // Operations
  toggleClusterSelection: (clusterId: string, isManual?: boolean) => void;
  handleBulkAction: (action: 'modify' | 'reject', isManual?: boolean) => void;
  handleClusterAction: (cluster: IssueCluster, action: 'modify' | 'reject' | 'submit' | 'changelog') => void;
  handleCreateManualCluster: (data: ManualClusterFormValues) => void;
  handleRejectCluster: (clusterId: string, reason: string) => void;
  handleSubmitForApproval: (clusterId: string, values: SubmissionFormValues) => void;
  handleApproveCluster: (clusterId: string) => void;
  handleViewChangelog: (cluster: IssueCluster) => void;
  handleAddChangelog: () => void;
  
  // Summary metrics
  openClusters: number;
  avgConfidence: number;
  openManualClusters: number;
  activeStandardRepairs: number;
  activeContainments: number;
  
  // Options for dropdowns
  uniquePrograms: string[];
  severityOptions: string[];
  allTeamOptions: string[];
  statusOptions: string[];
}

export const IssueTriageContext = createContext<IssueTriageContextType | null>(null);

export const useIssueTriage = () => {
  const context = useContext(IssueTriageContext);
  if (!context) {
    throw new Error('useIssueTriage must be used within an IssueTriageProvider');
  }
  return context;
};

export const IssueTriageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [clusters, setClusters] = useState<IssueCluster[]>(mockClusters);
  const [manualClusters, setManualClusters] = useState<IssueCluster[]>(mockManualClusters);
  const [standardRepairs, setStandardRepairs] = useState<StandardRepair[]>(mockStandardRepairs);
  const [containments, setContainments] = useState<Containment[]>(mockContainments);
  const [selectedClusters, setSelectedClusters] = useState<string[]>([]);
  const [selectedManualClusters, setSelectedManualClusters] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({ 
    program: '', 
    severity: '', 
    startDate: '', 
    endDate: '',
    team: '',
    status: '',
    source: ''
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCluster, setCurrentCluster] = useState<IssueCluster | null>(null);
  const [activeTab, setActiveTab] = useState("clusters");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isChangelogDialogOpen, setIsChangelogDialogOpen] = useState(false);
  const [currentChangeLogEntry, setCurrentChangeLogEntry] = useState<string>('');
  const [isCreateManualClusterDialogOpen, setIsCreateManualClusterDialogOpen] = useState(false);

  // Calculate summary metrics
  const openClusters = clusters.length;
  const avgConfidence = clusters.length > 0 
    ? Math.round(clusters.reduce((sum, cluster) => sum + (cluster.confidence || 0), 0) / clusters.length) 
    : 0;
  const openManualClusters = manualClusters.length;
  const activeStandardRepairs = standardRepairs.filter(repair => repair.status === 'Active').length;
  const activeContainments = containments.filter(containment => containment.status === 'Active').length;

  // Filter unique programs and severities for filter dropdown options
  const uniquePrograms = [...new Set([
    ...clusters.map(cluster => cluster.program),
    ...manualClusters.map(cluster => cluster.program),
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
  const allTeamOptions = [...new Set([...dynamicTeamOptions])];
  
  const statusOptions = ['Active', 'Expiring Soon', 'Expired', 'Pending Review', 'Completed'];

  // Handle cluster selection
  const toggleClusterSelection = (clusterId: string, isManual = false) => {
    if (isManual) {
      setSelectedManualClusters(prev => 
        prev.includes(clusterId) 
          ? prev.filter(id => id !== clusterId)
          : [...prev, clusterId]
      );
    } else {
      setSelectedClusters(prev => 
        prev.includes(clusterId) 
          ? prev.filter(id => id !== clusterId)
          : [...prev, clusterId]
      );
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: 'modify' | 'reject', isManual = false) => {
    const selectedIds = isManual ? selectedManualClusters : selectedClusters;
    if (selectedIds.length === 0) {
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
      description: `${action.charAt(0).toUpperCase() + action.slice(1)}ed ${selectedIds.length} clusters.`,
      variant: "default"
    });

    // Clear selection after action
    if (isManual) {
      setSelectedManualClusters([]);
    } else {
      setSelectedClusters([]);
    }
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

  // Function to handle creating a new manual cluster
  const handleCreateManualCluster = (data: ManualClusterFormValues) => {
    const newCluster: IssueCluster = {
      id: `MC-${String(manualClusters.length + 1).padStart(3, '0')}`,
      affectedParts: data.affectedParts.split(',').map(part => part.trim()),
      likelyFix: data.likelyFix,
      program: data.program,
      severity: data.severity,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      source: 'Manual',
      creator: 'Current User',
      justification: data.justification,
      changelog: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user: 'Current User',
          action: 'Created',
          comment: data.justification
        }
      ]
    };
    
    setManualClusters(prev => [...prev, newCluster]);
    
    toast({
      title: "Manual cluster created",
      description: `Cluster ${newCluster.id} has been created successfully.`,
    });
    
    setIsCreateManualClusterDialogOpen(false);
  };

  // New function to handle cluster rejection
  const handleRejectCluster = (clusterId: string, reason: string) => {
    const changeLogEntry = createChangeLogEntry('Current User', 'Rejected', reason);
    const updates = { status: 'Rejected' as const, rejectionReason: reason };
    
    // Check if the cluster is in AI clusters or manual clusters
    const aiCluster = clusters.find(c => c.id === clusterId);
    if (aiCluster) {
      setClusters(updateClusterWithChangeLog(clusters, clusterId, changeLogEntry, updates));
    } else {
      setManualClusters(updateClusterWithChangeLog(manualClusters, clusterId, changeLogEntry, updates));
    }
    
    toast({
      title: "Cluster Rejected",
      description: `Feedback recorded for improvement.`,
    });
    
    setIsRejectDialogOpen(false);
  };
  
  // Function to handle submission for approval
  const handleSubmitForApproval = (clusterId: string, values: SubmissionFormValues) => {
    const changeLogEntry = createChangeLogEntry(
      'Current User',
      `Submitted for ${values.submissionType} approval to ${values.targetTeam}`,
      values.comment
    );
    
    const updates = { submissionType: values.submissionType };
    
    // Check if the cluster is in AI clusters or manual clusters
    const aiCluster = clusters.find(c => c.id === clusterId);
    if (aiCluster) {
      setClusters(updateClusterWithChangeLog(clusters, clusterId, changeLogEntry, updates));
    } else {
      setManualClusters(updateClusterWithChangeLog(manualClusters, clusterId, changeLogEntry, updates));
    }
    
    toast({
      title: "Submitted for Approval",
      description: `Cluster ${clusterId} sent to ${values.targetTeam} for ${values.submissionType} approval.`,
    });
    
    setIsSubmitDialogOpen(false);
  };
  
  // Function to approve a cluster
  const handleApproveCluster = (clusterId: string) => {
    const changeLogEntry = createChangeLogEntry(
      'Current User',
      'Approved',
      'Approved cluster suggestion.'
    );
    
    const updates = { status: 'Approved' as const };
    
    // Check if the cluster is in AI clusters or manual clusters
    const aiCluster = clusters.find(c => c.id === clusterId);
    if (aiCluster) {
      setClusters(updateClusterWithChangeLog(clusters, clusterId, changeLogEntry, updates));
    } else {
      setManualClusters(updateClusterWithChangeLog(manualClusters, clusterId, changeLogEntry, updates));
    }
    
    toast({
      title: "Cluster Approved",
      description: `Cluster ${clusterId} has been approved.`,
    });
  };
  
  // Function to view cluster changelog
  const handleViewChangelog = (cluster: IssueCluster) => {
    setCurrentCluster(cluster);
    setIsChangelogDialogOpen(true);
  };
  
  // Function to add a comment to the changelog
  const handleAddChangelog = () => {
    if (!currentCluster || !currentChangeLogEntry.trim()) return;
    
    const changeLogEntry = createChangeLogEntry(
      'Current User',
      'Comment',
      currentChangeLogEntry
    );
    
    // Check if the cluster is in AI clusters or manual clusters
    const aiCluster = clusters.find(c => c.id === currentCluster.id);
    if (aiCluster) {
      setClusters(updateClusterWithChangeLog(clusters, currentCluster.id, changeLogEntry));
    } else {
      setManualClusters(updateClusterWithChangeLog(manualClusters, currentCluster.id, changeLogEntry));
    }
    
    setCurrentChangeLogEntry('');
    
    toast({
      title: "Comment Added",
      description: `Comment added to cluster ${currentCluster.id} changelog.`,
    });
  };

  const value = {
    // Data
    clusters,
    setClusters,
    manualClusters,
    setManualClusters,
    standardRepairs,
    setStandardRepairs,
    containments,
    setContainments,
    
    // Selections
    selectedClusters,
    setSelectedClusters,
    selectedManualClusters,
    setSelectedManualClusters,
    
    // Active item
    currentCluster,
    setCurrentCluster,
    
    // Filters
    filters,
    setFilters,
    
    // Dialog states
    isEditDialogOpen,
    setIsEditDialogOpen,
    isRejectDialogOpen,
    setIsRejectDialogOpen,
    isSubmitDialogOpen,
    setIsSubmitDialogOpen,
    isChangelogDialogOpen,
    setIsChangelogDialogOpen,
    isCreateManualClusterDialogOpen,
    setIsCreateManualClusterDialogOpen,
    
    // Changelog
    currentChangeLogEntry,
    setCurrentChangeLogEntry,
    
    // Tab management
    activeTab,
    setActiveTab,
    
    // Operations
    toggleClusterSelection,
    handleBulkAction,
    handleClusterAction,
    handleCreateManualCluster,
    handleRejectCluster,
    handleSubmitForApproval,
    handleApproveCluster,
    handleViewChangelog,
    handleAddChangelog,
    
    // Summary metrics
    openClusters,
    avgConfidence,
    openManualClusters,
    activeStandardRepairs,
    activeContainments,
    
    // Options for dropdowns
    uniquePrograms,
    severityOptions,
    allTeamOptions,
    statusOptions
  };

  return (
    <IssueTriageContext.Provider value={value}>
      {children}
    </IssueTriageContext.Provider>
  );
};
