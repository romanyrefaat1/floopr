"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { ProductStyle } from '../page';

// Create a context to pass the style variables down
const ProductStyleContext = createContext<ProductStyle | null>(null);

// Hook to use the product style
export const useProductStyle = () => {
  const context = useContext(ProductStyleContext);
  if (!context) {
    throw new Error('useProductStyle must be used within a ProductStyleProvider');
  }
  return context;
};

// Component to provide style variables
export function ProductStyleProvider({ 
  children, 
  productStyle 
}: { 
  children: ReactNode; 
  productStyle: ProductStyle 
}) {
  // Create CSS variable style object
  const cssVariables = {
    '--product-bg-color': productStyle.backgroundColor,
    '--product-shadow': productStyle.shadowStyle,
    '--product-heading-style': productStyle.headingStyle,
    '--product-layout': productStyle.layout,
    '--product-text-color': productStyle.textColor,
    '--product-font-size': productStyle.fontSize,
    '--product-primary-color': productStyle.primaryColor,
    '--product-animation': productStyle.animation,
    '--product-spacing': productStyle.spacing,
    '--product-border-radius': productStyle.borderRadius,
    '--product-secondary-color': productStyle.secondaryColor,
    '--product-accent-color': productStyle.accentColor,
    '--product-font-family': productStyle.fontFamily,
  } as React.CSSProperties;

  return (
    <ProductStyleContext.Provider value={productStyle}>
      <div className="product-style-root" style={cssVariables}>
        {children}
      </div>
    </ProductStyleContext.Provider>
  );
}