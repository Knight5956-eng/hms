import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Download } from 'lucide-react';

export const ClinicianExports: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Research CSV Exports</h1>
      <Card className="flex flex-col gap-3">
        <h3 className="text-base font-bold">Pseudonymised Research Dataset</h3>
        <p className="text-xs text-text-muted">
          Export longitudinal glycemic and clinical metrics for audit and research. All patient identifiers are pseudonymised.
        </p>
        <Button className="w-fit mt-2">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </Card>
    </div>
  );
};
