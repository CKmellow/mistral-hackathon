import React from 'react';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 to-purple-700 p-8 text-gray-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-8">

        {/* Privacy & Guidelines */}
        <div className="bg-white/90 border border-purple-200 rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-purple-700">Privacy & Guidelines</h2>
          <p className="text-gray-600">Manage privacy settings and community standards.</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-purple-100 rounded-lg">
              <span className="font-medium">Profile Visibility</span>
              <select className="p-2 rounded bg-purple-50 text-purple-700">
                <option>Public</option>
                <option>Community Only</option>
                <option>Private</option>
              </select>
            </div>
            <div className="flex justify-between items-center p-3 border border-purple-100 rounded-lg">
              <span className="font-medium">Contact Information</span>
              <select className="p-2 rounded bg-purple-50 text-purple-700">
                <option>Everyone</option>
                <option>Community Members</option>
                <option>No One</option>
              </select>
            </div>
            <div className="flex justify-between items-center p-3 border border-purple-100 rounded-lg">
              <span className="font-medium">Location Sharing</span>
              <input type="checkbox" defaultChecked className="form-checkbox text-purple-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-green-800 font-medium">Respectful Communication</span>
            </div>
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <EyeIcon className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-blue-800 font-medium">Privacy Respect</span>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3" />
              <span className="text-yellow-800 font-medium">No Harassment</span>
            </div>
          </div>
          <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold">
            Update Guidelines
          </button>
        </div>

        {/* Community Health */}
        <div className="bg-white/90 border border-purple-200 rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-purple-700">Community Health</h2>
          <p className="text-gray-600">Monitor community engagement and well-being.</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-purple-100 rounded-lg">
              <span className="font-medium">Active Members</span>
              <span className="text-green-600 font-bold">247</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-purple-100 rounded-lg">
              <span className="font-medium">Engagement Rate</span>
              <span className="text-blue-600 font-bold">78%</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-purple-100 rounded-lg">
              <span className="font-medium">Community Sentiment</span>
              <span className="text-purple-600 font-bold">92%</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-3 border border-purple-100 rounded-lg">
              <UserGroupIcon className="h-5 w-5 text-purple-600 mr-3" />
              <span className="font-medium">New member joined: Sarah Johnson</span>
            </div>
            <div className="flex items-center p-3 border border-green-100 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3" />
              <span className="font-medium">Event completed: Community Garden Day</span>
            </div>
            <div className="flex items-center p-3 border border-blue-100 rounded-lg">
              <ChartBarIcon className="h-5 w-5 text-blue-600 mr-3" />
              <span className="font-medium">Resource shared: Mike (gardening tools)</span>
            </div>
          </div>
        </div>

        {/* Analytics & Insights */}
        <div className="bg-white/90 border border-purple-200 rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-purple-700">Analytics & Insights</h2>
          <p className="text-gray-600">Data-driven insights about community engagement.</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <span>Daily Active Users</span>
                <span className="text-purple-600 font-semibold">89</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Weekly Posts</span>
                <span className="text-green-600 font-semibold">45</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Event Participation</span>
                <span className="text-blue-600 font-semibold">67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Resource Utilization</span>
                <span className="text-orange-600 font-semibold">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between bg-purple-50 p-2 rounded-lg">
              <span className="font-medium">Gardening</span>
              <span className="text-purple-600 font-semibold">34%</span>
            </div>
            <div className="flex justify-between bg-green-50 p-2 rounded-lg">
              <span className="font-medium">Cooking</span>
              <span className="text-green-600 font-semibold">28%</span>
            </div>
            <div className="flex justify-between bg-blue-50 p-2 rounded-lg">
              <span className="font-medium">DIY & Crafts</span>
              <span className="text-blue-600 font-semibold">22%</span>
            </div>
            <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
              <span className="font-medium">Technology</span>
              <span className="text-yellow-600 font-semibold">16%</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white/90 border border-purple-200 rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-purple-700">Settings</h2>
          <p className="text-gray-600">Configure community preferences and notifications.</p>
          <div className="space-y-3">
            <div>
              <label className="block font-medium mb-1">Default Language</label>
              <select className="w-full p-2 rounded bg-purple-50 text-purple-700">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Time Zone</label>
              <select className="w-full p-2 rounded bg-purple-50 text-purple-700">
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-6 (Central Time)</option>
                <option>UTC-7 (Mountain Time)</option>
                <option>UTC-8 (Pacific Time)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Event Reminder Time</label>
              <select className="w-full p-2 rounded bg-purple-50 text-purple-700">
                <option>1 hour before</option>
                <option>2 hours before</option>
                <option>1 day before</option>
                <option>2 days before</option>
              </select>
            </div>
          </div>
          <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
