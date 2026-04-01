/**
 * Auth Application - Login and authentication flow
 * This is a remote microfrontend loaded by the shell for /login route
 * Exposed via Module Federation as 'auth/App'
 */
import React from 'react';
import { Login } from './pages/Login';

export default function App() {
  return <Login />;
}
