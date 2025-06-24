import { SidebarTrigger } from "@/components/ui/sidebar";
import NewProductFormClient from "./_components/NewProductFormClient";

export default function NewProductPage() {
  return (
    <div>
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <NewProductFormClient />
    </div>
  );
}
