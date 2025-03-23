import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const AccordionSection = ({
  value,
  title,
  children,
}: {
  value: string;
  title: string;
  children: React.ReactNode;
}) => (
  <AccordionItem value={value}>
    <AccordionTrigger>
      <span>{title}</span>
    </AccordionTrigger>
    <AccordionContent>{children}</AccordionContent>
  </AccordionItem>
);
