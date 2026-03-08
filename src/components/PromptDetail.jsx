import { useEffect, useRef, useState } from 'react';
import { animate, motion as Motion, useInView } from 'framer-motion';
import { Copy, Check, Download, Share2, ArrowLeft, Heart, Twitter } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ToolIcon from './ToolIcon';
import { MOTION_DURATION, MOTION_EASE_OUT, MOTION_STAGGER } from '../motion/constants';
import { useMotionPreferences } from '../motion/useMotionPreferences';
import { getLengthLabel, getWordCount, getTokenEstimate } from '../utils/formatting';

export default function PromptDetail({ prompt, tool, prevView, onBack, theme, isFavorite, onToggleFavorite }) {
  const [copied, setCopied] = useState(false);
  const [shareMsg, setShareMsg] = useState('');
  const [displayChars, setDisplayChars] = useState(0);
  const [displayWords, setDisplayWords] = useState(0);
  const [displayLines, setDisplayLines] = useState(0);
  const [lengthProgress, setLengthProgress] = useState(0);
  const [showCodeLines, setShowCodeLines] = useState(false);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { amount: 0.35, once: true });
  const { motionEnabled } = useMotionPreferences();

  const charCount = prompt.content.length;
  const wordCount = getWordCount(prompt.content);
  const lineCount = prompt.content.split('\n').length;
  const tokenEstimate = getTokenEstimate(prompt.content);
  const lengthInfo = getLengthLabel(charCount);
  const progressPct = Math.min(100, (charCount / 100000) * 100);
  const charsValue = motionEnabled ? displayChars : charCount;
  const wordsValue = motionEnabled ? displayWords : wordCount;
  const linesValue = motionEnabled ? displayLines : lineCount;
  const progressValue = motionEnabled ? lengthProgress : progressPct;
  const favorited = isFavorite ? isFavorite(prompt) : false;
  const codeLinesEnabled = motionEnabled ? showCodeLines : true;

  useEffect(() => {
    if (!statsInView || !motionEnabled) return;

    const controls = [
      animate(0, charCount, {
        duration: MOTION_DURATION.slow,
        ease: MOTION_EASE_OUT,
        onUpdate: (value) => setDisplayChars(Math.round(value)),
      }),
      animate(0, wordCount, {
        duration: MOTION_DURATION.base,
        ease: MOTION_EASE_OUT,
        onUpdate: (value) => setDisplayWords(Math.round(value)),
      }),
      animate(0, lineCount, {
        duration: MOTION_DURATION.base,
        ease: MOTION_EASE_OUT,
        onUpdate: (value) => setDisplayLines(Math.round(value)),
      }),
      animate(0, progressPct, {
        duration: MOTION_DURATION.slow,
        ease: MOTION_EASE_OUT,
        onUpdate: (value) => setLengthProgress(value),
      }),
    ];

    const showLinesTimer = setTimeout(() => {
      setShowCodeLines(true);
    }, 250);

    return () => {
      controls.forEach((control) => control.stop());
      clearTimeout(showLinesTimer);
    };
  }, [statsInView, motionEnabled, charCount, wordCount, lineCount, progressPct]);

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  };

  const handleCopy = async () => {
    const success = await copyText(prompt.content);
    if (!success) {
      setShareMsg('Clipboard unavailable');
      setTimeout(() => setShareMsg(''), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([prompt.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${prompt.company}-${prompt.name}.txt`.replace(/\s+/g, '-');
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `Check out this AI system prompt: ${prompt.company} - ${prompt.name}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: prompt.name, text: shareText });
        return;
      } catch {
        return;
      }
    }

    const success = await copyText(`${shareText}\n\n${prompt.content.slice(0, 500)}...`);
    if (success) {
      setShareMsg('Copied to clipboard!');
      setTimeout(() => setShareMsg(''), 2000);
    } else {
      setShareMsg('Share unavailable');
      setTimeout(() => setShareMsg(''), 2000);
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`🔍 Check out ${prompt.company}'s AI system prompt: "${prompt.name}"\n\nExplore AI system prompts at PromptArchive!`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener');
  };

  const shareOnLinkedIn = () => {
    const text = encodeURIComponent(`Exploring AI system prompts - check out ${prompt.company}'s "${prompt.name}" prompt. Fascinating to see how top AI tools are engineered! #AI #PromptEngineering`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools')}&summary=${text}`, '_blank', 'noopener');
  };

  return (
    <Motion.div
      initial={motionEnabled ? { opacity: 0, x: 30 } : false}
      animate={{ opacity: 1, x: 0 }}
      exit={motionEnabled ? { opacity: 0, x: -30 } : undefined}
      transition={{ duration: motionEnabled ? MOTION_DURATION.base : 0.2, ease: MOTION_EASE_OUT }}
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap mb-6 ${theme === 'light'
            ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
            : 'glass-panel border border-dark-border text-gray-300 hover:text-white hover:border-neon-blue/40'
          }`}
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        {prevView === 'search' ? 'Back to Search' : tool ? `Back to ${tool.name}` : 'Back to All Tools'}
      </button>

      <div ref={statsRef} className={`rounded-2xl p-6 mb-6 ${theme === 'light' ? 'bg-white border border-gray-200' : 'glass-panel'}`}>
        <div className="flex items-start gap-4">
          {tool && <ToolIcon tool={tool} size={56} />}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${theme === 'light' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'}`}>
                {prompt.company}
              </span>
              {prompt.tool !== prompt.company && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${theme === 'light' ? 'bg-gray-100 text-gray-600 border border-gray-200' : 'bg-dark-border text-gray-400'}`}>
                  {prompt.tool}
                </span>
              )}
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: `${lengthInfo.color}18`,
                  color: lengthInfo.color,
                  border: `1px solid ${lengthInfo.color}40`,
                }}
              >
                {lengthInfo.label}
              </span>
            </div>
            <h1 className={`text-xl md:text-2xl font-black mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
              {prompt.name}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm">
              {[
                { label: 'Characters', value: charsValue.toLocaleString() },
                { label: 'Words', value: wordsValue.toLocaleString() },
                { label: 'Lines', value: linesValue.toLocaleString() },
                { label: '~Tokens', value: tokenEstimate.toLocaleString() },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="text-gray-500">{stat.label}: </span>
                  <span className={`font-bold ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <div className={`h-1.5 w-full rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-200' : 'bg-dark-border'}`}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progressValue}%`,
                    background: `linear-gradient(90deg, ${lengthInfo.color}, ${lengthInfo.color}88)`,
                    transition: motionEnabled ? 'width 80ms linear' : 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(prompt)}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] btn-tap ${favorited
                  ? 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25'
                  : theme === 'light'
                    ? 'border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200'
                    : 'border border-dark-border text-gray-400 hover:text-red-400 hover:border-red-500/30'
                }`}
            >
              <Heart size={16} className={favorited ? 'fill-red-400' : ''} aria-hidden="true" />
              {favorited ? 'Favorited' : 'Favorite'}
            </button>
          )}
          <button
            onClick={handleCopy}
            aria-label="Copy prompt text to clipboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] btn-tap ${theme === 'light' ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-white border border-neon-blue/30 hover:border-neon-purple/60'}`}
          >
            {copied ? <Check size={16} className="text-green-400" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
          <button
            onClick={handleDownload}
            aria-label="Download prompt as text file"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap ${theme === 'light' ? 'border border-gray-200 text-gray-700 hover:bg-gray-50' : 'border border-dark-border text-gray-400 hover:text-white hover:border-gray-500'}`}
          >
            <Download size={16} aria-hidden="true" />
            Download .txt
          </button>
          <button
            onClick={handleShare}
            aria-label="Share prompt"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap ${theme === 'light' ? 'border border-gray-200 text-gray-700 hover:bg-gray-50' : 'border border-dark-border text-gray-400 hover:text-white hover:border-gray-500'}`}
          >
            <Share2 size={16} aria-hidden="true" />
            {shareMsg || 'Share'}
          </button>
          <button
            onClick={shareOnTwitter}
            aria-label="Share on Twitter"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap ${theme === 'light' ? 'border border-gray-200 text-gray-700 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200' : 'border border-dark-border text-gray-400 hover:text-sky-400 hover:border-sky-500/30'}`}
          >
            <Twitter size={16} aria-hidden="true" />
            Tweet
          </button>
          <button
            onClick={shareOnLinkedIn}
            aria-label="Share on LinkedIn"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap ${theme === 'light' ? 'border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200' : 'border border-dark-border text-gray-400 hover:text-blue-400 hover:border-blue-500/30'}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            LinkedIn
          </button>
        </div>
      </div>

      <div className={`rounded-2xl overflow-hidden ${theme === 'light' ? 'border border-gray-200' : 'border border-dark-border'}`}>
        <div className={`flex items-center justify-between px-4 py-3 ${theme === 'light' ? 'bg-gray-50 border-b border-gray-200' : 'bg-dark-surface border-b border-dark-border'}`}>
          <span className={`text-xs font-mono font-semibold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            system_prompt.txt
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy code block to clipboard"
            className={`text-xs flex items-center gap-1.5 transition-colors ${theme === 'light' ? 'text-gray-500 hover:text-gray-900' : 'text-gray-500 hover:text-gray-200'}`}
          >
            {copied ? <><Check size={12} className="text-green-500" /> Copied</> : <><Copy size={12} /> Copy</>}
          </button>
        </div>
        <div className={`p-6 overflow-x-auto text-sm leading-relaxed markdown-body ${theme === 'light' ? 'bg-white text-gray-700' : 'bg-dark-bg/80 text-gray-300'}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg my-4 text-xs border border-dark-border"
                    customStyle={{ margin: 0, padding: '1rem' }}
                    wrapLines
                    lineProps={(lineNumber) => {
                      if (!codeLinesEnabled) return {};
                      return {
                        className: 'code-line-reveal',
                        style: { animationDelay: `${lineNumber * MOTION_STAGGER.codeLines}s` },
                      };
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`px-1.5 py-0.5 rounded text-xs font-mono ${theme === 'light' ? 'bg-gray-100 text-pink-600' : 'bg-neon-purple/10 text-neon-pink'}`} {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ ...props }) => <p className="mb-4 whitespace-pre-wrap opacity-90 font-mono text-xs leading-relaxed" {...props} />,
              h1: ({ ...props }) => <h1 className={`text-xl font-black mt-6 mb-3 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`} {...props} />,
              h2: ({ ...props }) => <h2 className={`text-lg font-bold mt-5 mb-2 pb-2 border-b ${theme === 'light' ? 'text-slate-800 border-slate-200' : 'text-gray-100 border-dark-border'}`} {...props} />,
              h3: ({ ...props }) => <h3 className={`text-base font-bold mt-4 mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-gray-200'}`} {...props} />,
              ul: ({ ...props }) => <ul className="list-disc ml-5 my-3 space-y-1.5 opacity-90" {...props} />,
              ol: ({ ...props }) => <ol className="list-decimal ml-5 my-3 space-y-1.5 opacity-90" {...props} />,
              blockquote: ({ ...props }) => <blockquote className={`border-l-4 pl-4 py-1 my-4 italic rounded-r ${theme === 'light' ? 'border-violet-400 text-slate-600 bg-violet-50' : 'border-neon-purple text-gray-400 bg-neon-purple/5'}`} {...props} />,
              a: ({ ...props }) => <a className={`underline ${theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-neon-blue hover:text-white'}`} target="_blank" rel="noopener noreferrer" {...props} />,
            }}
          >
            {prompt.content}
          </ReactMarkdown>
        </div>
      </div>
    </Motion.div>
  );
}


