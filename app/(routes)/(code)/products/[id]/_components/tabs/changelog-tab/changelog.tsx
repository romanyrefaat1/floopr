import ChangelogAddButton from "./changelog-add-button";
import ChangelogList from "./changelog-list";
import { getChangelogItems } from "./changelog-server";

export default async function ChangelogTab({
  productId,
}: {
  productId: string;
}) {
  const items = await getChangelogItems(productId);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Changelog</h2>
        <ChangelogAddButton productId={productId} />
      </div>
      <ChangelogList items={items} productId={productId} />
    </div>
  );
}
