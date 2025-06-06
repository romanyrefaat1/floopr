import { cn } from "@/lib/utils";
import { convertFromRaw } from "draft-js";
import React, { useMemo } from "react";

interface PlainTextViewerProps {
  content: object | string;
  truncate?: number; // maximum number of characters to display
  className?: string;
  style?: React.CSSProperties;
}

const PlainTextViewer: React.FC<PlainTextViewerProps> = ({
  content,
  truncate = 100,
  className = "",
  style = {},
}) => {
  // Use useMemo to only convert when content changes.
  const plainText = useMemo(() => {
    // Check if content is null, undefined, or an empty object
    if (
      !content ||
      (typeof content === "object" && Object.keys(content).length === 0)
    ) {
      return `No description`;
    }

    if (typeof content === `object`) {
      if ((content as any).blocks) {
        try {
          const contentState = convertFromRaw(content);
          return contentState.getPlainText();
        } catch (error) {
          console.error("Error converting raw content to plain text:", error);
          return "";
        }
      }
    } else if (typeof content === `string`) {
      return content;
    }
    return "";
  }, [content]);

  // If a truncate value is provided and plainText is longer, shorten it.
  const displayedText =
    typeof truncate === "number" && plainText.length > truncate
      ? plainText.slice(0, truncate) + "..."
      : plainText;

  return (
    <p
      className={cn(`text-secondaryForeground text-sm`, className)}
      style={style}
    >
      {displayedText}
    </p>
  );
};

export default PlainTextViewer;
