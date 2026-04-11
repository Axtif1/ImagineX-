import React from 'react';
import { Button } from '../../components/Button';
import { mockUsers } from '../../mockData';

export const AdminUsers = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
      </div>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-950/50 text-zinc-300 uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">User Info</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Followers</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-zinc-200">{user.name}</p>
                      <p className="text-xs text-zinc-500">@{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-800">Active</span>
                </td>
                <td className="px-6 py-4">{user.followers}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="secondary" size="sm">Block</Button>
                  <Button variant="danger" size="sm" className="bg-red-900/40 text-red-400 hover:bg-red-900/60">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
