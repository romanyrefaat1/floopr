// "use client"

// import { createContext, useState } from "react"

// const LoadingLineContext = createContext(null);

// export default function LoadingLineProvider({children}:{children: React.ReactNode}) {
//     const [isLoadingLine, setIsLoadingLine] = useState();
        
//     return (
//         <LoadingLineContext.Provider value={isLoadingLine, setIsLoadingLine}>
//             {children}
//         </LoadingLineContext.Provider>
//     )
// }

// export function useLoadingLine() {

//     return {isLoadingLine, setIsLoadingLine}
// }