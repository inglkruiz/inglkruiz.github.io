import classNames from 'classnames';
import { useEffect, useState, type FC } from 'react';
import type { Theme } from '../../types';
import { CHOSEN_THEME, setDocumentTheme } from '../../utils/theme';

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle: FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = useState<Theme>(CHOSEN_THEME);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  if (!isMounted) {
    return null;
  }

  const handleClick = () => {
    setTheme(theme === 'tw-light' ? 'tw-dark' : 'tw-light');
  };

  return (
    <button
      className={classNames(
        'tw-bg-gradient-to-bl hover:tw-bg-gradient-to-tr tw-from-green-500 tw-to-green-800  hover:tw-from-green-500 hover:tw-to-green-800 dark:tw-from-neutral-500 dark:tw-to-neutral-800  dark:hover:tw-from-neutral-500 dark:hover:tw-to-neutral-800  tw-px-3 tw-py-2 tw-rounded-full',
        className
      )}
      onClick={handleClick}
    >
      {theme === 'tw-light' ? '🌙' : '🌞'}
    </button>
  );
};
