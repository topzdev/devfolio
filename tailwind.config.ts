import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],

  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '16px',
          lg: '16px',
          '2xl': '0'
        },
        screens: {
          xs: '550px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1240px',
          '2xl': '1800px'
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: {
          DEFAULT: "hsl(var(--background) /  <alpha-value>)",
          secondary: "hsl(var(--background-secondary) / <alpha-value>)",
          preview: "hsl(var(--background-preview) / <alpha-value>)",
          invert: "hsl(var(--background-invert) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground) /  <alpha-value>)",
          secondary: "hsl(var(--foreground-secondary) / <alpha-value>)",
          disabled: "hsl(var(--foreground-disabled) / <alpha-value>)",
          invert: "hsl(var(--foreground-invert) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: {
          DEFAULT: "hsl(var(--border))"
        },
        input: {
          default:  "hsl(var(--input), <alpha-value>)",
          placeholder:  "hsl(var(--input-placeholder), <alpha-value>)",
          label:  "hsl(var(--input-label), <alpha-value>)",
        },
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
