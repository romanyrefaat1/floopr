"use client";

import React from "react";
import { useNewProductFormContext } from "@/contexts/multistep-form-context";

const ProductPreview = ({ overrideStyle }) => {
  const { productForm } = useNewProductFormContext();
  const { name, description } = productForm;
  
  // Use overrideStyle (for live preview) or productForm.style
  const style = overrideStyle || productForm.style || {};
  
  // Helper to get shadow style
  const getShadowStyle = (shadowType) => {
    switch(shadowType) {
      case 'soft': return '0 2px 8px rgba(0,0,0,0.1)';
      case 'medium': return '0 4px 12px rgba(0,0,0,0.15)';
      case 'strong': return '0 8px 24px rgba(0,0,0,0.2)';
      default: return 'none';
    }
  };
  
  // Helper to get heading style
  const getHeadingStyle = (headingType) => {
    switch(headingType) {
      case 'bold': return { fontWeight: 'bold' };
      case 'light': return { fontWeight: '300' };
      case 'italic': return { fontStyle: 'italic' };
      case 'uppercase': return { textTransform: 'uppercase' };
      default: return { fontWeight: 'bold' };
    }
  };
  
  // Helper to get spacing style
  const getSpacing = (spacingType) => {
    switch(spacingType) {
      case 'compact': return '12px';
      case 'comfortable': return '20px';
      case 'spacious': return '32px';
      default: return '20px';
    }
  };
  
  // Main container style
  const previewContainerStyle = {
    backgroundColor: style.backgroundColor || "#f9f9f9",
    color: style.textColor || "#333333",
    fontFamily: style.fontFamily || "Arial, sans-serif",
    fontSize: style.fontSize || "16px",
    padding: getSpacing(style.spacing),
    borderRadius: style.borderRadius || "8px",
    boxShadow: getShadowStyle(style.shadowStyle),
    transition: style.animation !== 'none' ? 'all 0.3s ease' : 'none',
    minHeight: "350px",
    display: "flex",
    flexDirection: "column",
  };
  
  // Heading style
  const headingStyle = {
    color: style.primaryColor || "#000000",
    marginBottom: '16px',
    ...getHeadingStyle(style.headingStyle),
  };
  
  // Description style
  const descriptionStyle = {
    marginBottom: '24px',
    lineHeight: '1.5',
  };
  
  // Tags/Badge style
  const tagStyle = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: style.borderRadius || "4px",
    marginRight: '8px',
    marginBottom: '8px',
    fontWeight: 'medium',
  };
  
  // Get example product items based on layout
  const getProductItems = () => {
    const itemStyle = {
      backgroundColor: '#ffffff',
      padding: getSpacing(style.spacing),
      borderRadius: style.borderRadius || "4px",
      boxShadow: getShadowStyle(style.shadowStyle),
      border: `1px solid ${style.secondaryColor}20`, // Using hex opacity
      transition: style.animation !== 'none' ? 'all 0.3s ease' : 'none',
      overflow: 'hidden',
    };
    
    // Container style based on layout
    let containerStyle = {};
    if (style.layout === 'grid') {
      containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: getSpacing(style.spacing),
      };
    } else if (style.layout === 'list') {
      containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: getSpacing(style.spacing),
      };
    } else if (style.layout === 'cards') {
      containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: getSpacing(style.spacing),
      };
      // Add card-specific styling
      itemStyle.boxShadow = getShadowStyle(style.shadowStyle === 'none' ? 'soft' : style.shadowStyle);
    } else if (style.layout === 'featured') {
      containerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: getSpacing(style.spacing),
      };
      // Add featured-specific styling
      itemStyle.borderLeft = `4px solid ${style.accentColor}`;
    }
    
    // Create sample items
    return (
      <div style={containerStyle}>
        {['Product A', 'Product B', 'Product C'].map((item, index) => (
          <div key={index} style={itemStyle}>
            <div style={{ 
              fontWeight: 'bold', 
              marginBottom: '8px',
              color: style.primaryColor
            }}>
              {item}
            </div>
            <div style={{ fontSize: '0.9em' }}>
              Sample product description
            </div>
            {style.layout === 'featured' && (
              <div style={{ 
                marginTop: '8px',
                padding: '2px 8px',
                backgroundColor: style.accentColor,
                color: '#ffffff',
                display: 'inline-block',
                borderRadius: style.borderRadius || "4px",
                fontSize: '0.8em'
              }}>
                Featured
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div style={previewContainerStyle}>
      <h1 style={headingStyle}>{name || "Product Collection"}</h1>
      <p style={descriptionStyle}>{description || "This is a preview of your product collection with the selected style settings."}</p>
      
      <div style={{ marginBottom: '20px' }}>
        <span style={{ 
          ...tagStyle,
          backgroundColor: style.primaryColor || "#000000", 
          color: "#fff"
        }}>
          Primary
        </span>
        <span style={{ 
          ...tagStyle,
          backgroundColor: style.secondaryColor || "#ffffff", 
          color: "#000"
        }}>
          Secondary
        </span>
        <span style={{ 
          ...tagStyle,
          backgroundColor: style.accentColor || "#fd7e14", 
          color: "#fff"
        }}>
          Accent
        </span>
      </div>
      
      {getProductItems()}
    </div>
  );
};

export default ProductPreview;