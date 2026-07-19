import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';

const SUGGESTIONS = [
  'Tell me about ShadowTrace',
  'What are Aditya\'s top skills?',
  'How can I contact Aditya?',
  'What is Aditya currently building?',
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [justSent, setJustSent] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const initConversation = useCallback(async () => {
    try {
      const conv = await base44.agents.createConversation({
        agent_name: 'portfolio_assistant',
        metadata: { name: 'Portfolio Chat' },
      });
      setConversation(conv);
      return conv;
    } catch {
      return null;
    }
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setJustSent(true);

    setMessages((prev) => [...prev, { role: 'user', content: text }]);

    let conv = conversation;
    if (!conv) {
      conv = await initConversation();
      if (!conv) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Sorry, I\'m having trouble connecting right now. Please try again later.' },
        ]);
        setLoading(false);
        setJustSent(false);
        return;
      }
    }

    try {
      const updated = await base44.agents.addMessage(conv, { role: 'user', content: text });
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      setConversation(updated);

      const unsubscribe = base44.agents.subscribeToConversation(updated.id, (data) => {
        const assistantMessages = data.messages.filter((m) => m.role === 'assistant');
        const lastAssistant = assistantMessages[assistantMessages.length - 1];
        if (lastAssistant) {
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (next[lastIdx]?.role === 'assistant') {
              next[lastIdx] = lastAssistant;
            } else {
              next.push(lastAssistant);
            }
            return next;
          });

          if (lastAssistant.content && !lastAssistant.tool_calls?.some((tc) =>
            ['pending', 'running', 'in_progress'].includes(tc.status)
          )) {
            setLoading(false);
            setJustSent(false);
          }
        }
      });

      setTimeout(() => {
        unsubscribe();
        setLoading(false);
        setJustSent(false);
      }, 30000);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'I encountered an error. Please try again.' },
      ]);
      setLoading(false);
      setJustSent(false);
    }

    setInput('');
  }, [conversation, loading, initConversation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyber to-violet flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-shadow"
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} className="text-obsidian" />
            </motion.div>
          ) : (
            <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles size={22} className="text-obsidian" />
            </motion.div>
          )}
        </AnimatePresence>
        /* {!open && (
          <span className="absolute inset-0 rounded-full border-2 border-cyber/40 animate-ping" />
        )} */
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md glass-strong rounded-2xl overflow-hidden flex flex-col"
            style={{ height: 'min(70vh, 600px)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber to-violet flex items-center justify-center">
                <Bot size={16} className="text-obsidian" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-sm text-silver font-semibold">Neural AI</div>
                <div className="font-mono text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyber to-violet flex items-center justify-center mb-4">
                    <Sparkles size={20} className="text-obsidian" />
                  </div>
                  <p className="font-mono text-sm text-silver mb-1">Ask me anything about Aditya</p>
                  <p className="font-mono text-xs text-muted-data mb-5">Projects, skills, experience & more</p>
                  <div className="space-y-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        className="block w-full text-left px-3 py-2 rounded-lg glass text-xs text-silver hover:text-cyber hover:border-cyber/20 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-cyber/15 text-silver border border-cyber/20'
                        : 'glass text-silver border border-white/5'
                    }`}
                  >
                    {msg.content ? (
                      msg.role === 'user' ? (
                        <p>{msg.content}</p>
                      ) : (
                        <ReactMarkdown className="prose prose-sm prose-invert max-w-none [&>*]:mb-0 [&_p]:mb-1 [&_code]:text-cyber [&_code]:bg-cyber/10 [&_code]:px-1 [&_code]:rounded">{msg.content}</ReactMarkdown>
                      )
                    ) : (
                      <div className="flex items-center gap-1 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-sm text-silver placeholder:text-muted-data font-mono"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-lg bg-cyber/10 text-cyber hover:bg-cyber/20 disabled:opacity-30 transition-all"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
