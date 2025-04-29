
import React from 'react';
import { Filter, Calendar, Info, Clock, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIssueTriage } from "@/contexts/IssueTriageContext";
import { predefinedTeamOptions } from "@/data/mockIssueTriageData";

export const IssueTriageSidebar = () => {
  const { 
    filters, 
    setFilters, 
    uniquePrograms, 
    severityOptions, 
    allTeamOptions, 
    statusOptions,
    activeTab,
    openClusters,
    avgConfidence,
    openManualClusters,
    activeStandardRepairs,
    activeContainments
  } = useIssueTriage();

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
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
          
          {(activeTab === 'clusters' || activeTab === 'manual-clusters') && (
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
                  {[...allTeamOptions, ...predefinedTeamOptions].map(team => (
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
            <div className="text-xs text-industrial-500">AI Clusters</div>
            <div className="text-lg font-bold text-industrial-700">{openClusters}</div>
          </div>
          <div className="bg-industrial-50 p-3 rounded">
            <div className="text-xs text-industrial-500">Manual Clusters</div>
            <div className="text-lg font-bold text-industrial-700">{openManualClusters}</div>
          </div>
          <div className="bg-industrial-50 p-3 rounded">
            <div className="text-xs text-industrial-500">AI Confidence</div>
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
          onClick={() => setFilters({ program: '', severity: '', startDate: '', endDate: '', team: '', status: '', source: '' })}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
