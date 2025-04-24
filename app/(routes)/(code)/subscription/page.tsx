// Example usage in app/pricing/page.tsx
import SubscribeButton from "@/components/payment/subscribe-button";

export default function PricingPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Choose Your Plan</h1>
      <div className="max-w-sm p-6 border rounded-lg">
        <h2 className="text-xl mb-2">Monthly Plan</h2>
        <p className="text-3xl font-bold mb-4">$9/month</p>
        <SubscribeButton />
      </div>
    </div>
  );
}
