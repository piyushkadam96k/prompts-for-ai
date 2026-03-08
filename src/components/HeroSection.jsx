import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { MOTION_DURATION, MOTION_EASE_OUT } from '../motion/constants';
import { useMotionPreferences } from '../motion/useMotionPreferences';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { SEARCH_DEBOUNCE_MS } from '../constants';

export default function HeroSection({ totalPrompts, totalTools, totalChars, onSearch, theme }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const { motionEnabled } = useMotionPreferences();

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <Motion.div
      initial={motionEnabled ? { opacity: 0, y: 22 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionEnabled ? MOTION_DURATION.slow : 0.2, ease: MOTION_EASE_OUT }}
      className="text-center py-12 md:py-24 space-y-6 md:space-y-8"
    >
      <Motion.div
        initial={motionEnabled ? { opacity: 0, scale: 0.92 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: motionEnabled ? MOTION_DURATION.base : 0.2,
          delay: motionEnabled ? 0.08 : 0,
          ease: MOTION_EASE_OUT,
        }}
        className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full glass-panel border-neon-blue/30 text-neon-blue text-xs md:text-sm font-medium"
      >
        <Sparkles size={14} />
        <span>100% Open Source • Real AI Prompts</span>
      </Motion.div>

      <Motion.h1
        className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] md:leading-[0.95] drop-shadow-2xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <span className="block overflow-hidden">
          <Motion.span
            initial={motionEnabled ? { clipPath: 'inset(0 100% 0 0)' } : false}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{
              duration: motionEnabled ? MOTION_DURATION.slow : 0.2,
              delay: motionEnabled ? 0.18 : 0,
              ease: MOTION_EASE_OUT,
            }}
            className="inline-block"
          >
            Inside the <span className="text-gradient">Brain</span>
          </Motion.span>
        </span>
        <span className="block overflow-hidden">
          <Motion.span
            initial={motionEnabled ? { clipPath: 'inset(0 100% 0 0)' } : false}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{
              duration: motionEnabled ? MOTION_DURATION.slow : 0.2,
              delay: motionEnabled ? 0.28 : 0,
              ease: MOTION_EASE_OUT,
            }}
            className={`inline-block ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
          >
            of AI Tools
          </Motion.span>
        </span>
      </Motion.h1>

      <Motion.p
        initial={motionEnabled ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionEnabled ? MOTION_DURATION.base : 0.2,
          delay: motionEnabled ? 0.45 : 0,
          ease: MOTION_EASE_OUT,
        }}
        className={`text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
      >
        Explore the system prompts powering the most advanced AI systems.
        Understand how they think, reason, and respond.
      </Motion.p>

      <Motion.form
        initial={motionEnabled ? { opacity: 0, y: 16, scale: 0.97 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: motionEnabled ? MOTION_DURATION.base : 0.2,
          delay: motionEnabled ? 0.56 : 0,
          ease: MOTION_EASE_OUT,
        }}
        onSubmit={handleSubmit}
        className={`relative max-w-2xl mx-auto input-focus-ring ${theme === 'light' ? 'shadow-2xl shadow-blue-100' : 'shadow-hero-glow'} px-4 sm:px-0`}
      >
        <div className={`flex items-center rounded-2xl border ${theme === 'light' ? 'bg-white border-gray-200' : 'glass-panel border-neon-blue/30'} p-1 md:p-1.5`}>
          <div className="pl-3 md:pl-4 pr-1 md:pr-2">
            <Search className={`h-4 w-4 md:h-5 md:w-5 ${theme === 'light' ? 'text-gray-400' : 'text-neon-blue'}`} />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search AI tools..."
            className={`flex-1 bg-transparent py-2.5 md:py-3 px-2 text-sm md:text-base focus:outline-none ${theme === 'light' ? 'text-gray-900 placeholder-gray-400' : 'text-white placeholder-gray-500'}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                onSearch('');
              }}
              className="px-2 text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          )}
          <button
            type="submit"
            className={`px-3 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all btn-tap ${theme === 'light' ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:opacity-90 shadow-neon-glow'}`}
          >
            Search
          </button>
        </div>
      </Motion.form>

      <Motion.div
        initial={motionEnabled ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionEnabled ? MOTION_DURATION.base : 0.2,
          delay: motionEnabled ? 0.64 : 0,
          ease: MOTION_EASE_OUT,
        }}
        className="flex items-center justify-center gap-8 pt-2"
      >
        {[
          { value: totalTools, label: 'AI Tools' },
          { value: totalPrompts, label: 'Prompts' },
          { value: `${Math.round(totalChars / 1000)}K+`, label: 'Characters' },
        ].map((stat, i) => (
          <Motion.div
            key={stat.label}
            className="text-center"
            initial={motionEnabled ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: motionEnabled ? 0.72 + i * 0.06 : 0, duration: motionEnabled ? MOTION_DURATION.base : 0.2, ease: MOTION_EASE_OUT }}
          >
            <div className={`text-2xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
              {stat.value}
            </div>
            <div className="text-xs font-medium text-gray-500">
              {stat.label}
            </div>
          </Motion.div>
        ))}
      </Motion.div>
    </Motion.div>
  );
}


