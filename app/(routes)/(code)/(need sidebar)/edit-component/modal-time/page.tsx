import EditModalTabs from "./_components/edit-modal-tabs";
import { notFound } from "next/navigation";

export default async function CreateModalTimePage({ searchParams }) {
  const { ref: productRef } = await searchParams;
  console.log(`productRef`, productRef);
  if (!productRef) notFound();
  return (
    <main className="p-4">
      {/* <Steps inStep={1} /> */}
      <h1 className="mb-[20px]">Create Modal</h1>
      <EditModalTabs productId={productRef} />
    </main>
  );
}
