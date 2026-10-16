import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export const PatientRefills: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text">Prescription Refills</h1>
        <p className="text-xs text-text-muted mt-1">Embu Level 5 Pharmacy Queue</p>
      </div>

      <Card className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold">Metformin 500mg</h4>
          <p className="text-xs text-text-muted">Requested 2 days ago</p>
        </div>
        <Badge variant="warning">PENDING</Badge>
      </Card>
    </div>
  );
};
