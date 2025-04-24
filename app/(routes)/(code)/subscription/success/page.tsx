import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const { session_id } = searchParams;

  if (!session_id) {
    redirect("/");
  }

  try {
    const response = await fetch(
      `https://api.dodopayments.com/v1/subscriptions/sessions/${session_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DODO_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to verify subscription");
    }

    const data = await response.json();

    // Update database and handle success
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Subscription Successful! 🎉</h1>
        <p className="text-lg mb-8">
          You&apos;re now subscribed to our $9/month plan.
        </p>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Go to Dashboard
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Subscription verification failed:", error);
    redirect("/subscription/error");
  }
}
