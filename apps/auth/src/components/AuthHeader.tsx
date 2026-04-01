/**
 * AuthHeader - Company branding and sign-in page title
 * Displays logo, heading, and trial link
 */
import React from 'react';

export function AuthHeader() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6 shadow-sm">
        <span className="text-primary-foreground font-bold text-2xl">E</span>
      </div>
      <h1 className="text-[28px] font-bold text-foreground mb-2 tracking-tight">Sign in to your account</h1>
      <p className="text-muted-foreground text-[15px]">
        Private access only — contact admin for credentials
      </p>
    </div>
  );
}
