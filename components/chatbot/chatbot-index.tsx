"use client";

import { Button } from "../ui/button";
import { useChatbotContext } from "@/contexts/use-chatbot-context";
import { useUser } from "@clerk/nextjs";
import React, { useRef, useState } from "react";
import "react-chat-elements/dist/main.css";

export default function ChatbotIndex() {
  const { user } = useUser();
  const { isOpen, openChatbot, closeChatbot } = useChatbotContext();
  const [messages, setMessages] = useState([
    {
      position: "left",
      type: "text",
      text: "Hi! I'm Prey, your AI assistant with Floopr. Ask me whatever you want to know about the feedbacks you have, what do you want to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { position: "right", type: "text", text: input },
    ]);
    setLoading(true);

    // Placeholder API call
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, allMessages: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { position: "left", type: "text", text: data.reply || "Yoo" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          position: "left",
          type: "text",
          text: "Sorry, something went wrong.",
        },
      ]);
    }
    setLoading(false);
    setInput("");
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          variant="outline"
          onClick={openChatbot}
          size="sm"
          className="gap-2 shadow-lg bg-background transition-all duration-300 hover:scale-105"
        >
          Open Chatbot
        </Button>
      )}
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-background border rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom- duration-200 overflow-hidden">
          <div className="flex justify-between items-center p-2 border-b backdrop-blur-sm">
            <span className="font-semibold">Chatbot</span>
            <Button size="icon" variant="ghost" onClick={closeChatbot}>
              ×
            </Button>
          </div>
          <div className="flex-1 flex flex-col p-2 overflow-y-auto bg-background">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.position === "right"
                    ? "self-end max-w-[80%] mb-2"
                    : "self-start max-w-[80%] mb-2"
                }
              >
                <div
                  className={
                    msg.position === "right"
                      ? "rounded-lg px-4 py-2 bg-floopr-purple text-white shadow"
                      : "rounded-lg px-4 py-2 bg-mutedBackground text-foreground shadow"
                  }
                >
                  <span className="block text-sm font-medium mb-1">
                    {msg.position === "right"
                      ? user?.firstName || "You"
                      : "Prey"}
                  </span>
                  <span className="block text-base whitespace-pre-line">
                    {msg.text}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-2 border-t bg-background flex gap-2">
            <input
              className="flex-1 rounded-lg border border-input bg-mutedBackground px-3 py-2 text-foreground placeholder:text-mutedForeground focus:outline-none focus:ring-2 focus:ring-floopr-purple transition text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
              disabled={loading}
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              size="sm"
              className="ml-2"
            >
              {loading ? "..." : "Send"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
