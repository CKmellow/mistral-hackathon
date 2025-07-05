import React from 'react';
import {
  BookOpen, Hammer, Code2, HeartHandshake, Plus, Home,
  Search, User, Settings
} from 'lucide-react';

const resources = [
  {
    title: 'Intro to Web Development',
    type: 'Course',
    description: 'FreeCodeCamp beginner-friendly HTML, CSS, JS course.',
    tags: ['web', 'coding'],
    link: 'https://www.freecodecamp.org',
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Mental Health Toolkit',
    type: 'Guide',
    description: 'Practical tips to support mental wellbeing in communities.',
    tags: ['wellbeing', 'health'],
    link: '#',
    color: 'from-pink-500 to-red-500',
  },
  {
    title: 'Basic Plumbing PDF',
    type: 'Download',
    description: 'Step-by-step illustrated plumbing manual.',
    tags: ['hands-on', 'DIY'],
    link: '#',
    color: 'from-green-500 to-emerald-500',
  },
];

const skills = [
  { name: 'Coding', icon: <Code2 className="w-5 h-5 text-white" />, color: 'from-blue-500 to-cyan-500' },
  { name: 'Crafts & Repairs', icon: <Hammer className="w-5 h-5 text-white" />, color: 'from-orange-500 to-yellow-400' },
  { name: 'Community Support', icon: <HeartHandshake className="w-5 h-5 text-white" />, color: 'from-pink-500 to-red-500' },
];

const ResourcesAndSkills = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative flex flex-col overflow-hidden">

      {/* Header */}
      <header className="pt-10 pb-6 text-center px-4">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <BookOpen className="w-6 h-6 text-orange-400" />
          <h1 className="text-3xl font-extrabold tracking-tight">Resources & Skills</h1>
        </div>
        <p className="text-sm text-gray-300 max-w-md mx-auto">Empowering community members with tools and knowledge.</p>
      </header>

      {/* Skills Section */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-orange-300">Skills Offered</h2>
        <div className="grid grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`rounded-xl bg-gradient-to-br ${skill.color} p-4 flex flex-col items-center justify-center text-center shadow-lg`}
            >
              <div className="mb-2">{skill.icon}</div>
              <p className="text-sm font-medium">{skill.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section className="px-4 mb-32">
        <h2 className="text-lg font-semibold mb-3 text-orange-300">Top Resources</h2>
        <div className="grid gap-4">
          {resources.map((res, index) => (
            <a
              key={index}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-2xl bg-gradient-to-br ${res.color} p-4 shadow-xl transition-transform hover:scale-[1.02] active:scale-95`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold">{res.title}</h3>
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full text-white">{res.type}</span>
              </div>
              <p className="text-sm text-white/80 mb-2">{res.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {res.tags.map((tag, i) => (
                  <span key={i} className="bg-white/20 px-2 py-0.5 rounded-full text-white/80">
                    #{tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-5 bg-gradient-to-br from-orange-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50">
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 text-white px-6 py-3 flex justify-between items-center text-sm z-40">
        <button className="flex flex-col items-center space-y-1 text-gray-300">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-orange-400">
          <BookOpen className="w-5 h-5" />
          <span>Resources</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-300">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-300">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </nav>

      {/* Blurry Glows */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full animate-pulse delay-1000" />
    </div>
  );
};

export default ResourcesAndSkills;
