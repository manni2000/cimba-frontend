# 📝 Cimba Markdown Editor App

A **web-based Markdown Editor** built for the **Cimba Frontend Hackathon**, allowing users to create, edit, delete, and manage multiple markdown documents — with **local storage persistence** and **live markdown preview**.

<br/>

## 🚀 Project Objective

Develop a modern Markdown Editor that enables users to:

- Create, edit, and delete documents.
- View all saved documents in a list (left panel).
- Edit markdown content with live preview (right panel).
- Automatically save changes to **localStorage** using **Redux Toolkit**.

This project was built under a **24-hour hackathon challenge**.

<br/>

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/) (Vite) + [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Persistence**: LocalStorage (synced with Redux)
- **Markdown Parsing**: [react-markdown](https://github.com/remarkjs/react-markdown)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (CSS-in-JS optional)

<br/>

## ✨ Features

### Core Features
- **Create New Document**  
  - "New Document" button generates documents with titles like `Untitled Document 1`, `Untitled Document 2`, etc.
- **Document List (Left Panel)**  
  - View all saved documents.
  - Click a document to load it in the editor.
  - Edit document titles inline.
  - Delete documents.
- **Markdown Editor (Right Panel)**  
  - Rich textarea for markdown input.
  - Live markdown preview displayed side-by-side.
- **Auto Save**  
  - Changes are automatically saved (debounced) to Redux store and localStorage.
  - Refreshing the page restores all documents and editor state.

### Bonus Features
- 🔍 Search/filter documents by title (optional).
- 📁 Export document as `.md` file (optional).
- 🌙 Dark mode toggle (optional).

<br/>

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/manni2000/cimba-frontend.git

# Navigate to project directory
cd cimba-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will run locally at [http://localhost:5173](http://localhost:5173).

## 🤝 Acknowledgments

- Built as part of the [Cimba](https://cimba.ai/) Frontend Hackathon Challenge.
- Markdown parsing powered by [react-markdown](https://github.com/remarkjs/react-markdown).

<br/> 
