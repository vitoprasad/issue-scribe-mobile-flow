
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Clipboard, LayoutDashboard, BarChart3, Package } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MainNavigation = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Issue Scribe",
      icon: <FileText className="h-4 w-4" />,
      path: "/",
      description: "Report quality issues with detailed information"
    },
    {
      title: "Issue Tickets",
      icon: <Clipboard className="h-4 w-4" />,
      path: "/issue-tickets",
      description: "View and manage reported quality issues"
    },
    {
      title: "Manager Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      path: "/manager-dashboard",
      description: "Monitor program health and quality metrics"
    },
    {
      title: "Issue Triage",
      icon: <BarChart3 className="h-4 w-4" />,
      path: "/triage",
      description: "Prioritize and categorize incoming issues"
    },
    {
      title: "Executive Dashboard",
      icon: <Package className="h-4 w-4" />,
      path: "/executive-dashboard",
      description: "High-level overview of program health"
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <Link to="/splash" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-industrial-700">Issue Scribe</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Navigation</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {menuItems.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.path}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                isActive(item.path) ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                {item.icon}
                                <div className="text-sm font-medium leading-none">{item.title}</div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="md:hidden">
            <Link to="/splash">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Menu</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
