import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, TWITTER_URL, GITHUB_URL, LINKEDIN_URL } from './constants';

export const generatePersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  sameAs: [TWITTER_URL, GITHUB_URL, LINKEDIN_URL],
  jobTitle: 'Full-Stack Developer & Digital Product Creator',
  image: `${SITE_URL}/images/hero-poster.jpg`,
  email: 'creandovalor.ia@gmail.com',
  worksFor: {
    '@type': 'Organization',
    name: 'Independent',
    url: SITE_URL,
  },
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/hero-poster.jpg`,
  description: SITE_DESCRIPTION,
  sameAs: [TWITTER_URL, GITHUB_URL, LINKEDIN_URL],
  contact: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    email: 'creandovalor.ia@gmail.com',
  },
});
