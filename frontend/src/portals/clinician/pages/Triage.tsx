import React from 'react';
import { Card } from '../../../components/ui/Card';
import { RiskBadge } from '../../../components/domain/RiskBadge';
import { RiskTier } from '../../../types';

export const ClinicianTriage: React.FC = () => {
  const mockCohort = [
    { name: 'J. Mwangi', hba1c: '10.2%', inRange: '38%', lastLog: '3 days ago', tier: RiskTier.CRITICAL, reason: 'HbA1c >= 10.0%' },
    { name: 'A. Njeru', hba1c: '7.9%', inRange: '55%', lastLog: 'Today', tier: RiskTier.HIGH, reason: 'Trend Rising' },
    { name: 'M. Wambui', hba1c: '6.8%', inRange: '82%', lastLog: 'Today', tier: RiskTier.LOW, reason: 'Stable' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Clinical Triage Cohort</h1>
          <p className="text-xs text-text-muted mt-1">Risk-stratified cohort for Embu Level 5 Hospital</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50/50">
          <span className="text-xs font-bold text-red-700 uppercase">Critical</span>
          <span className="text-3xl font-black text-red-800 mt-1">3</span>
        </Card>
        <Card className="border-amber-200 bg-amber-50/50">
          <span className="text-xs font-bold text-amber-700 uppercase">High</span>
          <span className="text-3xl font-black text-amber-800 mt-1">12</span>
        </Card>
        <Card className="border-blue-200 bg-blue-50/50">
          <span className="text-xs font-bold text-blue-700 uppercase">Moderate</span>
          <span className="text-3xl font-black text-blue-800 mt-1">31</span>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50/50">
          <span className="text-xs font-bold text-emerald-700 uppercase">Low</span>
          <span className="text-3xl font-black text-emerald-800 mt-1">104</span>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-hover border-b border-border text-xs font-semibold text-text-muted uppercase">
            <tr>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Risk Tier</th>
              <th className="px-6 py-3">HbA1c</th>
              <th className="px-6 py-3">In Range (14d)</th>
              <th className="px-6 py-3">Last Log</th>
              <th className="px-6 py-3">Trigger Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockCohort.map((item, i) => (
              <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                <td className="px-6 py-4 font-bold text-text">{item.name}</td>
                <td className="px-6 py-4"><RiskBadge tier={item.tier} /></td>
                <td className="px-6 py-4 font-semibold">{item.hba1c}</td>
                <td className="px-6 py-4">{item.inRange}</td>
                <td className="px-6 py-4 text-xs text-text-muted">{item.lastLog}</td>
                <td className="px-6 py-4 text-xs font-medium text-text-muted">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
