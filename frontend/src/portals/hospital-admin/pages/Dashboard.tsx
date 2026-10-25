import React from 'react';
import { Card } from '../../../components/ui/Card';

export const HospitalAdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Hospital Operations Overview</h1>
        <p className="text-xs text-text-muted mt-1">Embu Level 5 Hospital operational statistics, staffing & inventory logistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Active Clinicians</span>
          <p className="text-3xl font-black mt-2 text-primary">18</p>
          <span className="text-[10px] text-text-muted mt-1">Doctors, Nurses, Educators</span>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Enrolled Patients</span>
          <p className="text-3xl font-black mt-2 text-blue-600">350</p>
          <span className="text-[10px] text-text-muted mt-1">Active diabetes care profiles</span>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Today's Consultations</span>
          <p className="text-3xl font-black mt-2 text-indigo-600">42</p>
          <span className="text-[10px] text-emerald-600 font-medium mt-1">14 completed · 28 scheduled</span>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Pending Refills</span>
          <p className="text-3xl font-black mt-2 text-amber-600">8</p>
          <span className="text-[10px] text-amber-600 font-medium mt-1">Requires pharmacy approval</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text border-b border-border pb-2">Pharmacy & Medical Supply Logistics</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-surface-hover rounded-lg">
              <span className="text-text-muted block">Glucose Test Strips</span>
              <span className="font-bold text-sm text-text">8,500 Units</span>
              <span className="text-[10px] text-emerald-600 block mt-1">Stock Level: 85% (Optimal)</span>
            </div>
            <div className="p-3 bg-surface-hover rounded-lg">
              <span className="text-text-muted block">Insulin Vials (Regular/NPH)</span>
              <span className="font-bold text-sm text-[#0052cc]">1,200 Vials</span>
              <span className="text-[10px] text-emerald-600 block mt-1">Stock Level: Cold Chain OK</span>
            </div>
            <div className="p-3 bg-surface-hover rounded-lg">
              <span className="text-text-muted block">Metformin 500mg Stock</span>
              <span className="font-bold text-sm text-text">14,000 Tabs</span>
              <span className="text-[10px] text-emerald-600 block mt-1">Stock Level: Sufficient</span>
            </div>
            <div className="p-3 bg-surface-hover rounded-lg">
              <span className="text-text-muted block">Glucometers Dispatched</span>
              <span className="font-bold text-sm text-text">320 Devices</span>
              <span className="text-[10px] text-blue-600 block mt-1">91% active sync status</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text border-b border-border pb-2">Clinic Operations & Capacity</h3>
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between items-center p-2.5 bg-surface-hover rounded-lg">
              <span className="font-medium text-text">Diabetic Clinic Room 1 (Dr. James)</span>
              <span className="font-bold text-emerald-600">12 Patients Seen Today</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-surface-hover rounded-lg">
              <span className="font-medium text-text">Diabetic Clinic Room 2 (Nurse Mary)</span>
              <span className="font-bold text-emerald-600">15 Patients Educated</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-surface-hover rounded-lg">
              <span className="font-medium text-text">Telemedicine Consultation Hub</span>
              <span className="font-bold text-blue-600">8 Virtual Calls Active</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-surface-hover rounded-lg">
              <span className="font-medium text-text">Pending Staff Invitations</span>
              <span className="font-bold text-amber-600">3 Invitations Pending</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
