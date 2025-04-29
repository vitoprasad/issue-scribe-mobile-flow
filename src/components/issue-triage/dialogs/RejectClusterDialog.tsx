
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useIssueTriage } from '@/contexts/IssueTriageContext';
import { RejectFormValues } from '@/types/issue-triage';

export const RejectClusterDialog = () => {
  const { 
    isRejectDialogOpen, 
    setIsRejectDialogOpen, 
    currentCluster, 
    handleRejectCluster
  } = useIssueTriage();
  
  const rejectForm = useForm<RejectFormValues>({
    defaultValues: {
      comment: ''
    }
  });

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (isRejectDialogOpen) {
      rejectForm.reset({ comment: '' });
    }
  }, [isRejectDialogOpen, rejectForm]);

  return (
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
                      <FormLabel>Reason for rejection (provides feedback to improve system)</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-[100px]"
                          placeholder="Please provide detailed feedback to help improve suggestions"
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
              <Button 
                type="submit"
                disabled={!rejectForm.watch('comment')}
              >
                Submit Rejection
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
