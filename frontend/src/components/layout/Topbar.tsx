import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Sun, Moon, Globe, Building2, Layers } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { UserRole } from '../../types';
import { getRoleRedirectPath } from '../../routes/roleRedirect';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Topbar: React.FC = () => {
  const { user, activeRole, setRole, setUser, logout } = useAuthStore();
  const { theme, toggleTheme, locale, setLocale, glucoseUnit, setGlucoseUnit } = useUIStore();
  const navigate = useNavigate();

  const handleSwitchWorkspaceRole = (role: UserRole) => {
    setRole(role);
    if (user) {
      setUser({
        ...user,
        role,
      });
    } else {
      setUser({
        id: 'demo-user-1',
        email: `${role.toLowerCase()}@hms.go.ke`,
        firstName: role === UserRole.PATIENT ? 'John' : role === UserRole.DIABETOLOGIST ? 'Dr. Faith' : 'Admin',
        lastName: role === UserRole.PATIENT ? 'Mwangi' : role === UserRole.DIABETOLOGIST ? 'Mugo' : 'Manager',
        role,
        isActive: true,
        mfaEnabled: false,
      });
    }
    navigate(getRoleRedirectPath(role));
  };

  const roleOptions = [
    { role: UserRole.PATIENT, label: 'Patient View' },
    { role: UserRole.DIABETOLOGIST, label: 'Clinician View' },
    { role: UserRole.HOSPITAL_ADMIN, label: 'Hospital Admin' },
    { role: UserRole.SUPER_ADMIN, label: 'Super Admin' },
  ];

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-20 shadow-xs">
      {/* Top Workspace Header Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Hospital Context & Workspace Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold border border-primary/20">
            <Building2 className="w-3.5 h-3.5" />
            <span className="truncate">Embu Level 5 Hospital Workspace</span>
          </div>

          <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Demo
          </span>
        </div>

        {/* Middle: Interactive Workspace Role Selector */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-background border border-border rounded-xl">
          <span className="text-[10px] font-bold text-text-muted px-2 uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3 h-3 text-primary" /> Workspace:
          </span>
          {roleOptions.map((opt) => {
            const isActive = activeRole === opt.role;
            return (
              <button
                key={opt.role}
                onClick={() => handleSwitchWorkspaceRole(opt.role)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-text-muted hover:text-text hover:bg-surface-hover'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Right: Preferences & User Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Unit Toggle */}
          <button
            onClick={() => setGlucoseUnit(glucoseUnit === 'mmol/L' ? 'mg/dL' : 'mmol/L')}
            className="px-2.5 py-1 text-xs font-bold border border-border rounded-lg bg-surface-hover hover:border-primary/50 text-text transition-colors flex items-center gap-1"
            title="Toggle Glucose Display Unit"
          >
            <span className="text-[10px] text-text-muted uppercase font-semibold">Unit:</span>
            <span className="text-primary font-bold">{glucoseUnit}</span>
          </button>

          {/* Locale Toggle */}
          <button
            onClick={() => setLocale(locale === 'en' ? 'sw' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border border-border rounded-lg bg-surface-hover hover:border-primary/50 text-text transition-colors"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 border border-border rounded-lg bg-surface-hover hover:border-primary/50 text-text transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>

          {/* User Profile / Logout */}
          {user && (
            <div className="flex items-center gap-2 border-l border-border pl-2 sm:pl-3">
              <Avatar name={`${user.firstName} ${user.lastName}`} size="sm" />
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-text truncate max-w-[120px]">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-[10px] text-text-muted font-medium">{user.role}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={logout} title="Sign Out">
                <LogOut className="w-4 h-4 text-text-muted hover:text-red-600" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Workspace Role Selector Switcher */}
      <div className="md:hidden px-4 py-1.5 bg-background border-t border-border flex items-center justify-between overflow-x-auto gap-1">
        <span className="text-[10px] font-bold text-text-muted shrink-0 uppercase">View:</span>
        <div className="flex items-center gap-1 overflow-x-auto">
          {roleOptions.map((opt) => {
            const isActive = activeRole === opt.role;
            return (
              <button
                key={opt.role}
                onClick={() => handleSwitchWorkspaceRole(opt.role)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md whitespace-nowrap transition-all ${
                  isActive ? 'bg-primary text-white font-bold' : 'text-text-muted bg-surface border border-border'
                }`}
              >
                {opt.label.replace(' View', '')}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
