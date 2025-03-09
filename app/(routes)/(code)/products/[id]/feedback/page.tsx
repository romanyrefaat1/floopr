import { redirect } from "next/navigation"

export default async function FeedbackPage({params}: {params: {id: string}}) {
    const id = await params.feedbackId
    redirect(`/products/${id}`)
}