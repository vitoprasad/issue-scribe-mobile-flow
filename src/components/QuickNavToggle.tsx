
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, FileText, Clipboard, LayoutDashboard, BarChart3, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const QuickNavToggle = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      title: "Issue Scribe",
      icon: <FileText className="h-4 w-4" />,
      path: "/",
      description: "Report quality issues"
    },
    {
      title: "Issue Tickets",
      icon: <Clipboard className="h-4 w-4" />,
      path: "/issue-tickets",
      description: "Manage reported issues"
    },
    {
      title: "Issue Triage",
      icon: <BarChart3 className="h-4 w-4" />,
      path: "/triage",
      description: "Prioritize issues"
    },
    {
      title: "Manager Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      path: "/manager-dashboard",
      description: "Monitor program health"
    },
    {
      title: "Executive Dashboard",
      icon: <Package className="h-4 w-4" />,
      path: "/executive-dashboard",
      description: "Program overview"
    },
    {
      title: "Splash Page",
      icon: <Menu className="h-4 w-4" />,
      path: "/splash",
      description: "Main menu"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-12 w-12 rounded-full shadow-lg bg-industrial-500 hover:bg-industrial-600"
            size="icon"
          >
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-2">
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.path} asChild className="p-0">
              <Link
                to={item.path}
                className="flex w-full items-center px-3 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                <span className="mr-2 flex h-5 w-5 items-center justify-center">
                  {item.icon}
                </span>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default QuickNavToggle;
