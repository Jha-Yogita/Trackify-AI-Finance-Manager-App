import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  testimonialsData,
} from "@/components/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      <HeroSection />

      
      <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Powerful Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card 
                className="p-6 border border-gray-200/50 hover:border-blue-200 transition-colors" 
                key={index}
              >
                <CardContent className="space-y-4 pt-4">
                  <div className="text-blue-600">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              How It Works
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-blue-600">{step.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Trusted by Users
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-6 border border-gray-200/50 hover:border-blue-200 transition-colors"
              >
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Trackify today and experience smarter money management
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
              >
                Get Started Free
              </Button>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;