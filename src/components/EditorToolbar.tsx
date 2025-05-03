import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Bold, Italic, List, ListOrdered, Link, Code } from "lucide-react";

interface EditorToolbarProps {
  documentId: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  setContent: (value: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  documentId,
  textareaRef,
  content,
  setContent,
}) => {
  const selectedDocument = useSelector((state: RootState) =>
    state.documents.documents.find((doc) => doc.id === documentId)
  );

  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!selectedDocument) return null;

  const previewFullScreen = () => {
    const editorElement = document.getElementById("editor-container");
    if (editorElement) {
      if (!document.fullscreenElement) {
        editorElement.requestFullscreen();
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const insertText = (
    before: string,
    after: string = "",
    replaceSelectionWith?: string
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let replacement: string;
    if (replaceSelectionWith !== undefined) {
      replacement = replaceSelectionWith;
    } else {
      replacement = before + selectedText + after;
    }
    const newContent =
      content.substring(0, start) + replacement + content.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      let newPosition = start + before.length;
      let newEndPosition =
        replaceSelectionWith !== undefined
          ? start + replacement.length
          : newPosition + selectedText.length;
      textarea.setSelectionRange(newPosition, newEndPosition);
    }, 0);
  };

  const handleBold = () => insertText("**", "**");
  const handleItalic = () => insertText("*", "*");
  const handleCode = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (selectedText && selectedText.includes("\n")) {
      insertText("```\n", "\n```");
    } else {
      insertText("`", "`");
    }
  };
  const handleLink = () => insertText("[", "](url)");
  const handleBulletList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (selectedText) {
      const bulletPoints = selectedText
        .split("\n")
        .map((line) => (line.trim() ? `- ${line}` : line))
        .join("\n");
      insertText("", "", bulletPoints);
    } else {
      insertText("- ");
    }
  };
  const handleNumberedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (selectedText) {
      const numberedPoints = selectedText
        .split("\n")
        .map((line, index) => (line.trim() ? `${index + 1}. ${line}` : line))
        .join("\n");
      insertText("", "", numberedPoints);
    } else {
      insertText("1. ");
    }
  };

  const exportMarkdown = () => {
    if (typeof window === "undefined") return;

    const blob = new Blob([selectedDocument.content], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${selectedDocument.title}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={handleBold}
          icon={<Bold size={16} />}
          label="Bold"
        />
        <ToolbarButton
          onClick={handleItalic}
          icon={<Italic size={16} />}
          label="Italic"
        />
        <ToolbarButton
          onClick={handleCode}
          icon={<Code size={16} />}
          label="Code"
        />
        <ToolbarButton
          onClick={handleLink}
          icon={<Link size={16} />}
          label="Link"
        />
        <ToolbarButton
          onClick={handleBulletList}
          icon={<List size={16} />}
          label="Bullet List"
        />
        <ToolbarButton
          onClick={handleNumberedList}
          icon={<ListOrdered size={16} />}
          label="Numbered List"
        />
      </div>

      <div className="ml-auto">
        <button
          onClick={exportMarkdown}
          className="py-1 px-3 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-none transition-colors duration-200"
        >
          Export .md
        </button>

        <button
          onClick={previewFullScreen}
          className="py-1 px-3 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-none transition-colors duration-200"
        >
          Preview full screen
        </button>
      </div>
    </div>
  );
};

interface ToolbarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  icon,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200"
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );
};

export default EditorToolbar;

