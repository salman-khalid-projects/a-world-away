import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { HeaderProps } from './Header';

export interface MainLayoutProps extends HeaderProps {
  children: React.ReactNode;
}

/**
 * MainLayout component that wraps the entire application
 * Provides header, main content area, and footer
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  judgesMode, 
  onToggleJudgesMode 
}) => {
  return (
    <div className="min-h-screen bg-space-dark space-gradient">
      <Header 
        judgesMode={judgesMode} 
        onToggleJudgesMode={onToggleJudgesMode} 
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

