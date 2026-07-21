# Animation Specification

## Motion Philosophy

All animations should be **delightful, not distracting**. They should:
- Enhance UX by providing feedback
- Respect user preferences (prefers-reduced-motion)
- Feel natural and cohesive
- Use consistent easing and timing

## Animation Presets

### 1. Entrance Animations
Used when content first appears on screen.

#### Fade In
```ts
{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: easeOutQuint }
  }
}
```

#### Slide Up
```ts
{
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeOutQuint }
  }
}
```

#### Scale In
```ts
{
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: easeOutQuint }
  }
}
```

### 2. Interaction Animations

#### Hover Scale
Used on interactive elements to provide feedback.
```ts
{ hover: { scale: 1.05, transition: springs.snappy } }
```

#### Tap/Press
Quick scale down on click.
```ts
{ tap: { scale: 0.98, transition: { duration: 0.1 } } }
```

#### Hover Lift
Card elevation on hover.
```ts
{ hover: { y: -2, transition: springs.snappy } }
```

### 3. Stagger Patterns
Multiple elements animating in sequence.

#### Container + Item
```ts
container: {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

item: {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeOutQuint }
  }
}
```

### 4. In-View Animations
Trigger animations when elements enter viewport.

Use `useInViewAnimation` hook:
```tsx
const { ref, isInView } = useInViewAnimation({
  once: true,
  amount: 0.2,
  margin: '100px'
});

<motion.div
  ref={ref}
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
  variants={slideUpVariants}
>
  Content
</motion.div>
```

## Timing Guidelines

### Duration
- **Instant (150ms)**: Hover states, loading spinners
- **Fast (200ms)**: Button taps, small transitions
- **Regular (300ms)**: Entrance animations, primary interactions
- **Slow (500ms)**: Page transitions, modals
- **Slower (700ms)**: Background animations, parallax
- **Slowest (1000ms)**: Hero section reveals

### Easing
- **easeOutQuint**: Default, exit-focused motion
- **easeOutExpo**: Fast exits, snap-like
- **easeInOutSmooth**: Bidirectional animations
- **easeInQuad**: Entrance with ease
- **easeStandard**: Neutral transitions
- **easeLinear**: Progress bars, meters

## Spring Configurations

### Smooth (General)
- **stiffness**: 120
- **damping**: 20
- **Best for**: Most animations

### Snappy (Quick)
- **stiffness**: 300
- **damping**: 24
- **Best for**: Hover states, user interactions

### Gentle (Slow)
- **stiffness**: 80
- **damping**: 18
- **Best for**: Hero sections, slow reveals

### Bouncy (Playful)
- **stiffness**: 400
- **damping**: 15
- **Best for**: Celebratory animations, success states

### Tight (Stiff)
- **stiffness**: 500
- **damping**: 30
- **Best for**: Precise movements, snappy UI

## Accessibility

### Reduced Motion
All components automatically disable animations when user has `prefers-reduced-motion: reduce`.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Best Practices
- Don't animate for more than 1 second
- Provide instant feedback on interactions
- Don't force animations on page load
- Use "once: true" for in-view animations to avoid re-triggering

## Common Patterns

### Button Interaction
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={springs.snappy}
>
  Click me
</motion.button>
```

### Staggered List
```tsx
<motion.ul
  initial="hidden"
  animate="visible"
  variants={staggerContainerVariants}
>
  {items.map((item) => (
    <motion.li key={item.id} variants={staggerItemVariants}>
      {item.label}
    </motion.li>
  ))}
</motion.ul>
```

### Fade-in Section
```tsx
const { ref, isInView } = useInViewAnimation();

<motion.section
  ref={ref}
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
  variants={fadeInVariants}
>
  Content
</motion.section>
```
