"use client";

import React, { createContext, useEffect, useState } from "react";

export interface ChatbotContextType {
  isOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  makeFullScreen: () => void;
  isFullScreen: boolean;
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
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
