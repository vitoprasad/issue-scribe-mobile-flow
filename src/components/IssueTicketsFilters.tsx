
import React, { useState } from 'react';
import { Calendar, DollarSign, Tag, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

export const IssueTicketsFilters = () => {
  const [expanded, setExpanded] = useState({
    categories: false,
    cost: false,
    severity: false,
    date: false
  });

  const form = useForm({
    defaultValues: {
      minCost: "",
      maxCost: "",
      startDate: "",
      endDate: ""
    }
  });
  
  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  return (
    <div className="space-y-4 p-2">
      {/* Category Filter */}
      <div>
        <Button 
          variant="ghost" 
          className="w-full flex justify-between items-center py-2 px-3 text-sm"
          onClick={() => toggleSection('categories')}
        >
          <span className="flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            Issue Categories
          </span>
        </Button>
        {expanded.categories && (
          <div className="mt-2 space-y-1 pl-8 pr-2">
            <CategoryCheckbox label="Bearing Wear" count={3} />
            <CategoryCheckbox label="Cooling System" count={2} />
            <CategoryCheckbox label="Electrical" count={1} />
            <CategoryCheckbox label="Sealing" count={1} />
            <CategoryCheckbox label="Material Quality" count={1} />
          </div>
        )}
      </div>

      <Separator />

      {/* Cost Range Filter */}
      <div>
        <Button 
          variant="ghost" 
          className="w-full flex justify-between items-center py-2 px-3 text-sm"
          onClick={() => toggleSection('cost')}
        >
          <span className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Cost Impact Range
          </span>
        </Button>
        {expanded.cost && (
          <Form {...form}>
            <div className="mt-2 space-y-3 px-2">
              <FormField
                control={form.control}
                name="minCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Minimum Cost ($)</FormLabel>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      className="h-8 text-sm"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Maximum Cost ($)</FormLabel>
                    <Input 
                      type="number" 
                      placeholder="50000" 
                      className="h-8 text-sm"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <Button size="sm" className="w-full text-xs">Apply Range</Button>
            </div>
          </Form>
        )}
      </div>

      <Separator />

      {/* Severity Filter */}
      <div>
        <Button 
          variant="ghost" 
          className="w-full flex justify-between items-center py-2 px-3 text-sm"
          onClick={() => toggleSection('severity')}
        >
          <span className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Severity Level
          </span>
        </Button>
        {expanded.severity && (
          <div className="mt-2 space-y-1 pl-8 pr-2">
            <SeverityCheckbox label="High" color="text-destructive" count={3} />
            <SeverityCheckbox label="Medium" color="text-amber-500" count={3} />
            <SeverityCheckbox label="Low" color="text-green-600" count={2} />
          </div>
        )}
      </div>

      <Separator />

      {/* Date Range Filter */}
      <div>
        <Button 
          variant="ghost" 
          className="w-full flex justify-between items-center py-2 px-3 text-sm"
          onClick={() => toggleSection('date')}
        >
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </span>
        </Button>
        {expanded.date && (
          <Form {...form}>
            <div className="mt-2 space-y-3 px-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Start Date</FormLabel>
                    <Input 
                      type="date" 
                      className="h-8 text-sm"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">End Date</FormLabel>
                    <Input 
                      type="date" 
                      className="h-8 text-sm"
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <Button size="sm" className="w-full text-xs">Apply Dates</Button>
            </div>
          </Form>
        )}
      </div>

      <Separator />
      
      <Button variant="outline" size="sm" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );
};

const CategoryCheckbox = ({ label, count }: { label: string, count: number }) => {
  return (
    <div className="flex items-center">
      <input 
        type="checkbox" 
        id={`category-${label}`}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label 
        htmlFor={`category-${label}`}
        className="ml-2 text-sm flex-1"
      >
        {label}
      </label>
      <span className="text-xs text-gray-500">{count}</span>
    </div>
  );
};

const SeverityCheckbox = ({ label, color, count }: { label: string, color: string, count: number }) => {
  return (
    <div className="flex items-center">
      <input 
        type="checkbox" 
        id={`severity-${label}`}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label 
        htmlFor={`severity-${label}`}
        className={`ml-2 text-sm flex-1 font-medium ${color}`}
      >
        {label}
      </label>
      <span className="text-xs text-gray-500">{count}</span>
    </div>
  );
};
