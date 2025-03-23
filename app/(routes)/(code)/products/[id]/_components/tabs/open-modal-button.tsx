"use client";

import FlooprFeedbackModalTimeout from "@/components/floopr-integration/modal-timout/imports/feedback-modal-timeout";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function OpenModalButton({ componentData, productData }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setIsOpen((prev) => !prev)}>
        Open
      </Button>
      {isOpen && (
        <FlooprFeedbackModalTimeout
          apiKey={componentData.apiKey}
          productId={productData.docId}
          componentId={componentData.componentData.componentId}
        />
      )}
    </>
  );
}
