import Link from "next/link";

export default function BeforeAfterSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Before & After: The Feedback Revolution
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            See how Floopr transforms scattered feedback into actionable
            business plans
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 rounded-xl p-5 bg-gradient-to-br from-floopr-purple/50 to-floopr-purple/90">
          {/* Before Column */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center mb-8">
              <span className="text-4xl mr-3">😫</span>
              <h3 className="text-2xl font-bold">Before Floopr</h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3"></span>
                <span className="text-gray-700">
                  "Where did that user report the bug again…?"
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3"></span>
                <span className="text-gray-700">
                  Feedback buried in emails, Discord chats, and random Notion
                  pages
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3"></span>
                <span className="text-gray-700">
                  Manually copy-pasting tweets and user DMs
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3"></span>
                <span className="text-gray-700">
                  No clue what to build next — just guessing
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3"></span>
                <span className="text-gray-700">
                  Users feel ignored, updates are slow
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3"></span>
                <span className="text-gray-700">
                  Bugs slip through the cracks
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mt-2 mr-3"></span>
                <span className="text-gray-700">
                  Team's overwhelmed, no system in place
                </span>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-gray-300">
              <p className="font-medium text-sm text-gray-500 mb-1">
                FEELS LIKE:
              </p>
              <p className="text-gray-700 font-medium">
                chaos, noise, stress, disconnection.
              </p>
            </div>
          </div>

          {/* After Column */}
          <div className="bg-indigo-50 rounded-xl p-6 md:p-8">
            <div className="flex items-center mb-8">
              <span className="text-4xl mr-3">😌</span>
              <h3 className="text-2xl font-bold">After Floopr</h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 rounded mr-3 mt-0.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  All feedback flows into one beautiful dashboard
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 rounded mr-3 mt-0.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  Embeddable widget collects feedback as it happens
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 rounded mr-3 mt-0.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  Automatically tagged, prioritized, and assigned
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 rounded mr-3 mt-0.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  Crystal-clear signals on what to fix or build next
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 rounded mr-3 mt-0.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  Follow-ups are easy — users feel heard
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 rounded mr-3 mt-0.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  Roadmap built on real pain points
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-indigo-100 rounded mr-3 mt-0.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-gray-700">
                  Ship faster with confidence
                </span>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-indigo-200">
              <p className="font-bold text-sm text-indigo-400 mb-1">
                FEELS LIKE:
              </p>
              <p className="text-gray-700 font-medium">
                clarity, control, momentum, focus.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
      </div>
    </section>
  );
}
