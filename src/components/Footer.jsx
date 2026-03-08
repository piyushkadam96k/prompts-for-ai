import { Github, Heart, Star, ExternalLink, Sparkles } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { MOTION_DURATION, MOTION_EASE_OUT } from '../motion/constants';
import { useMotionPreferences } from '../motion/useMotionPreferences';

export default function Footer({ theme, githubStars, totalPrompts, totalTools }) {
    const { motionEnabled } = useMotionPreferences();
    const isLight = theme === 'light';
    const year = new Date().getFullYear();

    const links = [
        { label: 'GitHub Repository', href: 'https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools', icon: Github },
        { label: 'Report Issue', href: 'https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/issues', icon: ExternalLink },
    ];

    return (
        <Motion.footer
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: motionEnabled ? MOTION_DURATION.base : 0.15, ease: MOTION_EASE_OUT }}
            className={`relative mt-20 border-t ${isLight ? 'border-gray-200 bg-white/60' : 'border-dark-border bg-dark-surface/40'} backdrop-blur-xl`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink p-[1.5px]">
                                <div className={`w-full h-full rounded-xl flex items-center justify-center ${isLight ? 'bg-white' : 'bg-dark-bg'}`}>
                                    <Sparkles className="w-4 h-4 text-neon-blue" />
                                </div>
                            </div>
                            <div>
                                <span className={`font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
                                    Prompt<span className="text-gradient">Archive</span>
                                </span>
                            </div>
                        </div>
                        <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                            Explore the system prompts powering the most advanced AI systems. 100% open source.
                        </p>
                        <div className={`flex items-center gap-4 text-xs ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span>{totalTools}+ AI Tools</span>
                            <span>•</span>
                            <span>{totalPrompts}+ Prompts</span>
                            {githubStars && (
                                <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Star size={11} className="text-yellow-500" />
                                        {githubStars.toLocaleString()} stars
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Links Column */}
                    <div className="space-y-3">
                        <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                            Links
                        </h4>
                        {links.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 text-sm transition-all hover:translate-x-1 ${isLight ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <Icon size={14} />
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>

                    {/* Tech Stack Column */}
                    <div className="space-y-3">
                        <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                            Built With
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {['React 19', 'Vite 7', 'Tailwind CSS', 'Three.js', 'Framer Motion'].map((tech) => (
                                <span
                                    key={tech}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isLight ? 'bg-gray-100 text-gray-600 border border-gray-200' : 'bg-white/5 text-gray-400 border border-dark-border'}`}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${isLight ? 'border-gray-200' : 'border-dark-border'}`}>
                    <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                        © {year} PromptArchive. Open source project.
                    </p>
                    <p className={`text-xs flex items-center gap-1 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                        Made with <Heart size={12} className="text-red-500 fill-red-500" /> for the AI community
                    </p>
                </div>
            </div>
        </Motion.footer>
    );
}
