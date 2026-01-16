import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceButtonProps {
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
  isListening?: boolean;
  size?: 'default' | 'large';
}

const VoiceButton: React.FC<VoiceButtonProps> = ({
  onVoiceStart,
  onVoiceEnd,
  isListening = false,
  size = 'large'
}) => {
  const [listening, setListening] = useState(isListening);

  const handlePress = () => {
    if (listening) {
      setListening(false);
      onVoiceEnd?.();
    } else {
      setListening(true);
      onVoiceStart?.();
    }
  };

  const sizeClasses = size === 'large' 
    ? 'h-36 w-36 md:h-44 md:w-44' 
    : 'h-20 w-20';

  const iconSize = size === 'large' ? 'h-16 w-16 md:h-20 md:w-20' : 'h-8 w-8';

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse rings when listening */}
      {listening && (
        <>
          <div className="absolute inset-0 rounded-full bg-primary/20 voice-ring" />
          <div className="absolute inset-0 rounded-full bg-primary/10 voice-ring" style={{ animationDelay: '0.5s' }} />
        </>
      )}
      
      <Button
        variant="voice"
        onClick={handlePress}
        className={`${sizeClasses} ${listening ? 'voice-pulse bg-primary' : 'bg-primary hover:bg-primary/90'} focus-accessible relative z-10`}
        aria-label={listening ? "Stop listening" : "Start listening"}
      >
        {listening ? (
          <MicOff className={`${iconSize} text-primary-foreground`} />
        ) : (
          <Mic className={`${iconSize} text-primary-foreground`} />
        )}
      </Button>
    </div>
  );
};

export default VoiceButton;
