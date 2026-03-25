import React, { useState } from 'react';
import { 
  Mail, 
  Phone,
  MapPin
} from 'lucide-react';
import { PageHeader, DataTable, Column } from '@crm/ui';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  subDepartment: string;
  email: string;
  phone: string;
  location: string;
  desk: string;
  avatar: string;
}

const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Admin User',
    role: 'System Administrator',
    department: 'Operations',
    subDepartment: 'Admin',
    email: 'admin@example.com',
    phone: '+1 (555) 000-0001',
    location: 'Building A, Floor 1',
    desk: 'Desk: A-101',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  },
  {
    id: '2',
    name: 'Executive User',
    role: 'Chief Executive Officer',
    department: 'Executive',
    subDepartment: 'Executive',
    email: 'executive@example.com',
    phone: '+1 (555) 111-0001',
    location: 'Executive Suite, Floor 10',
    desk: 'Desk: E-001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Executive'
  },
  {
    id: '3',
    name: 'Jane Smith',
    role: 'Marketing Director',
    department: 'Marketing',
    subDepartment: 'Manager',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 555-0001',
    location: 'Building B, Floor 3',
    desk: 'Desk: M-301',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  },
  {
    id: '4',
    name: 'Manager User',
    role: 'Regional Sales Manager',
    department: 'Sales',
    subDepartment: 'Manager',
    email: 'manager@example.com',
    phone: '+1 (555) 222-0001',
    location: 'Building A, Floor 2',
    desk: 'Desk: S-201',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manager'
  },
  {
    id: '5',
    name: 'Robert Jones',
    role: 'Sales Development Rep',
    department: 'Sales',
    subDepartment: 'Sales Rep',
    email: 'robert.jones@example.com',
    phone: '+1 (555) 666-0001',
    location: 'Building A, Floor 2',
    desk: 'Desk: S-204',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
  },
  {
    id: '6',
    name: 'Sales Rep 1',
    role: 'Senior Account Executive',
    department: 'Sales',
    subDepartment: 'Sales Rep',
    email: 'rep1@example.com',
    phone: '+1 (555) 333-0001',
    location: 'Building A, Floor 2',
    desk: 'Desk: S-202',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rep1'
  },
  {
    id: '7',
    name: 'Sales Rep 2',
    role: 'Account Executive',
    department: 'Sales',
    subDepartment: 'Sales Rep',
    email: 'rep2@example.com',
    phone: '+1 (555) 444-0001',
    location: 'Building A, Floor 2',
    desk: 'Desk: S-203',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rep2'
  }
];

export function Employees() {
  const [searchTerm, setSearchTerm] = useState('');

  const columns: Column<Employee>[] = [
    {
      header: 'Employee',
      render: (employee) => (
        <div className="flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-card shadow-sm ring-1 ring-border group-hover:ring-primary/30 transition-all">
            <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-semibold">{employee.name}</span>
            <span className="text-[11px] text-muted-foreground font-medium">{employee.role}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Department',
      render: (employee) => (
        <div className="flex flex-col text-left">
          <span className="text-foreground font-semibold">{employee.department}</span>
          <span className="text-[11px] text-muted-foreground font-medium">{employee.subDepartment}</span>
        </div>
      )
    },
    {
      header: 'Contact Info',
      render: (employee) => (
        <div className="flex flex-col gap-1 text-[11px] font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-muted-foreground/50" />
            {employee.email}
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-muted-foreground/50" />
            {employee.phone}
          </div>
        </div>
      )
    },
    {
      header: 'Location',
      render: (employee) => (
        <div className="flex items-start gap-2 text-[11px] font-medium text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground/50 mt-0.5" />
          <div className="flex flex-col text-left">
            <span className="text-foreground/90 font-semibold">{employee.location}</span>
            <span className="text-muted-foreground/70">{employee.desk}</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Employee Directory"
        subtitle="Search and find contact information for anyone in the organization."
      />

      <DataTable 
        data={EMPLOYEES}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by name, title, department, or email..."
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: 7,
          resultsPerPage: 10,
          onPageChange: (page) => console.log('Page change:', page)
        }}
      />
    </div>
  );
}
