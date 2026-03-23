import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export function LoginForm() {
  return (
    <>
      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-[18px] h-[18px]" strokeWidth={2} />
          <input 
            type="email" 
            className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition-colors text-slate-700 text-[15px] shadow-sm"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-[18px] h-[18px]" strokeWidth={2} />
          <input 
            type="password" 
            className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] transition-colors text-slate-700 text-[15px] shadow-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <input 
            id="remember_me" 
            name="remember_me" 
            type="checkbox" 
            className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded cursor-pointer"
          />
          <label htmlFor="remember_me" className="ml-2 block text-sm text-slate-700 cursor-pointer">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-[#4f46e5] hover:text-[#4338ca] hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>

      <button className="w-full bg-[#4f46e5] text-white font-medium py-2.5 rounded-md hover:bg-[#4338ca] transition-colors flex items-center justify-center gap-2 mb-8 shadow-sm">
        Sign in
        <ArrowRight className="w-[18px] h-[18px]" />
      </button>
    </>
  );
}
