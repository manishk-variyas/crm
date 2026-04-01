/**
 * LoginForm - Email/password authentication form
 * Contains email input, password input, remember me, and forgot password
 * Validates against hardcoded credentials for demo
 */
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VALID_EMAIL = 'SalesPerson0000@gmail.com';
const VALID_PASSWORD = 'VISHAL_ADMIN@0000';

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // Store auth state
      localStorage.setItem('crm_auth', JSON.stringify({
        isAuthenticated: true,
        email: email,
        user: 'Admin User',
        role: 'admin',
        loginTime: new Date().toISOString()
      }));
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Contact admin for access.');
      setIsLoading(false);
    }
  };

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
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded cursor-pointer"
          />
          <label htmlFor="remember_me" className="ml-2 block text-sm text-foreground cursor-pointer">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <span className="font-medium text-muted-foreground">
            Private access only
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-8 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-primary-foreground" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in...
          </span>
        ) : (
          <>
            Sign in
            <ArrowRight className="w-[18px] h-[18px]" />
          </>
        )}
      </button>
    </form>
  );
}
