import NextLink from 'next/link';

const legalLinks = [
  { href: '/routes/privacy', label: 'Privacidad' },
  { href: '/routes/terms', label: 'Términos' },
  { href: '/routes/data-deletion', label: 'Eliminación de datos' },
];

const linkClasses =
  'inline-flex min-h-[44px] items-center rounded px-3 text-sm text-neutral-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400';

/**
 * Site footer with legal navigation.
 *
 * Rendered from the root layout so every page (landing + legal pages)
 * links back to /routes/privacy, /routes/terms and /routes/data-deletion.
 */
export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-neutral-400">
          © {year} Arturo Barrios. Todos los derechos reservados.
        </p>

        <nav aria-label="Enlaces legales">
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <NextLink href={link.href} className={linkClasses}>
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
