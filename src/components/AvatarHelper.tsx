import React from 'react';
import avatarImage from '@/assets/avatar-helper.png';

interface AvatarHelperProps {
  isListening?: boolean;
  size?: 'small' | 'medium' | 'large';
  showSpeechBubble?: boolean;
  message?: string;
}

const AvatarHelper: React.FC<AvatarHelperProps> = ({
  isListening = false,
  size = 'large',
  showSpeechBubble = false,
  message = ''
}) => {
  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-24 w-24',
    large: 'h-32 w-32 md:h-40 md:w-40'
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Speech Bubble */}
      {showSpeechBubble && message && (
        <div className="bg-secondary rounded-2xl px-6 py-4 max-w-xs text-center shadow-soft animate-fade-in relative">
          <p className="text-accessible-sm text-secondary-foreground">
            {message}
          </p>
          {/* Speech bubble pointer */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary rotate-45" />
        </div>
      )}
      
      {/* Avatar Image */}
      <div 
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          overflow-hidden 
          border-4 
          border-primary/20
          shadow-soft-lg
          ${isListening ? 'avatar-listening' : ''}
          transition-all duration-300
        `}
      >
        <img
          src={avatarImage}
          alt="Jan Sahay Helper - Your friendly government services assistant"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AvatarHelper;
