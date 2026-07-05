'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthBrandPanel from './AuthBrandPanel';

interface AuthPageClientProps {
  defaultTab?: 'login' | 'register';
}

export default function AuthPageClient({ defaultTab = 'login' }: AuthPageClientProps) {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);

  const handleTabChange = (newTab: 'login' | 'register') => {
    setTab(newTab);
    if (newTab === 'login') {
      router.push('/login');
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="min-h-screen w-screen flex overflow-hidden">
      {/* Brand panel — left */}
      <AuthBrandPanel />

      {/* Form panel — right, fills remaining space */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="w-full max-w-md">
          {/* Logo — mobile only */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
            >
              TH
            </div>
            <span className="font-extrabold text-xl" style={{ color: 'var(--primary)' }}>
              TaskHabit
            </span>
          </div>

          {/* Tab switcher */}
          <div
            className="flex rounded-2xl p-1 mb-8"
            style={{ backgroundColor: 'var(--muted)' }}
            role="tablist"
          >
            <button
              role="tab"
              id="tab-login"
              aria-selected={tab === 'login'}
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                tab === 'login' ? 'shadow-md' : ''
              }`}
              style={{
                backgroundColor: tab === 'login' ? 'var(--card)' : 'transparent',
                color: tab === 'login' ? 'var(--primary)' : 'var(--muted-foreground)',
              }}
            >
              Sign In
            </button>
            <button
              role="tab"
              id="tab-register"
              aria-selected={tab === 'register'}
              onClick={() => handleTabChange('register')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                tab === 'register' ? 'shadow-md' : ''
              }`}
              style={{
                backgroundColor: tab === 'register' ? 'var(--card)' : 'transparent',
                color: tab === 'register' ? 'var(--primary)' : 'var(--muted-foreground)',
              }}
            >
              Create Account
            </button>
          </div>

          {/* Forms */}
          <div className="fade-in" key={tab}>
            {tab === 'login' ? (
              <LoginForm onSwitchToRegister={() => handleTabChange('register')} />
            ) : (
              <RegisterForm onSwitchToLogin={() => handleTabChange('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
