/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/sections/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta extraída del logo
        spirit: {
          DEFAULT: "#00AEEF", // Azul Espíritu Santo
          deep: "#005B9A", // Azul Profundo
        },
        hope: {
          DEFAULT: "#7ED957", // Verde Esperanza
          life: "#4CAF50", // Verde Vida
        },
        flame: {
          DEFAULT: "#FF7A00", // Naranja Evangelización
          light: "#FFD54F", // Amarillo Luz
          fire: "#FF3D00", // Rojo Fuego Espíritu Santo
        },
        // Tonos neutros para modo claro/oscuro
        surface: {
          light: "#FFFFFF",
          dark: "#0A1628",
          "dark-soft": "#10233D",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Montserrat", "Poppins", "ui-sans-serif", "sans-serif"],
      },
      backgroundImage: {
        "gradient-spirit": "linear-gradient(135deg, #00AEEF 0%, #005B9A 100%)",
        "gradient-hope": "linear-gradient(135deg, #7ED957 0%, #4CAF50 100%)",
        "gradient-flame":
          "linear-gradient(135deg, #FFD54F 0%, #FF7A00 50%, #FF3D00 100%)",
        "gradient-vision":
          "linear-gradient(135deg, #005B9A 0%, #00AEEF 45%, #FF7A00 100%)",
        "gradient-hero":
          "radial-gradient(circle at 20% 20%, rgba(0,174,239,0.25), transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,122,0,0.20), transparent 45%), radial-gradient(circle at 50% 90%, rgba(126,217,87,0.18), transparent 45%)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(0,174,239,0.45)",
        "glow-flame": "0 0 35px rgba(255,122,0,0.45)",
        "glow-hope": "0 0 30px rgba(126,217,87,0.40)",
        glass: "0 8px 32px rgba(0,0,0,0.18)",
        "neu-light":
          "8px 8px 20px rgba(0,0,0,0.06), -8px -8px 20px rgba(255,255,255,0.9)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-30px) translateX(12px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scroll-down": "scroll-down 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
