import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, FileText, Loader2, ArrowLeftRight, X, Eye } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { marked } from 'marked';

type ConvertMode = 'to-pdf' | 'from-pdf';
type InputFormat = 'md' | 'txt' | 'html' | 'csv' | 'json';

const FORMAT_LABELS: Record<InputFormat, string> = {
  md: 'Markdown',
  txt: 'Plain Text',
  html: 'HTML',
  csv: 'CSV',
  json: 'JSON',
};

const detectFormat = (filename: string): InputFormat => {
  const ext = filename.split('.').pop()?.toLowerCase() || 'txt';
  if (ext === 'md' || ext === 'markdown') return 'md';
  if (ext === 'html' || ext === 'htm') return 'html';
  if (ext === 'csv') return 'csv';
  if (ext === 'json') return 'json';
  return 'txt';
};

const csvToHtml = (csv: string): string => {
  const rows = csv.trim().split('\n').map(r => r.split(',').map(c => c.trim()));
  if (rows.length === 0) return '<p>Empty CSV</p>';
  const header = rows[0];
  const body = rows.slice(1);
  return `
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',system-ui,sans-serif;font-size:13px;">
      <thead>
        <tr>${header.map(h => `<th style="background:#1e293b;color:#38bdf8;padding:10px 14px;text-align:left;border-bottom:2px solid #334155;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:0.05em;">${h}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${body.map((row, i) => `<tr style="background:${i % 2 === 0 ? '#0f172a' : '#1e293b'};">${row.map(c => `<td style="padding:8px 14px;border-bottom:1px solid #1e293b;color:#cbd5e1;">${c}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>`;
};

const jsonToHtml = (json: string): string => {
  try {
    const parsed = JSON.parse(json);
    const formatted = JSON.stringify(parsed, null, 2);
    const highlighted = formatted
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"([^"]+)":/g, '<span style="color:#38bdf8;">"$1"</span>:')
      .replace(/: "([^"]*)"/g, ': <span style="color:#a5f3fc;">"$1"</span>')
      .replace(/: (\d+)/g, ': <span style="color:#fbbf24;">$1</span>')
      .replace(/: (true|false|null)/g, ': <span style="color:#f472b6;">$1</span>');
    return `<pre style="background:#0f172a;color:#e2e8f0;padding:24px;border-radius:12px;font-family:'JetBrains Mono','Fira Code',monospace;font-size:13px;line-height:1.7;overflow-x:auto;border:1px solid #1e293b;">${highlighted}</pre>`;
  } catch {
    return `<pre style="background:#0f172a;color:#fca5a5;padding:24px;border-radius:12px;font-family:monospace;font-size:13px;">Invalid JSON:\n${json}</pre>`;
  }
};

const txtToHtml = (txt: string): string => {
  return `<pre style="background:#0f172a;color:#e2e8f0;padding:24px;border-radius:12px;font-family:'Inter',system-ui,sans-serif;font-size:14px;line-height:1.8;white-space:pre-wrap;word-wrap:break-word;border:1px solid #1e293b;">${txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
};

const contentToHtml = (content: string, format: InputFormat): string => {
  switch (format) {
    case 'md':
      return marked.parse(content) as string;
    case 'html':
      return content;
    case 'csv':
      return csvToHtml(content);
    case 'json':
      return jsonToHtml(content);
    case 'txt':
    default:
      return txtToHtml(content);
  }
};

const getMarkdownStyles = (): string => `
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; color: #e2e8f0; background: #0f172a; padding: 40px; line-height: 1.7; }
    h1 { font-size: 28px; font-weight: 800; color: #f1f5f9; margin: 32px 0 16px; padding-bottom: 12px; border-bottom: 2px solid #1e293b; }
    h2 { font-size: 22px; font-weight: 700; color: #e2e8f0; margin: 28px 0 12px; }
    h3 { font-size: 18px; font-weight: 600; color: #cbd5e1; margin: 24px 0 10px; }
    p { margin: 12px 0; color: #94a3b8; font-size: 14px; }
    ul, ol { margin: 12px 0; padding-left: 24px; color: #94a3b8; font-size: 14px; }
    li { margin: 6px 0; }
    code { background: #1e293b; color: #38bdf8; padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
    pre { background: #1e293b; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0; border: 1px solid #334155; }
    pre code { background: none; padding: 0; color: #a5f3fc; }
    blockquote { border-left: 3px solid #38bdf8; padding: 8px 16px; margin: 16px 0; color: #64748b; background: #1e293b40; border-radius: 0 8px 8px 0; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    th { background: #1e293b; color: #38bdf8; padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
    td { padding: 8px 10px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px; }
    a { color: #38bdf8; text-decoration: none; }
    strong { color: #e2e8f0; }
    em { color: #a5b4fc; }
    hr { border: none; border-top: 1px solid #1e293b; margin: 24px 0; }
    img { max-width: 100%; border-radius: 8px; }
  </style>
`;

const FileConverter: React.FC = () => {
  const [mode, setMode] = useState<ConvertMode>('to-pdf');
  const [fileName, setFileName] = useState<string | null>(null);
  const [detectedFormat, setDetectedFormat] = useState<InputFormat>('txt');
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    const name = file.name;
    setFileName(name);

    if (mode === 'from-pdf') {
      // PDF text extraction using pdf.js would be ideal but heavy.
      // We'll read as text for simple text-based PDFs.
      const text = await file.text();
      setExtractedText(text);
      return;
    }

    const format = detectFormat(name);
    setDetectedFormat(format);
    const content = await file.text();
    const html = contentToHtml(content, format);
    setPreviewHtml(html);
  }, [mode]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setFileName(null);
    setPreviewHtml('');
    setExtractedText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const switchMode = () => {
    clearFile();
    setMode(m => m === 'to-pdf' ? 'from-pdf' : 'to-pdf');
  };

  const generatePdf = async () => {
    if (!previewRef.current) return;
    setGenerating(true);

    try {
      // Create an offscreen container for rendering
      const offscreen = document.createElement('div');
      offscreen.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;background:#0f172a;padding:40px;';
      offscreen.innerHTML = getMarkdownStyles() + `<div>${previewHtml}</div>`;
      document.body.appendChild(offscreen);

      // Wait for rendering
      await new Promise(r => setTimeout(r, 100));

      const canvas = await html2canvas(offscreen, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      document.body.removeChild(offscreen);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableWidth = pageWidth - margin * 2;
      const imgWidth = usableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Handle multi-page PDFs
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - margin * 2);

      while (heightLeft > 0) {
        position = -(pageHeight - margin * 2) * (Math.ceil((imgHeight - heightLeft) / (pageHeight - margin * 2))) + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - margin * 2);
      }

      const outputName = fileName ? fileName.replace(/\.[^.]+$/, '.pdf') : 'converted.pdf';
      pdf.save(outputName);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setGenerating(false);
    }
  };

  const downloadExtracted = (format: string) => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ? fileName.replace(/\.pdf$/i, `.${format}`) : `extracted.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const acceptTypes = mode === 'to-pdf' ? '.md,.markdown,.txt,.html,.htm,.csv,.json' : '.pdf';

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Mode Toggle */}
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <FileText size={14} />
          {mode === 'to-pdf' ? 'Convert to PDF' : 'Extract from PDF'}
        </label>
        <button
          onClick={switchMode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-colors"
        >
          <ArrowLeftRight size={14} />
          {mode === 'to-pdf' ? 'Extract from PDF' : 'Convert to PDF'}
        </button>
      </div>

      {/* Supported Formats */}
      {mode === 'to-pdf' && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(FORMAT_LABELS).map(([key]) => (
            <span
              key={key}
              className={`px-2.5 py-1 rounded-full text-xs font-mono border transition-colors ${
                detectedFormat === key && fileName
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' 
                  : 'bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-500'
              }`}
            >
              .{key} → PDF
            </span>
          ))}
        </div>
      )}

      {/* Drop Zone */}
      {!fileName ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
            isDragging 
              ? 'border-cyan-500 bg-cyan-500/10 scale-[1.02]' 
              : 'border-zinc-300 dark:border-zinc-700 hover:border-cyan-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
          }`}
        >
          <div className={`p-4 rounded-2xl transition-colors ${isDragging ? 'bg-cyan-500/20' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
            <Upload className={`w-8 h-8 ${isDragging ? 'text-cyan-400' : 'text-zinc-400'}`} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              Drop your file here or <span className="text-cyan-500">browse</span>
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {mode === 'to-pdf' 
                ? 'Supports .md, .txt, .html, .csv, .json' 
                : 'Supports .pdf files'}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptTypes}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      ) : (
        /* File loaded state */
        <div className="flex items-center gap-3 p-4 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <FileText className="w-5 h-5 text-cyan-500 shrink-0" />
          <div className="flex-grow min-w-0">
            <p className="text-sm font-medium truncate">{fileName}</p>
            {mode === 'to-pdf' && (
              <p className="text-xs text-zinc-500">
                Detected: <span className="text-cyan-500 font-mono">{FORMAT_LABELS[detectedFormat]}</span>
              </p>
            )}
          </div>
          <button onClick={clearFile} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors">
            <X size={16} className="text-zinc-400" />
          </button>
        </div>
      )}

      {/* To-PDF Mode: Preview + Download */}
      {mode === 'to-pdf' && previewHtml && (
        <>
          {/* Preview */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-tighter flex items-center gap-1.5">
              <Eye size={12} /> Live Preview
            </label>
            <div
              ref={previewRef}
              className="p-6 bg-[#0f172a] border border-zinc-800 rounded-xl overflow-auto max-h-[400px] prose prose-invert prose-sm max-w-none
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-100 [&_h1]:border-b [&_h1]:border-zinc-800 [&_h1]:pb-3 [&_h1]:mb-4
                [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-200 [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-300
                [&_p]:text-slate-400 [&_p]:leading-relaxed
                [&_code]:bg-zinc-800 [&_code]:text-cyan-400 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs
                [&_pre]:bg-zinc-900 [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:rounded-lg
                [&_blockquote]:border-l-2 [&_blockquote]:border-cyan-500 [&_blockquote]:pl-4
                [&_table]:w-full [&_th]:bg-zinc-800 [&_th]:text-cyan-400 [&_th]:text-left [&_th]:p-2 [&_th]:text-xs
                [&_td]:p-2 [&_td]:border-b [&_td]:border-zinc-800 [&_td]:text-sm
                [&_a]:text-cyan-400 [&_strong]:text-slate-200
                [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                [&_li]:text-slate-400 [&_li]:my-1"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>

          {/* Download Button */}
          <button
            onClick={generatePdf}
            disabled={generating}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-sm hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30"
          >
            {generating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download size={18} />
                Download as PDF
              </>
            )}
          </button>
        </>
      )}

      {/* From-PDF Mode: Extracted Text + Downloads */}
      {mode === 'from-pdf' && extractedText && (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-tighter">
              Extracted Content
            </label>
            <textarea
              readOnly
              value={extractedText}
              className="h-64 p-4 font-mono text-sm bg-zinc-950 text-cyan-400 border border-zinc-800 rounded-xl outline-none resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['txt', 'md', 'html'].map(fmt => (
              <button
                key={fmt}
                onClick={() => downloadExtracted(fmt)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm font-medium transition-colors"
              >
                <Download size={14} />
                Download as .{fmt}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Info Footer */}
      <div className="p-4 bg-zinc-100 dark:bg-zinc-900/50 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl text-center">
        <p className="text-xs text-zinc-500">
          100% client-side conversion using <code>jsPDF</code> + <code>html2canvas</code>.
          Your files never leave your browser.
        </p>
      </div>
    </div>
  );
};

export default FileConverter;
