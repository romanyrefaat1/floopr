"use client";

import { Button } from "../ui/button";
import { useChatbotContext } from "@/contexts/use-chatbot-context";
import { useUser } from "@clerk/nextjs";
import { Maximize, Minimize, SendIcon, Trash, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "react-chat-elements/dist/main.css";
import LoaderSpinner from "../loader-spinner";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import WarnChatbotLimit from "../warn/warn-chatbot-limit";
import { usePricing } from "@/context/pricing-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const firstMess = {
  position: "left",
  type: "text",
  role: `model`,
  text: "Hi! I'm Prey, your AI assistant with Floopr. How can I help you today?",
};

const keywords = {
  hash: [`#all-feedbacks`],
};

export default function ChatbotIndex({ productId }: { productId: string }) {
  const { user } = useUser();
  const {
    isOpen,
    openChatbot,
    closeChatbot,
    makeFullScreen,
    isFullScreen,
    drajedContext,
    removeItemFromDrajedContext,
    isDrain,
    makeMouseInsideContainer,
    removeMouseInsideContainer,
    feedbacks,
    changelog,
    settings,
  } = useChatbotContext();
  const [messages, setMessages] = useState([firstMess]);
  const [input, setInput] = useState("#all-feedbacks");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { userSubscription, isExceededChatbotLimit, openModal } = usePricing();
  const { chatbot_messages_monthly, limit_chatbot_messages_monthly } =
    userSubscription;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (isExceededChatbotLimit) {
      openModal({
        error: `Sorry you exceeded your chatbot messages limit for this month. Please check the plans below to upgrade.`,
        content: {
          plans: {
            free: {
              button: "Continue without chatbot messages",
            },
          },
        },
      });
      return;
    }
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
          drajedContext,
          feedbacks,
          changelog,
          settings,
        }),
      });

      if (res.status === 403) {
        openModal({
          error: `Sorry you exceeded your chatbot messages limit for this month. Please check the plans below to upgrade.`,
          content: {
            plans: {
              free: {
                button: "Continue without chatbot messages",
              },
            },
          },
        });
        return;
      }

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
        "block w-fit max-w-screen fixed bottom-[2.5rem] md:bottom-[5.5rem] z-50",
        isFullScreen && "h-screen right-0 sticky top-0 md:w-1/2",
        isFullScreen && isOpen && `flex-1 md:min-w-[450px] lg:min-w-[520px]`,
        !isFullScreen && "right-7"
        // !isFullScreen && "fixed bottom-[5.5rem] md:bottom-[5.5rem] right-7 z-50"
      )}
      onDragEnter={(e) => {
        e.preventDefault();
        makeMouseInsideContainer();
      }}
      onDragOver={(e) => {
        // Without this, dragEnter/Leave won’t continue firing
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        removeMouseInsideContainer();
      }}
    >
      {!isOpen && (
        <Button
          variant="outline"
          onClick={openChatbot}
          size="sm"
          className="gap-2 w-fit shadow-lg bg-background transition-all duration-300 h- flex items-center justify-center  hover:scale-105 aspect-square"
        >
          <Image
            className="flex items-center object-contain justify-center w-[10px] h-[10px] rounded-full select-none"
            src="/images/assistant-avatar/prey.png"
            alt="Chatbot Icon"
            width={900}
            height={900}
          />
          {` `}
          Chat with Prey
        </Button>
      )}
      {isOpen && (
        <div
          className={cn(
            "sticky top-0 right-0 bg-background border rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-105 duration-200 overflow-hidden",
            isFullScreen && "w-full h-full sticky top-0 inset-0 rounded-none",
            !isFullScreen && ` w-[300px] h-[450px] md:w-[450px] md:h-[500px]`
          )}
        >
          {isDrain && (
            <div className="absolute top-0 left-0 w-full h-full bg-floopr-purple-light opacity-20 fade-in-50" />
          )}

          {/* Top */}
          <div className="flex justify-between items-center p-2 border-b backdrop-blur-sm">
            <span className="font-semibold flex items-center text-sm">
              <Image
                src={`/images/assistant-avatar/prey.png`}
                width={200}
                height={200}
                alt="Prey Icon"
                className="rounded-full w-5 h-5 mr-2 inline-block"
              />{" "}
              Prey
            </span>
            <div className="flex items-center gap-1">
              {!isFullScreen && (
                <Button size="icon" variant="ghost" onClick={closeChatbot}>
                  <X />
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                className="hidden md:flex"
                onClick={makeFullScreen}
              >
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

          {/* Messages */}
          <div
            className={cn(
              "relative flex-1 flex flex-col p-2 overflow-x-hidden z-[2] scrollbar-thin scrollbar-thumb-mutedScrollbar scrollbar-track-transparent scrollbar-hide",
              isFullScreen && `h-full`
            )}
          >
            {messages.length < 2 && !isExceededChatbotLimit && (
              <div className="absolute hidden md:flex w-fit top-1/2 left-1/2 bg-mutedBackground p-2 rounded-xl transform -translate-x-1/2 -translate-y-1/2 text-mutedForeground flex flex-col">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/images/assistant-avatar/prey.png`}
                    width={200}
                    height={200}
                    alt="Prey Icon"
                    className={cn(
                      "rounded-full w-5 h-5 mr-2 inline-block select-none",
                      isExceededChatbotLimit && "animate-pulse"
                    )}
                  />
                  <p className="text-sm w-fit">
                    {isExceededChatbotLimit
                      ? `You exceeded your ${limit_chatbot_messages_monthly} qouta in your plan. Please upgrade your plan to continue.`
                      : `You can drag any feedback into the chat`}
                  </p>
                </div>
                <p className="text-xs text-destructive mt-4 animate-pulse">
                  {chatbot_messages_monthly}/{limit_chatbot_messages_monthly}
                </p>
              </div>
            )}
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
                    {msg.position === "right" ? (
                      user?.firstName || "You"
                    ) : (
                      <span className="flex items-center text-sm">
                        <Image
                          src={`/images/assistant-avatar/prey.png`}
                          width={200}
                          height={200}
                          alt="Prey Icon"
                          className="rounded-full w-4 h-4 mr-2 inline-block"
                        />
                        {` `} Prey
                      </span>
                    )}
                  </span>
                  {msg.position === "left" ? (
                    <div
                      className={`prose prose-sm dark:text-white/90 leading-6`}
                    >
                      <ReactMarkdown
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-4xl font-extrabold my-6"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-3xl font-bold my-5"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p
                              className="text-base leading-7 mb-4"
                              {...props}
                            />
                          ),
                          a: ({ node, ...props }) => (
                            <Link
                              className="text-blue-600 hover:underline"
                              target="_blank"
                              {...props}
                            />
                          ),
                          code: ({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) => {
                            if (inline) {
                              return (
                                <code
                                  className="bg-gray-100 px-1 rounded text-sm"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            }
                            // block code
                            return (
                              <pre className="bg-secondary text- p-4 rounded overflow-x-auto">
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              </pre>
                            );
                          },
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc list-inside mb-4 mr-3"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-1 ml-2" {...props} />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
                              {...props}
                            />
                          ),
                          // add more overrides as needed…
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span className="text-sm dark:text-foreground break-words whitespace-pre-line text-wrap">
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
            <WarnChatbotLimit />

            <div ref={chatEndRef} className="mb-52" />
          </div>
          {/* <div className="px-12 py-4 -t bg-transparent flex gap-2 items-center"> */}

          <div
            className={cn(
              "absolute h-[150px] w-full bg-gradient-to-t from-primary to-transparent bottom-0 opacity-5 z-[-1]"
              // isFullScreen && `sticky top-0`
            )}
          />
          {/* bg-gradient-to-t from-primary to-transparent */}

          <div
            className="absolute py-4 px-12 w-full bottom-0 left-1/2 -translate-x-1/2 h-fit 
                 p-1 z-[3]"
          >
            {/* Context */}
            <div className="flex gap-3 flex-wrap transition mb-2">
              {/* {JSON.stringify(drajedContext.map((item) => item.productId))} */}
              {drajedContext.length > 0 &&
                drajedContext.map((item) => (
                  <Link href={`/${item.productId}/${item.id}`} target="_blank">
                    <Button
                      // size={`icon`}
                      variant={`outline`}
                      className="rounded-md bg-mutedBackground text-mutedForeground w-fit px-3 py-1  flex items-center justify-center gap-2 text-sm aspect-square hover:bg-destructive/40"
                    >
                      <Button
                        variant={`destructive`}
                        className={`w-2 h-2 p-2 flex items-center justify-center bg-mutedBackground`}
                        size={`icon`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeItemFromDrajedContext(item.feedbackId);
                        }}
                      >
                        <X />
                      </Button>
                      {item.feedback.title || `No title`}
                    </Button>
                  </Link>
                ))}
              {/* Clear all context */}
              {/* <Button
                // size={`icon`}
                variant={`outline`}
                className="rounded-md bg-mutedBackground text-mutedForeground w-fit px-3 py-1  flex items-center justify-center gap-2 text-sm aspect-square hover:bg-destructive/40"
              >
                <Button
                  variant={`destructive`}
                  className={`w-2 h-2 p-2 flex items-center justify-center bg-mutedBackground`}
                  size={`icon`}
                  onClick={(e) => {
                    // removeItemFromDrajedContext(item.feedbackId);
                  }}
                >
                  <Trash2 />
                  Clear All
                </Button>
              </Button> */}
            </div>

            <div className="flex gap-2 items-center">
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
        </div>
      )}
    </div>
  );
}
