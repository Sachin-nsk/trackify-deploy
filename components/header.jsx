'use client';

import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from './ui/button';
import { LayoutDashboard, PenBox, PieChart, Menu, X } from "lucide-react";
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" 
        : "bg-background/80 backdrop-blur-sm"
    )}>
      <nav className='container mx-auto px-4 py-4'>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              Trackify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-2'>
            <SignedIn>
              <Link href="/tool">
                <Button variant="ghost" className="group hover:bg-accent hover:text-accent-foreground transition-colors">
                  <PieChart className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                  <span>Tools</span>
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="ghost" className="group hover:bg-accent hover:text-accent-foreground transition-colors">
                  <LayoutDashboard className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Dashboard</span>
                </Button>
              </Link>

              <Link href="/transaction/create">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <PenBox className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                  <span>Add Transaction</span>
                </Button>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton forceRedirectUrl='/dashboard'>
                <Button variant="outline" className="border-gradient hover:shadow-lg transition-all duration-300">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>

            <ThemeToggle />

            <SignedIn>
              <div className="ml-2">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/30 transition-all"
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full ring-2 ring-primary/20"
                  }
                }}
              />
            </SignedIn>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:bg-accent"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 pt-4">
              <SignedIn>
                <Link href="/tool" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start hover:bg-accent">
                    <PieChart className="h-4 w-4 mr-2" />
                    Tools
                  </Button>
                </Link>

                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start hover:bg-accent">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>

                <Link href="/transaction/create" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary text-primary-foreground">
                    <PenBox className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </Link>
              </SignedIn>

              <SignedOut>
                <SignInButton forceRedirectUrl='/dashboard'>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;