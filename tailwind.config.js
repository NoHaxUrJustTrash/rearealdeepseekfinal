/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--tw-prose-invert-body)',
            '--tw-prose-headings': 'var(--tw-prose-invert-headings)',
            '--tw-prose-links': 'var(--tw-prose-invert-links)',
            '--tw-prose-code': 'var(--tw-prose-invert-code)',
            '--tw-prose-bold': 'var(--tw-prose-invert-bold)',
            maxWidth: 'none',
            pre: {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: '0.875em',
              overflowX: 'auto',
              fontWeight: '400',
              border: 'none',
              padding: '0',
            },
            code: {
              color: 'inherit',
              fontWeight: '400',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};