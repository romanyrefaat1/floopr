"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

interface TabsClientProps {
  children: React.ReactNode;
}

export default function TabsClient({ children }: TabsClientProps) {
  // read initial hash (without the leading '#'), default to 'feedback'
  const [value, setValue] = useState<string>(() =>
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash.substring(1)
      : "feedback"
  );

  // when value changes, update URL hash without scrolling
  const onValueChange = (newVal: string) => {
    setValue(newVal);
    history.replaceState(null, "", `#${newVal}`);
  };

  return (
    <Tabs value={value} onValueChange={onValueChange} className="space-y-4">
      {children}
    </Tabs>
  );
}
