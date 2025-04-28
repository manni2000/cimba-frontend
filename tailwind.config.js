/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.prose': {
          maxWidth: '100%',
          a: {
            color: '#3b82f6',
            '&:hover': {
              color: '#2563eb',
            },
          },
          h1: {
            fontWeight: '700',
            fontSize: '1.875rem',
            marginBottom: '1rem',
            marginTop: '1.5rem',
          },
          h2: {
            fontWeight: '600',
            fontSize: '1.5rem',
            marginBottom: '0.75rem',
            marginTop: '1.25rem',
          },
          h3: {
            fontWeight: '600',
            fontSize: '1.25rem',
            marginBottom: '0.75rem',
            marginTop: '1rem',
          },
          pre: {
            backgroundColor: '#1e293b',
            color: '#e2e8f0',
            padding: '1rem',
            borderRadius: '0.375rem',
            overflowX: 'auto',
          },
          code: {
            backgroundColor: '#f1f5f9',
            padding: '0.2em 0.4em',
            borderRadius: '0.25rem',
            fontSize: '0.875em',
          },
          'code::before': {
            content: 'none',
          },
          'code::after': {
            content: 'none',
          },
          img: {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '0.375rem',
          },
          blockquote: {
            borderLeftWidth: '4px',
            borderLeftColor: '#e5e7eb',
            paddingLeft: '1rem',
            fontStyle: 'italic',
          },
          hr: {
            borderColor: '#e5e7eb',
            marginTop: '2rem',
            marginBottom: '2rem',
          },
          table: {
            width: '100%',
            borderCollapse: 'collapse',
          },
          'thead, tbody': {
            borderBottomWidth: '1px',
            borderBottomColor: '#e5e7eb',
          },
          'th, td': {
            padding: '0.5rem',
            borderWidth: '1px',
            borderColor: '#e5e7eb',
          },
        },
        '.prose-invert': {
          color: '#e5e7eb',
          a: {
            color: '#60a5fa',
            '&:hover': {
              color: '#93c5fd',
            },
          },
          code: {
            backgroundColor: '#374151',
          },
          blockquote: {
            borderLeftColor: '#4b5563',
          },
          hr: {
            borderColor: '#4b5563',
          },
          'th, td': {
            borderColor: '#4b5563',
          },
        },
      });
    },
  ],
};