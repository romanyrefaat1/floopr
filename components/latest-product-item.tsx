import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type LatestProductItemProps = {
  description: string;
  name: string;
  profileURL?: string;
  title: string;
  likesCount: number;
  commentsCount: number;
  tags?: Array<{
    id: string;
    type: string;
    name: string;
  }>;
  productName: string;
  productRoute: string;
  style?: {
    accentColor: string;
    animation: string;
    backgroundColor: string;
    borderRadius: string;
    fontFamily: string;
    fontSize: string;
    headingStyle: string;
    layout: string;
    primaryColor: string;
    secondaryColor: string;
    shadowStyle: string;
    spacing: string;
    textColor: string;
  };
  docId?: string;
  ownerId?: string;
};

const LatestProductItem = ({
  description,
  name,
  profileURL,
  title,
  likesCount,
  commentsCount,
  tags = [],
  productName,
  productRoute,
  style = {},
  docId,
}: LatestProductItemProps) => {
  const truncatedDescription =
    description && description.length > 100
      ? description.substring(0, 100) + "..."
      : description || "";

  // Get badge status color based on name
  const getBadgeColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "in progress":
        return "#f5a623"; // Amber
      case "completed":
        return "#0070f3"; // Vercel blue
      default:
        return "#666"; // Subtle gray
    }
  };

  return (
    <div className="group border bg-secondaryBackground border-border rounded-lg p-6 mb-4 transition-all duration-200 hover:shadow-md transform hover:-translate-y-1">
      {/* Tags/Badges Section */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-xl mb-4">
          {tags.map(
            (tag) =>
              tag && (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor:
                      tag.type === "admin"
                        ? "hsl(var(--primary))"
                        : `${getBadgeColor(tag.name)}10`,
                    color: getBadgeColor(tag.name),
                    border: `1px solid ${getBadgeColor(tag.name)}30`,
                  }}
                >
                  {tag.name}
                </span>
              )
          )}
        </div>
      )}

      {/* Header with Profile and Title */}
      <div className="flex items-center mb-4">
        {profileURL ? (
          <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden border border-muted">
            <Image
              fill
              src={profileURL}
              alt={`${name}'s profile picture`}
              className="object-cover"
              sizes="40px"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full mr-3 flex items-center justify-center text-primary-foreground bg-primary">
            <span className="text-sm font-bold">
              {name ? name.charAt(0).toUpperCase() : "?"}
            </span>
          </div>
        )}

        <div className="flex-1 text-foreground">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-mutedForeground">{productName}</p>
        </div>
      </div>

      {/* Title as a prominent heading */}
      <h2 className="text-xl font-bold text-foreground mb-[10px] group-hover:text-primary transition-colors">
        {title}
      </h2>

      {/* Description */}
      <p className="text-secondaryForeground text-sm leading-relaxed mb-6">
        {truncatedDescription || `No description`}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end gap-4 mt-4">
        <Link href={`/${docId}`}>
          <Button role="div" variant="default">
            Visit
          </Button>
        </Link>
        <Link href={`/products/${docId}`}>
          <Button role="div" variant="outline">
            Go Dashboard
          </Button>
        </Link>
      </div>

      {/* Footer with stats */}
      {/* <div className="flex items-center text-sm text-mutedForeground pt-4 mt-4 border-t border-border">
        <div className="flex items-center mr-4">
          <svg 
            className="w-4 h-4 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          {likesCount}
        </div>
        <div className="flex items-center">
          <svg 
            className="w-4 h-4 mr-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
          {commentsCount}
        </div>
      </div> */}
    </div>
  );
};

export default LatestProductItem;
