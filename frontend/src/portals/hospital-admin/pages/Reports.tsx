import React from 'react';
import { Card } from '../../../components/ui/Card';

export const HospitalReports: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Operational Reports</h1>
      <Card><p className="text-sm text-text-muted">Hospital enrolment, active users, and refill volume.</p></Card>
    </div>
  );
};
