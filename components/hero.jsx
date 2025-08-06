"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, LineChart, Wallet, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      imageRef.current.classList.toggle("scrolled", window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative pt-28 pb-20 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-blue-100 rounded-full filter blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-cyan-100 rounded-full filter blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight pb-6">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                  Manage Your Finances
                </span>{" "}
                <br />
                <span className="text-gray-900">with AI Intelligence</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Trackify helps you monitor spending, analyze patterns, and optimize 
                your budget with real-time AI-powered insights.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                <Link href="/dashboard">
                  <Button size="lg" className="px-7 gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              
              </div>
              
              
              <div className="mt-12 grid grid-cols-3 gap-3">
                <Card className="p-3 text-center bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:border-blue-200 transition-colors">
                  <div className="flex justify-center mb-1">
                    <LineChart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">10K+</div>
                  <div className="text-xs text-gray-500">Active Users</div>
                </Card>
                
                <Card className="p-3 text-center bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:border-blue-200 transition-colors">
                  <div className="flex justify-center mb-1">
                    <Wallet className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">$1B+</div>
                  <div className="text-xs text-gray-500">Managed</div>
                </Card>
                
                <Card className="p-3 text-center bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:border-blue-200 transition-colors">
                  <div className="flex justify-center mb-1">
                    <Headphones className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-xl font-bold text-gray-900">24/7</div>
                  <div className="text-xs text-gray-500">Support</div>
                </Card>
              </div>
            </motion.div>
          </div>
          
          
          <div className="lg:w-1/2">
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Card className="p-1.5 bg-white/80 backdrop-blur-sm border border-gray-200/80 shadow-xl rounded-xl overflow-hidden">
                <Image
                  src="/banner.png"
                  width={1280}
                  height={720}
                  alt="Trackify Dashboard Preview"
                  className="rounded-lg border border-gray-100 mx-auto"
                  priority
                />
                <div className="absolute -bottom-3 -right-3">
                  <Card className="px-3 py-1.5 flex items-center gap-2 shadow-sm bg-white border border-gray-200">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-gray-700">Live Analytics</span>
                  </Card>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;