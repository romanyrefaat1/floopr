"use client";

import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type ProductStyle = {
  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;

  // Typography
  fontFamily: string;
  fontSize: string;
  headingStyle: string;
  
  // Layout
  layout: string;
  spacing: string;
  borderRadius: string;
  
  // Effects
  shadowStyle: string;
  animation: string;
};

export type Product = {
  name: string;
  description?: string;
  style?: ProductStyle;
};

export interface ProductContextProps {
  productForm: Product;
  updateProductForm: (product: Partial<Product>) => void;
}

const defaultProduct: Product = {
  name: "",
  description: "",
  style: {
    // Colors
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    accentColor: "#fd7e14",
    backgroundColor: "#f8f9fa",
    textColor: "#212529",
    
    // Typography
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    headingStyle: "bold",
    
    // Layout
    layout: "grid",
    spacing: "comfortable",
    borderRadius: "4px",
    
    // Effects
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

// Helper function to serialize and deserialize form data
const serializeFormData = (data: Product): string => {
  return encodeURIComponent(JSON.stringify(data));
};

const deserializeFormData = (serialized: string | null): Product => {
  if (!serialized) return defaultProduct;
  try {
    return JSON.parse(decodeURIComponent(serialized));
  } catch (e) {
    console.error("Failed to parse form data from URL:", e);
    return defaultProduct;
  }
};

export function ProductFormContextProvider({ children }: ProductFormContextProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get the form data from URL query param
  const formParam = searchParams.get('formData');
  const initialProduct = formParam ? deserializeFormData(formParam) : defaultProduct;
  
  // Initialize state with data from URL or defaults
  const [product, setProduct] = React.useState<Product>(initialProduct);

  // Update URL whenever product state changes
  useEffect(() => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());

    // Update the formData parameter
    const serialized = serializeFormData(product);
    params.set('formData', serialized);

    // Use replace to avoid creating new history entries
    window.history.replaceState({}, '', `${pathname}?${params.toString()}`);
  }, [product, pathname, searchParams]);

  const updateProductForm = (values: Partial<Product>) => {
    setProduct((prev) => {
      // Handle nested style object properly
      const newProduct = { ...prev };
      
      // Copy non-style properties
      Object.keys(values).forEach(key => {
        if (key !== 'style') {
          newProduct[key] = values[key];
        }
      });
      
      // Handle style properties if present
      if (values.style) {
        newProduct.style = {
          ...prev.style,
          ...values.style
        };
      }
      
      return newProduct;
    });
  };

  return (
    <NewProductFormContext.Provider value={{ productForm: product, updateProductForm }}>
      {children}
    </NewProductFormContext.Provider>
  );
}

export function useNewProductFormContext() {
  const context = useContext(NewProductFormContext);
  if (!context) {
    throw new Error("useNewProductFormContext must be used within a ProductFormContextProvider");
  }
  return context;
}