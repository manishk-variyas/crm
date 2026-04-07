/**
 * Dashboard Page - Main landing page showing sales performance overview
 * Displays sales targets, performance charts, activity feed, and tasks
 */
import { PageHeader } from '../components/PageHeader';
import { SalesTargets } from '../components/SalesTargets';
import { StatsCards } from '../components/StatsCards';
import { PerformanceChart } from '../components/PerformanceChart';
import { PipelineChart } from '../components/PipelineChart';
import { RecentActivity } from '../components/RecentActivity';
import { UpcomingTasks } from '../components/UpcomingTasks';

export function Dashboard() {
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <PageHeader />
      <SalesTargets />
      <StatsCards />
      
      <div className="grid grid-cols-1 xl:grid-cols-7 gap-6 mb-6">
        <div className="xl:col-span-4">
          <PerformanceChart />
        </div>
        <div className="xl:col-span-3">
          <PipelineChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
        <RecentActivity />
        <UpcomingTasks />
      </div>
    </div>
  );
}
