# Contributing Guidelines

Thank you for your interest in contributing to arturobarrios-web! This document provides guidelines and instructions for development, submitting changes, and maintaining code quality.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Code Standards](#code-standards)
4. [Git Workflow](#git-workflow)
5. [Component Development](#component-development)
6. [Testing](#testing)
7. [Documentation](#documentation)
8. [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm or yarn
- Git
- Basic understanding of React, TypeScript, and Next.js

### Initial Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/arturobarrios-web.git
cd arturobarrios-web
git remote add upstream https://github.com/arturobarrios/arturobarrios-web.git
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a development branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Start development server**
```bash
npm run dev
```

## Development Setup

### Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Update variables as needed for your development:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add other environment variables as needed
```

### IDE Setup

**Recommended: VS Code**

Extensions to install:
- ES7+ React/Redux/React-Native snippets
- TypeScript Vue Plugin
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense

**Recommended: JetBrains IDEs (WebStorm, etc.)**

- Built-in support for TypeScript and React
- Enable Prettier as default formatter
- Configure ESLint inspections

## Code Standards

### TypeScript

- **Strict Mode**: TypeScript strict mode is enabled. All code must be type-safe.
- **No `any`**: Avoid using `any` type. Use proper typing instead.
- **Interfaces over Types**: Prefer `interface` for object shapes, `type` for unions/tuples.

**Example:**
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button button--${variant}`}
    >
      {label}
    </button>
  );
};
```

### React Components

- **Functional Components**: Use only functional components with hooks
- **Use 'use client'**: Client components must have `'use client'` directive when needed
- **Memoization**: Use `React.memo()` for components that don't need frequent re-renders
- **Custom Hooks**: Extract reusable logic into custom hooks (store in `/hooks`)

**Example:**
```typescript
'use client';

import React from 'react';
import type { ComponentProps } from 'react';

interface CardProps extends ComponentProps<'div'> {
  title: string;
  children: React.ReactNode;
}

export const Card = React.memo<CardProps>(
  ({ title, children, className = '', ...props }) => {
    return (
      <div className={`card ${className}`} {...props}>
        <h2 className="card-title">{title}</h2>
        <div className="card-content">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';
```

### Tailwind CSS

- **Use utility classes**: Leverage Tailwind for styling
- **Custom utilities**: Add to `tailwind.config.ts` only for company-specific styles
- **Responsive design**: Mobile-first approach using breakpoints
- **Avoid inline styles**: Use classes instead

**Example:**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
  <div className="rounded-lg bg-white shadow-md p-4 hover:shadow-lg transition-shadow">
    Content here
  </div>
</div>
```

### Naming Conventions

- **Components**: PascalCase (Button, CardSection, HeroHeader)
- **Files**: Match component name or use kebab-case for utilities
- **Functions**: camelCase (handleClick, validateEmail)
- **Constants**: UPPER_SNAKE_CASE (SITE_NAME, ANIMATION_DURATION)
- **CSS Classes**: kebab-case (btn-primary, card-header)

### ESLint & Prettier

- Run `npm run lint` before committing
- Run `npm run format` to auto-format code
- Fix all linting errors before creating a PR

## Git Workflow

### Branch Naming

```
feature/description      - New features
bugfix/description       - Bug fixes
improvement/description  - Performance or code improvements
docs/description        - Documentation changes
chore/description       - Build, dependencies, tooling
```

### Commit Messages

Follow Conventional Commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Type**: feat, fix, docs, style, refactor, perf, test, chore
**Scope**: component name or feature area
**Subject**: Clear, concise description (lowercase, no period)

**Examples:**
```
feat(hero-section): add morphing text animation
fix(contact-form): resolve validation issue with email
docs(components): update component catalog
```

### Commit Best Practices

1. **Atomic commits**: Keep commits small and focused
2. **Meaningful messages**: Describe WHY, not just WHAT
3. **Test before commit**: Ensure changes don't break functionality
4. **No debug code**: Remove console.logs, debuggers before committing

## Component Development

### Structure

Create components following atomic design in appropriate directories:

```
components/
├── atoms/           # Basic elements
├── molecules/       # Combined atoms
└── organisms/       # Complex sections
```

### Component Template

```typescript
'use client';

import React from 'react';

export interface ComponentNameProps {
  /** Description of prop */
  prop1: string;
  /** Optional prop with default */
  prop2?: number;
  /** Callback handler */
  onEvent?: () => void;
}

/**
 * ComponentName provides [brief description]
 *
 * @example
 * ```tsx
 * <ComponentName prop1="value" onEvent={handleClick} />
 * ```
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2 = 10,
  onEvent,
}) => {
  const handleClick = () => {
    onEvent?.();
  };

  return (
    <div className="component-name">
      <p>{prop1}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

ComponentName.displayName = 'ComponentName';
```

### Index Files

Create index.ts in each component directory:

```typescript
// components/atoms/index.ts
export { Button } from './Button';
export { Card } from './Card';
export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
```

## Testing

### Running Tests

```bash
npm run test
npm run test:watch
npm run test:coverage
```

### Test File Naming

- `ComponentName.test.tsx` - Unit tests
- `ComponentName.integration.test.tsx` - Integration tests

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Documentation

### Component Documentation

Document all components in comments and JSDoc:

```typescript
/**
 * Button component for user interactions
 *
 * @param {string} label - Text displayed on button
 * @param {() => void} onClick - Handler when button is clicked
 * @param {'primary' | 'secondary'} variant - Button style variant
 * @param {boolean} disabled - Whether button is disabled
 *
 * @example
 * ```tsx
 * <Button
 *   label="Submit"
 *   onClick={handleSubmit}
 *   variant="primary"
 * />
 * ```
 */
```

### File Headers

Add header comment to complex files:

```typescript
/**
 * @file Hero Section Component
 * @description Premium hero section with video background and animations
 * @author Arturo Barrios
 */
```

## Pull Request Process

### Before Creating a PR

1. **Update your branch**
```bash
git fetch upstream
git rebase upstream/main
```

2. **Run quality checks**
```bash
npm run lint
npm run format
npm run build
```

3. **Test locally**
   - Manual testing in browser
   - Check all affected pages/components
   - Test on mobile devices

### Creating a PR

1. **Push your branch**
```bash
git push origin feature/your-feature-name
```

2. **Create pull request on GitHub**
   - Use clear, descriptive title
   - Link related issues
   - Describe changes in detail
   - Include screenshots for UI changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Performance improvement
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
- [ ] Manual testing completed
- [ ] Responsive design checked
- [ ] Performance impact assessed

## Screenshots (if applicable)
Add screenshots of changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new console errors/warnings
```

### PR Review Process

1. **Code Review**: Maintainers review for quality and standards
2. **Changes Requested**: Address feedback if needed
3. **Approval**: PR approved once all items satisfied
4. **Merge**: PR merged to main branch

## Code Review Checklist

As a reviewer, check for:

- [ ] Code quality and standards
- [ ] TypeScript types are correct
- [ ] No breaking changes
- [ ] Tests are included (if applicable)
- [ ] Documentation is updated
- [ ] Performance impact assessed
- [ ] Mobile responsiveness verified
- [ ] Accessibility standards met

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## Questions or Need Help?

- Open an issue for questions or suggestions
- Contact: creandovalor.ia@gmail.com
- Check existing issues before creating new ones

---

Thank you for contributing! 🙌
