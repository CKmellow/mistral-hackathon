import React from 'react';
import { Users, MapPin, Plus, Sparkles } from 'lucide-react';

const communities = [
  {
    name: 'Nairobi Tech Circle',
    location: 'Nairobi, Kenya',
    members: 320,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Mtaa Women Collective',
    location: 'Kibera, Nairobi',
    members: 145,
    gradient: 'from-pink-500 to-red-500'
  },
  {
    name: 'Green Youth Alliance',
    location: 'Thika, Kenya',
    members: 215,
    gradient: 'from-green-500 to-emerald-500'
  },
];

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 text-white relative overflow-hidden">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="mb-4 flex justify-center items-center space-x-2">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md">
            Pamoja Communities
          </h1>
        </div>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          Discover and join local communities aligned with your values. Powered by Ubuntu and AI.
        </p>
      </header>

      {/* Search + Filter */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search communities..."
            className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 backdrop-blur-md"
          />
          <select className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md">
            <option>All Locations</option>
            <option>Nairobi</option>
            <option>Kisumu</option>
            <option>Mombasa</option>
          </select>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Create New Community */}
        <div className="bg-white/10 border border-dashed border-white/20 rounded-3xl p-6 flex flex-col items-center justify-center hover:bg-white/20 transition-all shadow-lg cursor-pointer text-center backdrop-blur-lg">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 rounded-full shadow-md mb-4">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold">Start a Community</h3>
          <p className="text-sm text-gray-300 mt-1">Bring people together with a shared vision.</p>
        </div>

        {/* Community Cards */}
        {communities.map((community, i) => (
          <div
            key={i}
            className={`rounded-3xl p-6 bg-gradient-to-br ${community.gradient} shadow-xl text-white backdrop-blur-xl border border-white/20 hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{community.name}</h2>
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm text-white/90 mb-2">{community.location}</p>
            <div className="flex items-center text-sm gap-2">
              <MapPin className="w-4 h-4" />
              <span>{community.members} members</span>
            </div>
          </div>
        ))}
      </div>

      {/* Background Glow */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-pink-500/10 blur-[80px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full animate-pulse delay-1000"></div>
    </div>
  );
};

export default CommunityPage;
