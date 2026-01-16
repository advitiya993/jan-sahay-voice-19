import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';

interface SmsPreviewProps {
  message: string;
  time?: string;
}

const SmsPreview: React.FC<SmsPreviewProps> = ({ 
  message,
  time = 'Just now'
}) => {
  return (
    <div className="bg-foreground rounded-3xl p-4 max-w-[280px] shadow-soft-lg">
      {/* Phone header simulation */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-sm text-muted">Network</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-muted" />
          <span className="text-sm text-muted">{time}</span>
        </div>
      </div>

      {/* Notification */}
      <div className="bg-background rounded-2xl p-4 shadow-card">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-foreground text-sm">Jan Sahay</span>
              <span className="text-xs text-muted-foreground">now</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsPreview;
