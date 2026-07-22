import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from '@components/atoms/Badge';

describe('Badge Component', () => {
  it('renders badge with text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const variants = ['solid', 'outline', 'soft'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<Badge size={size}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different colors', () => {
    const colors = [
      'brand',
      'neutral',
      'success',
      'warning',
      'error',
      'info',
    ] as const;

    colors.forEach((color) => {
      const { unmount } = render(<Badge color={color}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Test</Badge>);
    const badge = screen.getByText('Test');
    expect(badge).toHaveClass('custom-class');
  });

  it('is inline-flex by default', () => {
    const { container } = render(<Badge>Test</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('inline-flex');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Badge ref={ref}>Test</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('renders with multiple children', () => {
    render(
      <Badge>
        <span>Icon</span>
        <span>Label</span>
      </Badge>,
    );

    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('has correct default size', () => {
    const { container } = render(<Badge>Test</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('px-3');
    expect(badge.className).toContain('py-1.5');
  });

  it('supports aria attributes', () => {
    render(<Badge aria-label="Status badge">New</Badge>);
    const badge = screen.getByLabelText('Status badge');
    expect(badge).toBeInTheDocument();
  });

  it('is accessible for screen readers', () => {
    const { container } = render(<Badge>Success</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('inline-flex');
    expect(badge).toHaveClass('items-center');
  });
});
