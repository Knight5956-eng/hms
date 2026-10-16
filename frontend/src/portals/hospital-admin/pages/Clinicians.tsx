import React from 'react';
import { Card } from '../../../components/ui/Card';

export const HospitalClinicians: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Hospital Clinicians</h1>
      <Card><p className="text-sm text-text-muted">Manage hospital clinical staff.</p></Card>
    </div>
  );
};
