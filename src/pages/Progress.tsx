import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProgressStep, { StepStatus } from '@/components/ProgressStep';
import { UserCheck, Eye, Search, FileText, Send } from 'lucide-react';

interface Step {
  icon: typeof UserCheck;
  title: string;
  description?: string;
  status: StepStatus;
}

const initialSteps: Step[] = [
  { icon: UserCheck, title: 'Receptionist', description: 'Verified identity', status: 'done' },
  { icon: Eye, title: 'Vision Agent', description: 'Read documents', status: 'done' },
  { icon: Search, title: 'Scheme Matcher', description: 'Finding best scheme...', status: 'active' },
  { icon: FileText, title: 'Form Architect', description: 'Waiting...', status: 'pending' },
  { icon: Send, title: 'Submission', description: 'Waiting...', status: 'pending' },
];

const Progress: React.FC = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    // Simulate progress through steps
    const timers: NodeJS.Timeout[] = [];

    // Step 3: Scheme Matcher completes
    timers.push(setTimeout(() => {
      setSteps(prev => prev.map((step, i) => {
        if (i === 2) return { ...step, status: 'done' as StepStatus, description: 'Match found: Old Age Pension' };
        if (i === 3) return { ...step, status: 'active' as StepStatus, description: 'Filling PDF form...' };
        return step;
      }));
      setCurrentStep(3);
    }, 2000));

    // Step 4: Form Architect completes
    timers.push(setTimeout(() => {
      setSteps(prev => prev.map((step, i) => {
        if (i === 3) return { ...step, status: 'done' as StepStatus, description: 'Form completed' };
        if (i === 4) return { ...step, status: 'active' as StepStatus, description: 'Submitting application...' };
        return step;
      }));
      setCurrentStep(4);
    }, 4500));

    // Step 5: Submission completes
    timers.push(setTimeout(() => {
      setSteps(prev => prev.map((step, i) => {
        if (i === 4) return { ...step, status: 'done' as StepStatus, description: 'Application submitted!' };
        return step;
      }));
      
      // Navigate to success
      setTimeout(() => navigate('/success'), 1000);
    }, 6500));

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <Layout showBack showHome title="Processing">
      <div className="flex-1 flex flex-col px-safe py-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-accessible-lg text-foreground mb-2">
            आपका आवेदन प्रक्रिया में है
          </h2>
          <p className="text-accessible text-muted-foreground">
            Your application is being processed
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex-1">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProgressStep
                icon={step.icon}
                title={step.title}
                description={step.description}
                status={step.status}
                isLast={index === steps.length - 1}
              />
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="text-center py-4 animate-fade-in">
          <p className="text-muted-foreground text-base">
            कृपया प्रतीक्षा करें • Please wait
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
