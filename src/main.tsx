import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ModalProvider } from "./contexts/modalContext"
import { ContentProvider } from "./contexts/contentContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContentProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ContentProvider>
  </StrictMode>,
)

