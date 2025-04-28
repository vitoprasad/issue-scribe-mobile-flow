
import React, { useState, useEffect } from 'react';
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
import { FilterState } from '@/pages/IssueTicketsPage';

export const IssueTicketsFilters = ({ 
  filters, 
  onFilterChange,
  onClearFilters
}: {
  filters: FilterState,
  onFilterChange: (filters: FilterState) => void,
  onClearFilters: () => void
}) => {
  const [expanded, setExpanded] = useState({
    categories: false,
    cost: false,
    severity: false,
    date: false
  });

  const form = useForm({
    defaultValues: {
      minCost: filters.minCost?.toString() || "",
      maxCost: filters.maxCost?.toString() || "",
      startDate: filters.startDate || "",
      endDate: filters.endDate || ""
    }
  });

  // Reset form when filters are cleared externally
  useEffect(() => {
    form.reset({
      minCost: filters.minCost?.toString() || "",
      maxCost: filters.maxCost?.toString() || "",
      startDate: filters.startDate || "",
      endDate: filters.endDate || ""
    });
  }, [filters, form]);
  
  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFilterChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleSeverityChange = (severity: string, checked: boolean) => {
    const newSeverities = checked 
      ? [...filters.severityLevels, severity]
      : filters.severityLevels.filter(s => s !== severity);
    
    onFilterChange({
      ...filters,
      severityLevels: newSeverities
    });
  };

  const handleCostRangeApply = () => {
    const minCost = form.getValues("minCost") ? Number(form.getValues("minCost")) : null;
    const maxCost = form.getValues("maxCost") ? Number(form.getValues("maxCost")) : null;
    
    onFilterChange({
      ...filters,
      minCost,
      maxCost
    });
  };

  const handleDateRangeApply = () => {
    const startDate = form.getValues("startDate") || null;
    const endDate = form.getValues("endDate") || null;
    
    onFilterChange({
      ...filters,
      startDate,
      endDate
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
            <CategoryCheckbox 
              label="Bearing Wear" 
              count={3} 
              checked={filters.categories.includes("Bearing Wear")}
              onChange={(checked) => handleCategoryChange("Bearing Wear", checked)}
            />
            <CategoryCheckbox 
              label="Cooling System" 
              count={2} 
              checked={filters.categories.includes("Cooling System")}
              onChange={(checked) => handleCategoryChange("Cooling System", checked)}
            />
            <CategoryCheckbox 
              label="Electrical" 
              count={1} 
              checked={filters.categories.includes("Electrical")}
              onChange={(checked) => handleCategoryChange("Electrical", checked)}
            />
            <CategoryCheckbox 
              label="Sealing" 
              count={1} 
              checked={filters.categories.includes("Sealing")}
              onChange={(checked) => handleCategoryChange("Sealing", checked)}
            />
            <CategoryCheckbox 
              label="Material Quality" 
              count={1} 
              checked={filters.categories.includes("Material Quality")}
              onChange={(checked) => handleCategoryChange("Material Quality", checked)}
            />
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
              <Button 
                size="sm" 
                className="w-full text-xs"
                onClick={handleCostRangeApply}
              >
                Apply Range
              </Button>
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
            <SeverityCheckbox 
              label="High" 
              color="text-destructive" 
              count={3} 
              checked={filters.severityLevels.includes("High")}
              onChange={(checked) => handleSeverityChange("High", checked)}
            />
            <SeverityCheckbox 
              label="Medium" 
              color="text-amber-500" 
              count={3}
              checked={filters.severityLevels.includes("Medium")}
              onChange={(checked) => handleSeverityChange("Medium", checked)}
            />
            <SeverityCheckbox 
              label="Low" 
              color="text-green-600" 
              count={2}
              checked={filters.severityLevels.includes("Low")}
              onChange={(checked) => handleSeverityChange("Low", checked)}
            />
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
              <Button 
                size="sm" 
                className="w-full text-xs"
                onClick={handleDateRangeApply}
              >
                Apply Dates
              </Button>
            </div>
          </Form>
        )}
      </div>

      <Separator />
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full"
        onClick={onClearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

const CategoryCheckbox = ({ 
  label, 
  count, 
  checked, 
  onChange 
}: { 
  label: string, 
  count: number,
  checked: boolean,
  onChange: (checked: boolean) => void
}) => {
  return (
    <div className="flex items-center">
      <input 
        type="checkbox" 
        id={`category-${label}`}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
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

const SeverityCheckbox = ({ 
  label, 
  color, 
  count,
  checked,
  onChange 
}: { 
  label: string, 
  color: string, 
  count: number,
  checked: boolean,
  onChange: (checked: boolean) => void
}) => {
  return (
    <div className="flex items-center">
      <input 
        type="checkbox" 
        id={`severity-${label}`}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
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
