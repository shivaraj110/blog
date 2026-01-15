"use client";

import { useState, useEffect } from "react";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import markdown from "highlight.js/lib/languages/markdown";
import type { MDXComponents } from "mdx/types";

// Register languages
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("md", markdown);

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200 px-2 py-1 rounded hover:bg-zinc-700/50"
    >
      {copied ? (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-400"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

interface CodeBlockProps {
  language: string;
  code: string;
}

function CodeBlock({ language, code }: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    try {
      const lang = language.toLowerCase();
      if (hljs.getLanguage(lang)) {
        const result = hljs.highlight(code, {
          language: lang,
          ignoreIllegals: true,
        });
        setHighlighted(result.value);
      } else {
        const result = hljs.highlightAuto(code);
        setHighlighted(result.value);
      }
    } catch (e) {
      console.error("Highlight error:", e);
      setHighlighted(null);
    }
  }, [code, language]);

  return (
    <div className="code-block my-6 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
          {language}
        </span>
        <CopyButton code={code} />
      </div>
      <pre className="overflow-x-auto">
        {highlighted ? (
          <code
            className="hljs block p-4 text-sm font-mono leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <code className="block p-4 text-sm font-mono text-zinc-200 leading-relaxed">
            {code}
          </code>
        )}
      </pre>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="text-2xl font-semibold text-zinc-100 mt-10 mb-4 tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-semibold text-zinc-100 mt-8 mb-3 tracking-tight"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-zinc-400 leading-relaxed mb-5" {...props} />
  ),
  a: (props) => (
    <a
      className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="text-zinc-100 font-semibold" {...props} />
  ),
  ul: (props) => (
    <ul className="text-zinc-400 mb-5 pl-6 list-disc space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol
      className="text-zinc-400 mb-5 pl-6 list-decimal space-y-2"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-zinc-700 pl-4 my-6 text-zinc-400 italic"
      {...props}
    />
  ),
  // Handle the pre element - this wraps fenced code blocks
  pre: (props) => {
    const { children } = props;
    // Check if children is a code element with props
    if (
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props
    ) {
      const { className, children: codeChildren } = children.props;
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "text";
      const code = String(codeChildren).replace(/\n$/, "");
      return <CodeBlock language={language} code={code} />;
    }
    // Fallback for non-code pre blocks
    return <pre className="overflow-x-auto" {...props} />;
  },
  // Inline code only
  code: ({ children, className, ...props }) => {
    // If there's a className with language-, it's handled by pre
    if (className && className.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    // Inline code
    return (
      <code
        className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
};
