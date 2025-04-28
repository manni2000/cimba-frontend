export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface DocumentsState {
  documents: Document[];
  activeDocumentId: string | null;
  isLoading: boolean;
  searchTerm: string;
  darkMode: boolean;
}