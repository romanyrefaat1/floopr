import { ProductFormContextProvider } from "@/contexts/multistep-form-context";

const NewProductLayout = ({ children }) => {
  return (
    <main>
      <ProductFormContextProvider>
        <div className="h-36 md:h-0">{children}</div>
      </ProductFormContextProvider>
    </main>
  );
};

export default NewProductLayout;
