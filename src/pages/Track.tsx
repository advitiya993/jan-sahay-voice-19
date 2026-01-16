import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';

const Track: React.FC = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');

  const handleTrack = () => {
    if (trackingId.trim()) {
      // For demo, just show success
      navigate('/progress');
    }
  };

  return (
    <Layout showBack showHome title="Track Application">
      <div className="flex-1 flex flex-col items-center px-safe py-8">
        {/* Icon */}
        <div className="h-20 w-20 rounded-full bg-primary-light flex items-center justify-center mb-6 animate-scale-in">
          <Search className="h-10 w-10 text-primary" />
        </div>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-accessible-lg font-bold text-foreground mb-2">
            आवेदन ट्रैक करें
          </h1>
          <p className="text-accessible text-muted-foreground">
            Track your application status
          </p>
        </div>

        {/* Input */}
        <div className="w-full max-w-sm space-y-4 animate-slide-up">
          <div>
            <label className="text-accessible-sm text-muted-foreground mb-2 block">
              Tracking ID / ट्रैकिंग आईडी
            </label>
            <Input
              type="text"
              placeholder="e.g. JS-2024-847291"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="h-16 text-xl text-center rounded-xl border-2 focus:border-primary"
            />
          </div>

          <Button
            variant="action"
            size="xl"
            onClick={handleTrack}
            disabled={!trackingId.trim()}
            className="w-full gap-3"
          >
            Track Status
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Help text */}
        <p className="text-muted-foreground text-center text-sm mt-8 max-w-xs">
          You can find your tracking ID in the SMS we sent you after submitting your application.
        </p>
      </div>
    </Layout>
  );
};

export default Track;
