import { motion as Motion } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    Copy,
    Terminal,
    MessageSquare,
    Settings,
    Lightbulb,
    Zap,
    CheckCircle,
    ExternalLink,
    ChevronRight,
    Sparkles,
    Code,
    Layers,
    Target,
    Wand2,
} from 'lucide-react';
import { MOTION_DURATION, MOTION_EASE_OUT } from '../motion/constants';
import { useMotionPreferences } from '../motion/useMotionPreferences';
import { useState } from 'react';

const GUIDE_SECTIONS = [
    {
        id: 'what-are-prompts',
        icon: BookOpen,
        title: 'What Are System Prompts?',
        color: '#38bdf8',
        content: `System prompts are the hidden instructions that define how an AI assistant behaves. They are set by the developers before you ever interact with the AI, and they control everything from the AI's personality and tone to its capabilities and limitations.

Think of system prompts as the "DNA" of an AI — they shape how it thinks, responds, and what rules it follows.`,
        highlights: [
            'Define the AI\'s persona and behavior',
            'Set boundaries and safety guidelines',
            'Control output format and style',
            'Enable or restrict specific capabilities',
        ],
    },
    {
        id: 'why-useful',
        icon: Lightbulb,
        title: 'Why Are They Useful?',
        color: '#818cf8',
        content: `Understanding system prompts gives you a superpower — you can learn how the best AI tools are engineered and apply those same techniques to your own projects.`,
        highlights: [
            'Learn prompt engineering from the best AI companies',
            'Understand why different AI tools behave differently',
            'Improve your own AI applications and chatbots',
            'Discover advanced techniques used in production',
            'Build better custom GPTs and AI agents',
        ],
    },
    {
        id: 'how-to-use',
        icon: Wand2,
        title: 'How to Use These Prompts',
        color: '#2dd4bf',
        content: `Here's a step-by-step guide to get the most out of PromptArchive:`,
        steps: [
            {
                title: '1. Browse & Explore',
                icon: Layers,
                description: 'Start by browsing the AI Tool Explorer on the homepage. Click on any tool card to see all its associated system prompts. Use the category filters (General AI, Developer AI, Creative AI, Infrastructure) to narrow down your interests.',
            },
            {
                title: '2. Read & Analyze',
                icon: BookOpen,
                description: 'Click on any prompt to read its full content with syntax highlighting. Pay attention to how the prompt structures instructions, sets boundaries, and defines the AI\'s behavior. Look for patterns like role definitions, output formatting rules, and safety constraints.',
            },
            {
                title: '3. Copy & Adapt',
                icon: Copy,
                description: 'Use the one-click copy button to copy any prompt. You can then paste it into your own projects, modify it for your needs, or use it as a template. Many prompts work great as starting points for custom GPTs, AI chatbots, or agent configurations.',
            },
            {
                title: '4. Compare & Learn',
                icon: Target,
                description: 'Select two tools using the Compare feature to see their prompts side-by-side. This is incredibly valuable for understanding how different companies approach similar problems — like how Claude vs. ChatGPT handle safety, or how Cursor vs. GitHub Copilot structure coding instructions.',
            },
            {
                title: '5. Search & Discover',
                icon: Sparkles,
                description: 'Use the search bar (Ctrl+K or /) to find specific techniques. Search for terms like "function calling", "code generation", "safety", or "markdown" to discover how different AI tools handle specific capabilities.',
            },
        ],
    },
    {
        id: 'use-cases',
        icon: Terminal,
        title: 'Practical Use Cases',
        color: '#f472b6',
        content: `Here are real-world scenarios where these prompts can help you:`,
        useCases: [
            {
                title: 'Building a Custom ChatBot',
                icon: MessageSquare,
                description: 'Study how ChatGPT and Claude structure their system prompts to create your own conversational AI with the right personality, safety rules, and output format.',
                example: 'Copy Claude\'s approach to handling harmful requests, then modify the persona section for your brand.',
            },
            {
                title: 'Creating an AI Coding Assistant',
                icon: Code,
                description: 'Analyze prompts from Cursor, GitHub Copilot, and Windsurf to understand how they handle code generation, error detection, and context management.',
                example: 'Study how Cursor structures its "code editing" instructions and adapt them for your own coding tool.',
            },
            {
                title: 'Improving Your Prompt Engineering',
                icon: Zap,
                description: 'Learn professional-grade prompt engineering by studying how top AI companies write their instructions. Notice patterns in structure, specificity, and constraint handling.',
                example: 'Notice how most prompts use numbered lists for rules, specific examples for edge cases, and clear role definitions.',
            },
            {
                title: 'Configuring AI Agents',
                icon: Settings,
                description: 'Use prompts from Devin, Manus, and other AI agents to understand how to give an AI autonomy while maintaining safety and focus.',
                example: 'Study Manus\'s tool-use instructions to learn how to structure multi-step agent workflows.',
            },
        ],
    },
    {
        id: 'pro-tips',
        icon: Zap,
        title: 'Pro Tips',
        color: '#fbbf24',
        content: '',
        tips: [
            {
                tip: 'Start with structure',
                detail: 'The best system prompts follow a clear structure: Role → Context → Instructions → Constraints → Output Format. Look for this pattern across different prompts.',
            },
            {
                tip: 'Layer your instructions',
                detail: 'Notice how production prompts use layered instructions — general rules first, then specific scenarios, then edge cases. This hierarchy helps the AI prioritize.',
            },
            {
                tip: 'Use explicit constraints',
                detail: 'Rather than saying "be helpful", top prompts say exactly what to do and what not to do. Study how they phrase prohibitions and requirements.',
            },
            {
                tip: 'Test iteratively',
                detail: 'Don\'t just copy a prompt — adapt it, test it, and iterate. Change one thing at a time to see how it affects the AI\'s behavior.',
            },
            {
                tip: 'Combine techniques',
                detail: 'The most powerful prompts combine techniques from multiple sources. Take the safety approach from one prompt and the output format from another.',
            },
            {
                tip: 'Use the Compare feature',
                detail: 'Side-by-side comparison is the fastest way to understand different prompt engineering philosophies. Compare tools in the same category for the best insights.',
            },
        ],
    },
];

export default function HowToUseGuide({ onBack, theme }) {
    const { motionEnabled } = useMotionPreferences();
    const [expandedSection, setExpandedSection] = useState('what-are-prompts');

    const isLight = theme === 'light';

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: motionEnabled ? 0.06 : 0 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: motionEnabled ? 16 : 0 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: motionEnabled ? MOTION_DURATION.base : 0.15, ease: MOTION_EASE_OUT },
        },
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <Motion.div
                initial={motionEnabled ? { opacity: 0, y: -12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionEnabled ? MOTION_DURATION.base : 0.15, ease: MOTION_EASE_OUT }}
                className="mb-10"
            >
                <button
                    onClick={onBack}
                    className={`group flex items-center gap-2 text-sm font-medium mb-6 transition-all hover:gap-3 btn-tap ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Explorer
                </button>

                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink p-[2px]">
                        <div className={`w-full h-full rounded-2xl flex items-center justify-center ${isLight ? 'bg-white' : 'bg-dark-bg'}`}>
                            <BookOpen size={26} className="text-neon-blue" />
                        </div>
                    </div>
                    <div>
                        <h1
                            className={`text-3xl md:text-4xl font-black tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            How to <span className="text-gradient">Use</span> These Prompts
                        </h1>
                        <p className={`text-sm mt-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                            Your complete guide to leveraging AI system prompts
                        </p>
                    </div>
                </div>
            </Motion.div>

            {/* Quick Nav */}
            <Motion.div
                initial={motionEnabled ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionEnabled ? MOTION_DURATION.base : 0.15, delay: motionEnabled ? 0.1 : 0, ease: MOTION_EASE_OUT }}
                className={`flex flex-wrap gap-2 mb-10 p-3 rounded-2xl ${isLight ? 'bg-gray-50 border border-gray-200' : 'glass-panel border border-dark-border'}`}
            >
                {GUIDE_SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isActive = expandedSection === section.id;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setExpandedSection(section.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all btn-tap ${isActive
                                    ? 'text-white shadow-lg'
                                    : isLight
                                        ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            style={isActive ? { backgroundColor: section.color + '22', color: section.color, border: `1px solid ${section.color}55` } : {}}
                        >
                            <Icon size={14} />
                            <span className="hidden sm:inline">{section.title}</span>
                        </button>
                    );
                })}
            </Motion.div>

            {/* Content Sections */}
            <Motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
                {GUIDE_SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isExpanded = expandedSection === section.id;

                    return (
                        <Motion.div
                            key={section.id}
                            variants={itemVariants}
                            layout
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isLight
                                    ? `bg-white border-gray-200 ${isExpanded ? 'shadow-xl shadow-gray-200/50' : 'shadow-sm'}`
                                    : `glass-panel border-dark-border ${isExpanded ? 'shadow-lg' : ''}`
                                }`}
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                                className={`w-full flex items-center gap-4 p-5 text-left transition-all group ${isLight ? 'hover:bg-gray-50' : 'hover:bg-white/[0.02]'
                                    }`}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: section.color + '18' }}
                                >
                                    <Icon size={20} style={{ color: section.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2
                                        className={`text-lg font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        {section.title}
                                    </h2>
                                </div>
                                <ChevronRight
                                    size={18}
                                    className={`flex-shrink-0 transition-transform duration-300 ${isLight ? 'text-gray-400' : 'text-gray-500'} ${isExpanded ? 'rotate-90' : ''}`}
                                />
                            </button>

                            {/* Section Content */}
                            {isExpanded && (
                                <Motion.div
                                    initial={motionEnabled ? { opacity: 0, height: 0 } : false}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: motionEnabled ? 0.3 : 0.1, ease: MOTION_EASE_OUT }}
                                    className="px-5 pb-6"
                                >
                                    {section.content && (
                                        <p className={`text-sm leading-relaxed mb-5 pl-14 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {section.content}
                                        </p>
                                    )}

                                    {/* Highlights */}
                                    {section.highlights && (
                                        <div className="grid sm:grid-cols-2 gap-3 pl-14">
                                            {section.highlights.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-start gap-2.5 p-3 rounded-xl text-sm ${isLight ? 'bg-gray-50 text-gray-700' : 'bg-white/[0.03] text-gray-300'}`}
                                                >
                                                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: section.color }} />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Steps */}
                                    {section.steps && (
                                        <div className="space-y-4 pl-14">
                                            {section.steps.map((step, i) => {
                                                const StepIcon = step.icon;
                                                return (
                                                    <Motion.div
                                                        key={i}
                                                        initial={motionEnabled ? { opacity: 0, x: -8 } : false}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: motionEnabled ? i * 0.05 : 0, ease: MOTION_EASE_OUT }}
                                                        className={`relative p-4 rounded-xl border-l-2 ${isLight ? 'bg-gray-50 border-l-gray-300' : 'bg-white/[0.02] border-l-gray-700'}`}
                                                        style={{ borderLeftColor: section.color }}
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <StepIcon size={16} style={{ color: section.color }} />
                                                            <h4 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                                                                {step.title}
                                                            </h4>
                                                        </div>
                                                        <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                                            {step.description}
                                                        </p>
                                                    </Motion.div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Use Cases */}
                                    {section.useCases && (
                                        <div className="grid md:grid-cols-2 gap-4 pl-14">
                                            {section.useCases.map((uc, i) => {
                                                const UCIcon = uc.icon;
                                                return (
                                                    <Motion.div
                                                        key={i}
                                                        initial={motionEnabled ? { opacity: 0, y: 8 } : false}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: motionEnabled ? i * 0.06 : 0, ease: MOTION_EASE_OUT }}
                                                        className={`p-4 rounded-xl border hover-lift ${isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/[0.02] border-dark-border'}`}
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <UCIcon size={16} style={{ color: section.color }} />
                                                            <h4 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                                                                {uc.title}
                                                            </h4>
                                                        </div>
                                                        <p className={`text-xs leading-relaxed mb-3 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                                            {uc.description}
                                                        </p>
                                                        <div className={`text-xs p-2.5 rounded-lg ${isLight ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'}`}>
                                                            <span className="font-bold">💡 Example: </span>
                                                            {uc.example}
                                                        </div>
                                                    </Motion.div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Pro Tips */}
                                    {section.tips && (
                                        <div className="space-y-3 pl-14">
                                            {section.tips.map((t, i) => (
                                                <Motion.div
                                                    key={i}
                                                    initial={motionEnabled ? { opacity: 0, x: -8 } : false}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: motionEnabled ? i * 0.04 : 0, ease: MOTION_EASE_OUT }}
                                                    className={`flex gap-3 p-3 rounded-xl ${isLight ? 'bg-amber-50 border border-amber-100' : 'bg-yellow-500/5 border border-yellow-500/10'}`}
                                                >
                                                    <Zap size={16} className="flex-shrink-0 mt-0.5 text-yellow-500" />
                                                    <div>
                                                        <span className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                                                            {t.tip}:
                                                        </span>{' '}
                                                        <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                                            {t.detail}
                                                        </span>
                                                    </div>
                                                </Motion.div>
                                            ))}
                                        </div>
                                    )}
                                </Motion.div>
                            )}
                        </Motion.div>
                    );
                })}
            </Motion.div>

            {/* CTA Footer */}
            <Motion.div
                initial={motionEnabled ? { opacity: 0, y: 16 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: motionEnabled ? MOTION_DURATION.base : 0.15, ease: MOTION_EASE_OUT }}
                className={`mt-12 mb-8 text-center p-8 rounded-2xl border ${isLight ? 'bg-gradient-to-br from-gray-50 to-white border-gray-200' : 'glass-panel border-dark-border'}`}
            >
                <h3
                    className={`text-xl font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Ready to <span className="text-gradient">Explore?</span>
                </h3>
                <p className={`text-sm mb-5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                    Start browsing system prompts from 30+ AI tools
                </p>
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:opacity-90 transition-all shadow-neon-glow btn-tap hover:scale-[1.02]"
                >
                    <Sparkles size={16} />
                    Explore AI Tools
                    <ChevronRight size={14} />
                </button>
            </Motion.div>
        </div>
    );
}
