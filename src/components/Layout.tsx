import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  showHome?: boolean;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showBack = false, 
  showHome = true,
  title 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Header - Only show if not on home page */}
      {!isHomePage && (showBack || showHome) && (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-safe py-3">
          <div className="container max-w-lg mx-auto flex items-center justify-between">
            {showBack ? (
              <Button
                variant="nav"
                size="icon"
                onClick={() => navigate(-1)}
                aria-label="Go back"
                className="focus-accessible"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            ) : (
              <div className="w-14" />
            )}
            
            {title && (
              <h1 className="text-accessible font-semibold text-foreground">
                {title}
              </h1>
            )}
            
            {showHome && !isHomePage ? (
              <Button
                variant="nav"
                size="icon"
                onClick={() => navigate('/')}
                aria-label="Go to home"
                className="focus-accessible"
              >
                <Home className="h-6 w-6" />
              </Button>
            ) : (
              <div className="w-14" />
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default Layout;
