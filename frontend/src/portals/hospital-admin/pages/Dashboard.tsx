import React from 'react';
import { Card } from '../../../components/ui/Card';

export const HospitalAdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Hospital Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Active Clinicians</span>
          <p className="text-3xl font-black mt-2">18</p>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Enrolled Patients</span>
          <p className="text-3xl font-black mt-2">350</p>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Pending Refills</span>
          <p className="text-3xl font-black mt-2">8</p>
        </Card>
      </div>
    </div>
  );
};
