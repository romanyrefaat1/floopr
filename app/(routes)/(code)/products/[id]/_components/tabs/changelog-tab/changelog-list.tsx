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
      items={changelog}
      productId={productId}
      loading={typeof loadingProp === "boolean" ? loadingProp : loading}
    />
  );
}
