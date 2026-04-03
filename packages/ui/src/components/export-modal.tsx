import React from 'react';
import { FileText } from 'lucide-react';
import { Modal } from './modal';
import { cn } from '../lib/utils';

export interface ExportOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function ExportOptionsModal({ 
  isOpen, 
  onClose, 
  title = "Export Options",
  description = "Select the format you want to export the selected items as:"
}: ExportOptionsModalProps) {
  const exportFormats = [
    {
      id: 'excel',
      title: 'Excel Worksheet',
      description: 'Export as .xlsx file',
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50'
    },
    {
      id: 'csv',
      title: 'CSV',
      description: 'Export as comma-separated values',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50'
    },
    {
      id: 'pdf',
      title: 'PDF Document',
      description: 'Export as a formatted PDF',
      icon: <FileText className="w-5 h-5 text-rose-600" />,
      iconBg: 'bg-rose-50'
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="max-w-md"
    >
      <div className="space-y-6 py-2">
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="space-y-3">
          {exportFormats.map((format) => (
            <button
              key={format.id}
              onClick={onClose}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all group text-left"
            >
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", format.iconBg)}>
                {format.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-foreground">{format.title}</span>
                <span className="text-[13px] text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">{format.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
