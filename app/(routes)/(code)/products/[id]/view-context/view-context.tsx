"use client";

import React, { createContext, useContext, useState } from "react";

export const VIEW_MODES = {
  NORMAL: "normal",
  GROUP: "group",
};

const ViewContext = createContext({
  mode: VIEW_MODES.NORMAL,
  setMode: (parameter) => {},
});

export const ViewProvider = ({ children }) => {
  const [mode, setMode] = useState(VIEW_MODES.NORMAL);

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
