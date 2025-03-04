import { cn } from "@/lib/utils"

type SpecialBackgroundTextProps = {
    children: React.ReactNode;
    textClassName?: string;
    backClassName?: string;
}

export default function SpecialBackgroundText({children, textClassName,  backClassName}: SpecialBackgroundTextProps) {
    return (
        <span className="relative">
            <span className={cn("absolute left-[-20px] rotate-[-2deg] inset-0 bg-accent w-[calc(100% + 50px)] z-10", backClassName)} />
            <span className={cn("relative z-20 font-medium text-secondary", textClassName)}>{children}</span>
        </span>
    )
}