# Vercel Setup Quick Start Guide

Fast-track guide to deploying arturobarrios-web to Vercel in under 15 minutes.

## Prerequisites

- GitHub account with arturobarrios-web repository
- Vercel account (free tier available at [vercel.com](https://vercel.com))
- Domain: arturobarrios.com (registered and ready)
- Google Analytics ID (for tracking)

## 5-Minute Setup

### Step 1: Connect to Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "Add New..." → "Project"
4. Find `arturobarrios-web` repository
5. Click "Import"

### Step 2: Configure Project (2 minutes)

Vercel auto-detects settings. Just verify:
- **Project Name**: arturobarrios-web
- **Framework Preset**: Next.js (auto-selected)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)

Click "Deploy"

### Step 3: Add Environment Variables (1 minute)

While deploying:

1. Go to Settings → Environment Variables
2. Add these variables:

```
NEXT_PUBLIC_GA_ID         →  Your Google Analytics ID (format: G-XXXXXXXXXX)
NEXT_PUBLIC_SITE_URL      →  https://arturobarrios.com (or temp URL)
NEXT_PUBLIC_CONTACT_EMAIL →  contact@arturobarrios.com
```

3. Select "Production, Preview, Development"
4. Save

**Done!** First deployment should be live in ~2 minutes.

## 10-Minute Full Setup

### After Initial Deployment

#### Add Custom Domain (3 minutes)

1. **In Vercel Dashboard:**
   - Go to Settings → Domains
   - Add `arturobarrios.com`
   - Click "Set as Primary Domain"

2. **Copy Vercel Nameservers:**
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
   - ns3.vercel-dns.com

3. **At Domain Registrar (GoDaddy, Namecheap, etc.):**
   - Go to Nameservers settings
   - Replace with Vercel nameservers
   - Save (DNS propagation takes 24-48 hours)

#### Enable Analytics (2 minutes)

1. Get Google Analytics ID:
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create property for arturobarrios.com
   - Copy Measurement ID (G-XXXXXXXXXX)

2. Add to Vercel:
   - Settings → Environment Variables
   - Add `NEXT_PUBLIC_GA_ID`
   - Value: Your Analytics ID

3. Verify:
   - Visit site
   - Open DevTools → Network
   - Look for `google-analytics.com` requests

#### GitHub Actions CI/CD (3 minutes)

1. **Get Vercel Tokens:**
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Create token named "GitHub"
   - Copy token

2. **Add to GitHub Secrets:**
   - Go to GitHub repo → Settings → Secrets
   - Add `VERCEL_TOKEN` = (paste token)
   - Add `VERCEL_ORG_ID` = (from Vercel Dashboard → Settings)
   - Add `VERCEL_PROJECT_ID` = (from Vercel Dashboard → Settings)

3. **Workflow Already Configured:**
   - File: `.github/workflows/ci.yml`
   - Now pushes to `main` auto-deploy to production!

## Testing Deployment

### Verify Live Site

```bash
# Visit live site
open https://arturobarrios.com

# Or while DNS propagating
open https://[your-vercel-deployment].vercel.app
```

### Check Performance

```bash
# Run Lighthouse audit
# Open browser DevTools → Lighthouse → Analyze page load
# Target: Performance 90+, Accessibility 90+
```

### Monitor Analytics

```bash
# Check Google Analytics real-time
# 1. Visit https://analytics.google.com
# 2. Go to Real-time → Overview
# 3. Visit your site in private window
# 4. Should see 1 active user
```

## Common Issues & Quick Fixes

### "Build failed" Error

**Issue**: Vercel deployment fails

**Fix**:
1. Check build logs in Vercel Dashboard
2. Ensure environment variables set
3. Run locally: `npm run build`
4. Check for errors: `npm run lint`
5. Commit fix and push to main

### Domain not resolving

**Issue**: arturobarrios.com shows 404 or old site

**Fix**:
1. Wait 24-48 hours for DNS propagation
2. Check status: [whatsmydns.net](https://whatsmydns.net)
3. Clear browser cache: Cmd+Shift+Delete
4. Use incognito window to test
5. If stuck: check Vercel domain status in Dashboard

### Analytics not tracking

**Issue**: Google Analytics not recording visitors

**Fix**:
1. Verify `NEXT_PUBLIC_GA_ID` set correctly in Vercel
2. Check browser DevTools → Console for errors
3. Visit in incognito (avoids ad blockers)
4. Wait 24 hours for initial data
5. Verify in Analytics → Realtime → Overview

### Git push not deploying

**Issue**: Push to main but Vercel doesn't deploy

**Fix**:
1. Check GitHub Actions workflow:
   - Repo → Actions tab
   - See if workflow ran successfully
2. Verify `VERCEL_TOKEN` is set
3. Check branch protection rules (if any)
4. Try manual deploy from Vercel Dashboard

## Next Steps

### Documentation

- Read [README.md](./README.md) - Full project overview
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- Read [PRODUCTION_LAUNCH.md](./PRODUCTION_LAUNCH.md) - Launch checklist
- Read [CONTRIBUTING.md](./CONTRIBUTING.md) - Development guidelines

### Monitoring

1. **Set up alerts:**
   - Vercel Dashboard → Analytics → Set thresholds
   - Google Analytics → Alerts

2. **Daily checks (first week):**
   - Visit site
   - Check Analytics real-time
   - Review error logs

3. **Weekly checks (ongoing):**
   - Performance metrics
   - Error rates
   - SEO status

## Commands Cheat Sheet

```bash
# Local development
npm run dev              # Start dev server
npm run build           # Test production build
npm start              # Run production build locally
npm run lint           # Check code quality
npm run format         # Format code
npm run analyze        # Analyze bundle size

# Git workflow
git checkout -b feature/name    # Create branch
git add .                       # Stage changes
git commit -m "message"         # Commit
git push origin feature/name    # Push branch
# Then create PR on GitHub

# Vercel CLI (optional)
npm i -g vercel        # Install Vercel CLI
vercel                 # Deploy to staging
vercel --prod          # Deploy to production
```

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/actions)
- **Google Analytics**: [analytics.google.com/analytics](https://analytics.google.com/analytics)

## Success Indicators

✅ Site live at https://arturobarrios.com
✅ GitHub Actions deploying on push
✅ Google Analytics tracking visitors
✅ No console errors in browser
✅ Lighthouse score 90+
✅ Mobile responsive
✅ HTTPS working
✅ Forms functional

---

**Total Setup Time**: ~15 minutes
**Status**: Ready for production ✨
**Next**: See [PRODUCTION_LAUNCH.md](./PRODUCTION_LAUNCH.md) for full launch checklist
