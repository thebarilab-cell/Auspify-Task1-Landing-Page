# Northstar — Responsive Landing Page

Northstar is a fictional independent digital product studio. This project is a polished, responsive landing page built with semantic HTML, custom CSS, and vanilla JavaScript. It is suitable as a portfolio demonstration and does not require a runtime framework.

## Features

- Responsive navigation with an accessible mobile menu and Escape key support
- Editorial hero with a CSS-rendered dimensional sculpture and pointer response on desktop
- Project cards with hover effects, subtle tilt, and scroll-triggered reveals
- Studio introduction, services, manifesto, contact CTA, and professional footer
- Smooth anchor navigation, staggered motion, and reduced-motion support
- Semantic landmarks, skip link, visible keyboard focus, and accessible control labels
- No runtime framework or image assets required

## Prerequisites

- Node.js 18 or later
- npm (included with Node.js)

## Installation

From the project directory, install the development dependency:

```powershell
npm.cmd install
```

On macOS or Linux, use `npm install` instead.

## Development server

Start Vite with:

```powershell
npm.cmd run start
```

Open the local URL printed in the terminal (usually `http://localhost:5173/`). Stop the server with **Ctrl+C**.

## Production build

Create an optimized production build with:

```powershell
npm.cmd run build
```

The generated site is written to `dist/`. To serve that build locally, run:

```powershell
npm.cmd run preview
```

## Project structure

- `index.html` — page content and metadata
- `src/style.css` — design system, responsive layout, and animation styles
- `src/main.js` — mobile navigation, reveal animations, and pointer interactions
- `package.json` and `package-lock.json` — scripts and pinned dependency resolution

Update the copy and links in `index.html`. Design tokens and visual treatments are in `src/style.css`; interactive behavior is in `src/main.js`. Google Fonts are used when available, with system-font fallbacks when offline. Northstar and the portfolio projects are fictional demonstration content.
