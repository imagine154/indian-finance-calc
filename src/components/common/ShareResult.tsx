"use client";

import React, { useState, useEffect } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareResultProps {
    title: string;
    text: string;
    url: string;
}

export default function ShareResult({ title, text, url }: ShareResultProps) {
    const [isNativeShareSupported, setIsNativeShareSupported] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof navigator !== "undefined" && (navigator as any).share) {
            setIsNativeShareSupported(true);
        }
    }, []);

    const handleNativeShare = async () => {
        try {
            await navigator.share({
                title,
                text,
                url,
            });
        } catch (error) {
            // User cancelled or failed
            console.log("Share cancelled or failed", error);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    if (!mounted) {
        // Return empty div to maintain layout stability or just null
        return <div className="h-12 w-full"></div>;
    }

    // Social Links
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    // WhatsApp: "Text URL"
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;

    // Twitter: "Text" & "URL" param
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

    // LinkedIn: "URL" param
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

    if (isNativeShareSupported) {
        return (
            <button
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl font-semibold transition-colors duration-200"
            >
                <Share2 className="w-5 h-5" />
                <span>Share Calculation</span>
            </button>
        );
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* WhatsApp */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="p-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded-xl transition-colors"
            >
                {/* Simple WhatsApp Icon Path */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            </a>

            {/* Twitter/X */}
            <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X (Twitter)"
                className="p-3 bg-black/5 text-black hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 rounded-xl transition-colors"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </a>

            {/* LinkedIn */}
            <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="p-3 bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 rounded-xl transition-colors"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            </a>

            {/* Copy Link */}
            <button
                onClick={handleCopy}
                aria-label="Copy Link"
                className="group relative p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
            >
                {isCopied ? (
                    <Check className="w-5 h-5 text-green-600" />
                ) : (
                    <Copy className="w-5 h-5" />
                )}

                {isCopied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                        Copied!
                    </span>
                )}
            </button>
        </div>
    );
}
