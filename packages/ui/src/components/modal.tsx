import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  className?: string;
  tabs?: React.ReactNode;
}

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  full: 'max-w-full',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = '3xl',
  className,
  tabs
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={cn(
          "bg-card w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-[0_20px_60px_rgb(0,0,0,0.15)] flex flex-col animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 relative",
          maxWidthMap[maxWidth],
          className
        )}
      >
        <div className="flex items-start justify-between p-6 border-b border-border/50 bg-muted/10 sticky top-0 z-[10] backdrop-blur-md">
          <div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {description && (
              <p className="text-[13px] text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {tabs && (
          <div className="px-6 border-b border-border/50 flex items-center gap-6 sticky top-[88px] z-[5] bg-card">
            {tabs}
          </div>
        )}

        <div className="p-6">
          {children}
        </div>

        {footer && (
          <div className="p-6 border-t border-border/50 bg-muted/10 flex items-center justify-end gap-3 sticky bottom-0 z-[10] rounded-b-xl flex-shrink-0 backdrop-blur-md">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
