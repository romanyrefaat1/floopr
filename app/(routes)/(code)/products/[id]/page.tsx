import getProductData from "@/actions/get-product-data";
import { notFound } from "next/navigation";
import AddFeedbackForm from "./_components/add-simple-feedback-form";
import { lightenColor } from "./_utils/lighten-color";
import FeedbackMain from "./_components/feedback-main";

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

{/*
    {
  docId: '26af7e92-8fb1-41c6-8715-95861e7cd1c3',
  name: 'Product',
  description: '',
  style: {
    textColor: '#212529',
    animation: 'none',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    headingStyle: 'bold',
    shadowStyle: 'medium',
    borderRadius: '4px',
    spacing: 'comfortable',
    primaryColor: '#f0f7ff',
    secondaryColor: '#ebf3fa',
    accentColor: '#fd7e14',
    layout: 'grid',
    fontFamily: 'Arial, sans-serif'
  },
}
    */}

    export type FilterData = {
        filter: string | null;
        quick: string | null;
        specifiedDate: string | null;
    };
    
const ProductPaSpecial = async ({params, searchParams}: {params: {id: string}, searchParams: {filter: string | null, quick: string | null, date: string | null}}) => {
    const { id } = params;
    const filter = searchParams.filter || null;
    const quick = searchParams.quick || null;
    const date = searchParams.date || null;

    // For server-side debugging, use console.log on the server
    // console.log("Request parameters:", { id, filter, quick, date });
    console.log("filter from params:", filter);
console.log("quick from params:", quick);
console.log("date from params:", date);

    const filterData = {
        filter,
        quick,
        specifiedDate: date,
    };
    console.log("filterData:", JSON.stringify(filterData));

    const productDataFromServer = await getProductData(id)
    const secondaryTextColor = lightenColor(productDataFromServer.style.textColor, 20);
    const productData = {
        ...productDataFromServer,
        secondaryTextColor
    }
    console.log(productData)

    if (!productData) {
        notFound()
    }

    return (<main>
        <div className="flex flex-col justify-between w-screen h-fit md:h-[calc(100vh-200px)] p-[20px]" style={{
            backgroundColor: productData.style.backgroundColor,
            color: productData.style.textColor,
        }}>

        <article className="flex flex-col gap-y-4 mb-[15px]">
            <h1 style={{fontWeight: productData.style.headingStyle}}>{productData.name}</h1>
            <p style={{color: productData.secondaryTextColor}}>{productData.description.length > 0 ? productData.description : "No description"}</p>
        </article>

        <AddFeedbackForm productId={productData.docId} className={`mb-[40px]`}
        primaryColor={productData.style.primaryColor}
        productName={productData.name} />
        </div>
        <FeedbackMain filter={filterData} productData={productData} />
        </main>)
}

export default ProductPaSpecial;