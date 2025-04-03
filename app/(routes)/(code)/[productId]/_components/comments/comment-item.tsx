"use client";

import LoaderSpinner from "@/components/loader-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import RichTextViewer from "@/components/ui/rich-text-viewer";
import { db } from "@/lib/firebase";
import formatFirebaseTimestamp from "@/lib/formate-firebase-timestamp";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function CommentItem({ allData }) {
  const { createdAt, userId, content } = allData;
  const [userData, setUserData] = useState({
    username: "Anonymous",
    profilePicture: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", userId);
        const userDoc = await getDoc(docRef);

        if (userDoc.exists() && isMounted) {
          const data = userDoc.data();
          setUserData({
            username: `${data.firstName} ${data.lastName}`,
            profilePicture: data.profilePicture,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <Card className="w-full">
      <CardContent className="py-3 space-y-2">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={userData.profilePicture}
              alt={`${userData.username}'s profile`}
            />
            <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground text-sm">
              {userData.username}
            </p>
            <p className="text-mutedForeground text-xs">
              {formatFirebaseTimestamp(createdAt)}
            </p>
          </div>
        </div>
        <div className="ml-11">
          <RichTextViewer
            content={content}
            className="text-sm text-foreground"
          />
        </div>
      </CardContent>
    </Card>
  );
}
