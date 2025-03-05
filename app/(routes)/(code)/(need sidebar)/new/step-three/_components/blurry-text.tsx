import React from 'react';
import { CodeBlock } from "@/components/code";

const BlurryText = () => {
  return (
    <article className="max-w-4xl mx-auto p-6 space-y-6 ">
      <header>
        <h1 className="font-bold text-4xl text-foreground mb-4">
          Setting Up DeaBoard in Your Next.js Project
        </h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive guide to integrating the DeaBoard component library into your Next.js application, providing customizable and accessible UI components.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
          Prerequisites
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Next.js 13.4+ project</li>
          <li>Tailwind CSS installed</li>
          <li>Basic understanding of React and component libraries</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
          Installation
        </h2>
        <CodeBlock 
          code={`# Install required dependencies
npx shadcn-ui@latest init

# This will prompt you to configure:
# - Tailwind CSS
# - Color scheme
# - Component base path
# - CSS variables configuration`} 
        />
        <p className="mt-4 text-muted-foreground">
          The initialization process will set up the necessary configuration files and add default styles to your project.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
          Adding Components
        </h2>
        <CodeBlock 
          code={`# Add individual components using the CLI
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog

# You can add multiple components in one command
npx shadcn-ui@latest add button card dialog`} 
        />
        <div className="mt-4 bg-secondary/20 p-4 rounded-lg">
          <p className="text-muted-foreground">
            💡 Pro Tip: Components are added as fully customizable, copy-pastable files in your project, giving you complete control over their implementation.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
          Basic Usage Example
        </h2>
        <CodeBlock 
          code={`import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline">Click me</Button>
      </CardContent>
    </Card>
  )
}`} 
        />
      </section>

      <footer className="border-t pt-6 mt-8">
        <p className="text-muted-foreground">
          Need help? Check out the{' '}
          <a 
            href="https://ui.shadcn.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline"
          >
            Official Shadcn/UI Documentation
          </a>
        </p>
      </footer>
    </article>
  );
};

export default BlurryText;