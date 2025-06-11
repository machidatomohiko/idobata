// src/components/ui/MarkdownViewer.tsx
import type React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting
import rehypeRaw from "rehype-raw"; // To handle raw HTML, like embedded images
import rehypeSanitize from "rehype-sanitize"; // Sanitize HTML for security
import remarkGfm from "remark-gfm"; // GFM (Tables, strikethrough, task lists, etc.)
// Import highlight.js styles (choose a theme)
// You might need to install highlight.js: npm install highlight.js
// Then import the CSS in a global CSS file (e.g., index.css) or here.
// Example: import 'highlight.js/styles/github.css'; // Or github-dark.css, etc.
// Ensure the CSS is imported somewhere in your project for highlighting to work visually.

interface MarkdownViewerProps {
  content: string; // The Markdown content string
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="markdown-body">
      {" "}
      {/* Use github-markdown-css class, remove others */}
      {/* Apply Tailwind Typography plugin class */}
      {/* Adjust prose classes as needed (e.g., prose-sm, prose-lg) */}
      <ReactMarkdown
        // className prop removed from here
        remarkPlugins={[remarkGfm]} // Enable GFM features
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]} // Enable raw HTML, sanitize, and syntax highlighting
        // Optional: Customize components (e.g., links to open in new tabs)
        // Optional: Customize components (e.g., links to open in new tabs)
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          // You can customize other elements like headings, code blocks, etc.
          // code({node, inline, className, children, ...props}) {
          //   const match = /language-(\w+)/.exec(className || '')
          //   return !inline && match ? (
          //      // Custom code block rendering if needed
          //   ) : (
          //     <code className={className} {...props}>
          //       {children}
          //     </code>
          //   )
          // }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
