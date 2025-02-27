import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";

export type FeedbackItemProps = {
  desc: string;
  username: string;
  profileURL?: string;
  title: string;
  likesCount: number;
  commentsCount: number;
  tags?: object[];
  productName: string;
  productRoute: string;
};

const FeedbackItem = ({
  desc,
  username,
  profileURL,
  title,
  likesCount,
  commentsCount,
  tags,
  productName,
  productRoute,
}: FeedbackItemProps) => {
  const truncatedDesc =
    desc.length > 100 ? desc.substring(0, 100) + "..." : desc;

  const adminBadge =
    tags &&
    tags.map((item) =>
      item.type === "admin" ? (
        item.name === "In progress" ? (
          <p key={item.id}>{item.name}</p>
        ) : item.name === "completed" ? (
          <p key={item.id}>{item.name}</p>
        ) : (
          <p key={item.id}>{item.name}</p>
        )
      ) : null
    );

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      {adminBadge && (
        <div className="w-full flex justify-end">{adminBadge}</div>
      )}
      <div className="flex items-center mb-2">
        {profileURL ? (
          <Image
            width={10}
            height={10}
            src={profileURL}
            alt={`${username}'s profile picture`}
            className="w-10 h-10 rounded-full mr-3"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
            <span className="text-white font-bold">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h3 className="text-lg">
            <Link href={productRoute}>{productName}</Link>:{" "}
            <span className="font-semibold">{title}</span>
          </h3>
          <p className="text-sm text-gray-500">{username}</p>
        </div>
      </div>
      <p className="mb-2">{truncatedDesc}</p>
      <div className="flex space-x-4 text-sm text-gray-700">
        <Button variant={`ghost`}>
          <ThumbsUp /> {likesCount}
        </Button>
        <Button variant={`ghost`}>
          <MessageCircle size={24} color="currentColor" /> {commentsCount}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackItem;
