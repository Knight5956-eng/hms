import React from 'react';
import { Card } from '../../../components/ui/Card';

export const ClinicianSchedule: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Clinical Schedule</h1>
      <Card>
        <p className="text-sm text-text-muted">No appointments scheduled for today.</p>
      </Card>
    </div>
  );
};
