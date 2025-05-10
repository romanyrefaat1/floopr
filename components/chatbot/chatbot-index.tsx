"use client";

import { Button } from "../ui/button";
import { useChatbotContext } from "@/contexts/use-chatbot-context";
import { useUser } from "@clerk/nextjs";
import { Maximize, Minimize, SendIcon, Trash, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "react-chat-elements/dist/main.css";
import LoaderSpinner from "../loader-spinner";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

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
        "block w-full",
        isFullScreen && " w-full h-full sticky top-0",
        !isFullScreen && "fixed bottom-[5.5rem] md:bottom-[5.5rem] right-7 z-50"
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
            "sticky top-0 w-[450px] h-[500px] bg-background border rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-105 duration-200 overflow-hidden",
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
              "flex-1 flex flex-col p-2 overflow-x-hidden z-[1] scrollbar-thin scrollbar-thumb-mutedScrollbar scrollbar-track-transparent scrollbar-hide",
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
                  {msg.position === "left" ? (
                    <div className={`prose prose-sm`}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    <span className="text-sm text-foreground break-words whitespace-pre-line text-wrap">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <Skeleton className="block w-full h-[30px] text-base break-words whitespace-pre-line text-wrap mt-4">
                Prey is reasoning
              </Skeleton>
            )}

            <div ref={chatEndRef} className="mb-52" />
          </div>
          {/* <div className="px-12 py-4 -t bg-transparent flex gap-2 items-center"> */}
          <div
            className={cn(
              "absolute h-[200px] w-full bg-gradient-to-t from-primary to-background bottom-0 opacity-5 z-[2]",
              isFullScreen && `sticky top-0`
            )}
          />
          {/* bg-gradient-to-t from-primary to-transparent */}
          <div
            className="absolute py-4 px-12 w-full bottom-0 left-1/2 -translate-x-1/2 h-fit flex gap-2 items-center
                 p-1 z-[3]"
          >
            <Textarea
              ref={inputRef}
              className={cn(
                "flex-1 transition-all ease-out rounded-[26px] p-4 pr-[60px] border border-input bg-background text-foreground placeholder:text-mutedForeground focus:outline-none focus:ring-2 focus:ring-floopr-purple text-sm resize-none max-h-[300px] hover:bg-secondary focus:min-h-[200px]",
                loading && "text-mutedForeground"
              )}
              style={{ fieldSizing: "content", width: `200px` }} // inline style needed for field-sizing
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey && !loading) {
                  handleSend();
                }
              }}
              disabled={loading}
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              size="sm"
              className="ml-2 rounded-full transition-all absolute top-[calc(50%- 5px)] right-[56px]"
            >
              {loading ? <LoaderSpinner /> : <SendIcon />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
