import React from 'react';
import { Card } from '../../../components/ui/Card';

export const HospitalInvitations: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Onboarding Invitations</h1>
      <Card><p className="text-sm text-text-muted">Invite clinicians and patients via email or SMS.</p></Card>
    </div>
  );
};
