import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div className="h-full overflow-auto p-4 prose dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg dark:text-white">
      {content ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <div className="text-gray-400 dark:text-gray-600 italic">
          Preview will appear here...
        </div>
      )}
    </div>
  );
};

export default MarkdownPreview;