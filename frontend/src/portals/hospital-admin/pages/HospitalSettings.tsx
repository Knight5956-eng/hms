import React from 'react';
import { Card } from '../../../components/ui/Card';

export const HospitalSettings: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Hospital Settings</h1>
      <Card><p className="text-sm text-text-muted">Configure hospital thresholds, pharmacy contact, and branding.</p></Card>
    </div>
  );
};
