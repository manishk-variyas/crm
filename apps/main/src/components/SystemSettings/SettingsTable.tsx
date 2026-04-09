/**
 * SettingsTable - Reusable table component for System Settings pages
 */
import React from 'react';
import { Button, cn } from '@crm/ui';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface SettingsTableProps<T> {
  title: string;
  description: string;
  columns: Column<T>[];
  data: T[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  addButtonLabel?: string;
  actions?: boolean;
}

export function SettingsTable<T extends Record<string, any>>({
  title,
  description,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  addButtonLabel = 'Add',
  actions = true,
}: SettingsTableProps<T>) {
  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        {onAdd && (
          <Button 
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95"
            onClick={onAdd}
          >
            <Plus className="w-4 h-4" /> {addButtonLabel}
          </Button>
        )}
      </div>

      <div className="overflow-x-auto no-scrollbar border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm min-w-[700px]">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className={cn("px-8 py-5", col.className)}>
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-8 py-5 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-muted/5 transition-colors group">
                {columns.map((col) => (
                  <td key={String(col.key)} className={cn("px-8 py-6", col.className)}>
                    {col.render ? col.render(item) : item[col.key as keyof T]}
                  </td>
                ))}
                {actions && (
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(item)}
                          className="text-muted-foreground/60 hover:text-primary transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => onDelete(item)}
                          className="text-muted-foreground/60 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}