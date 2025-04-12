
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['Fira Code', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					},
				},
				'pulse-slow': {
					'0%, 100%': {
						opacity: '0.4',
					},
					'50%': {
						opacity: '0.8',
					},
				},
				'slide-slow': {
					'0%': {
						backgroundPosition: '0% 0%',
					},
					'100%': {
						backgroundPosition: '100% 100%',
					},
				},
				'text-shimmer': {
					'0%': {
						backgroundPosition: '-200% 0',
					},
					'100%': {
						backgroundPosition: '200% 0',
					},
				},
				'scroll-x': {
					'0%': {
						transform: 'translateX(0)',
					},
					'100%': {
						transform: 'translateX(-100%)',
					},
				},
				'split-text': {
					'0%': {
						'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
					},
					'100%': {
						'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					},
				},
				'glitch': {
					'0%, 100%': {
						'clip-path': 'inset(80% 0 0 0)',
						transform: 'translate(-2px, 2px)',
					},
					'20%': {
						'clip-path': 'inset(20% 0 40% 0)',
						transform: 'translate(2px, -2px)',
					},
					'40%': {
						'clip-path': 'inset(40% 0 60% 0)',
						transform: 'translate(2px, 2px)',
					},
					'60%': {
						'clip-path': 'inset(60% 0 20% 0)',
						transform: 'translate(-2px, -2px)',
					},
					'80%': {
						'clip-path': 'inset(0 0 80% 0)',
						transform: 'translate(-2px, 2px)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'float': 'float 5s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
				'slide-slow': 'slide-slow 20s linear infinite',
				'text-shimmer': 'text-shimmer 3s ease-in-out infinite',
				'scroll-x': 'scroll-x 30s linear infinite',
				'split-text': 'split-text 1s ease-out forwards',
				'glitch': 'glitch 800ms linear infinite alternate',
			},
			backgroundImage: {
				'grid-pattern': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
				'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
			},
			backgroundSize: {
				'grid': '30px 30px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
