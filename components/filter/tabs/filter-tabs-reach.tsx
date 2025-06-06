import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FilterTabsReach({
  setDialogOpen,
  open,
}: {
  setDialogOpen: (open: boolean) => void;
  open: boolean;
}) {
  const router = useRouter();
  const handleFilter = (filter: string) => {
    setDialogOpen(false);
    router.push(`?filter=${filter}`);
  };
  return (
    <ul>
      <li
        role="button"
        onClick={() => handleFilter(`likes`)}
        className="hover:bg-secondaryBackground p-2 rounded-lg transition cursor-pointer flex items-center gap-4"
      >
        <ThumbsUp size={14} /> Most Liked
      </li>
      {/* <li  role="button" onClick={() => handleFilter(`reaches`)} className="hover:bg-gray-100 p-2 rounded cursor-pointer flex items-center gap-4">
                <ThumbsUp size={14} /> Most Reached
                </li> */}
    </ul>
  );
}
