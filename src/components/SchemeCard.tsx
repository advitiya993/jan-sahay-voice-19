import React from 'react';
import { Home, Wheat, IndianRupee, Heart, LucideIcon } from 'lucide-react';

export type SchemeType = 'housing' | 'ration' | 'pension' | 'health';

interface SchemeCardProps {
  type: SchemeType;
  onClick?: () => void;
  isSelected?: boolean;
}

const schemeConfig: Record<SchemeType, {
  icon: LucideIcon;
  title: string;
  titleHindi: string;
  bgClass: string;
  iconBgClass: string;
}> = {
  housing: {
    icon: Home,
    title: 'Housing Scheme',
    titleHindi: 'आवास योजना',
    bgClass: 'bg-scheme-housing-light border-scheme-housing hover:shadow-[0_8px_30px_-4px_hsl(var(--scheme-housing)/0.3)]',
    iconBgClass: 'bg-scheme-housing text-white',
  },
  ration: {
    icon: Wheat,
    title: 'Ration Card Help',
    titleHindi: 'राशन कार्ड सहायता',
    bgClass: 'bg-scheme-ration-light border-scheme-ration hover:shadow-[0_8px_30px_-4px_hsl(var(--scheme-ration)/0.3)]',
    iconBgClass: 'bg-scheme-ration text-white',
  },
  pension: {
    icon: IndianRupee,
    title: 'Old Age Pension',
    titleHindi: 'वृद्धावस्था पेंशन',
    bgClass: 'bg-scheme-pension-light border-scheme-pension hover:shadow-[0_8px_30px_-4px_hsl(var(--scheme-pension)/0.3)]',
    iconBgClass: 'bg-scheme-pension text-white',
  },
  health: {
    icon: Heart,
    title: 'Ayushman Bharat',
    titleHindi: 'आयुष्मान भारत',
    bgClass: 'bg-scheme-health-light border-scheme-health hover:shadow-[0_8px_30px_-4px_hsl(var(--scheme-health)/0.3)]',
    iconBgClass: 'bg-scheme-health text-white',
  },
};

const SchemeCard: React.FC<SchemeCardProps> = ({ type, onClick, isSelected }) => {
  const config = schemeConfig[type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`
        scheme-card
        w-full
        p-6
        rounded-2xl
        border-2
        ${config.bgClass}
        ${isSelected ? 'ring-4 ring-primary ring-offset-2' : ''}
        flex
        items-center
        gap-5
        text-left
        focus-accessible
        min-h-[100px]
      `}
      aria-label={`${config.title} - ${config.titleHindi}`}
    >
      {/* Icon */}
      <div className={`
        ${config.iconBgClass}
        h-16 w-16
        rounded-xl
        flex items-center justify-center
        flex-shrink-0
        shadow-soft
      `}>
        <Icon className="h-8 w-8" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <span className="text-accessible-lg text-foreground">
          {config.title}
        </span>
        <span className="text-accessible text-muted-foreground">
          {config.titleHindi}
        </span>
      </div>
    </button>
  );
};

export default SchemeCard;
