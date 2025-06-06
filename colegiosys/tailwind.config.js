module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ff1ce',
        accent: '#1e1e2f',
        background: '#15151e',
        card: '#22223b',
      },
      fontFamily: {
        futuristic: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px #0ff1ce, 0 0 40px #0ff1ce80',
      },
    },
  },
  plugins: [],
}