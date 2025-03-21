"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { ProductStyle } from '@/app/(routes)/(code)/[productId]/page';

const ProductStyleContext = createContext<ProductStyle | null>(null);

export const useProductStyle = () => {
  const context = useContext(ProductStyleContext);
  if (!context) {
    throw new Error('useProductStyle must be used within a ProductStyleProvider');
  }
  return context;
};

export const ProductStyleProvider: React.FC<{
  children: ReactNode;
  productStyle: ProductStyle;
}> = ({ children, productStyle }) => {

  const borderRadius =
    productStyle.borderRadius === "large"
      ? { md: "20px", sm: "15px", lg: "25px" }
      : productStyle.borderRadius === "sm"
      ? { md: "15px", sm: "10px", lg: "20px" }
      : { md: "10px", sm: "5px", lg: "15px" };

  // Convert the style object to CSS variables
  const cssVars = {
    '--product-background-color': productStyle.backgroundColor,
    '--product-shadow-style': productStyle.shadowStyle,
    '--product-heading-style': productStyle.headingStyle,
    '--product-layout': productStyle.layout,
    '--product-text-color': productStyle.textColor,
    '--product-font-size': productStyle.fontSize,
    '--product-primary-color': productStyle.primaryColor,
    '--product-animation': productStyle.animation,
    '--product-spacing': productStyle.spacing,
    '--product-border-radius-sm': borderRadius.sm,
    '--product-border-radius-md': borderRadius.md,
    '--product-border-radius-lg': borderRadius.lg,
    '--product-secondary-color': productStyle.secondaryColor,
    '--product-accent-color': productStyle.accentColor,
    '--product-font-family': productStyle.fontFamily
  } as React.CSSProperties;

  return (
    <ProductStyleContext.Provider value={productStyle}>
      <div style={cssVars}>
        {children}
      </div>
    </ProductStyleContext.Provider>
  );
};