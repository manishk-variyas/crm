import React from 'react';

export function AuthHeader() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-12 h-12 bg-[#4f46e5] rounded-lg flex items-center justify-center mb-6 shadow-sm">
        <span className="text-white font-bold text-2xl">E</span>
      </div>
      <h1 className="text-[28px] font-bold text-slate-900 mb-2 tracking-tight">Sign in to your account</h1>
      <p className="text-slate-500 text-[15px]">
        Or <a href="#" className="text-[#4f46e5] hover:text-[#4338ca] hover:underline font-medium">start your 14-day free trial</a>
      </p>
    </div>
  );
}
