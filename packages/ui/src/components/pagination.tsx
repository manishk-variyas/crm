/**
 * DataTablePagination - Standalone pagination controls
 * Can be used outside DataTable or for custom pagination
 */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { cn } from '../lib/utils';

export interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * DataTablePagination Component
 * Provides Previous/Next pagination with results info
 * 
 * @example
 * <DataTablePagination
 *   currentPage={1}
 *   totalPages={5}
 *   totalResults={50}
 *   resultsPerPage={10}
 *   onPageChange={setPage}
 * />
 */
export function DataTablePagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage = 10,
  onPageChange,
  className
}: DataTablePaginationProps) {
  const startResult = Math.min((currentPage - 1) * resultsPerPage + 1, totalResults);
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className={cn("flex items-center justify-between p-4 border-t border-border/50 text-sm bg-muted/20", className)}>
      <p className="font-medium text-muted-foreground">
        Showing <span className="text-foreground font-bold">{startResult}</span> to <span className="text-foreground font-bold">{endResult}</span> of <span className="text-foreground font-bold">{totalResults}</span> results
      </p>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="px-4 py-2 font-semibold h-9 gap-1 shadow-sm disabled:opacity-50"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button 
          variant="outline" 
          className="px-4 py-2 font-semibold h-9 gap-1 shadow-sm disabled:opacity-50"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
