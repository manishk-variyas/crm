/**
 * LoginForm - Email/password authentication form
 * Uses API for authentication with role-based login
 */
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/hooks/useAuth';

export function LoginForm() {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    const result = await login({ email, password });
    
    if (!result.success) {
      setLocalError(result.error || 'Login failed');
    }
  };

  const displayError = localError || authError;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block text-sm font-semibold text-foreground mb-2">Email address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px]" strokeWidth={2} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-foreground text-[15px] shadow-sm bg-background"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px]" strokeWidth={2} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-foreground text-[15px] shadow-sm bg-background"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>

      {displayError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium">{displayError}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
          />
          <span className="text-sm text-foreground/80 font-medium">Remember me</span>
        </label>
        <a href="#" className="text-sm text-primary font-medium hover:underline underline-offset-4">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-md font-semibold text-[15px] hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            Sign In
            <ArrowRight className="w-[18px] h-[18px]" />
          </>
        )}
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Demo credentials: <span className="font-medium text-foreground">admin@crm.com</span> / <span className="font-medium text-foreground">crm123</span>
        </p>
      </div>
    </form>
  );
}