import React from 'react';
import { Card } from '../../../components/ui/Card';

export const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Super Admin Platform Overview</h1>
        <p className="text-xs text-text-muted mt-1">Global platform logistics, multi-tenant health & system statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Active Hospitals</span>
          <p className="text-3xl font-black mt-2 text-primary">4</p>
          <span className="text-[10px] text-text-muted mt-1">Multi-tenant instances</span>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Platform Admins</span>
          <p className="text-3xl font-black mt-2 text-indigo-600">2</p>
          <span className="text-[10px] text-text-muted mt-1">Global access level</span>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">Total Users</span>
          <p className="text-3xl font-black mt-2 text-emerald-600">1,240</p>
          <span className="text-[10px] text-text-muted mt-1">Patients & Clinicians</span>
        </Card>
        <Card>
          <span className="text-xs text-text-muted font-bold uppercase">System Uptime</span>
          <p className="text-3xl font-black mt-2 text-blue-600">99.98%</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1">● Operational</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text border-b border-border pb-2">Platform Infrastructure & Database Logistics</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-surface-hover rounded-lg">
              <span className="text-text-muted block">Database Provisioning</span>
              <span className="font-bold text-sm text-text">Neon PostgreSQL</span>
              <span className="text-[10px] text-emerald-600 block mt-1">4 Isolated Schemas</span>
            </div>
            <div className="p-3 bg-surface-hover rounded-lg">
              <span className="text-text-muted block">Redis Caching & Queue</span>
              <span className="font-bold text-sm text-text">BullMQ Worker Pool</span>
              <span className="text-[10px] text-blue-600 block mt-1">12 Jobs Active</span>
            </div>
            <div className="p-3 bg-surface-hover rounded-lg">
              <span className="text-text-muted block">Cloud Storage</span>
              <span className="font-bold text-sm text-text">Cloudflare Assets</span>
              <span className="text-[10px] text-text-muted block mt-1">2.4 GB / 100 GB</span>
            </div>
            <div className="p-3 bg-surface-hover rounded-lg">
              <span className="text-text-muted block">Realtime WebRTC</span>
              <span className="font-bold text-sm text-text">Coturn Relay</span>
              <span className="text-[10px] text-emerald-600 block mt-1">Latency &lt; 45ms</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text border-b border-border pb-2">System Audit & Traffic Logistics</h3>
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex justify-between items-center p-2.5 bg-surface-hover rounded-lg">
              <span className="font-medium text-text">Embu Level 5 Hospital</span>
              <span className="font-bold text-emerald-600">350 Patients · Active</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-surface-hover rounded-lg">
              <span className="font-medium text-text">Meru Level 5 Hospital</span>
              <span className="font-bold text-emerald-600">410 Patients · Active</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-surface-hover rounded-lg">
              <span className="font-medium text-text">Machakos Level 5 Hospital</span>
              <span className="font-bold text-emerald-600">280 Patients · Active</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-surface-hover rounded-lg">
              <span className="font-medium text-text">Garissa Level 5 Hospital</span>
              <span className="font-bold text-emerald-600">200 Patients · Active</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
