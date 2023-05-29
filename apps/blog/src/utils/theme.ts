import type { Theme } from '../types';

export const CHOSEN_THEME = getDocumentTheme();

export function setDocumentTheme(theme: Theme) {
  if (theme === 'tw-light') {
    document.documentElement.classList.remove('tw-dark');
  } else {
    document.documentElement.classList.add('tw-dark');
  }
  localStorage.setItem('theme', theme);
}

function getDocumentTheme(): Theme {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as Theme;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'tw-dark';
  }

  return 'tw-light';
}
