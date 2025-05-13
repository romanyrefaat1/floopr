export interface ChangelogEntry {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  startDate: string;
  endDate?: string;
  referencedFeedback?: {
    id: string;
    username: string;
    content: string;
  }[];
  tags?: string[];
}

export const changelogData: ChangelogEntry[] = [
  {
    id: "cl-001",
    title: "Initial Launch of Waitlist",
    description: "We've launched our waitlist page with a modern, responsive design using shadcn UI components. The page features a teal/green primary color and light gold/yellow secondary color, creating a fresh and inviting gradient background.",
    startDate: "2025-04-01",
    endDate: "2025-04-15",
    imageUrl: "/floopr-logo-no-bg.png",
    tags: ["Launch", "UI"]
  },
  {
    id: "cl-002",
    title: "Email Signup Form Improvements",
    description: "Based on user feedback, we've improved the email signup form with better validation and a smoother submission process. Users now receive immediate confirmation of their signup.",
    startDate: "2025-04-16",
    endDate: "2025-04-20",
    referencedFeedback: [
      {
        id: "fb-123",
        username: "Sarah K.",
        content: "The email form was confusing - I wasn't sure if my submission went through."
      }
    ],
    tags: ["UX", "Form"]
  },
  {
    id: "cl-003",
    title: "Feature Cards Section Redesign",
    description: "We've redesigned the feature cards section to better highlight our core offerings. Each card now includes an icon, brief description, and hover effects for better engagement.",
    startDate: "2025-04-21",
    endDate: "2025-04-30",
    imageUrl: "/floopr-logo-no-bg.png",
    tags: ["Design", "Features"]
  },
  {
    id: "cl-004",
    title: "FAQ Accordion Implementation",
    description: "Added a comprehensive FAQ section with an accordion interface to address common questions about our product. This helps users find answers quickly without leaving the page.",
    startDate: "2025-05-01",
    endDate: "2025-05-07",
    tags: ["Content", "UX"]
  },
  {
    id: "cl-005",
    title: "Mobile Responsiveness Enhancements",
    description: "Improved the mobile experience with better touch targets, optimized images, and refined layouts for smaller screens. The site now performs excellently across all device sizes.",
    startDate: "2025-05-08",
    endDate: "2025-05-12",
    referencedFeedback: [
      {
        id: "fb-145",
        username: "Michael T.",
        content: "The site looks great on desktop but feels cramped on my phone."
      },
      {
        id: "fb-146",
        username: "Jessica R.",
        content: "Could you make the buttons bigger on mobile? Hard to tap accurately."
      }
    ],
    tags: ["Mobile", "Responsive"]
  },
  {
    id: "cl-006",
    title: "Changelog Modal Implementation",
    description: "We've added a changelog modal accessible via Ctrl+K to keep our users informed about our progress and improvements. The modal features a clean design with filtering options and detailed entries.",
    startDate: "2025-05-13",
    imageUrl: "/floopr-logo-no-bg.png",
    tags: ["Feature", "UX", "Transparency"]
  }
];
