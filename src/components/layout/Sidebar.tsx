import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FileText, 
  Home, 
  Users, 
  Search, 
  Calendar, 
  BarChart3, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem = ({
  href,
  icon: Icon,
  title,
  subtitle,
  active,
  collapsed,
}: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-nepal-blue text-primary"
          : "text-nepal-charcoal hover:bg-nepal-lightgray"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && (
        <div className="flex flex-col">
          <span>{title}</span>
          {subtitle && <span className="text-xs text-nepal-mediumgray">{subtitle}</span>}
        </div>
      )}
    </Link>
  );
};

export function Sidebar({ open, setOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isPathActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleClose}
      />

      <div
        className={cn(
          "fixed z-50 inset-y-0 left-0 flex flex-col w-64 bg-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed && "md:w-16"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-nepal-lightgray">
          <div className="flex items-center">
            <img
              src="/image.png"
              alt="Nyaye Logo"
              className="h-9 w-9 object-contain"
            />
            {!collapsed && (
              <h2 className="ml-2 text-lg font-semibold text-nepal-charcoal">
                <span className="text-primary">Nyaye</span> Portal
              </h2>
            )}
          </div>
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-nepal-charcoal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 py-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            <NavItem
              href="/"
              icon={Home}
              title="Dashboard"
              subtitle="Overview"
              active={isPathActive('/')}
              collapsed={collapsed}
            />
            <NavItem
              href="/petitions"
              icon={FileText}
              title="Petitions"
              subtitle="Case Management"
              active={isPathActive('/petitions')}
              collapsed={collapsed}
            />
            <NavItem
              href="/people"
              icon={Users}
              title="People"
              subtitle="Complainants & Defendants"
              active={isPathActive('/people')}
              collapsed={collapsed}
            />
            <NavItem
              href="/search"
              icon={Search}
              title="Search"
              subtitle="Find Cases"
              active={isPathActive('/search')}
              collapsed={collapsed}
            />
            <NavItem
              href="/calendar"
              icon={Calendar}
              title="Calendar"
              subtitle="Schedule & Hearings"
              active={isPathActive('/calendar')}
              collapsed={collapsed}
            />
            <NavItem
              href="/reports"
              icon={BarChart3}
              title="Reports"
              subtitle="Analytics & Statistics"
              active={isPathActive('/reports')}
              collapsed={collapsed}
            />
          </nav>
        </div>

        <div className="border-t border-nepal-lightgray p-2">
          <NavItem
            href="/settings"
            icon={Settings}
            title="Settings"
            subtitle="System Configuration"
            active={isPathActive('/settings')}
            collapsed={collapsed}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="hidden md:flex w-full justify-center mt-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
