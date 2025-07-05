import React, { useState, useEffect } from 'react';
import { 
  Users, MapPin, Shield, Heart, Bell, ArrowRight, Plus, 
  TrendingUp, MessageSquare, Calendar, Gift, AlertCircle,
  Home, Zap, Star, Clock, ChevronRight
} from 'lucide-react';

const PamojaDashboard = () => {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [activeRequests, setActiveRequests] = useState(3);
  const [communityScore, setCommunityScore] = useState(85);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
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

  const quickActions = [
    { icon: <Heart className="icon" />, label: "Offer Help", colorClass: "quick-action-green" },
    { icon: <Gift className="icon" />, label: "Share Resources", colorClass: "quick-action-blue" },
    { icon: <Calendar className="icon" />, label: "Create Event", colorClass: "quick-action-purple" },
    { icon: <MessageSquare className="icon" />, label: "Chat", colorClass: "quick-action-orange" }
  ];

  const communityStats = [
    { label: "Active Neighbors", value: "24", icon: <Users className="icon" />, trend: "+3" },
    { label: "Mutual Aid Actions", value: "47", icon: <Heart className="icon" />, trend: "+12" },
    { label: "Community Score", value: `${communityScore}%`, icon: <Star className="icon" />, trend: "+5%" }
  ];

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
      </div>
    </div>
  );
};

export default PamojaDashboard;
