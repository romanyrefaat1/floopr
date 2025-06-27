"use client"

import {getEmbedding} from "@/lib/embedText"

export default function TestGetEmbedding() {
    const handleClick = async()=>{
        await getEmbedding("hello")
    }
    return (
        <button onClick={handleClick}>Get Embedding</button>
    )
}