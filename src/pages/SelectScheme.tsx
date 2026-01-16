import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import SchemeCard, { SchemeType } from '@/components/SchemeCard';
import AvatarHelper from '@/components/AvatarHelper';

const schemes: SchemeType[] = ['housing', 'ration', 'pension', 'health'];

const SelectScheme: React.FC = () => {
  const navigate = useNavigate();
  const [selectedScheme, setSelectedScheme] = useState<SchemeType | null>(null);

  const handleSchemeSelect = (scheme: SchemeType) => {
    setSelectedScheme(scheme);
    // Simulate TTS feedback
    const messages: Record<SchemeType, string> = {
      housing: 'Housing Scheme selected',
      ration: 'Ration Card Help selected',
      pension: 'Old Age Pension selected',
      health: 'Ayushman Bharat selected',
    };
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(messages[scheme]);
      utterance.lang = 'en-IN';
      speechSynthesis.speak(utterance);
    }

    // Navigate after brief delay for feedback
    setTimeout(() => {
      navigate('/upload-document');
    }, 800);
  };

  return (
    <Layout showBack showHome title="Select Scheme">
      <div className="flex-1 flex flex-col px-safe py-6">
        {/* Header with Avatar */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <AvatarHelper size="small" />
          <div>
            <p className="text-accessible text-foreground">
              कौन सी योजना?
            </p>
            <p className="text-accessible-sm text-muted-foreground">
              Which scheme do you need help with?
            </p>
          </div>
        </div>

        {/* Scheme Cards */}
        <div className="flex flex-col gap-4">
          {schemes.map((scheme, index) => (
            <div 
              key={scheme}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SchemeCard
                type={scheme}
                onClick={() => handleSchemeSelect(scheme)}
                isSelected={selectedScheme === scheme}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SelectScheme;
