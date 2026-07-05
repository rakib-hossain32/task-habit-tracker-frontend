import React from 'react';
import { CheckSquare, Flame, BarChart3, Repeat2, TrendingUp } from 'lucide-react';

const stats = [
  { id: 'stat-tasks', label: 'Tasks completed', value: '1,247', icon: <CheckSquare size={14} /> },
  { id: 'stat-streak', label: 'Day streak', value: '14', icon: <Flame size={14} /> },
  { id: 'stat-habits', label: 'Habits tracked', value: '5', icon: <Repeat2 size={14} /> },
  { id: 'stat-rate', label: 'Weekly rate', value: '87%', icon: <TrendingUp size={14} /> },
];

const features = [
  'Daily task management with priority levels',
  'Habit check-ins with streak tracking',
  'Weekly progress reports & analytics',
  'Calendar activity view',
];

export default function AuthBrandPanel() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between w-[480px] xl:w-[520px] shrink-0 px-12 py-12 relative overflow-hidden gradient-brand"
    >
      {/* Background decoration */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
        style={{ backgroundColor: '#fff' }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10"
        style={{ backgroundColor: '#fff' }}
      />
      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-base"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
          >
            TH
          </div>
          <span className="font-extrabold text-2xl text-white tracking-tight">TaskHabit</span>
        </div>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Your daily productivity command center
        </p>
      </div>
      {/* Main copy */}
      <div className="relative z-10 space-y-6">
        <div>
          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
            Build habits that
            <br />
            <span style={{ color: '#FCD34D' }}>actually stick.</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
            Manage tasks, track daily habits, and visualize your progress — all in one focused dashboard built for students, developers, and freelancers.
          </p>
        </div>

        {/* Feature list */}
        <ul className="space-y-2.5">
          {features?.map((f, i) => (
            <li key={`feature-${i + 1}`} className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <CheckSquare size={11} color="#fff" />
              </div>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.80)' }}>
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Stats preview card */}
      <div
        className="relative z-10 rounded-2xl p-4 border"
        style={{ backgroundColor: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.15)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 size={14} color="rgba(255,255,255,0.70)" />
          <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.70)' }}>
            Your stats today
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats?.map((s) => (
            <div
              key={s?.id}
              className="rounded-xl p-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span style={{ color: 'rgba(255,255,255,0.55)' }}>{s?.icon}</span>
                <p className="text-2xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {s?.label}
                </p>
              </div>
              <p className="text-xl font-bold text-white font-tabular">{s?.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
