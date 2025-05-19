"use client";

import { useView, VIEW_MODES } from "../../view-context/view-context";

export default function ContentTabTitle() {
  const { mode } = useView();

  return (
    <h3 className="text-lg font-medium">
      All {mode === VIEW_MODES.GROUP ? `Groups` : `Feedback`}
    </h3>
  );
}
