
import { IssueCluster, Filters, StandardRepair, Containment, ChangeLogEntry } from "@/types/issue-triage";

// Filter AI clusters based on filter criteria
export const filterClusters = (clusters: IssueCluster[], filters: Filters): IssueCluster[] => {
  return clusters.filter(cluster => {
    return (
      (filters.program === '' || cluster.program === filters.program) &&
      (filters.severity === '' || cluster.severity === filters.severity) &&
      (filters.startDate === '' || new Date(cluster.date) >= new Date(filters.startDate)) &&
      (filters.endDate === '' || new Date(cluster.date) <= new Date(filters.endDate))
    );
  });
};

// Filter standard repairs based on filter criteria
export const filterStandardRepairs = (repairs: StandardRepair[], filters: Filters): StandardRepair[] => {
  return repairs.filter(repair => {
    return (
      (filters.program === '' || repair.program === filters.program) &&
      (filters.team === '' || repair.approvedBy === filters.team) &&
      (filters.status === '' || repair.status === filters.status) &&
      (filters.startDate === '' || new Date(repair.approvalDate) >= new Date(filters.startDate)) &&
      (filters.endDate === '' || new Date(repair.approvalDate) <= new Date(filters.endDate))
    );
  });
};

// Filter containments based on filter criteria
export const filterContainments = (containments: Containment[], filters: Filters): Containment[] => {
  return containments.filter(containment => {
    return (
      (filters.program === '' || containment.program === filters.program) &&
      (filters.team === '' || containment.team === filters.team) &&
      (filters.status === '' || containment.status === filters.status) &&
      (filters.startDate === '' || new Date(containment.approvalDate) >= new Date(filters.startDate)) &&
      (filters.endDate === '' || new Date(containment.approvalDate) <= new Date(filters.endDate))
    );
  });
};

// Create change log entry
export const createChangeLogEntry = (
  user: string,
  action: string,
  comment: string
): ChangeLogEntry => {
  return {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    user,
    action,
    comment
  };
};

// Update cluster with new change log entry
export const updateClusterWithChangeLog = (
  clusters: IssueCluster[],
  clusterId: string,
  entry: ChangeLogEntry,
  updates: Partial<IssueCluster> = {}
): IssueCluster[] => {
  return clusters.map(cluster => {
    if (cluster.id === clusterId) {
      return {
        ...cluster,
        ...updates,
        changelog: [...(cluster.changelog || []), entry]
      };
    }
    return cluster;
  });
};

// Extract unique values from arrays of objects
export const extractUniqueValues = <T>(
  arrays: T[][],
  extractFn: (item: T) => string
): string[] => {
  const allItems = arrays.flat();
  return [...new Set(allItems.map(extractFn))];
};
