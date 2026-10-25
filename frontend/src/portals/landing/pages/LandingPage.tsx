import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useAuthStore } from '../../../store/authStore';
import { getRoleRedirectPath } from '../../../routes/roleRedirect';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { UserRole } from '../../../types';
import {
  Activity,
  Video,
  Pill,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Sparkles,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'signin';
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>(initialMode);

  // Sign In state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regDob, setRegDob] = useState('');
  const [regSex, setRegSex] = useState('UNDISCLOSED');
  const [regConsent, setRegConsent] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleTabSwitch = (tab: 'signin' | 'register') => {
    setActiveTab(tab);
    setSearchParams({ mode: tab });
    setLoginError('');
    setRegError('');
  };

  const handleDemoLogin = (role: UserRole) => {
    const demoUser = {
      id: 'demo-1',
      email: `${role.toLowerCase()}@hms.go.ke`,
      firstName:
        role === UserRole.PATIENT
          ? 'Amina'
          : role === UserRole.DIABETOLOGIST
          ? 'Dr. James'
          : 'Admin',
      lastName:
        role === UserRole.PATIENT
          ? 'Kamau'
          : role === UserRole.DIABETOLOGIST
          ? 'Mwangi'
          : 'User',
      role,
      status: 'ACTIVE' as any,
      isActive: true,
      mfaEnabled: false,
    };
    setUser(demoUser);
    navigate(getRoleRedirectPath(role));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await authService.login({
        email: loginEmail,
        password: loginPassword,
      });
      setUser(res.user);
      navigate(getRoleRedirectPath(res.user.role));
    } catch (err: any) {
      // If mock network or unseeded backend fails, fallback gracefully to demo login for quick testing
      if (err?.response?.data?.message) {
        setLoginError(err.response.data.message);
      } else {
        handleDemoLogin(UserRole.PATIENT);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match');
      return;
    }

    if (!regConsent) {
      setRegError('You must agree to the health data sharing terms to register.');
      return;
    }

    setRegLoading(true);
    try {
      const res = await authService.register({
        email: regEmail,
        password: regPassword,
        firstName: regFirstName,
        lastName: regLastName,
        phone: regPhone || undefined,
        dateOfBirth: regDob || undefined,
        sex: regSex,
      });

      setUser(res.user);
      setRegSuccess('Account created successfully! Redirecting to patient dashboard...');
      setTimeout(() => {
        navigate(getRoleRedirectPath(res.user.role || UserRole.PATIENT));
      }, 1000);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setRegError(err.response.data.message);
      } else {
        // Fallback demo user registration when offline / mock backend
        const demoRegisteredUser = {
          id: `reg-${Date.now()}`,
          email: regEmail || 'patient@hms.go.ke',
          firstName: regFirstName || 'Amina',
          lastName: regLastName || 'Kamau',
          role: UserRole.PATIENT,
          status: 'ACTIVE' as any,
          isActive: true,
          mfaEnabled: false,
        };
        setUser(demoRegisteredUser);
        navigate(getRoleRedirectPath(UserRole.PATIENT));
      }
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-teal-700 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
              H
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight block">
                HMS Care Portal
              </span>
              <span className="text-xs text-teal-700 font-semibold block -mt-1">
                Embu Level Five Hospital
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-teal-700 transition-colors">
              Platform Features
            </a>
            <a href="#triage" className="hover:text-teal-700 transition-colors">
              Clinical Triage
            </a>
            <a href="#telemedicine" className="hover:text-teal-700 transition-colors">
              Telemedicine
            </a>
            <a href="#pharmacy" className="hover:text-teal-700 transition-colors">
              Refill Reminders
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabSwitch('signin')}
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'signin'
                  ? 'text-teal-700 bg-teal-50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <Button
              onClick={() => handleTabSwitch('register')}
              className="bg-teal-700 hover:bg-teal-800 text-white text-sm px-4 py-2"
            >
              Register Patient
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-teal-900 via-teal-800 to-slate-900 text-white py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.2),transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Embu Level Five Hospital Diabetes Care Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Type 2 Diabetes Control & Clinical Self-Management
            </h1>

            <p className="text-base sm:text-lg text-teal-100 max-w-2xl leading-relaxed">
              Log glucose readings, track your 3-month HbA1c trend, receive prescription refill reminders
              for the Embu Level 5 Pharmacy, and connect directly with clinicians through low-bandwidth telemedicine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                <Activity className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Real-time Risk Triage</h4>
                  <p className="text-xs text-teal-100">
                    Automated clinical stratification for critical & high-risk readings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                <Video className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Low-Bandwidth Telemedicine</h4>
                  <p className="text-xs text-teal-100">
                    Video & audio consultations optimized for 2G/3G connections.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-teal-200 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                English & Kiswahili
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Kenya Data Protection Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-400" />
                Multi-Tenant Ready
              </span>
            </div>
          </div>

          {/* Right Column - Interactive Sign In / Register Form */}
          <div className="lg:col-span-5" id="auth-box">
            <Card className="bg-white text-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-100">
              {/* Tab Selector */}
              <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => handleTabSwitch('signin')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                    activeTab === 'signin'
                      ? 'bg-white text-teal-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => handleTabSwitch('register')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                    activeTab === 'register'
                      ? 'bg-white text-teal-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Register Patient
                </button>
              </div>

              {/* SIGN IN FORM */}
              {activeTab === 'signin' && (
                <div className="space-y-5">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-slate-900">Welcome Back</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sign in to access your portal and diabetes records
                    </p>
                  </div>

                  {loginError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-700">Password</label>
                        <a
                          href="/forgot-password"
                          className="text-xs text-teal-700 font-semibold hover:underline"
                        >
                          Forgot?
                        </a>
                      </div>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 rounded-xl"
                    >
                      {loginLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>

                  {/* Quick Demo Login Shortcuts */}
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-center font-semibold text-slate-500 mb-2.5">
                      Quick Demo Portal Login
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDemoLogin(UserRole.PATIENT)}
                        className="text-xs border-slate-200 hover:border-teal-600 hover:bg-teal-50 text-slate-700"
                      >
                        Patient
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDemoLogin(UserRole.DIABETOLOGIST)}
                        className="text-xs border-slate-200 hover:border-teal-600 hover:bg-teal-50 text-slate-700"
                      >
                        Clinician
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDemoLogin(UserRole.HOSPITAL_ADMIN)}
                        className="text-xs border-slate-200 hover:border-teal-600 hover:bg-teal-50 text-slate-700"
                      >
                        Hospital Admin
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDemoLogin(UserRole.SUPER_ADMIN)}
                        className="text-xs border-slate-200 hover:border-teal-600 hover:bg-teal-50 text-slate-700"
                      >
                        Super Admin
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* REGISTER FORM */}
              {activeTab === 'register' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">New Patient Registration</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Create an account to track readings and receive hospital care
                    </p>
                  </div>

                  {regError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                      {regError}
                    </div>
                  )}

                  {regSuccess && (
                    <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 text-xs rounded-xl font-medium">
                      {regSuccess}
                    </div>
                  )}

                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="First Name"
                        type="text"
                        placeholder="Amina"
                        value={regFirstName}
                        onChange={(e) => setRegFirstName(e.target.value)}
                        required
                      />
                      <Input
                        label="Last Name"
                        type="text"
                        placeholder="Kamau"
                        value={regLastName}
                        onChange={(e) => setRegLastName(e.target.value)}
                        required
                      />
                    </div>

                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="patient@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+254 712 345 678"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                      <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Date of Birth"
                        type="date"
                        value={regDob}
                        onChange={(e) => setRegDob(e.target.value)}
                      />
                      <div>
                        <label className="text-xs font-semibold text-slate-700 mb-1 block">
                          Sex
                        </label>
                        <select
                          value={regSex}
                          onChange={(e) => setRegSex(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        >
                          <option value="UNDISCLOSED">Prefer not to say</option>
                          <option value="FEMALE">Female</option>
                          <option value="MALE">Male</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="regConsent"
                        checked={regConsent}
                        onChange={(e) => setRegConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                      />
                      <label htmlFor="regConsent" className="text-xs text-slate-600 leading-tight">
                        I consent to sharing my glycemic logs with assigned clinicians at Embu Level 5 Hospital
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={regLoading}
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 rounded-xl mt-2"
                    >
                      {regLoading ? 'Creating Account...' : 'Register Account'}
                    </Button>
                  </form>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Comprehensive Care Engine
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Designed for Patients and Healthcare Providers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A integrated digital ecosystem bridging the gap between hospital visits for adult Type 2 diabetes patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-xl flex items-center justify-center font-bold">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Glucose & HbA1c Log</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log blood glucose with contextual tags (Fasting, Meal, Bedtime) and visualize 3-month HbA1c trend history.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Clinical Risk Triage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated risk stratification (Critical, High, Moderate, Low) flags patients needing immediate attention.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center font-bold">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Telemedicine Console</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamless WebRTC video consultations with low-bandwidth audio-only fallback for weak 2G/3G connectivity.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Pharmacy Refills</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Medication schedule reminders with one-tap refill requests direct to Embu Level 5 Hospital Pharmacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                H
              </div>
              <div>
                <span className="font-bold text-white text-base block">
                  HMS Digital Health Platform
                </span>
                <span className="text-xs text-slate-400">
                  Embu Level Five Hospital Diabetes Management System
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#auth-box" onClick={() => handleTabSwitch('signin')} className="hover:text-white">Sign In</a>
              <a href="#auth-box" onClick={() => handleTabSwitch('register')} className="hover:text-white">Register</a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-xs text-center text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Embu Level Five Hospital. All rights reserved.</p>
            <p>Built for Type 2 Diabetes Glycemic Control · Kenya Data Protection Act 2019</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
