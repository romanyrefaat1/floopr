import { SidebarTrigger } from "@/components/ui/sidebar";
import EditModalTabs from "./_components/edit-modal-tabs";
import { notFound } from "next/navigation";

export default async function CreateModalTimePage({ searchParams }) {
  const { ref: productRef } = await searchParams;
  
  if (!productRef) notFound();
  return (
    <main className="p-4">
      <div className="md:hidden">
            <SidebarTrigger />
          </div>
      <h1 className="mb-[20px]">Create Modal</h1>
      <EditModalTabs productId={productRef} />
    </main>
  );
}
