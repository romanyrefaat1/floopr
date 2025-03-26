import CopyButton from "../copy-button";

export default function ScriptTab() {
  const scriptCode = `<script src="my-link"/>`;

  return (
    <div>
      <p className="mb-4">
        Add this script to your HTML page to load the feedback component. This
        is the simplest way to integrate the component into any website.
      </p>

      <div className="relative bg-secondaryBackground rounded-md">
        <CopyButton text={scriptCode} />
        <pre className="p-4 overflow-x-auto text-sm">{scriptCode}</pre>
      </div>
    </div>
  );
}
