/**
 * UI Package - Reusable UI components and theming utilities
 * Entry point for @crm/ui module consumed by other applications
 * Provides buttons, cards, inputs, charts, layout components, and theming
 */
export { Button } from './components/button';
export type { ButtonProps } from './components/button';
export { Card, CardHeader, CardTitle, CardContent } from './components/card';
export { Badge } from './components/badge';
export type { BadgeProps } from './components/badge';
export { Input } from './components/input';
export type { InputProps } from './components/input';
export { cn } from './lib/utils';
export { applyTheme } from './lib/theme-manager';
export { ThemeProvider } from './components/theme-provider';
export { Sidebar } from './components/sidebar';
export type { SidebarProps, SidebarMenuItem, SidebarUser } from './components/sidebar';
export { Header } from './components/header';
export type { HeaderProps } from './components/header';
export { PageHeader } from './components/page-header';
export type { PageHeaderProps } from './components/page-header';
export { DataTable } from './components/data-table';
export type { DataTableProps, Column, SortOption, FilterConfig } from './components/data-table';
export { FilterBar } from './components/filter-bar';
export type { FilterBarProps } from './components/filter-bar';
export { DataTablePagination } from './components/pagination';
export type { DataTablePaginationProps } from './components/pagination';
export { StatusBadge, getStatusVariant } from './components/status-badge';
export type { StatusBadgeProps, StatusVariant } from './components/status-badge';
export { PageActions } from './components/page-actions';
export type { PageActionsProps, PageAction } from './components/page-actions';
export { FormInput } from './components/form-input';
export type { FormInputProps } from './components/form-input';
export { FormSelect } from './components/form-select';
export type { FormSelectProps } from './components/form-select';
export { FormTextarea } from './components/form-textarea';
export type { FormTextareaProps } from './components/form-textarea';
export { FormField } from './components/form-field';
export type { FormFieldProps } from './components/form-field';
export { Tabs } from './components/tabs';
export type { TabsProps, Tab } from './components/tabs';
export { BarChart } from './components/charts/bar-chart';
export type { BarChartProps } from './components/charts/bar-chart';
export { DonutChart } from './components/charts/donut-chart';
export type { DonutChartProps } from './components/charts/donut-chart';
export { OpportunitySources, FunnelConversion } from './components/charts/lead-charts';
export { DealsByStage, PipelineByStage } from './components/charts/stage-charts';
export { RevenueTrend, RevenueByVertical } from './components/charts/revenue-charts';
export { RevenueForecast, ExportReports } from './components/charts/other-charts';
export { ReportStatsCard } from './components/charts/report-stats-card';
export * from './components/modal';
