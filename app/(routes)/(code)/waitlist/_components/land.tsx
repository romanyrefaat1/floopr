import SpecialBackgroundText from "@/components/special-background-text";
import EmailForm from "./email-form";

// const features = [
//     `Scale your startup fast, and easy`,
//     `Get feedback from your users`,
//     `Analyze feedback to improve products, based on metrics`,
//     `Access component library`,
//     `Apply badges to the hottest features your users need`
// ]

export default function Land() {
    return (
        <main className="flex flex-col justify-center w-fit items-center w-full h-[100vh] px-4 max-w-4xl mx-auto">
            <article className="text-center mb-4">
                <h1 className="text-3xl font-bold">Join DeaBoard Waitlist</h1>
                <p className="text-lg text-gray-600 p-4 md:px-[142px]">
                    Scale your startup with feedback, analytics, and 
                    components. Be the first to join DeaBoard
                    <SpecialBackgroundText text=", and earn a free 14-day trial."></SpecialBackgroundText>
                </p>
            </article>
            
            <div className="w-full mb-0 max-w-md">
                <EmailForm />
            </div>
            <p className="text-sm text-gray-500 p-4 md:px-[142px]">
                    We are working hard to bring DeaBoard to life.
                </p>

            {/* <article className="w-full">
                <h3 className="text-2xl font-semibold mb-4 text-center">Features you will love</h3>
                <ul className="space-y-2 max-w-md mx-auto">
                    {features.map((feature) => (
                        <li 
                            key={feature} 
                            className="bg-gray-100 p-3 rounded-md text-gray-800 shadow-sm"
                        >
                            {feature}
                        </li>
                    ))}
                </ul>
            </article> */}
        </main>
    )
}