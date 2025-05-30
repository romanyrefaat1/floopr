import { db } from "@/lib/firebase";
import { ChangelogItem } from "@/types/changelog";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const getChangelog = async (
  productId: string
): Promise<ChangelogItem[]> => {
  try {
    const changelogRef = collection(db, "products", productId, "changelog");
    const q = query(changelogRef, orderBy("date", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        version: data.version,
        date: data.date.toDate(),
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        feedbackLink: data.feedbackLink,
        feedbackTitle: data.feedbackTitle,
        changes: data.changes || [],
      };
    });
  } catch (error) {
    console.error("Error fetching changelog:", error);
    return [];
  }
};
