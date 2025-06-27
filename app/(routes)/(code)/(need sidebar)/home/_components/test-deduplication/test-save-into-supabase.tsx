"use client"

import {syncAllFeedbackToSupabaseVectors} from "@/actions/deduplication/fetchAllFeedbacksToVectors"

export default function TestSaveIntoSupabase() {
    const handleClick = async()=>{
        await syncAllFeedbackToSupabaseVectors()
    }
    return (
        <button onClick={handleClick}>Save into Supaabase</button>
    )
}