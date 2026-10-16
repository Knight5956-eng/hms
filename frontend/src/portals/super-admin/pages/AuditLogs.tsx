import React from 'react';
import { Card } from '../../../components/ui/Card';

export const SuperAdminAuditLogs: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Platform Audit Logs</h1>
      <Card><p className="text-sm text-text-muted">Cross-tenant administrative audit logs.</p></Card>
    </div>
  );
};
