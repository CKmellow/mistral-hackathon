import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Heart, Shield, MapPin, Sparkles, ArrowRight, Download, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const PamojaHubOnboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [interviewStep, setInterviewStep] = useState(0);
  const [interviewData, setInterviewData] = useState({ skills: '', support: '', languages: '', medical: '' });
  const [interviewDone, setInterviewDone] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const slides = [
    {
      icon: <Users className="w-16 h-16 text-orange-500" />,
      title: "Build Community Resilience",
      subtitle: "Connect with neighbors you've never met",
      description: "Pamoja Hub uses AI to weave together community networks that strengthen neighborhoods and build lasting connections between people who can help each other thrive.",
      gradient: "from-orange-500 to-pink-500"
    },
    {
      icon: <Heart className="w-16 h-16 text-purple-500" />,
      title: "Pamoja Hub",
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

  const interviewQuestions = [
    {
      question: "What skills do you have that might help neighbors?",
      name: "skills",
      placeholder: "e.g. Cooking, carpentry, first aid, driving..."
    },
    {
      question: "What kind of support might you need sometimes?",
      name: "support",
      placeholder: "e.g. Childcare, errands, tech help..."
    },
    {
      question: "Do you speak any other languages?",
      name: "languages",
      placeholder: "e.g. Swahili, French, sign language..."
    },
    {
      question: "Do you have any medical or emergency training?",
      name: "medical",
      placeholder: "e.g. Nurse, CPR certified, none..."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleInterviewInput = (e) => {
    const { name, value } = e.target;
    setInterviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterviewNext = (e) => {
    e.preventDefault();
    if (interviewStep < interviewQuestions.length - 1) {
      setInterviewStep((s) => s + 1);
    } else {
      setInterviewDone(true);
      setTimeout(() => {
        setShowInterview(false);
        setInterviewDone(false);
        setInterviewStep(0);
      }, 2500);
    }
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

      {/* Community Interview Button */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
        <button className="btn btn-main" onClick={() => { 
          console.log('Interview button clicked, showInterview before:', showInterview);
          setShowInterview(true);
        }}>
          <UserPlus style={{ marginRight: 8 }} /> Community Interview
        </button>
      </div>

      {/* Community Interview Modal */}
      {console.log('Rendering, showInterview:', showInterview)}
      {showInterview && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <button className="event-modal-close" onClick={() => setShowInterview(false)}>&times;</button>
            {interviewDone ? (
              <div>
                <h2 className="event-modal-title">Your Mutual Aid Map</h2>
                <div style={{ margin: '1.2rem 0', color: '#312e81', fontWeight: 500 }}>
                  <div><b>Skills you can offer:</b> {interviewData.skills || '—'}</div>
                  <div><b>Support you might need:</b> {interviewData.support || '—'}</div>
                  <div><b>Languages:</b> {interviewData.languages || '—'}</div>
                  <div><b>Medical/Emergency Training:</b> {interviewData.medical || '—'}</div>
                </div>
                <div className="event-success">Thank you for sharing!<br/>Your skills and needs help build a stronger community.</div>
              </div>
            ) : (
              <form onSubmit={handleInterviewNext}>
                <h2 className="event-modal-title">{interviewQuestions[interviewStep].question}</h2>
                <input
                  type="text"
                  name={interviewQuestions[interviewStep].name}
                  value={interviewData[interviewQuestions[interviewStep].name]}
                  onChange={handleInterviewInput}
                  className="event-modal-input"
                  placeholder={interviewQuestions[interviewStep].placeholder}
                  required
                  autoFocus
                />
                <button type="submit" className="btn btn-main" style={{ width: '100%', marginTop: '1.2rem' }}>
                  {interviewStep === interviewQuestions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PamojaHubOnboarding;