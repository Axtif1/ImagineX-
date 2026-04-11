import React from 'react';
import { Users, FileText, AlertTriangle } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn text-white">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-violet-600/20 p-4 rounded-lg text-violet-400">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold">1,248</p>
          </div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-blue-600/20 p-4 rounded-lg text-blue-400">
            <FileText className="h-8 w-8" />
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-medium">Total Posts</p>
            <p className="text-3xl font-bold">8,593</p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-red-600/20 p-4 rounded-lg text-red-400">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-medium">Pending Reports</p>
            <p className="text-3xl font-bold">24</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 h-64 flex items-center justify-center">
        <p className="text-zinc-500">Recent Activity Chart (Mock)</p>
      </div>
    </div>
  );
};
