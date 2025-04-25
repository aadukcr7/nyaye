import { Bell, User, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    alert("Notifications feature coming soon!");
  };

  const handleDownloadClick = () => {
    alert("Download feature coming soon!");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-nepal-lightgray sm:px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
        <h1 className="text-xl font-semibold text-nepal-charcoal">
          <span
            className="text-primary nepali-text cursor-pointer"
            onClick={() => navigate("/")}
          >
            ठाडो उजुरी व्यवस्थापन प्रणाली
          </span>{" "}
          | Petition Management System
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:block w-64">
          <Input
            type="text"
            placeholder="Search cases..."
            className="h-9 bg-nepal-lightgray"
          />
        </div>

        <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={handleDownloadClick}>
          <Download className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 rounded-full h-8 w-8 aspect-square"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary text-white">OP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
