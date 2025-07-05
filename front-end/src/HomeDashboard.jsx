import React, { useState, useEffect } from 'react';
import { 
  Users, MapPin, Shield, Heart, Bell, ArrowRight, Plus, 
  TrendingUp, MessageSquare, Calendar, Gift, AlertCircle,
  Home, Zap, Star, Clock, ChevronRight, UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PamojaDashboard = () => {
  const navigate = useNavigate();
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [activeRequests, setActiveRequests] = useState(3);
  const [communityScore, setCommunityScore] = useState(85);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({ name: '', date: '', description: '' });
  const [eventSuccess, setEventSuccess] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpForm, setHelpForm] = useState({ category: '', description: '', availability: '' });
  const [helpSuccess, setHelpSuccess] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [resourceImage, setResourceImage] = useState(null);
  const [resourceImagePreview, setResourceImagePreview] = useState(null);
  const [resourceForm, setResourceForm] = useState({ type: '', description: '', quantity: '', location: '' });
  const [resourceSuccess, setResourceSuccess] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [interviewStep, setInterviewStep] = useState(0);
  const [interviewData, setInterviewData] = useState({ skills: '', support: '', languages: '', medical: '' });
  const [interviewDone, setInterviewDone] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("/api/mistral-questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          setDynamicQuestions(data.questions);
        } else {
          setDynamicQuestions([]);
        }
      } catch (err) {
        setDynamicQuestions([]); // No fallback, show error below
      }
    }
    fetchQuestions();
  }, []);

  const getGreeting = () => {
    const greetings = {
      morning: "Good morning",
      afternoon: "Good afternoon", 
      evening: "Good evening"
    };
    return greetings[timeOfDay];
  };

  const recentActivities = [
    { 
      id: 1, 
      user: "Sarah M.", 
      action: "offered to help with groceries", 
      time: "2 hours ago",
      type: "offer",
      urgent: false
    },
    { 
      id: 2, 
      user: "Community Garden", 
      action: "Weekend cleanup event - 12 volunteers needed", 
      time: "5 hours ago",
      type: "event",
      urgent: true
    },
    { 
      id: 3, 
      user: "Alex K.", 
      action: "joined your neighborhood circle", 
      time: "1 day ago",
      type: "join",
      urgent: false
    },
    { 
      id: 4, 
      user: "Maria L.", 
      action: "shared homemade bread with 5 neighbors", 
      time: "2 days ago",
      type: "share",
      urgent: false
    }
  ];

  const helpCategories = [
    'Grocery Shopping',
    'Childcare',
    'Tech Help',
    'Pet Care',
    'Tutoring',
    'Other'
  ];

  const resourceTypes = [
    'Food',
    'Books',
    'Clothes',
    'Tools',
    'Toys',
    'Other'
  ];

  // Add Create Event button to Quick Actions
  const quickActions = [
    { icon: <Heart className="icon" />, label: "Offer Help", colorClass: "quick-action-green", onClick: () => setShowHelpModal(true) },
    { icon: <Gift className="icon" />, label: "Share Resources", colorClass: "quick-action-blue", onClick: () => setShowResourceModal(true) },
    { icon: <Calendar className="icon" />, label: "Create Event", colorClass: "quick-action-purple", onClick: () => setShowEventModal(true) },
    { icon: <MessageSquare className="icon" />, label: "Chat", colorClass: "quick-action-orange", onClick: () => navigate('/chat') }
  ];

  const communityStats = [
    { label: "Active Neighbors", value: "24", icon: <Users className="icon" />, trend: "+3" },
    { label: "Mutual Aid Actions", value: "47", icon: <Heart className="icon" />, trend: "+12" },
    { label: "Community Score", value: `${communityScore}%`, icon: <Star className="icon" />, trend: "+5%" }
  ];

  const handleEventInput = (e) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setEventSuccess(true);
    setTimeout(() => {
      setShowEventModal(false);
      setEventSuccess(false);
      setEventForm({ name: '', date: '', description: '' });
    }, 1500);
  };

  const handleHelpInput = (e) => {
    const { name, value } = e.target;
    setHelpForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHelpCategory = (cat) => {
    setHelpForm((prev) => ({ ...prev, category: cat }));
  };

  const handleHelpSubmit = (e) => {
    e.preventDefault();
    setHelpSuccess(true);
    setTimeout(() => {
      setShowHelpModal(false);
      setHelpSuccess(false);
      setHelpForm({ category: '', description: '', availability: '' });
    }, 1500);
  };

  const handleResourceInput = (e) => {
    const { name, value } = e.target;
    setResourceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResourceImage = (e) => {
    const file = e.target.files[0];
    setResourceImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setResourceImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setResourceImagePreview(null);
    }
  };

  const handleResourceType = (type) => {
    setResourceForm((prev) => ({ ...prev, type }));
  };

  const handleResourceSubmit = (e) => {
    e.preventDefault();
    setResourceSuccess(true);
    setTimeout(() => {
      setShowResourceModal(false);
      setResourceSuccess(false);
      setResourceForm({ type: '', description: '', quantity: '', location: '' });
      setResourceImage(null);
      setResourceImagePreview(null);
    }, 1500);
  };

  const handleInterviewInput = (e) => {
    const { name, value } = e.target;
    setInterviewData((prev) => ({ ...prev, [name]: value }));
  };

  // Call backend for AI summary and feedback
  async function getMistralSummary(interviewData) {
    setLoadingSummary(true);
    setAiSummary("");
    setFeedbackMessage("");
    try {
      const response = await fetch("/api/mistral-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interviewData)
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Backend error: ${response.status} ${text}`);
      }
      const data = await response.json();
      setAiSummary(data.summary || "(No summary returned)");
      setFeedbackMessage(data.feedback || "(No feedback provided)");
    } catch (err) {
      setAiSummary("Could not fetch AI summary. " + (err.message || ""));
      setFeedbackMessage("");
    }
    setLoadingSummary(false);
  }

  const handleInterviewNext = async (e) => {
    e.preventDefault();
    if (interviewStep < questionsToUse.length - 1) {
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

  const questionsToUse = dynamicQuestions;

  return (
    <div className="dashboard-bg">
      {/* Background Elements */}
      <div className="dashboard-bg-blobs">
        <div className="dashboard-blob dashboard-blob-orange" />
        <div className="dashboard-blob dashboard-blob-purple" />
      </div>

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-row">
            <div>
              <h1 className="dashboard-title">
                {getGreeting()}, Friend! <span role="img" aria-label="wave">👋</span>
              </h1>
              <p className="dashboard-subtitle">Your community is thriving today</p>
            </div>
            <div className="dashboard-header-actions">
              <div className="dashboard-bell-container">
                <Bell className="dashboard-bell" />
                <div className="dashboard-bell-badge">
                  <span>{activeRequests}</span>
                </div>
              </div>
              <div className="dashboard-avatar">
                <span>JD</span>
              </div>
            </div>
          </div>

          {/* Community Health Banner */}
          <div className="dashboard-health-banner">
            <div className="dashboard-health-row">
              <div className="dashboard-health-icon-row">
                <div className="dashboard-health-icon">
                  <TrendingUp className="icon" />
                </div>
                <div>
                  <h3 className="dashboard-health-title">Community Health: Excellent</h3>
                  <p className="dashboard-health-desc">Your neighborhood resilience score is {communityScore}%</p>
                </div>
              </div>
              <div className="dashboard-health-score">
                <div className="dashboard-health-score-main">{communityScore}%</div>
                <div className="dashboard-health-score-trend">↗ +5% this week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-quick-actions">
          <h2 className="dashboard-section-title">Quick Actions</h2>
          <div className="dashboard-quick-actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`dashboard-quick-action ${action.colorClass}`}
                onClick={action.onClick}
              >
                <div className="dashboard-quick-action-icon">
                  {action.icon}
                </div>
                <span className="dashboard-quick-action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-main-grid">
          {/* Community Activity Feed */}
          <div className="dashboard-activity-feed">
            <div className="dashboard-card">
              <div className="dashboard-card-header-row">
                <h2 className="dashboard-section-title">Community Pulse</h2>
                <button className="dashboard-link">View All</button>
              </div>
              <div className="dashboard-activity-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="dashboard-activity-item">
                    <div className="dashboard-activity-item-row">
                      <div className={`dashboard-activity-avatar ${activity.type}`}> 
                        {activity.type === 'offer' && <Heart className="icon" />} 
                        {activity.type === 'event' && <Calendar className="icon" />} 
                        {activity.type === 'join' && <Users className="icon" />} 
                        {activity.type === 'share' && <Gift className="icon" />} 
                      </div>
                      <div className="dashboard-activity-content">
                        <div className="dashboard-activity-content-row">
                          <p className="dashboard-activity-user">{activity.user}</p>
                          <div className="dashboard-activity-meta">
                            {activity.urgent && <AlertCircle className="icon urgent" />} 
                            <span className="dashboard-activity-time">{activity.time}</span>
                          </div>
                        </div>
                        <p className="dashboard-activity-action">{activity.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats & Quick Info */}
          <div className="dashboard-stats-side">
            {/* Community Stats */}
            <div className="dashboard-card">
              <h3 className="dashboard-card-title">Your Impact</h3>
              <div className="dashboard-stats-list">
                {communityStats.map((stat, index) => (
                  <div key={index} className="dashboard-stat-item">
                    <div className="dashboard-stat-icon-row">
                      <div className="dashboard-stat-icon">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="dashboard-stat-label">{stat.label}</p>
                        <div className="dashboard-stat-value-row">
                          <span className="dashboard-stat-value">{stat.value}</span>
                          <span className="dashboard-stat-trend">{stat.trend}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Requests */}
            <div className="dashboard-card">
              <h3 className="dashboard-card-title">Nearby Requests</h3>
              <div className="dashboard-nearby-list">
                <div className="dashboard-nearby-item urgent">
                  <div className="dashboard-nearby-urgent-row">
                    <AlertCircle className="icon urgent" />
                    <span className="dashboard-nearby-urgent-label">Urgent</span>
                  </div>
                  <p className="dashboard-nearby-desc">Elderly neighbor needs medication pickup</p>
                  <p className="dashboard-nearby-distance">0.3 miles away</p>
                </div>
                <div className="dashboard-nearby-item">
                  <p className="dashboard-nearby-desc">Looking for childcare help this weekend</p>
                  <p className="dashboard-nearby-distance">0.5 miles away</p>
                </div>
              </div>
              <button className="dashboard-link dashboard-link-block">
                View All Requests
              </button>
            </div>
          </div>
        </div>

        {/* Feature Navigation */}
        <div className="dashboard-feature-nav">
          <button className="dashboard-feature-card dashboard-feature-map">
            <div className="dashboard-feature-card-row">
              <div className="dashboard-feature-icon">
                <MapPin className="icon" />
              </div>
              <ChevronRight className="dashboard-feature-chevron" />
            </div>
            <h3 className="dashboard-feature-title">Mutual Aid Map</h3>
            <p className="dashboard-feature-desc">Discover help and resources in your area</p>
          </button>

          <button className="dashboard-feature-card dashboard-feature-emergency">
            <div className="dashboard-feature-card-row">
              <div className="dashboard-feature-icon">
                <Shield className="icon" />
              </div>
              <ChevronRight className="dashboard-feature-chevron" />
            </div>
            <h3 className="dashboard-feature-title">Emergency Hub</h3>
            <p className="dashboard-feature-desc">Community emergency response & alerts</p>
          </button>

          <button className="dashboard-feature-card dashboard-feature-circle">
            <div className="dashboard-feature-card-row">
              <div className="dashboard-feature-icon">
                <Heart className="icon" />
              </div>
              <ChevronRight className="dashboard-feature-chevron" />
            </div>
            <h3 className="dashboard-feature-title">My Circle</h3>
            <p className="dashboard-feature-desc">Your trusted neighborhood network</p>
          </button>
        </div>

        {/* Community Interview Button */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0 1rem' }}>
          <button className="btn btn-main" onClick={() => setShowInterview(true)}>
            <UserPlus style={{ marginRight: 8 }} /> Community Interview
          </button>
        </div>
      </div>
      {/* Event Modal Popup */}
      {showEventModal && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <button className="event-modal-close" onClick={() => setShowEventModal(false)}>&times;</button>
            {eventSuccess ? (
              <div className="event-success">Event created successfully!</div>
            ) : (
              <form onSubmit={handleEventSubmit}>
                <h2 className="event-modal-title">Create Community Event</h2>
                <label className="event-modal-label">
                  Event Name
                  <input
                    type="text"
                    name="name"
                    value={eventForm.name}
                    onChange={handleEventInput}
                    className="event-modal-input"
                    required
                  />
                </label>
                <label className="event-modal-label">
                  Date
                  <input
                    type="date"
                    name="date"
                    value={eventForm.date}
                    onChange={handleEventInput}
                    className="event-modal-input"
                    required
                  />
                </label>
                <label className="event-modal-label">
                  Description
                  <textarea
                    name="description"
                    value={eventForm.description}
                    onChange={handleEventInput}
                    className="event-modal-input"
                    rows={3}
                    required
                  />
                </label>
                <button type="submit" className="btn btn-main" style={{ width: '100%', marginTop: '1rem' }}>
                  Create Event
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Offer Help Modal Popup */}
      {showHelpModal && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <button className="event-modal-close" onClick={() => setShowHelpModal(false)}>&times;</button>
            {helpSuccess ? (
              <div className="event-success">Thank you for offering help!</div>
            ) : (
              <form onSubmit={handleHelpSubmit}>
                <h2 className="event-modal-title">Offer Help</h2>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Select a Category</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {helpCategories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        className={`help-category-btn${helpForm.category === cat ? ' selected' : ''}`}
                        onClick={() => handleHelpCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="event-modal-label">
                  Description
                  <textarea
                    name="description"
                    value={helpForm.description}
                    onChange={handleHelpInput}
                    className="event-modal-input"
                    rows={3}
                    required
                  />
                </label>
                <label className="event-modal-label">
                  Availability
                  <input
                    type="text"
                    name="availability"
                    value={helpForm.availability}
                    onChange={handleHelpInput}
                    className="event-modal-input"
                    placeholder="e.g. Weekends, Evenings, etc."
                    required
                  />
                </label>
                <button type="submit" className="btn btn-main" style={{ width: '100%', marginTop: '1rem' }}>
                  Offer Help
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Share Resources Modal Popup */}
      {showResourceModal && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <button className="event-modal-close" onClick={() => setShowResourceModal(false)}>&times;</button>
            {resourceSuccess ? (
              <div className="event-success">Resource shared successfully!</div>
            ) : (
              <form onSubmit={handleResourceSubmit}>
                <h2 className="event-modal-title">Share a Resource</h2>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Select Resource Type</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {resourceTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        className={`help-category-btn${resourceForm.type === type ? ' selected' : ''}`}
                        onClick={() => handleResourceType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="event-modal-label">
                  Description
                  <textarea
                    name="description"
                    value={resourceForm.description}
                    onChange={handleResourceInput}
                    className="event-modal-input"
                    rows={3}
                    required
                  />
                </label>
                <label className="event-modal-label">
                  Quantity
                  <input
                    type="text"
                    name="quantity"
                    value={resourceForm.quantity}
                    onChange={handleResourceInput}
                    className="event-modal-input"
                    placeholder="e.g. 2 bags, 5 books, etc."
                    required
                  />
                </label>
                <label className="event-modal-label">
                  Pickup Location (optional)
                  <input
                    type="text"
                    name="location"
                    value={resourceForm.location}
                    onChange={handleResourceInput}
                    className="event-modal-input"
                    placeholder="e.g. 123 Main St, Community Center, etc."
                  />
                </label>
                <label className="event-modal-label">
                  Photo (optional)
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleResourceImage}
                    className="event-modal-input"
                    style={{ padding: 0, border: 'none', background: 'none' }}
                  />
                </label>
                {resourceImagePreview && (
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <img src={resourceImagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '0.7rem', boxShadow: '0 2px 8px #0002' }} />
                  </div>
                )}
                <button type="submit" className="btn btn-main" style={{ width: '100%', marginTop: '1rem' }}>
                  Share Resource
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Community Interview Modal */}
      {showInterview && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <button className="event-modal-close" onClick={() => setShowInterview(false)}>&times;</button>
            {interviewDone ? (
              <div>
                <h2 className="event-modal-title">Your Mutual Aid Map</h2>
                <div style={{ margin: '1.2rem 0', color: '#312e81', fontWeight: 500 }}>
                  {questionsToUse.map((q, idx) => (
                    <div key={q.name}><b>{q.question}</b> {interviewData[q.name] || '—'}</div>
                  ))}
                </div>
                <div className="event-success">Thank you for sharing!<br/>Your skills and needs help build a stronger community.</div>
                <div style={{marginTop: '1.5rem'}}>
                  <b>AI Summary:</b><br/>
                  {loadingSummary ? <span>Loading summary...</span> : aiSummary ? <span>{aiSummary}</span> : <span style={{color:'#b91c1c'}}>Could not fetch summary. Please try again later.</span>}
                </div>
                {feedbackMessage && (
                  <div style={{marginTop: '1.2rem', color: '#0e7490', fontWeight: 600}}>
                    <b>AI Feedback:</b><br/>{feedbackMessage}
                  </div>
                )}
              </div>
            ) : (
              questionsToUse.length === 0 ? (
                <div style={{color:'#b91c1c', fontWeight:600, textAlign:'center', padding:'2rem 0'}}>Could not load interview questions. Please try again later.</div>
              ) : (
                <form onSubmit={handleInterviewNext}>
                  <h2 className="event-modal-title">{questionsToUse[interviewStep].question}</h2>
                  <input
                    type="text"
                    name={questionsToUse[interviewStep].name}
                    value={interviewData[questionsToUse[interviewStep].name]}
                    onChange={handleInterviewInput}
                    className="event-modal-input"
                    placeholder={questionsToUse[interviewStep].placeholder}
                    required
                    autoFocus
                  />
                  <button type="submit" className="btn btn-main" style={{ width: '100%', marginTop: '1.2rem' }}>
                    {interviewStep === questionsToUse.length - 1 ? 'Finish' : 'Next'}
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

export default PamojaDashboard;
