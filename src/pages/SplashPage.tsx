
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, FileText, LayoutDashboard, Clipboard, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SplashPage = () => {
  const pages = [
    {
      title: "Issue Scribe",
      description: "Report and document quality issues with detailed information",
      icon: <FileText className="h-10 w-10 text-industrial-600" />,
      path: "/",
      color: "bg-blue-50 border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Issue Tickets",
      description: "View and manage all reported quality issues",
      icon: <Clipboard className="h-10 w-10 text-amber-600" />,
      path: "/issue-tickets",
      color: "bg-amber-50 border-amber-200",
      buttonColor: "bg-amber-600 hover:bg-amber-700"
    },
    {
      title: "Manager Dashboard",
      description: "Monitor program health and quality metrics",
      icon: <LayoutDashboard className="h-10 w-10 text-emerald-600" />,
      path: "/manager-dashboard",
      color: "bg-emerald-50 border-emerald-200",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700"
    },
    {
      title: "Issue Triage",
      description: "Prioritize and categorize incoming quality issues",
      icon: <BarChart3 className="h-10 w-10 text-purple-600" />,
      path: "/triage",
      color: "bg-purple-50 border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      title: "Executive Dashboard",
      description: "High-level overview of program health metrics",
      icon: <Package className="h-10 w-10 text-rose-600" />,
      path: "/executive-dashboard",
      color: "bg-rose-50 border-rose-200",
      buttonColor: "bg-rose-600 hover:bg-rose-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-industrial-700 mb-3">Issue Scribe</h1>
          <p className="text-xl text-industrial-500 max-w-2xl mx-auto">
            Integrated Quality Assurance System for Manufacturing Resource Planning
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Card key={page.path} className={`overflow-hidden border ${page.color} transition-all hover:shadow-md`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  {page.icon}
                  <CardTitle className="text-xl font-bold">{page.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  {page.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-1 w-1/3 bg-gradient-to-r from-industrial-300 to-industrial-500 rounded-full"></div>
              </CardContent>
              <CardFooter>
                <Link to={page.path} className="w-full">
                  <Button className={`w-full ${page.buttonColor} text-white`}>
                    Navigate
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-industrial-500">
            Quality Assurance System • Issue Management • Performance Analytics
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
