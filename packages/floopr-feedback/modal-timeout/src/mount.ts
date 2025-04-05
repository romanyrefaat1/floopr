import FlooprFeedbackModalTimeout from "./FlooprFeedbackModalTimeout";
import React from "react";
import { createRoot } from "react-dom/client";

export function mount(container: HTMLElement, props: any) {
  const root = createRoot(container);
  root.render(React.createElement(FlooprFeedbackModalTimeout, props));
  return () => root.unmount();
}

// Export the component directly
export { FlooprFeedbackModalTimeout };
