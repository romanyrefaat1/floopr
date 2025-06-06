import ChangelogListClient from "./ChangelogListClient";
import { useChangelog } from "@/contexts/changelog-context";

export default function ChangelogList({
  productId,
  loading: loadingProp,
}: {
  productId: string;
  loading?: boolean;
}) {
  const { changelog, loading } = useChangelog();
  return (
    <ChangelogListClient
      productId={productId}
      items={changelog || []}
      loading={typeof loadingProp === "boolean" ? loadingProp : loading}
    />
  );
}
