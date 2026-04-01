/**
 * Tasks Page - Task/activity management
 * View and manage user tasks and to-dos
 * @route /tasks
 */
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  LayoutList, 
  Calendar as CalendarIcon, 
  Share2, 
  AlertCircle,
  MoreVertical,
  Plus
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, DataTable, Column, PageActions } from '@crm/ui';

interface Task {
  id: string;
  subject: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'To Do' | 'In Progress' | 'Deferred';
  relatedTo: string;
  relatedType: string;
  ownerName: string;
  ownerAvatar?: string;
  overdueDays?: number;
}

const TASKS: Task[] = [
  {
    id: '1',
    subject: 'Update CRM records for West Coast region',
    description: 'Ensure all phone numbers are formatted...',
    dueDate: '2023-11-01 17:00',
    priority: 'Medium',
    status: 'Completed',
    relatedTo: 'Internal',
    relatedType: 'Account',
    ownerName: 'Jane Smith'
  },
  {
    id: '2',
    subject: 'Follow up with Sarah regarding contract',
    description: 'She had questions about the SLA cl...',
    dueDate: '2023-11-10 10:30',
    priority: 'High',
    status: 'To Do',
    relatedTo: 'Sarah Connor',
    relatedType: 'Contact',
    ownerName: 'John Doe',
    overdueDays: 866
  },
  {
    id: '3',
    subject: 'Prepare Q4 Sales Deck',
    description: 'Include revenue projections and pi...',
    dueDate: '2023-11-15 14:00',
    priority: 'High',
    status: 'In Progress',
    relatedTo: 'Acme Corp',
    relatedType: 'Account',
    ownerName: 'John Doe',
    overdueDays: 860
  },
  {
    id: '4',
    subject: 'Schedule demo with Wayne Enterprises',
    description: 'Coordinate with the product team...',
    dueDate: '2026-03-14 10:00',
    priority: 'Medium',
    status: 'To Do',
    relatedTo: 'Wayne Enterprises',
    relatedType: 'Account',
    ownerName: 'John Doe',
    overdueDays: 11
  },
  {
    id: '5',
    subject: 'Send holiday gift cards',
    description: 'Prepare list of top 50 clients.',
    dueDate: '2026-12-15 09:00',
    priority: 'Low',
    status: 'Deferred',
    relatedTo: 'Multiple',
    relatedType: 'Contact',
    ownerName: 'Jane Smith'
  }
];

export function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const columns: Column<Task>[] = [
    {
      header: '',
      headerClassName: 'w-12',
      render: () => <input type="checkbox" className="rounded border-border text-primary focus:ring-primary bg-background" />
    },
    {
      header: 'Subject',
      render: (task) => (
        <div className="flex items-center gap-4 text-left">
          <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
             <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-semibold">{task.subject}</span>
            <span className="text-[11px] text-muted-foreground font-medium truncate max-w-[250px]">{task.description}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Due Date',
      render: (task) => (
        <div className="flex flex-col text-left gap-1">
          <div className="flex items-center gap-1.5 text-muted-foreground font-medium whitespace-nowrap">
            <CalendarIcon className="w-3 h-3 text-muted-foreground/50" />
            {task.dueDate}
          </div>
          {task.overdueDays && (
             <div className="flex items-center gap-1.5 text-rose-500 font-bold text-[10px]">
                <Clock className="w-3 h-3" />
                Overdue by {task.overdueDays} days
             </div>
          )}
        </div>
      )
    },
    {
      header: 'Priority',
      render: (task) => (
        <Badge 
          variant="outline" 
          className={cn(
            "font-extrabold px-3 py-1 bg-transparent border",
            task.priority === 'High' && "text-rose-600 border-rose-200 dark:border-rose-900/50",
            task.priority === 'Medium' && "text-amber-600 border-amber-200 dark:border-amber-900/50",
            task.priority === 'Low' && "text-muted-foreground border-border"
          )}
        >
          {task.priority}
        </Badge>
      )
    },
    {
      header: 'Status',
      render: (task) => (
        <Badge 
          variant={task.status === 'Completed' ? 'default' : 'secondary'} 
          className={cn(
            "font-bold px-3 py-1",
            task.status === 'Completed' && "bg-emerald-500/10 text-emerald-600 border-emerald-100/20",
            task.status === 'To Do' && "bg-muted text-foreground/80 border-border",
            task.status === 'In Progress' && "bg-primary/10 text-primary border-primary/20",
            task.status === 'Deferred' && "bg-muted text-muted-foreground border-border",
          )}
        >
          <div className="flex items-center gap-1.5">
             <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                task.status === 'Completed' && "bg-emerald-500",
                task.status === 'To Do' && "border border-muted-foreground/50",
                task.status === 'In Progress' && "bg-primary",
                task.status === 'Deferred' && "bg-muted-foreground/40",
             )} />
             {task.status}
          </div>
        </Badge>
      )
    },
    {
      header: 'Related To',
      render: (task) => (
        <div className="flex flex-col text-left">
          <span className="text-foreground font-bold">{task.relatedTo}</span>
          <span className="text-[11px] text-muted-foreground font-medium tracking-tight">{task.relatedType}</span>
        </div>
      )
    },
    {
      header: 'Owner',
      render: (task) => (
        <div className="flex items-center gap-2 text-left">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
             {task.ownerName.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-foreground/80 font-medium">{task.ownerName}</span>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Tasks"
        subtitle="Manage your daily to-dos and follow-ups."
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-card border border-border rounded-xl p-1 shadow-sm mr-2">
               <button 
                  onClick={() => setView('list')}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    view === 'list' ? "bg-muted text-foreground shadow-inner" : "text-muted-foreground hover:text-foreground"
                  )}
               >
                  <LayoutList className="w-4 h-4" />
                  List
               </button>
               <button 
                  onClick={() => setView('calendar')}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    view === 'calendar' ? "bg-muted text-foreground shadow-inner" : "text-muted-foreground hover:text-foreground"
                  )}
               >
                  <CalendarIcon className="w-4 h-4" />
                  Calendar
               </button>
            </div>
            <Button variant="outline" className="flex items-center gap-2 h-10">
              <Share2 className="w-4 h-4" />
              Export
            </Button>
          </div>
        }
      />

      <DataTable 
        data={TASKS}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search tasks..."
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: TASKS.length,
          resultsPerPage: 10,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />
    </div>
  );
}
