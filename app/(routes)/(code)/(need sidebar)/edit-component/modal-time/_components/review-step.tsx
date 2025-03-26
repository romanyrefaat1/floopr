import { AccordionSection } from "./sections/accordion-section";
import { ButtonSection } from "./sections/button-section";
import { InputsSection } from "./sections/inputs/inputs-section";
import { RatingsSection } from "./sections/rating/rating-section";
import { TimeoutSection } from "./sections/timeoutSection";
import { TitleSection } from "./sections/title-section";
// Adding missing import for ModalConfig
import { ModalConfig } from "@/components/floopr-integration/modal-timout/modal-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const ReviewStep = ({
  config,
  onConfigChange,
  onRatingChange,
  onInputChange,
  onAddRating,
  onRemoveRating,
  onAddInput,
  onRemoveInput,
  onNext,
  setIsDark,
  isDark = false,
}: {
  config: ModalConfig;
  onConfigChange: (field: string, value: any) => void;
  onRatingChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  onInputChange: (index: number, field: string, value: string) => void;
  onAddRating: () => void;
  onRemoveRating: (index: number) => void;
  onAddInput: () => void;
  onRemoveInput: (index: number) => void;
  onNext: () => void;
  setIsDark: () => void;
  isDark: boolean;
}) => (
  <Accordion type="single" collapsible className="space-y-4">
    <AccordionSection value="timeout" title="Timeout Duration">
      <TimeoutSection
        timeoutDuration={config.timeoutDuration}
        onChange={(value) => onConfigChange("timeoutDuration", value)}
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
        onChange={(value) => onConfigChange("buttonText", value)}
      />
    </AccordionSection>

    <AccordionSection value="title" title="Modal Title">
      <TitleSection
        title={config.title}
        onChange={(value) => onConfigChange("title", value)}
      />
    </AccordionSection>
    <AccordionSection value="theme" title="Theme">
      <div className="border rounded-lg p-4 mt-4">
        <h3 className="text-lg font-medium mb-2">Modal Theme</h3>
        <p className="leading-tight text-sm" style={{ lineHeight: `.8px` }}>
          Please make sure to turn floopr&apos;s app theme to Light mode for the
          theme switcher to work properly {` `}
          <ThemeToggle />
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsDark((prev) => !prev)}
        >
          Change Modal Theme to {isDark ? `Light` : `Dark`} Mode
        </Button>
      </div>
    </AccordionSection>

    {/* <Button className="mt-4 w-full" onClick={onNext}>
      Next
    </Button> */}
  </Accordion>
);
