
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RepairAction } from '../../approval-requests/types';
import { formatDate } from '../utils';
import { GitPullRequest } from 'lucide-react';

interface ChangeLogTabProps {
  repairAction: RepairAction;
  changeLogEntry: string;
  setChangeLogEntry: (value: string) => void;
  onAddChangeLogEntry: () => void;
}

export const ChangeLogTab: React.FC<ChangeLogTabProps> = ({
  repairAction,
  changeLogEntry,
  setChangeLogEntry,
  onAddChangeLogEntry
}) => {
  return (
    <div className="space-y-4">
      {repairAction.changelog && repairAction.changelog.length > 0 ? (
        repairAction.changelog.map((entry) => (
          <div key={entry.id} className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                <span className="font-medium">{entry.user}</span> · {entry.action}
              </span>
              <span>{formatDate(entry.timestamp)}</span>
            </div>
            <div className="mt-1 text-gray-700">{entry.comment}</div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">
          No change log entries yet
        </div>
      )}
      
      <div className="mt-6 border-t pt-4">
        <h3 className="font-medium text-sm mb-2">Add to Change Log</h3>
        <Textarea 
          value={changeLogEntry}
          onChange={(e) => setChangeLogEntry(e.target.value)}
          placeholder="Add a note to the change log..."
          className="min-h-[80px] mb-3"
        />
        <div className="flex justify-end">
          <Button 
            onClick={onAddChangeLogEntry}
            disabled={!changeLogEntry.trim()}
          >
            <GitPullRequest className="h-4 w-4 mr-2" />
            Add to Change Log
          </Button>
        </div>
      </div>
    </div>
  );
};
