
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useIssueTriage } from '@/contexts/IssueTriageContext';
import { SubmissionFormValues } from '@/types/issue-triage';
import { predefinedTeamOptions } from '@/data/mockIssueTriageData';

export const SubmitForApprovalDialog = () => {
  const { 
    isSubmitDialogOpen, 
    setIsSubmitDialogOpen, 
    currentCluster, 
    handleSubmitForApproval
  } = useIssueTriage();
  
  const submissionForm = useForm<SubmissionFormValues>({
    defaultValues: {
      submissionType: 'Standard Repair',
      targetTeam: '',
      comment: ''
    }
  });

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (isSubmitDialogOpen) {
      submissionForm.reset({
        submissionType: 'Standard Repair',
        targetTeam: '',
        comment: ''
      });
    }
  }, [isSubmitDialogOpen, submissionForm]);

  return (
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
  );
};
