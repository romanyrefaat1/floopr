import { CheckCircle } from "lucide-react"

const ModalContent = () => {
  return (
    <div className="space-y-6 pb-4">
      <section>
        <h2 className="text-xl sm:text-2xl text-text font-medium mb-3">Here's how it works:</h2>
        <ul className="space-y-2 list-disc pl-5 text-base sm:text-lg">
          <li className="text-text">Be one of the first 200 people to join our waitlist.</li>
          <li className="text-text-muted">
            Use MainFocus to earn Focus Points by crushing your goals and staying in the zone.
          </li>
          <li className="text-text-muted">Compete with fellow early adopters to climb the leaderboard.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl text-text font-medium mb-3">And the rewards? Oh, they're worth it:</h2>
        <ul className="space-y-3">
          {rewards.map((reward, index) => (
            <li key={index} className="flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
              <span className={reward.className}>{reward.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <p className="text-lg sm:text-xl lg:text-2xl text-text">
          This is your chance to shape the future of focus and be part of something groundbreaking. Let's make
          productivity fun, rewarding, and a little bit competitive!
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl text-text">
          👉 <span className="font-bold">Spots are limited,</span> so act fast. Join the waitlist today and secure your
          place in the game! <span className="font-bold">Ready, set... FOCUS! 🏆</span>
        </p>
      </section>
    </div>
  )
}

const rewards = [
  {
    text: "🥇 50% off a Lifetime Subscription – because champions deserve premium perks!",
    className: "text-background-light",
  },
  {
    text: "🌟 EarlyWarrior Status – a permanent badge of honor in our community (flex-worthy).",
    className: "text-text-muted",
  },
  {
    text: "👕 Exclusive MainFocus T-shirt – show off your EarlyWarrior pride in style!",
    className: "text-secondary",
  },
]

export default ModalContent

