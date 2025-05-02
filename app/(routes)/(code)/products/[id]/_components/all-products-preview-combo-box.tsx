"use client";

import getUserProducts from "@/actions/user/get-user-products";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function AllProductsPreviewComboBox({
  productId,
}: {
  productId: string;
}) {
  const { userId } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [userProducts, setUserProducts] = React.useState<
    { name: string; docId: string }[]
  >([]);

  // Find all user products
  React.useEffect(() => {
    const fetchUserProducts = async () => {
      if (!userId) {
        return RedirectToSignIn({
          redirectUrl: `/products/${productId}`,
        });
      }

      const allUserProducts = await getUserProducts(userId);
      setUserProducts(
        allUserProducts.map((product) => ({
          name: product.name,
          docId: product.docId,
        }))
      );
      const userProduct = allUserProducts.find(
        (product) => product.docId === productId
      );
      if (userProduct) {
        setValue(userProduct.docId || "");
      }
    };
    fetchUserProducts();
  }, [userId, productId]);

  const currentProduct = userProducts.find(
    (product) => product.docId === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentProduct ? currentProduct.name : "Your product"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandList>
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {userProducts.map((product) => (
                <Link href={`/products/${product.docId}`} key={product.docId}>
                  <CommandItem
                    value={product.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {product.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === product.docId ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
