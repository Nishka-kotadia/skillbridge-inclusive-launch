import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { Glasses, Play, Maximize2, Settings, Info } from 'lucide-react';

const VRPlaceholder: React.FC = () => {
  const { speak } = useTextToSpeech();
  const [isVRActive, setIsVRActive] = useState(false);

  const handleStartVR = () => {
    speak('Starting VR module. This is a placeholder for WebXR integration.');
    setIsVRActive(true);
    
    // Placeholder for WebXR API integration
    // In a real implementation, this would check for WebXR support and start a VR session
    if ('xr' in navigator) {
      speak('WebXR is supported on this device');
    } else {
      speak('WebXR is not supported on this device. Showing 360 preview mode.');
    }
  };

  const handleExitVR = () => {
    speak('Exiting VR mode');
    setIsVRActive(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          <span className="gradient-text">Immersive VR Learning</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Experience learning in virtual reality with our interactive modules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* VR Preview Card */}
        <Card className="border-2 border-primary/30 overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="relative h-80 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(262 83% 58% / 0.2), transparent 70%)',
              }}
            >
              {!isVRActive ? (
                <div className="text-center space-y-4">
                  <Glasses className="h-24 w-24 text-primary mx-auto animate-pulse-glow" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Ready to enter VR
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30 animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white space-y-4">
                      <div className="animate-spin">
                        <Glasses className="h-24 w-24" />
                      </div>
                      <p className="text-xl font-bold">VR Session Active</p>
                      <p className="text-sm">WebXR Module Loading...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* VR Controls Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Glasses className="h-6 w-6 text-primary" />
              VR Module Controls
            </CardTitle>
            <CardDescription>
              Start your immersive learning experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {!isVRActive ? (
                <Button
                  variant="hero"
                  className="w-full"
                  size="lg"
                  onClick={handleStartVR}
                  onMouseEnter={() => speak('Start VR module button')}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start VR Module
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  className="w-full"
                  size="lg"
                  onClick={handleExitVR}
                >
                  Exit VR Mode
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => speak('Full screen mode for VR')}
              >
                <Maximize2 className="mr-2 h-4 w-4" />
                Fullscreen Mode
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => speak('VR settings and preferences')}
              >
                <Settings className="mr-2 h-4 w-4" />
                VR Settings
              </Button>
            </div>

            <div className="border-t pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">WebXR Compatible</p>
                  <p className="text-xs text-muted-foreground">
                    Works with VR headsets and 360° viewing on supported devices
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-semibold">Available VR Experiences:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Virtual Classroom Environments</li>
                  <li>• Interactive Skill Demonstrations</li>
                  <li>• 3D Learning Simulations</li>
                  <li>• Collaborative Virtual Spaces</li>
                </ul>
              </div>

              <div className="text-xs text-muted-foreground text-center pt-2">
                This is a placeholder for WebXR integration. VR modules will be available soon.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VR Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Immersive Learning',
            description: 'Experience concepts in 3D virtual environments',
            icon: <Glasses className="h-6 w-6" />,
          },
          {
            title: 'Interactive Simulations',
            description: 'Practice skills in realistic virtual scenarios',
            icon: <Play className="h-6 w-6" />,
          },
          {
            title: 'Collaborative Spaces',
            description: 'Learn together in shared virtual classrooms',
            icon: <Maximize2 className="h-6 w-6" />,
          },
        ].map((feature, index) => (
          <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VRPlaceholder;
