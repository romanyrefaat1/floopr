import { NextResponse } from "next/server";
import { getPrioritizedTasksForProduct } from "@/actions/prioritize/get-prioritized-tasks-for-product-from-firestore";

export async function POST(req: Request) {
    try {
        const { productId } = await req.json();
        
        const result = await getPrioritizedTasksForProduct(productId);
        
        if (!result.success) {
            return NextResponse.json({
                error: result.error
            }, { status: 400 });
        }
        
        return NextResponse.json({
            topTasks: result.topTasks
        }, { status: 200 });
    } catch (error) {
        console.error("Error in prioritize route:", error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 });
    }
}