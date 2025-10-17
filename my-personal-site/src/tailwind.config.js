// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'shooting-star': {
          '0%': { transform: 'translate(0, 0)', opacity: '1' },
          '100%': { transform: 'translate(300px, -300px)', opacity: '0' },
        },
      },
      animation: {
        'shooting-star': 'shooting-star 2s linear infinite',
      },
    },
  },
  plugins: [],
};
