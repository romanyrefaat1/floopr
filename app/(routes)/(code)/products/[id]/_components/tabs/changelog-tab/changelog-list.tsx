import ChangelogListClient from "./ChangelogListClient";

export default function ChangelogList({
  items,
  productId,
  loading = false,
}: {
  items: ChangelogItem[];
  productId: string;
  loading?: boolean;
}) {
  return (
    <ChangelogListClient
      items={items}
      productId={productId}
      loading={loading}
    />
  );
}
