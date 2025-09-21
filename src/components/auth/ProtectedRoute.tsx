'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Debug logging
    console.log('ProtectedRoute Debug:', {
      isLoading,
      isAuthenticated,
      user,
      requiredRoles,
      userRoles: user?.roles,
      hasRequiredRole: requiredRoles.length > 0 ? requiredRoles.some(role => user?.roles?.includes(role)) : true
    });

    if (!isLoading && !isAuthenticated) {
      console.log('Redirecting to login: not authenticated');
      router.push(redirectTo);
      return;
    }

    if (!isLoading && isAuthenticated && requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some(role => 
        user?.roles?.includes(role)
      );

      if (!hasRequiredRole) {
        console.log('Redirecting to unauthorized: missing required roles', {
          requiredRoles,
          userRoles: user?.roles
        });
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRoles, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      user?.roles?.includes(role)
    );

    if (!hasRequiredRole) {
      return null; // Will redirect in useEffect
    }
  }

  return <>{children}</>;
}
