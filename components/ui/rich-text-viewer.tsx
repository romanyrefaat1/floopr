import { Editor, EditorState, convertFromRaw } from "draft-js";
import React, { useState, useEffect } from "react";
import "draft-js/dist/Draft.css";

interface DraftJsViewerProps {
  content: object | string;
  className?: string;
  style?: React.CSSProperties;
}

const RichTextViewer: React.FC<DraftJsViewerProps> = ({
  content,
  className = "",
  style = {},
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  if (!content || !(content as any).blocks || typeof content === "string") {
    return <p>{content}</p>;
  }

  useEffect(() => {
    try {
      const contentState = convertFromRaw(content);
      setEditorState(EditorState.createWithContent(contentState));
    } catch (error) {
      console.error("Error converting raw content:", error);
    }
  }, [content]);

  return (
    <div className={className} style={style}>
      <Editor editorState={editorState} readOnly={true} />
    </div>
  );
};

export default RichTextViewer;
