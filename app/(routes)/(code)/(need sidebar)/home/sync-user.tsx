"use client";

import { syncUserWithFirebase } from "@/lib/sync-user-clerk-firebase";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SyncUser() {
  const { user } = useUser();
  console.log(`user`, user);

  useEffect(() => {
    if (user) {
      syncUserWithFirebase(user.id, {
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,

        hasImage: user.hasImage,
        profilePicture: user.imageUrl,
      });
      console.log(`user synced`);
    }
  }, [user]);

  return null;
}
