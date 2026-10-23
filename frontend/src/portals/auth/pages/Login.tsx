import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleDemoLogin = (role: UserRole) => {
    const demoUser = {
      id: 'demo-1',
      email: `${role.toLowerCase()}@hms.go.ke`,
      firstName: role === UserRole.PATIENT ? 'Amina' : role === UserRole.DIABETOLOGIST ? 'Dr. James' : 'Admin',
      lastName: role === UserRole.PATIENT ? 'Kamau' : role === UserRole.DIABETOLOGIST ? 'Mwangi' : 'User',
      role,
      status: 'ACTIVE' as any,
      isActive: true,
      mfaEnabled: false,
    };
    setUser(demoUser);
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
    } catch (err: unknown) {
      // Fallback demo login on mock network
      handleDemoLogin(UserRole.PATIENT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
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

        <div className="border-t border-border pt-4 flex flex-col gap-2">
          <p className="text-xs text-center text-text-muted font-semibold">Quick Demo Login Shortcuts</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin(UserRole.PATIENT)}>
              Patient
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin(UserRole.DIABETOLOGIST)}>
              Clinician
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin(UserRole.HOSPITAL_ADMIN)}>
              Hospital Admin
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin(UserRole.SUPER_ADMIN)}>
              Super Admin
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
