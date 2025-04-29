
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { RepairActionTableHeader } from './repair-actions/RepairActionTableHeader';
import { RepairActionTableRow } from './repair-actions/RepairActionTableRow';
import { RepairActionDetailViewDialog } from './repair-actions/RepairActionDetailViewDialog';
import { RiskBadge } from './repair-actions/RiskBadge';
import { useRepairActions } from '@/hooks/useRepairActions';
import { getQuickResponseTemplates } from './repair-actions/utils';

export const RepairActionsTable = () => {
  const {
    tableData,
    selectedRepairAction,
    detailViewOpen,
    activeTab,
    changeLogEntry,
    discussionMessage,
    setDetailViewOpen,
    setActiveTab,
    setChangeLogEntry,
    setDiscussionMessage,
    isSystemTagged,
    handleViewDetails,
    handleAction,
    handleAddChangeLogEntry,
    handleAddDiscussionMessage,
    handleSelectResponseTemplate
  } = useRepairActions();

  const quickResponseTemplates = getQuickResponseTemplates();
  
  return (
    <div className="w-full">
      <Table>
        <RepairActionTableHeader />
        <TableBody>
          {tableData.map((item) => (
            <RepairActionTableRow
              key={item.id}
              item={item}
              isSystemTagged={isSystemTagged}
              getRiskBadge={(risk) => <RiskBadge risk={risk} />}
              onViewDetails={handleViewDetails}
              onAction={handleAction}
            />
          ))}
        </TableBody>
      </Table>

      {/* Detail View Dialog */}
      <RepairActionDetailViewDialog
        open={detailViewOpen}
        onOpenChange={setDetailViewOpen}
        repairAction={selectedRepairAction}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        changeLogEntry={changeLogEntry}
        setChangeLogEntry={setChangeLogEntry}
        discussionMessage={discussionMessage}
        setDiscussionMessage={setDiscussionMessage}
        quickResponseTemplates={quickResponseTemplates}
        onAddChangeLogEntry={handleAddChangeLogEntry}
        onAddDiscussionMessage={handleAddDiscussionMessage}
        onSelectResponseTemplate={handleSelectResponseTemplate}
        onApprove={() => selectedRepairAction && handleAction(selectedRepairAction.id, 'approve')}
        onReject={() => selectedRepairAction && handleAction(selectedRepairAction.id, 'reject')}
        onModify={() => selectedRepairAction && handleAction(selectedRepairAction.id, 'modify')}
      />
    </div>
  );
};
