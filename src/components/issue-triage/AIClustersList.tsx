
import React from 'react';
import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, X, Shield, Wrench, GitPullRequest, Check } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useIssueTriage } from '@/contexts/IssueTriageContext';
import { filterClusters } from '@/utils/issue-triage-utils';

export const AIClustersList = () => {
  const { 
    clusters, 
    selectedClusters,
    setSelectedClusters,
    filters, 
    handleClusterAction, 
    toggleClusterSelection, 
    handleBulkAction, 
    handleApproveCluster
  } = useIssueTriage();

  // Apply filters
  const filteredClusters = filterClusters(clusters, filters);

  return (
    <div>
      <div className="mb-6 flex items-center justify-end">
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
      </div>
      
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
                          (cluster.confidence || 0) >= 90 ? 'text-green-600' : 
                          (cluster.confidence || 0) >= 75 ? 'text-amber-600' : 
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
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleApproveCluster(cluster.id)}
                        title="Approve"
                        disabled={cluster.status === 'Approved'}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
