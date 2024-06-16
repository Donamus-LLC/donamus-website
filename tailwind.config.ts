import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Cabin', 'Montserrat', ...fontFamily.sans]
      },
      colors: {
        donamus: {
          primary: {
            '50': '#FEF1ED',
            '100': '#FCD6C9',
            '200': '#F4AC93',
            '300': '#E48F71',
            '400': '#CD7659',
            '500': '#BC6446',
            '600': '#A14B2D',
            '700': '#792F15',
            '800': '#5E2410',
            '900': '#321207'
          },
          secondary: {
            '50': '#CFE4F6',
            '100': '#92B9DC',
            '200': '#6893BA',
            '300': '#3D6E9B',
            '400': '#1C4C78',
            '500': '#092C4C',
            '600': '#091F33',
            '700': '#071521',
            '800': '#010D17',
            '900': '#03090F'
          },
          muted: {
            '50': '#FAFAFA',
            '100': '#F0F0F0',
            '200': '#DCDDDD',
            '300': '#C2C3C3',
            '400': '#8C8D8D',
            '500': '#6D6F6F',
            '600': '#505353',
            '700': '#313131',
            '800': '#212222',
            '900': '#141313'
          },
          'jet-stream': {
            '50': '#f2f7f6',
            '100': '#dfece8',
            '200': '#bed7d1',
            '300': '#98bdb6',
            '400': '#6b9c95',
            '500': '#4a7f79',
            '600': '#376460',
            '700': '#2c504e',
            '800': '#25403f',
            '900': '#1f3534',
            '950': '#101e1d',
          },
          accent: {
            'yellow': '#F2CD79',
            'green': '#BED7D1'
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;
