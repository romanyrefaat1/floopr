import { Step } from 'onborda';

const mainIdeaBoardTourSteps: Step[] = [
  {
    id: 'welcome',
    title: 'Welcome to IdeaBoard!',
    content: "We're excited to have you. Let's take a quick tour to get you started.",
    selector: '#onborda-welcome-modal', // Or use no selector if Onborda supports true modal steps without a target
    position: 'center',
    showControls: true,
    showSkip: true,
    order: 1,
  },
  {
    id: 'demo',
    title: 'Quick Demo',
    content: "Here's a brief overview of how IdeaBoard helps you manage your ideas.",
    selector: '#demo-video-placeholder', // Ensure this ID exists // Replace with actual selector
    position: 'bottom',
    showControls: true,
    showSkip: true,
    order: 2,
  },
  {
    id: 'new-product-btn',
    title: 'Add Your First Product',
    content: 'Click here to start creating your first product idea.',
    selector: '#new-product-btn', // Ensure this ID exists // Using data attribute for robustness
    position: 'bottom',
    showControls: true,
    showSkip: true,
    order: 3,
  },
  {
    id: 'new-product-inputs',
    title: 'Product Details',
    content: 'Fill in the name, description, and other details for your new product.',
    selector: '#new-product-form', // Ensure this ID exists // Target the form or a specific input wrapper
    position: 'right',
    showControls: true,
    showSkip: true,
    order: 4,
  },
  {
    id: 'new-product-next',
    title: 'Save Your Product',
    content: "Once you've filled in the details, click here to save your product.",
    selector: '#save-product-button', // Ensure this ID exists
    position: 'bottom',
    showControls: true,
    showSkip: true,
    order: 5,
  },
  {
    id: 'features-overview', // Renamed from 'step-three-next'
    title: 'Next Up: Key Features',
    content: "Let's explore some of the key features available to you.",
    selector: '#features-section', // Ensure this ID exists // Placeholder selector
    position: 'top',
    showControls: true,
    showSkip: true,
    order: 6,
  },
  {
    id: 'dashboard-tabs',
    title: 'Navigate Your Dashboard',
    content: 'Use these tabs to switch between different views and sections of your dashboard.',
    selector: '#dashboard-tabs-container', // Ensure this ID exists
    position: 'top',
    showControls: true,
    showSkip: true,
    order: 7,
  },
  {
    id: 'integration',
    title: 'Connect Your Tools',
    content: 'IdeaBoard can integrate with other services. Explore available integrations here.',
    selector: '#integrations-link', // Ensure this ID exists // Placeholder selector
    position: 'bottom',
    showControls: true,
    showSkip: true,
    order: 8,
  },
  {
    id: 'view-page',
    title: 'View Your Product Page',
    content: 'This is where you can see the detailed page for your product.',
    selector: '#product-view-area', // Ensure this ID exists // Placeholder selector
    position: 'top',
    showControls: true,
    showSkip: true,
    order: 9,
  },
  {
    id: 'almost-done',
    title: 'Almost There!',
    content: "You're doing great! Just one more step to complete the tour.",
    selector: '#onborda-almost-done-modal', // Requires a targetable element or Onborda handles selector-less centered steps.
    position: 'center',
    showControls: true,
    showSkip: true,
    order: 10,
  },
  {
    id: 'final-product',
    title: 'Your Product is Ready!',
    content: "Congratulations on setting up your first product! You're all set to explore more.",
    selector: '#product-title-display', // Ensure this ID exists // Placeholder for where the product name is shown
    position: 'bottom',
    showControls: true,
    showSkip: false, // Typically no skip on the last informational step
    order: 11,
  },
  // 'done' is usually an implicit state when all steps are completed.
  // Onborda handles this; we don't define 'done' as a visual step here.
];

export interface OnbordaTour {
  tour: string;
  steps: Step[];
}

export const allIdeaBoardTours: OnbordaTour[] = [
  {
    tour: 'mainIdeaBoardTour',
    steps: mainIdeaBoardTourSteps,
  },
];

