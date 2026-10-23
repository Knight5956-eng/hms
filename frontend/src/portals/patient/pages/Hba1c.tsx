import React from 'react';
import { Hba1cTrendChart } from '../../../components/charts/Hba1cTrendChart';
import { Card } from '../../../components/ui/Card';

export const PatientHba1c: React.FC = () => {
  const mockResults = [
    { id: '1', patientId: 'p1', value: 8.2, resultDate: '2023-08-15' },
    { id: '2', patientId: 'p1', value: 7.7, resultDate: '2023-11-20' },
    { id: '3', patientId: 'p1', value: 7.4, resultDate: '2024-02-10' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text">HbA1c Trend</h1>
        <p className="text-xs text-text-muted mt-1">3-month average blood glucose percentage</p>
      </div>

      <Card className="p-4">
        <Hba1cTrendChart results={mockResults} />
      </Card>

      <Card className="flex flex-col gap-2 bg-primary/5 border-primary/20">
        <h4 className="text-sm font-bold text-primary">What this means</h4>
        <p className="text-xs text-text-muted">
          Your latest HbA1c is <strong>7.4%</strong>. Excellent progress! You are approaching your target of under 7.0%.
        </p>
      </Card>
    </div>
  );
};
