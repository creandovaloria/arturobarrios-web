# Deployment Guide - Vercel

Complete guide for deploying arturobarrios-web to Vercel with custom domain, analytics, and CI/CD.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Variables](#environment-variables)
3. [Vercel Project Setup](#vercel-project-setup)
4. [Domain Configuration](#domain-configuration)
5. [Analytics Setup](#analytics-setup)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

## Pre-Deployment Checklist

Before deploying to production:

- [ ] Code merged to `main` branch
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Performance analysis completed (`npm run analyze`)
- [ ] SEO meta tags configured
- [ ] Analytics ID obtained
- [ ] Environment variables prepared
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Domain DNS records prepared
- [ ] SSL certificate ready (Vercel handles this)

## Environment Variables

### Local Development

Create `.env.local` in project root:

```bash
cp .env.example .env.local
```

Edit with your values:

```env
# Site Configuration (optional - these are defaults)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Arturo Barrios
NEXT_PUBLIC_SITE_DESCRIPTION=Full-Stack Developer & Digital Product Creator

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Your Google Analytics ID

# Contact Form (optional)
NEXT_PUBLIC_CONTACT_EMAIL=contact@arturobarrios.com

# Optional: Email Service Integration
# SENDGRID_API_KEY=your-sendgrid-key
# RESEND_API_KEY=your-resend-key
```

### Vercel Environment Variables

Variables are stored securely in Vercel and never committed to git.

#### Production Variables

Set these in Vercel Dashboard:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://arturobarrios.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@arturobarrios.com
```

#### Preview (Staging) Variables

For preview deployments:

```
NEXT_PUBLIC_SITE_URL=https://[deployment].vercel.app
```

#### Development Variables

Only use `.env.local` (never commit to git).

### Getting Analytics ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create property for arturobarrios.com
3. Copy Measurement ID (format: G-XXXXXXXXXX)
4. Set as `NEXT_PUBLIC_GA_ID` in Vercel

## Vercel Project Setup

### Step 1: Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select `arturobarrios-web` project

### Step 2: Configure Project

In Vercel Dashboard:

**Basic Settings:**
- Project Name: `arturobarrios-web`
- Framework Preset: Next.js (auto-detected)
- Root Directory: `./` (default)

**Build & Development:**
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install` (auto-detected)

### Step 3: Add Environment Variables

1. Go to Settings → Environment Variables
2. Add each variable from section above
3. Select which environments: Production, Preview, Development

**Add Production Variables:**
```
NEXT_PUBLIC_GA_ID       → All
NEXT_PUBLIC_SITE_URL    → All
NEXT_PUBLIC_CONTACT_EMAIL → All
```

### Step 4: Configure Build Settings (if needed)

Most settings are auto-detected. Only configure if needed:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

## Domain Configuration

### Step 1: Purchase Domain

Your domain `arturobarrios.com` should be registered with:
- GoDaddy, Namecheap, Google Domains, or similar registrar

### Step 2: Connect Domain to Vercel

**Option A: Vercel Nameservers (Recommended)**

1. In Vercel Dashboard → Project Settings → Domains
2. Add domain: `arturobarrios.com`
3. Click "Set as Primary Domain"
4. Copy Vercel nameservers
5. Update nameservers at your registrar:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
   - ns3.vercel-dns.com

**Option B: CNAME Records**

1. In Vercel Dashboard → Project Settings → Domains
2. Add domain `arturobarrios.com`
3. Use CNAME record at registrar:
   - Host: `www`
   - Value: `cname.vercel-dns.com`
4. Verify DNS propagation (may take 24-48 hours)

### Step 3: Redirect Variants

Configure domain variants in Vercel:

1. **Root Domain**: `arturobarrios.com` → Project (Vercel handles)
2. **WWW Subdomain**: `www.arturobarrios.com` → Redirect to root

**Redirect Rules** (in `vercel.json`):
```json
{
  "redirects": [
    {
      "source": "/blog/:path*",
      "destination": "/posts/:path*"
    }
  ]
}
```

### Step 4: SSL Certificate

Vercel automatically provisions Let's Encrypt SSL certificate:
- Automatically renewed
- Applied to all domains
- No configuration needed

## Analytics Setup

### Google Analytics 4

#### 1. Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (bottom left)
3. Click "Create Property"
4. Property name: "Arturo Barrios Website"
5. Industry: Business Services or similar
6. Country: Mexico
7. Timezone: America/Mexico_City
8. Create property

#### 2. Add Web Stream

1. In Data Streams → Web
2. Website URL: `https://arturobarrios.com`
3. Stream name: "Arturo Barrios - Website"
4. Copy Measurement ID (G-XXXXXXXXXX)

#### 3. Set Environment Variable

Add to Vercel:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### 4. Implementation

Google Analytics is configured in layout.tsx:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### 5. Verify Tracking

1. Visit your site
2. Go to Analytics → Realtime
3. Confirm your session is recorded

### Vercel Analytics (Optional)

Vercel provides built-in analytics:

```typescript
// In your app
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return <Analytics />;
}
```

## CI/CD Pipeline

### GitHub Actions Workflow

Configured in `.github/workflows/ci.yml`:

**On Every Push to main:**
1. Checkout code
2. Install dependencies
3. Lint code
4. Type check with TypeScript
5. Build project
6. Deploy to Vercel (production)

**On Pull Requests:**
1. Checkout code
2. Install dependencies
3. Lint code
4. Type check
5. Build project
6. Comment with preview URL

**Configuration:**

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      
      - name: Deploy to Vercel
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### GitHub Secrets Setup

1. Go to GitHub Repo → Settings → Secrets
2. Add `VERCEL_TOKEN`:
   - Get token from [Vercel Settings](https://vercel.com/account/tokens)
   - Set token with Vercel account permissions
3. Add `VERCEL_PROJECT_ID`:
   - Get from Vercel Dashboard → Settings → Project ID
4. Add `VERCEL_ORG_ID`:
   - Get from Vercel Dashboard → Settings → Team ID

## Production Deployment

### First Deployment

1. Push to `main` branch:
```bash
git push origin main
```

2. GitHub Actions triggers automatically
3. Vercel builds and deploys
4. Production site live at `https://arturobarrios.com`

### Verify Deployment

1. Visit https://arturobarrios.com
2. Check browser console for errors
3. Verify analytics tracking
4. Test contact forms
5. Check mobile responsiveness
6. Run Lighthouse audit

### Rollback

To revert to previous deployment:

1. Revert commit: `git revert <commit-hash>`
2. Push to main
3. Vercel automatically redeploys
4. Or manually redeploy from Vercel Dashboard

## Monitoring & Maintenance

### Monitoring

**Vercel Dashboard:**
- Deployments page: See all deployments
- Logs: View build and runtime logs
- Analytics: Track site performance

**Google Analytics:**
- Real-time dashboard: Monitor current visitors
- Audience reports: Understand user behavior
- Conversion tracking: Monitor goals

**Performance:**
- Core Web Vitals: LCP, FID, CLS
- Page load times
- Error tracking

### Regular Maintenance

**Weekly:**
- Check analytics for trends
- Monitor error logs
- Verify all forms working

**Monthly:**
- Review performance metrics
- Update dependencies (with testing)
- Check security advisories

**Quarterly:**
- Update Next.js if major version released
- Review and update all packages
- Audit accessibility
- Test on various devices/browsers

## Troubleshooting

### Build Failures

**Issue**: Build fails in Vercel but works locally

**Solutions**:
1. Check environment variables are set
2. Verify Node.js version matches (`package.json` engines)
3. Check for .env.local files (shouldn't be committed)
4. Review Vercel build logs
5. Test local production build: `npm run build && npm start`

### Deployment Issues

**Issue**: Deployment stalls or times out

**Solutions**:
1. Check GitHub Actions logs
2. Verify Vercel token is valid and not expired
3. Check repository size isn't too large
4. Review for large assets being committed
5. Try manual deployment from Vercel Dashboard

### Domain Issues

**Issue**: Domain not pointing to Vercel

**Solutions**:
1. Verify DNS propagation: [whatsmydns.net](https://whatsmydns.net)
2. Wait 24-48 hours for DNS to propagate
3. Clear browser cache and restart
4. Check Vercel Dashboard for domain status
5. Review DNS records at registrar

### Analytics Not Tracking

**Issue**: Google Analytics not recording visitors

**Solutions**:
1. Verify `NEXT_PUBLIC_GA_ID` is set correctly
2. Check browser console for GA errors
3. Visit site in incognito mode (avoids ad blockers)
4. Wait 24-48 hours for initial data
5. Verify tracking code in network requests

## Performance Optimization

### Image Optimization

Already configured with Next.js Image:
```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={85}
/>
```

### Code Splitting

Next.js automatically code-splits by route. Monitor with:
```bash
npm run analyze
```

### Caching Headers

Vercel automatically sets optimal cache headers:
- Static pages: 1 year
- API routes: 0 (no cache)
- Dynamic pages: 0

### Bundle Analysis

```bash
npm run analyze
```

Generates visual bundle composition report.

## Security Considerations

1. **Environment Variables**: Keep secrets out of repository
2. **HTTPS**: Vercel automatically enforces HTTPS
3. **Security Headers**: Configure in `vercel.json`
4. **Rate Limiting**: Configure for contact forms
5. **DDoS Protection**: Vercel includes built-in protection

## Cost Optimization

- **Vercel Hobby (Free)**: 100GB bandwidth/month
- **Vercel Pro ($20/month)**: Unlimited bandwidth
- **Overages**: Pay-as-you-go after free tier

Monitor usage:
1. Vercel Dashboard → Usage
2. Bandwidth per month
3. Build minutes

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Support](https://vercel.com/support)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Last Updated**: July 2024
**Deployment Status**: Ready for Production
**Maintained by**: Arturo Barrios
