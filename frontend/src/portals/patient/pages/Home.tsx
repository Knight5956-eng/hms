import React from 'react';
import { Plus, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlucoseValue } from '../../../components/domain/GlucoseValue';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export const PatientHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text">Good morning, Amina</h1>
        <p className="text-xs text-text-muted mt-1">Here is your daily glycemic summary</p>
      </div>

      <Card className="flex flex-col gap-4 bg-surface border-primary/20">
        <span className="text-xs font-semibold text-text-muted uppercase">Last Reading</span>
        <GlucoseValue valueInMmol={6.8} />
        <span className="text-xs text-text-muted">Today 07:45 · Fasting</span>
      </Card>

      <Button size="lg" className="w-full py-4 text-base font-bold" onClick={() => navigate('/patient/log-glucose')}>
        <Plus className="w-5 h-5 mr-2" /> Log Glucose
      </Button>

      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col gap-1">
          <span className="text-xs text-text-muted font-medium">HbA1c</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-text">7.4%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> 0.3
            </span>
          </div>
        </Card>

        <Card className="flex flex-col gap-1">
          <span className="text-xs text-text-muted font-medium">Next Dose</span>
          <span className="text-sm font-bold text-text">Metformin</span>
          <span className="text-xs text-text-muted">Today at 8:00 PM</span>
        </Card>
      </div>
    </div>
  );
};
