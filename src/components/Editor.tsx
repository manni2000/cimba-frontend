import React, { useRef, useState, useEffect } from 'react';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';
import DocumentTitle from './DocumentTitle';
import { Document } from '../types/document';
import EditorToolbar from './EditorToolbar';

interface EditorProps {
  document: Document;
}

const Editor: React.FC<EditorProps> = ({ document }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(document.content);

  // Keep local state in sync with document changes
  useEffect(() => {
    setContent(document.content);
  }, [document.content]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden">
      <div className="border-b dark:border-gray-700 p-4">
        <DocumentTitle id={document.id} title={document.title} />
      </div>
      
      <EditorToolbar
        documentId={document.id}
        textareaRef={textareaRef}
        content={content}
        setContent={setContent}
      />
      
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        <div className="flex-1 border-b md:border-b-0 md:border-r dark:border-gray-700 min-h-[300px] md:min-h-0">
          <MarkdownEditor
            document={document}
            textareaRef={textareaRef}
            content={content}
            setContent={setContent}
          />
        </div>
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800 min-h-[300px] md:min-h-0">
          <MarkdownPreview content={content} />
        </div>
      </div>
    </div>
  );
};

export default Editor;