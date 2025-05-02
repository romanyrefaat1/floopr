import { ChatbotContext } from "./chatbot-context";
import { useContext } from "react";

export const useChatbotContext = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbotContext must be used within a ChatbotProvider");
  }
  return context;
};
