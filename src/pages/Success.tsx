import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SmsPreview from '@/components/SmsPreview';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, RefreshCw } from 'lucide-react';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout showBack={false} showHome>
      <div className="flex-1 flex flex-col items-center px-safe py-8">
        {/* Success Icon */}
        <div className="animate-scale-in mb-6">
          <div className="h-28 w-28 rounded-full bg-success flex items-center justify-center shadow-soft-lg success-bounce">
            <CheckCircle className="h-16 w-16 text-success-foreground" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-accessible-2xl font-bold text-success mb-3">
            आवेदन जमा हो गया!
          </h1>
          <p className="text-accessible-lg text-foreground mb-2">
            Application Submitted
          </p>
          <p className="text-accessible text-muted-foreground max-w-xs mx-auto">
            You will receive an SMS confirmation shortly with your tracking ID.
          </p>
          <p className="text-accessible-sm text-muted-foreground mt-2">
            आपको जल्द ही SMS मिलेगा
          </p>
        </div>

        {/* PDF Preview Thumbnail */}
        <div 
          className="bg-secondary rounded-2xl p-4 flex items-center gap-4 w-full max-w-sm mb-8 animate-slide-up shadow-card"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="h-16 w-12 bg-background rounded-lg border-2 border-border flex items-center justify-center">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Application Form</p>
            <p className="text-sm text-muted-foreground">OAP_Application_2024.pdf</p>
          </div>
        </div>

        {/* SMS Preview */}
        <div className="animate-slide-up mb-8" style={{ animationDelay: '0.4s' }}>
          <p className="text-center text-muted-foreground text-sm mb-3">
            SMS Preview
          </p>
          <SmsPreview 
            message="Your Old Age Pension application (ID: JS-2024-847291) has been submitted. Track status at jansahay.gov.in"
            time="Just now"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-4" />

        {/* Action Button */}
        <div className="w-full max-w-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button
            variant="action"
            size="xl"
            onClick={() => navigate('/')}
            className="w-full gap-3"
          >
            <RefreshCw className="h-6 w-6" />
            Help with something else
          </Button>
          <p className="text-center text-muted-foreground text-sm mt-3">
            कुछ और सहायता चाहिए?
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
