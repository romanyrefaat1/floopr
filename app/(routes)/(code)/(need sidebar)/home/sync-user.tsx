'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { syncUserWithFirebase } from '@/lib/sync-user-clerk-firebase';

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      syncUserWithFirebase(user.id, {
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      console.log(`user synced`)
    }
  }, [user]);

  return null;
}
