import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { createDocument } from './store/documentsSlice';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

function App() {
  const dispatch = useDispatch();
  const { documents, activeDocumentId, darkMode } = useSelector((state: RootState) => state.documents);

  const activeDocument = documents.find(doc => doc.id === activeDocumentId);

  // Create a default document if none exists
  useEffect(() => {
    if (documents.length === 0) {
      dispatch(createDocument());
    }
  }, [dispatch, documents.length]);

  // Apply dark mode to the html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col transition-colors duration-200`}>
      <Header />
      
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="w-full md:w-72 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1">
          {activeDocument ? (
            <Editor document={activeDocument} />
          ) : (
            <div className="h-full flex items-center justify-center bg-white dark:bg-gray-900 shadow-md rounded-md">
              <p className="text-gray-500 dark:text-gray-400">Select a document or create a new one</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;