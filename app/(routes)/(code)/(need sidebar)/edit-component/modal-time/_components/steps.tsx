import { Check } from "lucide-react";

export default function Steps({inStep=1}: {inStep: number}){
    const checkMark = <Check size={40}/>

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div 
                    className="circle flex items-center justify-center rounded-full border-[1px] w-[50px] aspect-square border-black"
                >
                    {inStep === 1 && checkMark}
                </div>
                <div>
                    <h2 className="text-lg font-medium">Review Step</h2>
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-full h-[6px] bg-black"></div>
            </div>
            <div className="flex flex-col items-center">
                <div 
                    className="circle flex items-center justify-center rounded-full border-[1px] w-[50px] aspect-square border-black"
                >
                    {inStep === 2 && checkMark}
                </div>
                <div>
                    <h2 className="text-lg font-medium">Success Step</h2>
                </div>
            </div>
        </div>
    )
}