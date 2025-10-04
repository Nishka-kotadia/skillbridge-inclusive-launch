import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AccessibilityControls from '@/components/AccessibilityControls';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { GraduationCap, Headphones, Users, Globe, Zap, Shield } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

const Index: React.FC = () => {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    speak('Welcome to SkillBridge. Your accessible platform for skill development and learning.');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AccessibilityControls />
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, hsl(262 83% 58% / 0.1) 0%, hsl(180 65% 55% / 0.1) 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <img src={heroBanner} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">Empowering Communities</span>
              <br />
              Through Skill Development
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
              An inclusive, accessible platform combining traditional learning with cutting-edge VR/AR technology for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link to="/auth">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Get Started Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              Press Space Bar for voice commands • Full screen reader support
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Built for Everyone</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accessibility-first design with powerful features for all learners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Headphones className="h-8 w-8 text-primary" />,
                title: 'Voice Commands',
                description: 'Navigate and interact using natural voice commands. Perfect for hands-free learning.',
              },
              {
                icon: <Users className="h-8 w-8 text-secondary" />,
                title: 'Inclusive Learning',
                description: 'Tailored programs for women, special children, and rural youth communities.',
              },
              {
                icon: <Globe className="h-8 w-8 text-accent" />,
                title: 'VR/AR Integration',
                description: 'Immersive virtual reality modules for enhanced learning experiences.',
              },
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: 'Text-to-Speech',
                description: 'Every element reads aloud for visually impaired learners.',
              },
              {
                icon: <Shield className="h-8 w-8 text-secondary" />,
                title: 'High Contrast Mode',
                description: 'Customizable display options for better readability.',
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-accent" />,
                title: 'Guided Tutorials',
                description: 'Step-by-step interactive tutorials with voice guidance.',
              },
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="card-hover border-2 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Our Mission</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            SkillBridge is committed to breaking down barriers to education and skill development. 
            We leverage modern technology, including VR/AR and voice interfaces, to create an 
            inclusive learning environment where everyone—regardless of physical ability, location, 
            or background—can unlock their potential.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-lg bg-card border-2 border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Learners</div>
            </div>
            <div className="p-6 rounded-lg bg-card border-2 border-secondary/20">
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-muted-foreground">Courses Available</div>
            </div>
            <div className="p-6 rounded-lg bg-card border-2 border-accent/20">
              <div className="text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-12 border-2 border-primary/20">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of learners building skills for a brighter future.
            </p>
            <Link to="/auth">
              <Button variant="hero" size="lg" className="text-lg px-12 py-6">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
