// components/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Navbar } from './Navbar';
import { useSelector } from 'react-redux';

export const AdminProtectedRoute = () => {
  const { user } = useSelector(state => state.auth)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!user.isAdmin) {
    return <Navigate to="/feed" replace />
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};