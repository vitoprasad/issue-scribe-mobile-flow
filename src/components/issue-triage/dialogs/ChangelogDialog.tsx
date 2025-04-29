
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import { useIssueTriage } from '@/contexts/IssueTriageContext';

export const ChangelogDialog = () => {
  const { 
    isChangelogDialogOpen, 
    setIsChangelogDialogOpen, 
    currentCluster,
    currentChangeLogEntry,
    setCurrentChangeLogEntry,
    handleAddChangelog
  } = useIssueTriage();

  return (
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
  );
};
