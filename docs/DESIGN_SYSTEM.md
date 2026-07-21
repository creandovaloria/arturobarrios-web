# Design System

## Brand Colors

### Primary (Brand)
- `50`: `#f0f6ff`
- `100`: `#e0ecfe`
- `200`: `#c7dffe`
- `300`: `#a4cbfd`
- `400`: `#79b0fb`
- `500`: `#2e5bff` - Main Brand Color
- `600`: `#1e47ff`
- `700`: `#1836dc`
- `800`: `#162ac3`
- `900`: `#001a4d`

### Neutral
- `50`: `#f9f9f9`
- `100`: `#f5f5f5` - Surface
- `200`: `#e8e8e8`
- `300`: `#d1d1d1`
- `400`: `#b8b8b8`
- `500`: `#999999`
- `600`: `#7a7a7a` - Muted Text
- `700`: `#5c5c5c`
- `800`: `#3e3e3e`
- `900`: `#222222` - Foreground

### Status Colors
- `success`: `#10b981`
- `warning`: `#f59e0b`
- `error`: `#ef4444`
- `info`: `#3b82f6`

## Typography

### Scale
- `h1`: 48px / 700 weight
- `h2`: 40px / 700 weight
- `h3`: 32px / 700 weight
- `h4`: 24px / 600 weight
- `h5`: 20px / 600 weight
- `h6`: 16px / 600 weight
- `body`: 16px / 400 weight
- `body-sm`: 14px / 400 weight
- `body-xs`: 12px / 400 weight
- `kicker`: 12px / 600 weight, uppercase

### Families
- **Display**: System font stack (or custom fonts in the future)
- **Body**: System font stack

## Spacing Scale

- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px
- `4xl`: 96px

## Border Radius

- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `2xl`: 24px
- `full`: 9999px (circular)

## Shadows

- `xs`: Subtle shadow for small elevations
- `sm`: Light shadow for cards
- `md`: Medium elevation
- `lg`: Prominent elevation
- `xl`: High elevation
- `2xl`: Maximum elevation
- `elevation`: Custom elevation shadow

## Component Variants

### Button
- **Variants**: primary, secondary, ghost, outline
- **Sizes**: sm (small), md (medium), lg (large)
- **States**: default, hover, active, disabled, focus

### Badge
- **Variants**: solid, outline, soft
- **Colors**: brand, neutral, success, warning, error, info
- **Sizes**: sm, md, lg

### Card
- **Variants**: elevated, outlined, filled
- **Padding**: sm, md, lg
- **Interactive**: hover elevation

## Animation Presets

All defined in `lib/motion.ts`:

### Springs
- `smooth`: General animations
- `snappy`: Quick interactions
- `gentle`: Subtle transitions
- `bouncy`: Playful effects
- `tight`: Stiff movements

### Easings
- `easeOutQuint`: Default easing
- `easeOutExpo`: Fast exit easing
- `easeInOutSmooth`: Smooth both ways
- `easeInQuad`: Smooth entry
- `easeStandard`: Standard easing
- `easeLinear`: No easing

### Durations
- `instant`: 150ms
- `fast`: 200ms
- `regular`: 300ms
- `slow`: 500ms
- `slower`: 700ms
- `slowest`: 1000ms

## Accessibility

- All interactive elements support keyboard navigation
- Focus visible rings with `focus-visible` pseudo-class
- ARIA labels where appropriate
- Respects `prefers-reduced-motion` media query
- Color contrast ratios meet WCAG AA standards
