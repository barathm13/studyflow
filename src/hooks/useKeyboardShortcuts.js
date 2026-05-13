import { useEffect } from 'react';

export function useKeyboardShortcuts({ onToggle, onReset }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (event.code === 'Space') {
        event.preventDefault();
        onToggle();
      }
      if (event.key.toLowerCase() === 'r') onReset();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onReset, onToggle]);
}
