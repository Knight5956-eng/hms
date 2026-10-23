import React from 'react';
import { Card } from '../../../components/ui/Card';

export const SuperAdminPlatformAdmins: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Platform Admins</h1>
      <Card><p className="text-sm text-text-muted">Manage Super Admin accounts.</p></Card>
    </div>
  );
};
