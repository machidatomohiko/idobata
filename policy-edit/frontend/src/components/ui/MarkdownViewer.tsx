// src/components/ui/MarkdownViewer.tsx
import type React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight"; // Syntax highlighting
import rehypeRaw from "rehype-raw"; // To handle raw HTML, like embedded images
import rehypeSanitize from "rehype-sanitize"; // Sanitize HTML for security
import rehypeSlug from "rehype-slug"; // Add anchor IDs to headings
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
  // Add event listener for hash changes to enable smooth scrolling
  React.useEffect(() => {
    const handleHashChange = () => {
      if (location.hash) {
        // Wait a bit to ensure the page is fully rendered before scrolling
        setTimeout(() => {
          const targetElement = document.querySelector(location.hash);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 300); // Adjust timeout as needed for your app's rendering speed
      }
    };

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Check on mount if there's already a hash in the URL
    if (location.hash) {
      handleHashChange();
    }

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="markdown-body">
      {" "}
      {/* Use github-markdown-css class, remove others */}
      {/* Apply Tailwind Typography plugin class */}
      {/* Adjust prose classes as needed (e.g., prose-sm, prose-lg) */}
      <ReactMarkdown
        // className prop removed from here
        remarkPlugins={[remarkGfm]} // Enable GFM features
        rehypePlugins={[rehypeSlug, rehypeRaw, rehypeSanitize, rehypeHighlight]} // Add anchor IDs to headings, enable raw HTML, sanitize, and syntax highlighting
        // Optional: Customize components (e.g., links to open in new tabs)
        // Optional: Customize components (e.g., links to open in new tabs)
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          // Custom heading component with anchor links
          h1: ({ node, children, ...props }) => (
            <h1 {...props}>
              {children}
              {/* Add anchor link after the heading */}
              {props.id && (
                <a
                  href={`#${props.id}`}
                  className="anchor-link"
                  aria-hidden="true"
                  title="Anchor link"
                >
                  🔗
                </a>
              )}
            </h1>
          ),
          h2: ({ node, children, ...props }) => (
            <h2 {...props}>
              {children}
              {/* Add anchor link after the heading */}
              {props.id && (
                <a
                  href={`#${props.id}`}
                  className="anchor-link"
                  aria-hidden="true"
                  title="Anchor link"
                >
                  🔗
                </a>
              )}
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 {...props}>
              {children}
              {/* Add anchor link after the heading */}
              {props.id && (
                <a
                  href={`#${props.id}`}
                  className="anchor-link"
                  aria-hidden="true"
                  title="Anchor link"
                >
                  🔗
                </a>
              )}
            </h3>
          ),
          h4: ({ node, children, ...props }) => (
            <h4 {...props}>
              {children}
              {/* Add anchor link after the heading */}
              {props.id && (
                <a
                  href={`#${props.id}`}
                  className="anchor-link"
                  aria-hidden="true"
                  title="Anchor link"
                >
                  🔗
                </a>
              )}
            </h4>
          ),
          h5: ({ node, children, ...props }) => (
            <h5 {...props}>
              {children}
              {/* Add anchor link after the heading */}
              {props.id && (
                <a
                  href={`#${props.id}`}
                  className="anchor-link"
                  aria-hidden="true"
                  title="Anchor link"
                >
                  🔗
                </a>
              )}
            </h5>
          ),
          h6: ({ node, children, ...props }) => (
            <h6 {...props}>
              {children}
              {/* Add anchor link after the heading */}
              {props.id && (
                <a
                  href={`#${props.id}`}
                  className="anchor-link"
                  aria-hidden="true"
                  title="Anchor link"
                >
                  🔗
                </a>
              )}
            </h6>
          ),
          // You can customize other elements like code blocks, etc.
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
