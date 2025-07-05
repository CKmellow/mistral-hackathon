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
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [questionError, setQuestionError] = useState("");

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

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("/api/mistral-questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          setDynamicQuestions(data.questions);
          setQuestionError("");
        } else {
          setDynamicQuestions([]);
          setQuestionError("No interview questions available.");
        }
      } catch (err) {
        setDynamicQuestions([]);
        setQuestionError("Could not load interview questions. Please try again later.");
      }
    }
    fetchQuestions();
  }, []);

  const interviewQuestions = dynamicQuestions;

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

  // Call Mistral API for AI summary
  async function getMistralSummary(interviewData) {
    setLoadingSummary(true);
    setAiSummary("");
    try {
      const prompt = `Here are my answers for a community mutual aid interview.\nSkills: ${interviewData.skills}\nSupport needed: ${interviewData.support}\nLanguages: ${interviewData.languages}\nMedical/Emergency: ${interviewData.medical}\n\nPlease provide a friendly, short summary of how I can help and what I might need, as if for a community dashboard.`;
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_MISTRAL_API_KEY",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistral-tiny",
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      setAiSummary(data.choices?.[0]?.message?.content || "(No summary returned)");
    } catch (err) {
      setAiSummary("Could not fetch AI summary.");
    }
    setLoadingSummary(false);
  }

  const handleInterviewNext = async (e) => {
    e.preventDefault();
    if (interviewStep < interviewQuestions.length - 1) {
      setInterviewStep((s) => s + 1);
    } else {
      setInterviewDone(true);
      await getMistralSummary(interviewData);
      setTimeout(() => {
        setShowInterview(false);
        setInterviewDone(false);
        setInterviewStep(0);
        setAiSummary("");
      }, 5000);
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

        {/* Community Interview Button */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0', padding: '0 1.5rem' }}>
          <button className="btn btn-main" onClick={() => setShowInterview(true)}>
            <UserPlus style={{ marginRight: 8 }} /> Community Interview
          </button>
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

      {/* Community Interview Modal */}
      {showInterview && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <button className="event-modal-close" onClick={() => setShowInterview(false)}>&times;</button>
            {interviewDone ? (
              <div>
                <h2 className="event-modal-title">Your Mutual Aid Map</h2>
                <div style={{ margin: '1.2rem 0', color: '#312e81', fontWeight: 500 }}>
                  {interviewQuestions.map((q, idx) => (
                    <div key={q.name}><b>{q.question}</b> {interviewData[q.name] || '—'}</div>
                  ))}
                </div>
                <div className="event-success">Thank you for sharing!<br/>Your skills and needs help build a stronger community.</div>
                <div style={{marginTop: '1.5rem'}}>
                  <b>AI Summary:</b><br/>
                  {loadingSummary ? <span>Loading summary...</span> : aiSummary ? <span>{aiSummary}</span> : <span style={{color:'#b91c1c'}}>Could not fetch summary. Please try again later.</span>}
                </div>
              </div>
            ) : (
              interviewQuestions.length === 0 ? (
                <div style={{color:'#b91c1c', fontWeight:600, textAlign:'center', padding:'2rem 0'}}>{questionError}</div>
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
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PamojaHubOnboarding;