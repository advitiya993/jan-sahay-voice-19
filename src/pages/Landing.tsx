import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import AvatarHelper from '@/components/AvatarHelper';
import VoiceButton from '@/components/VoiceButton';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const handleVoiceStart = () => {
    setIsListening(true);
    // Simulate listening for a few seconds then navigate
    setTimeout(() => {
      setIsListening(false);
      navigate('/select-scheme');
    }, 2500);
  };

  const handleVoiceEnd = () => {
    setIsListening(false);
  };

  return (
    <Layout showBack={false} showHome={false}>
      <div className="flex-1 flex flex-col items-center justify-center px-safe py-8 gap-8">
        {/* Logo/Title */}
        <div className="text-center animate-fade-in">
          <h1 className="text-accessible-2xl font-bold text-primary mb-2">
            जन सहाय
          </h1>
          <p className="text-accessible text-muted-foreground">
            Jan Sahay
          </p>
        </div>

        {/* Avatar Helper */}
        <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <AvatarHelper 
            isListening={isListening} 
            size="large"
            showSpeechBubble={isListening}
            message={isListening ? "मैं सुन रही हूं... I'm listening..." : ""}
          />
        </div>

        {/* Voice Button */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <VoiceButton
            onVoiceStart={handleVoiceStart}
            onVoiceEnd={handleVoiceEnd}
            isListening={isListening}
            size="large"
          />
        </div>

        {/* Instructions */}
        <div className="text-center max-w-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-accessible text-foreground leading-relaxed">
            {isListening ? (
              <span className="text-primary font-semibold">
                बोलिए... Speak now...
              </span>
            ) : (
              <>
                टैप करें और बोलें:
                <br />
                <span className="text-primary font-semibold">
                  "मुझे पेंशन के लिए आवेदन करना है"
                </span>
              </>
            )}
          </p>
          <p className="text-accessible-sm text-muted-foreground mt-3">
            Tap and say: "I want to apply for a pension"
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-8" />

        {/* Track Application Link */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button
            variant="ghost"
            onClick={() => navigate('/track')}
            className="text-muted-foreground hover:text-primary gap-2"
          >
            <Search className="h-5 w-5" />
            Already have a tracking ID?
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
