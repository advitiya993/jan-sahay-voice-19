import React from 'react';
import { Check, Loader2, Pencil, LucideIcon } from 'lucide-react';

export type StepStatus = 'pending' | 'active' | 'done';

interface ProgressStepProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  status: StepStatus;
  isLast?: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({
  icon: Icon,
  title,
  description,
  status,
  isLast = false
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'done':
        return <Check className="h-6 w-6 text-success-foreground" />;
      case 'active':
        return <Loader2 className="h-6 w-6 text-primary-foreground animate-spin" />;
      default:
        return <Icon className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'done':
        return 'bg-success text-success-foreground';
      case 'active':
        return 'bg-primary text-primary-foreground step-active';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex items-start gap-4">
      {/* Step indicator */}
      <div className="flex flex-col items-center">
        <div className={`
          h-14 w-14
          rounded-full
          flex items-center justify-center
          ${getStatusStyles()}
          transition-all duration-300
          shadow-soft
        `}>
          {getStatusIcon()}
        </div>
        
        {/* Connector line */}
        {!isLast && (
          <div className={`
            w-1 h-16
            ${status === 'done' ? 'bg-success' : 'bg-border'}
            transition-colors duration-300
          `} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-3">
        <h3 className={`
          text-accessible-lg
          ${status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}
          transition-colors duration-300
        `}>
          {title}
        </h3>
        {description && (
          <p className={`
            text-accessible-sm mt-1
            ${status === 'active' ? 'text-foreground' : 'text-muted-foreground'}
            flex items-center gap-2
          `}>
            {status === 'active' && title.includes('Form') && (
              <Pencil className="h-5 w-5 pencil-animate" />
            )}
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressStep;
