'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

type Props = {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    colorTheme?: 'blue' | 'amber';
};

export const SearchableDropdown: React.FC<Props> = ({
    options,
    value,
    onChange,
    placeholder = "Select option...",
    label,
    colorTheme = 'blue'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const themeColors = {
        blue: {
            ring: 'focus:ring-blue-500',
            border: 'focus:border-blue-500',
            activeBg: 'bg-blue-50',
            text: 'text-blue-700',
            iconBg: 'bg-blue-100',
            iconText: 'text-blue-800'
        },
        amber: {
            ring: 'focus:ring-amber-500',
            border: 'focus:border-amber-500',
            activeBg: 'bg-amber-50',
            text: 'text-amber-700',
            iconBg: 'bg-amber-100',
            iconText: 'text-amber-800'
        }
    };

    const theme = themeColors[colorTheme];

    return (
        <div className="space-y-2 relative" ref={wrapperRef}>
            {label && (
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <span className={`w-6 h-6 rounded-full ${theme.iconBg} ${theme.iconText} flex items-center justify-center text-xs`}>
                        {label.charAt(0)}
                    </span>
                    {label}
                </label>
            )}

            <div
                className={`w-full h-11 px-3 flex items-center justify-between rounded-lg border border-gray-300 bg-white text-gray-900 cursor-pointer hover:border-gray-400 focus-within:ring-2 ${theme.ring} focus-within:border-transparent transition-all shadow-sm`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`block truncate ${!value ? 'text-gray-400' : ''}`}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 border-b border-gray-100 bg-gray-50/50 sticky top-0">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto flex-1 p-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between group transition-colors ${value === option ? `${theme.activeBg} ${theme.text} font-medium` : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                >
                                    <span className="truncate">{option}</span>
                                    {value === option && <Check className="w-4 h-4" />}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-8 text-center text-sm text-gray-400">
                                No results found.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
