import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import AccessibilityControls from '@/components/AccessibilityControls';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { ChevronRight, ChevronLeft, CheckCircle2, Volume2 } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  instruction: string;
  detail: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Welcome to SkillBridge',
    description: 'Interactive Tutorial',
    instruction: 'Let\'s get you started with the basics',
    detail: 'This tutorial will guide you through the essential features of SkillBridge. You can navigate using the Next and Previous buttons, or use voice commands by saying "next" or "previous".',
  },
  {
    title: 'Scrolling',
    description: 'How to navigate content',
    instruction: 'Use your mouse wheel, trackpad, or arrow keys to scroll',
    detail: 'Most pages have scrollable content. You can scroll up and down to view more information. On touch devices, swipe up or down. You can also use the Page Up and Page Down keys on your keyboard.',
  },
  {
    title: 'Text Input',
    description: 'Entering information',
    instruction: 'Click or tap on input fields to type',
    detail: 'When you see text boxes, click or tap inside them to activate. Then you can type using your keyboard. Press Tab to move to the next field. Voice input is also available - just enable voice commands.',
  },
  {
    title: 'Selecting Options',
    description: 'Making choices',
    instruction: 'Click on buttons, dropdowns, or checkboxes to select',
    detail: 'Throughout the platform, you\'ll encounter various interactive elements like buttons and checkboxes. Simply click or tap to select your choice. Voice commands can also trigger actions.',
  },
  {
    title: 'Email Sign Up',
    description: 'Creating your account',
    instruction: 'Provide your email and create a secure password',
    detail: 'To access all features, create an account with your email address. Choose a strong password with at least 8 characters. You can also sign in with existing accounts. Your data is encrypted and secure.',
  },
  {
    title: 'Voice Commands',
    description: 'Hands-free navigation',
    instruction: 'Press Space Bar to activate voice commands',
    detail: 'SkillBridge supports voice commands for accessibility. Press the Space Bar and say commands like "next", "previous", "dashboard", or "help". This is especially useful for users with visual impairments or mobility challenges.',
  },
  {
    title: 'Tutorial Complete!',
    description: 'You\'re ready to start learning',
    instruction: 'Click below to access your dashboard',
    detail: 'Congratulations! You now know the basics of navigating SkillBridge. From the dashboard, you can access specialized learning modules tailored for different communities. You can replay this tutorial anytime from the help menu.',
  },
];

const Tutorial: React.FC = () => {
  const navigate = useNavigate();
  const { speak, isSpeaking } = useTextToSpeech();
  const { voiceEnabled } = useAccessibility();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  useEffect(() => {
    const step = tutorialSteps[currentStep];
    if (isAutoPlay) {
      speak(`${step.title}. ${step.instruction}. ${step.detail}`);
    }
  }, [currentStep, isAutoPlay]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      speak('Tutorial complete. Navigating to dashboard.');
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReplay = () => {
    const step = tutorialSteps[currentStep];
    speak(`${step.title}. ${step.instruction}. ${step.detail}`);
  };

  const voiceCommands = {
    'next': handleNext,
    'previous': handlePrevious,
    'back': handlePrevious,
    'replay': handleReplay,
    'repeat': handleReplay,
    'dashboard': () => {
      speak('Navigating to dashboard');
      setTimeout(() => navigate('/dashboard'), 1000);
    },
    'skip': () => {
      speak('Skipping to dashboard');
      setTimeout(() => navigate('/dashboard'), 1000);
    },
  };

  useVoiceCommands({
    enabled: voiceEnabled,
    commands: voiceCommands,
  });

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AccessibilityControls />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep + 1} of {tutorialSteps.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Tutorial Card */}
          <Card className="shadow-2xl border-2 animate-fade-in">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold gradient-text mb-2">
                    {currentTutorial.title}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {currentTutorial.description}
                  </CardDescription>
                </div>
                {currentStep === tutorialSteps.length - 1 && (
                  <CheckCircle2 className="h-12 w-12 text-primary animate-pulse-glow" />
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  {currentTutorial.instruction}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {currentTutorial.detail}
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex-1"
                  size="lg"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Previous
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleReplay}
                  disabled={isSpeaking}
                  className="sm:w-auto"
                  size="lg"
                >
                  <Volume2 className="mr-2 h-5 w-5" />
                  Replay Audio
                </Button>

                <Button
                  variant={currentStep === tutorialSteps.length - 1 ? "hero" : "default"}
                  onClick={handleNext}
                  className="flex-1"
                  size="lg"
                >
                  {currentStep === tutorialSteps.length - 1 ? (
                    <>
                      Go to Dashboard
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>

              {/* Voice Commands Help */}
              {voiceEnabled && (
                <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <p className="text-sm font-medium text-secondary mb-2">
                    Voice Commands Available:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['next', 'previous', 'replay', 'dashboard', 'skip'].map((cmd) => (
                      <span key={cmd} className="text-xs bg-secondary/20 px-2 py-1 rounded">
                        "{cmd}"
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skip Tutorial */}
              <div className="text-center pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    speak('Skipping tutorial');
                    setTimeout(() => navigate('/dashboard'), 1000);
                  }}
                  className="text-sm text-muted-foreground"
                >
                  Skip tutorial and go to dashboard →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-primary'
                    : index < currentStep
                    ? 'w-2 bg-primary/50'
                    : 'w-2 bg-muted'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
