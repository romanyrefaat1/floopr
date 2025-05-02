"use client";

import React, { createContext, useState } from "react";

export interface ChatbotContextType {
  isOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
}

export const ChatbotContext = createContext<ChatbotContextType | undefined>(
  undefined
);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);

  return (
    <ChatbotContext.Provider value={{ isOpen, openChatbot, closeChatbot }}>
      {children}
    </ChatbotContext.Provider>
  );
};
