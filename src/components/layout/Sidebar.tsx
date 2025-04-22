
import { useState } from "react";
import { Link } from "react-router-dom";
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

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleClose = () => {
    setOpen(false);
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
              src="/placeholder.svg"
              alt="Logo"
              className="h-8 w-8"
            />
            {!collapsed && (
              <h2 className="ml-2 text-lg font-semibold text-nepal-charcoal">
                <span className="text-primary">Nyaya</span> Portal
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
              active={true}
              collapsed={collapsed}
            />
            <NavItem
              href="/petitions"
              icon={FileText}
              title="Petitions"
              subtitle="Case Management"
              collapsed={collapsed}
            />
            <NavItem
              href="/people"
              icon={Users}
              title="People"
              subtitle="Complainants & Defendants"
              collapsed={collapsed}
            />
            <NavItem
              href="/search"
              icon={Search}
              title="Search"
              subtitle="Find Cases"
              collapsed={collapsed}
            />
            <NavItem
              href="/calendar"
              icon={Calendar}
              title="Calendar"
              subtitle="Schedule & Hearings"
              collapsed={collapsed}
            />
            <NavItem
              href="/reports"
              icon={BarChart3}
              title="Reports"
              subtitle="Analytics & Statistics"
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
