# Arturo Barrios - Full-Stack Developer & Digital Product Creator

Personal website and portfolio showcasing digital transformation services, AI integration, and process optimization for growing organizations.

## Overview

This is a modern, high-performance Next.js application built to showcase Arturo Barrios' expertise in:

- **AI Integration**: Connecting artificial intelligence solutions to existing business infrastructure
- **Process Optimization**: Simplifying and automating operational workflows
- **Team Empowerment**: Enabling teams with better tools and clearer processes

## Key Features

- **Modern Design System**: Atomic design principles (atoms → molecules → organisms)
- **Premium Animations**: Framer Motion-powered interactions and transitions
- **Video Background Support**: Hero section with video backgrounds and fallback images
- **Responsive Layout**: Mobile-first, fully responsive design with Tailwind CSS
- **Type-Safe Development**: TypeScript with strict mode enabled
- **Performance Optimized**: Next.js 16+ with bundle analysis and optimization
- **SEO Ready**: Complete metadata, Open Graph, Twitter cards
- **Accessibility Focused**: WCAG compliance and semantic HTML

## Tech Stack

### Core Framework
- **Next.js** 16.2.11 - React framework with server-side rendering
- **React** 19.2.8 - UI library
- **TypeScript** 6.0.3 - Type safety

### Styling & Animation
- **Tailwind CSS** 4.3.3 - Utility-first CSS framework
- **PostCSS** 8.5.21 - CSS processing
- **Framer Motion** 12.42.2 - Animation library

### Forms & Validation
- **React Hook Form** 7.82.0 - Efficient form handling
- **Zod** 4.4.3 - Schema validation

### Development Tools
- **ESLint** 9.39.5 - Code linting
- **Prettier** 3.9.6 - Code formatting
- **TypeScript ESLint** 8.65.0 - TS linting

## Project Structure

```
arturobarrios-web/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── providers/         # Context providers
│   └── routes/            # Nested routes
├── components/            # Reusable UI components
│   ├── atoms/            # Basic components (Button, Card, Link, etc.)
│   ├── molecules/        # Combined atoms (MorphingText, StatCounter, etc.)
│   └── organisms/        # Complex components
├── sections/             # Page sections (Hero, Problem, Transformation, Pillars)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and constants
│   ├── constants.ts     # App-wide constants
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── public/             # Static assets (images, videos, fonts)
├── docs/              # Documentation (sprints, guides)
├── next.config.ts     # Next.js configuration
├── tailwind.config.ts # Tailwind configuration
└── tsconfig.json      # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/arturobarrios/arturobarrios-web.git
cd arturobarrios-web
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Start development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run analyze` - Analyze bundle size

## Development

### Adding Components

Follow atomic design principles:

1. **Atoms** - Smallest reusable units (Button, Card, Icon, Link)
2. **Molecules** - Combinations of atoms (MorphingText, StatCounter, etc.)
3. **Organisms** - Complex components composed of molecules
4. **Sections** - Full page sections using organisms

### Code Style

- TypeScript strict mode enabled
- ESLint configuration enforces consistent code
- Prettier formats code automatically on save (IDE setup recommended)
- Path aliases configured for cleaner imports

### Component Development Workflow

1. Create component file in appropriate directory
2. Define TypeScript interfaces for props
3. Export component from index.ts (if in a category)
4. Add to component catalog (see COMPONENTS.md)
5. Document usage with example

## Deployment

The project is configured for deployment on **Vercel**. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on:

- Environment variable setup
- Domain configuration
- Analytics integration
- CI/CD pipeline
- Production deployment

### Quick Deploy

```bash
# Build locally to verify
npm run build

# Deploy to Vercel (automatic via GitHub)
git push origin main
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Email Service (optional)
NEXT_PUBLIC_CONTACT_EMAIL=contact@arturobarrios.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://arturobarrios.com
```

See [.env.example](./.env.example) for all available variables.

## Performance & Analytics

- **Bundle Analysis**: Run `npm run analyze` to see bundle composition
- **Google Analytics**: Configured in production (see DEPLOYMENT.md)
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js Image component for automatic optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development setup
- Git workflow
- Commit conventions
- Pull request process
- Code review guidelines

## Component Catalog

See [COMPONENTS.md](./COMPONENTS.md) for a complete guide to all UI components including:
- Props documentation
- Usage examples
- Customization options

## Documentation

Additional documentation:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Vercel deployment and production setup
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development guidelines
- [COMPONENTS.md](./COMPONENTS.md) - Component documentation

Sprint reports and technical documentation available in `/docs/`

## License

MIT License - See LICENSE file for details

## Contact

- **Email**: creandovalor.ia@gmail.com
- **Website**: https://arturobarrios.com
- **Twitter**: @arturobarrios

---

Built with passion 🚀 | Created by Arturo Barrios
