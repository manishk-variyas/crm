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
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Save,
  X
} from 'lucide-react';
import { Button, Badge, cn, PageHeader, DataTable, Column, PageActions, Modal, FormInput, FormSelect, FormTextarea } from '@crm/ui';

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
  const [alphabetLetter, setAlphabetLetter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredData = TASKS.filter((task) => {
    const matchesSearch = !searchTerm ||
      task.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.relatedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.ownerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAlphabet = !alphabetLetter || task.subject.toUpperCase().startsWith(alphabetLetter);

    return matchesSearch && matchesAlphabet;
  });

  const hasActiveFilters = !!searchTerm || !!alphabetLetter;

  const clearFilters = () => {
    setSearchTerm('');
    setAlphabetLetter('');
  };

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
          <PageActions 
            actions={[
              { 
                label: 'List', 
                variant: view === 'list' ? 'primary' : 'outline', 
                icon: <LayoutList className="w-4 h-4" />, 
                onClick: () => setView('list'),
              },
              { 
                label: 'Calendar', 
                variant: view === 'calendar' ? 'primary' : 'outline', 
                icon: <CalendarIcon className="w-4 h-4" />, 
                onClick: () => setView('calendar'),
              },
              { label: 'Export', variant: 'outline', icon: <Share2 className="w-4 h-4" />, onClick: () => {} },
              { label: 'Add Task', variant: 'primary', icon: <Plus className="w-4 h-4" />, onClick: () => setIsAddModalOpen(true) }
            ]}
          />
        }
      />

      {view === 'list' ? (
        <DataTable 
          data={filteredData}
          columns={columns}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          alphabetFilter={{
            value: alphabetLetter,
            onChange: setAlphabetLetter
          }}
          searchPlaceholder="Search tasks..."
          pagination={{
            currentPage: 1,
            totalPages: 1,
            totalResults: filteredData.length,
            resultsPerPage: 10,
            onPageChange: (page) => console.log('Page change:', page)
          }}
          onRowClick={(task) => setEditingTask(task)}
        />
      ) : (
        <CalendarView onAddTask={() => setIsAddModalOpen(true)} />
      )}

      {(isAddModalOpen || editingTask) && (
        <TaskModal 
          task={editingTask} 
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingTask(null);
          }} 
        />
      )}
    </div>
  );
}

function TaskModal({ task, onClose }: { task?: Task | null, onClose: () => void }) {
  const isEditing = !!task;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isEditing ? 'Edit Task' : 'Add New Task'}
      description={isEditing ? 'Update the details for this task.' : 'Create a new task and assign it.'}
      className="max-w-xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="h-10 px-6 font-bold rounded-xl border-border/60">
            Cancel
          </Button>
          <Button onClick={onClose} className="flex items-center gap-2 h-10 px-6 font-bold rounded-xl shadow-lg shadow-primary/20">
            <Save className="w-4 h-4" />
            {isEditing ? 'Update Task' : 'Save Task'}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 py-4">
        <FormInput 
          label="Subject" 
          placeholder="e.g., Prepare sales deck" 
          defaultValue={task?.subject || ''}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect 
            label="Status" 
            defaultValue={task?.status || 'To Do'}
            options={[
              { value: 'To Do', label: 'To Do' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
              { value: 'Deferred', label: 'Deferred' }
            ]}
          />
          <FormSelect 
            label="Priority" 
            defaultValue={task?.priority || 'Medium'}
            options={[
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' }
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput 
            label="Due Date" 
            type="date" 
            defaultValue={task?.dueDate?.split(' ')[0] || '2026-04-03'}
          />
          <FormInput 
             label="Due Time" 
             type="time" 
             defaultValue={task?.dueDate?.split(' ')[1] || '12:30'}
          />
        </div>

        <FormInput 
          label="Related To" 
          placeholder="Search customer contact or account" 
          defaultValue={task?.relatedTo || ''}
        />

        <FormTextarea 
          label="Description" 
          placeholder="Add details about this task..." 
          rows={4}
          defaultValue={task?.description || ''}
        />
      </div>
    </Modal>
  );
}

function CalendarView({ onAddTask }: { onAddTask: () => void }) {
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('month');
  
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  // Create a mock grid for April 2026 as shown in the screenshot
  const gridDays = [
    { day: 30, month: 'prev' }, { day: 31, month: 'prev' }, { day: 1, month: 'current' }, { day: 2, month: 'current' }, { day: 3, month: 'current', today: true }, { day: 4, month: 'current' }, { day: 5, month: 'current' },
    { day: 6, month: 'current' }, { day: 7, month: 'current' }, { day: 8, month: 'current' }, { day: 9, month: 'current' }, { day: 10, month: 'current' }, { day: 11, month: 'current' }, { day: 12, month: 'current' },
    { day: 13, month: 'current' }, { day: 14, month: 'current' }, { day: 15, month: 'current' }, { day: 16, month: 'current' }, { day: 17, month: 'current' }, { day: 18, month: 'current' }, { day: 19, month: 'current' },
    { day: 20, month: 'current' }, { day: 21, month: 'current' }, { day: 22, month: 'current' }, { day: 23, month: 'current' }, { day: 24, month: 'current' }, { day: 25, month: 'current' }, { day: 26, month: 'current' },
    { day: 27, month: 'current' }, { day: 28, month: 'current' }, { day: 29, month: 'current' }, { day: 30, month: 'current' }, { day: 1, month: 'next' }, { day: 2, month: 'next' }, { day: 3, month: 'next' },
  ];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Calendar Control Bar */}
      <div className="flex items-center justify-between bg-card p-4 border border-border shadow-sm rounded-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-[15px] font-bold text-foreground">April 2026</h2>
          <Button variant="outline" className="h-8 px-4 text-xs font-bold rounded-lg border-border/80">
            Today
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="h-9 w-64 pl-9 pr-4 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs font-medium"
            />
          </div>

          <div className="flex items-center bg-muted/30 border border-border rounded-xl p-1">
            <button 
              onClick={() => setCurrentView('day')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                currentView === 'day' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Day
            </button>
            <button 
              onClick={() => setCurrentView('week')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                currentView === 'week' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Week
            </button>
            <button 
              onClick={() => setCurrentView('month')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                currentView === 'month' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {currentView === 'month' ? (
          <>
            {/* Month Header */}
            <div className="grid grid-cols-7 border-b border-border bg-muted/5">
              {days.map(day => (
                <div key={day} className="py-4 text-center text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                  {day}
                </div>
              ))}
            </div>

            {/* Month Grid Body */}
            <div className="grid grid-cols-7 border-collapse">
              {gridDays.map((cell, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "min-h-[110px] p-4 border-r border-b border-border transition-all hover:bg-muted/5 group relative",
                    idx % 7 === 6 && "border-r-0",
                    cell.month !== 'current' && "bg-muted/5 opacity-30"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className={cn(
                      "text-[13px] font-extrabold transition-all",
                      cell.today ? "w-7 h-7 flex items-center justify-center bg-primary text-primary-foreground rounded-full -mt-0.5 -ml-0.5 shadow-md shadow-primary/30" : "text-foreground group-hover:text-primary"
                    )}>
                      {cell.day}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : currentView === 'week' ? (
          <>
            {/* Week Header */}
            <div className="grid grid-cols-7 border-b border-border bg-muted/5">
              {gridDays.slice(0, 7).map((cell, idx) => (
                <div key={idx} className={cn(
                  "py-4 flex flex-col items-center gap-1 border-border",
                  idx < 6 && "border-r"
                )}>
                  <div className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase opacity-70">
                    {days[idx]}
                  </div>
                  <div className={cn(
                    "text-[14px] font-extrabold",
                    cell.today ? "w-7 h-7 flex items-center justify-center bg-primary text-primary-foreground rounded-full shadow-md" : "text-foreground"
                  )}>
                    {cell.day}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Week Grid Body - Simple empty columns matching screenshot */}
            <div className="grid grid-cols-7 h-[500px] divide-x divide-border">
               {Array.from({length: 7}).map((_, i) => (
                  <div key={i} className="hover:bg-muted/5 transition-colors" />
               ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-[500px]">
             {/* Day Header */}
             <div className="px-8 py-5 border-b border-border bg-muted/5 flex items-center justify-between">
                <div className="text-[14px] font-bold text-foreground">Friday, April 3, 2026</div>
                <div className="text-[12px] font-bold text-muted-foreground opacity-70">0 Tasks</div>
             </div>

             {/* Day Centered Empty State */}
             <div className="grow flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-muted/20 flex items-center justify-center mb-6">
                   <CalendarIcon className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <h3 className="text-[16px] font-bold text-foreground mb-1.5">No tasks scheduled for this day</h3>
                <p className="text-[13px] font-medium text-muted-foreground/60 mb-8 max-w-xs">
                   Enjoy your free time or add a new task to stay productive.
                </p>
                <Button 
                   variant="outline" 
                   onClick={onAddTask}
                   className="h-10 px-6 font-bold gap-2 text-primary border-primary/20 hover:bg-primary/5 rounded-xl"
                >
                   <Plus className="w-4 h-4" />
                   Add Task
                </Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
