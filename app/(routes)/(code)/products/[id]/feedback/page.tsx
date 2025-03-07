import { redirect } from "next/navigation"

export default function FeedbackPage({params}: {params: {id: string}}) {
    const id = params.feedbackId
    redirect(`/products/${id}`)
}