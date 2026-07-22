import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Link from '@components/atoms/Link';

// Mock Next.js Link
vi.mock('next/link', () => {
  return {
    default: ({ href, children, className, ...props }: any) => (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    ),
  };
});

describe('Link Component', () => {
  it('renders internal link', () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders external link with target blank', () => {
    render(<Link href="https://example.com" external>
      External
    </Link>);
    const link = screen.getByRole('link', { name: /external/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders with different underline styles', () => {
    const underlines = ['always', 'hover', 'none'] as const;

    underlines.forEach((underline) => {
      const { unmount } = render(
        <Link href="/test" underline={underline}>
          Link
        </Link>,
      );
      expect(screen.getByRole('link')).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className', () => {
    render(
      <Link href="/test" className="custom-class">
        Link
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveClass('custom-class');
  });

  it('has brand color by default', () => {
    render(<Link href="/test">Link</Link>);
    const link = screen.getByRole('link');
    expect(link.className).toContain('text-brand-500');
  });

  it('has focus ring for accessibility', () => {
    render(<Link href="/test">Link</Link>);
    const link = screen.getByRole('link');
    expect(link.className).toContain('focus-visible:ring-2');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Link ref={ref} href="/test">
      Link
    </Link>);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('renders with children elements', () => {
    render(
      <Link href="/test">
        <span>Icon</span>
        <span>Text</span>
      </Link>,
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('supports aria attributes', () => {
    render(
      <Link href="/test" aria-label="Test link">
        Link
      </Link>,
    );
    expect(screen.getByLabelText('Test link')).toBeInTheDocument();
  });

  it('has hover transition', () => {
    render(<Link href="/test">Link</Link>);
    const link = screen.getByRole('link');
    expect(link.className).toContain('transition-colors');
  });

  it('external links use absolute URLs', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('internal links use relative paths', () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('defaults to hover underline', () => {
    render(<Link href="/test">Link</Link>);
    const link = screen.getByRole('link');
    expect(link.className).toContain('hover:underline');
  });

  it('can disable underline', () => {
    render(<Link href="/test" underline="none">
      Link
    </Link>);
    const link = screen.getByRole('link');
    expect(link.className).toContain('no-underline');
  });
});
