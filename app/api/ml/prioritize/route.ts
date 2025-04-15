import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function POST(req) {
    const {productId} = await req.json();
    console.log(`productId from prioritize route`, productId);

    if(!productId){
        return NextResponse.json({
            error: "Product ID is required"
        }, {status: 400}) 
    }
    // From firestore
    const collRef = collection(db, "products", productId, "topTasks");
    const topTasksData = await getDocs(collRef);

    if (topTasksData.empty) {
        return NextResponse.json({
            topTasks: []
        }, {status: 200})
    }

    const topTasks = topTasksData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, 
    }))
    console.log(`topTasks`, topTasks);
    // const prioritizedFeedbacks = 

    return NextResponse.json({
        topTasks: topTasks
    }, {status: 200})
}