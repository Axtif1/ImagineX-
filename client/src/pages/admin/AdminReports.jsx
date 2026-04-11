import React from 'react';
import { Button } from '../../components/Button';
import { mockPosts } from '../../mockData'; // Using posts to mock reported content

export const AdminReports = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reported Content</h1>
      </div>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-950/50 text-zinc-300 uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Content</th>
              <th className="px-6 py-4 font-medium">Reported User</th>
              <th className="px-6 py-4 font-medium">Reason</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {mockPosts.slice(0, 3).map((post) => (
              <tr key={`report-${post.id}`} className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={post.image} alt="post" className="w-12 h-12 rounded object-cover" />
                    <span className="truncate max-w-[200px] text-xs leading-tight">{post.prompt}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-zinc-200">@{post.user.username}</td>
                <td className="px-6 py-4 text-red-400">Inappropriate Content</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="secondary" size="sm">Warn User</Button>
                  <Button variant="danger" size="sm" className="bg-red-900/40 text-red-400 hover:bg-red-900/60">Delete Post</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
