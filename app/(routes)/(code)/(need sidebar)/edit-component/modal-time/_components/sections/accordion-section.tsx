import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

export const AccordionSection = ({ 
    value, 
    title, 
    children 
  }: { 
    value: string; 
    title: string; 
    children: React.ReactNode 
  }) => (
    <AccordionItem value={value}>
      <AccordionTrigger>
        <span>{title}</span>
      </AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
  