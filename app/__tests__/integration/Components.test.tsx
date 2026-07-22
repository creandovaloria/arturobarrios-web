import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from '@components/atoms/Button';
import Card from '@components/atoms/Card';
import Badge from '@components/atoms/Badge';
import Input from '@components/atoms/Input';

describe('Component Integration Tests', () => {
  describe('Button + Card Integration', () => {
    it('renders button inside card', () => {
      render(
        <Card interactive>
          <Button>Click me</Button>
        </Card>,
      );

      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles click on button inside card', async () => {
      const user = userEvent.setup();
      const handleCardClick = vi.fn();
      const handleButtonClick = vi.fn();

      render(
        <Card interactive onClick={handleCardClick}>
          <Button onClick={handleButtonClick}>Click</Button>
        </Card>,
      );

      await user.click(screen.getByText('Click'));
      expect(handleButtonClick).toHaveBeenCalled();
    });
  });

  describe('Input + Label Integration', () => {
    it('renders input with label and error', () => {
      render(
        <Input
          label="Email"
          placeholder="Enter your email"
          error="Invalid email"
        />,
      );

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('associates label with input correctly', () => {
      render(
        <Input label="Password" placeholder="Enter password" />,
      );

      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('placeholder', 'Enter password');
    });
  });

  describe('Badge + Button Integration', () => {
    it('renders badge and button together', () => {
      render(
        <>
          <Badge>New</Badge>
          <Button>Explore</Button>
        </>,
      );

      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByText('Explore')).toBeInTheDocument();
    });
  });

  describe('Form Integration', () => {
    it('renders form with inputs and button', () => {
      render(
        <form>
          <Input label="Name" placeholder="John Doe" required />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            required
          />
          <Button type="submit">Submit</Button>
        </form>,
      );

      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('validates form inputs', async () => {
      const user = userEvent.setup();

      render(
        <form>
          <Input label="Email" type="email" required />
          <Button type="submit">Submit</Button>
        </form>,
      );

      const input = screen.getByLabelText('Email') as HTMLInputElement;
      expect(input).toBeRequired();
    });
  });

  describe('Card Variants', () => {
    it('renders different card variants with content', () => {
      const variants = ['elevated', 'outlined', 'filled'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(
          <Card variant={variant}>
            <h3>Title</h3>
            <p>Content for {variant} card</p>
          </Card>,
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Accessibility Integration', () => {
    it('maintains semantic HTML in complex layouts', () => {
      render(
        <Card>
          <Input label="Search" placeholder="Search..." />
          <Button>Search</Button>
        </Card>,
      );

      // Check for proper semantic elements
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('maintains focus ring visibility through components', () => {
      const { container } = render(
        <Card>
          <Button>Focusable</Button>
        </Card>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus-visible:ring-2');
    });
  });

  describe('Responsive Behavior', () => {
    it('renders responsive input sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach((size) => {
        const { unmount } = render(
          <Input size={size} placeholder={`Size ${size}`} />,
        );
        expect(screen.getByPlaceholderText(`Size ${size}`)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('State Management', () => {
    it('handles state updates across components', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const [value, setValue] = React.useState('');

        return (
          <>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type something"
            />
            <Button onClick={() => setValue('')}>Clear</Button>
            {value && <p>You typed: {value}</p>}
          </>
        );
      };

      render(<TestComponent />);
      const input = screen.getByPlaceholderText('Type something') as HTMLInputElement;

      await user.type(input, 'Hello');
      expect(screen.getByText('You typed: Hello')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(input.value).toBe('');
    });
  });
});
