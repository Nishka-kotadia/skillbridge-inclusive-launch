import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AccessibilityControls from '@/components/AccessibilityControls';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { ArrowLeft, BookOpen, Video, FileText, Users } from 'lucide-react';

const Module: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { speak } = useTextToSpeech();

  const moduleData: { [key: string]: { title: string; description: string; color: string } } = {
    women: {
      title: 'Women Skill Development',
      description: 'Empowering women through comprehensive skill development programs',
      color: 'hsl(340 82% 62%)',
    },
    children: {
      title: 'Special Children Learning',
      description: 'Inclusive education for children with special needs',
      color: 'hsl(45 100% 60%)',
    },
    rural: {
      title: 'Rural Youth Empowerment',
      description: 'Building opportunities for rural communities',
      color: 'hsl(120 60% 50%)',
    },
  };

  const module = moduleId ? moduleData[moduleId] : null;

  useEffect(() => {
    if (module) {
      speak(`Welcome to ${module.title} module`);
    }
  }, [module]);

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AccessibilityControls />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-8"
          onMouseEnter={() => speak('Back to dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Module Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div
            className="inline-block p-4 rounded-full mb-4"
            style={{ backgroundColor: `${module.color}20` }}
          >
            <Users className="h-16 w-16" style={{ color: module.color }} />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">{module.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {module.description}
          </p>
        </div>

        {/* Coming Soon Content */}
        <Card className="max-w-4xl mx-auto border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Module Content Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              This module is currently under development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-center text-muted-foreground">
                We're working hard to bring you comprehensive learning materials, including:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <BookOpen className="h-6 w-6" />, title: 'Interactive Lessons', description: 'Step-by-step guided learning' },
                  { icon: <Video className="h-6 w-6" />, title: 'Video Tutorials', description: 'Expert-led demonstrations' },
                  { icon: <FileText className="h-6 w-6" />, title: 'Practice Materials', description: 'Hands-on exercises' },
                  { icon: <Users className="h-6 w-6" />, title: 'Community Support', description: 'Connect with other learners' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="bg-primary/10 p-2 rounded">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-6">
                <Button
                  variant="hero"
                  onClick={() => navigate('/dashboard')}
                  size="lg"
                >
                  Explore Other Modules
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Module;
