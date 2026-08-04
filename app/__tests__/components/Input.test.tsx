import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Input from '@components/atoms/Input';

describe('Input Component', () => {
  it('renders input field', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email" placeholder="email@example.com" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Input label="Name" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders with hint message', () => {
    render(<Input label="Password" hint="At least 8 characters" />);
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
  });

  it('hides hint when error is present', () => {
    render(
      <Input
        label="Password"
        hint="At least 8 characters"
        error="Password is too short"
      />,
    );
    expect(screen.getByText('Password is too short')).toBeInTheDocument();
    expect(screen.queryByText('At least 8 characters')).not.toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(
        <Input size={size} placeholder={`Size ${size}`} />,
      );
      expect(screen.getByPlaceholderText(`Size ${size}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different variants', () => {
    const variants = ['default', 'ghost'] as const;

    variants.forEach((variant) => {
      const { unmount } = render(
        <Input variant={variant} placeholder={`Variant ${variant}`} />,
      );
      expect(screen.getByPlaceholderText(`Variant ${variant}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;

    await user.type(input, 'Hello World');
    expect(input.value).toBe('Hello World');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('renders with icon', () => {
    render(
      <Input
        placeholder="Search"
        icon={<span data-testid="search-icon">🔍</span>}
      />,
    );
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Input className="custom-wrapper" placeholder="Test" />,
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-wrapper');
  });

  it('supports type attribute', () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('supports required attribute', () => {
    render(<Input required placeholder="Required field" />);
    const input = screen.getByPlaceholderText('Required field');
    expect(input).toBeRequired();
  });

  it('has focus ring for accessibility', () => {
    const { container } = render(<Input placeholder="Test" />);
    const input = container.querySelector('input');
    expect(input?.className).toContain('focus:ring-2');
  });

  it('has error styling when error prop is set', () => {
    const { container } = render(
      <Input placeholder="Test" error="This is an error" />,
    );
    const input = container.querySelector('input');
    expect(input?.className).toContain('border-status-error');
  });
});
