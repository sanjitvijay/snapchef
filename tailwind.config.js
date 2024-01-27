/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dark", {
        mytheme: {
          "primary": "#093b37",
          "secondary": "#cb4212",   
          "accent": "#247BA0",   
          "neutral": "#000000",   
          "base-100": "#edf2eb",   
          "info": "#00aeff",                  
          "success": "#44f600",    
          "warning": "#efc100",   
          "error": "#ff6c6c",
        }
    }],
  },
}

