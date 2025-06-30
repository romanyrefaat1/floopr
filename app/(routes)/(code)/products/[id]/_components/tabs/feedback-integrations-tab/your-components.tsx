import getAllComponentsByProductId from "@/actions/get-all-components-by-product-id";
import ComponentCard from "../component-card";
import { Product } from "@/contexts/multistep-form-context";

export default async function YourComponents({
  productId,
  productData,
}: {
  productId: string;
  productData: Product;
}) {
  // fetch components
  const components = await getAllComponentsByProductId(productId);

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
          
          return (
            <ComponentCard
              key={component.id}
              productData={productData}
              componentData={components}
              isYours={true}
            />
          );
        })}
      </div>
    </div>
  );
}
