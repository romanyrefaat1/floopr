"use client"
import { useState } from "react"

export default function EmailForm() {

    const [email, setEmail] = useState("")
    const handleJoinClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // validate email
        if (email.length<1) return;
        // send email
        const response = await fetch(`/api/waitlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
        const data = await response.json()
        if (response.ok) {
            setEmail("")
        }
    }

  return (
    <form className="flex w-full md:w-[500px] items-center gap-x-2" onSubmit={(e)=>handleJoinClick(e)}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email Address" className="w-full text-text flex-1 px-6 py-3 border border-secondary rounded-md text-sm font-semibold bg-background text-primary hover:bg-secondary/90" />
      <button
            className="px-6 py-3 w-fit rounded-md text-sm font-semibold bg-secondary text-primary hover:bg-secondary/40"
            type="submit"
          >
            Join Waitlist
          </button>
    </form>
  )
}