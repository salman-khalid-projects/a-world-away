import React from 'react';
import { TabConfig } from '../../types';
import { cn } from '../../utils/cn';

export interface TabsProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

/**
 * Tabs component for navigation between different analysis views
 */
export const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  className 
}) => {
  return (
    <div className={cn("mt-8", className)}>
      <div className="flex gap-2 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-2 text-sm rounded-t-lg transition-colors",
              activeTab === tab.id 
                ? "bg-white/10 text-white" 
                : "text-white/60 hover:text-white"
            )}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

