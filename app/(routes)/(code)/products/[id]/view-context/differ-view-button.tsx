"use client";

import { useView, VIEW_MODES } from "./view-context";
import { Button } from "@/components/ui/button";
import { Eye, Group } from "lucide-react";

export default function DifferViewButton() {
  const { mode: viewMode, setMode } = useView();

  return (
    <Button
      variant={`outline`}
      size={`icon`}
      onClick={() =>
        viewMode === VIEW_MODES.NORMAL
          ? setMode(VIEW_MODES.GROUP)
          : setMode(VIEW_MODES.NORMAL)
      }
    >
      {viewMode === VIEW_MODES.GROUP ? <Eye /> : <Group />}
    </Button>
  );
}
