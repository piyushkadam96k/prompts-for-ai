import { useMemo } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';
import PromptCard from './PromptCard';
import { TOOLS, getToolByCompany } from '../data/toolsData';
import ToolIcon from './ToolIcon';
import { SEARCH_MIN_LENGTH, SEARCH_RESULT_LIMIT } from '../constants';
import { MOTION_DURATION, MOTION_EASE_OUT, MOTION_STAGGER } from '../motion/constants';
import { useMotionPreferences } from '../motion/useMotionPreferences';

export default function SearchView({ query, allPrompts, onViewPrompt, onBack, theme }) {
    const { motionEnabled } = useMotionPreferences();
    const results = useMemo(() => {
        if (!query || query.length < SEARCH_MIN_LENGTH) return [];
        const q = query.toLowerCase();
        return allPrompts.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.company.toLowerCase().includes(q) ||
            p.tool.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q)
        ).slice(0, SEARCH_RESULT_LIMIT);
    }, [query, allPrompts]);

    return (
        <Motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE_OUT }}
        >
            <div className="flex items-center gap-3 mb-6">
                <button
                    type="button"
                    onClick={onBack}
                    aria-label="Back to Explorer"
                    className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap ${
                        theme === 'light'
                            ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                            : 'glass-panel border border-dark-border text-gray-300 hover:text-white hover:border-neon-blue/40'
                    }`}
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    Back to Explorer
                </button>
                <div className="flex items-center gap-2">
                    <Search size={16} className="text-neon-blue" />
                    <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {results.length} results for{' '}
                        <span className="text-neon-purple">"{query}"</span>
                    </span>
                </div>
            </div>

            {results.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-5xl mb-4">🔍</p>
                    <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        No prompts found for "{query}"
                    </p>
                    <p className={`text-sm mt-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Try different keywords like a tool name or topic
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {results.map((prompt, i) => {
                            const tool = getToolByCompany(prompt.company, TOOLS);
                            return (
                                <Motion.div
                                    key={prompt.id}
                                    className="relative"
                                    initial={motionEnabled ? { opacity: 0, y: 16 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * MOTION_STAGGER.cards, duration: MOTION_DURATION.base, ease: MOTION_EASE_OUT }}
                                >
                                    {tool && (
                                        <div className="absolute top-3 right-3 z-10 opacity-60">
                                            <ToolIcon tool={tool} size={24} />
                                        </div>
                                    )}
                                    <PromptCard
                                        prompt={prompt}
                                        onViewFull={onViewPrompt}
                                        theme={theme}
                                        index={i}
                                    />
                                </Motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </Motion.div>
    );
}


