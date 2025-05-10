"use client";

import ChatbotIndex from "@/components/chatbot/chatbot-index";
import { GripVertical } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface ResizablePanelProps {
  productId: string;
  activeTab?: string;
  tabContent?: React.ReactNode;
}

export default function ResizablePanel({
  productId,
  activeTab,
  tabContent,
}: ResizablePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState<string>("65%");

  // Minimum width in pixels for both panels
  const MIN_PANEL_WIDTH = 300;

  // Re-initialize panel when tab changes or on first render
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Default to 65% for left panel, but ensure both panels respect min width
      const defaultLeftWidth = Math.max(
        MIN_PANEL_WIDTH,
        Math.min(containerWidth * 0.65, containerWidth - MIN_PANEL_WIDTH)
      );
      setLeftPanelWidth(`${(defaultLeftWidth / containerWidth) * 100}%`);
    }
  }, [activeTab]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const startLeftWidth = leftPanelRef.current?.offsetWidth || 0;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;

      const delta = moveEvent.clientX - startX;
      const containerWidth = containerRef.current.offsetWidth;

      // Calculate new width ensuring minimum widths for both panels
      const newLeftWidth = Math.max(
        MIN_PANEL_WIDTH,
        Math.min(containerWidth - MIN_PANEL_WIDTH, startLeftWidth + delta)
      );

      // Set as percentage of container
      setLeftPanelWidth(`${(newLeftWidth / containerWidth) * 100}%`);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "col-resize";
  };

  return (
    <div ref={containerRef} className="flex h-full w-full">
      {/* Left Panel - Tab Content */}
      <div
        ref={leftPanelRef}
        className="overflow-auto"
        style={{
          width: leftPanelWidth,
          minWidth: MIN_PANEL_WIDTH,
        }}
      >
        <div className="px-4 py-6 h-full">{tabContent}</div>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="cursor-col-resize flex items-center justify-center w-6 hover:bg-secondary/20 flex-shrink-0 bg-border/10"
      >
        <GripVertical className="h-6 w-6 text-muted-foreground" />
      </div>

      {/* Right Panel - Chatbot */}
      <div
        className="overflow-auto flex-1"
        style={{
          minWidth: MIN_PANEL_WIDTH,
        }}
      >
        <ChatbotIndex productId={productId} />
      </div>
    </div>
  );
}
