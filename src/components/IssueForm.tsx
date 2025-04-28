
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Camera, Save, Send, Search, FileText, Info, DollarSign, Image, X } from 'lucide-react';
import PartNumberSearch from '@/components/PartNumberSearch';
import PhotoUpload from '@/components/PhotoUpload';

interface IssueFormData {
  partNumber: string;
  issueClassification: string;
  severity: string;
  manufacturingStage: string;
  costImpact: number | null;
  photoUrl: string | null;
}

const initialFormData: IssueFormData = {
  partNumber: '',
  issueClassification: '',
  severity: '',
  manufacturingStage: '',
  costImpact: null,
  photoUrl: null
};

const IssueForm: React.FC = () => {
  const [formData, setFormData] = useState<IssueFormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitIssue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Validate all required fields
    if (!formData.partNumber || !formData.issueClassification || 
        !formData.severity || !formData.manufacturingStage || 
        formData.costImpact === null) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      setSubmitting(false);
      return;
    }
    
    // Simulate API submission
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Issue Submitted",
        description: "Your issue has been successfully submitted",
      });
      
      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your issue",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // Save to local storage
    localStorage.setItem('issueDraft', JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your draft has been saved locally",
    });
  };

  const handlePartNumberSelect = (partNumber: string) => {
    setFormData({ ...formData, partNumber });
  };

  const handleChange = (field: keyof IssueFormData, value: string | number | null) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Submit Issue Ticket</h2>
        <p className="text-sm text-gray-500 mt-1">Enter the issue details below</p>
      </div>
      
      <form onSubmit={handleSubmitIssue} className="p-5 space-y-5">
        <div className="form-section">
          <Label htmlFor="partNumber" className="input-label flex items-center gap-2">
            <FileText className="h-4 w-4" /> Part Number *
          </Label>
          <PartNumberSearch 
            onSelect={handlePartNumberSelect} 
            value={formData.partNumber} 
          />
        </div>
        
        <div className="form-section">
          <Label htmlFor="issueClassification" className="input-label flex items-center gap-2">
            <Info className="h-4 w-4" /> Issue Classification *
          </Label>
          <Select 
            value={formData.issueClassification}
            onValueChange={(value) => handleChange('issueClassification', value)}
          >
            <SelectTrigger className="select-field">
              <SelectValue placeholder="Select classification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assembly">Assembly</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="mechanical">Mechanical</SelectItem>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="cosmetic">Cosmetic</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="form-section">
          <Label htmlFor="severity" className="input-label flex items-center gap-2">
            <Info className="h-4 w-4" /> Severity *
          </Label>
          <Select 
            value={formData.severity}
            onValueChange={(value) => handleChange('severity', value)}
          >
            <SelectTrigger className="select-field">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical - Production Stopper</SelectItem>
              <SelectItem value="high">High - Significant Impact</SelectItem>
              <SelectItem value="medium">Medium - Limited Impact</SelectItem>
              <SelectItem value="low">Low - Minor Issue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="form-section">
          <Label htmlFor="manufacturingStage" className="input-label flex items-center gap-2">
            <Info className="h-4 w-4" /> Manufacturing Stage *
          </Label>
          <Select 
            value={formData.manufacturingStage}
            onValueChange={(value) => handleChange('manufacturingStage', value)}
          >
            <SelectTrigger className="select-field">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="procurement">Procurement</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="assembly">Assembly</SelectItem>
              <SelectItem value="testing">Testing & QA</SelectItem>
              <SelectItem value="packaging">Packaging</SelectItem>
              <SelectItem value="shipping">Shipping</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="form-section">
          <Label htmlFor="costImpact" className="input-label flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Cost Impact (USD) *
          </Label>
          <Input 
            id="costImpact"
            type="number" 
            placeholder="Enter estimated cost impact"
            className="input-field"
            min="0"
            step="0.01"
            value={formData.costImpact || ''}
            onChange={(e) => handleChange('costImpact', e.target.value ? parseFloat(e.target.value) : null)}
          />
        </div>
        
        <div className="form-section">
          <Label className="input-label flex items-center gap-2">
            <Image className="h-4 w-4" /> Photo Upload (Optional)
          </Label>
          <PhotoUpload 
            onPhotoUploaded={(url) => handleChange('photoUrl', url)}
            existingUrl={formData.photoUrl}
          />
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between mt-8">
          <Button 
            type="button" 
            variant="outline" 
            className="h-12 w-full sm:w-auto text-base font-medium flex gap-2 items-center justify-center"
            onClick={handleSaveDraft}
          >
            <Save className="h-5 w-5" />
            Save Draft
          </Button>
          
          <Button 
            type="submit" 
            className="h-12 w-full sm:w-auto bg-industrial-500 hover:bg-industrial-600 text-white text-base font-medium flex gap-2 items-center justify-center"
            disabled={submitting}
          >
            <Send className="h-5 w-5" />
            {submitting ? 'Submitting...' : 'Submit Issue'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default IssueForm;
