"use client";

import debounce from "lodash.debounce";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";

export type ProductStyle = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: string;
  headingStyle: string;
  layout: string;
  spacing: string;
  borderRadius: string;
  shadowStyle: string;
  animation: string;
};

export type Product = {
  name: string;
  description?: string;
  website?: string;
  context?: string;
  style: ProductStyle;
};

export interface ProductContextProps {
  productForm: Product;
  updateProductForm: (product: Partial<Product>) => void;
}

const defaultProduct: Product = {
  name: "",
  description: "",
  website: "",
  context: "",
  style: {
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    accentColor: "#fd7e14",
    backgroundColor: "#f8f9fa",
    textColor: "#212529",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    headingStyle: "bold",
    layout: "grid",
    spacing: "comfortable",
    borderRadius: "4px",
    shadowStyle: "soft",
    animation: "none",
  },
};

export const NewProductFormContext = createContext<ProductContextProps>({
  productForm: defaultProduct,
  updateProductForm: () => {},
});

interface ProductFormContextProviderProps {
  children: ReactNode;
}

export function ProductFormContextProvider({
  children,
}: ProductFormContextProviderProps) {
  const [product, setProduct] = React.useState<Product>(defaultProduct);

  const debouncedUpdater = React.useRef(
    debounce((values: Partial<Product>) => {
      setProduct((prev) => {
        const newProduct = { ...prev };
        Object.keys(values).forEach((key) => {
          if (key !== "style")
            newProduct[key as keyof Product] = values[key as keyof Product]!;
        });
        if (values.style) newProduct.style = { ...prev.style, ...values.style };
        return newProduct;
      });
    }, 300)
  ).current;

  const updateProductForm = React.useCallback(
    (values: Partial<Product>) => {
      debouncedUpdater(values);
    },
    [debouncedUpdater]
  );

  React.useEffect(() => () => debouncedUpdater.cancel(), [debouncedUpdater]);

  return (
    <NewProductFormContext.Provider
      value={{ productForm: product, updateProductForm }}
    >
      {children}
    </NewProductFormContext.Provider>
  );
}

export function useNewProductFormContext() {
  const context = useContext(NewProductFormContext);
  if (!context)
    throw new Error("Must be used within ProductFormContextProvider");
  return context;
}
