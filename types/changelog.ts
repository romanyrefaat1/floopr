export interface ChangelogItem {
  version: string;
  date: Date;
  title: string;
  description?: string;
  imageUrl?: string;
  feedbackLink?: string;
  feedbackTitle?: string;
  changes: Array<{
    type: "improvement" | "bugfix" | "feature";
    content: string;
  }>;
}

export interface ChangelogListProps {
  items: ChangelogItem[];
}
