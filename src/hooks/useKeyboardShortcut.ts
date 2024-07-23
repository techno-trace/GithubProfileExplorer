import { useEffect, useRef } from 'react';

interface UseKeyboardShortcutProps {
  keyCombination: string[];
  action: () => void;
}

export const useKeyboardShortcut = ({ keyCombination, action }: UseKeyboardShortcutProps) => {
  const keysCurrentlyPressed = useRef<Set<string>>(new Set());

  const normalizeKey = (key: string) => {
    switch (key.toLowerCase()) {
      case 'ctrl':
      case 'control':
      case 'controlleft':
      case 'controlright':
        return 'control';
      case 'shift':
      case 'shiftleft':
      case 'shiftright':
        return 'shift';
      case 'alt':
      case 'altleft':
      case 'altright':
        return 'alt';
      case 'meta':
      case 'metaleft':
      case 'metaright':
      case 'command':
      case 'cmd':
        return 'meta';
      default:
        return key.toLowerCase();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const normalizedKey = normalizeKey(event.key);
      keysCurrentlyPressed.current.add(normalizedKey);

      const allKeysMatched = keyCombination.every((key) =>
        keysCurrentlyPressed.current.has(normalizeKey(key)),
      );

      if (allKeysMatched) {
        event.preventDefault();
        action();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const normalizedKey = normalizeKey(event.key);
      keysCurrentlyPressed.current.delete(normalizedKey);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyCombination, action]);
};
