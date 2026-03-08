import { useEffect, useMemo, useRef, useState } from 'react';
import { Github, Sparkles, Moon, Sun, Zap, Star, ArrowLeftRight, Search, BookOpen, User } from 'lucide-react';
import { AnimatePresence, motion as Motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import promptsData from './prompts.json';
import './index.css';
import Background3D from './Background3D';
import HeroSection from './components/HeroSection';
import ToolsGrid from './components/ToolsGrid';
import ToolDetailView from './components/ToolDetailView';
import PromptDetail from './components/PromptDetail';
import CompareView from './components/CompareView';
import SearchView from './components/SearchView';
import HowToUseGuide from './components/HowToUseGuide';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import { TOOLS, getToolByCompany } from './data/toolsData';
import { MOTION_DURATION, MOTION_EASE_OUT } from './motion/constants';
import { useMotionPreferences } from './motion/useMotionPreferences';
import { useGitHubStars } from './hooks/useGitHubStars';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useFavorites } from './hooks/useFavorites';
import { SCROLL_COMPACT_THRESHOLD, MAX_COMPARE_TOOLS, THEME_STORAGE_KEY, DEFAULT_THEME } from './constants';


function App() {
  const [view, setView] = useState('home');
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [compareTools, setCompareTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
  });
  const [prevView, setPrevView] = useState(null);
  const [isCompactHeader, setIsCompactHeader] = useState(false);

  const searchInputRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  const { motionEnabled } = useMotionPreferences();
  const { stars: githubStars } = useGitHubStars();
  const { isFavorite, toggleFavorite } = useFavorites();

  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsCompactHeader(latest > SCROLL_COMPACT_THRESHOLD);
  });

  useEffect(() => {
    document.body.className = theme === 'neon' ? '' : `theme-${theme}`;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (view === 'search' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [view]);

  const stats = useMemo(() => {
    const totalChars = promptsData.reduce((sum, prompt) => sum + prompt.content.length, 0);
    return {
      totalPrompts: promptsData.length,
      totalTools: TOOLS.length,
      totalChars,
    };
  }, []);

  const transitionDirection = useMemo(() => {
    const viewOrder = { home: 0, toolDetail: 1, promptDetail: 2, compare: 3, search: 4, guide: 5, about: 6 };
    if (!prevView) return 1;
    return (viewOrder[view] ?? 0) >= (viewOrder[prevView] ?? 0) ? 1 : -1;
  }, [view, prevView]);

  const viewMotion = useMemo(
    () => ({
      initial: (direction) => ({
        opacity: 0,
        x: motionEnabled ? (direction > 0 ? 42 : -42) : 0,
      }),
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: motionEnabled ? MOTION_DURATION.base : 0.2,
          ease: MOTION_EASE_OUT,
        },
      },
      exit: (direction) => ({
        opacity: 0,
        x: motionEnabled ? (direction > 0 ? -28 : 28) : 0,
        transition: {
          duration: motionEnabled ? MOTION_DURATION.fast : 0.15,
          ease: MOTION_EASE_OUT,
        },
      }),
    }),
    [motionEnabled],
  );

  const navigate = (newView, opts = {}) => {
    setPrevView(view);
    if (opts.tool !== undefined) setSelectedTool(opts.tool);
    if (opts.prompt !== undefined) setSelectedPrompt(opts.prompt);
    setView(newView);
    window.scrollTo({ top: 0, behavior: motionEnabled ? 'smooth' : 'auto' });
  };

  const handleViewTool = (tool) => navigate('toolDetail', { tool });

  const handleViewPrompt = (prompt) => {
    const tool = getToolByCompany(prompt.company, TOOLS) || null;
    navigate('promptDetail', { prompt, tool });
  };

  const handleBack = () => {
    if (view === 'promptDetail' && prevView === 'search') navigate('search');
    else if (view === 'promptDetail' && selectedTool) navigate('toolDetail', { tool: selectedTool });
    else if (view === 'promptDetail') navigate('home');
    else if (view === 'toolDetail') navigate('home');
    else if (view === 'compare') navigate('home');
    else if (view === 'guide') navigate('home');
    else if (view === 'about') navigate('home');
    else if (view === 'search') {
      setSearchQuery('');
      navigate('home');
    } else {
      navigate('home');
    }
  };

  const handleCompare = (tool) => {
    setCompareTools((prev) => {
      const exists = prev.some((item) => item.id === tool.id);
      if (exists) return prev.filter((item) => item.id !== tool.id);
      if (prev.length >= MAX_COMPARE_TOOLS) return [prev[1], tool];
      return [...prev, tool];
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && query.length >= 2) {
      if (view !== 'search') navigate('search');
    } else if (view === 'search') {
      navigate('home');
    }
  };

  const handleOpenCompare = () => navigate('compare');
  const handleOpenGuide = () => navigate('guide');
  const handleOpenAbout = () => navigate('about');

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'k+ctrl': () => {
      navigate('search');
      setSearchQuery('');
    },
    '/': () => {
      navigate('search');
      setSearchQuery('');
    },
    'escape': () => handleBack(),
  });

  return (
    <ReactLenis root>
      <div className={`min-h-screen selection:bg-neon-purple/30 pb-24 ${theme === 'light' ? 'text-gray-900' : ''}`} style={{ fontFamily: 'var(--font-sans)' }}>
        <Background3D theme={theme} />

        <Motion.div
          className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
          style={{ scaleX: motionEnabled ? progressScaleX : 0 }}
        />

        <header
          className={`sticky top-0 z-50 transition-all duration-500 ${theme === 'light' ? 'border-b backdrop-blur-xl' : 'glass-panel border-dark-border border-b backdrop-blur-xl'}`}
          style={theme === 'light' ? { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: '#e8e4dc' } : undefined}
        >
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${isCompactHeader ? 'py-2' : 'py-3.5'}`}>
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => navigate('home')}
                className="group/logo flex items-center space-x-3 flex-shrink-0 transition-transform duration-200 hover:scale-[1.02]"
                aria-label="Go to home"
              >
                <div className={`rounded-xl bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink p-[1.5px] transition-all duration-500 ${isCompactHeader ? 'w-8 h-8' : 'w-9 h-9'}`}>
                  <div className={`w-full h-full rounded-xl flex items-center justify-center group-hover/logo:scale-110 transition-transform duration-300 ${theme === 'light' ? 'bg-white' : 'bg-dark-bg'}`}>
                    <Sparkles className={`text-neon-blue transition-all duration-500 ${isCompactHeader ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
                  </div>
                </div>
                <div className="flex flex-col leading-none">
                  <span className={`font-black tracking-tight transition-all duration-500 ${theme === 'light' ? 'text-slate-900' : 'text-white'} ${isCompactHeader ? 'text-sm' : 'text-base'}`} style={{ fontFamily: 'var(--font-display)' }}>
                    Prompt<span className="text-gradient">Archive</span>
                  </span>
                  {!isCompactHeader && (
                    <span className={`text-[10px] font-semibold ${theme === 'light' ? 'text-slate-500' : 'text-gray-500'}`}>
                      AI System Prompts
                    </span>
                  )}
                </div>
              </button>

              {(view === 'search' || view === 'home') && (
                <div className={`hidden md:flex flex-1 max-w-sm items-center rounded-xl border gap-2 transition-all duration-500 input-focus-ring ${isCompactHeader ? 'px-2.5 py-1' : 'px-3 py-1.5'} ${theme === 'light' ? 'bg-white border-gray-200 shadow-sm' : 'glass-panel border-dark-border'}`}>
                  <Search size={14} className={theme === 'light' ? 'text-gray-400 flex-shrink-0' : 'text-neon-blue flex-shrink-0'} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search prompts..."
                    aria-label="Search AI prompts by tool name or keyword"
                    className={`flex-1 bg-transparent text-sm focus:outline-none min-w-0 ${theme === 'light' ? 'text-gray-900 placeholder-gray-400' : 'text-white placeholder-gray-500'}`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => handleSearch('')}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0 text-lg leading-none"
                    >
                      x
                    </button>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenGuide}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all btn-tap ${view === 'guide'
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/40'
                    : theme === 'light'
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/40 hover:bg-gray-500/30 hover:text-gray-300'
                    }`}
                >
                  <BookOpen size={12} />
                  <span className="hidden sm:inline">How to Use</span>
                </button>
                <button
                  onClick={handleOpenAbout}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all btn-tap ${view === 'about'
                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40'
                    : theme === 'light'
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/40 hover:bg-gray-500/30 hover:text-gray-300'
                    }`}
                >
                  <User size={12} />
                  <span className="hidden sm:inline">About</span>
                </button>
                <button
                  onClick={handleOpenCompare}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 btn-tap ${compareTools.length > 0
                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40 hover:bg-neon-purple/30 hover:scale-105'
                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/40 hover:bg-gray-500/30 hover:text-gray-300'
                    }`}
                >
                  <ArrowLeftRight size={12} />
                  {compareTools.length > 0 ? `Compare (${compareTools.length})` : 'Compare'}
                </button>

                <div className={`hidden sm:flex items-center p-0.5 rounded-full ${theme === 'light' ? 'bg-gray-100' : 'bg-dark-bg/50 border border-dark-border'}`}>
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-2 rounded-full transition-all hover:scale-110 btn-tap ${theme === 'light' ? 'bg-white shadow-sm text-yellow-500' : 'text-gray-500 hover:text-gray-300'}`}
                    title="Light Mode"
                    aria-label="Switch to light mode"
                  >
                    <Sun size={14} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setTheme('neon')}
                    className={`p-2 rounded-full transition-all hover:scale-110 btn-tap ${theme === 'neon' ? 'bg-neon-purple/20 text-neon-purple' : 'text-gray-500 hover:text-gray-300'}`}
                    title="Neon Mode"
                    aria-label="Switch to neon mode"
                  >
                    <Zap size={14} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-2 rounded-full transition-all hover:scale-110 btn-tap ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    title="Dark Mode"
                    aria-label="Switch to dark mode"
                  >
                    <Moon size={14} aria-hidden="true" />
                  </button>
                </div>

                <a
                  href="https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2 transition-all rounded-full px-4 py-2 hover:scale-[1.02] btn-tap ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'glass-panel text-gray-400 hover:text-white hover:border-neon-purple/50'}`}
                >
                  <Github size={16} className="group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-xs font-bold hidden sm:block">GitHub</span>
                  {githubStars !== null && (
                    <span className="flex items-center gap-1 pl-2 border-l border-gray-600 text-xs">
                      <Star size={11} className="text-yellow-400" />
                      <span className="font-bold text-yellow-500">{githubStars.toLocaleString()}</span>
                    </span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatePresence mode="wait" custom={transitionDirection}>
            {view === 'home' && (
              <Motion.div
                key="home"
                custom={transitionDirection}
                variants={viewMotion}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <HeroSection
                  totalPrompts={stats.totalPrompts}
                  totalTools={stats.totalTools}
                  totalChars={stats.totalChars}
                  onSearch={handleSearch}
                  theme={theme}
                />

                <Motion.section
                  initial={motionEnabled ? { opacity: 0, x: 32 } : false}
                  whileInView={motionEnabled ? { opacity: 1, x: 0 } : undefined}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE_OUT }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className={`text-2xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
                      AI Tool Explorer
                    </h2>
                    <button
                      type="button"
                      onClick={handleOpenCompare}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold hover:scale-[1.02] transition-all btn-tap ${compareTools.length > 0
                        ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40 hover:bg-neon-purple/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/40 hover:bg-gray-500/30 hover:text-gray-300'
                        }`}
                    >
                      <ArrowLeftRight size={16} />
                      {compareTools.length === 2 ? 'Open Comparison' : compareTools.length === 1 ? `Compare (1)` : 'Compare Prompts'}
                    </button>
                  </div>

                  <ToolsGrid
                    allPrompts={promptsData}
                    onViewPrompts={handleViewTool}
                    onCompare={handleCompare}
                    compareTools={compareTools}
                    theme={theme}
                  />
                </Motion.section>
              </Motion.div>
            )}

            {view === 'toolDetail' && selectedTool && (
              <Motion.div
                key="toolDetail"
                custom={transitionDirection}
                variants={viewMotion}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pt-8"
              >
                <ToolDetailView
                  tool={selectedTool}
                  allPrompts={promptsData}
                  onViewPrompt={handleViewPrompt}
                  onBack={handleBack}
                  onCompare={handleCompare}
                  compareTools={compareTools}
                  theme={theme}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </Motion.div>
            )}

            {view === 'promptDetail' && selectedPrompt && (
              <Motion.div
                key="promptDetail"
                custom={transitionDirection}
                variants={viewMotion}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pt-8"
              >
                <PromptDetail
                  prompt={selectedPrompt}
                  tool={selectedTool}
                  prevView={prevView}
                  onBack={handleBack}
                  theme={theme}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </Motion.div>
            )}

            {view === 'compare' && (
              <Motion.div
                key="compare"
                custom={transitionDirection}
                variants={viewMotion}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pt-8"
              >
                <CompareView
                  allPrompts={promptsData}
                  initialTools={compareTools}
                  onBack={handleBack}
                  onClose={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  theme={theme}
                />
              </Motion.div>
            )}

            {view === 'search' && (
              <Motion.div
                key="search"
                custom={transitionDirection}
                variants={viewMotion}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pt-8"
              >
                <SearchView
                  query={searchQuery}
                  allPrompts={promptsData}
                  onViewPrompt={handleViewPrompt}
                  onBack={handleBack}
                  theme={theme}
                />
              </Motion.div>
            )}

            {view === 'guide' && (
              <Motion.div
                key="guide"
                custom={transitionDirection}
                variants={viewMotion}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pt-8"
              >
                <HowToUseGuide
                  onBack={handleBack}
                  theme={theme}
                />
              </Motion.div>
            )}

            {view === 'about' && (
              <Motion.div
                key="about"
                custom={transitionDirection}
                variants={viewMotion}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pt-8"
              >
                <AboutPage
                  onBack={handleBack}
                  theme={theme}
                />
              </Motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer
          theme={theme}
          githubStars={githubStars}
          totalPrompts={stats.totalPrompts}
          totalTools={stats.totalTools}
        />
      </div>
    </ReactLenis>
  );
}

export default App;


