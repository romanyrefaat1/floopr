"use client";

import React, { createContext, useEffect, useState } from "react";

export interface ChatbotContextType {
  isOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  makeFullScreen: () => void;
  isFullScreen: boolean;
  startDraj: (feedbackId: string) => void;
  isDrain: boolean;
  dropDraj: () => void;
  isDrajable: boolean;
  drajedContext: Array<any>;
  makeMouseInsideContainer: () => void;
  removeMouseInsideContainer: () => void;
  removeItemFromDrajedContext: (feedbackId) => void;
}

export const ChatbotContext = createContext<ChatbotContextType | undefined>(
  undefined
);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("chatbotFullScreen");
      return stored === "true";
    }
    return true;
  });
  const [isDrain, setIsDrain] = useState(false);
  const [drainValue, setDrainValue] = useState(null);
  const [drajedContext, setDrajedContext] = useState([]);
  const isDrajable = isFullScreen || isOpen;
  const [isMouseInsideContainer, setIsMouseInsideContainer] =
    useState<boolean>();

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => {
    setIsOpen(false);
    setIsFullScreen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("chatbotFullScreen", "false");
    }
  };
  const makeFullScreen = () => {
    setIsFullScreen((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("chatbotFullScreen", next.toString());
      }
      return next;
    });
  };
  const startDraj = (feedbackId) => {
    if (!isDrajable) return;
    setIsDrain(true);
    setDrainValue(feedbackId);
  };
  const dropDraj = () => {
    if (!isDrajable) return;
    setIsDrain(false);
    if (isMouseInsideContainer) {
      setDrajedContext((prev) => [...prev, drainValue]);
    }
    setDrainValue(null);
  };
  const makeMouseInsideContainer = () => {
    // if (isDrain) {
    setIsMouseInsideContainer(true);
    // }
  };
  const removeMouseInsideContainer = () => {
    // if (isDrain) {
    setIsMouseInsideContainer(false);
    // }
  };
  const removeItemFromDrajedContext = (feedbackId) => {
    setDrajedContext((prev) =>
      prev.filter((item) => item.feedbackId !== feedbackId)
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "j" || e.key === "J")) {
        e.preventDefault();
        console.log("Ctrl + J pressed");
        if (isOpen) {
          closeChatbot();
        } else {
          openChatbot();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (isFullScreen) {
      openChatbot();
    }
  }, []);

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        openChatbot,
        closeChatbot,
        makeFullScreen,
        isFullScreen,
        startDraj,
        isDrain,
        dropDraj,
        isDrajable,
        drajedContext,
        makeMouseInsideContainer,
        removeMouseInsideContainer,
        removeItemFromDrajedContext,
      }}
    >
      <div className="text-red-500">
        {isMouseInsideContainer ? `yes` : `no`} IsMouseInsideContainer
      </div>
      <div className={"relative"}>{children}</div>
    </ChatbotContext.Provider>
  );
};
