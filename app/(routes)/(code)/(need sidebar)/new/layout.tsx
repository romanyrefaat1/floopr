import { Button } from "@/components/ui/button";
import { ProductFormContextProvider } from "@/contexts/multistep-form-context";
import { ReactNode } from "react";
import { IconLeft } from "react-day-picker";

interface NewProductLayoutProps {
  children: ReactNode;
}

const NewProductLayout = ({ children }: NewProductLayoutProps) => {
  return (
    <main className="px-8 md:px-[70px] bg-background min-h-screen flex flex-col">
      <ProductFormContextProvider>
        <div>{children}</div>
      </ProductFormContextProvider>
    </main>
  );
};

export default NewProductLayout;
