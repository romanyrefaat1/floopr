import { Button } from "./ui/button";
import { ReactNode } from "react";

type Button = {
  isMain?: boolean;
  text?: string | null;
  content: React.ReactNode;
  onClick: () => void;
};

type Buttons = Button[];

export default function Warn({
  title = `Warning`,
  description,
  content,
  buttons = null,
}: {
  title: string;
  description: string | ReactNode | null;
  buttons?: Buttons | null;
}) {
  return (
    <div
      className="bg-warn-background border-l-4 border-warn-border text-warn-foreground p-4 mb-4 rounded"
      role="alert"
    >
      <div>
        <p className="font-bold">{title}</p>
        <div className="md:max-w-[70%]">{description ?? ``}</div>
        {content}
      </div>
      {buttons && (
        <div className="flex justify-end mt-4 items-center w-full gap-2">
          {buttons.map((buttonData) => {
            return (
              <Button
                variant={buttonData.isMain ? `warn` : `outline`}
                size={`sm`}
                onClick={buttonData.onClick}
              >
                {buttonData.text}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
