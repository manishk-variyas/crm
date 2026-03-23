import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function DemoCredentials() {
  return (
    <>
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-slate-400">Demo Credentials</span>
        </div>
      </div>

      <div className="bg-slate-50/50 border border-slate-200 rounded-lg p-4 flex items-center gap-4">
        <CheckCircle2 className="text-[#10b981] w-6 h-6 shrink-0" strokeWidth={2} />
        <div className="flex flex-col gap-0.5">
          <span className="text-[14px] font-semibold text-slate-900 leading-tight">Any email works</span>
          <span className="text-[14px] text-slate-500 leading-tight">No password required</span>
        </div>
      </div>
    </>
  );
}
