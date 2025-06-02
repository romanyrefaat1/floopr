import { ReactNode } from "react";

export default function Warn({
  title = `Warning`,
  description,
}: {
  title: string;
  description: string | ReactNode | null;
}) {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <div>{description ?? ``}</div>
    </div>
  );
}
