"use client";

import ChangelogAddDialog from "./changelog-add-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ChangelogAddButton({
  productId,
}: {
  productId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="default"
        className="flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-4 w-4" /> Add Changelog
      </Button>
      <ChangelogAddDialog open={open} setOpen={setOpen} productId={productId} />
    </>
  );
}
