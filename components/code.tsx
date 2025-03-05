import * as React from "react";

interface CodeBlockProps {
  code: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code=`CODE ERE`, className = "" }) => {
  return (
    <pre
      className={`bg-muted text-muted-foreground p-4 rounded-md overflow-auto font-mono text-sm ${className}`}
    >
      <code>{code}</code>
    </pre>
  );
};
