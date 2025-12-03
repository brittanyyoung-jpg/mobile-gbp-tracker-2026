import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { LayoutDashboard, Plus, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Layout({ children, currentPageName }) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
    { name: 'New', icon: Plus, page: 'NewProject', highlight: true },
  ];

  const showNav = !['NewProject', 'EditProject', 'Reports', 'KeywordResearch'].includes(currentPageName);

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        :root {
          --primary: 220 14% 10%;
          --primary-foreground: 0 0% 100%;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* Hide scrollbars but keep functionality */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Custom marker styles for leaflet */
        .custom-rank-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
      
      {children}

      {/* Bottom Navigation - Mobile Only */}
      {showNav && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 safe-area-pb">
          <div className="max-w-lg mx-auto flex items-center justify-around">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={cn(
                  'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
                  item.highlight 
                    ? 'bg-slate-900 text-white -mt-6 shadow-lg px-6'
                    : currentPageName === item.page
                      ? 'text-slate-900'
                      : 'text-slate-400 hover:text-slate-600'
                )}
              >
                <item.icon className={cn('h-5 w-5', item.highlight && 'h-6 w-6')} />
                <span className={cn('text-xs font-medium', item.highlight && 'text-xs')}>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
