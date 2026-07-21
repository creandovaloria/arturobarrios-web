export const SITE_NAME = 'Arturo Barrios';
export const SITE_DESCRIPTION = 'Full-Stack Developer & Digital Product Creator';
export const SITE_URL = 'https://arturobarrios.com';
export const TWITTER_URL = 'https://x.com/arturobarrios';
export const GITHUB_URL = 'https://github.com/arturobarrios';
export const LINKEDIN_URL = 'https://linkedin.com/in/arturobarrios';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Data Deletion', href: '/data-deletion' },
  ],
  Social: [
    { label: 'Twitter', href: TWITTER_URL, external: true },
    { label: 'GitHub', href: GITHUB_URL, external: true },
    { label: 'LinkedIn', href: LINKEDIN_URL, external: true },
  ],
};

export const ANIMATION_DELAY = {
  stagger: 0.1,
  container: 0.2,
};
