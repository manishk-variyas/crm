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
export type { DataTableProps, Column } from './components/data-table';
export { BarChart } from './components/charts/bar-chart';
export type { BarChartProps } from './components/charts/bar-chart';
export { DonutChart } from './components/charts/donut-chart';
export type { DonutChartProps } from './components/charts/donut-chart';
export { OpportunitySources, FunnelConversion } from './components/charts/lead-charts';
export { DealsByStage, PipelineByStage } from './components/charts/stage-charts';
export { RevenueTrend, RevenueByVertical } from './components/charts/revenue-charts';
export { RevenueForecast, ExportReports } from './components/charts/other-charts';
export { ReportStatsCard } from './components/charts/report-stats-card';
