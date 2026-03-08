import { useState } from 'react';

// Inline SVG paths for brands not in SimpleIcons CDN
const INLINE_ICONS = {
    mistral: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="6" height="6" /><rect x="9" y="0" width="6" height="6" />
            <rect x="18" y="0" width="6" height="6" /><rect x="0" y="9" width="6" height="6" />
            <rect x="9" y="9" width="6" height="6" /><rect x="18" y="9" width="6" height="6" />
            <rect x="0" y="18" width="6" height="6" /><rect x="18" y="18" width="6" height="6" />
        </svg>
    ),
    grok: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.53 3.6 5.27 20.4h2.57l8.26-16.8h-2.57zM10.47 3.6 18.73 20.4h-2.57L7.9 3.6h2.57z" />
        </svg>
    ),
    deepseek: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.748 9.779c-.084-.078-.17-.138-.257-.192l-.017-.01c-1.01-.576-2.2-.357-2.946.5a3.5 3.5 0 0 0-.214.302l-.017.03c-.4.672-.482 1.46-.228 2.195.072.213.17.42.293.617a5.41 5.41 0 0 0-.55-.029c-.5 0-.99.08-1.46.24-.47.16-.91.39-1.31.69l-.11.08c-.36.27-.68.57-.96.91-.28.34-.51.71-.69 1.1-.18.39-.3.8-.36 1.22-.06.42-.05.85.03 1.27.04.21.1.42.18.62.08.2.18.39.29.57.11.18.24.35.38.51.14.16.3.31.46.44.17.14.35.26.54.37.19.11.39.2.6.27.21.07.42.12.64.15.22.03.44.04.66.02.22-.02.44-.07.65-.14.21-.07.41-.17.6-.29.19-.12.37-.26.53-.42.16-.16.3-.34.42-.53.12-.19.22-.39.3-.6l.08-.23c.06.11.12.22.19.32.07.1.14.2.22.29.08.09.17.18.26.27.09.09.19.17.29.24.2.15.43.28.66.38.23.1.48.17.73.21.25.04.5.05.75.02.25-.03.49-.09.72-.18l.23-.1c.19-.1.37-.21.54-.35.17-.14.32-.29.46-.46.14-.17.25-.35.35-.55.1-.2.17-.41.22-.62.05-.22.07-.44.06-.66l-.01-.23a4.77 4.77 0 0 0-.14-.84 4.54 4.54 0 0 0-.31-.77c-.13-.25-.29-.49-.47-.71-.18-.22-.38-.42-.6-.6l-.16-.12a6.8 6.8 0 0 0-.73-.43 7 7 0 0 0-.8-.3 7.24 7.24 0 0 0-.84-.17 7.5 7.5 0 0 0-.87-.05h-.23c.22-.38.4-.78.53-1.2.13-.42.2-.85.2-1.29 0-.44-.06-.87-.17-1.29-.03-.1-.06-.2-.1-.3.06.01.12.02.18.03.06.01.12.01.18.01.12 0 .24-.01.36-.03.12-.02.23-.05.34-.09.11-.04.22-.09.32-.16.1-.06.19-.14.28-.22.09-.08.17-.18.24-.28.07-.1.13-.2.18-.32.05-.11.08-.23.1-.35.02-.12.03-.24.02-.36-.01-.12-.03-.24-.07-.36-.04-.12-.09-.23-.16-.34-.07-.11-.15-.21-.24-.3-.09-.09-.2-.17-.31-.24Z" />
        </svg>
    ),
    lovable: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
        </svg>
    ),
    windsurf: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7.5C7 5 12 4 18 5.5c-4 3-8 4.5-15 4.5V7.5zM3 12.5C8 10 14 9.5 21 12c-5 3.5-10 4.5-18 3.5v-3zM3 17.5C9 15 15 15.5 22 19c-5.5 3-11 3-19 1v-2.5z" />
        </svg>
    ),
    devin: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2c.94 0 1.83.16 2.67.44L7.44 14.67A8 8 0 0 1 4 9.8L12 4zm0 16a8 8 0 0 1-6.28-3.06L13.06 6.45A8 8 0 0 1 20 12a8 8 0 0 1-8 8z" />
        </svg>
    ),
    openrouter: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12h18M12 3l9 9-9 9M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9z" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    ),
    kaiber: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h6v6H4zM14 4l6 6-6 6V4zm-10 10h6v6H4z" />
        </svg>
    ),
    ideogram: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    ),
    pika: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2 4.09 12.26 8.5 14l-1 8 11.91-12.26L15 8z" />
        </svg>
    ),
    manus: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
        </svg>
    ),
    augment: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
    ),
    amp: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2v11h3v9l7-12h-4l4-8z" />
        </svg>
    ),
    together: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="4" /><circle cx="16" cy="16" r="4" />
            <path d="M11.5 8.5 12 12l.5 3.5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    ),
    leonardo: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    ),
};

export default function ToolIcon({ tool, size = 56 }) {
    const [imgError, setImgError] = useState(false);

    const iconUrl = tool.iconSlug
        ? `https://cdn.simpleicons.org/${tool.iconSlug}`
        : null;

    const inlineSvg = tool.inlineIcon ? INLINE_ICONS[tool.inlineIcon] : null;
    const showInitials = !iconUrl && !inlineSvg || (iconUrl && imgError && !inlineSvg);
    const initials = tool.initials || tool.name.slice(0, 2).toUpperCase();

    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: (showInitials || inlineSvg)
                    ? `linear-gradient(135deg, ${tool.color}33, ${tool.color}66)`
                    : `${tool.color}18`,
                border: `2px solid ${tool.color}50`,
                boxShadow: `0 0 16px ${tool.color}30, 0 0 40px ${tool.color}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
            }}
            className="tool-icon-ring group-hover/card:scale-110 transition-transform duration-300"
        >
            {inlineSvg && !imgError ? (
                <span
                    style={{
                        width: size * 0.52,
                        height: size * 0.52,
                        color: tool.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {inlineSvg}
                </span>
            ) : showInitials ? (
                <span
                    style={{
                        fontSize: size * 0.32,
                        fontWeight: '800',
                        color: tool.color,
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '-0.5px',
                    }}
                >
                    {initials}
                </span>
            ) : (
                <img
                    src={iconUrl}
                    alt={tool.name}
                    onError={() => setImgError(true)}
                    style={{
                        width: size * 0.52,
                        height: size * 0.52,
                        objectFit: 'contain',
                        filter: tool.iconDark ? 'invert(1) brightness(0.9)' : `brightness(1.1) drop-shadow(0 0 4px ${tool.color}40)`,
                    }}
                />
            )}
        </div>
    );
}

