import { Accordion } from "@/components/ui/accordion";
import { AccordionSection } from "./sections/accordion-section";
import { TimeoutSection } from "./sections/timeoutSection";
import { RatingsSection } from "./sections/rating/rating-section";
import { InputsSection } from "./sections/inputs/inputs-section";
import { ButtonSection } from "./sections/button-section";
import { TitleSection } from "./sections/title-section";
import { Button } from "@/components/ui/button";

// Adding missing import for ModalConfig
import { ModalConfig } from "@/components/floopr-integration/modal-timout/modal-context";

export const ReviewStep = ({
  config,
  onConfigChange,
  onRatingChange,
  onInputChange,
  onAddRating,
  onRemoveRating,
  onAddInput,
  onRemoveInput,
  onNext
}: {
  config: ModalConfig;
  onConfigChange: (field: string, value: any) => void;
  onRatingChange: (index: number, field: string, value: string | number) => void;
  onInputChange: (index: number, field: string, value: string) => void;
  onAddRating: () => void;
  onRemoveRating: (index: number) => void;
  onAddInput: () => void;
  onRemoveInput: (index: number) => void;
  onNext: () => void;
}) => (
  <Accordion type="single" collapsible className="space-y-4">
    <AccordionSection value="timeout" title="Timeout Duration">
      <TimeoutSection
        timeoutDuration={config.timeoutDuration}
        onChange={(value) => onConfigChange('timeoutDuration', value)}
      />
    </AccordionSection>
    
    <AccordionSection value="ratings" title="Rating Options">
      <RatingsSection
        ratings={config.ratings}
        onRatingChange={onRatingChange}
        onAddRating={onAddRating}
        onRemoveRating={onRemoveRating}
      />
    </AccordionSection>
    
    <AccordionSection value="inputs" title="Input Fields">
      <InputsSection
        inputs={config.inputs}
        onInputChange={onInputChange}
        onAddInput={onAddInput}
        onRemoveInput={onRemoveInput}
      />
    </AccordionSection>
    
    <AccordionSection value="submit" title="Submit Button">
      <ButtonSection
        buttonText={config.buttonText}
        onChange={(value) => onConfigChange('buttonText', value)}
      />
    </AccordionSection>
    
    <AccordionSection value="title" title="Modal Title">
      <TitleSection
        title={config.title}
        onChange={(value) => onConfigChange('title', value)}
      />
    </AccordionSection>
    
    <Button className="mt-4 w-full" onClick={onNext}>
      Next
    </Button>
  </Accordion>
);