/**
 * UserManagementSettings - User access and role management
 */
import { SettingsTable } from './SettingsTable';
import { Button, cn } from '@crm/ui';
import { Edit, Power, Trash2 } from 'lucide-react';

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
}

const users: User[] = [
  { name: 'Alex Morgan', email: 'alex@example.com', role: 'Admin', status: 'Active', avatar: 'A' },
  { name: 'Sarah Connor', email: 'sarah@example.com', role: 'Manager', status: 'Active', avatar: 'S' },
  { name: 'John Doe', email: 'john@example.com', role: 'Sales Rep', status: 'Inactive', avatar: 'J' },
];

const roleColors: Record<string, string> = {
  'Admin': 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  'Manager': 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  'Sales Rep': 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
};

const statusColors: Record<string, string> = {
  'Active': 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Inactive': 'bg-muted text-muted-foreground',
};

export function UserManagementSettings() {
  const columns = [
    { 
      key: 'name', 
      header: 'Name',
      render: (item: User) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">
            {item.avatar}
          </div>
          <div>
            <div className="font-bold text-foreground">{item.name}</div>
            <div className="text-[11px] text-muted-foreground font-medium">{item.email}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'role', 
      header: 'Role',
      className: 'text-center',
      render: (item: User) => (
        <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", roleColors[item.role])}>
          {item.role}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      className: 'text-center',
      render: (item: User) => (
        <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", statusColors[item.status])}>
          {item.status}
        </span>
      )
    },
  ];

  const renderActions = (item: User) => (
    <div className="flex items-center justify-end gap-3">
      <button className="p-2 text-muted-foreground/60 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
        <Edit className="w-4 h-4" />
      </button>
      <button className="p-2 text-muted-foreground/60 hover:text-amber-500 hover:bg-amber-500/5 rounded-lg transition-all">
        <Power className="w-4 h-4" />
      </button>
      <button className="p-2 text-muted-foreground/60 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg transition-all">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">User Management</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage user access and roles.</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95">
          Add User
        </Button>
      </div>

      <div className="overflow-x-auto no-scrollbar border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm min-w-[700px]">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Name</th>
              <th className="px-8 py-5 text-center">Role</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{user.name}</div>
                      <div className="text-[11px] text-muted-foreground font-medium">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", roleColors[user.role])}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", statusColors[user.status])}>
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-muted-foreground/60 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted-foreground/60 hover:text-amber-500 hover:bg-amber-500/5 rounded-lg transition-all">
                      <Power className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted-foreground/60 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}