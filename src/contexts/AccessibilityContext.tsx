import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  largeText: boolean;
  voiceEnabled: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleVoiceEnabled: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      return newValue;
    });
  };

  const toggleLargeText = () => {
    setLargeText(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.style.fontSize = '120%';
      } else {
        document.documentElement.style.fontSize = '100%';
      }
      return newValue;
    });
  };

  const toggleVoiceEnabled = () => {
    setVoiceEnabled(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        largeText,
        voiceEnabled,
        toggleHighContrast,
        toggleLargeText,
        toggleVoiceEnabled,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
