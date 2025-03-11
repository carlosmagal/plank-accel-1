'use client';

import { useRouter } from 'next/navigation';
import { LogoutIcon } from './icons/LogoutIcon';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Chat</h1>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            title="Log out"
          >
            <LogoutIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
