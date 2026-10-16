import React from 'react';
import { Card } from '../../../components/ui/Card';
import { SearchField } from '../../../components/ui/SearchField';

export const ClinicianPatientList: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Assigned Patients</h1>
          <p className="text-xs text-text-muted mt-1">Type 2 diabetes cohort at Embu Level 5</p>
        </div>
        <div className="w-64">
          <SearchField placeholder="Search patient name or MRN..." />
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-hover border-b border-border text-xs font-semibold text-text-muted uppercase">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">MRN</th>
              <th className="px-6 py-3">Latest Glucose</th>
              <th className="px-6 py-3">HbA1c</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-surface-hover/50">
              <td className="px-6 py-4 font-bold">Amina Kamau</td>
              <td className="px-6 py-4 text-xs text-text-muted">EMB-8821</td>
              <td className="px-6 py-4 font-semibold text-emerald-600">6.8 mmol/L</td>
              <td className="px-6 py-4 font-semibold">7.4%</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};
