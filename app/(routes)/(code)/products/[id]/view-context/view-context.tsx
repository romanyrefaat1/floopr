"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export const VIEW_MODES = {
  NORMAL: "normal",
  GROUP: "group",
};

const ViewContext = createContext({
  mode: VIEW_MODES.NORMAL,
  setMode: () => {},
});

export const ViewProvider = ({ children }) => {
  // Initialize state from localStorage (fallback to NORMAL)
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("view_mode") || VIEW_MODES.NORMAL;
    }
    return VIEW_MODES.NORMAL;
  });

  // Persist mode changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("view_mode", mode);
    }
  }, [mode]);

  return (
    <ViewContext.Provider value={{ mode, setMode }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
};
