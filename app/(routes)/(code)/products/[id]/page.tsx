import getProductData from "@/actions/get-product-data";
import { notFound } from "next/navigation";
import { lightenColor } from "./_utils/lighten-color";
import SimpleTemplate from "./_components/templates/simple-template";

export type Product = {
    docId: string;
    name: string;
    description: string;
    style: {
        primaryColor: string;
        textColor: string;
        headingStyle: string;
        fontFamily: string;
        fontSize: string;
        layout: string;
        spacing: string;
        borderRadius: string;
        shadowStyle: string;
        animation: string;
        backgroundColor: string;
        secondaryColor: string;
        secondaryTextColor: string;
        accentColor: string;
    }
}

export type FilterData = {
    filter: string | null;
    quick: string | null;
    specifiedDate: string | null;
};

const ProductPaSpecial = async ({
    params, 
    searchParams
}: {
    params: {id: string}, 
    searchParams: {filter: string | null, quick: string | null, date: string | null}
}) => {
    const { id } = params;

    // Check if product exists
    const productDataFromServer = await getProductData(id);
    if (!productDataFromServer) notFound();
    
    const filter = await searchParams.filter || null;
    const quick = await searchParams.quick || null;
    const date = await searchParams.date || null;

    const filterData = {
        filter,
        quick,
        specifiedDate: date,
    };

    // Generate secondary colors based on the primary colors
    const secondaryTextColor = lightenColor(productDataFromServer.style.textColor, 20);
    const productData = {
        ...productDataFromServer,
        secondaryTextColor
    };

    if (!productData) {
        notFound();
    }

    // Shadow styles based on the shadowStyle property
    const shadowStyles = {
        light: "0 2px 4px rgba(0, 0, 0, 0.05)",
        medium: "0 4px 8px rgba(0, 0, 0, 0.1)",
        heavy: "0 8px 16px rgba(0, 0, 0, 0.15)",
        none: "none"
    };
    
    // Get appropriate shadow
    const shadowValue = shadowStyles[productData.style.shadowStyle] || shadowStyles.medium;
    
    // Spacing values
    const spacingValues = {
        compact: "0.75rem",
        comfortable: "1.25rem",
        spacious: "2rem"
    };
    
    // Get appropriate spacing
    const spacingValue = spacingValues[productData.style.spacing] || spacingValues.comfortable;

    return (
        <div 
            className="product-page-container min-h-screen" 
            style={{
                "--primary-color": productData.style.primaryColor,
                "--secondary-color": productData.style.secondaryColor,
                "--accent-color": productData.style.accentColor,
                "--text-color": productData.style.textColor,
                "--secondary-text-color": secondaryTextColor,
                "--background-color": productData.style.backgroundColor,
                "--border-radius": `${productData.style.borderRadius || "4px"}`,
                "--font-family": productData.style.fontFamily || "Arial, sans-serif",
                "--font-size": productData.style.fontSize || "16px",
                "--shadow": shadowValue,
                "--spacing": spacingValue,
            } as React.CSSProperties}
        >
            <SimpleTemplate productData={productData} filterData={filterData} />
        </div>
    );
}

export default ProductPaSpecial;