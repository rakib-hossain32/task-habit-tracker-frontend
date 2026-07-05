'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

import { useRegisterMutation } from "@/features/auth/queries/auth.mutations";
import { registerZodSchema } from "@/features/auth/validators/register.validator";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agreeTerms?: boolean;
}

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const mutation = useRegisterMutation();
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onTouched",
    resolver: zodResolver(registerZodSchema),
  });

  const passwordValue = watch('password', '');

  // Backend integration point: POST /api/auth/register
  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setAuthError('');
    try {
      await mutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push('/login'); // or wherever it should go after register
    } catch (err: any) {
      setAuthError(err?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          Create your account
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Start building better habits today — free forever
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
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="reg-name" className="block text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Full name
          </label>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            placeholder="Arjun Kumar"
            className="input-field"
            {...register('name', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs font-medium" style={{ color: 'var(--danger)' }} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="block text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Email address
          </label>
          <input
            id="reg-email"
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
          <label htmlFor="reg-password" className="block text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Password
          </label>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            At least 8 characters with a number or symbol
          </p>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Create a strong password"
              className="input-field pr-11"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: {
                  value: /^(?=.*[0-9!@#$%^&*])/,
                  message: 'Password must contain a number or symbol',
                },
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

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label htmlFor="reg-confirm" className="block text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Confirm password
          </label>
          <div className="relative">
            <input
              id="reg-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Repeat your password"
              className="input-field pr-11"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (v) => v === passwordValue || 'Passwords do not match',
              })}
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 btn-ghost p-0 h-auto w-auto"
              onClick={() => setShowConfirm((p) => !p)}
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs font-medium" style={{ color: 'var(--danger)' }} role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2.5">
          <input
            id="agree-terms"
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded accent-primary cursor-pointer"
            {...register('agreeTerms', { required: 'You must agree to the terms' })}
          />
          <div>
            <label htmlFor="agree-terms" className="text-sm cursor-pointer" style={{ color: 'var(--muted-foreground)' }}>
              I agree to the{' '}
              <span className="font-semibold" style={{ color: 'var(--primary)' }}>Terms of Service</span>
              {' '}and{' '}
              <span className="font-semibold" style={{ color: 'var(--primary)' }}>Privacy Policy</span>
            </label>
            {errors.agreeTerms && (
              <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--danger)' }} role="alert">
                {errors.agreeTerms.message}
              </p>
            )}
          </div>
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
              Creating account…
            </span>
          ) : (
            <>
              <UserPlus size={16} />
              Create Free Account
            </>
          )}
        </button>
      </form>

      {/* Switch */}
      <p className="text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
        Already have an account?{' '}
        <button
          type="button"
          className="font-semibold"
          style={{ color: 'var(--primary)' }}
          onClick={onSwitchToLogin}
        >
          Sign in instead
        </button>
      </p>
    </div>
  );
}
