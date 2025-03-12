import Steps from "./_components/steps";
import EditModalTabs from "./_components/edit-modal-tabs";
import { notFound } from "next/navigation";

export default async function EditModalTimePage({searchParams}){
    const {ref} = await searchParams
    console.log(`ref`, ref)
    if (!ref) notFound()
    return (
        <main>
            <Steps inStep={1} />
            <EditModalTabs productId={ref}/>
        </main>
    )
}