"use client";

import React from "react";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import DOMPurify from "dompurify";

interface RichTextViewerProps {
  content: string | object;
  className?: string;
  style?: React.CSSProperties;
}

const RichTextViewer: React.FC<RichTextViewerProps> = ({ 
  content, 
  className = "", 
  style = {} 
}) => {
  // Handle empty content or "No description" case
  if (!content || content === "No description") {
    return <p className="text-sm text-secondaryForeground">No description</p>;
  }
  console.log("Content type:", typeof content);
  console.log("Content:", content);
  
  const renderContent = () => {
    try {
      // Parse content if it's a string, otherwise use it directly
      let rawContentState: object;
      
      if (typeof content === 'string') {
        try {
          console.log("Content causing error:", content);
          rawContentState = content;
          console.log("Parsed content:", rawContentState);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          console.log("Content causing error:", content);
          return { __html: `<p>Content format error</p>` };
        }
      } else {
        rawContentState = content;
      }
      
      // Validate that we have a proper DraftJS raw content state
      if (!rawContentState.blocks || !Array.isArray(rawContentState.blocks)) {
        console.error("Invalid content structure:", rawContentState);
        return { __html: `<p>Invalid content structure</p>` };
      }
      
      // Convert from raw DraftJS format
      const contentState = convertFromRaw(rawContentState);
      
      // Options for HTML conversion
      const options = {
        inlineStyles: {
          BOLD: { element: 'strong' },
          ITALIC: { element: 'em' },
          UNDERLINE: { element: 'u' },
          CODE: { 
            element: 'code',
            style: {
              backgroundColor: 'var(--background, #f5f5f5)',
              color: 'var(--foreground-secondary, #eee)',
              fontFamily: 'monospace',
              padding: '2px 4px',
              borderRadius: '4px',
            }
          }
        },
        blockStyleFn: (block) => {
          const type = block.getType();
          if (type === 'unordered-list-item') {
            return {
              element: 'li',
              wrapper: '<ul class="list-disc pl-5 my-2"></ul>'
            };
          } else if (type === 'ordered-list-item') {
            return {
              element: 'li',
              wrapper: '<ol class="list-decimal pl-5 my-2"></ol>'
            };
          }
          return null;
        }
      };
      
      // Convert to HTML
      const html = stateToHTML(contentState, options);
      
      // Sanitize the HTML to prevent XSS attacks
      const sanitizedHtml = DOMPurify.sanitize(html);
      
      return { __html: sanitizedHtml };
    } catch (error) {
      console.error("Error rendering rich text content:", error);
      return { __html: "<p>Error rendering content</p>" };
    }
  };

  return (
    <div 
      className={`rich-text-content ${className}`}
      style={style}
      dangerouslySetInnerHTML={renderContent()}
    />
  );
};

export default RichTextViewer;