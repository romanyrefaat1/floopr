import ComponentCard from "../component-card";
import { Product } from "@/contexts/multistep-form-context";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function AllComponents({
  productData,
}: {
  productData: Product;
}) {
  // fetch components
  const response = collection(db, `integrations`);
  const components = await getDocs(response);
  return (
    <div>
      <h2 className="text-3xl font-bold mb-[25px]">All Components</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {components.docs.map((component) => {
          const data = component.data();
          return (
            <ComponentCard
              key={component.id}
              productData={productData}
              componentData={data}
              imageUrl={data.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
