"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const [showChat, setShowChat] = useState(false);
  const pathname = usePathname();

  // determine alternate profile link when on one of the profile pages
  let altHref: string | null = null;
  let altLabel = '';
  if (pathname?.startsWith('/datascience')) {
    altHref = '/fullstack';
    altLabel = 'Full Stack';
  } else if (pathname?.startsWith('/fullstack')) {
    altHref = '/datascience';
    altLabel = 'Data Science';
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black dark:text-white">Get to know Joe</h1>
          <div className="flex gap-3 items-center">
            {altHref && (
              <Link
                href={altHref}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-black dark:text-white rounded-lg text-sm font-medium transition"
              >
                Switch to {altLabel}
              </Link>
            )}
            <a
              href="/api/resume"
              download="resume.pdf"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
            >
              ↓ Resume
            </a>
            <button
              onClick={() => setShowChat(!showChat)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
            >
              {showChat ? 'Close' : 'Ask AI'}
            </button>
          </div>
        </div>
      </header>

      {children}

      {showChat && <ChatAgent onClose={() => setShowChat(false)} />}
    </div>
  );
}

function ChatAgent({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-96 h-[600px] bg-white dark:bg-zinc-900 border-l border-t border-zinc-200 dark:border-zinc-800 flex flex-col m-4 rounded-lg shadow-xl">
      <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-black dark:text-white">Ask About My Background</h3>
          <p className="text-xs text-zinc-500 mt-1">Powered by ChatGPT</p>
        </div>
        <div>
          <button onClick={onClose} className="text-sm text-zinc-500">Close</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-zinc-500 text-sm py-8">
            This chat is not currently linked to a live AI model.  At the moment, paying for a 

            Ask me anything about my skills, projects, or experience!

            Note: this is a demo - responses are based on my resume and may not be 100% accurate.
            
            Always use caution when interpreting AI-generated content!
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
            disabled={loading}
            className="flex-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-black dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
