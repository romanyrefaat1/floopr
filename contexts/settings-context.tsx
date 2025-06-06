"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SettingsData {
  // Rest of the settings fields here
  theme: string;
  notificationsEnabled: boolean;
}

interface SettingsContextType {
  settings: SettingsData | null;
  setSettings: (settings: SettingsData) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export function SettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings: SettingsData;
  children: ReactNode;
}) {
  const [settings, setSettings] = useState<SettingsData | null>(
    initialSettings
  );
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
