# Architecture Overview

High-level architecture and design decisions for arturobarrios-web.

## Project Philosophy

**API-First Design**: Business logic lives in a single layer. No duplication between clients.

**Atomic Design Pattern**: Components organized hierarchically from atoms → molecules → organisms → sections.

**Type Safety First**: TypeScript strict mode enforces type safety across the entire codebase.

**Performance Focused**: Optimized bundle size, code splitting, and image handling.

---

## Directory Structure

```
arturobarrios-web/
│
├── app/                        # Next.js app directory (React Server)
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Home page
│   ├── globals.css            # Global styles
│   ├── providers/             # Context providers (if needed)
│   └── routes/                # Nested routes
│
├── components/                 # Reusable UI components (Atomic design)
│   ├── atoms/                 # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Icon.tsx
│   │   ├── Link.tsx
│   │   ├── Text.tsx
│   │   └── index.ts           # Re-exports
│   │
│   ├── molecules/             # Atoms combined
│   │   ├── MorphingText.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── StatCounter.tsx
│   │   ├── BeforeAfterSlider.tsx
│   │   ├── PillarCard.tsx
│   │   ├── BackgroundVideo.tsx
│   │   └── index.ts
│   │
│   └── organisms/             # Complex components
│       ├── GearAnimation.tsx
│       └── index.ts
│
├── sections/                   # Page sections
│   ├── HeroSection.tsx        # Premium hero section
│   ├── ProblemSection.tsx     # Problem statement section
│   ├── TransformationSection.tsx  # Before/after showcase
│   ├── PillarsSection.tsx     # Three-pillar value proposition
│   └── index.ts
│
├── hooks/                      # Custom React hooks
│   ├── useCountUp.ts          # Animate count to value
│   ├── useScrollReveal.ts     # Scroll-triggered animations
│   ├── useMediaQuery.ts       # Responsive design
│   └── ... (others)
│
├── lib/                        # Utilities and constants
│   ├── constants.ts           # App-wide constants
│   ├── utils/                 # Utility functions
│   ├── types/                 # TypeScript definitions
│   │   ├── index.ts
│   │   ├── components.ts
│   │   └── ... (others)
│   └── motion.ts              # Framer Motion configuration
│
├── public/                     # Static assets
│   ├── images/
│   ├── videos/
│   └── fonts/
│
├── docs/                       # Documentation
│   ├── sprint-0/
│   ├── sprint-6/
│   ├── sprint-8/
│   ├── sprint-9/
│   └── ... (sprint reports)
│
├── Configuration files:
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vercel.json                # Vercel deployment config
├── package.json               # Dependencies
│
└── Documentation:
    ├── README.md              # Project overview
    ├── CONTRIBUTING.md        # Developer guidelines
    ├── COMPONENTS.md          # Component catalog
    ├── DEPLOYMENT.md          # Vercel setup guide
    ├── PRODUCTION_LAUNCH.md   # Launch checklist
    ├── VERCEL_SETUP.md        # Quick start guide
    ├── ARCHITECTURE.md        # This file
    └── LICENSE                # MIT License
```

---

## Component Architecture

### Atomic Design Levels

**Atoms** (Basic Elements)
- Smallest reusable components
- Examples: Button, Card, Icon, Link, Text
- Purely presentational
- No business logic
- Heavily reused

**Molecules** (Compound Components)
- Combinations of atoms
- Examples: MorphingText, StatCounter, BeforeAfterSlider
- Some interactivity
- Minimal business logic
- Frequently reused

**Organisms** (Complex Sections)
- Complex combinations of molecules
- Examples: GearAnimation
- Significant interactivity
- Business logic integration
- Occasionally reused

**Sections** (Page Sections)
- Full page/content sections
- Examples: HeroSection, ProblemSection
- Highest level of composition
- Often one per page
- Complete feature implementation

### Component Props Pattern

All components follow strict TypeScript interfaces:

```typescript
// atoms/Button.tsx
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  // Implementation
};
```

**Benefits**:
- Type-safe prop passing
- IDE autocomplete support
- Documentation via types
- Prop validation at compile time

---

## Styling Strategy

### Tailwind CSS + Custom CSS

**Configuration**: `tailwind.config.ts`
- Custom color palette (if defined)
- Extended typography
- Custom spacing/sizing
- Plugin configuration

**Global Styles**: `app/globals.css`
- CSS Reset
- CSS variables
- Base typography
- Root layout styles

**Component Styles**: Class-based in components
- Utility-first approach
- No CSS modules (Tailwind handles scoping)
- Responsive design (mobile-first)
- Dark mode support (if configured)

### Color System

```
// Defined in Tailwind config
- Primary colors (blue)
- Secondary colors (gray)
- Accent colors (brand colors)
- Semantic colors (success, error, warning)
```

### Responsive Breakpoints

```
sm: 640px   - Mobile
md: 768px   - Tablet
lg: 1024px  - Desktop
xl: 1280px  - Large desktop
2xl: 1536px - Ultra-wide
```

**Mobile-First Approach**:
```typescript
// Default is mobile, then enhance upward
<div className="p-4 md:p-6 lg:p-8">
  {/* 4px padding mobile, 6px tablet, 8px desktop */}
</div>
```

---

## Animation Strategy

### Framer Motion

**Configuration**: `lib/motion.ts`
- Global animation definitions
- Reusable animation variants
- Performance optimization
- Easing functions

**Component Integration**:
```typescript
// components/molecules/MorphingText.tsx
import { motion } from 'framer-motion';

export const MorphingText = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
};
```

**Performance**:
- GPU-accelerated transforms only
- Avoid animating layout-affecting properties
- Use `will-change` sparingly
- Test on lower-end devices

---

## State Management

### Simple State (React Hooks)

For simple component state:
```typescript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});
```

### Form State (React Hook Form)

For forms:
```typescript
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();
```

### Validation (Zod)

Schema-based validation:
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});
```

### Context (if needed)

For cross-cutting concerns:
- Theme context (light/dark mode)
- User context (authentication)
- Settings context (global configuration)

---

## Data Flow

### Component Data Flow

```
Page/Section
    ↓
Organism Components
    ↓
Molecule Components
    ↓
Atom Components
    ↓
DOM
```

### Props Drilling

Avoid deep prop drilling:
- Use composition
- Extract components
- Consider context for shared state

### Example:

```typescript
// Good: Extracted component
<Card>
  <CardTitle>Title</CardTitle>
  <CardContent>Content</CardContent>
</Card>

// Avoid: Props drilling
<Card 
  title="Title" 
  content="Content" 
  onClose={handleClose}
  // ... 10 more props
/>
```

---

## Performance Optimization

### Bundle Size

**Analyzed via**: `npm run analyze`

**Techniques**:
- Code splitting by route (Next.js automatic)
- Dynamic imports for heavy components
- Tree shaking unused code
- Minification (Next.js automatic)

### Image Optimization

**Next.js Image Component**:
```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={85}
  loading="lazy"
/>
```

**Benefits**:
- Automatic format negotiation (WebP, AVIF)
- Responsive image sizing
- Lazy loading
- LQIP (Low Quality Image Placeholder)

### Video Optimization

**Video Background Pattern**:
```typescript
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/poster.jpg"
>
  <source src="/video.mp4" type="video/mp4" />
  <source src="/video.webm" type="video/webm" />
</video>
```

### Caching Strategy

**Configured in**: `vercel.json`

```
Static assets (JS, CSS): 1 year
Images/videos: 1 year
HTML pages: 0 (revalidate every request)
API routes: 0 (no cache)
```

---

## Type Safety

### TypeScript Configuration

**Strict Mode Enabled** in `tsconfig.json`:
- `strict: true`
- `noUncheckedIndexAccess: true`
- `noFalltypingCasesInSwitch: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

### Type Definitions

**Component Types** in `lib/types/`:
- Component prop interfaces
- Application domain types
- API response types
- Form validation schemas

### Example:

```typescript
// lib/types/components.ts
export interface ButtonProps {
  // Full type definition
}

// components/atoms/Button.tsx
import type { ButtonProps } from '@types/components';

export const Button: React.FC<ButtonProps> = (props) => {
  // Fully typed
};
```

---

## Development Workflow

### Local Development

```bash
npm run dev        # Start dev server
npm run lint       # Check code quality
npm run format     # Auto-format code
```

### Git Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Commit: `git commit -m "type: message"`
4. Push: `git push origin feature/name`
5. Create PR on GitHub
6. Merge when approved

### CI/CD Pipeline

**On Push to Main**:
1. Lint check
2. Type check
3. Build verification
4. Deploy to Vercel production

**On Pull Request**:
1. Lint check
2. Type check
3. Build verification
4. Preview deployment (with GitHub comment)
5. Bundle analysis

---

## Security Architecture

### Authentication

Not currently implemented. When needed:
- Use Vercel authentication
- Or NextAuth.js for custom auth
- Store tokens securely (HttpOnly cookies)

### Input Validation

**Zod Schema Validation**:
- Validate all form inputs
- Server-side validation
- Type-safe API contracts

### Security Headers

**Configured in**: `vercel.json`

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Environment Variables

**Never Commit Secrets**:
- Use `.env.local` for development (never commit)
- Set in Vercel Dashboard for production
- Use `NEXT_PUBLIC_` only for non-sensitive data

---

## Scalability Considerations

### Database Integration

When needed:
- Recommended: Prisma ORM
- Database: PostgreSQL, MongoDB, or Supabase
- API routes: `app/api/route.ts`
- Server actions: Direct database calls from components

### API Design

**REST API Pattern**:
```typescript
// app/api/endpoint/route.ts
export async function GET(request: Request) {
  // Handle GET
}

export async function POST(request: Request) {
  // Handle POST
}
```

### Caching Strategy

- HTTP caching via cache headers
- ISR (Incremental Static Regeneration)
- On-demand revalidation
- Database query optimization

---

## Monitoring & Analytics

### Google Analytics 4

**Configured**: `NEXT_PUBLIC_GA_ID` environment variable

**Events to Track**:
- Page views (automatic)
- CTA clicks
- Form submissions
- Video plays (custom)
- Scroll depth (custom)

### Vercel Analytics

Built-in performance metrics:
- Core Web Vitals
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

### Error Tracking

- Browser console errors logged
- Server-side error logging
- Sentry integration (optional)
- Error alerts via Slack (optional)

---

## Maintenance & Updates

### Dependency Management

**Regular Updates**:
- Monthly: Check for updates
- Quarterly: Major version updates
- Test before deploying
- Run `npm audit` for security

### Performance Monitoring

**Monthly**:
- Bundle size analysis
- Core Web Vitals review
- Analytics trends
- Error rate review

### Content Updates

- Components are data-driven
- Easy to update text/images
- Form values configurable
- API-ready for CMS integration

---

## Future Enhancements

### Planned Integrations

- [ ] CMS (Contentful, Sanity, etc.)
- [ ] Email service (SendGrid, Resend)
- [ ] Contact form backend
- [ ] Blog/content management
- [ ] User authentication
- [ ] Database integration

### Potential Additions

- [ ] Dark mode toggle
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics
- [ ] A/B testing
- [ ] PWA features
- [ ] Accessibility audit tools

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Zod Validation](https://zod.dev)

---

**Architecture Version**: 1.0  
**Last Updated**: July 2024  
**Maintained by**: Arturo Barrios
