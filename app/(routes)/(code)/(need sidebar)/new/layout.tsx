import { ProductFormContextProvider } from "@/contexts/multistep-form-context";
import { ReactNode } from "react";

interface NewProductLayoutProps {
  children: ReactNode;
}

const NewProductLayout = ({ children }: NewProductLayoutProps) => {
  return (
    <main>
      <ProductFormContextProvider>
        <div className="h-36 md:h-0">{children}</div>
      </ProductFormContextProvider>
    </main>
  );
};

export default NewProductLayout;
