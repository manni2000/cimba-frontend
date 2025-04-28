import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDocument } from '../store/documentsSlice';
import { RootState } from '../store/store';
import DocumentList from './DocumentList';
import SearchBar from './SearchBar';
import { FilePlus } from 'lucide-react';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { documents } = useSelector((state: RootState) => state.documents);

  const handleCreateDocument = () => {
    dispatch(createDocument());
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold dark:text-white">Documents</h2>
          <button
            onClick={handleCreateDocument}
            className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
            aria-label="Create new document"
          >
            <FilePlus className="h-5 w-5" />
          </button>
        </div>
        <SearchBar />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <DocumentList />
      </div>
      
      <div className="p-4 border-t dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        {documents.length} {documents.length === 1 ? 'document' : 'documents'}
      </div>
    </div>
  );
};

export default Sidebar;