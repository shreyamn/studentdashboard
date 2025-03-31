
import { Link, useLocation } from 'react-router-dom';
import { Calendar, BookOpen, Map, Users, Bell, LifeBuoy, Home, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Don't show sidebar on landing page or auth pages
  if (!isAuthenticated || location.pathname === '/') return null;

  // Check if the user is a student (to show courses link)
  const isStudent = user?.role === 'student';

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-5">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              className="fill-primary"
            />
            <path
              d="M2 17L12 22L22 17"
              className="stroke-primary"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              className="stroke-primary"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Campus App
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === '/dashboard'}
                  asChild
                >
                  <Link to="/dashboard">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Only show Courses link for students */}
              {isStudent && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={location.pathname === '/courses'}
                    asChild
                  >
                    <Link to="/courses">
                      <BookOpen className="h-5 w-5" />
                      <span>Courses</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === '/map'}
                  asChild
                >
                  <Link to="/map">
                    <Map className="h-5 w-5" />
                    <span>Campus Map</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === '/events'}
                  asChild
                >
                  <Link to="/events">
                    <Calendar className="h-5 w-5" />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === '/clubs'}
                  asChild
                >
                  <Link to="/clubs">
                    <Users className="h-5 w-5" />
                    <span>Clubs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === '/notifications'}
                  asChild
                >
                  <Link to="/notifications">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === '/support'}
                  asChild
                >
                  <Link to="/support">
                    <LifeBuoy className="h-5 w-5" />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-5">
        <div className="flex items-center gap-3">
          <Avatar animated className="h-10 w-10">
            <AvatarImage
              src={user?.profileImage}
              alt={user?.name || 'User'}
            />
            <AvatarFallback>
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.role} • {user?.department}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={logout}
            aria-label="Log out"
          >
            <Link to="/profile">
              <User className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
