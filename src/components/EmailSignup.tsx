"use client"

import type React from "react"

import { useContext, useState } from "react"
import { Mail } from "lucide-react"
import { useContent } from "../hooks/useContent"
import { ModalContext } from "../contexts/modalContext"
import EarlyAdoptersModal from "./modals/EarlyAdoptersModal"
import SubmitButton from "./SubmitButton"
import saveEmail from "../utils/saveEmail"

interface EmailSignupProps {
  className?: string
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

export default function EmailSignup({ className = "", email, setEmail }: EmailSignupProps) {
  const { emailSignup } = useContent()
  const { changeModal } = useContext(ModalContext)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [isFocused, setIsFocused] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage(null)

    try {
      const result = await saveEmail(email)

      if (result.error) {
        setStatus("error")
        setErrorMessage(result.error)
      } else if (result.warning) {
        setStatus("success")
        setEmail("")
        // Optionally show a warning toast or message
      } else {
        setStatus("success")
        setEmail("")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("Failed to join waitlist. Please try again later.")
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${className} relative`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Mail
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
              isFocused ? "text-secondary" : "text-text-muted"
            }`}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={emailSignup.placeholder}
            className="w-full pl-12 pr-4 py-3 bg-primary text-text rounded-md border border-secondary focus:border-ring outline-none transition-all duration-200"
            required
          />
        </div>
        <SubmitButton status={status} isEmailServiceReady={true} />
      </div>
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      {status === "success" && <p className="text-green-500 text-sm mt-2">Successfully joined the waitlist!</p>}
      <p className="text-text-muted font-normal text-[14px] mt-[10px]">
        {emailSignup.subtitle.text}{" "}
        <span
          className="text-secondary inline cursor-pointer underline"
          onClick={() => changeModal(<EarlyAdoptersModal />)}
        >
          {emailSignup.subtitle.highlightPrize}
        </span>
      </p>
    </form>
  )
}

