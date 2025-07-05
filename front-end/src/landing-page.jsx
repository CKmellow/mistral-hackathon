import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Heart, Shield, MapPin, Sparkles, ArrowRight, Download } from 'lucide-react';

const PamojaHubOnboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const slides = [
    {
      icon: <Users className="w-16 h-16 text-orange-500" />,
      title: "Build Community Resilience",
      subtitle: "Connect with neighbors you've never met",
      description: "Ubuntu Connect uses AI to weave together community networks that strengthen neighborhoods and build lasting connections between people who can help each other thrive.",
      gradient: "from-orange-500 to-pink-500"
    },
    {
      icon: <Heart className="w-16 h-16 text-purple-500" />,
      title: "Ubuntu Philosophy",
      subtitle: "I am because we are",
      description: "Rooted in the African philosophy of Ubuntu, our platform believes that individual wellbeing is deeply connected to community wellbeing. Together, we're stronger.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Shield className="w-16 h-16 text-blue-500" />,
      title: "Sustainable Communities",
      subtitle: "SDGs 11 & 16 in action",
      description: "Help build inclusive, safe, resilient communities while promoting peaceful and inclusive societies. Every connection contributes to the UN Sustainable Development Goals.",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const FloatingOrb = ({ delay = 0, size = 'w-4 h-4' }) => (
    <div 
      className={`${size} rounded-full bg-gradient-to-r from-orange-400 to-pink-400 opacity-20 animate-bounce absolute`} 
      style={{ animationDelay: `${delay}s` }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingOrb delay={0} size="w-6 h-6" />
        <FloatingOrb delay={1} size="w-8 h-8" />
        <FloatingOrb delay={2} size="w-4 h-4" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Tagline/Explainer */}
      <div className="absolute top-0 left-0 w-full flex justify-center pt-8 z-20 pointer-events-none">
        <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/20 text-white text-base font-medium tracking-wide transition-opacity duration-1000 opacity-100">
          AI-powered mutual aid for your neighborhood
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen flex flex-col transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <div className="p-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-yellow-400/60 animate-fade-in">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg tracking-tight">Pamoja Hub</h1>
          <p className="text-gray-200 text-lg font-medium">AI-Powered Community Fabric Builder</p>
        </div>

        {/* Slide Container */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
          <div className="max-w-md w-full">
            <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/30 transition-all duration-700 flex flex-col gap-6">
              <div className="text-center mb-6 sm:mb-10">
                <div className={`inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-r ${slides[currentSlide].gradient} mb-6 sm:mb-8 shadow-xl border-4 border-white/20`}>
                  {slides[currentSlide].icon}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-lg sm:text-xl text-orange-200 font-semibold mb-2 sm:mb-4">
                  {slides[currentSlide].subtitle}
                </p>
                <p className="text-gray-200 leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="text-xs text-gray-200 font-semibold">Local Focus</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                    <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="text-xs text-gray-200 font-semibold">Safe & Secure</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="text-xs text-gray-200 font-semibold">Community First</p>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                      index === currentSlide 
                        ? 'bg-orange-500 border-orange-400 w-8 h-3 shadow-lg scale-110' 
                        : 'bg-gray-600 border-gray-500 w-3 h-3 hover:bg-orange-400 hover:border-orange-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center">
            <button
              onClick={prevSlide}
              className="flex items-center space-x-2 px-6 sm:px-7 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 shadow-md font-semibold"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Back</span>
            </button>

            {currentSlide === slides.length - 1 ? (
              <button className="flex items-center space-x-2 px-8 sm:px-10 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-xl transform hover:scale-105 text-lg">
                <Download className="w-6 h-6" />
                <span>Get Started</span>
              </button>
            ) : (
              <button
                onClick={nextSlide}
                className="flex items-center space-x-2 px-8 sm:px-10 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-bold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-xl transform hover:scale-105 text-lg"
              >
                <span>Next</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-base mb-2 font-medium">Building stronger communities together</p>
            <div className="flex justify-center space-x-4 sm:space-x-6 text-sm text-gray-400">
              <span>🌍 SDG 11 & 16</span>
              <span>🤝 Ubuntu Philosophy</span>
              <span>🔒 Privacy First</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PamojaHubOnboarding;