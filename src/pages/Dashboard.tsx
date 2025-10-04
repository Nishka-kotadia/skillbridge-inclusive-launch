import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AccessibilityControls from '@/components/AccessibilityControls';
import VRPlaceholder from '@/components/VRPlaceholder';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Users, Heart, Sprout, Glasses, BookOpen, Award } from 'lucide-react';

interface CategoryCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  features: string[];
}

const categories: CategoryCard[] = [
  {
    id: 'women',
    title: 'Women Skill Development',
    description: 'Empowering women with professional and entrepreneurial skills',
    icon: <Users className="h-12 w-12" />,
    color: 'hsl(340 82% 62%)',
    bgGradient: 'from-pink-500/10 to-rose-500/10',
    features: ['Leadership Training', 'Digital Skills', 'Business Management', 'Financial Literacy'],
  },
  {
    id: 'children',
    title: 'Special Children Learning',
    description: 'Inclusive education programs designed for children with special needs',
    icon: <Heart className="h-12 w-12" />,
    color: 'hsl(45 100% 60%)',
    bgGradient: 'from-yellow-500/10 to-amber-500/10',
    features: ['Adaptive Learning', 'Sensory Activities', 'Social Skills', 'Creative Expression'],
  },
  {
    id: 'rural',
    title: 'Rural Youth Empowerment',
    description: 'Building opportunities for rural youth through skill development',
    icon: <Sprout className="h-12 w-12" />,
    color: 'hsl(120 60% 50%)',
    bgGradient: 'from-green-500/10 to-emerald-500/10',
    features: ['Agricultural Tech', 'Vocational Training', 'Entrepreneurship', 'Digital Literacy'],
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { speak } = useTextToSpeech();
  const { voiceEnabled } = useAccessibility();

  useEffect(() => {
    speak('Welcome to your dashboard. Choose a learning module to get started. You can also explore our VR learning experiences.');
  }, []);

  const voiceCommands = {
    'women': () => handleCategoryClick('women'),
    'children': () => handleCategoryClick('children'),
    'rural': () => handleCategoryClick('rural'),
    'vr': () => {
      speak('Opening VR module');
      document.getElementById('vr-section')?.scrollIntoView({ behavior: 'smooth' });
    },
    'tutorial': () => {
      speak('Navigating to tutorial');
      setTimeout(() => navigate('/tutorial'), 1000);
    },
  };

  useVoiceCommands({
    enabled: voiceEnabled,
    commands: voiceCommands,
  });

  const handleCategoryClick = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      speak(`Opening ${category.title} module`);
      // Navigate to category-specific page (placeholder for now)
      setTimeout(() => {
        navigate(`/module/${categoryId}`);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AccessibilityControls />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Your Learning Dashboard</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your path and start your journey to skill mastery
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className="card-hover cursor-pointer border-2 overflow-hidden group"
              style={{
                animationDelay: `${index * 0.1}s`,
                borderColor: `${category.color}40`,
              }}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => speak(category.title)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <CardHeader className="relative z-10">
                <div
                  className="mb-4 p-4 rounded-full w-fit"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  {category.icon}
                </div>
                <CardTitle className="text-2xl font-bold mb-2">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {category.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="space-y-2 mb-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">Key Features:</p>
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="default"
                  className="w-full"
                  style={{
                    backgroundColor: category.color,
                    color: 'white',
                  }}
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Courses in Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-secondary/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Achievements Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Glasses className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">VR Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* VR Section */}
        <div id="vr-section" className="scroll-mt-24">
          <VRPlaceholder />
        </div>

        {/* Help Section */}
        <Card className="mt-12 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-6">
                Replay the tutorial anytime to learn about navigation and features
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  speak('Navigating to tutorial');
                  setTimeout(() => navigate('/tutorial'), 1000);
                }}
              >
                View Tutorial Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
