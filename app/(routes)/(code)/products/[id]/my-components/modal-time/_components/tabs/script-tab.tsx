import CopyButton from "../copy-button";

type ScriptTabProps = {
  componentId: string;
  componentAPIKey: string;
  componentProductId: string;
};

export default function ScriptTab({
  componentId,
  componentAPIKey,
  componentProductId,
}: ScriptTabProps) {
  const scriptCode = `<script
      src="https://floopr.vercel.app/embeds/modal-timeout-bundle_floopr_feedback_embed.js"
      defer
      data-api-key="${componentAPIKey}"
      data-product-id="${componentProductId}"
      data-component-id="${componentId}"
      data-api-base-url="https://floopr.vercel.app"
    ></script>`;

  return (
    <div>
      <p className="mb-4">
        Add this script to your HTML page to load the feedback component. This
        is the simplest way to integrate the component into any website.
      </p>

      <div className="relative rounded-md border bg-mutedBackground">
        <CopyButton text={scriptCode} />
        <pre className="p-4 overflow-x-auto text-sm text-foreground">
          {scriptCode}
        </pre>
      </div>
    </div>
  );
}
