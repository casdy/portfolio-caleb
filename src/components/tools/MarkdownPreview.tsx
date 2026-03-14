import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import useClipboard from '../../hooks/useClipboard';
import { Copy, Check, FileEdit, Eye } from 'lucide-react';

const MarkdownPreview: React.FC = () => {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is a **live** preview of Markdown.\n\n- Lists\n- Links [Caleb Labs](https://caleblabs.tech)\n- Tables\n\n| Item | Qty |\n| :--- | :-- |\n| Apple| 5   |');
  const { isCopied, copy } = useClipboard();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <FileEdit size={14} /> Editor
          </label>
          <button
            onClick={() => copy(markdown)}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
          >
             {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="flex-grow p-4 font-mono text-sm bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none resize-none"
          placeholder="Type markdown here..."
        />
      </div>

      <div className="flex flex-col gap-4 overflow-hidden">
        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Eye size={14} /> Preview
        </label>
        <div className="flex-grow p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-y-auto prose prose-sm dark:prose-invert prose-cyan max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreview;
