"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { ChangelogItem } from "@/types/changelog";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function ChangelogAddDialog({
  open,
  setOpen,
  productId,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  productId: string;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const [changes, setChanges] = useState<
    { type: "feature" | "improvement" | "bugfix"; content: string }[]
  >([]);
  const [changeType, setChangeType] = useState<
    "feature" | "improvement" | "bugfix"
  >("feature");
  const [changeContent, setChangeContent] = useState("");
  const [feedbackId, setFeedbackId] = useState("");
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackLink, setFeedbackLink] = useState("");
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddChange = () => {
    if (!changeContent) return;
    setChanges([...changes, { type: changeType, content: changeContent }]);
    setChangeContent("");
  };

  const handleAdd = async () => {
    if (!title || !version) {
      setError("Title and version are required.");
      return;
    }
    setLoading(true);
    setError(null);
    const newEntry: Partial<ChangelogItem> = {
      version,
      date: new Date(),
      title,
      description,
      changes,
      feedbackRef:
        feedbackId && feedbackName
          ? { feedbackId, name: feedbackName }
          : undefined,
      feedbackLink: feedbackLink || undefined,
      feedbackTitle: feedbackTitle || undefined,
    };
    try {
      const collectionRef = collection(db, "products", productId, "updates");
      await addDoc(collectionRef, {
        ...newEntry,
        date: serverTimestamp(),
      });
      setOpen(false);
      setTitle("");
      setDescription("");
      setVersion("");
      setChanges([]);
      setFeedbackId("");
      setFeedbackName("");
      setFeedbackLink("");
      setFeedbackTitle("");
    } catch (error) {
      setError("Failed to add changelog entry.");
      console.error("Failed to add changelog entry:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Add Changelog Entry</h2>
        <Input
          placeholder="Version (e.g. 1.2.0)"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2"
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2"
        />
        <div className="mb-2">
          <div className="flex gap-2 mb-1">
            <select
              value={changeType}
              onChange={(e) => setChangeType(e.target.value as any)}
              className="border rounded px-2 py-1"
            >
              <option value="feature">Feature</option>
              <option value="improvement">Improvement</option>
              <option value="bugfix">Bugfix</option>
            </select>
            <Input
              placeholder="Change description"
              value={changeContent}
              onChange={(e) => setChangeContent(e.target.value)}
              className="flex-1"
            />
            <Button type="button" onClick={handleAddChange} variant="secondary">
              Add
            </Button>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            {changes.map((c, i) => (
              <li key={i} className="flex gap-2 items-center">
                <span className="font-mono px-2 py-0.5 rounded bg-muted">
                  {c.type}
                </span>
                <span>{c.content}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-2">
          <Input
            placeholder="Feedback ID (optional)"
            value={feedbackId}
            onChange={(e) => setFeedbackId(e.target.value)}
            className="mb-1"
          />
          <Input
            placeholder="Feedback Name (optional)"
            value={feedbackName}
            onChange={(e) => setFeedbackName(e.target.value)}
            className="mb-1"
          />
        </div>
        <Input
          placeholder="Feedback Link (optional)"
          value={feedbackLink}
          onChange={(e) => setFeedbackLink(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Feedback Title (optional)"
          value={feedbackTitle}
          onChange={(e) => setFeedbackTitle(e.target.value)}
          className="mb-2"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="default" onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
