import EditModalTabs from "../_components/edit-modal-tabs";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

export default async function EditModalTimePage({ searchParams, params }) {
  const { componentId } = params;
  const { ref } = searchParams;

  
  if (!ref) notFound();

  const response = doc(db, `products`, ref);
  const productData = await getDoc(response);

  if (!productData.exists()) notFound();

  const styles = productData.data().style || {};
  

  // Create CSS variables from the product styles
  const mainStyle = {
    "--modal-primary-color": styles.primaryColor || "#3b82f6",
    "--modal-secondary-color": styles.secondaryColor || "#f3f4f6",
    "--modal-accent-color": styles.accentColor || "#dbeafe",
    "--modal-background-color": styles.backgroundColor || "white",
    "--modal-text-color": styles.textColor || "#1f2937",
    "--modal-font-family": styles.fontFamily || "inherit",
    "--modal-font-size": styles.fontSize || "1rem",
    "--modal-heading-style": styles.headingStyle || "normal",
    "--modal-layout": styles.layout || "standard",
    "--modal-spacing": styles.spacing || "1.5rem",
    "--modal-border-radius": styles.borderRadius || "0.375rem",
    "--modal-shadow-style":
      styles.shadowStyle ||
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "--modal-animation": styles.animation || "none",
  };

  return (
    <main style={mainStyle} className="custom-modal-container">
      <h1 className="mb-[25px]">Edit Modal</h1>
      <EditModalTabs
        productId={ref}
        isComponentExists={true}
        componentId={componentId}
        productStyles={styles} // Pass styles as a prop to client components
      />
    </main>
  );
}
