import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Type, Mic, MicOff } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const AccessibilityControls: React.FC = () => {
  const { highContrast, largeText, voiceEnabled, toggleHighContrast, toggleLargeText, toggleVoiceEnabled } = useAccessibility();
  const { speak } = useTextToSpeech();

  const handleHighContrastToggle = () => {
    toggleHighContrast();
    speak(highContrast ? 'High contrast mode disabled' : 'High contrast mode enabled');
  };

  const handleLargeTextToggle = () => {
    toggleLargeText();
    speak(largeText ? 'Large text disabled' : 'Large text enabled');
  };

  const handleVoiceToggle = () => {
    toggleVoiceEnabled();
    speak(voiceEnabled ? 'Voice commands disabled' : 'Voice commands enabled. Press space bar to start speaking.');
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      <Button
        variant={highContrast ? "default" : "outline"}
        size="icon"
        onClick={handleHighContrastToggle}
        className="rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle high contrast mode"
        title="Toggle High Contrast"
      >
        <Eye className="h-5 w-5" />
      </Button>
      <Button
        variant={largeText ? "default" : "outline"}
        size="icon"
        onClick={handleLargeTextToggle}
        className="rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle large text"
        title="Toggle Large Text"
      >
        <Type className="h-5 w-5" />
      </Button>
      <Button
        variant={voiceEnabled ? "default" : "outline"}
        size="icon"
        onClick={handleVoiceToggle}
        className="rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle voice commands"
        title="Toggle Voice Commands"
      >
        {voiceEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default AccessibilityControls;
