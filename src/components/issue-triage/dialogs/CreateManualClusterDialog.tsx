
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useIssueTriage } from '@/contexts/IssueTriageContext';
import { ManualClusterFormValues } from '@/types/issue-triage';

export const CreateManualClusterDialog = () => {
  const { 
    isCreateManualClusterDialogOpen, 
    setIsCreateManualClusterDialogOpen,
    handleCreateManualCluster,
    uniquePrograms,
    severityOptions
  } = useIssueTriage();
  
  const manualClusterForm = useForm<ManualClusterFormValues>({
    defaultValues: {
      affectedParts: '',
      likelyFix: '',
      program: '',
      severity: 'Medium',
      justification: '',
      source: ''
    }
  });

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (isCreateManualClusterDialogOpen) {
      manualClusterForm.reset({
        affectedParts: '',
        likelyFix: '',
        program: '',
        severity: 'Medium',
        justification: '',
        source: ''
      });
    }
  }, [isCreateManualClusterDialogOpen, manualClusterForm]);

  return (
    <Dialog open={isCreateManualClusterDialogOpen} onOpenChange={setIsCreateManualClusterDialogOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Manual Cluster</DialogTitle>
        </DialogHeader>
        
        <Form {...manualClusterForm}>
          <form onSubmit={manualClusterForm.handleSubmit(handleCreateManualCluster)} className="space-y-4">
            <FormField
              control={manualClusterForm.control}
              name="affectedParts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affected Parts (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. A123, A124, A125" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={manualClusterForm.control}
              name="likelyFix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suggested Fix</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the suggested fix for these issues"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={manualClusterForm.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-9 rounded border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        <option value="">Select a program...</option>
                        {uniquePrograms.map(program => (
                          <option key={program} value={program}>{program}</option>
                        ))}
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={manualClusterForm.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-9 rounded border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        {severityOptions.map(severity => (
                          <option key={severity} value={severity}>{severity}</option>
                        ))}
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={manualClusterForm.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Information</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Field observation, Inspection findings, etc." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={manualClusterForm.control}
              name="justification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Justification / Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide reasoning and supporting details for this cluster"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => setIsCreateManualClusterDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={
                  !manualClusterForm.watch("affectedParts") || 
                  !manualClusterForm.watch("likelyFix") || 
                  !manualClusterForm.watch("program")
                }
              >
                Create Cluster
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
