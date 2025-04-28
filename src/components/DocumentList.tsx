import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setActiveDocument, deleteDocument } from '../store/documentsSlice';
import { FileText, Trash2 } from 'lucide-react';

const DocumentList: React.FC = () => {
  const dispatch = useDispatch();
  const { documents, activeDocumentId, searchTerm } = useSelector((state: RootState) => state.documents);

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectDocument = (id: string) => {
    dispatch(setActiveDocument(id));
  };

  const handleDeleteDocument = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(deleteDocument(id));
  };

  if (filteredDocuments.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        {searchTerm ? 'No documents match your search' : 'No documents yet'}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {filteredDocuments.map(document => (
        <li
          key={document.id}
          onClick={() => handleSelectDocument(document.id)}
          className={`
            flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800
            ${activeDocumentId === document.id ? 'bg-blue-50 dark:bg-gray-800' : ''}
            transition-colors duration-150
          `}
        >
          <div className="flex items-center space-x-2 overflow-hidden">
            <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
            <span className="font-medium truncate">{document.title}</span>
          </div>
          <button
            onClick={(e) => handleDeleteDocument(e, document.id)}
            className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
            aria-label="Delete document"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DocumentList;