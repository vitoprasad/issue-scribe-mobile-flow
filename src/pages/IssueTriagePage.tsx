import React from 'react';
import MainNavigation from '@/components/MainNavigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Filter, Search, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const IssueTriagePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Issue Triage</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search issues..."
                className="pl-8 max-w-xs h-9"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="new">
          <TabsList>
            <TabsTrigger value="new">New Issues</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="new">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">QA-2023-45</CardTitle>
                    <CardDescription>High Severity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Part tolerance out of specification affecting assembly</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">Reported 2h ago</span>
                      <Button size="sm">Triage</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">QA-2023-46</CardTitle>
                    <CardDescription>Medium Severity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Surface finish inconsistency on visible components</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">Reported 3h ago</span>
                      <Button size="sm">Triage</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">QA-2023-47</CardTitle>
                    <CardDescription>Low Severity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Documentation discrepancy in assembly instructions</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">Reported 5h ago</span>
                      <Button size="sm">Triage</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="in-progress">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">QA-2023-42</CardTitle>
                    <CardDescription>High Severity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Electrical component failure during stress testing</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">In progress - 1d</span>
                      <Button size="sm" variant="outline">Update</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="assigned">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">QA-2023-38</CardTitle>
                    <CardDescription>Medium Severity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Inconsistent material properties in batch #45892</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">Assigned to J. Smith</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="closed">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">QA-2023-36</CardTitle>
                    <CardDescription>Resolved</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Packaging damage during shipping - process updated</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">Closed 2d ago</span>
                      <Button size="sm" variant="outline">Reopen</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="text-sm text-gray-500">Page 1 of 5</div>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueTriagePage;
