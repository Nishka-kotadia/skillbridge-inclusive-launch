import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import AccessibilityControls from '@/components/AccessibilityControls';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { speak } = useTextToSpeech();
  const { voiceEnabled } = useAccessibility();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    speak('Welcome to the sign in page. Press space bar to use voice commands.');
  }, []);

  const voiceCommands = {
    'sign in': () => {
      setIsSignUp(false);
      speak('Switched to sign in mode');
    },
    'sign up': () => {
      setIsSignUp(true);
      speak('Switched to sign up mode');
    },
    'tutorial': () => {
      speak('Navigating to tutorial');
      setTimeout(() => navigate('/tutorial'), 1000);
    },
    'submit': () => handleSubmit(),
  };

  const { isListening, transcript } = useVoiceCommands({
    enabled: isVoiceActive && voiceEnabled,
    commands: voiceCommands,
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isVoiceActive) {
        e.preventDefault();
        setIsVoiceActive(true);
        speak('Voice commands activated. You can now speak your commands.');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVoiceActive]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (isSignUp && !formData.name) {
      toast({
        title: 'Name Required',
        description: 'Please enter your name',
        variant: 'destructive',
      });
      speak('Please enter your name');
      return;
    }

    if (!formData.email || !formData.password) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      speak('Please fill in all required fields');
      return;
    }

    const action = isSignUp ? 'Account created successfully' : 'Signed in successfully';
    toast({
      title: 'Success',
      description: action,
    });
    speak(action + '. Navigating to tutorial.');
    
    setTimeout(() => {
      navigate('/tutorial');
    }, 1500);
  };

  const handleTabChange = (value: string) => {
    setIsSignUp(value === 'signup');
    speak(value === 'signup' ? 'Sign up form' : 'Sign in form');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AccessibilityControls />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-2">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold gradient-text">
                Welcome to SkillBridge
              </CardTitle>
              <CardDescription className="text-base">
                {isVoiceActive && isListening && (
                  <span className="flex items-center justify-center gap-2 text-primary font-medium">
                    <Mic className="h-4 w-4 animate-pulse" />
                    Listening: {transcript}
                  </span>
                )}
                {!isVoiceActive && (
                  <span>Press <kbd className="px-2 py-1 bg-muted rounded text-sm">Space</kbd> for voice commands</span>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={isSignUp ? 'signup' : 'signin'} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        ref={emailRef}
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => speak('Email field')}
                        className="focus-visible-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <Input
                        id="signin-password"
                        ref={passwordRef}
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onFocus={() => speak('Password field')}
                        className="focus-visible-ring"
                      />
                    </div>
                    <Button type="submit" variant="hero" className="w-full" size="lg">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        ref={nameRef}
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => speak('Name field')}
                        className="focus-visible-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => speak('Email field')}
                        className="focus-visible-ring"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onFocus={() => speak('Password field')}
                        className="focus-visible-ring"
                      />
                    </div>
                    <Button type="submit" variant="hero" className="w-full" size="lg">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={() => {
                    speak('Navigating to tutorial');
                    navigate('/tutorial');
                  }}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Skip to tutorial →
                </Button>
              </div>

              {isVoiceActive && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary flex items-center gap-2">
                      {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      Voice Commands Active
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsVoiceActive(false);
                        speak('Voice commands deactivated');
                      }}
                    >
                      Deactivate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: "sign in", "sign up", "tutorial", "submit"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
