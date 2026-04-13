/**
 * Employees Page - Employee directory
 * Internal employee/team member listings
 * @route /directory
 */
import React, { useState } from 'react';
import { 
  Mail, 
  Phone,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { Download } from 'lucide-react';
import { Button, cn, PageHeader, DataTable, Column, PageActions, ExportOptionsModal } from '@crm/ui';
import { useEmployees } from '../services/hooks';
import { exportToCSV, exportToExcel, exportToPDF, ExportColumn } from '@crm/utils';

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
  const { employees, loading, error, refetch } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [alphabetLetter, setAlphabetLetter] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });

  const employeesData = employees.length > 0 ? employees : EMPLOYEES;

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map(emp => emp.id));
    }
  };

  const handleExport = (format: 'excel' | 'csv' | 'pdf') => {
    const selectedData = employeesData.filter(emp => selectedIds.includes(emp.id));
    const exportColumns: ExportColumn[] = [
      { header: 'Full Name', key: 'name' },
      { header: 'Role', key: 'role' },
      { header: 'Department', key: 'department' },
      { header: 'Sub-Department', key: 'subDepartment' },
      { header: 'Email', key: 'email' },
      { header: 'Phone', key: 'phone' },
      { header: 'Location', key: 'location' },
      { header: 'Desk', key: 'desk' }
    ];

    if (format === 'csv') {
      exportToCSV(selectedData, exportColumns, 'employees_export');
    } else if (format === 'excel') {
      exportToExcel(selectedData, exportColumns, 'employees_export');
    } else if (format === 'pdf') {
      exportToPDF(selectedData, exportColumns, 'Employee Directory Report');
    }
  };

  const filteredData = employeesData.filter((employee) => {
    const matchesSearch = !searchTerm ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAlphabet = !alphabetLetter || employee.name.toUpperCase().startsWith(alphabetLetter);

    return matchesSearch && matchesAlphabet;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = String(a[sortConfig.key as keyof Employee] || '').toLowerCase();
    const bValue = String(b[sortConfig.key as keyof Employee] || '').toLowerCase();

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const hasActiveFilters = !!searchTerm || !!alphabetLetter;

  const clearFilters = () => {
    setSearchTerm('');
    setAlphabetLetter('');
  };

  const columns: Column<Employee>[] = [
    {
      header: (
        <input 
          type="checkbox" 
          checked={selectedIds.length === filteredData.length && filteredData.length > 0}
          onChange={(e) => { e.stopPropagation(); toggleAllSelection(); }}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 rounded border-border bg-background checked:bg-primary transition-all cursor-pointer"
        />
      ),
      headerClassName: 'w-12 px-4',
      cellClassName: 'px-4',
      render: (employee) => (
        <input 
          type="checkbox" 
          checked={selectedIds.includes(employee.id)}
          onChange={() => {}}
          onClick={(e) => toggleSelection(employee.id, e as any)}
          className="w-4 h-4 rounded border-border bg-background checked:bg-primary transition-all cursor-pointer"
        />
      )
    },
    {
      header: 'Employee',
      sortable: true,
      sortKey: 'name',
      render: (employee) => (
        <div className="flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-card shadow-sm ring-1 ring-border group-hover:ring-primary/30 transition-all">
            <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-foreground font-semibold">{employee.name}</span>
            <span className="text-[11px] text-muted-foreground font-medium">{employee.role}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Department',
      sortable: true,
      sortKey: 'department',
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
      sortable: true,
      sortKey: 'location',
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
        actions={
          <div className="flex items-center gap-2">
            {employees.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="h-9 px-3"
              >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              </Button>
            )}
            <PageActions 
              actions={[
                { 
                  label: 'Export', 
                  variant: 'outline', 
                  icon: <Download className="w-4 h-4" />, 
                  onClick: () => setIsExportModalOpen(true),
                  disabled: selectedIds.length === 0
                }
              ]}
            />
          </div>
        }
      />

      <DataTable 
        data={sortedData}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        sortOptions={[
          { label: 'Name', key: 'name' },
          { label: 'Department', key: 'department' },
          { label: 'Location', key: 'location' }
        ]}
        defaultSort={sortConfig}
        onSortChange={setSortConfig}
        alphabetFilter={{
          value: alphabetLetter,
          onChange: setAlphabetLetter
        }}
        searchPlaceholder="Search by name, title, department, or email..."
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalResults: sortedData.length,
          resultsPerPage: 10,
          onPageChange: (page) => console.log('Page change:', page)
        }}
        emptyMessage={loading ? "Loading employees..." : error ? `Error: ${error}` : "No employees found."}
      />

      <ExportOptionsModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        onExport={handleExport}
      />
    </div>
  );
}
