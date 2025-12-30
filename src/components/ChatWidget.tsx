"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User, Trash2, Minus, IndianRupee } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";

type Message = {
    id: string;
    role: "user" | "ai";
    content: string;
};

const TOPICS = ["General", "Stocks", "Tax", "Mutual Funds", "Economics"];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [topic, setTopic] = useState("General");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Helper to render markdown safely
    const renderMarkdown = (content: string) => {
        const rawMarkup = marked.parse(content, { async: false }) as string;
        const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);
        return { __html: sanitizedMarkup };
    };

    // Load state from localStorage on mount
    useEffect(() => {
        const savedMessages = localStorage.getItem("rt_chat_history");
        const savedRole = localStorage.getItem("rt_chat_open");
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (e) {
                console.error("Failed to parse chat history", e);
            }
        }
    }, []);

    // Save messages to localStorage
    useEffect(() => {
        localStorage.setItem("rt_chat_history", JSON.stringify(messages));
    }, [messages]);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.content, topic }),
            });

            const data = await response.json();

            if (response.ok) {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "ai",
                    content: data.response,
                };
                setMessages((prev) => [...prev, aiMessage]);
            } else {
                throw new Error(data.error || "Failed to fetch response");
            }
        } catch (error) {
            console.error(error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "Sorry, I encountered an error. Please try again later.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearHistory = () => {
        setMessages([]);
        localStorage.removeItem("rt_chat_history");
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end print:hidden">
            {isOpen ? (
                <div className="w-[90vw] md:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300">

                    {/* Header */}
                    <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 rounded-full">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">RupeeTools AI</h3>
                                <p className="text-[10px] opacity-80">Financial Assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleClearHistory}
                                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                                title="Clear History"
                            >
                                <Trash2 size={16} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Topic Selector */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <label className="text-xs font-medium text-gray-500 mb-1.5 block">Select Topic</label>
                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mask-gradient">
                            {TOPICS.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTopic(t)}
                                    className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${topic === t
                                        ? "bg-blue-100 text-blue-700 border-blue-200"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 mt-12">
                                <Bot size={48} className="mx-auto mb-3 opacity-20" />
                                <p className="text-sm">Ask me about stocks, mutual funds, or tax!</p>
                            </div>
                        )}

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.role === "ai" && (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Bot size={14} className="text-blue-600" />
                                    </div>
                                )}

                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === "user"
                                        ? "bg-blue-600 text-white rounded-tr-sm"
                                        : "bg-white border border-gray-100 text-gray-700 rounded-tl-sm"
                                        }`}
                                >
                                    {msg.role === "ai" ? (
                                        <div
                                            className="prose prose-sm max-w-none prose-p:leading-relaxed prose-li:my-0.5"
                                            dangerouslySetInnerHTML={renderMarkdown(msg.content)}
                                        />
                                    ) : (
                                        <p>{msg.content}</p>
                                    )}
                                </div>

                                {msg.role === "user" && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                                        <User size={14} className="text-gray-500" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <Bot size={14} className="text-blue-600" />
                                </div>
                                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                placeholder="Ask a financial question..."
                                className="w-full pl-4 pr-12 py-3 bg-gray-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-xl text-sm outline-none transition-all"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                            >
                                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-gray-400 mt-2">
                            AI assistant. Not financial advice. <span className="underline">Please consult a SEBI-registered advisor.</span>
                        </p>
                    </div>

                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-visible"
                >
                    {/* SVG for Text */}
                    <div className="absolute inset-0 p-0 pointer-events-none">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                                <path id="textCurve" d="M 15 55 A 35 35 0 1 1 85 55" fill="none" />
                            </defs>
                            <text className="font-bold fill-white tracking-wide text-[13.5px]" dy="-1">
                                <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
                                    RupeeTools
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    {/* Center Composite Icon */}
                    <div className="relative -mt-1 transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        <MessageCircle size={28} strokeWidth={1.5} className="text-white opacity-95" />
                        <IndianRupee size={11} strokeWidth={3} className="absolute text-white" />
                    </div>

                    {/* Bottom AI Text */}
                    <span className="absolute bottom-1 font-bold tracking-widest text-[12px] opacity-90">AI</span>

                    {/* Notification Dot */}
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white z-10" />
                </button>
            )}
        </div>
    );
}
