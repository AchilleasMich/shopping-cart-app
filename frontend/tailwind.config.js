module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          hover: '#4B5563',
          disabled: '#9CA3AF',
          text: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#6B7280',
          hover: '#374151',
          disabled: '#D1D5DB',
          text: '#FFFFFF',
        },
        tertiary: {
          DEFAULT: '#FFFFFF',
          hover: '#F3F4F6',
          text: '#000000',
          border: '#000000',
        },
      },
    },
  },
  plugins: [],
};
