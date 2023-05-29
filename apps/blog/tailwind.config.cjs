const {
  createGlobPatternsForDependencies,
} = require('@nxtensions/astro/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  darkMode: 'class',
  content: [
    join(
      __dirname,
      'src/**/!(*.stories|*.spec).{astro,html,js,jsx,md,svelte,ts,tsx,vue}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      screens: {
        xl: defaultTheme.screens.lg,
        '2xl': defaultTheme.screens.lg,
      },
      fontFamily: {
        sans: ['Quattrocento Sans', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.neutral.400'),
            '--tw-prose-headings': theme('colors.neutral.100'),
            '--tw-prose-bold': theme('colors.neutral.400'),
            '--tw-prose-code': theme('colors.yellow.200'),
            '--tw-prose-bullets': theme('colors.neutral.400'),
            '--tw-prose-counters': theme('colors.neutral.400'),
            '--tw-prose-links': theme('colors.neutral.400'),
            '--tw-prose-quotes': theme('colors.neutral.100'),
            '--tw-prose-quote-borders': theme('colors.green.500'),
            a: {
              color: theme('colors.green.600'),
              textDecoration: 'none',
              fontWeight: theme('fontWeight.semibold'),
              '&:hover': {
                textDecoration: 'underline',
                textUnderlineOffset: '0.25rem',
              },
            },
            hr: {
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.4'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
