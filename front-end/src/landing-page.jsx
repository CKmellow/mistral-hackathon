import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Heart, Shield, MapPin, Sparkles, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const FloatingOrb = ({ delay = 0, size = 'orb-small' }) => (
    <div 
      className={`floating-orb ${size}`} 
      style={{ animationDelay: `${delay}s` }}
    />
  );

  return (
    <div className={`onboarding-bg ${isVisible ? 'fade-in' : 'fade-out'}`}>
      {/* Animated Background Elements */}
      <div className="background-animated">
        <FloatingOrb delay={0} size="orb-medium" />
        <FloatingOrb delay={1} size="orb-large" />
        <FloatingOrb delay={2} size="orb-small" />
        <div className="background-blur-orange" />
        <div className="background-blur-purple" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Tagline/Explainer */}
      <div className="tagline-container">
        <div className="tagline">AI-powered mutual aid for your neighborhood</div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-icon-container">
            <div className="header-icon-bg">
              <Users className="header-icon" />
            </div>
            <div className="header-sparkle-bg">
              <Sparkles className="header-sparkle" />
            </div>
          </div>
          <h1 className="main-title">Pamoja Hub</h1>
          <p className="main-subtitle">AI-Powered Community Fabric Builder</p>
        </div>

        {/* Slide Container */}
        <div className="slide-container">
          <div className="slide-card">
            <div className="slide-content">
              <div className={`slide-icon-bg ${slides[currentSlide].gradient}`}>
                {slides[currentSlide].icon}
              </div>
              <h2 className="slide-title">{slides[currentSlide].title}</h2>
              <p className="slide-subtitle">{slides[currentSlide].subtitle}</p>
              <p className="slide-description">{slides[currentSlide].description}</p>
            </div>

            {/* Features Grid */}
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon-bg feature-green">
                  <MapPin className="feature-icon" />
                </div>
                <p className="feature-label">Local Focus</p>
              </div>
              <div className="feature">
                <div className="feature-icon-bg feature-blue">
                  <Shield className="feature-icon" />
                </div>
                <p className="feature-label">Safe & Secure</p>
              </div>
              <div className="feature">
                <div className="feature-icon-bg feature-pink">
                  <Heart className="feature-icon" />
                </div>
                <p className="feature-label">Community First</p>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="nav-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="bottom-action">
          <div className="bottom-buttons">
            <button
              onClick={prevSlide}
              className="btn btn-back"
            >
              <ChevronRight className="btn-icon rotate-180" />
              <span>Back</span>
            </button>

            {currentSlide === slides.length - 1 ? (
              <Link to="/home" className="btn btn-main">
                <Download className="btn-icon" />
                <span>Get Started</span>
              </Link>
            ) : (
              <button
                onClick={nextSlide}
                className="btn btn-main"
              >
                <span>Next</span>
                <ArrowRight className="btn-icon" />
              </button>
            )}
          </div>

          <div className="bottom-info">
            <p className="bottom-message">Building stronger communities together</p>
            <div className="bottom-tags">
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