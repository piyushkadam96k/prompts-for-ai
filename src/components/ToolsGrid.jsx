import { useMemo, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { TOOLS, CATEGORIES, getPromptsForTool } from '../data/toolsData';
import ToolCard from './ToolCard';
import { MOTION_DURATION, MOTION_EASE_OUT, MOTION_STAGGER } from '../motion/constants';
import { useMotionPreferences } from '../motion/useMotionPreferences';

export default function ToolsGrid({ allPrompts, onViewPrompts, onCompare, compareTools, theme }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const { motionEnabled } = useMotionPreferences();

  const toolsWithCounts = useMemo(
    () => TOOLS.map((tool) => ({
      ...tool,
      promptCount: getPromptsForTool(tool, allPrompts).length,
    })),
    [allPrompts],
  );

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') return toolsWithCounts;
    return toolsWithCounts.filter((tool) => tool.category === activeCategory);
  }, [activeCategory, toolsWithCounts]);

  const categoryCount = (categoryId) => {
    if (categoryId === 'all') return toolsWithCounts.length;
    return toolsWithCounts.filter((tool) => tool.category === categoryId).length;
  };

  const gridParentVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: motionEnabled
        ? { staggerChildren: MOTION_STAGGER.cards, delayChildren: 0.04 }
        : { staggerChildren: 0 },
    },
  };

  const gridItemVariants = {
    hidden: {
      opacity: 0,
      y: motionEnabled ? 16 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionEnabled ? MOTION_DURATION.base : 0.2,
        ease: MOTION_EASE_OUT,
      },
    },
    exit: {
      opacity: 0,
      y: motionEnabled ? -12 : 0,
      transition: {
        duration: motionEnabled ? MOTION_DURATION.fast : 0.15,
        ease: MOTION_EASE_OUT,
      },
    },
  };

  return (
    <section className="mt-6">
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((category, index) => (
          <Motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            initial={motionEnabled ? { opacity: 0, x: -24 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={motionEnabled ? { scale: 1.05 } : undefined}
            whileTap={motionEnabled ? { scale: 0.98 } : undefined}
            viewport={{ once: true, amount: 0.7 }}
            transition={{
              duration: motionEnabled ? MOTION_DURATION.base : 0.2,
              ease: MOTION_EASE_OUT,
              delay: motionEnabled ? index * MOTION_STAGGER.chips : 0,
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 btn-tap ${activeCategory === category.id
              ? theme === 'light'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 text-white border border-neon-purple/50 shadow-purple-glow'
              : theme === 'light'
                ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                : 'glass-panel text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
          >
            <span>{category.emoji}</span>
            <span>{category.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === category.id
              ? 'bg-white/20'
              : theme === 'light'
                ? 'bg-gray-100 text-gray-500'
                : 'bg-dark-border text-gray-500'
              }`}
            >
              {categoryCount(category.id)}
            </span>
          </Motion.button>
        ))}
      </div>

      <Motion.div
        layout
        variants={gridParentVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool) => (
            <Motion.div
              key={tool.id}
              layout
              variants={gridItemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <ToolCard
                tool={tool}
                promptCount={tool.promptCount}
                onViewPrompts={onViewPrompts}
                onCompare={onCompare}
                isCompareSelected={compareTools.some((item) => item.id === tool.id)}
                theme={theme}
              />
            </Motion.div>
          ))}
        </AnimatePresence>
      </Motion.div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">No tools in this category yet</p>
        </div>
      )}
    </section>
  );
}


