import React, { useState } from 'react';
import { 
  Plus, 
  MoreVertical, 
  Target,
  Briefcase,
  GripVertical
} from 'lucide-react';
import { Button, Badge, cn } from '@crm/ui';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PipelineDeal {
  id: string;
  name: string;
  account: string;
  amount: string;
  stage: string;
  probability: string;
}

interface Column {
  id: string;
  title: string;
  deals: PipelineDeal[];
}

const INITIAL_COLUMNS: Column[] = [
  {
    id: 'qual',
    title: 'Qualification',
    deals: [
      { id: '1', name: 'Platform Integration', account: 'Acme Corp', amount: '$45,000', stage: 'qual', probability: '20%' },
      { id: '2', name: 'Data Migration', account: 'Global Tech', amount: '$12,000', stage: 'qual', probability: '10%' },
    ]
  },
  {
    id: 'prop',
    title: 'Proposal Sent',
    deals: [
      { id: '3', name: 'Enterprise License', account: 'Stark Ind', amount: '$150,000', stage: 'prop', probability: '60%' },
    ]
  },
  {
    id: 'neg',
    title: 'Negotiation',
    deals: [
      { id: '4', name: 'Service Agreement', account: 'Wayne Ent', amount: '$85,000', stage: 'neg', probability: '80%' },
      { id: '5', name: 'API Access', account: 'Cyberdyne', amount: '$30,000', stage: 'neg', probability: '75%' },
    ]
  },
  {
    id: 'close',
    title: 'Final Review',
    deals: [
      { id: '6', name: 'Cloud Expansion', account: 'Umbrella', amount: '$200,000', stage: 'close', probability: '95%' },
    ]
  }
];

function DealCard({ deal, isOverlay = false }: { deal: PipelineDeal, isOverlay?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: deal.id,
    data: {
      type: 'Deal',
      deal,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging && !isOverlay) {
    return (
      <div 
        ref={setNodeRef}
        style={style}
        className="bg-muted/50 h-32 rounded-xl border border-dashed border-primary/30"
      />
    );
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing group",
        isOverlay && "shadow-xl border-primary/50 rotate-3 scale-105"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Target className="w-3.5 h-3.5" />
          </div>
          <GripVertical className="w-3 h-3 text-muted-foreground/20 group-hover:text-muted-foreground/40" />
        </div>
        <button className="text-muted-foreground/30 hover:text-foreground transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <h4 className="font-bold text-foreground text-[13px] mb-1 group-hover:text-primary transition-colors">{deal.name}</h4>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-medium mb-4">
        <Briefcase className="w-3 h-3" />
        {deal.account}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground/50 font-bold uppercase">Value</span>
          <span className="text-xs font-extrabold text-foreground/90">{deal.amount}</span>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] text-muted-foreground/50 font-bold uppercase">Prob.</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[10px] py-0 px-1.5">
            {deal.probability}
          </Badge>
        </div>
      </div>
    </div>
  );
}

function PipelineColumn({ column }: { column: Column }) {
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div className="flex-shrink-0 w-80 flex flex-col gap-4">
      {/* Column Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-muted-foreground text-sm uppercase tracking-wide">{column.title}</h3>
          <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground/70">
            {column.deals.length}
          </span>
        </div>
        <button className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Column Body */}
      <div 
        ref={setNodeRef}
        className="flex-1 bg-muted/30 rounded-2xl p-3 border border-border/50 space-y-3 min-h-[500px]"
      >
        <SortableContext 
          items={column.deals.map(d => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export function SalesPipeline() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [activeDeal, setActiveDeal] = useState<PipelineDeal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findColumn(id: string) {
    return columns.find((col) => col.id === id) || 
           columns.find((col) => col.deals.some((deal) => deal.id === id));
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const deal = active.data.current?.deal;
    if (deal) setActiveDeal(deal);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setColumns((prev) => {
      const activeItems = activeColumn.deals;
      const overItems = overColumn.deals;

      const activeIndex = activeItems.findIndex((item) => item.id === activeId);
      const overIndex = overItems.findIndex((item) => item.id === overId);

      let newIndex;
      if (overItems.some(item => item.id === overId)) {
        newIndex = overIndex >= 0 ? overIndex : overItems.length + 1;
      } else {
        newIndex = overItems.length + 1;
      }

      return prev.map((col) => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            deals: col.deals.filter((item) => item.id !== activeId),
          };
        }
        if (col.id === overColumn.id) {
          return {
            ...col,
            deals: [
              ...col.deals.slice(0, newIndex),
              activeItems[activeIndex],
              ...col.deals.slice(newIndex, col.deals.length),
            ],
          };
        }
        return col;
      });
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) {
      setActiveDeal(null);
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      setActiveDeal(null);
      return;
    }

    const activeIndex = activeColumn.deals.findIndex((item) => item.id === activeId);
    const overIndex = activeColumn.deals.findIndex((item) => item.id === overId);

    if (activeIndex !== overIndex) {
      setColumns((prev) => prev.map((col) => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            deals: arrayMove(col.deals, activeIndex, overIndex),
          };
        }
        return col;
      }));
    }

    setActiveDeal(null);
  }

  const totalValue = columns.reduce((acc, col) => {
    return acc + col.deals.reduce((dAcc, deal) => {
      return dAcc + parseInt(deal.amount.replace(/[^0-9]/g, ''));
    }, 0);
  }, 0);

  const totalDeals = columns.reduce((acc, col) => acc + col.deals.length, 0);

  return (
    <div className="h-full flex flex-col space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sales Pipeline</h1>
          <p className="text-muted-foreground mt-1.5">
            Visualize and manage your deal progression.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 mr-4 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
            <div className="flex flex-col">
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Total Value</span>
              <span className="text-foreground font-bold">${totalValue.toLocaleString()}</span>
            </div>
            <div className="w-px h-8 bg-primary/20" />
            <div className="flex flex-col">
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Deals</span>
              <span className="text-foreground font-bold">{totalDeals}</span>
            </div>
          </div>
          <Button className="flex items-center gap-2 h-10 shadow-sm transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-200">
          {columns.map((column) => (
            <PipelineColumn key={column.id} column={column} />
          ))}
          
          {/* Add Column Placeholder */}
          <button className="flex-shrink-0 w-80 h-[500px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground/40 hover:border-border/80 hover:text-muted-foreground/60 transition-all hover:bg-muted/20 gap-2 font-bold text-sm">
            <Plus className="w-6 h-6" />
            Add Column
          </button>
        </div>

        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeDeal ? (
            <DealCard deal={activeDeal} isOverlay />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
