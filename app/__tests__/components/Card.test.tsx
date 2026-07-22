import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Card from '@components/atoms/Card';

describe('Card Component', () => {
  it('renders card with content', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const variants = ['elevated', 'outlined', 'filled'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Card variant={variant}>Test</Card>);
      const card = screen.getByText('Test');
      expect(card).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different padding', () => {
    const paddings = ['sm', 'md', 'lg'] as const;

    paddings.forEach((padding) => {
      const { unmount } = render(<Card padding={padding}>Test</Card>);
      const card = screen.getByText('Test');
      expect(card).toBeInTheDocument();
      unmount();
    });
  });

  it('is not interactive by default', () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.tagName).toBe('DIV');
  });

  it('becomes interactive when specified', () => {
    const { container } = render(<Card interactive>Test</Card>);
    const card = container.querySelector('[class*="rounded-lg"]');
    expect(card).toBeInTheDocument();
  });

  it('handles click events when interactive', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Card interactive onClick={handleClick}>
        Click me
      </Card>,
    );

    const card = screen.getByText('Click me');
    await user.click(card);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">Test</Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('custom-class');
  });

  it('has rounded corners', () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('rounded-lg');
  });

  it('renders with multiple children', () => {
    render(
      <Card>
        <div>Child 1</div>
        <div>Child 2</div>
      </Card>,
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Card ref={ref}>Test</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies cursor-pointer when interactive', () => {
    const { container } = render(<Card interactive>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('cursor-pointer');
  });

  it('has transition classes', () => {
    const { container } = render(<Card>Test</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('transition-all');
  });
});
