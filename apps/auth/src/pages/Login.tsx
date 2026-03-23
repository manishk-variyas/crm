import React, { useState } from 'react';
import { Card, CardContent } from '@crm/ui';
import { AuthHeader } from '../components/AuthHeader';
import { RoleSelector } from '../components/RoleSelector';
import { LoginForm } from '../components/LoginForm';
import { DemoCredentials } from '../components/DemoCredentials';

export function Login() {
  const [role, setRole] = useState('Manager');

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      <AuthHeader />
      <Card className="w-full max-w-[440px] shadow-sm border-slate-200 bg-white">
        <CardContent className="p-8 pb-10">
          <RoleSelector role={role} setRole={setRole} />
          <LoginForm />
          <DemoCredentials />
        </CardContent>
      </Card>
    </div>
  );
}
