/**
 * StatsCards Component - Displays key performance indicators
 * Shows 4 cards: Total Revenue, Active Deals, Win Rate, and New Opportunities
 */
import React from 'react';
import { Card, CardContent } from '@crm/ui';
import { TrendingUp, Briefcase, Target, Users, TrendingDown } from 'lucide-react';
import { useDashboard } from '../services/hooks';

export function StatsCards() {
  const { stats, loading } = useDashboard();

  if (loading && !stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-32 animate-pulse bg-muted/50" />
        ))}
      </div>
    );
  }

  const items = [
    {
      label: 'Total Revenue',
      value: stats?.totalRevenue || '$0',
      growth: stats?.revenueGrowth || 0,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500'
    },
    {
      label: 'Active Deals',
      value: stats?.activeDeals || 0,
      growth: stats?.dealsGrowth || 0,
      icon: Briefcase,
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      label: 'Win Rate',
      value: `${stats?.winRate || 0}%`,
      growth: stats?.winRateGrowth || 0,
      icon: Target,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-500'
    },
    {
      label: 'New Opportunities',
      value: stats?.newOpportunities || 0,
      growth: stats?.opportunitiesGrowth || 0,
      icon: Users,
      color: 'bg-orange-500',
      textColor: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {items.map((item, index) => {
        const isPositive = item.growth >= 0;
        return (
          <Card key={index} className="shadow-sm hover:shadow-md transition-all duration-300 border-border/50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</span>
                <div className={`${item.color} p-2.5 rounded-lg text-white shadow-sm`}>
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">{item.value}</h3>
                <div className="flex items-center gap-1.5 pt-1">
                  {isPositive ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                  )}
                  <span className={`text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isPositive ? '+' : ''}{item.growth}%
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">vs last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
