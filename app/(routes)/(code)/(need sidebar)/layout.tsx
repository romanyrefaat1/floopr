import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookieStore = await cookies();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
      <main className="w-full pt-4 md:ml-5 md:pt-5 pr-5 md:pr-8">
        {children}
      </main>
  );
}
