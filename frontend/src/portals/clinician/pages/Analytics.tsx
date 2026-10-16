import React from 'react';
import { Card } from '../../../components/ui/Card';

export const ClinicianAnalytics: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Glycemic Analytics</h1>
      <Card>
        <p className="text-sm text-text-muted">Cohort longitudinal glycemic trends overview.</p>
      </Card>
    </div>
  );
};
