import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateDocument } from '../store/documentsSlice';
import { Document } from '../types/document';
import useDebounce from '../hooks/useDebounce';

interface MarkdownEditorProps {
  document: Document;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  setContent: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  document,
  textareaRef,
  content,
  setContent,
}) => {
  const dispatch = useDispatch();
  const debouncedContent = useDebounce(content, 500);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = content;
    }
  }, [content, textareaRef]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };


  useEffect(() => {
    if (debouncedContent !== document.content) {
      dispatch(updateDocument({ id: document.id, content: debouncedContent }));
    }
  }, [debouncedContent, document.id, document.content, dispatch]);

  return (
    <div className="h-full">
      <textarea
        key={document.id}
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        className="w-full h-full p-4 resize-none font-mono text-md focus:outline-none bg-white dark:bg-gray-900 dark:text-gray-100 border-0"
        placeholder="Write your markdown here..."
        spellCheck={true}
      />
    </div>
  );
};

export default MarkdownEditor;
