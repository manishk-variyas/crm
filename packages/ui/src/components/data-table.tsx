import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { AlphabetFilter } from './alphabet-filter';
import { cn } from '../lib/utils';

export interface Column<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  sortKey?: string;
  sortable?: boolean;
  headerClassName?: string;
  cellClassName?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T) => React.ReactNode;
}

export interface SortOption {
  label: string;
  key: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'text' | 'number' | 'custom';
  options?: { value: string; label: string }[];
  placeholder?: string;
  render?: (
    value: string, 
    onChange: (k: string, v: string) => void, 
    allFilters: Record<string, string>
  ) => React.ReactNode;
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
  sortOptions?: SortOption[];
  defaultSort?: { key: string; direction: 'asc' | 'desc' };
  onSortChange?: (sort: { key: string; direction: 'asc' | 'desc' }) => void;
  filters?: FilterConfig[];
  activeFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
  emptyMessage?: string;
  alphabetFilter?: {
    value: string;
    onChange: (value: string) => void;
  };
}

function SortDropdown<T>({ 
  options, 
  currentSort, 
  onSortChange 
}: { 
  options: SortOption[], 
  currentSort: { key: string; direction: 'asc' | 'desc' } | null,
  onSortChange: (sort: { key: string; direction: 'asc' | 'desc' }) => void
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <Button 
        variant="outline" 
        className={cn(
          "flex items-center gap-2.5 font-bold h-10 px-4 text-[13px] border-border/60 hover:bg-muted transition-all rounded-xl",
          isOpen && "bg-muted border-primary/20",
          currentSort && "text-primary border-primary/20 bg-primary/5"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ArrowUpDown className={cn("w-3.5 h-3.5", currentSort ? "text-primary" : "text-muted-foreground")} />
        <span>{currentSort ? `Sorted by: ${options.find(opt => opt.key === currentSort.key)?.label}` : 'Sort'}</span>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 w-56 bg-card border border-border/80 shadow-[0_10px_40px_rgb(0,0,0,0.12)] rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-3.5 text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
            Sort By
          </div>
          <div className="flex flex-col px-1.5 pb-1.5 gap-0.5">
            {options.map((option) => {
              const isActive = currentSort?.key === option.key;
              return (
                <button
                  key={option.key}
                  onClick={() => {
                    if (isActive) {
                      onSortChange({ ...currentSort!, direction: currentSort!.direction === 'asc' ? 'desc' : 'asc' });
                    } else {
                      onSortChange({ key: option.key, direction: 'asc' });
                    }
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-[14px] font-bold rounded-xl transition-all group w-full text-left",
                    isActive
                      ? "bg-primary/5 text-primary"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="flex-1">{option.label}</span>
                  {isActive && (
                    <span className="text-primary font-bold ml-2">
                      {currentSort.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel<T>({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters
}: {
  filters: FilterConfig[];
  activeFilters?: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}) {
  const isFiltered = hasActiveFilters !== undefined 
    ? hasActiveFilters 
    : Object.values(activeFilters || {}).some(v => v && v !== 'all');
  
  return (
    <div className="px-6 py-6 border-b border-border/50 bg-muted/10 flex flex-wrap items-end gap-x-8 gap-y-6">
      {filters.map((filter) => (
        <div key={filter.key} className="flex flex-col gap-2 min-w-[160px]">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-0.5">
            {filter.label}
          </label>
          {filter.type === 'custom' && filter.render ? (
            filter.render(activeFilters?.[filter.key] || '', onFilterChange, activeFilters || {})
          ) : filter.type === 'select' ? (
            <select
              value={activeFilters?.[filter.key] || 'all'}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-background text-[13px] font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer hover:border-primary/30"
            >
              <option value="all">All {filter.label}s</option>
              {filter.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={filter.type}
              placeholder={filter.placeholder}
              value={activeFilters?.[filter.key] || ''}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-background text-[13px] font-bold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-primary/30"
            />
          )}
        </div>
      ))}
      
      {isFiltered && onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="h-10 flex items-center gap-2 text-[13px] font-bold text-rose-500 hover:text-rose-600 transition-colors ml-auto bg-rose-50/50 px-4 rounded-xl border border-rose-100 hover:bg-rose-50"
        >
          <X className="w-4 h-4" />
          Clear All Filters
        </button>
      )}
    </div>
  );
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
  showFilters = true,
  sortOptions,
  defaultSort,
  onSortChange,
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters: parentHasActiveFilters,
  emptyMessage = "No data found.",
  alphabetFilter
}: DataTableProps<T>) {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentSort, setCurrentSort] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(defaultSort || null);

  const handleSortChange = (sort: { key: string; direction: 'asc' | 'desc' }) => {
    setCurrentSort(sort);
    onSortChange?.(sort);
  };

  const hasActiveFilters = parentHasActiveFilters !== undefined 
    ? parentHasActiveFilters 
    : (
        Object.values(activeFilters || {}).some(v => v && v !== 'all') || 
        !!(searchTerm && searchTerm.trim().length > 0) ||
        !!(alphabetFilter?.value)
      );

  return (
    <Card className="shadow-lg bg-card overflow-hidden p-0">
      <CardContent className="p-0">
        {/* Filters Bar */}
        {showFilters && (
          <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
            <div className="relative group w-full max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                value={searchTerm || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {filters && filters.length > 0 && (
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1 sm:flex-none items-center gap-2 font-medium h-9 text-sm transition-all",
                    showFilterPanel && "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
                  )}
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                >
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                  {hasActiveFilters && (
                    <span className={cn(
                      "ml-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center",
                      showFilterPanel ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                    )}>
                      •
                    </span>
                  )}
                </Button>
              )}
              {sortOptions && sortOptions.length > 0 && (
                <SortDropdown 
                  options={sortOptions} 
                  currentSort={currentSort}
                  onSortChange={handleSortChange}
                />
              )}
              {filterActions}
            </div>
          </div>
        )}

        {/* Collapsible Filter Panel */}
        {showFilters && filters && filters.length > 0 && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              showFilterPanel ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <FilterPanel
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={onFilterChange || (() => {})}
              onClearFilters={onClearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        )}

        {/* Alphabet Filter */}
        {alphabetFilter && (
          <AlphabetFilter 
            value={alphabetFilter.value} 
            onChange={alphabetFilter.onChange} 
          />
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border/50 uppercase tracking-wider text-[11px] font-bold text-muted-foreground/70">
                {columns.map((col, idx) => {
                  const sKey = col.sortKey || (col.accessorKey as string);
                  const isSortable = col.sortable && sKey;
                  const isActive = currentSort?.key === sKey;
                  
                  return (
                    <th 
                      key={idx} 
                      className={cn(
                        "px-6 py-4 font-bold select-none", 
                        col.align === 'center' ? "text-center" : col.align === 'right' ? "text-right" : "text-left",
                        isSortable && "cursor-pointer hover:text-foreground hover:bg-black/5 transition-colors",
                        isActive && "text-foreground bg-black/5",
                        col.headerClassName
                      )}
                      onClick={() => {
                        if (isSortable) {
                          handleSortChange({
                            key: sKey,
                            direction: isActive && currentSort?.direction === 'asc' ? 'desc' : 'asc'
                          });
                        }
                      }}
                    >
                      <div className={cn(
                        "flex items-center gap-2",
                        col.align === 'center' ? "justify-center" : col.align === 'right' ? "justify-end" : "justify-start"
                      )}>
                        {col.header}
                        {isSortable && (
                          <div className="flex flex-col">
                            {isActive ? (
                              currentSort?.direction === 'asc' ? 
                                <span className="text-primary leading-none text-[10px]">↑</span> : 
                                <span className="text-primary leading-none text-[10px]">↓</span>
                            ) : (
                              <ArrowUpDown className="w-3 h-3 opacity-30" />
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
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
                        col.align === 'center' ? "text-center" : col.align === 'right' ? "text-right" : "text-left",
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
          
          {data.length === 0 && (
            <div className="px-6 py-12 text-center text-muted-foreground text-sm font-medium">
              {emptyMessage}
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {pagination && (
          <div className="p-4 border-t border-border/50 flex items-center justify-between text-sm text-placeholder bg-muted/20">
            <p className="font-medium text-muted-foreground">
              Showing <span className="text-foreground font-bold">{Math.min((pagination.currentPage - 1) * pagination.resultsPerPage + 1, pagination.totalResults)} to {Math.min(pagination.currentPage * pagination.resultsPerPage, pagination.totalResults)}</span> of <span className="text-foreground font-bold">{pagination.totalResults}</span> results
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
