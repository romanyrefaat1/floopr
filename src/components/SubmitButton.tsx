"use client"
import { useContent } from "../hooks/useContent"

interface SubmitButtonProps {
  status: "idle" | "loading" | "success" | "error"
  isEmailServiceReady: boolean
}

export default function SubmitButton({ status, isEmailServiceReady }: SubmitButtonProps) {
  const { emailSignup } = useContent()

  const getButtonText = () => {
    switch (status) {
      case "loading":
        return emailSignup.buttonStatus.loading
      case "success":
        return emailSignup.buttonStatus.success
      case "error":
        return emailSignup.buttonStatus.error
      default:
        return emailSignup.buttonStatus.default
    }
  }

  return (
    <button
      type="submit"
      className={`px-6 py-3 rounded-md text-sm font-semibold 
        transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto
        ${
          status === "error"
            ? "bg-red-500 text-white hover:bg-red-600"
            : status === "success"
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-secondary text-primary hover:bg-secondary/90 active:scale-95"
        }`}
      disabled={status === "loading" || !isEmailServiceReady}
    >
      {getButtonText()}
    </button>
  )
}

