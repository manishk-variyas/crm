import { useStore } from '@crm/store';

export interface AuthUser {
  name: string;
  role: string;
  email: string;
}

/**
 * Retrieves the current user from the global store
 */
export function getStoredUser(): AuthUser | null {
  return useStore.getState().user as AuthUser | null;
}

/**
 * Validates the current session token against the mock backend (Mockoon)
 */
export async function validateSession(): Promise<{ isValid: boolean; user?: AuthUser }> {
  const { token, user } = useStore.getState();
  
  if (!token || !user) return { isValid: false };

  try {
    const response = await fetch('http://localhost:3005/api/auth/validate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return { isValid: false };
    }

    const data = await response.json();
    return { 
      isValid: data.valid === true, 
      user: data.user 
    };
  } catch (error) {
    console.error('Session validation failed:', error);
    return { isValid: false };
  }
}

export function hasRole(requiredRoles: string[]): boolean {
  const user = useStore.getState().user;
  if (!user) return false;
  
  const currentRole = user.role?.toLowerCase();
  return requiredRoles.map(r => r.toLowerCase()).includes(currentRole);
}
