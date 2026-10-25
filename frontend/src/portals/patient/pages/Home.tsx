import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight,
  UserCheck,
  Video,
  Clock,
  Sparkles,
  Activity,
  Heart,
  ChevronRight,
  X,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  CartesianGrid,
} from 'recharts';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';
import { GlucoseValue } from '../../../components/domain/GlucoseValue';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

interface HabitItem {
  id: string;
  title: string;
  detail: string;
  completed: boolean;
  time?: string;
}

const MOCK_GRAPH_DATA = [
  { day: 'Mon', value: 6.2, context: 'Fasting' },
  { day: 'Tue', value: 5.6, context: 'Fasting' },
  { day: 'Wed', value: 7.1, context: 'Post-Meal' },
  { day: 'Thu', value: 5.8, context: 'Fasting' },
  { day: 'Fri', value: 6.4, context: 'Bedtime' },
  { day: 'Sat', value: 5.4, context: 'Fasting' },
  { day: 'Sun', value: 5.6, context: 'Fasting' },
];

export const PatientHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { glucoseUnit } = useUIStore();

  const patientName = user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'John Mwangi';

  // State for Habits Checklist
  const [habits, setHabits] = useState<HabitItem[]>([
    {
      id: 'h1',
      title: 'Morning Glucose Check',
      detail: '5.6 mmol/L recorded',
      completed: true,
      time: '7:12 AM',
    },
    {
      id: 'h2',
      title: 'Balanced Breakfast',
      detail: 'Oats, boiled egg & fresh fruit',
      completed: true,
      time: '8:00 AM',
    },
    {
      id: 'h3',
      title: 'Move for 30 Minutes',
      detail: 'A short brisk walk around Embu estate',
      completed: false,
    },
    {
      id: 'h4',
      title: 'Evening Medication',
      detail: 'Metformin 500mg as prescribed by clinician',
      completed: false,
      time: '8:00 PM',
    },
  ]);

  // Quick Log Glucose Modal state
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [logValue, setLogValue] = useState<string>('5.6');
  const [logContext, setLogContext] = useState<string>('FASTING');
  const [logNotes, setLogNotes] = useState<string>('');
  const [readings, setReadings] = useState(MOCK_GRAPH_DATA);

  const completedHabitsCount = habits.filter((h) => h.completed).length;

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const handleQuickLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valNum = parseFloat(logValue);
    if (!isNaN(valNum)) {
      setReadings((prev) => [
        ...prev.slice(1),
        { day: 'Today', value: valNum, context: logContext },
      ]);
    }
    setIsLogOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-8">
      {/* Top Banner & Hero Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-6 rounded-2xl border border-border shadow-xs">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
              DIABETES SELF-MANAGEMENT EDUCATION
            </span>
            <span className="text-[11px] font-semibold text-text-muted hidden sm:inline-block">
              · Embu Level 5 Hospital Workspace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
            Good morning, {patientName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Small, consistent steps make a big difference. Here is your glycemic care at a glance.
          </p>
        </div>

        <Button
          size="lg"
          onClick={() => setIsLogOpen(true)}
          className="shadow-md py-3.5 px-6 font-bold text-sm shrink-0 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Log a Reading</span>
        </Button>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Latest Glucose */}
        <Card className="flex flex-col justify-between gap-3 p-5 border-primary/20 bg-surface hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Latest Glucose
            </span>
            <span className="p-1.5 bg-emerald-500/10 text-emerald-600 rounded-lg">
              <Activity className="w-4 h-4" />
            </span>
          </div>

          <div>
            <GlucoseValue valueInMmol={readings[readings.length - 1].value} />
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                ✓ In Common Target Range
              </span>
            </div>
          </div>

          <span className="text-[11px] text-text-muted font-medium border-t border-border/60 pt-2">
            Today 07:12 AM · Fasting
          </span>
        </Card>

        {/* Card 2: Time in Target */}
        <Card className="flex flex-col justify-between gap-3 p-5 bg-surface hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Time in Target
            </span>
            <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-text">78%</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> ↑ 8%
              </span>
            </div>
            <p className="text-[11px] text-text-muted mt-1">Target zone: 4.0 – 10.0 mmol/L</p>
            <div className="w-full bg-surface-hover h-2 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }} />
            </div>
          </div>

          <span className="text-[11px] text-emerald-600 font-semibold border-t border-border/60 pt-2">
            Exceeding 70% clinical target
          </span>
        </Card>

        {/* Card 3: HbA1c Level */}
        <Card className="flex flex-col justify-between gap-3 p-5 bg-surface hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
              HbA1c Trend
            </span>
            <span className="p-1.5 bg-amber-500/10 text-amber-600 rounded-lg">
              <Heart className="w-4 h-4" />
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-text">7.1%</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> 0.3%
              </span>
            </div>
            <p className="text-[11px] text-text-muted mt-1">3-month average result</p>
          </div>

          <button
            onClick={() => navigate('/patient/hba1c')}
            className="text-[11px] text-primary font-bold hover:underline flex items-center justify-between border-t border-border/60 pt-2"
          >
            <span>Target: &lt;7.0%</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </Card>

        {/* Card 4: Self-Care Check-ins */}
        <Card className="flex flex-col justify-between gap-3 p-5 bg-surface hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Self-Care Streak
            </span>
            <span className="p-1.5 bg-teal-500/10 text-teal-600 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-text">18 / 21</span>
              <span className="text-xs text-text-muted font-semibold">days</span>
            </div>
            <p className="text-[11px] text-text-muted mt-1">Great daily consistency!</p>
          </div>

          <span className="text-[11px] text-teal-700 dark:text-teal-300 font-semibold border-t border-border/60 pt-2">
            🔥 85% Adherence this month
          </span>
        </Card>
      </div>

      {/* Main Grid Section: Glucose Chart & Today's Habits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Glucose Overview & Recharts Trend */}
        <Card className="lg:col-span-2 flex flex-col gap-4 p-6 bg-surface">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-text">Glucose Overview</h2>
                <span className="text-xs font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-md">
                  Last 7 Days
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Target Zone: 4.0 – 10.0 mmol/L · Personalize with your clinician
              </p>
            </div>

            <Button variant="outline" size="sm" onClick={() => navigate('/patient/log-glucose')}>
              View All Readings
            </Button>
          </div>

          {/* Chart Display Area */}
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={readings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} />
                <YAxis domain={[2, 12]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-surface border border-border p-2.5 rounded-lg shadow-lg text-xs font-semibold">
                          <p className="text-text font-bold">{data.day}</p>
                          <p className="text-primary mt-1">
                            {glucoseUnit === 'mmol/L'
                              ? `${data.value} mmol/L`
                              : `${Math.round(data.value * 18.016)} mg/dL`}
                          </p>
                          <p className="text-[10px] text-text-muted capitalize">{data.context}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceArea y1={4.0} y2={10.0} fill="#16A34A" fillOpacity={0.08} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0F766E"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#glucoseGradient)"
                  dot={{ r: 4, fill: '#0F766E', strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 6, fill: '#0F766E' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-text-muted border-t border-border pt-3">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500/20 border border-emerald-500/40 inline-block" />
              Target Zone (4.0 - 10.0 mmol/L)
            </span>
            <span className="font-semibold text-text">
              7-day Average: <span className="text-primary font-bold">6.0 mmol/L</span>
            </span>
          </div>
        </Card>

        {/* Right Column (1 span): Today's Check-in / Habits Checklist */}
        <Card className="flex flex-col gap-4 p-6 bg-surface">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-text">Today's Check-in</h2>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {completedHabitsCount} of {habits.length} Complete
              </span>
            </div>
            <p className="text-xs text-text-muted mt-1">Daily self-care habits for steady glycemic control.</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-surface-hover h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 rounded-full"
              style={{ width: `${(completedHabitsCount / habits.length) * 100}%` }}
            />
          </div>

          {/* Habits List */}
          <div className="flex flex-col gap-2.5 my-1">
            {habits.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleHabit(item.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                  item.completed
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-surface hover:bg-surface-hover border-border'
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                    item.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-border bg-surface'
                  }`}
                >
                  {item.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        item.completed ? 'text-emerald-900 dark:text-emerald-200 line-through' : 'text-text'
                      }`}
                    >
                      {item.title}
                    </span>
                    {item.time && (
                      <span className="text-[10px] text-text-muted font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.time}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-text-muted mt-0.5 truncate">{item.detail}</span>
                </div>
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full text-xs font-bold py-2.5"
            onClick={() => navigate('/patient/learning')}
          >
            Open DSME Care Plan &amp; Guidance
          </Button>
        </Card>
      </div>

      {/* Bottom Grid: Care Team, Next Appointment, Learning Hub Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Your Care Team Card */}
        <Card className="flex flex-col justify-between p-6 bg-surface">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold text-text">Your Care Team</h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-2.5 bg-surface-hover rounded-xl border border-border/60">
                <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                  FM
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-text truncate">Dr. Faith Mugo</span>
                  <span className="text-[11px] text-text-muted">Clinical Officer · Diabetologist</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-surface-hover rounded-xl border border-border/60">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  PM
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-text truncate">Nurse Peter Mutua</span>
                  <span className="text-[11px] text-text-muted">Diabetes Nurse Educator</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/patient/appointments')}
            className="w-full text-xs font-bold text-primary mt-4 flex items-center justify-center gap-1"
          >
            <span>Message Care Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Card>

        {/* Next Appointment Card */}
        <Card className="flex flex-col justify-between p-6 bg-surface">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" /> Coming Up
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/10 text-blue-600 rounded-md">
                In 4 Days
              </span>
            </div>

            <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3 mt-1">
              <div className="p-3 bg-primary text-white rounded-lg text-center shrink-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider">OCT</span>
                <span className="block text-xl font-black">24</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-text truncate">Diabetes Follow-Up Visit</span>
                <span className="text-[11px] text-text-muted">Saturday · 10:30 AM</span>
                <span className="text-[11px] text-primary font-semibold truncate mt-0.5">
                  Dr. Faith Mugo · In Person
                </span>
              </div>
            </div>

            <span className="text-[11px] text-text-muted">
              Location: Embu Level 5 Hospital · Diabetes Clinic Room 4
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/patient/appointments')}
              className="text-xs font-semibold"
            >
              See All
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/patient/call/demo-session-1')}
              className="text-xs font-semibold flex items-center justify-center gap-1"
            >
              <Video className="w-3.5 h-3.5" /> Telemedicine
            </Button>
          </div>
        </Card>

        {/* Featured Learning Hub Lesson Card */}
        <Card className="flex flex-col justify-between p-6 bg-gradient-to-br from-teal-900 to-emerald-800 text-white">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-300" /> Learning Path
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-white/15 text-emerald-100 rounded-md backdrop-blur-xs">
                03 / 08
              </span>
            </div>

            <div className="mt-2">
              <span className="text-[10px] font-bold tracking-wider text-emerald-200 uppercase">
                FOOD &amp; BLOOD SUGAR
              </span>
              <h3 className="text-base font-extrabold text-white mt-1 leading-snug">
                Building a Balanced Plate with Local Foods
              </h3>
              <p className="text-xs text-emerald-100 mt-1 line-clamp-2">
                Learn practical meal portioning with Sukuma wiki, green grams (Ndengu), and whole grains.
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate('/patient/learning')}
            className="w-full bg-white text-teal-900 hover:bg-emerald-50 text-xs font-extrabold py-2.5 mt-4 shadow-md flex items-center justify-center gap-2"
          >
            <span>Start Lesson (6 min)</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>
      </div>

      {/* Quick Log Glucose Modal Drawer */}
      {isLogOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 bg-surface shadow-2xl flex flex-col gap-4 border-primary/30">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-text">Quick Glucose Log</h3>
              </div>
              <button
                onClick={() => setIsLogOpen(false)}
                className="p-1 text-text-muted hover:text-text rounded-lg hover:bg-surface-hover"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickLogSubmit} className="flex flex-col gap-4">
              <Input
                label={`Glucose Reading (${glucoseUnit})`}
                type="number"
                step="0.1"
                value={logValue}
                onChange={(e) => setLogValue(e.target.value)}
                required
                autoFocus
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text">Measurement Context</label>
                <select
                  value={logContext}
                  onChange={(e) => setLogContext(e.target.value)}
                  className="w-full p-2.5 text-xs font-medium bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                >
                  <option value="FASTING">Fasting (Morning before food)</option>
                  <option value="BEFORE_MEAL">Before Meal</option>
                  <option value="AFTER_MEAL">After Meal (2 hrs post)</option>
                  <option value="BEDTIME">Bedtime</option>
                  <option value="RANDOM">Random / Exercise</option>
                </select>
              </div>

              <Input
                label="Notes (Optional)"
                placeholder="e.g. After 30 min walk, feel good"
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
              />

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <Button variant="ghost" type="button" onClick={() => setIsLogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="font-bold">
                  Save Reading
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
