import { ChangelogItem } from "@/types/changelog";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getChangelogItems(productId: string): Promise<ChangelogItem[]> {
  const changelogRef = collection(db, "products", productId, "updates");
  const q = query(changelogRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      version: data.version,
      date: data.date?.toDate ? data.date.toDate() : new Date(data.date),
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      feedbackLink: data.feedbackLink,
      feedbackTitle: data.feedbackTitle,
      feedbackRef: data.feedbackRef,
      changes: data.changes || [],
    };
  });
}
