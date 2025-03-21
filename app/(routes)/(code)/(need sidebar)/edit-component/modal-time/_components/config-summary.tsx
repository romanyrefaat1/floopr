import { ModalConfig } from "@/components/floopr-integration/modal-timout/modal-context";

export const ConfigSummary = ({ config }: { config: ModalConfig }) => (
  <div className="border rounded-lg p-4">
    <h3 className="font-medium mb-2">Configuration Summary</h3>
    <ul className="text-sm text-gray-600 space-y-1">
      <li><strong>Title:</strong> {config.title}</li>
      <li><strong>Button Text:</strong> {config.buttonText}</li>
      <li><strong>Timeout:</strong> {config.timeoutDuration} seconds</li>
      <li><strong>Ratings:</strong> {config.ratings.length}</li>
      <li><strong>Inputs:</strong> {config.inputs.length}</li>
      <li><strong>Position:</strong> {config.position}</li>
    </ul>
  </div>
);