import { ModalConfig } from "@/components/floopr-integration/modal-timout/modal-context";
import { ConfigSummary } from "./config-summary";
import { Button } from "@/components/ui/button";

export const PreviewStep = ({ 
  currentStep,
  setCurrentStep,
  modalConfig,
  setModalConfig,
  timeoutDuration,
  handleConfigChange,
  handleRatingChange,
  handleInputChange,
  addRating,
  removeRating,
  addInput,
  removeInput,
  handleSaveComponent,
  setInContainerModalOpen,
  setFullPageModalOpen
}: { 
  currentStep: string;
  setCurrentStep: (step: string) => void;
  modalConfig: ModalConfig;
  setModalConfig: (config: any) => void;
  timeoutDuration: number;
  handleConfigChange: (field: string, value: any) => void;
  handleRatingChange: (index: number, field: string, value: any) => void;
  handleInputChange: (index: number, field: string, value: any) => void;
  addRating: () => void;
  removeRating: (index: number) => void;
  addInput: () => void;
  removeInput: (index: number) => void;
  handleSaveComponent?: () => Promise<void>;
  setInContainerModalOpen?: (open: boolean) => void;
  setFullPageModalOpen?: (open: boolean) => void;
}) => {
  if (currentStep !== 'preview') return null;
  
  return (
    <div className="space-y-4">
      <ConfigSummary config={modalConfig} />
      
      <div className="flex justify-start lg:justify-between gap-2 items-center flex-col lg:flex-row lg:items-center mt-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setInContainerModalOpen?.(true)}
            variant="outline"
          >
            Preview in Container
          </Button>
          <Button 
            variant="outline"
            onClick={() => setFullPageModalOpen?.(true)}
          >
            Preview Full Page
          </Button>
        </div>
        <Button onClick={handleSaveComponent}>
          Next
        </Button>
      </div>
    </div>
  );
};