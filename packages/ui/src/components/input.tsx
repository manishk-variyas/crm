import * as React from 'react';
import { cn } from '../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none">
            {React.cloneElement(icon as React.ReactElement, {
              className: cn("w-4.5 h-4.5", (icon as React.ReactElement).props.className)
            })}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border border-border bg-muted/30 px-4 py-2 text-sm font-medium text-foreground transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-12",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
