
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useIssueTriage } from '@/contexts/IssueTriageContext';
import { useToast } from '@/hooks/use-toast';

export const EditClusterDialog = () => {
  const { isEditDialogOpen, setIsEditDialogOpen, currentCluster } = useIssueTriage();
  const { toast } = useToast();
  const [likelyFix, setLikelyFix] = React.useState('');

  // Update local state when currentCluster changes
  React.useEffect(() => {
    if (currentCluster) {
      setLikelyFix(currentCluster.likelyFix);
    }
  }, [currentCluster]);

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: `Cluster ${currentCluster?.id} has been updated.`,
    });
    setIsEditDialogOpen(false);
  };

  return (
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
              value={likelyFix}
              onChange={(e) => setLikelyFix(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
