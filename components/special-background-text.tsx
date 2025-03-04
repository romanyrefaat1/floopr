import { cn } from "@/lib/utils"

type SpecialBackgroundTextProps = {
    text: React.ReactNode;
    textClassName?: string;
    backClassName?: string;
}

export default function SpecialBackgroundText({text, textClassName,  backClassName}: SpecialBackgroundTextProps) {
    return (
        <span className="relative">
            <span className={cn("absolute left-[-15px] rotate-[.2deg] inset-0 bg-[#eee] w-[calc(100% + 50px)] z-[10]", backClassName)} />
            <span className={cn("relative z-[20] font-medium", textClassName)}>{text}</span>
        </span>
    )
}