import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@crm/ui';

/**
 * NotFound Component - Standard 404 screen
 * Used for both non-existent routes and restricted routes (to hide their existence)
 */
export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in duration-500 p-6">
      <div className="w-24 h-24 rounded-[2rem] bg-muted/50 flex items-center justify-center text-muted-foreground mb-8 border border-border/60 shadow-xl">
        <Search className="w-12 h-12" />
      </div>
      <h2 className="text-4xl font-bold text-foreground mb-3 tracking-tight">404</h2>
      <h3 className="text-xl font-bold text-foreground mb-4">Page Not Found</h3>
      <p className="text-muted-foreground max-w-md mb-10 text-lg font-medium leading-relaxed">
        The page you are looking for doesn't exist or has been moved. 
        Please check the URL or return to the dashboard.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button onClick={() => navigate('/dashboard')} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-10 h-14 font-bold text-base shadow-lg shadow-primary/20 transition-all active:scale-95 w-full sm:w-auto">
          Back to Dashboard
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)} className="rounded-2xl px-8 h-14 font-bold text-base border-border/60 hover:bg-muted/50 w-full sm:w-auto">
          Go Back
        </Button>
      </div>
    </div>
  );
}
