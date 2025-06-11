// src/components/page-specific/FileView.tsx
import type React from "react";
import { decodeBase64Content } from "../../lib/github"; // Base64デコード関数をインポート
import MarkdownViewer from "../ui/MarkdownViewer"; // Import the actual component

// Define the expected structure for the file data prop
// Should align with the GitHubFile interface from lib/github.ts
// Use the exported type from lib/github.ts for consistency
import type { GitHubFile } from "../../lib/github";

interface FileData
  extends Pick<GitHubFile, "name" | "path" | "content" | "encoding" | "size"> {
  // Add other specific properties needed by FileView if any,
  // or just use GitHubFile directly if all properties might be needed.
  // Using Pick here to only include necessary fields for this component.
  download_url?: string | null; // Make download_url optional if using Pick
}

interface FileViewProps {
  data: FileData; // Expecting a single file data object
}

const FileView: React.FC<FileViewProps> = ({ data }) => {
  // Check if the file is a Markdown file (case-insensitive)
  const isMarkdown = /\.(md|mdx)$/i.test(data.name);

  if (!isMarkdown) {
    // Display message for non-markdown files
    return (
      <div className="p-4 border rounded bg-gray-50 text-center">
        <p className="font-semibold text-gray-700">ファイル：{data.name}</p>
        <p className="mt-2 text-sm text-gray-500">
          このファイルタイプのプレビューはサポートされていません。
        </p>
        {/* Optionally, add a download link if available */}
        {/* {data.download_url && (
            <a
              href={data.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-primary-500 text-white text-xs rounded hover:bg-primary-600"
            >
              ファイルをダウンロード
            </a>
          )} */}
      </div>
    );
  }

  // Decode the Base64 content
  const decodeResult = decodeBase64Content(data.content);
  if (decodeResult.isErr()) {
    return (
      <div className="p-4 border rounded bg-red-50 text-center">
        <p className="font-semibold text-red-700">エラー</p>
        <p className="mt-2 text-sm text-red-500">
          ファイルの内容をデコードできませんでした: {decodeResult.error.message}
        </p>
      </div>
    );
  }

  return <MarkdownViewer content={decodeResult.value} />;
};

export default FileView;
