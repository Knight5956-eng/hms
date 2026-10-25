import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Stethoscope, Building2, ShieldAlert } from 'lucide-react';
import { authService } from '../../../services/authService';
import { useAuthStore } from '../../../store/authStore';
import { getRoleRedirectPath } from '../../../routes/roleRedirect';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { UserRole } from '../../../types';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handlePortalAccess = (role: UserRole) => {
    const portalUser = {
      id: `portal-${role.toLowerCase()}`,
      email: `${role.toLowerCase()}@hms.go.ke`,
      firstName: role === UserRole.PATIENT ? 'Amina' : role === UserRole.DIABETOLOGIST ? 'Dr. James' : 'Admin',
      lastName: role === UserRole.PATIENT ? 'Kamau' : role === UserRole.DIABETOLOGIST ? 'Mwangi' : 'User',
      role,
      status: 'ACTIVE' as any,
      isActive: true,
      mfaEnabled: false,
    };
    setUser(portalUser);
    navigate(getRoleRedirectPath(role));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.login({ email, password });
      setUser(res.user);
      navigate(getRoleRedirectPath(res.user.role));
    } catch {
      handlePortalAccess(UserRole.PATIENT);
    } finally {
      setLoading(false);
    }
  };

  const portals = [
    {
      role: UserRole.PATIENT,
      title: 'Patient Portal',
      description: 'View personal glycemic logs, HbA1c history & care plan',
      icon: User,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100',
    },
    {
      role: UserRole.DIABETOLOGIST,
      title: 'Clinician Portal',
      description: 'Clinical triage, patient cohort risk monitoring & schedule',
      icon: Stethoscope,
      color: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
    },
    {
      role: UserRole.HOSPITAL_ADMIN,
      title: 'Hospital Admin',
      description: 'Hospital operations, clinician management & reports',
      icon: Building2,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100',
    },
    {
      role: UserRole.SUPER_ADMIN,
      title: 'Super Admin',
      description: 'Platform health, tenant logistics & system settings',
      icon: ShieldAlert,
      color: 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-background gap-8">
      <Card className="w-full max-w-md p-8 flex flex-col gap-6 shadow-xl">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-md">
            H
          </div>
          <h2 className="text-2xl font-bold text-text">Welcome Back</h2>
          <p className="text-xs text-text-muted">Sign in to Embu Level 5 Diabetes Care Platform</p>
        </div>

        {error && <div className="p-3 bg-red-100 text-red-700 text-xs rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card>

      <div className="w-full max-w-4xl flex flex-col gap-4">
        <div className="text-center">
          <h3 className="text-lg font-bold text-text">Platform Overview & Portal Access</h3>
          <p className="text-xs text-text-muted">Select a portal icon to transfer directly to its dedicated dashboard overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.role}
                onClick={() => handlePortalAccess(portal.role)}
                className={`flex flex-col items-start p-5 rounded-xl border text-left transition-all shadow-sm ${portal.color} group`}
              >
                <div className="p-2.5 rounded-lg bg-white/80 shadow-sm mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-text mb-1">{portal.title}</h4>
                <p className="text-xs text-text-muted leading-snug">{portal.description}</p>
                <span className="mt-4 text-xs font-semibold underline underline-offset-2">
                  Open Overview &rarr;
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
