import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function useProductItemData(productId: string) {
    const [productData, setProductData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(()=> {
        const fetchProductData = async () => {
            const docRef = doc(db, "products", productId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProductData(docSnap.data());
                setLoading(false);
            } else {
                setError(new Error("Product not found"));
                setLoading(false);
            }
        };
        fetchProductData();
    },[productId])
    console.log(`productData`, productData)

    return { productData, loading }
}

{/*
    description
: 
""
docId
: 
"316cd67c-d204-45d8-85c0-6e986dca549c"
feedbackCount
: 
1
lastFeedbackAt
: 
Timestamp
nanoseconds
: 
950000000
seconds
: 
1741472411
[[Prototype]]
: 
Object
name
: 
"My App Name 1"
ownerId
: 
"user_2u0C6Q4MMHglCF18bB3NSAJTDWK"
productId
: 
"316cd67c-d204-45d8-85c0-6e986dca549c"
style
: 
accentColor
: 
"#fd7e14"
animation
: 
"none"
backgroundColor
: 
"#f8f9fa"
borderRadius
: 
"4px"
fontFamily
: 
"'Open Sans', sans-serif"
fontSize
: 
"16px"
headingStyle
: 
"bold"
layout
: 
"list"
primaryColor
: 
"#57dd46"
secondaryColor
: 
"#6c757d"
shadowStyle
: 
"soft"
spacing
: 
"spacious"
textColor
: 
"#212529"
[[Prototype]]
: 
Object
updatedAt
: 
Timestamp
nanoseconds
: 
700000000
seconds
: 
1741472411
[[Prototype]]
: 
Object
[[Prototype]]
: 
Object
﻿

     */}