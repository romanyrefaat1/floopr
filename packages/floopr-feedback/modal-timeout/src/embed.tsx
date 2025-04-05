import FlooprFeedbackModalTimeout from "./FlooprFeedbackModalTimeout";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const parseDataAttribute = (attr: string | undefined) => {
  try {
    return attr ? JSON.parse(attr) : {};
  } catch (error) {
    console.error("Error parsing data attribute:", error);
    return {};
  }
};

const script = document.currentScript as HTMLScriptElement;
const apiBaseUrl = "http://localhost:3000";
// const apiBaseUrl = "https://floopr.vercel.app";
const apiKey = script.dataset.apiKey || "";
const productId = script.dataset.productId || "";
const componentId = script.dataset.componentId || "";
const userInfo = parseDataAttribute(script.dataset.userInfo);

const FeedbackWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutDuration, setTimeoutDuration] = useState(0);

  useEffect(() => {
    const loadTimeout = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/imports/components/load-component`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey, productId, componentId }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(`data.timeoutDuration`, data.timeoutDuration);
          setTimeoutDuration(data.timeoutDuration || 0);
        } else {
          console.error(
            "Error loading timeout duration, Response not ok:",
            data.error
          );
        }
      } catch (error) {
        console.error("Error loading timeout time from embed.tsx:", error);
      }
    };
    loadTimeout();
  }, []);

  useEffect(() => {
    if (timeoutDuration >= 0) {
      const timer = setTimeout(() => setIsOpen(true), timeoutDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [timeoutDuration]);

  return (
    <FlooprFeedbackModalTimeout
      apiKey={apiKey}
      productId={productId}
      componentId={componentId}
      userInfo={userInfo}
      ImageComponent="img"
      LinkComponent="a"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<FeedbackWrapper />);
