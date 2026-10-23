import React from 'react';
import { MedicationCard } from '../../../components/domain/MedicationCard';

export const PatientMedications: React.FC = () => {
  const mockMedications = [
    { id: '1', patientId: 'p1', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily with meals', quantityDispensed: 60, startDate: '2024-01-01' },
    { id: '2', patientId: 'p1', name: 'Glimepiride', dosage: '2mg', frequency: 'Once daily before breakfast', quantityDispensed: 30, startDate: '2024-01-01' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text">My Medications</h1>
        <p className="text-xs text-text-muted mt-1">Current prescription schedule</p>
      </div>

      <div className="flex flex-col gap-3">
        {mockMedications.map((med) => (
          <MedicationCard key={med.id} medication={med} onRequestRefill={() => alert('Refill requested!')} />
        ))}
      </div>
    </div>
  );
};
