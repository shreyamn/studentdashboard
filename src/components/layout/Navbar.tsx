import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isStudent = user?.role === 'student';

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || location.pathname !== '/'
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <SidebarTrigger className="mr-2">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden flex"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SidebarTrigger>
          )}
          
          <Link 
            to="/" 
            className="text-xl font-display font-semibold text-primary flex items-center"
          >
            <svg
              className="w-8 h-8 mr-2"
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
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`font-medium text-sm transition-colors hover:text-primary ${
              location.pathname === '/' 
                ? 'text-primary' 
                : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`font-medium text-sm transition-colors hover:text-primary ${
                  location.pathname === '/dashboard' 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                Dashboard
              </Link>
              
              {isStudent && (
                <Link
                  to="/courses"
                  className={`font-medium text-sm transition-colors hover:text-primary ${
                    location.pathname === '/courses' 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  Courses
                </Link>
              )}
              
              <Link
                to="/map"
                className={`font-medium text-sm transition-colors hover:text-primary ${
                  location.pathname === '/map' 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                Campus Map
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                    aria-label="User menu"
                  >
                    <Avatar animated className="h-9 w-9">
                      <AvatarImage
                        src={user?.image}
                        alt={user?.name || 'User'}
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <p>{user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      <User className="h-4 w-4 mr-2" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={logout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
