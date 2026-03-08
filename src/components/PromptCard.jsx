import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Copy, Check, Download, Eye, Heart } from 'lucide-react';

function getWordCount(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function getLengthLabel(chars) {
    if (chars < 1000) return { label: 'Short', color: '#22c55e' };
    if (chars < 5000) return { label: 'Medium', color: '#f59e0b' };
    if (chars < 20000) return { label: 'Long', color: '#f97316' };
    return { label: 'Massive', color: '#ef4444' };
}

export default function PromptCard({ prompt, onViewFull, theme, index, isFavorite, onToggleFavorite }) {
    const [copied, setCopied] = useState(false);
    const favorited = isFavorite ? isFavorite(prompt) : false;

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(prompt.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = (e) => {
        e.stopPropagation();
        const blob = new Blob([prompt.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${prompt.company}-${prompt.name}.txt`.replace(/\s+/g, '-');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const preview = prompt.content.slice(0, 240).trim();
    const charCount = prompt.content.length;
    const wordCount = getWordCount(prompt.content);
    const tokenEstimate = Math.ceil(charCount / 4);
    const lengthInfo = getLengthLabel(charCount);

    return (
        <Motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.04 } }}
            whileHover={{ y: -2 }}
            className={`rounded-2xl p-5 group cursor-pointer hover-lift hover-shine ${theme === 'light'
                ? 'bg-white border border-gray-200 shadow-md hover:shadow-xl'
                : 'glass-panel hover:border-neon-purple/40'
                } transition-all duration-300`}
            onClick={() => onViewFull(prompt)}
        >
            {/* Tags row */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                        background: `${lengthInfo.color}18`,
                        color: lengthInfo.color,
                        border: `1px solid ${lengthInfo.color}40`,
                    }}
                >
                    {lengthInfo.label}
                </span>
                {prompt.tool && prompt.tool !== prompt.company && (
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${theme === 'light'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
                        }`}>
                        {prompt.tool}
                    </span>
                )}
            </div>

            {/* Prompt name */}
            <h3 className={`font-bold text-base mb-2 line-clamp-1 group-hover:text-neon-blue transition-colors ${theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                {prompt.name}
            </h3>

            {/* Preview */}
            <p className={`text-sm leading-relaxed mb-4 line-clamp-3 text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`} style={{ fontFamily: 'var(--font-mono)' }}>
                {preview}{prompt.content.length > 240 ? '...' : ''}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className={`flex items-center gap-3 text-xs ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    <span>{charCount.toLocaleString()} chars</span>
                    <span>·</span>
                    <span>{wordCount.toLocaleString()} words</span>
                    <span>·</span>
                    <span>~{tokenEstimate.toLocaleString()} tokens</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onToggleFavorite && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggleFavorite(prompt); }}
                            className={`p-1.5 rounded-lg transition-colors btn-tap ${favorited
                                    ? 'text-red-400 hover:text-red-500'
                                    : theme === 'light'
                                        ? 'hover:bg-gray-100 text-gray-500 hover:text-red-400'
                                        : 'hover:bg-dark-border text-gray-500 hover:text-red-400'
                                }`}
                            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <Heart size={14} className={favorited ? 'fill-red-400' : ''} />
                        </button>
                    )}
                    <button
                        onClick={handleDownload}
                        className={`p-1.5 rounded-lg transition-colors btn-tap ${theme === 'light'
                            ? 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            : 'hover:bg-dark-border text-gray-500 hover:text-gray-300'
                            }`}
                        title="Download"
                    >
                        <Download size={14} />
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`p-1.5 rounded-lg transition-colors btn-tap ${theme === 'light'
                            ? 'hover:bg-gray-100 text-gray-500 hover:text-green-600'
                            : 'hover:bg-dark-border text-gray-500 hover:text-neon-pink'
                            }`}
                        title="Copy"
                    >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onViewFull(prompt); }}
                        className={`p-1.5 rounded-lg transition-colors btn-tap ${theme === 'light'
                            ? 'hover:bg-gray-100 text-gray-500 hover:text-blue-600'
                            : 'hover:bg-dark-border text-gray-500 hover:text-neon-blue'
                            }`}
                        title="View Full"
                    >
                        <Eye size={14} />
                    </button>
                </div>
            </div>
        </Motion.div>
    );
}


