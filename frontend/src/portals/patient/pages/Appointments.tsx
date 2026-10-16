import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PatientAppointments: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text">Upcoming Appointments</h1>
        <p className="text-xs text-text-muted mt-1">Virtual and in-person visits</p>
      </div>

      <Card className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold">Virtual Consultation</h4>
          <p className="text-xs text-text-muted">Dr. Mwangi · Diabetologist</p>
          <p className="text-xs font-semibold text-primary mt-1">Thursday, 10:30 AM</p>
        </div>
        <Button size="sm" onClick={() => navigate('/patient/call/session-123')}>
          <Video className="w-4 h-4 mr-1" /> Join Call
        </Button>
      </Card>
    </div>
  );
};
