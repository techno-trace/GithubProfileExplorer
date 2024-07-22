import { useEffect, useRef } from 'react';

interface UseKeyboardShortcutProps {
  keyCombination: string[];
  action: () => void;
}

export const useKeyboardShortcut = ({ keyCombination, action }: UseKeyboardShortcutProps) => {
  const keysCurrentlyPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysCurrentlyPressed.current.add(event.key);

      const allKeysMatched = keyCombination.every((key) => keysCurrentlyPressed.current.has(key));

      if (allKeysMatched) {
        event.preventDefault();
        action();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysCurrentlyPressed.current.delete(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyCombination, action]);
};
