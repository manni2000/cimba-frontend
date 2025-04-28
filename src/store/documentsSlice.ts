import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document, DocumentsState } from '../types/document';
import { loadState, saveState } from '../utils/localStorage';

const initialState: DocumentsState = loadState() || {
  documents: [],
  activeDocumentId: null,
  isLoading: false,
  searchTerm: '',
  darkMode: false,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    createDocument: (state) => {
      const newId = crypto.randomUUID();
      const newDocNumber = state.documents.length + 1;
      
      const newDocument: Document = {
        id: newId,
        title: `Untitled Document ${newDocNumber}`,
        content: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      state.documents.push(newDocument);
      state.activeDocumentId = newId;
      saveState(state);
    },
    
    updateDocument: (state, action: PayloadAction<{ id: string; content?: string; title?: string }>) => {
      const { id, content, title } = action.payload;
      const documentIndex = state.documents.findIndex(doc => doc.id === id);
      
      if (documentIndex !== -1) {
        if (content !== undefined) {
          state.documents[documentIndex].content = content;
        }
        
        if (title !== undefined) {
          state.documents[documentIndex].title = title;
        }
        
        state.documents[documentIndex].updatedAt = Date.now();
        saveState(state);
      }
    },
    
    deleteDocument: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.documents = state.documents.filter(doc => doc.id !== id);
      
      if (state.activeDocumentId === id) {
        state.activeDocumentId = state.documents.length > 0 ? state.documents[0].id : null;
      }
      
      saveState(state);
    },
    
    setActiveDocument: (state, action: PayloadAction<string>) => {
      state.activeDocumentId = action.payload;
      saveState(state);
    },
    
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      saveState(state);
    },
  },
});

export const { 
  createDocument, 
  updateDocument, 
  deleteDocument, 
  setActiveDocument,
  setSearchTerm,
  toggleDarkMode
} = documentsSlice.actions;

export default documentsSlice.reducer;