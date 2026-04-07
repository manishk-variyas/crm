/**
 * Login Page - Main authentication entry point
 * Displays role selector, login form
 * @returns Login component with role selection and form
 */
import React from 'react';
import { Card, CardContent } from '@crm/ui';
import { AuthHeader } from '../components/AuthHeader';
import { LoginForm } from '../components/LoginForm';
import { ThemeProvider } from '@crm/ui';

export function Login() {
  return (
    <ThemeProvider>
      <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4 font-sans text-foreground">
        <AuthHeader />
        <Card className="w-full max-w-[440px] shadow-sm border-border bg-card">
          <CardContent className="p-8 pb-10">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
