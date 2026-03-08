import { useEffect } from 'react';

export function useKeyboardShortcuts(shortcuts = {}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      // Don't trigger shortcuts when typing in input/textarea
      if (event.target.matches('input, textarea')) {
        if (key === 'escape') {
          event.target.blur();
          shortcuts['escape']?.();
        }
        return;
      }

      // Check each registered shortcut
      for (const [combo, callback] of Object.entries(shortcuts)) {
        if (typeof callback !== 'function') continue;

        const parts = combo.toLowerCase().split('+');
        const mainKey = parts[parts.length - 1];
        const hasCtrl = parts.includes('ctrl');
        const hasShift = parts.includes('shift');
        const hasAlt = parts.includes('alt');

        if (
          key === mainKey &&
          ctrl === hasCtrl &&
          shift === hasShift &&
          alt === hasAlt
        ) {
          event.preventDefault();
          callback();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
