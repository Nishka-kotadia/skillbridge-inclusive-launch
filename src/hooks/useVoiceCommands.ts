import { useEffect, useRef, useState } from 'react';

interface VoiceCommandsOptions {
  enabled: boolean;
  onCommand?: (command: string) => void;
  commands?: { [key: string]: () => void };
}

export const useVoiceCommands = ({ enabled, onCommand, commands = {} }: VoiceCommandsOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;

    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript.toLowerCase().trim();
      setTranscript(transcriptText);

      if (event.results[current].isFinal) {
        console.log('Voice command:', transcriptText);
        
        if (onCommand) {
          onCommand(transcriptText);
        }

        // Check for specific commands
        Object.keys(commands).forEach(key => {
          if (transcriptText.includes(key.toLowerCase())) {
            commands[key]();
          }
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-restart if still enabled
      if (enabled) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [enabled, onCommand, commands]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return { isListening, transcript, startListening, stopListening };
};
