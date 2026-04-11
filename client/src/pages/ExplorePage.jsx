import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { MasonryGrid } from '../components/MasonryGrid';
import { mockPosts, mockTrendingTags } from '../mockData';

export const ExplorePage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      // shuffle for explore feel
      const shuffled = [...mockPosts].sort(() => 0.5 - Math.random());
      setPosts(shuffled);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="max-w-3xl mx-auto mb-12 text-center mt-8 animate-fadeIn">
              <h1 className="text-4xl font-extrabold text-white mb-6">Explore Inspiration</h1>
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for styles, subjects, or creators..." 
                  className="w-full h-14 bg-zinc-900 border border-zinc-700/80 rounded-full pl-12 pr-6 text-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-xl transition-all hover:border-zinc-600"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {mockTrendingTags.map(tag => (
                  <button key={tag} className="px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700 text-sm text-zinc-300 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <MasonryGrid posts={posts} loading={loading} />
          </div>
        </main>
      </div>
    </div>
  );
};
