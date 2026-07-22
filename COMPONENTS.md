# Component Catalog

Comprehensive documentation of all UI components organized by atomic design principles.

## Table of Contents

- [Atoms](#atoms)
- [Molecules](#molecules)
- [Organisms](#organisms)
- [Sections](#sections)
- [Hooks](#hooks)
- [Adding New Components](#adding-new-components)

## Atoms

Atoms are the basic building blocks - individual elements that can't be broken down further without losing functionality.

### Button

Basic interactive button component with multiple variants and sizes.

**Location**: `components/atoms/Button.tsx`

**Props**:
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}
```

**Usage**:
```tsx
import { Button } from '@components/atoms';

<Button variant="primary" size="lg">
  Click me
</Button>
```

**Variants**:
- `primary` - Main call-to-action button (blue)
- `secondary` - Secondary action button (gray)
- `ghost` - Text-only button (transparent)

**Sizes**:
- `sm` - Small padding (12px)
- `md` - Medium padding (16px) - default
- `lg` - Large padding (20px)

---

### Card

Container component for grouping related content.

**Location**: `components/atoms/Card.tsx`

**Props**:
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevated?: boolean;
  interactive?: boolean;
  className?: string;
}
```

**Usage**:
```tsx
import { Card } from '@components/atoms';

<Card elevated interactive>
  <h3>Card Title</h3>
  <p>Card content here</p>
</Card>
```

**Features**:
- `elevated` - Adds shadow for depth
- `interactive` - Hover effects and cursor changes
- Responsive padding

---

### Icon

SVG icon component with consistent sizing and styling.

**Location**: `components/atoms/Icon.tsx`

**Props**:
```typescript
interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string;
  className?: string;
}
```

**Usage**:
```tsx
import { Icon } from '@components/atoms';

<Icon name="arrow-right" size="lg" color="blue" />
```

**Available Icons**:
- arrow-right, arrow-left, arrow-up, arrow-down
- check, close, menu, search
- star, heart, share, user
- More in icon registry

---

### Link

Styled link component with navigation support.

**Location**: `components/atoms/Link.tsx`

**Props**:
```typescript
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: 'default' | 'underline' | 'bold';
  className?: string;
}
```

**Usage**:
```tsx
import { Link } from '@components/atoms';

<Link href="/about" variant="underline">
  Learn More
</Link>

<Link href="https://example.com" external>
  External Site
</Link>
```

---

### Text

Typography component for consistent text styling.

**Location**: `components/atoms/Text.tsx`

**Props**:
```typescript
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'small';
  variant?: 'body' | 'caption' | 'lead' | 'muted';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}
```

**Usage**:
```tsx
import { Text } from '@components/atoms';

<Text as="p" variant="lead" size="lg">
  This is important text
</Text>
```

---

## Molecules

Molecules are combinations of atoms forming more complex components.

### MorphingText

Animated text component with morphing effect between words.

**Location**: `components/molecules/MorphingText.tsx`

**Props**:
```typescript
interface MorphingTextProps {
  words: string[];
  interval?: number;
  className?: string;
  color?: string;
}
```

**Usage**:
```tsx
import { MorphingText } from '@components/molecules';

<MorphingText
  words={['crecer', 'escalar', 'transformar']}
  interval={2000}
  color="blue"
/>
```

**Features**:
- Automatic cycling through words
- Smooth morphing animation
- Customizable interval
- Color support

---

### CustomCursor

Custom cursor following mouse with animated trail.

**Location**: `components/molecules/CustomCursor.tsx`

**Props**:
```typescript
interface CustomCursorProps {
  enabled?: boolean;
  trailColor?: string;
  size?: number;
}
```

**Usage**:
```tsx
import { CustomCursor } from '@components/molecules';

// Add to layout
<CustomCursor enabled={true} size={20} />
```

**Features**:
- Follows mouse movement
- Trail effect
- Performance optimized
- Customizable appearance

---

### StatCounter

Animated number counter component.

**Location**: `components/molecules/StatCounter.tsx`

**Props**:
```typescript
interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}
```

**Usage**:
```tsx
import { StatCounter } from '@components/molecules';

<StatCounter
  value={70}
  label="mejora en eficiencia"
  suffix="%"
  duration={2000}
/>
```

**Features**:
- Animates from 0 to target value
- Supports prefix/suffix
- Customizable duration
- Number formatting

---

### BeforeAfterSlider

Interactive before/after comparison slider.

**Location**: `components/molecules/BeforeAfterSlider.tsx`

**Props**:
```typescript
interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}
```

**Usage**:
```tsx
import { BeforeAfterSlider } from '@components/molecules';

<BeforeAfterSlider
  beforeImage="/images/before.jpg"
  afterImage="/images/after.jpg"
  beforeLabel="Antes"
  afterLabel="Después"
/>
```

**Features**:
- Draggable slider
- Keyboard support
- Touch friendly
- Responsive

---

### PillarCard

Card component for displaying pillar/value prop.

**Location**: `components/molecules/PillarCard.tsx`

**Props**:
```typescript
interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}
```

**Usage**:
```tsx
import { PillarCard } from '@components/molecules';

<PillarCard
  icon={<Icon name="settings" />}
  title="Procesos"
  description="Optimización y automatización"
/>
```

---

### BackgroundVideo

Video background component with fallback image.

**Location**: `components/molecules/BackgroundVideo.tsx`

**Props**:
```typescript
interface BackgroundVideoProps {
  src: string;
  poster?: string;
  height?: string;
  children?: React.ReactNode;
  overlay?: boolean;
}
```

**Usage**:
```tsx
import { BackgroundVideo } from '@components/molecules';

<BackgroundVideo
  src="/videos/hero.mp4"
  poster="/images/hero.jpg"
  overlay
>
  <h1>Hero Section</h1>
</BackgroundVideo>
```

---

## Organisms

Complex components composed of multiple molecules and atoms.

### GearAnimation

Complex gear animation system.

**Location**: `components/organisms/GearAnimation.tsx`

**Props**:
```typescript
interface GearAnimationProps {
  speed?: number;
  size?: 'small' | 'medium' | 'large';
}
```

**Usage**:
```tsx
import { GearAnimation } from '@components/organisms';

<GearAnimation speed={0.5} size="large" />
```

---

## Sections

Full-page or major content sections using organisms and molecules.

### HeroSection

Premium hero section with video background and animations.

**Location**: `sections/HeroSection.tsx`

**Props**:
```typescript
interface HeroSectionProps {
  backgroundVideo: string;
  posterImage: string;
  headline: string;
  subheadline: string;
  morphingWords: string[];
  ctaLabel1: string;
  ctaLabel2: string;
  onCTA1: () => void;
  onCTA2: () => void;
}
```

**Usage**:
```tsx
import HeroSection from '@sections/HeroSection';

<HeroSection
  backgroundVideo="/videos/hero.mp4"
  posterImage="/images/hero.jpg"
  headline="Your Headline"
  subheadline="Your subheadline"
  morphingWords={['word1', 'word2', 'word3']}
  ctaLabel1="Primary CTA"
  ctaLabel2="Secondary CTA"
  onCTA1={handlePrimaryCTA}
  onCTA2={handleSecondaryCTA}
/>
```

---

### ProblemSection

Section highlighting problem statement and statistics.

**Location**: `sections/ProblemSection.tsx`

**Props**:
```typescript
interface ProblemSectionProps {
  headline: string;
  subheadline: string;
  statValue: number;
  statLabel: string;
  ctaLabel: string;
  onCTA: () => void;
}
```

---

### TransformationSection

Before/after transformation showcase section.

**Location**: `sections/TransformationSection.tsx`

**Props**:
```typescript
interface TransformationSectionProps {
  beforeVideo: string;
  afterVideo: string;
  beforePoster: string;
  afterPoster: string;
  beforeLabel: string;
  afterLabel: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  onCTA: () => void;
}
```

---

### PillarsSection

Three-pillar value proposition section.

**Location**: `sections/PillarsSection.tsx`

**Props**:
```typescript
interface PillarsSectionProps {
  headline: string;
  subheadline: string;
}
```

---

## Hooks

Custom React hooks for common functionality.

### useCountUp

Animate numbers counting up.

**Location**: `hooks/useCountUp.ts`

**Usage**:
```typescript
import { useCountUp } from '@hooks';

const { count } = useCountUp(100, 2000); // Count to 100 in 2 seconds
```

---

### useScrollReveal

Trigger animations on scroll into view.

**Location**: `hooks/useScrollReveal.ts`

**Usage**:
```typescript
import { useScrollReveal } from '@hooks';

const ref = useScrollReveal();

return <div ref={ref} className="animate-on-scroll">Content</div>;
```

---

### useMediaQuery

Responsive design hook.

**Location**: `hooks/useMediaQuery.ts`

**Usage**:
```typescript
import { useMediaQuery } from '@hooks';

const isMobile = useMediaQuery('(max-width: 768px)');

return isMobile ? <MobileLayout /> : <DesktopLayout />;
```

---

## Adding New Components

### Step 1: Create Component File

```typescript
// components/atoms/NewComponent.tsx
'use client';

import React from 'react';

export interface NewComponentProps {
  // Define props
}

/**
 * NewComponent description
 */
export const NewComponent: React.FC<NewComponentProps> = (props) => {
  return <div>Component content</div>;
};

NewComponent.displayName = 'NewComponent';
```

### Step 2: Create Index Export

```typescript
// components/atoms/index.ts
export { NewComponent } from './NewComponent';
export type { NewComponentProps } from './NewComponent';
```

### Step 3: Document in This File

Add section with component documentation.

### Step 4: Add to Component Catalog

Update this file with usage examples and props.

---

## Component Naming Convention

- **Files**: PascalCase matching component name (Button.tsx, Card.tsx)
- **Exports**: Export both component and Props interface
- **Display Name**: Always set for debugging

---

## Best Practices

1. **Props Documentation**: Always document props with JSDoc
2. **TypeScript**: All components must be fully typed
3. **Accessibility**: Include ARIA attributes when needed
4. **Performance**: Use React.memo for components that don't need frequent updates
5. **Flexibility**: Design components to be composable and reusable
6. **Testing**: Write tests for complex components

---

## Resources

- [React Components Documentation](https://react.dev/learn/your-first-component)
- [Component Design Guidelines](./docs/DESIGN_GUIDELINES.md)
- [TypeScript Best Practices](./docs/TYPESCRIPT_GUIDE.md)

---

Last Updated: July 2024
Maintained by: Arturo Barrios
