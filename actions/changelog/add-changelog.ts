import { db } from "@/lib/firebase";
import { ChangelogEntry } from "@/types/changelog";
import { addDoc, collection } from "firebase/firestore";

export const addChangelog = async (
  productId: string,
  changelogData: Omit<ChangelogEntry, "id" | "createdAt">
) => {
  try {
    const changelogRef = collection(db, "products", productId, "changelog");
    const docRef = await addDoc(changelogRef, {
      ...changelogData,
      createdAt: new Date(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding changelog:", error);
    return { success: false, error: "Failed to add changelog entry" };
  }
};
