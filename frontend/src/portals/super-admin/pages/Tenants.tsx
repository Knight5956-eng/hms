import React from 'react';
import { Card } from '../../../components/ui/Card';

export const SuperAdminTenants: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Tenants (Hospitals)</h1>
      <Card><p className="text-sm text-text-muted">Platform tenant management.</p></Card>
    </div>
  );
};
