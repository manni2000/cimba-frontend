import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateDocument } from '../store/documentsSlice';
import { Edit2 } from 'lucide-react';

interface DocumentTitleProps {
  id: string;
  title: string;
}

const DocumentTitle: React.FC<DocumentTitleProps> = ({ id, title }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSaveTitle = () => {
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle && trimmedTitle !== title) {
      dispatch(updateDocument({ id, title: trimmedTitle }));
    } else {
      setEditedTitle(title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        onBlur={handleSaveTitle}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 text-xl font-bold border-b-2 border-blue-500 outline-none bg-transparent dark:text-white"
        aria-label="Edit document title"
      />
    );
  }

  return (
    <div 
      className="group flex items-center space-x-2 cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <h1 className="text-xl font-bold dark:text-white">{title}</h1>
      <Edit2 className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
};

export default DocumentTitle;