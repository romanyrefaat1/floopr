"use client";

import { Button } from "../ui/button";
import { useChatbotContext } from "@/contexts/use-chatbot-context";
import { useUser } from "@clerk/nextjs";
import {
  Expand,
  ExpandIcon,
  Fullscreen,
  FullscreenIcon,
  Maximize,
  Minimize,
  Trash,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "react-chat-elements/dist/main.css";
import LoaderSpinner from "../loader-spinner";
import RichTextViewer from "../ui/rich-text-viewer";
import { cn } from "@/lib/utils";

const firstMess = {
  position: "left",
  type: "text",
  role: `model`,
  text: "Hi! I'm Prey, your AI assistant with Floopr. Ask me whatever you want to know about the feedbacks you have, what do you want to know?",
};

const keywords = {
  hash: [`#all-feedbacks`],
};

export default function ChatbotIndex({ productId }: { productId: string }) {
  const { user } = useUser();
  const { isOpen, openChatbot, closeChatbot, makeFullScreen, isFullScreen } =
    useChatbotContext();
  const [messages, setMessages] = useState([firstMess]);
  const [input, setInput] = useState("#all-feedbacks");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { position: "right", type: "text", role: `user`, text: input },
    ]);
    setLoading(true);

    // API call
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: input,
          messContext: messages,
          productId: productId,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          position: "left",
          type: "text",
          role: `model`,
          text: data.text || `Error findin reply: ${data.error}`,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          position: "left",
          type: "text",
          role: `model`,
          text: "Sorry, something went wrong.",
        },
      ]);
    }
    setLoading(false);
    setInput("");
    // setTimeout(() => {
    //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, 100);
  };

  return (
    <div
      className={cn(
        "block",
        isFullScreen && "relative w-full h-full",
        !isFullScreen && "fixed bottom-2 md:bottom-6 right-2 md:right-6 z-50"
      )}
    >
      {!isOpen && (
        <Button
          variant="outline"
          onClick={openChatbot}
          size="sm"
          className="gap-2 shadow-lg bg-background transition-all duration-300 h- flex items-center justify-center  hover:scale-105 aspect-square"
        >
          <Image
            className="flex items-center object-contain justify-center w-full h-full select-none"
            src="/images/assistant-avatar/prey.png"
            alt="Chatbot Icon"
            width={500}
            height={500}
          />
        </Button>
      )}
      {isOpen && (
        <div
          className={cn(
            "w-[350px] h-[500px] bg-background border rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-105 duration-200 overflow-hidden",
            isFullScreen && "w-full h-screen sticky top-0 inset-0 rounded-none"
          )}
        >
          <div className="flex justify-between items-center p-2 border-b backdrop-blur-sm">
            <span className="font-semibold">Chat with Prey</span>
            <div className="flex items-center gap-1">
              {!isFullScreen && (
                <Button size="icon" variant="ghost" onClick={closeChatbot}>
                  <X />
                </Button>
              )}
              <Button size="icon" variant="ghost" onClick={makeFullScreen}>
                {isFullScreen ? <Minimize size={12} /> : <Maximize size={12} />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setMessages([firstMess])}
              >
                <Trash size={12} />
              </Button>
            </div>
          </div>
          <div
            className={cn(
              "flex-1 flex flex-col p-2 overflow-x-hidden bg-background",
              isFullScreen && `h-full`
            )}
          >
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
                  <span className="block text-base break-words whitespace-pre-line text-wrap">
                    {msg.position === "left"
                      ? (() => {
                          // Regex to match hashtags (e.g., #all-feedbacks)
                          const hashtagRegex = /#[\w-]+/g;
                          const elements = [];
                          let lastIndex = 0;
                          let match;
                          while (
                            (match = hashtagRegex.exec(msg.text)) !== null
                          ) {
                            // Push text before hashtag
                            if (match.index > lastIndex) {
                              elements.push(
                                msg.text.slice(lastIndex, match.index)
                              );
                            }
                            // Check if hashtag is in keywords.hash
                            if (keywords.hash.includes(match[0])) {
                              elements.push(
                                <span
                                  key={match.index}
                                  className="text-red-500"
                                >
                                  {match[0]}
                                </span>
                              );
                            } else {
                              elements.push(match[0]);
                            }
                            lastIndex = match.index + match[0].length;
                          }
                          // Push remaining text
                          if (lastIndex < msg.text.length) {
                            elements.push(msg.text.slice(lastIndex));
                          }
                          return elements;
                        })()
                      : msg.text}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="self-start max-w-[80%] mb-2">
                <div className="rounded-lg px-4 py-2 bg-mutedBackground text-foreground shadow">
                  <span className="block text-sm font-medium mb-1 skeleton">
                    Prey is thinking...
                  </span>
                  <LoaderSpinner />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-2 border-t bg-background flex gap-2 items-center">
            <input
              ref={inputRef}
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
              {loading ? <LoaderSpinner /> : "Send"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
