import React from 'react';
import { Card } from '../../../components/ui/Card';

export const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Super Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Active Hospitals</span>
          <p className="text-3xl font-black mt-2">4</p>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Platform Admins</span>
          <p className="text-3xl font-black mt-2">2</p>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Total Users</span>
          <p className="text-3xl font-black mt-2">1,240</p>
        </Card>
      </div>
    </div>
  );
};
