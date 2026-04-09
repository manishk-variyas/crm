/**
 * RoleManagementSettings - Role and permissions management
 */
import { SettingsTable } from './SettingsTable';
import { Button } from '@crm/ui';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Role {
  name: string;
  description: string;
  code: string;
  level: string;
  category: string;
  status: string;
}

const roles: Role[] = [
  { name: 'Admin', description: 'Full system access', code: 'ADM', level: 'Level 8', category: 'System', status: 'Active' },
  { name: 'Manager', description: 'Branch management and reporting', code: 'MGR', level: 'Level 6', category: 'Management', status: 'Active' },
  { name: 'Sales Rep', description: 'Opportunity management and basic access', code: 'REP', level: 'Level 1', category: 'Sales', status: 'Active' },
];

export function RoleManagementSettings() {
  const columns = [
    { 
      key: 'name', 
      header: 'Role Name',
      render: (item: Role) => (
        <div>
          <div className="font-bold text-foreground">{item.name}</div>
          <div className="text-[11px] text-muted-foreground font-medium">{item.description}</div>
        </div>
      )
    },
    { 
      key: 'code', 
      header: 'Role Code',
      render: (item: Role) => <span className="text-muted-foreground font-medium uppercase tracking-widest">{item.code}</span>
    },
    { key: 'level', header: 'Level' },
    { key: 'category', header: 'Category' },
    { 
      key: 'status', 
      header: 'Status',
      className: 'text-center',
      render: (item: Role) => (
        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
          {item.status}
        </span>
      )
    },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground">Role Management</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Manage user roles and permissions.</p>
        </div>
        <Button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 rounded-lg flex items-center gap-2 font-bold text-xs h-10 shadow-sm transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Add Role
        </Button>
      </div>

      <div className="overflow-hidden border border-border/40 rounded-xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/5 border-b border-border/40 text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">Role Name</th>
              <th className="px-8 py-5">Role Code</th>
              <th className="px-8 py-5">Level</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {roles.map((role) => (
              <tr key={role.code} className="hover:bg-muted/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="font-bold text-foreground">{role.name}</div>
                  <div className="text-[11px] text-muted-foreground font-medium">{role.description}</div>
                </td>
                <td className="px-8 py-6 text-muted-foreground font-medium uppercase tracking-widest">{role.code}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{role.level}</td>
                <td className="px-8 py-6 text-muted-foreground font-medium">{role.category}</td>
                <td className="px-8 py-6 text-center">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {role.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-muted-foreground/60 hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-muted-foreground/60 hover:text-rose-500 transition-colors">
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