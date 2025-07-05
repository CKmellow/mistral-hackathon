import React from 'react';

const ResourceSkillPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 to-purple-700 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Resource & Skill Management</h1>
          <p className="text-purple-100 mt-2 text-sm md:text-base">
            Discover, share, and connect with your community's skills and resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills Directory */}
          <div className="bg-white/90 backdrop-blur p-6 rounded-lg shadow border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Skills Directory</h2>
            <p className="text-sm text-gray-600 mb-4">Browse and connect with members based on their skills.</p>
            <div className="space-y-3 mb-4">
              {['Web Development', 'Graphic Design', 'Cooking'].map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-purple-50 rounded">
                  <span className="font-medium">{skill}</span>
                  <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">{10 + idx * 3} members</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter your skill" className="flex-1 px-3 py-2 rounded-md border focus:ring-2 focus:ring-purple-400" />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">Add Skill</button>
            </div>
          </div>

          {/* Resource Sharing */}
          <div className="bg-white/90 backdrop-blur p-6 rounded-lg shadow border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Resource Sharing</h2>
            <p className="text-sm text-gray-600 mb-4">Share and discover resources available in your community.</p>
            <div className="space-y-3 mb-4">
              {[
                ['Community Garden Tools', 'Available', 'green'],
                ['Meeting Room Space', 'Available', 'green'],
                ['Library Books', 'Limited', 'yellow'],
              ].map(([name, status, color], idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 border border-${color}-100 rounded-lg`}>
                  <span className="font-medium">{name}</span>
                  <span className={`text-sm text-${color}-600 bg-${color}-100 px-2 py-1 rounded`}>{status}</span>
                </div>
              ))}
            </div>
            <form className="space-y-3">
              <input type="text" placeholder="Resource name" className="w-full px-3 py-2 border rounded-md" />
              <textarea placeholder="Description" rows="2" className="w-full px-3 py-2 border rounded-md"></textarea>
              <select className="w-full px-3 py-2 border rounded-md">
                <option>Tools & Equipment</option>
                <option>Space & Venues</option>
                <option>Books & Media</option>
                <option>Other</option>
              </select>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">Share Resource</button>
            </form>
          </div>

          {/* Community Calendar */}
          <div className="bg-white/90 backdrop-blur p-6 rounded-lg shadow border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Community Calendar</h2>
            <p className="text-sm text-gray-600 mb-4">Stay updated with upcoming events and activities.</p>
            <div className="space-y-3 mb-4">
              {[
                ['Community Garden Day', 'Sat, Mar 15 • 9:00 AM', 'This Week', 'purple'],
                ['Skill Sharing Workshop', 'Wed, Mar 20 • 6:00 PM', 'Next Week', 'blue'],
                ['Monthly Community Meeting', 'Sun, Mar 24 • 2:00 PM', 'Planning', 'green'],
              ].map(([title, time, tag, color], idx) => (
                <div key={idx} className={`flex justify-between p-3 border border-${color}-100 rounded-lg`}>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-500">{time}</p>
                  </div>
                  <span className={`text-sm text-${color}-600 bg-${color}-100 px-2 py-1 rounded`}>{tag}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">Add Event</button>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white/90 backdrop-blur p-6 rounded-lg shadow border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Emergency Contacts</h2>
            <p className="text-sm text-gray-600 mb-4">Quick access to important community and emergency contacts.</p>
            <div className="space-y-3 mb-4">
              {[
                ['Emergency (911)', 'Call Now', 'red'],
                ['Poison Control', 'Call', 'orange'],
                ['Local Police', 'Call', 'blue'],
              ].map(([label, btnText, color], idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 bg-${color}-50 border border-${color}-200 rounded-lg`}>
                  <span className={`font-medium text-${color}-600`}>{label}</span>
                  <button className={`text-white bg-${color}-500 hover:bg-${color}-600 px-3 py-1 rounded-md text-sm`}>{btnText}</button>
                </div>
              ))}
            </div>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Contact Name" className="px-3 py-2 border rounded-md" />
              <input type="tel" placeholder="Phone Number" className="px-3 py-2 border rounded-md" />
              <select className="sm:col-span-2 px-3 py-2 border rounded-md">
                <option>Emergency Services</option>
                <option>Community Contact</option>
                <option>Medical</option>
                <option>Other</option>
              </select>
              <button className="sm:col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">Add Contact</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSkillPage;
