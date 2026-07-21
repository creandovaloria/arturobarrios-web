export type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type Size = 'sm' | 'md' | 'lg';
export type Color = 'brand' | 'neutral' | 'success' | 'warning' | 'error' | 'info';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  asChild?: boolean;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: Size;
  interactive?: boolean;
  onClick?: () => void;
}

export interface BadgeProps extends BaseComponentProps {
  variant?: 'solid' | 'outline' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  color?: Color;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: Size;
  variant?: 'default' | 'ghost';
  icon?: React.ReactNode;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  underline?: 'always' | 'hover' | 'none';
  className?: string;
  children?: React.ReactNode;
}

export interface KickerProps extends BaseComponentProps {
  color?: Color;
  uppercase?: boolean;
}

export interface IconProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  strokeWidth?: number;
  fill?: boolean;
}
