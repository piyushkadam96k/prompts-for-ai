import { useMemo, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, ArrowLeftRight, X } from 'lucide-react';
import { CATEGORY_COLORS, TOOLS, getPromptsForTool } from '../data/toolsData';
import { getLengthLabel } from '../utils/formatting';
import ToolIcon from './ToolIcon';

function ToolSelector({ label, selectedTool, onSelect, theme }) {
  const handleChange = (e) => {
    const value = e.target.value;
    const selected = value ? TOOLS.find((tool) => tool.id === value) : null;
    onSelect(selected);
  };

  return (
    <div className={`rounded-xl overflow-hidden ${theme === 'light' ? 'border border-gray-200' : 'border border-dark-border'}`}>
      <div className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-t-xl ${theme === 'light' ? 'bg-gray-50 text-gray-500 border-b border-gray-200' : 'bg-dark-surface text-gray-500 border-b border-dark-border'}`}>
        {label}
      </div>
      <select
        value={selectedTool?.id ?? ''}
        onChange={handleChange}
        className={`w-full px-4 py-3 text-sm font-semibold focus:outline-none cursor-pointer rounded-b-xl min-h-[44px] ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-dark-bg text-white'}`}
        aria-label={`Select ${label}`}
      >
        <option value="">- Select a tool -</option>
        {TOOLS.map((tool) => (
          <option key={tool.id} value={tool.id}>
            {tool.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function PromptSelector({ tool, allPrompts, selectedPrompt, onSelect, theme }) {
  const prompts = useMemo(() => (tool ? getPromptsForTool(tool, allPrompts) : []), [tool, allPrompts]);

  if (!tool) {
    return (
      <div className={`h-32 flex items-center justify-center rounded-xl text-sm ${theme === 'light' ? 'text-gray-400 border border-dashed border-gray-300' : 'text-gray-600 border border-dashed border-dark-border'}`}>
        Select a tool above
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className={`h-32 flex items-center justify-center rounded-xl text-sm ${theme === 'light' ? 'text-gray-400 border border-dashed border-gray-300' : 'text-gray-600 border border-dashed border-dark-border'}`}>
        No prompts available
      </div>
    );
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const selected = value ? prompts.find((p) => p.id === value) : null;
    onSelect(selected);
  };

  return (
    <select
      value={selectedPrompt?.id ?? ''}
      onChange={handleChange}
      className={`w-full px-4 py-3 text-sm font-semibold rounded-xl focus:outline-none cursor-pointer border min-h-[44px] ${theme === 'light' ? 'bg-white text-gray-900 border-gray-200' : 'bg-dark-bg text-white border-dark-border'}`}
      aria-label="Select prompt"
    >
      <option value="">- Select a prompt -</option>
      {prompts.map((prompt) => (
        <option key={prompt.id} value={prompt.id}>
          {prompt.name}
        </option>
      ))}
    </select>
  );
}

function PromptPanel({ tool, prompt, theme }) {
  if (!tool) {
    return (
      <div className={`h-64 flex flex-col items-center justify-center rounded-2xl text-center ${theme === 'light' ? 'bg-gray-50 border border-gray-200 text-gray-400' : 'glass-panel text-gray-600'}`}>
        <span className="text-4xl mb-3">🤖</span>
        <p className="text-sm">Select a tool to compare</p>
      </div>
    );
  }

  const content = prompt?.content || '';
  const chars = content.length;
  const words = content ? content.trim().split(/\s+/).length : 0;
  const categoryColor = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS.general;
  const lengthInfo = getLengthLabel(chars);

  return (
    <div className={`rounded-2xl overflow-hidden h-full flex flex-col ${theme === 'light' ? 'bg-white border border-gray-200' : 'glass-panel'}`}>
      <div className="p-4 border-b border-dark-border/40">
        <div className="flex items-center gap-3 mb-2">
          <ToolIcon tool={tool} size={40} />
          <div>
            <h3 className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{tool.name}</h3>
            <span className="text-xs font-semibold" style={{ color: categoryColor.from }}>
              {categoryColor.label}
            </span>
          </div>
        </div>
        {prompt && (
          <div className="flex gap-3 text-xs flex-wrap mt-2">
            <span className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
              <strong className={theme === 'light' ? 'text-gray-700' : 'text-gray-200'}>{chars.toLocaleString()}</strong> chars
            </span>
            <span className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
              <strong className={theme === 'light' ? 'text-gray-700' : 'text-gray-200'}>{words.toLocaleString()}</strong> words
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: `${lengthInfo.color}18`, color: lengthInfo.color, border: `1px solid ${lengthInfo.color}40` }}
            >
              {lengthInfo.label}
            </span>
          </div>
        )}
        {prompt && chars > 0 && (
          <div className={`mt-2 h-1 rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-200' : 'bg-dark-border'}`}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, (chars / 100000) * 100)}%`,
                background: `linear-gradient(90deg, ${categoryColor.from}, ${categoryColor.to})`,
              }}
            />
          </div>
        )}
      </div>
      <div className={`flex-1 overflow-auto p-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-dark-surface/50'}`}>
        {prompt ? (
          <pre className={`text-xs leading-relaxed whitespace-pre-wrap font-mono ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            {content}
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className={`text-sm ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>Select a prompt above</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CompareView({ allPrompts, initialTools, onBack, onClose, theme }) {
  const [toolA, setToolA] = useState(initialTools?.[0] || null);
  const [toolB, setToolB] = useState(initialTools?.[1] || null);
  const [promptAId, setPromptAId] = useState(null);
  const [promptBId, setPromptBId] = useState(null);

  const promptsForToolA = useMemo(
    () => (toolA ? getPromptsForTool(toolA, allPrompts) : []),
    [toolA, allPrompts],
  );
  const promptsForToolB = useMemo(
    () => (toolB ? getPromptsForTool(toolB, allPrompts) : []),
    [toolB, allPrompts],
  );

  const promptA = useMemo(() => {
    if (!toolA) return null;
    return promptsForToolA.find((prompt) => prompt.id === promptAId) || promptsForToolA[0] || null;
  }, [toolA, promptsForToolA, promptAId]);

  const promptB = useMemo(() => {
    if (!toolB) return null;
    return promptsForToolB.find((prompt) => prompt.id === promptBId) || promptsForToolB[0] || null;
  }, [toolB, promptsForToolB, promptBId]);

  const charA = promptA?.content?.length || 0;
  const charB = promptB?.content?.length || 0;
  const maxChars = Math.max(charA, charB, 1);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else if (typeof onBack === 'function') {
      onBack();
    }
  };

  return (
    <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-20">
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
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
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          aria-label="Close compare"
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap ${
            theme === 'light'
              ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              : 'text-gray-400 hover:text-white hover:bg-dark-border/50'
          }`}
        >
          <X size={18} />
          Close
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <ArrowLeftRight className="text-neon-purple" size={22} />
        <h2 className={`text-2xl font-black ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
          Compare Prompts
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <ToolSelector
            label="Tool A"
            selectedTool={toolA}
            onSelect={(tool) => {
              setToolA(tool);
              setPromptAId(null);
            }}
            theme={theme}
          />
          {toolA && (
            <div className="mt-2">
              <PromptSelector
                tool={toolA}
                allPrompts={allPrompts}
                selectedPrompt={promptA}
                onSelect={(prompt) => setPromptAId(prompt?.id || null)}
                theme={theme}
              />
            </div>
          )}
        </div>
        <div>
          <ToolSelector
            label="Tool B"
            selectedTool={toolB}
            onSelect={(tool) => {
              setToolB(tool);
              setPromptBId(null);
            }}
            theme={theme}
          />
          {toolB && (
            <div className="mt-2">
              <PromptSelector
                tool={toolB}
                allPrompts={allPrompts}
                selectedPrompt={promptB}
                onSelect={(prompt) => setPromptBId(prompt?.id || null)}
                theme={theme}
              />
            </div>
          )}
        </div>
      </div>

      {(charA > 0 || charB > 0) && (
        <div className={`rounded-xl p-4 mb-4 ${theme === 'light' ? 'bg-white border border-gray-200' : 'glass-panel'}`}>
          <p className="text-xs font-bold mb-3 uppercase tracking-widest text-gray-500">Length Comparison</p>
          <div className="space-y-2">
            {[
              { label: toolA?.name, chars: charA, color: 'var(--color-primary)' },
              { label: toolB?.name, chars: charB, color: 'var(--color-secondary)' },
            ].map((item) => item.label && (
              <div key={item.label} className="flex items-center gap-3">
                <span className={`text-xs font-semibold w-28 truncate ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{item.label}</span>
                <div className={`flex-1 h-2 rounded-full ${theme === 'light' ? 'bg-gray-100' : 'bg-dark-border'}`}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(item.chars / maxChars) * 100}%`, background: item.color }} />
                </div>
                <span className={`text-xs font-mono w-20 text-right ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {item.chars.toLocaleString()} ch
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ minHeight: '60vh' }}>
        <PromptPanel tool={toolA} prompt={promptA} theme={theme} />
        <PromptPanel tool={toolB} prompt={promptB} theme={theme} />
      </div>
    </Motion.div>
  );
}


