# Architecture Overview

## Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 6 (strict mode)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

## Directory Structure

```
arturobarrios-web/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles + design tokens
│   └── routes/           # Page routes (privacy, terms, etc)
├── components/
│   ├── atoms/            # Base components (Button, Card, etc)
│   ├── molecules/        # Composite components
│   └── organisms/        # Complex components
├── sections/             # Page sections (Hero, Capabilities, etc)
├── hooks/                # Custom React hooks
├── lib/
│   ├── motion.ts         # Animation presets
│   ├── cn.ts             # Classname utilities
│   ├── types.ts          # TypeScript types
│   ├── constants.ts      # App constants
│   └── utils/            # Utility functions
├── public/               # Static assets
└── docs/                 # Documentation
```

## Design System

All design tokens are defined in:
- **Colors**: `tailwind.config.ts` color palette
- **Typography**: `tailwind.config.ts` fontSize scale
- **Spacing**: `tailwind.config.ts` spacing scale
- **Shadows**: `tailwind.config.ts` boxShadow
- **Base Styles**: `app/globals.css` layer base

## Component API

### Atoms (Base Components)
- `Button` - Interactive button with 4 variants
- `Card` - Container with elevation options
- `Badge` - Label component
- `Input` - Form input field
- `Link` - Next.js link wrapper
- `Kicker` - Eyebrow text
- `Icon` - SVG icon component

### Hooks
- `useInViewAnimation` - Framer Motion in-view trigger
- `useReducedMotion` - Accessibility hook
- `useCountUp` - Number animation hook

## Animation Philosophy

All animations use Framer Motion with predefined springs and easings from `lib/motion.ts`:
- **Springs**: smooth, snappy, gentle, bouncy
- **Easings**: easeOutQuint, easeOutExpo, etc
- **Durations**: instant (150ms) to slowest (1000ms)

Respects `prefers-reduced-motion` media query for accessibility.

## Type Safety

- Full TypeScript strict mode enabled
- No `any` types
- All components have proper prop types
- Path aliases configured in `tsconfig.json`
