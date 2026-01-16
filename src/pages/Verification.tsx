import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import DataBlock from '@/components/DataBlock';
import { Button } from '@/components/ui/button';
import { X, Check } from 'lucide-react';

// Simulated extracted data
const extractedData = {
  name: 'राम प्रसाद शर्मा',
  nameEnglish: 'Ram Prasad Sharma',
  dob: '15-08-1958',
  address: 'ग्राम पंचायत मोहनपुर, जिला वाराणसी',
};

const Verification: React.FC = () => {
  const navigate = useNavigate();

  const handleCorrect = () => {
    navigate('/progress');
  };

  const handleWrong = () => {
    navigate('/upload-document');
  };

  return (
    <Layout showBack showHome title="Verify Details">
      <div className="flex-1 flex flex-col px-safe py-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-accessible-lg text-foreground mb-2">
            क्या यह सही है?
          </h2>
          <p className="text-accessible text-muted-foreground">
            Is this information correct?
          </p>
        </div>

        {/* Data Blocks - Receipt Style */}
        <div className="flex-1 space-y-4">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <DataBlock
              label="Name / नाम"
              value={extractedData.name}
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <DataBlock
              label="Name (English)"
              value={extractedData.nameEnglish}
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <DataBlock
              label="Date of Birth / जन्म तिथि"
              value={extractedData.dob}
            />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <DataBlock
              label="Address / पता"
              value={extractedData.address}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button
            variant="warning"
            size="xl"
            onClick={handleWrong}
            className="flex-col gap-2 h-auto py-6"
          >
            <X className="h-10 w-10" />
            <span className="text-lg">This is wrong</span>
            <span className="text-sm opacity-80">यह गलत है</span>
          </Button>
          
          <Button
            variant="success"
            size="xl"
            onClick={handleCorrect}
            className="flex-col gap-2 h-auto py-6"
          >
            <Check className="h-10 w-10" />
            <span className="text-lg">This is correct</span>
            <span className="text-sm opacity-80">यह सही है</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Verification;
