import React, { useState } from 'react';
import { format } from 'date-fns';
import { Copy, Check, Edit, ClipboardCopy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';

interface Props {
  message: Message;
  showTimestamp: boolean;
  onEdit?: () => void;
  isEditing?: boolean;
  theme: 'light' | 'dark';
}

interface CodeBlockProps {
  children: string;
  className?: string;
  theme: 'light' | 'dark';
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, theme }) => {
  const [copied, setCopied] = useState(false);
  const language = className?.replace(/language-/, '') || '';

  const copyCode = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <button
        onClick={copyCode}
        className={`absolute right-2 top-2 p-2 rounded-md opacity-100${
          theme === 'light'
            ? 'text-gray-500 bg-white/80 hover:bg-white/100 shadow-sm hover:text-gray-900'
            : 'text-gray-400 bg-gray-800/80 hover:bg-gray-700/100 hover:text-white'
        } opacity-0 group-hover:opacity-100 backdrop-blur-sm`}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre className={`${className} relative`}>
        <code className={language}>{children}</code>
      </pre>
    </div>
  );
};

export const ChatMessage: React.FC<Props> = ({ message, showTimestamp, onEdit, isEditing, theme }) => {
  const [copied, setCopied] = useState(false);

  const copyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLight = theme === 'light';

  return (
    <div className={`flex gap-4 p-4 ${
      message.role === 'user' 
        ? isLight ? 'bg-gray-100' : 'bg-gray-800'
        : isLight ? 'bg-white' : 'bg-gray-900'
    } ${isEditing ? 'ring-2 ring-blue-600' : ''}`}>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`font-semibold ${isLight ? 'text-gray-900' : 'text-gray-300'}`}>
            {message.role === 'user' ? 'You' : 'AI Assistant'}
          </span>
          {showTimestamp && (
            <span className="text-sm text-gray-500">
              {format(new Date(message.timestamp), 'HH:mm')}
            </span>
          )}
        </div>
        {message.role === 'assistant' && message.thinking && (
          <details className="mb-4">
            <summary className={`cursor-pointer text-sm ${
              isLight ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-300'
            }`}>
              Thinking process ({message.thinkingTime}ms)
            </summary>
            <div className={`mt-2 p-3 rounded text-sm whitespace-pre-wrap ${
              isLight ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-300'
            }`}>
              {message.thinking}
            </div>
          </details>
        )}
        <div className={`prose max-w-none ${isLight ? 'prose-gray' : 'prose-invert'}`}>
          <ReactMarkdown
            components={{
              // Fix invalid nesting of <pre> inside <p>
              p: ({ node, children, ...props }) => {
                // Check if the paragraph contains a code block
                const hasCodeBlock = React.Children.toArray(children).some(
                  child => React.isValidElement(child) && child.type === 'pre'
                );

                // If it contains a code block, render without <p> wrapper
                if (hasCodeBlock) {
                  return <>{children}</>;
                }

                // Otherwise, render as a normal paragraph
                return <p {...props}>{children}</p>;
              },
              // Handle code blocks
              code: ({ node, inline, className, children, ...props }) => {
                if (inline) {
                  return <code className={className} {...props}>{children}</code>;
                }
                return (
                  <CodeBlock theme={theme} className={className}>
                    {String(children).replace(/\n$/, '')}
                  </CodeBlock>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {message.role === 'user' && onEdit && (
          <button
            onClick={onEdit}
            className={`p-2 transition-colors ${
              isLight 
                ? 'text-gray-500 hover:text-gray-900' 
                : 'text-gray-400 hover:text-white'
            }`}
            title="Edit message"
          >
            <Edit size={16} />
          </button>
        )}
        <button
          onClick={copyMessage}
          className={`p-2 transition-colors ${
            isLight 
              ? 'text-gray-500 hover:text-gray-900' 
              : 'text-gray-400 hover:text-white'
          }`}
          title={copied ? "Copied!" : "Copy message"}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};