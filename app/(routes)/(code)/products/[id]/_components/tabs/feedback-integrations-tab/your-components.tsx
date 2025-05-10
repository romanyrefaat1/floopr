import ComponentCard from "../component-card";
import { Product } from "@/contexts/multistep-form-context";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function YourComponents({
  productId,
  productData,
}: {
  productId: string;
  productData: Product;
}) {
  // fetch components
  const response = collection(db, `products`, productId, `components`);
  const componentsDocs = await getDocs(response);
  const components = componentsDocs.docs || [];
  console.log(`components docs`, components.docs);

  if (!components || components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] h-full">
        <h2 className="text-3xl font-bold mb-[15px]">No Components Found</h2>
        <p className="text-mutedForeground">
          You haven't created any components yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-[25px]">Your Components</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {components.map((component) => {
          const data = component.data();
          console.log(`component data jsx`, data);
          return (
            <ComponentCard
              key={component.id}
              productData={productData}
              componentData={data}
              isYours={true}
            />
          );
        })}
      </div>
    </div>
  );
}
