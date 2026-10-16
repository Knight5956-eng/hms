import React from 'react';
import { Card } from '../../../components/ui/Card';
import { GlucoseChart } from '../../../components/charts/GlucoseChart';

export const ClinicianPatientDetail: React.FC = () => {
  const mockReadings = [
    { id: '1', patientId: 'p1', value: 6.8, context: 'FASTING' as any, measuredAt: '2024-02-14T07:45:00Z' },
    { id: '2', patientId: 'p1', value: 8.5, context: 'AFTER_MEAL' as any, measuredAt: '2024-02-14T13:00:00Z' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Patient Detail: Amina Kamau</h1>

      <Card>
        <h3 className="text-sm font-bold text-text mb-4">Glucose Timeline (Last 14 Days)</h3>
        <GlucoseChart readings={mockReadings} />
      </Card>
    </div>
  );
};
