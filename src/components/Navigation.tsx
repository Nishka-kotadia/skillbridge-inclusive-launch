import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">SkillBridge</span>
          </Link>
          
          <div className="flex items-center gap-6">
            {isHome && (
              <>
                <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
                  Features
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                  About
                </a>
                <Link to="/auth">
                  <Button variant="hero" size="lg">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
