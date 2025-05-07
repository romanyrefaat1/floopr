import FlooprFloatingFeedbackButton from "./floating-feedback-button";
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
const apiKey = script.dataset.apiKey || "";
const productId = script.dataset.productId || "";
const componentId = script.dataset.componentId || "";
const userInfo = parseDataAttribute(script.dataset.userInfo);

const FeedbackWrapper = () => {
  return (
    <FlooprFloatingFeedbackButton
      apiKey={apiKey}
      productId={productId}
      componentId={componentId}
      userId={userInfo.userId}
      username={userInfo.userName}
      userImage={userInfo.userImage}
    />
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<FeedbackWrapper />);
