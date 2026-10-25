import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Activity,
  HeartPulse,
  Pill,
  Video,
  ShieldCheck,
  Building2,
  ArrowRight,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-text flex flex-col selection:bg-primary/20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md">
              H
            </div>
            <div>
              <span className="font-bold text-lg text-text tracking-tight block leading-none">
                HMS Care
              </span>
              <span className="text-[10px] text-text-muted font-medium">Embu Level 5 Hospital</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate('/login')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              Pilot Hospital: Embu Level Five Hospital, Kenya
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-text tracking-tight leading-[1.15]">
              Digital Health Platform for <span className="text-primary">Type 2 Diabetes</span> Care
            </h1>

            <p className="text-base md:text-lg text-text-muted leading-relaxed font-normal max-w-2xl">
              Empowering adult patients with simple self-monitoring while providing clinicians with real-time risk triage, telemedicine, and pharmacy refill management.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button size="lg" className="w-full sm:w-auto px-8 py-3.5 text-base font-bold shadow-lg" onClick={() => navigate('/login')}>
                Access Platform <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="py-16 bg-surface border-y border-border/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text">Core System Capabilities</h2>
            <p className="text-xs md:text-sm text-text-muted mt-2">
              Integrated care modules designed for seamless clinical workflows and patient engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="flex flex-col gap-3 p-6 hover:border-primary/40 transition-all shadow-sm">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary w-fit">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text">Self-Monitoring</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Simple glucose logging with context tags (Fasting, Post-meal) and 3-month HbA1c trend visualisations.
              </p>
            </Card>

            <Card className="flex flex-col gap-3 p-6 hover:border-primary/40 transition-all shadow-sm">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text">Risk Triage</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Automated clinical stratification into Critical, High, Moderate, and Low risk tiers with clear trigger reasons.
              </p>
            </Card>

            <Card className="flex flex-col gap-3 p-6 hover:border-primary/40 transition-all shadow-sm">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text">Low-Bandwidth Telemedicine</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                WebRTC consultations with automatic low-bandwidth audio fallback (Opus) and live in-call vitals logging.
              </p>
            </Card>

            <Card className="flex flex-col gap-3 p-6 hover:border-primary/40 transition-all shadow-sm">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text">Pharmacy Refills</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                One-tap prescription refill requests integrated directly with the Embu Level 5 Hospital Pharmacy queue.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Role Specific Portals Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text">Tailored Experience for Every User</h2>
            <p className="text-xs md:text-sm text-text-muted mt-2">Role-based security ensuring distinct clinical and administrative views</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">01 · Patient</span>
                <h4 className="text-lg font-bold text-text mt-1">Self-Management Portal</h4>
                <p className="text-xs text-text-muted mt-2">Log readings, track HbA1c, view medications, request refills, and join virtual calls.</p>
              </div>
              <Button size="sm" variant="outline" className="w-fit" onClick={() => navigate('/login')}>Demo Login</Button>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">02 · Clinician</span>
                <h4 className="text-lg font-bold text-text mt-1">Healthcare Provider Portal</h4>
                <p className="text-xs text-text-muted mt-2">Population triage cohort, patient timelines, clinical notes, and pseudonymised exports.</p>
              </div>
              <Button size="sm" variant="outline" className="w-fit" onClick={() => navigate('/login')}>Demo Login</Button>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">03 · Hospital Admin</span>
                <h4 className="text-lg font-bold text-text mt-1">Hospital Management Portal</h4>
                <p className="text-xs text-text-muted mt-2">Onboard staff via SMS/Email invitations, assign clinicians, and configure pharmacy settings.</p>
              </div>
              <Button size="sm" variant="outline" className="w-fit" onClick={() => navigate('/login')}>Demo Login</Button>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">04 · Super Admin</span>
                <h4 className="text-lg font-bold text-text mt-1">Platform Governance Portal</h4>
                <p className="text-xs text-text-muted mt-2">Multi-tenant hospital onboarding, global risk threshold defaults, and platform audit trail.</p>
              </div>
              <Button size="sm" variant="outline" className="w-fit" onClick={() => navigate('/login')}>Demo Login</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Banner */}
      <section className="py-12 bg-emerald-950 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-800/60 rounded-2xl text-emerald-400 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold">Kenya Data Protection Act 2019 Compliant</h3>
              <p className="text-xs text-emerald-200/80 mt-1 max-w-xl">
                Row-Level Security (RLS) database isolation, Argon2id passwords, mandatory TOTP MFA for admins/clinicians, and audit-logged pseudonymised research exports.
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="bg-transparent border-emerald-700 text-white hover:bg-emerald-900 shrink-0" onClick={() => navigate('/login')}>
            Sign In to Platform
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8 text-xs text-text-muted">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} HMS Care. Developed for Embu Level Five Hospital, Kenya.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
