/**
 * FilterBar - Reusable search, filter, and sort controls
 * Used in Accounts, Contacts, Opportunities, Tasks, and other list pages
 */
import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { cn } from '../lib/utils';

export interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  sortValue?: string;
  onSortChange?: (value: string) => void;
  sortOptions?: { label: string; value: string }[];
  onFilterClick?: () => void;
  activeFilterCount?: number;
  className?: string;
}

/**
 * FilterBar Component
 * Provides unified search, sort, and filter controls for list pages
 * 
 * @example
 * <FilterBar
 *   searchValue={searchTerm}
 *   onSearchChange={setSearchTerm}
 *   sortValue={sortBy}
 *   onSortChange={setSortBy}
 *   sortOptions={[{ label: 'Name', value: 'name' }]}
 *   onFilterClick={() => setShowFilters(true)}
 *   activeFilterCount={2}
 * />
 */
export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  sortValue,
  onSortChange,
  sortOptions,
  onFilterClick,
  activeFilterCount = 0,
  className
}: FilterBarProps) {
  return (
    <div className={cn("flex items-center gap-3 flex-wrap", className)}>
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px] max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-border/60 bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* Sort Dropdown */}
      {sortOptions && sortOptions.length > 0 && (
        <div className="relative">
          <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={sortValue}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="h-10 pl-10 pr-8 rounded-lg border border-border/60 bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer appearance-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filter Button */}
      {onFilterClick && (
        <button
          onClick={onFilterClick}
          className={cn(
            "h-10 px-4 rounded-lg border border-border/60 bg-background text-sm font-medium text-foreground flex items-center gap-2 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
            activeFilterCount > 0 && "border-primary bg-primary/5"
          )}
        >
          <Filter className="w-4 h-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
