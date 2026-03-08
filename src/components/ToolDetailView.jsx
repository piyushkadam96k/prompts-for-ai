import { useState, useMemo } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, ArrowLeftRight } from 'lucide-react';
import { getPromptsForTool } from '../data/toolsData';
import ToolIcon from './ToolIcon';
import PromptCard from './PromptCard';
import { useMotionPreferences } from '../motion/useMotionPreferences';

export default function ToolDetailView({ tool, allPrompts, onViewPrompt, onBack, onCompare, compareTools, theme, isFavorite, onToggleFavorite }) {
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('default');
    const { motionEnabled } = useMotionPreferences();

    const toolPrompts = useMemo(() => getPromptsForTool(tool, allPrompts), [tool, allPrompts]);

    const filtered = useMemo(() => {
        let result = toolPrompts;
        if (filter) {
            const q = filter.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.content.toLowerCase().includes(q)
            );
        }
        if (sort === 'length-asc') result = [...result].sort((a, b) => a.content.length - b.content.length);
        if (sort === 'length-desc') result = [...result].sort((a, b) => b.content.length - a.content.length);
        if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        return result;
    }, [toolPrompts, filter, sort]);

    const isCompareSelected = compareTools.some(t => t.id === tool.id);
    const totalChars = toolPrompts.reduce((sum, p) => sum + p.content.length, 0);
    const avgChars = toolPrompts.length ? Math.round(totalChars / toolPrompts.length) : 0;

    return (
        <Motion.div
            initial={motionEnabled ? { opacity: 0, x: 30 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={motionEnabled ? { opacity: 0, x: -30 } : { opacity: 0 }}
            className="backface-hidden transform-gpu"
        >
            {/* Back */}
            <button
                type="button"
                onClick={onBack}
                aria-label="Back to Explorer"
                className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap mb-6 ${theme === 'light'
                    ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                    : 'glass-panel border border-dark-border text-gray-300 hover:text-white hover:border-neon-blue/40'
                    }`}
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to Explorer
            </button>

            {/* Tool header */}
            <div className={`rounded-2xl p-6 mb-6 ${theme === 'light' ? 'bg-white border border-gray-200' : 'glass-panel'
                }`}
                style={{
                    background: theme !== 'light'
                        ? `linear-gradient(135deg, ${tool.color}08, transparent)`
                        : undefined,
                }}
            >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <ToolIcon tool={tool} size={68} />
                    <div className="flex-1">
                        <h1
                            className={`text-3xl font-black mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {tool.name}
                        </h1>
                        <p className={`text-sm mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            {tool.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs">
                            {[
                                { label: 'Prompts', value: toolPrompts.length },
                                { label: 'Total Chars', value: totalChars.toLocaleString() },
                                { label: 'Avg Length', value: avgChars.toLocaleString() },
                            ].map(s => (
                                <div key={s.label} className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                    <span className={`font-black text-base mr-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                                        style={{ fontFamily: 'var(--font-display)' }}>
                                        {s.value}
                                    </span>
                                    {s.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => onCompare(tool)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all flex-shrink-0 hover:scale-[1.02] btn-tap ${isCompareSelected
                            ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/60'
                            : theme === 'light'
                                ? 'border border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                                : 'border border-dark-border text-gray-400 hover:text-white hover:border-gray-500'
                            }`}
                    >
                        <ArrowLeftRight size={16} />
                        {isCompareSelected ? 'In Compare ✓' : 'Compare'}
                    </button>
                </div>
            </div>

            {/* Filter bar */}
            {toolPrompts.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className={`relative flex-1 ${theme === 'light'
                        ? 'bg-white border border-gray-200 rounded-xl shadow-sm'
                        : 'glass-panel rounded-xl'
                        }`}>
                        <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                        <input
                            type="text"
                            placeholder="Filter prompts..."
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className={`w-full bg-transparent pl-8 pr-4 py-2.5 text-sm focus:outline-none ${theme === 'light' ? 'text-gray-900 placeholder-gray-400' : 'text-gray-200 placeholder-gray-600'
                                }`}
                        />
                    </div>
                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className={`px-4 py-2.5 text-sm font-semibold rounded-xl focus:outline-none border cursor-pointer ${theme === 'light'
                            ? 'bg-white border-gray-200 text-gray-700'
                            : 'bg-dark-bg border-dark-border text-gray-300'
                            }`}
                    >
                        <option value="default">Default order</option>
                        <option value="length-desc">Longest first</option>
                        <option value="length-asc">Shortest first</option>
                        <option value="name">By name (A-Z)</option>
                    </select>
                </div>
            )}

            {/* Results count */}
            {filter && (
                <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                    <strong className={theme === 'light' ? 'text-gray-800' : 'text-white'}>{filtered.length}</strong> of {toolPrompts.length} prompts
                </p>
            )}

            {/* Prompts grid */}
            {toolPrompts.length === 0 ? (
                <div className={`text-center py-24 rounded-2xl border-dashed border-2 ${theme === 'light' ? 'border-gray-200 bg-white' : 'border-dark-border glass-panel'
                    }`}>
                    <p className="text-5xl mb-4">🔍</p>
                    <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        No prompts found for {tool.name}
                    </p>
                    <p className={`text-sm mt-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>
                        This tool's prompts may not be in the repository yet
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence>
                        {filtered.map((prompt, i) => (
                            <PromptCard
                                key={prompt.id}
                                prompt={prompt}
                                onViewFull={onViewPrompt}
                                theme={theme}
                                index={i}
                                isFavorite={isFavorite}
                                onToggleFavorite={onToggleFavorite}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </Motion.div>
    );
}


