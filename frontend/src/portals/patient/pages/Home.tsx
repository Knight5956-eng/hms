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
          <span className="text-xs text-text-muted font-medium">HbA1c Level</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-text">7.4%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> 0.3%
            </span>
          </div>
          <span className="text-[10px] text-text-muted mt-1">Target: &lt; 7.0%</span>
        </Card>

        <Card className="flex flex-col gap-1">
          <span className="text-xs text-text-muted font-medium">Next Dose</span>
          <span className="text-sm font-bold text-text">Metformin 500mg</span>
          <span className="text-xs text-text-muted">Today at 8:00 PM</span>
        </Card>
      </div>

      <Card className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-text">Personal Care Plan & Next Appointment</h3>
        <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg text-xs">
          <div>
            <p className="font-semibold text-text">Follow-up with Dr. James Mwangi</p>
            <p className="text-text-muted">Embu Level 5 Clinic · Room 12</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => navigate('/patient/appointments')}>
            View Details
          </Button>
        </div>
      </Card>
    </div>
  );
};
