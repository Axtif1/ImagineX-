import React, { useState, useEffect } from 'react';
import { MasonryGrid } from '../components/MasonryGrid';
import { mockPosts } from '../mockData';

export const FeedPage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6 animate-fadeIn">For You</h1>
            <MasonryGrid posts={posts} loading={loading} />
          </div>
        </main>
      </div>
    </div>
  );
};
