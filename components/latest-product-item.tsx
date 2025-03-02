import { Button } from "./ui/button";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// import { Badge } from "./ui/badge";

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
  const truncateddescription =
    description && description.length > 100
      ? description.substring(0, 100) + "..."
      : description || "";

  // Get badge status color based on name
  const getBadgeVariant = (name: string) => {
    switch (name.toLowerCase()) {
      case "in progress":
        return "warning";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  // Apply custom styling if provided
  const customStyle = {
    backgroundColor: style.backgroundColor || "#ffffff",
    color: style.textColor || "#212529",
    borderRadius: style.borderRadius || "4px",
    fontFamily: style.fontFamily || "Arial, sans-serif",
    boxShadow:
      style.shadowStyle === "soft" ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
  };

  return (
    <Link href={`/products/${docId}`}>
      <div
        className="rounded p-4 mb-4 transition-all duration-200 hover:shadow-lg"
        style={customStyle}
      >
        {/* Tags/Badges Section */}
        {tags && tags.length > 0 && (
          <div className="w-full flex justify-end gap-2 mb-3">
            {tags.map(
              (tag) =>
                tag && (
                  //   <Badge
                  //     key={tag.id}
                  //     variant={getBadgeVariant(tag.name)}
                  //     style={{ backgroundColor: tag.type === "admin" ? style.accentColor : undefined }}
                  //     className="text-xs font-medium px-2 py-1"
                  //   >
                  //     {tag.name}
                  //   </Badge>
                  <div key={tag.id}>{tag.name}</div>
                )
            )}
          </div>
        )}

        {/* Header with Profile and Title */}
        <div className="flex items-center mb-3">
          {profileURL ? (
            <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden">
              <Image
                fill
                src={profileURL}
                alt={`${name}'s profile picture`}
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-white"
              style={{ backgroundColor: style.primaryColor || "#007bff" }}
            >
              <span className="text-lg font-bold">
                {name ? name.charAt(0).toUpperCase() : "?"}
              </span>
            </div>
          )}

          <div className="flex-1">
            <h3
              className="text-lg lg:text-xl"
              style={{
                fontWeight: style.headingStyle === "bold" ? "bold" : "normal",
              }}
            >
              <Link
                href={productRoute || "#"}
                className="hover:underline"
                style={{ color: style.primaryColor || "#007bff" }}
              >
                {name}
              </Link>
            </h3>
          </div>
        </div>

        {/* descriptionription */}
        <p className="mb-4" style={{ fontSize: style.fontSize || "16px" }}>
          {truncateddescription}
        </p>
      </div>
    </Link>
  );
};

export default LatestProductItem;
