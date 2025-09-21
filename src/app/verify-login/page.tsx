'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { authApi } from '@/lib/api-client';

export default function VerifyLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setError('No verification token found. Please try logging in again.');
        return;
      }

      try {
        const data = await authApi.verifyMagicLink(token);

        if (data.access_token) {
          await login(data.access_token);
          setStatus('success');
          
          // Redirect to the admin dashboard after a short delay
          setTimeout(() => {
            router.push('/admin');
          }, 1000);
        } else {
          throw new Error('No access token received.');
        }

      } catch (err: any) {
        setStatus('error');
        setError(err.message || 'An unexpected error occurred.');
        console.error('Verification error:', err);
      }
    };

    verifyToken();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md text-center">
        {status === 'verifying' && (
          <>
            <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Verifying Your Login</h1>
            <p className="text-gray-600">Please wait while we securely log you in...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2">Login Successful!</h1>
            <p className="text-gray-600">Redirecting you to the admin dashboard...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Login Failed</h1>
            <p className="text-red-600">{error}</p>
          </>
        )}
      </div>
    </div>
  );
}
