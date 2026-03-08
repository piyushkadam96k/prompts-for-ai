import { useRef, useState } from 'react';
import { motion as Motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion';
import ToolIcon from './ToolIcon';
import { CATEGORY_COLORS } from '../data/toolsData';
import { MOTION_DURATION, MOTION_EASE_OUT } from '../motion/constants';
import { useMotionPreferences } from '../motion/useMotionPreferences';

export default function ToolCard({ tool, promptCount, onViewPrompts, onCompare, isCompareSelected, theme }) {
  const cardRef = useRef(null);
  const [didPulse, setDidPulse] = useState(false);
  const { scrollYProgress } = useScroll();
  const { motionEnabled } = useMotionPreferences();
  const isInView = useInView(cardRef, { amount: 0.6 });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!motionEnabled || didPulse || !isInView) return;
    if (progress > 0.06) setDidPulse(true);
  });

  const categoryColors = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS.general;

  return (
    <Motion.div
      ref={cardRef}
      layout
      whileHover={motionEnabled ? { y: -4, scale: 1.02 } : undefined}
      transition={{ duration: motionEnabled ? MOTION_DURATION.fast : 0.2, ease: MOTION_EASE_OUT }}
      className={`group/card relative rounded-2xl p-5 cursor-pointer group overflow-hidden hover-lift hover-shine hover-glow ${theme === 'light'
        ? 'bg-white border border-gray-200 shadow-lg hover:shadow-xl'
        : 'glass-panel hover:border-opacity-50'
        } ${isCompareSelected ? 'ring-2 ring-neon-purple' : ''} ${didPulse ? 'glow-pulse-once' : ''}`}
      style={{ borderColor: isCompareSelected ? 'var(--color-neon-purple)' : undefined }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at top left, ${tool.color}12 0%, transparent 60%)`,
        }}
      />

      <div className="flex items-start justify-between mb-4">
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${categoryColors.from}22, ${categoryColors.to}22)`,
            color: categoryColors.from,
            border: `1px solid ${categoryColors.from}40`,
          }}
        >
          {categoryColors.label}
        </span>
        {promptCount > 0 && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-dark-border text-gray-400'}`}>
            {promptCount} prompt{promptCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <ToolIcon tool={tool} size={52} />
        <div>
          <h3 className={`font-bold text-lg leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {tool.name}
          </h3>
        </div>
      </div>

      <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
        {tool.description}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onViewPrompts(tool)}
          className={`group/btn flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all duration-200 btn-tap ${promptCount > 0
            ? theme === 'light'
              ? 'bg-gray-900 text-white hover:bg-gray-700'
              : 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-white border border-neon-blue/30 hover:border-neon-purple/60 hover:from-neon-blue/30 hover:to-neon-purple/30'
            : theme === 'light'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-dark-border text-gray-600 cursor-not-allowed'
            }`}
          disabled={promptCount === 0}
        >
          <span className="inline-flex items-center gap-1 group/btn">
            {promptCount > 0 ? 'View Prompts' : 'No Prompts Yet'}
            {promptCount > 0 && <span className="group-hover/btn:translate-x-0.5 transition-transform duration-200">→</span>}
          </span>
        </button>
        {promptCount > 0 && (
          <button
            onClick={() => onCompare(tool)}
            className={`py-2 px-3 rounded-xl text-sm transition-all duration-200 border btn-tap ${isCompareSelected
              ? 'bg-neon-purple/20 text-neon-purple border-neon-purple/60'
              : theme === 'light'
                ? 'border-gray-200 text-gray-500 hover:border-gray-400'
                : 'border-dark-border text-gray-500 hover:border-gray-500 hover:text-gray-300'
              }`}
            title={isCompareSelected ? 'Remove from compare' : 'Add to compare'}
          >
            {isCompareSelected ? '✓' : '⇄'}
          </button>
        )}
      </div>
    </Motion.div>
  );
}


