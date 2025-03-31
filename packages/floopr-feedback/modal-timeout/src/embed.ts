import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client"
import ReactDOM from "react-dom";
import FlooprFeedbackModalTimeout from "./FlooprFeedbackModalTimeout";

// Ensure script is always parsed safely
const parseDataAttribute = (attr: string | null, defaultValue: any = {}) => {
  try {
    return attr ? JSON.parse(attr) : defaultValue;
  } catch (error) {
    console.error("Error parsing data attribute:", error);
    return defaultValue;
  }
};

const script = document.currentScript as HTMLScriptElement;

const apiBaseUrl = script.dataset.apiBaseUrl || "";
const apiKey = script.dataset.apiKey || "";
const productId = script.dataset.productId || "";
const componentId = script.dataset.componentId || "";
const userInfo = parseDataAttribute(script.dataset.userInfo ?? null);

const FeedbackWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutDuration, setTimeoutDuration] = useState(0);

  useEffect(() => {
    const loadTimeout = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/imports/components/load-component`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey, productId, componentId }),
        });
        const data = await response.json();
        if (response.ok) {
          setTimeoutDuration(data.timeoutDuration || 0);
        } else {
          console.error("Failed to load timeout duration:", data.error);
        }
      } catch (error) {
        console.error("Error loading timeout duration:", error);
      }
    };

    loadTimeout();
  }, []);

  useEffect(() => {
    if (timeoutDuration > 0) {
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
      apiBaseUrl={apiBaseUrl}
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