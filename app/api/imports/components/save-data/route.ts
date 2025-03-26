import { addSimpleFeedback } from "@/actions/add-feedback"
import { NextResponse } from "next/server"

{/*
    Tasks:
        1. See if params are correct
        2. Save data to /products/{productId}/feedbacks/
        3. Add component ref to te db
    */}

type SaveDataProps = {
    productId: string;
    componentId: string;
    feedback: string;
    userInfo?: {
        userId?: string;
        username?: string;
        profilePicture?: string;
    };
}

export async function POST(req: Request) {
    console.log(`Enter save-data`)
    try {
        const {productId, componentId, feedback, userInfo}: SaveDataProps = await req.json()

        if (!productId || !componentId || !feedback) {
            return NextResponse.json({ success: false, error: "Missing required parameters" }, {
                headers: { 'Content-Type': 'application/json' },
                status: 400
            })
        }
        
        const { success } = await addSimpleFeedback({
            content: feedback,
            productId: productId,
            componentRefId: componentId,
            userInfo: userInfo || null
        })
        if (!success) {
            return NextResponse.json({ success: false, error: "Failed to save feedback" }, {
                headers: { 'Content-Type': 'application/json' },
                status: 500
            })
        }
        
        return NextResponse.json({ success: true }, {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        })
    } catch (error) {
        console.error("Error in save-data route:", error)
        return NextResponse.json({ success: false, error: "Internal server error" }, {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        })
    }
}