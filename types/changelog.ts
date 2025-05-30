export interface ChangelogItem {
  version: string;
  date: Date;
  title: string;
  description?: string;
  imageUrl?: string;
  feedbackLink?: string;
  feedbackTitle?: string;
  feedbackRef?: {
    feedbackId: string;
    name: string;
  };
  changes: Array<{
    type: "improvement" | "bugfix" | "feature";
    content: string;
  }>;
}

export interface ChangelogList {
  items: ChangelogItem[];
}
