import getProductData from "@/actions/get-product-data";
import { notFound } from "next/navigation";

const ProductPaSpecial = async({params}) => {
    const {id} = await params

    const productData = await getProductData(id)
    console.log(productData)

    if (!productData) {
        notFound()
    }

    return (<div>
    <p>{id}</p>
    
    <p>{JSON.stringify(productData)}</p>
    </div>)
}

export default ProductPaSpecial;