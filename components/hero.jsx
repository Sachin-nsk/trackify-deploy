"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: TrendingUp, text: "AI-Powered Analytics" },
    { icon: Zap, text: "Real-time Insights" },
  ];

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-background to-teal-50/50 dark:from-emerald-950/20 dark:via-background dark:to-teal-950/20" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className='relative z-10 container mx-auto px-4 text-center'>
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>


          {/* Main Heading */}
          <h1 className='text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight'>
            <span className="block">Manage Your</span>
            <span className="block gradient-title">Finances</span>
            <span className="block text-foreground">Intelligently</span>
          </h1>

          {/* Subtitle */}
          <p className='text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed'>
            Transform your financial life with AI-powered insights, smart budgeting, 
            and real-time expense tracking that adapts to your lifestyle.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full border border-border shadow-sm"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <feature.icon className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row justify-center gap-4 mb-16'>
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2 border-border hover:border-primary/30 hover:bg-accent transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className='flex justify-center'>
            <div className={`hero-image-wrapper transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className='relative rounded-3xl shadow-2xl border-4 border-border/50 overflow-hidden transform hover:scale-105 transition-transform duration-700 bg-card/20 backdrop-blur-lg max-w-4xl w-full'>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 z-10" />
                
                <Image 
                  src="/banner3.jpg" 
                  width={1200} 
                  height={800}
                  alt="Finance Dashboard Preview"
                  className='w-full h-auto object-cover rounded-3xl' 
                  priority
                />
                
                {/* Floating Elements */}
                <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-float z-20">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">Live Updates</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-float z-20" style={{ animationDelay: '1s' }}>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;