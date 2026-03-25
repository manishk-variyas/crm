import React from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { cn } from '../lib/utils';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  headerClassName?: string;
  cellClassName?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    resultsPerPage: number;
    onPageChange: (page: number) => void;
  };
  filterActions?: React.ReactNode;
  showFilters?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  onRowClick,
  pagination,
  filterActions,
  showFilters = true
}: DataTableProps<T>) {
  return (
    <Card className="shadow-lg bg-card overflow-hidden p-0">
      <CardContent className="p-0">
        {/* Filters Bar */}
        {showFilters && (
          <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
            <div className="relative group w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                value={searchTerm || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none items-center gap-2 font-medium h-9 text-sm">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none items-center gap-2 font-medium h-9 text-sm">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort
              </Button>
              {filterActions}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border/50 uppercase tracking-wider text-[11px] font-bold text-muted-foreground/70">
                {columns.map((col, idx) => (
                  <th 
                    key={idx} 
                    className={cn(
                      "px-6 py-4 font-bold", 
                      col.align === 'center' && "text-center", 
                      col.align === 'right' && "text-right",
                      col.headerClassName
                    )}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 text-[13px]">
              {data.map((row, rowIdx) => (
                <tr 
                  key={rowIdx} 
                  className={cn(
                    "group hover:bg-primary/5 transition-colors", 
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col, colIdx) => (
                    <td 
                      key={colIdx} 
                      className={cn(
                        "px-6 py-4", 
                        col.align === 'center' && "text-center", 
                        col.align === 'right' && "text-right",
                        col.cellClassName
                      )}
                    >
                      {col.render ? col.render(row) : (col.accessorKey ? String(row[col.accessorKey]) : null)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {pagination && (
          <div className="p-4 border-t border-border/50 flex items-center justify-between text-sm text-placeholder bg-muted/20">
            <p className="font-medium text-muted-foreground">
              Showing <span className="text-foreground font-bold">{(pagination.currentPage - 1) * pagination.resultsPerPage + 1} to {Math.min(pagination.currentPage * pagination.resultsPerPage, pagination.totalResults)}</span> of <span className="text-foreground font-bold">{pagination.totalResults}</span> results
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="px-4 py-2 font-semibold h-9 gap-1 shadow-sm disabled:opacity-50"
                onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
                disabled={pagination.currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button 
                variant="outline" 
                className="px-4 py-2 font-semibold h-9 gap-1 shadow-sm disabled:opacity-50"
                onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
