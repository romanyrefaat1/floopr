import NotFound from "@/app/NotFound";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getUserData(userId: string) {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  console.log(userSnapshot.docs);
  const userDoc = userSnapshot.docs.find((doc) => doc.id === userId);
  console.log(userDoc);
  if (!userDoc) return null;
  return { id: userDoc.id, ...userDoc.data() };
}

async function getAllUsers() {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  return userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) {
    return NotFound();
  }

  const userData = await getUserData(userId);
  console.log(userData);
  if (!userData || !userData.isAdmin) {
    return NotFound();
  }

  const users = await getAllUsers();
  const findUserTimestamp = (userObject: object) => {
    return userObject.updatedAt || userObject.createdAt;
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <Image
              src={user.profilePicture}
              width={60}
              height={60}
              alt="Profile picture"
            />
            <span>{user.email || user.id}</span>
            <span>{user.fullName}</span>
            <span>{findUserTimestamp(user).toDate().toLocaleDateString()}</span>
            <Link
              href={`/admin/${user.id}/products`}
              className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Products
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
