import { motion as Motion } from 'framer-motion';
import {
    ArrowLeft,
    Github,
    Globe,
    Code2,
    Sparkles,
    Heart,
    Layers,
    Palette,
    Zap,
    ExternalLink,
    User,
} from 'lucide-react';
import { MOTION_DURATION, MOTION_EASE_OUT } from '../motion/constants';
import { useMotionPreferences } from '../motion/useMotionPreferences';

const TECH_STACK = [
    { name: 'React 19', color: '#61dafb', description: 'UI Library' },
    { name: 'Vite 7', color: '#646cff', description: 'Build Tool' },
    { name: 'Tailwind CSS 4', color: '#06b6d4', description: 'Styling' },
    { name: 'Three.js', color: '#ffffff', description: '3D Graphics' },
    { name: 'Framer Motion', color: '#ff0066', description: 'Animations' },
    { name: 'Lenis', color: '#ff8800', description: 'Smooth Scroll' },
    { name: 'Lucide React', color: '#f56565', description: 'Icons' },
    { name: 'React Markdown', color: '#83cd29', description: 'Rendering' },
];

const FEATURES = [
    { icon: Layers, label: '30+ AI Tools', description: 'Explore system prompts from all major AI platforms' },
    { icon: Code2, label: 'Prompt Comparison', description: 'Side-by-side diff view for comparing prompts' },
    { icon: Palette, label: '3 Beautiful Themes', description: 'Neon, Dark, and Light modes' },
    { icon: Zap, label: 'Blazing Fast', description: 'Vite-powered with instant HMR' },
];

export default function AboutPage({ onBack, theme }) {
    const { motionEnabled } = useMotionPreferences();
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
        <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Motion.div
                initial={motionEnabled ? { opacity: 0, y: -12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionEnabled ? MOTION_DURATION.base : 0.15, ease: MOTION_EASE_OUT }}
            >
                <button
                    onClick={onBack}
                    className={`group flex items-center gap-2 text-sm font-medium mb-8 transition-all hover:gap-3 btn-tap ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Explorer
                </button>
            </Motion.div>

            {/* Page Header */}
            <Motion.div
                initial={motionEnabled ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionEnabled ? MOTION_DURATION.base : 0.15, ease: MOTION_EASE_OUT }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-neon-blue/30 text-neon-blue text-sm font-medium mb-6">
                    <Sparkles size={14} />
                    <span>About This Project</span>
                </div>
                <h1
                    className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Built with <span className="text-gradient">Passion</span>
                </h1>
                <p className={`text-lg max-w-2xl mx-auto ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                    PromptArchive is a modern, open-source platform to explore the hidden system prompts powering today's most advanced AI tools.
                </p>
            </Motion.div>

            <Motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
                {/* Creator Card */}
                <Motion.div
                    variants={itemVariants}
                    className={`rounded-2xl border overflow-hidden ${isLight ? 'bg-white border-gray-200 shadow-xl shadow-gray-200/50' : 'glass-panel border-dark-border shadow-lg'}`}
                >
                    <div className="p-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" />
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink p-[2px]">
                                    <div className={`w-full h-full rounded-2xl flex items-center justify-center ${isLight ? 'bg-white' : 'bg-dark-bg'}`}>
                                        <img
                                            src="https://github.com/piyushkdam96k.png"
                                            alt="Amit Kadam"
                                            className="w-full h-full rounded-2xl object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-2xl flex items-center justify-center bg-gradient-to-br from-neon-blue/20 to-neon-purple/20"><span class="text-3xl font-black text-neon-blue" style="font-family: var(--font-display)">AK</span></div>';
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center shadow-neon-glow">
                                    <Code2 size={14} className="text-white" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center sm:text-left flex-1">
                                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                    <h2
                                        className={`text-2xl font-black ${isLight ? 'text-gray-900' : 'text-white'}`}
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        Amit Kadam
                                    </h2>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isLight ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'}`}>
                                        Creator
                                    </span>
                                </div>
                                <p className={`text-sm mb-4 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Full-Stack Developer & AI Enthusiast
                                </p>
                                <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                                    <a
                                        href="https://github.com/piyushkdam96k"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap ${isLight ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-white/10 text-white border border-dark-border hover:border-gray-500 hover:bg-white/15'}`}
                                    >
                                        <Github size={16} />
                                        GitHub
                                        <ExternalLink size={12} className="opacity-50" />
                                    </a>
                                    <a
                                        href="https://amitkadam.netlify.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] btn-tap ${isLight ? 'border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300' : 'border border-dark-border text-gray-300 hover:text-white hover:border-neon-blue/40'}`}
                                    >
                                        <Globe size={16} />
                                        Portfolio
                                        <ExternalLink size={12} className="opacity-50" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Motion.div>

                {/* Key Features */}
                <Motion.div variants={itemVariants}>
                    <h3
                        className={`text-lg font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Key Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {FEATURES.map((feat, i) => {
                            const Icon = feat.icon;
                            return (
                                <Motion.div
                                    key={feat.label}
                                    initial={motionEnabled ? { opacity: 0, y: 8 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: motionEnabled ? 0.3 + i * 0.06 : 0, ease: MOTION_EASE_OUT }}
                                    className={`flex items-start gap-3 p-4 rounded-xl border hover-lift ${isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/[0.02] border-dark-border'}`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
                                        <Icon size={18} className="text-neon-blue" />
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-bold mb-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>{feat.label}</h4>
                                        <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{feat.description}</p>
                                    </div>
                                </Motion.div>
                            );
                        })}
                    </div>
                </Motion.div>

                {/* Tech Stack */}
                <Motion.div variants={itemVariants}>
                    <h3
                        className={`text-lg font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Tech Stack
                    </h3>
                    <div className={`rounded-2xl border p-6 ${isLight ? 'bg-white border-gray-200' : 'glass-panel border-dark-border'}`}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {TECH_STACK.map((tech, i) => (
                                <Motion.div
                                    key={tech.name}
                                    initial={motionEnabled ? { opacity: 0, scale: 0.9 } : false}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: motionEnabled ? 0.4 + i * 0.04 : 0, ease: MOTION_EASE_OUT }}
                                    className={`text-center p-3 rounded-xl border transition-all hover:scale-105 ${isLight ? 'bg-gray-50 border-gray-100 hover:shadow-md' : 'bg-white/[0.02] border-dark-border hover:border-gray-600'}`}
                                >
                                    <div
                                        className="w-3 h-3 rounded-full mx-auto mb-2"
                                        style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}44` }}
                                    />
                                    <div className={`text-xs font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{tech.name}</div>
                                    <div className={`text-[10px] mt-0.5 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{tech.description}</div>
                                </Motion.div>
                            ))}
                        </div>
                    </div>
                </Motion.div>

                {/* Open Source Note */}
                <Motion.div
                    variants={itemVariants}
                    className={`text-center p-8 rounded-2xl border ${isLight ? 'bg-gradient-to-br from-gray-50 to-white border-gray-200' : 'glass-panel border-dark-border'}`}
                >
                    <p className={`text-sm flex items-center justify-center gap-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                        Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Amit Kadam
                    </p>
                    <p className={`text-xs mt-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                        100% Open Source • Prompt data from the community
                    </p>
                </Motion.div>
            </Motion.div>
        </div>
    );
}
