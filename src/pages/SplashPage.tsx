
import React from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clipboard, LayoutDashboard, BarChart3, Package } from 'lucide-react';

const SplashPage = () => {
  const menuItems = [
    {
      title: "Issue Scribe",
      icon: <FileText className="h-6 w-6" />,
      path: "/issue-scribe",
      description: "Report quality issues with detailed information",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Issue Tickets",
      icon: <Clipboard className="h-6 w-6" />,
      path: "/issue-tickets",
      description: "View and manage reported quality issues",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Issue Triage",
      icon: <BarChart3 className="h-6 w-6" />,
      path: "/triage",
      description: "Prioritize and categorize incoming issues",
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "Manager Dashboard",
      icon: <LayoutDashboard className="h-6 w-6" />,
      path: "/manager-dashboard",
      description: "Monitor program health and quality metrics",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Executive Dashboard",
      icon: <Package className="h-6 w-6" />,
      path: "/executive-dashboard",
      description: "High-level overview of program health",
      color: "bg-indigo-50 text-indigo-600"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-industrial-700 mb-3">Welcome to Issue Scribe</h1>
            <p className="text-lg text-gray-600">Quality management and issue tracking system</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Link key={item.title} to={item.path} className="no-underline">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-md ${item.color}`}>
                        {item.icon}
                      </div>
                    </div>
                    <CardTitle className="mt-2">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Open {item.title}
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
