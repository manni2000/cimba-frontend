import { DocumentsState } from '../types/document';

const STORAGE_KEY = 'markdown-editor-state';

export const saveState = (state: DocumentsState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

export const loadState = (): DocumentsState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};