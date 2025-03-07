"use client"

interface SignupFeedbackProps {
  status: "idle" | "loading" | "success" | "error"
  errorMessage: string
  onEarlyAdopterClick: () => void
}

export default function SignupFeedback({ status, errorMessage, onEarlyAdopterClick }: SignupFeedbackProps) {
  return (
    <>
      {status === "error" && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

      <div className="relative z-20">
        <p className="text-text-muted font-normal text-[14px] mt-[10px]">
          Join the waitlist and become one of our exclusive{" "}
          <button
            type="button"
            className="text-text underline cursor-pointer hover:text-secondary transition-colors"
            onClick={onEarlyAdopterClick}
          >
            early adopters
          </button>
        </p>
      </div>
    </>
  )
}

