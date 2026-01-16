import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Camera, RotateCcw } from 'lucide-react';

const UploadDocument: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  const handleCapture = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsCaptured(true);
      setIsScanning(false);
      
      // Navigate to verification after processing
      setTimeout(() => {
        navigate('/verify');
      }, 2000);
    }, 3000);
  };

  const handleRetake = () => {
    setIsCaptured(false);
    setIsScanning(false);
  };

  return (
    <Layout showBack showHome title="Scan Document">
      <div className="flex-1 flex flex-col">
        {/* Voice Guide Banner */}
        <div className="bg-primary text-primary-foreground px-safe py-4 text-center animate-fade-in">
          <p className="text-accessible font-medium">
            {isCaptured 
              ? "Agent 2 is reading your Aadhaar card..."
              : isScanning 
                ? "Hold still… scanning your name"
                : "Position your ID card in the frame"
            }
          </p>
          <p className="text-base opacity-90 mt-1">
            {isCaptured 
              ? "आपका आधार कार्ड पढ़ा जा रहा है..."
              : isScanning 
                ? "स्थिर रहें... नाम स्कैन हो रहा है"
                : "अपना ID कार्ड फ्रेम में रखें"
            }
          </p>
        </div>

        {/* Camera View Area */}
        <div className="flex-1 bg-foreground/95 relative flex items-center justify-center">
          {/* Ghost Rectangle Guide */}
          <div className={`
            relative
            w-[85%] max-w-sm
            aspect-[1.6/1]
            border-4 border-dashed
            ${isScanning ? 'border-primary' : 'border-background/50'}
            rounded-2xl
            transition-colors duration-300
            ${isCaptured ? 'bg-background/10' : ''}
          `}>
            {/* Corner markers */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-background rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-background rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-background rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-background rounded-br-lg" />

            {/* Scanning Line */}
            {isScanning && (
              <div className="absolute left-4 right-4 h-1 bg-primary rounded-full scanner-line shadow-[0_0_10px_hsl(var(--primary))]" />
            )}

            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isScanning && !isCaptured && (
                <p className="text-background/70 text-accessible text-center px-4">
                  Place ID card here
                  <br />
                  <span className="text-base">ID कार्ड यहाँ रखें</span>
                </p>
              )}
              {isCaptured && (
                <div className="text-center">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-success flex items-center justify-center success-bounce">
                    <Camera className="h-8 w-8 text-success-foreground" />
                  </div>
                  <p className="text-background text-accessible">
                    Processing...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Capture Button Area */}
        <div className="bg-background px-safe py-8 flex flex-col items-center gap-4">
          {!isCaptured ? (
            <Button
              variant="destructive"
              size="icon-xl"
              onClick={handleCapture}
              disabled={isScanning}
              className="rounded-full shadow-soft-lg"
              aria-label="Capture photo"
            >
              <Camera className="h-12 w-12" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              onClick={handleRetake}
              className="gap-3"
            >
              <RotateCcw className="h-6 w-6" />
              Retake Photo
            </Button>
          )}
          
          <p className="text-muted-foreground text-center text-base">
            {isScanning ? "Scanning..." : isCaptured ? "Reading document..." : "Tap to capture"}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default UploadDocument;
