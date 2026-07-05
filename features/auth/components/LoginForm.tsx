'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Copy, Check, LogIn } from 'lucide-react';

import { useLoginMutation } from "@/features/auth/queries/auth.mutations";
import type { ILoginPayload } from "@/features/auth/validators/login.validator";
import { loginZodSchema } from "@/features/auth/validators/login.validator";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginFormData extends ILoginPayload {
  rememberMe?: boolean;
  redirectPath?: string;
}

interface DemoCredential {
  role: string;
  email: string;
  password: string;
}

const demoCredentials: DemoCredential[] = [
  { role: 'Student', email: 'arjun.dev@taskhabit.app', password: 'Habit@2026' },
  { role: 'Freelancer', email: 'priya.remote@taskhabit.app', password: 'Focus@2026' },
];

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [authError, setAuthError] = useState('');

  const mutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onTouched",
    resolver: zodResolver(loginZodSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const autofillCredential = (cred: DemoCredential) => {
    setValue('email', cred.email);
    setValue('password', cred.password);
    setAuthError('');
  };

  // Backend integration point: POST /api/auth/login
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setAuthError('');
    try {
      await mutation.mutateAsync({
        email: data.email,
        password: data.password,
        redirectPath: data.redirectPath,
      });
      router.push('/dashboard');
    } catch (err: any) {
      setAuthError(err?.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          Welcome back
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Sign in to your productivity dashboard
        </p>
      </div>

      {/* Auth error */}
      {authError && (
        <div
          className="flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm"
          style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}
          role="alert"
        >
          <span className="font-medium">{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="block text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@taskhabit.app"
            className="input-field"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
            })}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs font-medium" style={{ color: 'var(--danger)' }} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="block text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Password
            </label>
            <button
              type="button"
              className="text-xs font-semibold"
              style={{ color: 'var(--primary)' }}
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="input-field pr-11"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 btn-ghost p-0 h-auto w-auto"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium" style={{ color: 'var(--danger)' }} role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2.5">
          <input
            id="remember-me"
            type="checkbox"
            className="w-4 h-4 rounded accent-primary cursor-pointer"
            {...register('rememberMe')}
          />
          <label htmlFor="remember-me" className="text-sm cursor-pointer" style={{ color: 'var(--muted-foreground)' }}>
            Remember me for 30 days
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary w-full h-11"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Signing in…
            </span>
          ) : (
            <>
              <LogIn size={16} />
              Sign In
            </>
          )}
        </button>
      </form>

      {/* Demo credentials */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: 'var(--border)' }}
      >
        <div
          className="px-4 py-2.5 border-b flex items-center gap-2"
          style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--border)' }}
        >
          <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
            🎯 Demo accounts — click to autofill
          </span>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {demoCredentials.map((cred) => (
            <div
              key={`demo-${cred.role}`}
              className="px-4 py-3 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => autofillCredential(cred)}
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--primary)' }}>
                    {cred.role}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xs w-14 shrink-0" style={{ color: 'var(--muted-foreground)' }}>
                        Email
                      </span>
                      <span className="text-xs font-medium truncate" style={{ color: 'var(--foreground)' }}>
                        {cred.email}
                      </span>
                      <button
                        type="button"
                        className="btn-ghost p-0.5 h-auto w-auto shrink-0"
                        onClick={(e) => { e.stopPropagation(); handleCopy(cred.email, `${cred.role}-email`); }}
                        aria-label="Copy email"
                      >
                        {copiedField === `${cred.role}-email` ? (
                          <Check size={12} style={{ color: 'var(--success)' }} />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xs w-14 shrink-0" style={{ color: 'var(--muted-foreground)' }}>
                        Password
                      </span>
                      <span className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                        {cred.password}
                      </span>
                      <button
                        type="button"
                        className="btn-ghost p-0.5 h-auto w-auto shrink-0"
                        onClick={(e) => { e.stopPropagation(); handleCopy(cred.password, `${cred.role}-pass`); }}
                        aria-label="Copy password"
                      >
                        {copiedField === `${cred.role}-pass` ? (
                          <Check size={12} style={{ color: 'var(--success)' }} />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Switch */}
      <p className="text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
        Don&apos;t have an account?{' '}
        <button
          type="button"
          className="font-semibold"
          style={{ color: 'var(--primary)' }}
          onClick={onSwitchToRegister}
        >
          Create one free
        </button>
      </p>
    </div>
  );
}
