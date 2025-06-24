import LatestProducts from "../(need sidebar)/home/_components/latest-products";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";

const ProductsPa = async () => {
  const { userId } = await auth();

  return (
    <main className="p-4 w-full mt-[70px]">
      <div className="md:hidden">
            <SidebarTrigger />
          </div>
      <h2 className="text-3xl mb-[25px] font-bold">Your Products</h2>
      <LatestProducts userId={userId} />
    </main>
    // </SidebarProvider>
  );
};

export default ProductsPa;
