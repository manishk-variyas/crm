/**
 * RoleSelector - Demo role selection for login
 * Allows switching between Sales Rep, Manager, Executive, Admin
 * Used to demonstrate different user perspectives in the CRM
 */
import React from 'react';
import { User, Briefcase, TrendingUp, ShieldCheck } from 'lucide-react';

export interface RoleSelectorProps {
  role: string;
  setRole: (role: string) => void;
}

export function RoleSelector({ role, setRole }: RoleSelectorProps) {
  const roles = [
    { id: 'Sales Rep', icon: User },
    { id: 'Manager', icon: Briefcase },
    { id: 'Executive', icon: TrendingUp },
    { id: 'Admin', icon: ShieldCheck },
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-slate-700 mb-3">Select Role (Demo)</label>
      <div className="grid grid-cols-4 gap-2">
        {roles.map((r) => {
          const isSelected = r.id === role;
          const Icon = r.icon;
          return (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`flex flex-col items-center justify-center border rounded-lg py-3 px-1 transition-all ${
                isSelected 
                  ? 'border-[#4f46e5] bg-[#eef2ff] text-[#4f46e5]' 
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-[22px] h-[22px] mb-1.5 ${isSelected ? 'text-[#4f46e5]' : 'text-slate-500'}`} strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-center tracking-tight">{r.id}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
