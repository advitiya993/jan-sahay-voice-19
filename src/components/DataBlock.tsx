import React from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataBlockProps {
  label: string;
  value: string;
  onSpeak?: () => void;
}

const DataBlock: React.FC<DataBlockProps> = ({ label, value, onSpeak }) => {
  const handleSpeak = () => {
    // Use browser's speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${label}: ${value}`);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
    onSpeak?.();
  };

  return (
    <div className="bg-secondary rounded-xl p-5 flex items-center justify-between gap-4 shadow-card">
      <div className="flex-1 min-w-0">
        <p className="text-base text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-accessible-lg text-foreground mt-1 truncate">
          {value}
        </p>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSpeak}
        aria-label={`Listen to ${label}`}
        className="flex-shrink-0 h-14 w-14 rounded-xl hover:bg-primary-light focus-accessible"
      >
        <Volume2 className="h-7 w-7 text-primary" />
      </Button>
    </div>
  );
};

export default DataBlock;
