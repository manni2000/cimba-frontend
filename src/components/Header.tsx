import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../store/documentsSlice';
import { RootState } from '../store/store';
import { Sun, Moon, FileText } from 'lucide-react';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.documents.darkMode);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Markdown Editor</h1>
          </div>
          
          <button
            onClick={handleToggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;